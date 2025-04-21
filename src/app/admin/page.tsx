"use client";

import Users from "@/components/layout/admin/Users";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/combinedStores";
import { IUser } from "@/utils/types";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  if (user?.role !== "admin") {
    toast({
      title: "Unauthorized",
      description: "You are not eligible for this",
      variant: "destructive",
    });

    redirect("/u/my-profile");
  }
  return (
    <>
      <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
        <Users />
      </div>
    </>
  );
};

export default Page;
