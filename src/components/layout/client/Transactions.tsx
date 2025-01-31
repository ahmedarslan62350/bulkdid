'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type TransactionType = 'withdraw' | 'deposit' | 'transfer'

export function TransactionForm() {
  const [transactionType, setTransactionType] = useState<TransactionType>('deposit')
  const [amount, setAmount] = useState('')
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to process the transaction
    console.log('Processing transaction:', { transactionType, amount, fromAccount, toAccount })
    toast({
      title: "Transaction Successful",
      description: `Your ${transactionType} of $${amount} has been processed.`,
    })
    // Reset form
    setAmount('')
    setFromAccount('')
    setToAccount('')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardDescription>Choose a transaction type and enter the details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <RadioGroup 
              defaultValue="deposit" 
              onValueChange={(value) => setTransactionType(value as TransactionType)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposit" id="deposit" />
                <Label htmlFor="deposit">Deposit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="withdraw" id="withdraw" />
                <Label htmlFor="withdraw">Withdraw</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer">Transfer</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                placeholder="Enter amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="0.01"
                step="0.01"
                required
              />
            </div>

            {transactionType === 'transfer' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select onValueChange={setFromAccount} required>
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select onValueChange={setToAccount} required>
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="external">External Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="account">Account</Label>
                <Select onValueChange={setFromAccount} required>
                  <SelectTrigger id="account">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <CardFooter className="flex justify-end pt-6">
            <Button type="submit">Process Transaction</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

