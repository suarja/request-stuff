import FolderIcon from "@/common/icons/FolderIcon";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { type RequestSubFolder } from "../../domain/entities/request-types";
export default function RequestSubFolder({ title, path }: RequestSubFolder) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      <div
        className="group pl-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer"
        onClick={() => {
          if (Array.isArray(params.slug)) {
            router.push(
              `${params.slug.join("/")}/${title}?${searchParams.toString()}`
            );
          } else {
            router.push(`${params.slug}/${title}`);
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <span className="pl-2">
            <FolderIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 dark:text-yellow-400 dark:group-hover:text-yellow-500" />
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
    </>
  );
}
