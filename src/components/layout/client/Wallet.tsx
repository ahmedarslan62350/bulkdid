"use client";

import { useState, useEffect } from "react";
import { WalletBalance } from "@/components/fragments/client/wallet/WalletBalance";
import { RecentTransactions } from "@/components/fragments/client/wallet/RecentTransactions";
import { QuickActions } from "@/components/fragments/client/wallet/QuickAction";
import { useUserAppDispatch } from "@/redux/hooks/userHooks";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combinedStores";
import { ITransaction, IWallet } from "@/utils/types";
import { getTransactions, getWallet } from "@/redux/slices/userSlice";

export default function Wallet() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  const dispatch = useUserAppDispatch();
  const checkAuth = useCheckAuth();
  const userTransactions = useSelector(
    (state: RootState) => state.user.transactions
  ) as ITransaction[];

  const wallet = useSelector(
    (state: RootState) => state.user.wallet
  ) as IWallet | null;

  useEffect(() => {
    if (!userTransactions || userTransactions.length === 0) {
      dispatch(
        getTransactions({ index: currentPage, length: itemsPerPage })
      ).then(({ payload }) => {
        checkAuth(payload);
      });
    }

    if (!wallet) {
      dispatch(getWallet()).then(({ payload }) => {
        checkAuth(payload);
      });
    }
  }, [
    dispatch,
    checkAuth,
    userTransactions,
    currentPage,
    itemsPerPage,
    wallet,
  ]);

  // Calculate total pages when totalCount or itemsPerPage changes
  useEffect(() => {
    if (wallet?.totalTransactions !== undefined) {
      setTotalPages(Math.ceil(wallet.totalTransactions / itemsPerPage));
    }
  }, [wallet?.totalTransactions, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(0); // Reset to first page when changing items per page
  };

  useEffect(() => {
    dispatch(
      getTransactions({ index: currentPage, length: itemsPerPage })
    ).then(({ payload }) => {
      checkAuth(payload);
    });
  }, [itemsPerPage, currentPage, setCurrentPage, dispatch, checkAuth]);


  return (
    <div className="container px-4 py-10 space-y-8">
      <div className="w-full h-fit flex justify-between">
        <h1 className="text-4xl font-bold text-primary">Wallet Details</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <WalletBalance balance={wallet?.balance || 0} currency={"USD"} />
        <QuickActions />
      </div>
      <RecentTransactions
        transactions={userTransactions}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
