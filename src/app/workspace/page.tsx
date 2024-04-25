import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import { getUserIdFromSessionCookie } from "@/lib/firebase/auth/server-side-user-id";
import { cookies } from "next/headers";

export default async function Page() {
  const session = cookies().get("session")?.value || "";

  const userId = getUserIdFromSessionCookie({
    sessionCookie: session,
  });

  if (!userId) {
    return <div>Not logged in</div>;
  }
  const pathContent = await fileRepositoryImplementation.getPathContent({
    path: `users/${userId}`,
  });
  console.log({ pathContent });
  console.log({ prefixes: pathContent.prefixes, items: pathContent.items });

  return (
    <div>
      <h1 className="text-xl">Prefixes</h1>
      <br />
      {pathContent.prefixes.map((prefix, index) => (
        <div key={index}>
          <p>{index + 1}</p>
          <span>Name: </span>
          <span>{prefix.name}</span>
          <br />
          <span>Full Path: </span>
          <span>{prefix.fullPath}</span>
          <br />
          <div>
            {pathContent.items.map((item, index) => (
              <div key={index}>
                <p>{index + 1}</p>
                <span>Name: </span>
                <span>{item.name}</span>
                <br />
                <span>Full Path: </span>
                <span>{item.fullPath}</span>
                <br />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
