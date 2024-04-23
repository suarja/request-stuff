import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function CustomDialog({
  icon,
  title,
  description = "",
  children,
  testId,
  open,
  displayButton = true,
}: {
  displayButton?: boolean;
  open?: boolean;
  title: string;
  description?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  testId?: string;
}) {
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          {displayButton && (
            <Button
              variant={"outline"}
              size={"icon"}
              data-testid={testId}
              className="p-0 "
            >
              {icon}
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
