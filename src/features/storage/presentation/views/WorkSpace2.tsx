"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ux4S3ZxjDJw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React, { useState } from "react";
// Ensure these icons are imported correctly
interface OpenFoldersState {
  [folderName: string]: boolean;
}

export function useFolderToggle() {
  // State to manage open folders
  const [openFolders, setOpenFolders] = useState<OpenFoldersState>({});

  // Function to toggle folder open state
  const toggleFolder = (folderName: string): void => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  return { openFolders, toggleFolder };
}
export default function WorkSpace2() {
  const { openFolders, toggleFolder } = useFolderToggle();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-medium">Files</h3>
          <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
            <PlusIcon className="w-5 h-5" />
            <span className="sr-only">Add new file</span>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {/* Example folder: Documents */}
          <div
            className="group flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer"
            onClick={() => toggleFolder("Documents")}
          >
            <div className="flex items-center space-x-2">
              <FolderIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 dark:text-yellow-400 dark:group-hover:text-yellow-500" />
              <span className="font-medium text-gray-900 dark:text-gray-50">
                Documents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm dark:text-gray-400">
                12 items
              </span>
              <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
                {openFolders["Documents"] ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
                <span className="sr-only">Toggle folder</span>
              </button>
            </div>
          </div>
          {/* Conditional rendering based on state */}
          {openFolders["Documents"] && (
            <div className="pl-8 space-y-2">
              {/* Files in Documents folder */}
              <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FileIcon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-500" />
                  <span className="font-medium text-gray-900 dark:text-gray-50">
                    report.docx
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm dark:text-gray-400">
                    12 KB
                  </span>
                  <span className="text-gray-500 text-sm dark:text-gray-400">
                    2 days ago
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Additional folders and files would be similarly handled */}
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
