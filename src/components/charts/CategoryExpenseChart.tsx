'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Housing / Rent / Mortgage', value: 1200 },
  { name: 'Groceries', value: 450 },
  { name: 'Food & Dining', value: 320 },
  { name: 'Shopping', value: 380 },
  { name: 'Transportation', value: 280 },
  { name: 'Entertainment', value: 180 },
  { name: 'Utilities', value: 150 },
  { name: 'Health & Fitness', value: 120 },
  { name: 'Insurance', value: 200 },
  { name: 'Loans / Debt Payments', value: 350 },
  { name: 'Savings / Investments', value: 500 },
  { name: 'Education', value: 250 },
  { name: 'Travel', value: 600 },
  { name: 'Gifts / Donations', value: 80 },
  { name: 'Other', value: 100 },
];

const COLORS = [
  '#203A43',
  '#2C5364',
  '#4f818d',
  '#5a9ba8',
  '#6bb5c2',
  '#0F2027',
  '#3a6b7a',
  '#4a8a9a',
  '#5ba0b0',
  '#6cb6c6',
  '#7cc8d8',
  '#8dd4e0',
  '#9ee0e8',
  '#aeeaf0',
  '#bef0f5',
];

export default function CategoryExpenseChart() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <PieChart style={{ width: '100%', height: '100%' }} responsive>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="35%"
          cy="50%"
          innerRadius={60} // makes it a donut
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={4}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{ paddingLeft: '20px' }}
        />
      </PieChart>
    </div>
  );
}
