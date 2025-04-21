"use client";

import { CustomDialogBox } from "@/components/fragments/client/global/CustomDialogBox";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useSelector((state: RootState) => state.admin.settings);

  const [isRegistrationEnabled, setIsRegistrationEnabled] = useState(
    settings?.IS_REGISTRATION_ENABLE === "true"
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!settings) {
      dispatch(getAdminSettings());
    }
  }, [dispatch, settings]);

  const handleUpdateSettings = (key: string, value: string) => {
    dispatch(updateSettings({ key, value }));
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <CardContent className="space-y-4">
      <div className="flex w-full items-center gap-2">
        <Label htmlFor="user-registration">User Registration</Label>
        <CustomDialogBox
          variant="destructive"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isFile={false}
          title="Remove user registration"
          desc="Are you sure and want to remove the registration process.New user cannot be able to create the account"
          submitFunction={() => {
            handleUpdateSettings("IS_REGISTRATION_ENABLE", String(false));
            setIsOpen(false);
            setIsRegistrationEnabled(false);
          }}
          cancelFunction={() => {
            setIsRegistrationEnabled(true);
            setIsOpen(false);
          }}
        />
        <Switch
          id="whatsapp-integration"
          checked={isRegistrationEnabled}
          onCheckedChange={(checked) => {
            if (!checked) {
              setIsOpen(true);
            } else {
              handleUpdateSettings("IS_REGISTRATION_ENABLE", String(true));
              setIsRegistrationEnabled(true);
            }
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-policy">Password Policy</Label>
        <Select
          defaultValue={settings.PASSWORD_POLICY}
          onValueChange={(value) =>
            handleUpdateSettings("PASSWORD_POLICY", value)
          }
        >
          <SelectTrigger id="password-policy">
            <SelectValue placeholder="Select a password policy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic (8+ characters)</SelectItem>
            <SelectItem value="medium">
              Medium (8+ chars, 1 number, 1 uppercase)
            </SelectItem>
            <SelectItem value="strong">
              Strong (10+ chars, number, uppercase, symbol)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="session-timeout">
          Session Timeout (
          {settings.SESSION_TIMEOUT.replace(/\d/g, "") === "m"
            ? "minutes"
            : settings.SESSION_TIMEOUT.replace(/\d/g, "") === "h"
            ? "hours"
            : settings.SESSION_TIMEOUT.replace(/\d/g, "")}
          )
        </Label>
        <Input
          type="number"
          id="session-timeout"
          defaultValue={Number(settings.SESSION_TIMEOUT.replace(/\D/g, ""))}
          onChange={(e) =>
            handleUpdateSettings("SESSION_TIMEOUT", e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
        <Input
          type="number"
          id="max-login-attempts"
          defaultValue={Number(settings.MAX_LOGIN_ATTEMPTS)}
          onChange={(e) =>
            handleUpdateSettings("MAX_LOGIN_ATTEMPTS", e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-withdraw-attempts">Max Withdraws/Day</Label>
        <Input
          type="number"
          id="max-withdraw-attempts"
          defaultValue={Number(settings.MAX_WITHDRAW)}
          onChange={(e) => handleUpdateSettings("MAX_WITHDRAW", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-deposit-attempts">Max Deposits/Day</Label>
        <Input
          type="number"
          id="max-deposit-attempts"
          defaultValue={Number(settings.MAX_DEPOSITS)}
          onChange={(e) => handleUpdateSettings("MAX_DEPOSITS", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-file-attempts">Max Files/Day</Label>
        <Input
          type="number"
          id="max-file-attempts"
          defaultValue={Number(settings.MAX_FILES)}
          onChange={(e) => handleUpdateSettings("MAX_FILES", e.target.value)}
        />
      </div>
    </CardContent>
  );
};

export default UserTab;
