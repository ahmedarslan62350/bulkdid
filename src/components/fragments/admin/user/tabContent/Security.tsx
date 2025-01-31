import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { User } from "@/utils/types";

const Security = ({
  user,
  handleInputChange,
  isEditing,
  handleSwitchChange,
}: {
  user: User;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEditing: boolean;
  handleSwitchChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="verified"
          checked={user.isVerified}
          onCheckedChange={() => handleSwitchChange("isVerified")}
          disabled={!isEditing}
        />
        <Label htmlFor="verified">Verified</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="admin"
          checked={user.role == "admin" ? true : false}
          onCheckedChange={() => handleSwitchChange("isAdmin")}
          disabled={!isEditing}
        />
        <Label htmlFor="admin">Admin</Label>
      </div>
      <div>
        <Label htmlFor="verifyCode">Verify Code</Label>
        <Input
          id="verifyCode"
          name="verifyCode"
          value={user.verifyCode}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="verifyCodeExpiry">Verify Code Expiry</Label>
        <Input
          id="verifyCodeExpiry"
          name="verifyCodeExpiry"
          value={user.verifyCodeExpiry}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="verifyCodeLimit">Verify Code Limit</Label>
        <Input
          id="verifyCodeLimit"
          name="verifyCodeLimit"
          type="number"
          value={user.verifyCodeLimit}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default Security;
