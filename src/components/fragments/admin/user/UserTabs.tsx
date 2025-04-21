import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IStore, IUser, IWallet, Transaction } from "@/utils/types";
import { tabsHeadings, useGetTabsContent } from "./tabs";

const UserTabs = ({
  user,
  wallet,
  store,
  handleInputChange,
  isEditing,
  handleSwitchChange,
  handleTransactionStatusChange,
  transactions,
}: {
  user: IUser;
  wallet: IWallet;
  store: IStore;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => void;
  handleSwitchChange: (value: string) => void;
  handleTransactionStatusChange: (id: string, value: string) => void;
  transactions: Transaction[];
  isEditing: boolean;
}) => {
  const tabsContent = useGetTabsContent({
    user,
    handleInputChange,
    isEditing,
    handleSwitchChange,
    handleTransactionStatusChange,
    transactions,
    wallet,
    store,
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
      {tabsContent?.map((e, i) => (
        <TabsContent key={`${i}${e.value}`} value={e.value}>
          {e.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UserTabs;
