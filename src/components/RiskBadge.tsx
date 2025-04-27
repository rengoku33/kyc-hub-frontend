import { Tag } from 'antd';

export const RiskBadge = ({ score }: { score: number }) => {
  if (score > 70) return <Tag color="red">High</Tag>;
  if (score > 40) return <Tag color="gold">Medium</Tag>;
  return <Tag color="green">Low</Tag>;
};
