import React, { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Transaction, User } from "@/utils/types";

const Transactions = ({
  user,
  isEditing,
  transactions,
  handleTransactionStatusChange,
}: {
  user: User;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  handleTransactionStatusChange: (id: string, value: string) => void;
  transactions: Transaction[];
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
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...transactions].reverse().map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  {/* Conditionally enable/disable the Select based on isEditing */}
                  <Select
                    value={transaction.status}
                    onValueChange={(value) =>
                      handleTransactionStatusChange(transaction._id, value)
                    }
                    disabled={!isEditing} // Disable when not editing
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(transaction.timeStamp).toDateString()}
                </TableCell>
                <TableCell>{transaction.bank}</TableCell>
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
