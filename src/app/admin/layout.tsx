"use client";

import React from "react";
import SideBar from "@/components/fragments/admin/global/SideBar";
import { SideBarNavItems } from "@/utils/types";
import {
  ChartArea,
  Logs,
  Server,
  Settings,
  Users,
  Wallet,
  User,
} from "lucide-react";
import AdminWrapper from "@/components/admin-wrapper";

const navItems: SideBarNavItems[] = [
  { href: "/admin", icon: Users, label: "Admin" },
  { href: "/admin/transactions", icon: Wallet, label: "Transactions" },
  { href: "/admin/analytics", icon: ChartArea, label: "Analytics" },
  { href: "/admin/server-details", icon: Server, label: "Server Details" },
  { href: "/admin/logs", icon: Logs, label: "Logs" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/u/my-profile", icon: User, label: "Settings" },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex scroll-smooth">
        <SideBar navItems={navItems} />
        <AdminWrapper>{children}</AdminWrapper>
      </div>
    </>
  );
};

export default layout;
