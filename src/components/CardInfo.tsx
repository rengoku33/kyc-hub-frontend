import { Card, Statistic } from 'antd';

interface CardInfoProps {
  title: string;
  value: number;
  suffix?: string;
}

export const CardInfo = ({ title, value, suffix }: CardInfoProps) => (
  <Card bordered={false} style={{ borderRadius: 12 }}>
    <Statistic title={title} value={value} suffix={suffix} />
  </Card>
);
