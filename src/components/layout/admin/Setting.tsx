"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SettingsTabs from "@/components/fragments/admin/settings/SettingsTabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings } from "@/redux/slices/adminSlice";
import { IBankendError } from "@/utils/types";
import axiosInstance from "@/lib/axiosInstance";
import { ENV } from "@/config/env";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const settings = useSelector((state: RootState) => state.admin.settings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!settings) {
      dispatch(getAdminSettings());
    }
  }, [dispatch, settings]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (settings) {
        const { data } = await axiosInstance.post(
          `${ENV.BACKEND_URL}/admin/change-env-variable`,
          { settings }
        );

        toast({
          title: "Success",
          description: data.message,
        });
      }
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        variant: "destructive",
        description: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <SettingsTabs />
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
