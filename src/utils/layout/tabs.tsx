import AnalyticsTab from "@/components/fragments/admin/settings/tabs/AnalyticsTab";
import ServerTab from "@/components/fragments/admin/settings/tabs/ServerTab";
import ServicesTab from "@/components/fragments/admin/settings/tabs/ServicesTab";
import SystemTab from "@/components/fragments/admin/settings/tabs/SystemTab";
import TransactionTab from "@/components/fragments/admin/settings/tabs/TransactionTab";
import UserTab from "@/components/fragments/admin/settings/tabs/UserTab";

export const tabsTriggers = [
  "Users",
  "Transactions",
  "Analytics",
  "Services",
  "Servers",
  "System",
];

export const tabsList = [
  {
    title: "Users Settings",
    desc: "Manage user-related configurations",
    value: "users",
    content: <UserTab />,
  },
  {
    title: "Transactions Settings",
    desc: "Configure transaction processing options",
    value: "transactions",
    content: <TransactionTab />,
  },
  {
    title: "Analytics Settings",
    desc: " Manage data collection and reporting",
    value: "analytics",
    content: <AnalyticsTab />,
  },
  {
    title: "Service Settings",
    desc: "Configure microservices and integrations",
    value: "services",
    content: <ServicesTab />,
  },
  {
    title: "Server Settings",
    desc: "Manage server configurations and resources",
    value: "servers",
    content: <ServerTab />,
  },
  {
    title: "System Settings",
    desc: "Configure global system parameters",
    value: "system",
    content: <SystemTab />,
  },
];
