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

export default function CustomDialog({
  icon = <AddIcon />,
  title,
  description = "",
  children,
  testId,
  open,
  displayButton = true,
  buttonText,
  buttonVariant,
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
}) {
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          {displayButton && (
            <Button
              variant={buttonVariant ?? "default"}
              size={buttonText ? "sm" : "icon"}
              data-testid={testId}
              className="p-2 "
            >
              {buttonText ?? icon}
            </Button>
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
