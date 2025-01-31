import { TransactionForm } from '@/components/layout/client/Transactions'

export default function TransactionPage() {
  return (
    <div className="container py-10 px-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Transactions</h1>
      <TransactionForm />
    </div>
  )
}

