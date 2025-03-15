"use client";

import useAuth from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) return;

  if (user) redirect("/u/my-profile");

  return <div className="flex w-full scroll-smooth">{children}</div>;
};

export default layout;
