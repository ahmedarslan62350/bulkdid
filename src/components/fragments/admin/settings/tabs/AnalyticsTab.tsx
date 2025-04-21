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
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AnalyticsTab = () => {
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

  if (!settings) return <p>Loading...</p>;

  return (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="data-retention">Data Retention Period (days)</Label>
        <Input
          type="number"
          id="data-retention"
          defaultValue={Number(settings.DATA_RETENTION_PERIOD)}
          onChange={(e) =>
            handleUpdateSettings("DATA_RETENTION_PERIOD", e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="logs-retention">Logs Retention Period (days)</Label>
        <Input
          type="number"
          id="logs-retention"
          defaultValue={Number(
            settings.LOGS_PERCISTENT_FREQUENCY_IN_DAYS.replace(/\D/g, "")
          )}
          onChange={(e) =>
            handleUpdateSettings(
              "LOGS_PERCISTENT_FREQUENCY_IN_DAYS",
              e.target.value + "d"
            )
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="report-frequency">Backup Generation Frequency</Label>
        <Select
          defaultValue={settings.BACKUP_FQ}
          onValueChange={(value) => handleUpdateSettings("BACKUP_FQ", value)}
        >
          <SelectTrigger id="report-frequency">
            <SelectValue placeholder="Select report frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
};

export default AnalyticsTab;
