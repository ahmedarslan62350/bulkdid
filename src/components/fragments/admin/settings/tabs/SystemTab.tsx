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

const SystemTab = () => {
  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
        <Switch id="maintenance-mode" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="log-level">Log Level</Label>
        <Select defaultValue="info">
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
        <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
        <Input type="number" id="api-rate-limit" defaultValue={1000} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="timezone">System Timezone</Label>
        <Select defaultValue="utc">
          <SelectTrigger id="timezone">
            <SelectValue placeholder="Select system timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc">UTC</SelectItem>
            <SelectItem value="est">Eastern Time (ET)</SelectItem>
            <SelectItem value="pst">Pacific Time (PT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
};

export default SystemTab;
