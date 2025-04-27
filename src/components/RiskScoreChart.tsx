import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface RiskData {
  name: string;
  value: number;
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export const RiskScoreChart = ({ data }: { data: RiskData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
        {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);
