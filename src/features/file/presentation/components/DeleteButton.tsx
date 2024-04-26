"use client";

import DeleteIcon from "@/common/icons/DeleteIcon";

export default function DeleteButton({ path }: { path: string }) {
  return (
    <button
      onClick={() => {
        console.log("Delete file");
      }}
      className="text-gray-500 text-sm dark:text-red-400 pr-2"
    >
      <DeleteIcon />
    </button>
  );
}
