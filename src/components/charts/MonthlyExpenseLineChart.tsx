'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', amount: 420 },
  { month: 'Feb', amount: 380 },
  { month: 'Mar', amount: 510 },
  { month: 'Apr', amount: 450 },
  { month: 'May', amount: 530 },
  { month: 'Jun', amount: 490 },
  { month: 'Jul', amount: 610 },
  { month: 'Aug', amount: 580 },
  { month: 'Sep', amount: 540 },
  { month: 'Oct', amount: 600 },
  { month: 'Nov', amount: 650 },
  { month: 'Dec', amount: 700 },
];

export default function MonthlyExpenseLineChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#203A43"
            strokeWidth={3}
            dot={true}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
