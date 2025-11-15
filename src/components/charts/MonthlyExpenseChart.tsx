'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', expense: 1240 },
  { name: 'Feb', expense: 980 },
  { name: 'Mar', expense: 1560 },
  { name: 'Apr', expense: 1120 },
  { name: 'May', expense: 1890 },
  { name: 'Jun', expense: 1450 },
  { name: 'Jul', expense: 1680 },
  { name: 'Aug', expense: 1320 },
  { name: 'Sep', expense: 1750 },
  { name: 'Oct', expense: 1420 },
  { name: 'Nov', expense: 1980 },
  { name: 'Dec', expense: 2100 },
];

export default function MonthlyExpenseChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <BarChart
        data={data}
        style={{ width: '100%', height: '100%' }}
        responsive
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="expense" fill="#203A43" />
      </BarChart>
    </div>
  );
}
