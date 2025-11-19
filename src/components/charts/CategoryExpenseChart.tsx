'use client';

import { useMemo, useState } from 'react';
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

export const description =
  'An interactive pie chart showing expenses by category';

// Color mapper for categories
const getCategoryColor = (category: string): string => {
  return `var(--color-${category})`;
};

const monthlyExpenseData: Record<
  string,
  Array<{ category: string; amount: number }>
> = {
  January: [
    { category: 'housing', amount: 1200 },
    { category: 'groceries', amount: 420 },
    { category: 'transportation', amount: 280 },
    { category: 'dining', amount: 350 },
    { category: 'entertainment', amount: 150 },
  ],

  February: [
    { category: 'housing', amount: 1200 },
    { category: 'utilities', amount: 210 },
    { category: 'groceries', amount: 380 },
    { category: 'health', amount: 180 },
    { category: 'gifts', amount: 200 },
  ],

  March: [
    { category: 'housing', amount: 1200 },
    { category: 'transportation', amount: 330 },
    { category: 'shopping', amount: 450 },
    { category: 'travel', amount: 150 },
  ],

  April: [
    { category: 'housing', amount: 1200 },
    { category: 'groceries', amount: 400 },
    { category: 'entertainment', amount: 190 },
    { category: 'education', amount: 270 },
    { category: 'travel', amount: 800 },
  ],

  May: [
    { category: 'housing', amount: 1200 },
    { category: 'utilities', amount: 230 },
    { category: 'groceries', amount: 480 },
    { category: 'dining', amount: 420 },
    { category: 'shopping', amount: 300 },
  ],

  June: [
    { category: 'housing', amount: 1200 },
    { category: 'health', amount: 250 },
    { category: 'transportation', amount: 300 },
    { category: 'savings', amount: 700 },
    { category: 'travel', amount: 600 },
  ],

  July: [
    { category: 'housing', amount: 1200 },
    { category: 'groceries', amount: 500 },
    { category: 'entertainment', amount: 250 },
    { category: 'gifts', amount: 120 },
  ],

  August: [
    { category: 'housing', amount: 1200 },
    { category: 'utilities', amount: 270 },
    { category: 'shopping', amount: 360 },
    { category: 'education', amount: 350 },
  ],

  September: [
    { category: 'housing', amount: 1200 },
    { category: 'groceries', amount: 440 },
    { category: 'transportation', amount: 310 },
    { category: 'dining', amount: 370 },
  ],

  October: [
    { category: 'housing', amount: 1200 },
    { category: 'entertainment', amount: 260 },
    { category: 'shopping', amount: 420 },
    { category: 'travel', amount: 180 },
    { category: 'other', amount: 120 },
  ],

  November: [
    { category: 'housing', amount: 1200 },
    { category: 'utilities', amount: 250 },
    { category: 'groceries', amount: 480 },
    { category: 'gifts', amount: 250 },
  ],

  December: [
    { category: 'housing', amount: 1200 },
    { category: 'shopping', amount: 650 },
    { category: 'dining', amount: 450 },
    { category: 'travel', amount: 500 },
    { category: 'gifts', amount: 400 },
  ],
};
const chartConfig = {
  amount: { label: 'Amount' },

  housing: { label: 'Housing', color: '#264653' },
  utilities: { label: 'Utilities', color: '#1B3A4B' },
  groceries: { label: 'Groceries', color: '#2A9D8F' },
  transportation: { label: 'Transportation', color: '#0F2027' },
  dining: { label: 'Food & Dining', color: '#205A6D' },
  shopping: { label: 'Shopping', color: '#2C5364' },
  entertainment: { label: 'Entertainment', color: '#3A6B7A' },
  health: { label: 'Health & Fitness', color: '#1E555C' },
  insurance: { label: 'Insurance', color: '#203A43' },
  loans: { label: 'Loans', color: '#427A8A' },
  savings: { label: 'Savings', color: '#3F8E8A' },
  education: { label: 'Education', color: '#345C72' },
  travel: { label: 'Travel', color: '#4A7080' },
  gifts: { label: 'Gifts', color: '#597D89' },
  other: { label: 'Other', color: '#6A8C98' },
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

const CategoryExpenseChart = () => {
  const id = 'pie-interactive';
  const [selectedMonth, setSelectedMonth] = useState('January');

  const currentMonthData = useMemo(() => {
    const data = monthlyExpenseData[selectedMonth] || [];
    return data.map((item) => ({
      ...item,
      fill: getCategoryColor(item.category),
    }));
  }, [selectedMonth]);

  const totalAmount = useMemo(
    () => currentMonthData.reduce((acc, item) => acc + item.amount, 0),
    [currentMonthData]
  );

  return (
    <Card data-chart={id} className="flex flex-col h-full">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>{selectedMonth} 2024</CardDescription>
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
      <CardContent className="flex flex-1 justify-center pb-0">
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
                          RM {value.toLocaleString()}
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          RM{totalAmount.toLocaleString()}
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
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseChart;
