"use client"

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
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

export function DeleteLikeDialogBox({
  title,
  desc,
  handleClick,
  buttonClasses,
}: {
  title: string;
  desc: string;
  buttonClasses?: string; 
  handleClick:(e: MouseEvent<HTMLButtonElement> , setIsOpen:Dispatch<SetStateAction<boolean>>)=>void;
}) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <p className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-gray-100">{title}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className={buttonClasses} type="submit" variant={"destructive"} onClick={(e:MouseEvent<HTMLButtonElement>)=>handleClick(e , setIsOpen)}>
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
