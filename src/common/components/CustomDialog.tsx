import { cn } from "@/lib/utils";

import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";

/**
 * CustomDialog component displays a dialog with a title, description, and optional button.
 *
 * @component
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
  setOpen,
}: {
  /**
   * Determines whether to display the button. Default is true.
   */
  displayButton?: boolean;
  /**
   * Determines whether the dialog is open. Default is undefined.
   */
  open?: boolean;
  /**
   * The title of the dialog.
   */
  title: string;
  /**
   * The description of the dialog. Default is an empty string.
   */
  description?: string;
  /**
   * The icon to be displayed in the button. Default is the AddIcon component.
   */
  icon?: React.ReactNode;
  /**
   * The content to be displayed inside the dialog.
   */
  children?: React.ReactNode;
  /**
   * The test ID for the button.
   */
  testId?: string;
  /**
   * The text to be displayed on the button. If not provided, the icon will be used.
   */
  buttonText?: string;
  /**
   * The variant of the button. Can be one of: "link", "default", "destructive", "outline", "secondary", "ghost". Default is "default".
   */
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  /**
   * The size of the button. Can be one of: "default", "icon", "sm", "lg". Default is null.
   */
  buttonSize?: "default" | "icon" | "sm" | "lg" | null | undefined;
  /**
   * The class name for the button.
   */
  buttonClassName?: string;
  /**
   * Callback function to set the open state of the dialog.
   */
  setOpen?: (open: boolean) => void;
}) {
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          {displayButton && (
            <button
              onClick={() => setOpen?.(true)}
              className={cn(
                `text-gray-300 text-sm bg-green-900 p-2 rounded-xl  hover:text-gray-900 dark:text-gray-50 dark:hover:bg-green-600  focus:outline-none`,
                `${buttonClassName}`
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
