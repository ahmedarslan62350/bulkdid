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

const TransactionTab = () => {
  return (
    <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="transaction-limit">Daily Transaction Limit ($)</Label>
          <Input type="number" id="transaction-limit" defaultValue={10000} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="fraud-detection">Enhanced Fraud Detection</Label>
          <Switch id="fraud-detection" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transaction-fee">Transaction Fee (%)</Label>
          <Input
            type="number"
            id="transaction-fee"
            defaultValue={2.5}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Default Currency</Label>
          <Select defaultValue="usd">
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select default currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
              <SelectItem value="jpy">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
  )
}

export default TransactionTab