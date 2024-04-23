"use client";

import React, { useState } from "react";

interface FolderProps {
  name: string;
  children: Array<FolderProps>; // Recursive type for nested folders
}

const Folder: React.FC<FolderProps> = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleFolder} className="cursor-pointer font-bold">
        {name}
      </div>
      {isOpen && (
        <div className="ml-4">
          {children.map((child, index) => (
            <Folder key={index} name={child.name} children={child.children} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC = () => {
  const [root, setRoot] = useState<FolderProps>({
    name: "Root",
    children: [
      {
        name: "Folder 1",
        children: [],
      },
      {
        name: "Folder 2",
        children: [],
      },
    ],
  });

  return (
    <div>
      <Folder name={root.name} children={root.children} />
    </div>
  );
};

export default FileTree;
