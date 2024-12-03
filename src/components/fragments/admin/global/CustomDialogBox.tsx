"use client";

import { cloneElement, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CustomDialogBox({
  children,
  isOpen,
  setIsOpen,
  title,
  desc,
}: {
  children: ReactElement;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  desc?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {cloneElement(children, setIsOpen)}
      </DialogContent>
    </Dialog>
  );
}
