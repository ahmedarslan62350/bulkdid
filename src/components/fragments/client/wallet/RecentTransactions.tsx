import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ITransaction, RecentTransactionsProps } from "@/utils/types";

export function RecentTransactions({
  transactions,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: RecentTransactionsProps) {
  console.log(transactions);

  const getIcon = (type: ITransaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      // case "transfer":
      //   return <ArrowLeftRight className="h-4 w-4 text-blue-500" />
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {!transactions || transactions.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{getIcon(transaction.type)}</TableCell>
                    {transaction?.comment ? (
                      <TableCell>{transaction.comment} </TableCell>
                    ) : (
                      <TableCell>No comment</TableCell>
                    )}

                    <TableCell>
                      {transaction?.createdAt
                        ? new Date(transaction.createdAt as Date).toDateString()
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="text-right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">Items per page:</p>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) =>
                    onItemsPerPageChange(parseInt(value))
                  }
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={itemsPerPage.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <p className="text-sm">
                  Page {currentPage + 1} {totalPages ? `of ${totalPages}` : ""}
                </p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={totalPages ? currentPage + 1 >= totalPages : false}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
