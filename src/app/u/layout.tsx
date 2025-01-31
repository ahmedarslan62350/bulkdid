"use client";

import React from "react";
import SideBar from "@/components/fragments/admin/global/SideBar";
import { SideBarNavItems } from "@/utils/types";
import { User, File, Upload, Wallet, Crown, DollarSign } from "lucide-react";

const navItems: SideBarNavItems[] = [
  { href: "/u/my-profile", icon: User, label: "Profile" },
  { href: "/u/my-files", icon: File, label: "Files" },
  { href: "/u/upload", icon: Upload, label: "Upload" },
  { href: "/u/wallet", icon: Wallet, label: "Wallet" },
  { href: "/u/transactions", icon: DollarSign, label: "Transactions" },
  { href: "/admin", icon: Crown, label: "Admin" },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full blur-[.4px]">
      <SideBar navItems={navItems} />
      {children}
    </div>
  );
};

export default layout;
