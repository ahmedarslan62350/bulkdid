import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "@/utils/types";
import { getTabsContent, tabsHeadings } from "./tabs";

const UserTabs = ({
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
  const tabsContent = getTabsContent({
    user,
    handleInputChange,
    isEditing,
    handleSwitchChange,
    handleTransactionStatusChange,
    transactions,
  });

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="">
        {tabsHeadings.map((e, i) => (
          <TabsTrigger key={`${e}${i}`} value={e.value}>
            {e.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsContent.map((e, i) => (
        <TabsContent key={`${i}${e.value}`} value={e.value}>
          {e.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UserTabs;
