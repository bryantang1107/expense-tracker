'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatAmountWithSymbol, formatCurrency } from '@/lib/formatter';

interface AllTimeExpenseChartProps {
  data: Array<{ date: string; amount: number }>;
}

const chartConfig = {
  amount: {
    label: 'All Time Expenses',
    theme: {
      light: 'oklch(0.55 0.15 200)',
      dark: 'oklch(0.65 0.15 200)',
    },
  },
} satisfies ChartConfig;

const AllTimeExpenseChart = ({ data }: AllTimeExpenseChartProps) => {
  const total = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.amount, 0),
    [data]
  );

  return (
    <Card className="py-4 sm:py-0 h-full">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>All Time Expenses</CardTitle>
          <CardDescription>
            Expenses for {new Date().getFullYear()}
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.amount.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatAmountWithSymbol(total)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
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
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  formatter={(value) => (
                    <div className="font-mono font-medium">
                      <span className="font-medium text-md">
                        {formatCurrency(Number(value))}
                      </span>
                    </div>
                  )}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="amount"
              type="monotone"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AllTimeExpenseChart;
