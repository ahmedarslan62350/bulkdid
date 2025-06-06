import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { IUser } from "@/utils/types";

const Security = ({
  user,
  handleInputChange,
  isEditing,
  handleSwitchChange,
}: {
  user: IUser;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => void;
  isEditing: boolean;
  handleSwitchChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="verified"
          name="isVerified"
          checked={user.isVerified}
          onCheckedChange={() => handleSwitchChange("isVerified")}
          disabled={!isEditing}
        />
        <Label htmlFor="verified">Verified</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="verified"
          name="isVerified"
          checked={user.isBlocked}
          onCheckedChange={() => handleSwitchChange("isBlocked")}
          disabled={!isEditing}
        />
        <Label htmlFor="verified">Blocked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="admin"
          checked={user.role == "admin" ? true : false}
          onCheckedChange={(e) =>
            e
              ? handleInputChange({ target: { name: "role", value: "admin" } })
              : handleInputChange({ target: { name: "role", value: "user" } })
          }
          disabled={!isEditing}
        />
        <Label htmlFor="admin">Admin</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isAllowedToFetch"
          name="isAllowedToFetch"
          checked={user.isAllowedToFetch}
          onCheckedChange={() => handleSwitchChange("isAllowedToFetch")}
          disabled={!isEditing}
        />
        <Label htmlFor="isAllowedToFetch">isAllowedToFetch</Label>
      </div>
      <div>
        <Label htmlFor="verifyCode">Verify Code</Label>
        <Input
          id="verifyCode"
          name="verifyCode"
          value={user.verifyCode || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="verifyCodeExpiry">Verify Code Expiry</Label>
        <Input
          id="verifyCodeExpiry"
          name="verifyCodeExpiry"
          value={new Date(user.verifyCodeExpiry).toDateString()}
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
          value={user.verifyCodeUsed}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default Security;
