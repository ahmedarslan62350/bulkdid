"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChangePasswordDialogBox from "@/components/fragments/client/my-profile/ChangePasswordDialogBox";
import { IUser } from "@/utils/types";

export function MyProfile({ user }: { user?: IUser | null }) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
              <p className="text-gray-500">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={user?.name || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ""} disabled />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsChangePasswordOpen(true)}>
          Change Password
        </Button>
      </CardFooter>

      <ChangePasswordDialogBox
        isOpen={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </Card>
  );
}
