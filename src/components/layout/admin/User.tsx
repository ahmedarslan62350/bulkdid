"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit2, Save } from "lucide-react";
import Link from "next/link";
// import { User } from "@/models/user.model";
// import { Wallet } from "@/models/wallet.model";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import UserTabs from "@/components/fragments/admin/user/UserTabs";
import { Transaction, UserDetailsProps } from "@/utils/types";

export default function User({ user: initialUser }: UserDetailsProps | any) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>(
    initialUser?.walletId?.transactions
  );

  const toggleEdit = () => setIsEditing(!isEditing);
  console.log(initialUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("walletId")) {
      setUser((prevUser: any) => ({
        ...prevUser,
        walletId: {
          ...prevUser.walletId,
          [name.replace("walletId.", "")]: value,
        },
      }));
      return;
    }

    setUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };

  const handleSwitchChange = (name: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: !prevUser[name as keyof any],
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put("/api/admin/user", {
        updatedUser: user,
      });
      console.log(data);
      if (data?.success === false) {
        toast({
          title: "Error",
          description: data.message,
          duration: 5000,
        });
        return;
      }
      toggleEdit();
      toast({
        title: "Success",
        description: "User updated successfully",
        duration: 5000,
      });
    } catch (error) {}
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
    <Card className="w-full rounded-none border-none shadow-none">
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
          <img
            src={user.profileImage || "/placeholder.svg?height=200&width=200"}
            alt={`${user.username}'s avatar`}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <CardTitle>{user.username}</CardTitle>
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
        />
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Label>Logged in with credentials:</Label>
          <Switch
            checked={user.isLoggedInWithCredentials}
            onCheckedChange={() =>
              handleSwitchChange("isLoggedInWithCredentials")
            }
            disabled={!isEditing}
          />
        </div>
      </CardFooter>
    </Card>
  );
}