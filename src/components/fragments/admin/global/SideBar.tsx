"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logoutUser } from "@/redux/slices/authSlice";
import { SideBarNavItems } from "@/utils/types";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideBar = ({ navItems }: { navItems: SideBarNavItems[] }) => {
  const [pathname, setPathname] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  async function onClick() {
    try {
      await dispatch(logoutUser());
      toast({
        title: "Success",
        description: "logout successfully",
      });

      router.replace("/auth/login");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as string) || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col justify-between items-start py-5 w-14 h-screen bg-black border-r-[.5px] border-gray-200 ">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src="/favicon.ico" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-start items-start flex-col h-fit w-full gap-1 text-gray-500">
          {navItems.map((navItem) => (
            <Button
              key={navItem.href}
              onClick={() => setPathname(navItem.href)}
              className={`${pathname === navItem.href ? "bg-gray-100" : null}`}
              asChild
              variant={"ghost"}
            >
              <Link href={navItem.href} key={navItem.label}>
                {navItem.icon && <navItem.icon className="w-5 h-5" />}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col h-fit w-full gap-1 text-gray-500">
        <Button onClick={onClick} asChild variant={"ghost"}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
