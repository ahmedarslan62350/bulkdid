"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export function DeleteLikeDialogBox({
  title,
  desc,
  handleClick,
  buttonClasses,
  variant = "destructive",
  isOpen,
  setIsOpen,
}: {
  title: string;
  desc: string;
  buttonClasses?: string;
  handleClick: (
    e: MouseEvent<HTMLButtonElement>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
  variant?: "destructive" | "default";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" asChild>
        <p className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-gray-100">
          {title}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className={buttonClasses}
            type="submit"
            variant={variant}
            onClick={(e) => {
              setIsOpen(false);
              handleClick(e, setIsOpen);
            }}
          >
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
