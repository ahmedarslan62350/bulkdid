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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { CustomDialogBox } from "@/components/fragments/client/global/CustomDialogBox";

const ServicesTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useSelector((state: RootState) => state.admin.settings);

  const [whatsappEnabled, setWhatsappEnabled] = useState(
    settings?.WHATSAPP_SERVICE_ENABLED === "true"
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
      <div className="flex items-center gap-2">
        <Label htmlFor="email-service">WhatsApp Integration</Label>
        <CustomDialogBox
          variant="destructive"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isFile={false}
          title="Remove whatsapp integration"
          desc="Are you sure and want to remove the whatsapp integration. You cannot get notifications of transaction request.Recommended is not to remove whatspp integration till another provider added to the system"
          submitFunction={() => {
            handleUpdateSettings("WHATSAPP_SERVICE_ENABLED", String(false));
            setIsOpen(false);
            setWhatsappEnabled(false);
          }}
          cancelFunction={() => {
            setWhatsappEnabled(true);
            setIsOpen(false);
          }}
        />
        <Switch
          id="whatsapp-integration"
          checked={whatsappEnabled}
          onCheckedChange={(checked) => {
            if (!checked) {
              setIsOpen(true);
            } else {
              handleUpdateSettings("WHATSAPP_SERVICE_ENABLED", String(true));
              setWhatsappEnabled(true);
            }
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-service">Email Service Provider</Label>
        <Select defaultValue="sendgrid">
          <SelectTrigger id="email-service">
            <SelectValue placeholder="Select email service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sendgrid">SendGrid</SelectItem>
            <SelectItem value="mailchimp">Mailchimp</SelectItem>
            <SelectItem value="aws-ses">AWS SES</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="file-processing-threads">File Processing Threads</Label>
        <Input type="number" id="file-processing-threads" defaultValue={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
        <Input type="number" id="cache-ttl" defaultValue={3600} />
      </div>
    </CardContent>
  );
};

export default ServicesTab;
