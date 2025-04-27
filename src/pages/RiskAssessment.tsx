import { Row, Col, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { RiskBadge } from '../components/RiskBadge';
import { getCustomers } from '../services/api';
import { calculateRiskScore } from '../utils/riskScoreCalculator';

const { Title } = Typography;

export const RiskAssessment = () => {
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

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Risk Assessment</Title>
      <Row gutter={[16, 16]}>
        {customers.map((c) => (
          <Col xs={24} md={8} key={c.customerId}>
            <div style={{ padding: 20, border: '1px solid #eee', borderRadius: 12 }}>
              <h3>{c.name}</h3>
              <p>Credit Score: {c.creditScore}</p>
              <p>Outstanding Loans: ${c.outstandingLoans}</p>
              <p>Account Balance: ${c.accountBalance}</p>
              <RiskBadge score={c.riskScore} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
