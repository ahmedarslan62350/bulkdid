import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Wallet = ({
  user,
  handleInputChange,
  isEditing,
}: {
  user: any;
  handleInputChange: (e: any) => void;
  isEditing: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="balance">Balance</Label>
        <Input
          id="balance"
          name="walletId.balance"
          value={user.walletId.balance}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          name="walletId.currency"
          value={user.walletId.currency}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalWithdraw">Total Withdrawn</Label>
        <Input
          id="totalWithdraw"
          name="walletId.totalWithdraw"
          value={user.walletId.totalWithdraw}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalDeposited">Total Deposited</Label>
        <Input
          id="totalDeposited"
          name="walletId.totalDeposited"
          value={user.walletId.totalDeposited}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="lastWithdraw">Last Withdraw Date</Label>
        <Input
          id="lastWithdraw"
          name="walletId.lastWithdraw"
          value={new Date(user.walletId.lastWithdraw).toLocaleDateString()}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="lastDeposited">Last Deposit Date</Label>
        <Input
          id="lastDeposited"
          name="walletId.lastDeposited"
          value={new Date(user.walletId.lastDeposited).toLocaleDateString()}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="totalBalanceCount">Total Balance Count</Label>
        <Input
          id="totalBalanceCount"
          name="walletId.totalBalanceCount"
          value={user.walletId.totalBalanceCount}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="transactionsCount">Number of Transactions</Label>
        <Input
          id="transactionsCount"
          name="walletId.transactionsCount"
          value={user.walletId.transactionsCount}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default Wallet;
