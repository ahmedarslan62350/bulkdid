import { CreateTransactionForm } from "@/components/fragments/admin/transactions/new/NewTransaction"

export default function NewTransactionPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Create New Transaction</h1>
      <CreateTransactionForm />
    </div>
  )
}

