"use client";

import DeleteIcon from "@/common/icons/DeleteIcon";
import useDeleteFile from "../../application/usecases/services/useDeleteFile";

export default function DeleteButton({ path }: { path: string }) {
  const { setPath, loading, error, success } = useDeleteFile();
  if (loading) return <p>Deleting...</p>;
 
  return (
    <button
      onClick={() => {
        setPath(path);
      }}
      className="text-gray-500 text-sm dark:text-red-400 pr-2"
    >
      <DeleteIcon />
    </button>
  );
}
