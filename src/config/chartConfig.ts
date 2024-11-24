import { type ChartConfig } from "@/components/ui/chart"

export const chartConfig1 = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export const chartConfig2 = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
    tab: {
      label: "Tab",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

export const transactionChartConfig1 = {
    views: {
      label: "Transactions",
    },
    withdrawal: {
      label: "Withdrawal",
      color: "hsl(var(--chart-1))",
    },
    deposit: {
      label: "Deposit",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

export const userChartConfig1 = {
    views: {
      label: "Users",
    },
    users: {
      label: "New Users",
      color: "hsl(var(--chart-1))",
    }
  } satisfies ChartConfig


