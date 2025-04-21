"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig, chartData } from "@/utils/types";

export const description = "An interactive bar chart";

export function Chart({
  config,
  chartData,
}: {
  config: chartConfig;
  chartData: chartData[];
}) {
  const [activeChart, setActiveChart] = React.useState<
    keyof typeof config.chartConfig
  >(config.chartEntries[0]);

  const total = React.useMemo(
    () =>
      Object.fromEntries(
        config.chartEntries.map((entry) => [
          entry,
          chartData.reduce((acc, curr) => acc + curr[entry], 0),
        ])
      ),
    [chartData, config.chartEntries]
  );

  return (
    <Card className={`h-fit w-full ${config.classname}`}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-col">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{config.heading}</CardTitle>
          <CardDescription>
            {config.desc || "Showing total visitors for the last 3 months"}
          </CardDescription>
        </div>
        <div className="flex">
          {config.chartEntries.map((key) => {
            const chart =
              key as keyof typeof chartData as keyof typeof config.chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {config.chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={config.chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`black`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
