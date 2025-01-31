import TransactionDetails from "@/components/fragments/admin/transaction/Transaction";
import React from "react";

const Transaction = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <div className="w-full h-screen ">
      <TransactionDetails />
    </div>
  );
};

export default Transaction;
