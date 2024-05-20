"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";

import { Button } from "@/common/components/ui/button";
import AddIcon from "../icons/AddIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { cn } from "@/lib/utils";

/**
 * CustomDialog component displays a dialog with a title, description, and optional button.
 *
 * @param displayButton - Determines whether to display the button. Default is true.
 * @param open - Determines whether the dialog is open. Default is undefined.
 * @param title - The title of the dialog.
 * @param description - The description of the dialog. Default is an empty string.
 * @param icon - The icon to be displayed in the button. Default is the AddIcon component.
 * @param children - The content to be displayed inside the dialog.
 * @param testId - The test ID for the button.
 * @param buttonText - The text to be displayed on the button. If not provided, the icon will be used.
 * @param buttonVariant - The variant of the button. Can be one of: "link", "default", "destructive", "outline", "secondary", "ghost". Default is "default".
 * @param buttonSize - The size of the button. Can be one of: "default", "icon", "sm", "lg". Default is null.
 *
 * @returns The CustomDialog component.
 *
 * @example
 * <CustomDialog buttonText="Add File" title="Add File">
 *  <FileUpload />
 * </CustomDialog>
 */
export default function CustomDialog({
  displayButton = true,
  open,
  title,
  description = "",
  icon = <PlusIcon />,
  children,
  testId,
  buttonText,
  buttonVariant,
  buttonSize,
  buttonClassName,
}: {
  displayButton?: boolean;
  open?: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  testId?: string;
  buttonText?: string;
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  buttonSize?: "default" | "icon" | "sm" | "lg" | null | undefined;
  buttonClassName?: string;
}) {
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          {displayButton && (
            <button
              className={cn(
                `text-gray-300 text-sm bg-green-900 p-2 rounded-xl  hover:text-gray-900 dark:text-gray-50 dark:hover:bg-green-600  focus:outline-none`, `${buttonClassName}`
              )}
              data-testid={testId}
            >
              {buttonText ?? icon}
            </button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
