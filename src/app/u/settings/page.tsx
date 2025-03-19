"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { logoutUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-primary mb-8">Settings</h1>
        <div className=" w-full h-screen overflow-y-auto scroll-smooth ">
          <div className="w-full py-2 px-3 pl-5 rounded-md flex justify-between border border-gray-500">
            <div className="my-auto">Logout Account</div>
            <Button onClick={onClick} variant={"destructive"}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
