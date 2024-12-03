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

const UserTab = () => {
  return (
    <CardContent className="space-y-4">
      <div className="flex w-full items-center gap-2">
        <Label htmlFor="user-registration">User Registration</Label>
        <Switch id="user-registration" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-policy">Password Policy</Label>
        <Select defaultValue="strong">
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
        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
        <Input type="number" id="session-timeout" defaultValue={30} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
        <Input type="number" id="max-login-attempts" defaultValue={5} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-withdraw-attempts">Max Withdraws/Day</Label>
        <Input type="number" id="max-withdraw-attempts" defaultValue={5} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-deposit-attempts">Max Deposits/Day</Label>
        <Input type="number" id="max-deposit-attempts" defaultValue={5} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-file-attempts">Max Files/Day</Label>
        <Input type="number" id="max-file-attempts" defaultValue={5} />
      </div>
    </CardContent>
  );
};

export default UserTab;
