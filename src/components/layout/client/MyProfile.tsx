"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ChangePasswordDialogBox from "@/components/fragments/client/my-profile/ChangePasswordDialogBox";

export function MyProfile() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    // Here you would typically call an API to change the password
    console.log("Changing password:", { currentPassword, newPassword });
    toast({
      title: "Success",
      description: "Your password has been changed.",
    });
    setIsChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-500">john.doe@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value="johndoe" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value="john.doe@example.com"
              disabled
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsChangePasswordOpen(true)}>
          Change Password
        </Button>
      </CardFooter>

      <ChangePasswordDialogBox
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        handleChangePassword={handleChangePassword}
        isChangePasswordOpen={isChangePasswordOpen}
        newPassword={newPassword}
        setIsChangePasswordOpen={setIsChangePasswordOpen}
        setNewPassword={setNewPassword}
      />
    </Card>
  );
}
