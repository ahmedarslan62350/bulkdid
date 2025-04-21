/* eslint-disable @next/next/no-img-element */
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
import { CustomDialogBox } from "../../global/CustomDialogBox";
import AddNewBankPage from "@/components/layout/admin/AddBank";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getAdminSettings, updateSettings } from "@/redux/slices/adminSlice";
import { getBanks } from "@/redux/slices/userSlice";
import { IBank } from "@/utils/types";

const TransactionTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const settings = useSelector((state: RootState) => state.admin.settings);
  const banks = useSelector((state: RootState) => state.user.banks) as IBank[];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!settings) {
      dispatch(getAdminSettings());
    }
  }, [dispatch, settings]);

  useEffect(() => {
    if (!banks.length) {
      dispatch(getBanks());
    }
  }, [dispatch, banks]);

  const handleUpdateSettings = (key: string, value: string) => {
    dispatch(updateSettings({ key, value }));
  };

  if (!settings || !banks.length)
    return <p className="w-full text-center p-5">Loading...</p>;

  return (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="transaction-fee">Transaction Fee (%)</Label>
        <Input
          type="number"
          id="transaction-fee"
          defaultValue={Number(settings.TRANSACTION_FEE_IN_PERCENT)}
          onChange={(e) =>
            handleUpdateSettings("TRANSACTION_FEE_IN_PERCENT", e.target.value)
          }
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
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">Banks</Label>
        <Select defaultValue={banks[0]?.name}>
          <SelectTrigger id="bank">
            <SelectValue placeholder="Banks" />
          </SelectTrigger>
          <SelectContent>
            <div className="flex justify-between items-center p-2 w-full">
              <CustomDialogBox
                title="Add new bank"
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              >
                <AddNewBankPage setIsOpen={setIsOpen} />
              </CustomDialogBox>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-2"></div>
            {banks.map((bank: IBank) => (
              <SelectItem key={bank.name} value={bank.name}>
                {bank.icon ? (
                  <>
                    <div className="flex items-center gap-2 w-full h-full">
                      <img
                        className={`flex justify-center rounded items-center`}
                        alt="icon"
                        src={bank.icon}
                        width={bank.iconWidth}
                        height={bank.iconHeight}
                      />
                      <p>{bank.name}</p>
                    </div>
                  </>
                ) : (
                  bank.name
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
};

export default TransactionTab;
