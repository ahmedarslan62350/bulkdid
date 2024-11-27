"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChartArea,
  LogOut,
  Logs,
  Server,
  Settings,
  Terminal,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="flex flex-col justify-between items-start py-5 w-14 h-screen bg-white border-r-[.5px] border-gray-200 ">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src="/favicon.ico" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-start items-start flex-col h-fit w-full gap-1 text-gray-500 px-1">
          <Button
            onClick={() => setPathname("/admin")}
            className={`${pathname === "/admin" ? "bg-gray-100" : null}`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin"}>
              <User className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/transactions")}
            className={`${
              pathname === "/admin/transactions" ? "bg-gray-100" : null
            }`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/transactions"}>
              <Wallet className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/analytics")}
            className={`${
              pathname === "/admin/analytics" ? "bg-gray-100" : null
            }`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/analytics"}>
              <ChartArea className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/server-details")}
            className={`${
              pathname === "/admin/server-details" ? "bg-gray-100" : null
            }`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/server-details"}>
              <Server className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/logs")}
            className={`${pathname === "/admin/logs" ? "bg-gray-100" : null}`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/logs"}>
              <Logs className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/terminal")}
            className={`${
              pathname === "/admin/terminal" ? "bg-gray-100" : null
            }`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/terminal"}>
              <Terminal className="w-5 h-5 border" />
            </Link>
          </Button>

          <Button
            onClick={() => setPathname("/admin/settings")}
            className={`${
              pathname === "/admin/settings" ? "bg-gray-100" : null
            }`}
            asChild
            variant={"ghost"}
          >
            <Link href={"/admin/settings"}>
              <Settings className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col h-fit w-full gap-1 text-gray-500">
        <Button asChild variant={"ghost"}>
          <Link href={"#"}>
            <LogOut className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
