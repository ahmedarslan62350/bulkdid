import React, { ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ITransaction, IUser } from "@/utils/types";

const Transactions = ({
  user,
  transactions,
}: {
  user: IUser;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  handleTransactionStatusChange: (id: string, value: string) => void;
  transactions: ITransaction[];
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0
              ? null
              : [...transactions].reverse().map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt as Date).toDateString()}
                    </TableCell>
                    <TableCell>{'Unknown'}</TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/user/${user._id}/transactions/${transaction._id}`}
                      >
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
