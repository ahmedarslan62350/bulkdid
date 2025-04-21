"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getTransactionsByAdmin } from "@/redux/slices/adminSlice";
import { ITransaction } from "@/utils/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransactionPage({
  params,
}: {
  params: Promise<{ id: string; transactionId: string }>;
}) {
  const { id, transactionId } = React.use(params);
  const [transaction, setTransaction] = useState<ITransaction | null>();
  const [hasImage] = useState(false);
  const [activeTab, setActiveTab] = useState("Details");
  const transactions = useSelector(
    (state: RootState) => state.admin.transactions
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!transactions.length) {
      dispatch(getTransactionsByAdmin());
    }
  }, [dispatch, transactions]);

  useEffect(() => {
    if (transactions.length && transactionId) {
      const found = transactions.find((e) => e._id === transactionId);
      if (found) {
        setTransaction(found);
      }
    }
  }, [transactions, transactionId]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <Card className="w-full border-none rounded-none shadow-none mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Link
              href={`/admin/user/${id}`}
              className="flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to User
            </Link>
          </div>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Transaction ID: {transaction._id}</CardDescription>
        </CardHeader>

        <CardContent className="h-full">
          {/* Tabs for Picture and Details */}
          <div className="mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "Picture" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("Picture")}
              disabled={!hasImage} // Disable picture tab if no image is available
            >
              Picture
            </button>
            <button
              className={`px-4 py-2 ml-4 ${
                activeTab === "Details" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("Details")}
            >
              Details
            </button>
          </div>

          {/* Picture Tab Content */}
          {activeTab === "Picture" && hasImage && (
            <div className="w-full h-full max-h-60vh flex justify-center items-center">
              <div className="p-3 overflow-hidden flex justify-center items-center flex-col w-[45%] h-full max-h-[60vh]">
                <div className="w-fit h-full cursor-pointer border-zinc-200 border-[1px] shadow-md overflow-hidden rounded-sm">
                  {/* <Image
                    src={
                      isProduction
                        ? `https://login.bulkdid.net/download${transaction?.imageUrl}`
                        : `http://localhost:5000${transaction?.imageUrl}`
                    }
                    alt="Transaction Screenshot"
                    className="w-fit rounded-sm h-full object-cover"
                    width={100}
                    height={100}
                  /> */}
                </div>
              </div>
            </div>
          )}

          {/* Details Tab Content */}
          {activeTab === "Details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <p>{transaction.amount}</p>
              </div>
              <div>
                <Label>Type</Label>
                <p>{transaction.type}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p>Fulfilled</p>
              </div>
              <div>
                <Label>Date</Label>
                <p>
                  {new Date(transaction.createdAt as Date).toLocaleString()}
                </p>
              </div>
              <div>
                <Label>From</Label>
                <p>{transaction.from}</p>
              </div>
              <div>
                <Label>To</Label>
                <p>{transaction.to}</p>
              </div>
              <div>
                <Label>Account Holder</Label>
                <p>{transaction.walletId}</p>
              </div>
              {/* <div>
                <Label>BBT</Label>
                <p>
                  <span className="font-bold">$</span>{" "}
                  {transaction.BBT.toFixed(3)}
                </p>
              </div> */}
              {/* <div>
                <Label>BAT</Label>
                <p>
                  <span className="font-bold">$</span>{" "}
                  {transaction.BAT.toFixed(3)}
                </p>
              </div> */}
            </div>
          )}

          {/* If no image exists and the user clicks on the "Picture" tab, show a message */}
          {activeTab === "Picture" && !hasImage && (
            <p>No picture available for this transaction.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
