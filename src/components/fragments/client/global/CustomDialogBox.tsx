"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IFile } from "@/utils/types";

export function CustomDialogBox({
  isOpen,
  setIsOpen,
  title,
  selectedFile,
  submitFunction,
  desc,
  variant = "default",
  isFile = true,
  cancelFunction,
}: {
  isOpen: boolean;
  isFile?: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  selectedFile?: IFile | null;
  submitFunction?: () => void;
  cancelFunction?: () => void;
  desc?: string;
  variant?: "default" | "destructive";
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {desc} &quot;{selectedFile?.name}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => (cancelFunction ? cancelFunction() : setIsOpen(false))}
          >
            Cancel
          </Button>
          <Button
            variant={variant}
            onClick={() =>
              isFile
                ? selectedFile && submitFunction && submitFunction()
                : submitFunction && submitFunction()
            }
          >
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
