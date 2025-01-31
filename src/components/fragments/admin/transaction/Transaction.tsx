import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { transaction } from "@/utils/dumyData";

// In a real application, you would fetch this data from an API


export default function TransactionDetails() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transaction Details</h1>
        <Link href="/admin/transactions">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Transactions
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Transaction Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm">Transaction ID</dt>
                <dd className="text-sm text-muted-foreground ">
                  {transaction.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Amount</dt>
                <dd className="text-sm text-muted-foreground">
                  ${transaction.amount.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Date</dt>
                <dd className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Description</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.description}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Category</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.category}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Payment Method</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.paymentMethod}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm">Name</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Email</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.customerEmail}
                </dd>
              </div>
              <div>
                <dt className="text-sm">IP Address</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.ipAddress}
                </dd>
              </div>
              <div>
                <dt className="text-sm">Device Info</dt>
                <dd className="text-sm text-muted-foreground">
                  {transaction.deviceInfo}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Image
                src="https://images.unsplash.com/photo-1522780550166-284a0288c8df?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Receipt thumbnail"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <div className="space-y-2">
                <Button className="bg-black">
                  <Download className="mr-2 h-4 w-4" /> Download Receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
