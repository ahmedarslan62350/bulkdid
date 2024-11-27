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
const ServicesTab = () => {
  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="whatsapp-integration">WhatsApp Integration</Label>
        <Switch id="whatsapp-integration" />
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
