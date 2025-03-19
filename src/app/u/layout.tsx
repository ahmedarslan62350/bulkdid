"use client";

import React from "react";
import SideBar from "@/components/fragments/admin/global/SideBar";
import { SideBarNavItems } from "@/utils/types";
import { User, File, Upload, Wallet, DollarSign, Settings } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Ensure hooks are always called in the same order
  const items: SideBarNavItems[] = [
    { href: "/u/my-profile", icon: User, label: "Profile" },
    { href: "/u/my-files", icon: File, label: "Files" },
    { href: "/u/upload", icon: Upload, label: "Upload" },
    { href: "/u/wallet", icon: Wallet, label: "Wallet" },
    { href: "/u/transactions", icon: DollarSign, label: "Transactions" },
    { href: "/u/settings", icon: Settings, label: "Settings" },
  ];
  return (
    <div className="flex w-full">
      <SideBar navItems={items} />
      {children}
    </div>
  );
};
export default Layout;
