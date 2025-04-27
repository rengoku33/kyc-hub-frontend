import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IncomeExpenseData {
  month: string;
  income: number;
  expenses: number;
}

export const IncomeExpenseChart = ({ data }: { data: IncomeExpenseData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar type="monotone" dataKey="income" fill="#70ca9d" />
      <Bar type="monotone" dataKey="expenses" fill="#C51D2B" />
    </BarChart>
  </ResponsiveContainer>
);
