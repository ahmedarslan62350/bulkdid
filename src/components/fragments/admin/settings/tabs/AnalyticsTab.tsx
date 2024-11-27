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
const AnalyticsTab = () => {
  return (
    <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data-retention">Data Retention Period (days)</Label>
          <Input type="number" id="data-retention" defaultValue={90} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="anonymize-data">Anonymize Personal Data</Label>
          <Switch id="anonymize-data" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="report-frequency">Report Generation Frequency</Label>
          <Select defaultValue="weekly">
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
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-events">Track Custom Events</Label>
          <Switch id="custom-events" />
        </div>
      </CardContent>
  )
}

export default AnalyticsTab