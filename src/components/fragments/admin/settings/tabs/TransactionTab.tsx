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
import { CustomDialogBox } from "../../global/CustomDialogBox";
import AddNewBankPage from "@/components/layout/admin/AddBank";
import { useState } from "react";

const TransactionTab = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="space-y-2">
        <Label htmlFor="currency">Banks</Label>
        <Select defaultValue="googlepay">
          <SelectTrigger id="bank">
            <SelectValue placeholder="Banks" />
          </SelectTrigger>
          <SelectContent>
            <div className="flex justify-between items-center p-2 w-full">
              <CustomDialogBox setIsOpen={setIsOpen} isOpen={isOpen}>
                <AddNewBankPage setIsOpen={setIsOpen} />
              </CustomDialogBox>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-2"></div>
            <SelectItem value="googlepay">Google Pay</SelectItem>
            <SelectItem value="amazonpay">Amazon Pay</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
};

export default TransactionTab;
