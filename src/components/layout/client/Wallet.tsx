import { WalletBalance } from "@/components/fragments/client/wallet/WalletBalance";
import { RecentTransactions } from "@/components/fragments/client/wallet/RecentTransactions";
import { QuickActions } from "@/components/fragments/client/wallet/QuickAction";
import { walletData } from "@/utils/dumyData";
import { RecentTransaction } from "@/utils/types";

export default function Wallet() {
  return (
    <div className="container px-4 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Wallet Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <WalletBalance
          balance={walletData.balance}
          currency={walletData.currency}
        />
        <QuickActions />
      </div>
      <RecentTransactions
        transactions={walletData.transactions as RecentTransaction[]}
      />
    </div>
  );
}
