"use client";

import { ReactNode } from "react";
import useAuth from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return;

  if (user?.role !== "admin") {
    toast({
      title: "Unauthorized",
      description: "You are not eligible for this",
      variant: "destructive",
    });

    redirect("/u/my-profile");
  }

  return <>{children}</>;
}
