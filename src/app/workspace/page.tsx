import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import FolderTree from "@/features/file/presentation/components/Foldertree";
import firebase_app from "@/lib/firebase/config";
import { auth } from "firebase-admin";
export default async function Page() {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "GET",
  });
  if (!response.ok) {
    return <div>Not logged in</div>;
  }
  const data = await response.json();
  const userId = data.userId;
  const pathContent = await fileRepositoryImplementation.getPathContent({
    path: `users/${userId}/files`,
  });
  console.log({ pathContent });
  console.log({ prefixes: pathContent.prefixes, items: pathContent.items });
  // const { files, loading } = useGetUserFiles();
  // if (loading) return <div>Loading...</div>;
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
