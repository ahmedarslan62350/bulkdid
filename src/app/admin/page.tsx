"use client";

import Users from "@/components/layout/admin/Users";
import useAuth from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const page = () => {
  const { user } = useAuth();
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

export default page;
