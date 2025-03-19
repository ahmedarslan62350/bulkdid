"use client"

import { useState, useEffect } from "react"
import { WalletBalance } from "@/components/fragments/client/wallet/WalletBalance"
import { RecentTransactions } from "@/components/fragments/client/wallet/RecentTransactions"
import { QuickActions } from "@/components/fragments/client/wallet/QuickAction"
import { Loader2 } from "lucide-react"
import { classNames } from "@/utils/constants"
import { toast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"

export default function Wallet() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)

  const {
    transactions,
    isFetching: isFetchingTransactions,
    isLoading: isLoadingTransactions,
  } = useGetTransactions(itemsPerPage, currentPage)

  // Calculate total pages when totalCount or itemsPerPage changes
  useEffect(() => {
    if (wallet?.totalTransactions !== undefined) {
      setTotalPages(Math.ceil(wallet.totalTransactions / itemsPerPage))
    }
  }, [wallet?.totalTransactions, itemsPerPage])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(0) // Reset to first page when changing items per page
  }

  if (isLoading || isFetching || isFetchingTransactions || isLoadingTransactions) {
    return <Loader2 className={classNames.loader2} />
  }

  if (!wallet) {
    toast({
      title: "Error",
      description: "Wallet not found",
      variant: "destructive",
    })

    redirect("/u/my-profile")
  }

  return (
    <div className="container px-4 py-10 space-y-8">
      <div className="w-full h-fit flex justify-between">
        <h1 className="text-4xl font-bold text-primary">Wallet Details</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <WalletBalance balance={wallet?.balance} currency={"USD"} />
        <QuickActions />
      </div>
      <RecentTransactions
        transactions={transactions}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  )
}

