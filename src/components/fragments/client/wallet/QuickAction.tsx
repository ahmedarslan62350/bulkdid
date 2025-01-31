import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <Button variant="outline" className="flex flex-col items-center h-full">
          <ArrowDownToLine className="h-2 w-2" />
          Deposit
        </Button>
        <Button variant="outline" className="flex flex-col items-center h-full">
          <ArrowUpFromLine className="h-2 w-2" />
          Withdraw
        </Button>
        <Button variant="outline" className="flex flex-col items-center h-full">
          <RefreshCw className="h-2 w-2" />
          Transfer
        </Button>
      </CardContent>
    </Card>
  )
}

