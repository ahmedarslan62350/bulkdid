"use client";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const ServerTab = () => {
  const [sliderValue, setSliderValue] = useState([70]);
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

  const handelSliderValueChange = (event: [number]) => {
    setSliderValue(event);
  };

  useEffect(() => {
    if (settings) {
      setSliderValue([Number(settings.PM2_SCALE_CPU_USAGE)]);
    }
  }, [settings]);

  if (!settings) return <p>Loading...</p>;

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="auto-scaling">Auto-scaling</Label>
        <Switch disabled id="auto-scaling" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-instances">Maximum Server Instances</Label>
        <Input disabled type="number" id="max-instances" defaultValue={10} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-instances">Current Server Instances</Label>
        <Input
          type="number"
          id="max-instances"
          defaultValue={Number(settings.APP_INSTANCES)}
          onChange={(e) =>
            handleUpdateSettings("APP_INSTANCES", e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpu-threshold">
          CPU Threshold for Scaling ({sliderValue[0]}%)
        </Label>
        <Slider
          id="cpu-threshold"
          value={sliderValue}
          onValueChange={(e) => {
            handelSliderValueChange(e as [number]);
            handleUpdateSettings("PM2_SCALE_CPU_USAGE", e[0].toString());
          }}
          max={100}
          step={1}
        />
      </div>
    </CardContent>
  );
};

export default ServerTab;
