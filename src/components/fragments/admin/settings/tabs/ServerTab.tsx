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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const ServerTab = () => {
  const [sliderValue, setSliderValue] = useState([70]);

  const handelSliderValueChange = (event: [number]) => {
    setSliderValue(event);
  };
  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="auto-scaling">Auto-scaling</Label>
        <Switch id="auto-scaling" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-instances">Maximum Server Instances</Label>
        <Input type="number" id="max-instances" defaultValue={10} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="backup-frequency">Backup Frequency</Label>
        <Select defaultValue="daily">
          <SelectTrigger id="backup-frequency">
            <SelectValue placeholder="Select backup frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpu-threshold">CPU Threshold for Scaling ({sliderValue[0]}%)</Label>
        <Slider
          id="cpu-threshold"
          value={sliderValue}
          onValueChange={(e) => handelSliderValueChange(e as [number])}
          max={100}
          step={1}
        />
      </div>
    </CardContent>
  );
};

export default ServerTab;
