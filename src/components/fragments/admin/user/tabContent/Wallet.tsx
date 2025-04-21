"use client";

import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IUser, IWallet } from "@/utils/types";

const Wallet = ({
  handleInputChange,
  isEditing,
  wallet,
}: {
  user: IUser;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  wallet: IWallet | undefined;
}) => {
  if (!wallet) return null;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="balance">Balance</Label>
        <Input
          id="balance"
          name="walletId.balance"
          value={wallet.balance}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          name="walletId.currency"
          value={"USD"}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalWithdraw">Total Withdrawn</Label>
        <Input
          id="totalWithdraw"
          name="walletId.totalWithdraw"
          value={wallet.withdraws}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalDeposited">Total Deposited</Label>
        <Input
          id="totalDeposited"
          name="walletId.totalDeposited"
          value={wallet.deposits}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="lastWithdraw">Last Withdraw Date</Label>
        <Input
          id="lastWithdraw"
          name="walletId.lastWithdraw"
          value={new Date(wallet.updatedAt as Date).toLocaleDateString() || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="lastDeposited">Last Deposit Date</Label>
        <Input
          id="lastDeposited"
          name="walletId.lastDeposited"
          value={new Date(wallet.updatedAt as Date).toLocaleDateString()}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalBalanceCount">Total Balance Count</Label>
        <Input
          id="totalBalanceCount"
          name="walletId.totalBalanceCount"
          value={wallet.balance}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="transactionsCount">Number of Transactions</Label>
        <Input
          id="transactionsCount"
          name="walletId.transactionsCount"
          value={wallet.totalTransactions}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default Wallet;
