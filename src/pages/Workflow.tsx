import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getCustomers, updateCustomerStatus, sendAlert } from '../services/api';
import { CustomerTable } from '../components/CustomerTable';
import { calculateRiskScore } from '../utils/riskScoreCalculator';

const { Title } = Typography;

export const Workflow = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    const enriched = data.map((c: any) => ({
      ...c,
      riskScore: calculateRiskScore(c),
    }));
    setCustomers(enriched);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const customer = customers.find((c) => c.customerId === id);
    if (customer && customer.riskScore > 70) {
      await sendAlert(id);
    }
    await updateCustomerStatus(id, status);
    fetchCustomers();
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Workflow Automation</Title>
      <CustomerTable customers={customers} onUpdateStatus={handleStatusUpdate} />
    </div>
  );
};
