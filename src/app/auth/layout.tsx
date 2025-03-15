"use client";

import AuthWrapper from "@/components/auth-wrapper";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full scroll-smooth">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
};

export default layout;
