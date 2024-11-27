"use client"

import SideBar from "@/components/fragments/admin/global/SideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex scroll-smooth">
        <SideBar />
        {children}
      </div>
    </>
  );
};

export default layout;
