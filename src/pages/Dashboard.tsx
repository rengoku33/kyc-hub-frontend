import { Row, Col, Typography } from 'antd';
import { CardInfo } from '../components/CardInfo';
import { IncomeExpenseChart } from '../components/IncomeExpenseChart';
import { RiskScoreChart } from '../components/RiskScoreChart';
import { CustomerTable } from '../components/CustomerTable';
import { useEffect, useState } from 'react';
import { getCustomers, updateCustomerStatus } from '../services/api';
import { calculateRiskScore } from '../utils/riskScoreCalculator';

const { Title } = Typography;

export const Dashboard = () => {
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
    await updateCustomerStatus(id, status);
    fetchCustomers();
  };

  const totalIncome = customers.reduce((acc, curr) => acc + curr.monthlyIncome, 0);
  const totalExpenses = customers.reduce((acc, curr) => acc + curr.monthlyExpenses, 0);
  const netBalance = totalIncome - totalExpenses;

  const incomeExpenseData = customers.map((c) => ({
    month: c.name,
    income: c.monthlyIncome,
    expenses: c.monthlyExpenses,
  }));

  const riskData = [
    { name: 'Low', value: customers.filter((c) => c.riskScore <= 40).length },
    { name: 'Medium', value: customers.filter((c) => c.riskScore > 40 && c.riskScore <= 70).length },
    { name: 'High', value: customers.filter((c) => c.riskScore > 70).length },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2} style={{textAlign: 'center'}}> Credit Risk Analytics dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}><CardInfo title="Total Income" value={totalIncome} suffix="$" /></Col>
        <Col xs={24} md={8}><CardInfo title="Total Expenses" value={totalExpenses} suffix="$" /></Col>
        <Col xs={24} md={8}><CardInfo title="Net Balance" value={netBalance} suffix="$" /></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={12}><IncomeExpenseChart data={incomeExpenseData} /></Col>
        <Col xs={24} md={12}><RiskScoreChart data={riskData} /></Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <CustomerTable customers={customers} onUpdateStatus={handleStatusUpdate} />
        </Col>
      </Row>
    </div>
  );
};
