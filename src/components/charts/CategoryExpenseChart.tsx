'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatAmountWithSymbol, formatCurrency } from '@/lib/formatter';

interface CategoryExpenseChartProps {
  data: Record<string, Array<{ category: string; amount: number }>>;
}

// Color mapper for categories
const getCategoryColor = (category: string): string => {
  return `var(--color-${category})`;
};
const chartConfig = {
  amount: { label: 'Amount' },

  housing: {
    label: 'Housing',
    theme: {
      light: 'oklch(0.65 0.15 200)',
      dark: 'oklch(0.65 0.15 200)',
    },
  },
  utilities: {
    label: 'Utilities',
    theme: {
      light: 'oklch(0.6 0.12 240)',
      dark: 'oklch(0.6 0.12 240)',
    },
  },
  groceries: {
    label: 'Groceries',
    theme: {
      light: 'oklch(0.7 0.14 180)',
      dark: 'oklch(0.7 0.14 180)',
    },
  },
  transportation: {
    label: 'Transportation',
    theme: {
      light: 'oklch(0.65 0.15 200)',
      dark: 'oklch(0.65 0.15 200)',
    },
  },
  dining: {
    label: 'Food & Dining',
    theme: {
      light: 'oklch(0.68 0.13 200)',
      dark: 'oklch(0.68 0.13 200)',
    },
  },
  shopping: {
    label: 'Shopping',
    theme: {
      light: 'oklch(0.6 0.12 240)',
      dark: 'oklch(0.6 0.12 240)',
    },
  },
  entertainment: {
    label: 'Entertainment',
    theme: {
      light: 'oklch(0.7 0.14 180)',
      dark: 'oklch(0.7 0.14 180)',
    },
  },
  health: {
    label: 'Health & Fitness',
    theme: {
      light: 'oklch(0.68 0.15 180)',
      dark: 'oklch(0.68 0.15 180)',
    },
  },
  insurance: {
    label: 'Insurance',
    theme: {
      light: 'oklch(0.62 0.12 200)',
      dark: 'oklch(0.62 0.12 200)',
    },
  },
  loans: {
    label: 'Loans',
    theme: {
      light: 'oklch(0.72 0.13 210)',
      dark: 'oklch(0.72 0.13 210)',
    },
  },
  savings: {
    label: 'Savings',
    theme: {
      light: 'oklch(0.7 0.14 185)',
      dark: 'oklch(0.7 0.14 185)',
    },
  },
  education: {
    label: 'Education',
    theme: {
      light: 'oklch(0.66 0.12 230)',
      dark: 'oklch(0.66 0.12 230)',
    },
  },
  travel: {
    label: 'Travel',
    theme: {
      light: 'oklch(0.75 0.13 60)',
      dark: 'oklch(0.75 0.13 60)',
    },
  },
  gifts: {
    label: 'Gifts',
    theme: {
      light: 'oklch(0.68 0.12 280)',
      dark: 'oklch(0.68 0.12 280)',
    },
  },
  other: {
    label: 'Other',
    theme: {
      light: 'oklch(0.7 0.11 235)',
      dark: 'oklch(0.7 0.11 235)',
    },
  },
} satisfies ChartConfig;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CategoryExpenseChart = ({ data }: CategoryExpenseChartProps) => {
  const id = 'pie-interactive';
  const currentMonthName = format(new Date(), 'MMMM');
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);

  const currentMonthData = useMemo(() => {
    const monthData = data[selectedMonth] || [];
    return monthData.map((item) => ({
      ...item,
      fill: getCategoryColor(item.category),
    }));
  }, [selectedMonth, data]);

  const totalAmount = useMemo(
    () => currentMonthData.reduce((acc, item) => acc + item.amount, 0),
    [currentMonthData]
  );

  const hasData = currentMonthData.length > 0 && totalAmount > 0;

  return (
    <Card data-chart={id} className="flex flex-col h-full">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>
            {selectedMonth} {new Date().getFullYear()}
          </CardDescription>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a month"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((month) => (
              <SelectItem
                key={month}
                value={month}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">{month}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center items-center pb-0">
        {hasData ? (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <>
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="font-mono font-medium">
                          <span className="font-medium text-md">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Pie
                data={currentMonthData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold p-3"
                          >
                            {formatAmountWithSymbol(totalAmount, 0)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Expenses
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <ChartPieIcon className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                No expenses found
              </p>
              <p className="text-xs text-muted-foreground">
                No expenses recorded for {selectedMonth}{' '}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseChart;
