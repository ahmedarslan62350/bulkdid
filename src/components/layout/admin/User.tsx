"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Edit2, Save } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import UserTabs from "@/components/fragments/admin/user/UserTabs";
import {
  IBankendError,
  IStore,
  IUser,
  IWallet,
  Transaction,
  UserDetailsProps,
} from "@/utils/types";
import { ENV } from "@/config/env";

export default function User({
  user: initialUser,
  store: initialStore,
  wallet: initialWallet,
}: {
  user: IUser;
  store: IStore;
  wallet: IWallet;
}) {
  const [user, setUser] = useState(initialUser);
  const [wallet, setWallet] = useState(initialWallet);
  const [store, setStore] = useState(initialStore);
  const [isEditing, setIsEditing] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>(
    initialUser?.walletId?.transactions
  );

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    if (name.includes("walletId")) {
      setWallet((prev) => ({ ...prev, [name.split(".")[1]]: value }));
      return;
    }

    if (name.includes("storeId") || name.includes("store")) {
      setStore((prev) => ({ ...prev, [name.split(".")[1]]: value }));
      return;
    }

    setUser((prevUser: UserDetailsProps["user"]) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSwitchChange = (name: string) => {
    setUser((prevUser: UserDetailsProps["user"]) => ({
      ...prevUser,
      [name]: !prevUser[name as keyof UserDetailsProps["user"]],
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        ENV.BACKEND_URL + "/admin/update-user",
        {
          user,
          wallet,
          store,
        }
      );
      toggleEdit();
      toast({
        title: "Success",
        description: data.message,
        duration: 5000,
      });
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        description: err.response.data.message,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
  };

  const handleTransactionStatusChange = (
    transactionId: string,
    newStatus: string
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === transactionId
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
    // In a real application, you would send this update to your API
    console.log(`Updated transaction ${transactionId} status to ${newStatus}`);
  };

  return (
    <Card className="w-full h-screen overflow-y-auto rounded-none border-none shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
          {isEditing ? (
            <Button onClick={handleSave} variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          ) : (
            <Button onClick={toggleEdit} variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <UserTabs
          handleInputChange={handleInputChange}
          handleSwitchChange={handleSwitchChange}
          handleTransactionStatusChange={handleTransactionStatusChange}
          isEditing={isEditing}
          transactions={transactions}
          user={user}
          wallet={wallet}
          store={store}
        />
      </CardContent>
    </Card>
  );
}
