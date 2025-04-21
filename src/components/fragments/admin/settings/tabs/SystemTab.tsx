"use client";

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
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const SystemTab = () => {
  const settings = useSelector((state: RootState) => state.admin.settings);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!settings) {
      dispatch(getAdminSettings());
    }
  }, [dispatch, settings]);

  const handleUpdateSettings = (key: string, value: string) => {
    dispatch(updateSettings({ key, value }));
  };

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
        <Switch disabled id="maintenance-mode" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="log-level">Log Level</Label>
        <Select disabled defaultValue="info">
          <SelectTrigger id="log-level">
            <SelectValue placeholder="Select log level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="debug">Debug</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warn">Warn</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="api-rate-limit">API Rate Limit (requests/second)</Label>
        <Input
          type="number"
          id="api-rate-limit"
          defaultValue={Number(settings?.POINTS_PER_SECOND)}
          onChange={(e) =>
            handleUpdateSettings("POINTS_PER_SECOND", e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="timezone">System Timezone</Label>
        <Select defaultValue="utc">
          <SelectTrigger id="timezone">
            <SelectValue placeholder="Select system timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc">UTC</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
};

export default SystemTab;
