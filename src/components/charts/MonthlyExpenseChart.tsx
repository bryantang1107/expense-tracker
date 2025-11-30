'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/lib/formatter';

interface MonthlyExpenseData {
  month: string;
  amount: number;
}

interface MonthlyExpenseChartProps {
  data: MonthlyExpenseData[];
  trendPercentage?: number;
}

const chartConfig = {
  amount: {
    label: 'Amount',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const MonthlyExpenseChart = ({
  data,
  trendPercentage,
}: MonthlyExpenseChartProps) => {
  const isTrendingUp = (trendPercentage ?? 0) > 0;
  const trendIcon = isTrendingUp ? (
    <TrendingUp className="h-4 w-4" />
  ) : (
    <TrendingDown className="h-4 w-4" />
  );

  return (
    <div>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value) => (
                  <div className="font-mono font-medium">
                    <span className="font-medium text-md">
                      {formatCurrency(Number(value))}
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
        </BarChart>
      </ChartContainer>
      <div className="flex-col items-start gap-2 text-sm py-4">
        {trendPercentage !== undefined && (
          <div className="flex gap-2 leading-none font-medium">
            {isTrendingUp ? 'Trending up' : 'Trending down'} by{' '}
            {Math.abs(trendPercentage).toFixed(1)}% this month {trendIcon}
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Showing expense for the last 6 months
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;
