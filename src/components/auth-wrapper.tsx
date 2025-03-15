"use client";

import { ReactNode } from "react";
import useAuth from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return;

  if (user) redirect("/u/my-profile");

  return <>{children}</>;
}
