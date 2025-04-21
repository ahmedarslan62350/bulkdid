"use client";

import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/combinedStores";
import { IUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const router = useRouter();
  
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      toast({
        title: "Error",
        description: "You are not allowed to perform this action",
        variant: "destructive",
      });
      
      router.replace("/auth/login");
    }
  }, [user, router]);
  
  if (!user || Object.keys(user).length === 0) {
    return null; // Prevent rendering children during redirection
  }

  return <>{children}</>;
};

export default AuthWrapper;
