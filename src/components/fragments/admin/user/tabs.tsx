"use client";

import { Transaction } from "@/utils/types";
import General from "./tabContent/General";
import Security from "./tabContent/Security";
import Wallet from "./tabContent/Wallet";
import Transactions from "./tabContent/Transactions";
import Files from "./tabContent/Files";

export const tabsHeadings = [
  {
    value: "general",
    label: "General",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "walletId",
    label: "Wallet ID",
  },
  {
    value: "transactions",
    label: "Transactions",
  },
  {
    value: "files",
    label: "Files",
  },
];

export const getTabsContent = ({
  user,
  handleInputChange,
  isEditing,
  handleSwitchChange,
  handleTransactionStatusChange,
  transactions,
}: {
  user: any;
  handleInputChange: (e: any) => void;
  handleSwitchChange: (value: string) => void;
  handleTransactionStatusChange: (id: string, value: string) => void;
  transactions: Transaction[];
  isEditing: boolean;
}) => {
  return [
    {
      value: "general",
      content: (
        <General
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          user={user}
        />
      ),
    },
    {
      value: "security",
      content: (
        <Security
          handleInputChange={handleInputChange}
          handleSwitchChange={handleSwitchChange}
          isEditing={isEditing}
          user={user}
        />
      ),
    },
    {
      value: "walletId",
      content: (
        <Wallet
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          user={user}
        />
      ),
    },
    {
      value: "transactions",
      content: (
        <Transactions
          handleInputChange={handleInputChange}
          handleTransactionStatusChange={handleTransactionStatusChange}
          isEditing={isEditing}
          transactions={transactions}
          user={user}
        />
      ),
    },
    {
      value: "files",
      content: <Files user={user} />,
    },
  ];
};
