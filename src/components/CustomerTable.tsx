import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import type { InputRef } from 'antd';
import { RiskBadge } from './RiskBadge';
import { UpdateStatusForm } from './UpdateStatusForm';
import './CustomerTable.css';

interface Customer {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: string;
  riskScore: number;
}

interface CustomerTableProps {
  customers: Customer[];
  onUpdateStatus: (id: string, status: string) => void;
}

export const CustomerTable = ({ customers, onUpdateStatus }: CustomerTableProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: keyof Customer) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: Customer) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Income',
      dataIndex: 'monthlyIncome',
      key: 'monthlyIncome',
      sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome,
    },
    {
      title: 'Expenses',
      dataIndex: 'monthlyExpenses',
      key: 'monthlyExpenses',
      sorter: (a: Customer, b: Customer) => a.monthlyExpenses - b.monthlyExpenses,
    },
    {
      title: 'Risk',
      key: 'riskScore',
      render: (_: any, record: Customer) => <RiskBadge score={record.riskScore} />,
      sorter: (a: Customer, b: Customer) => a.riskScore - b.riskScore,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Approved', value: 'Approved' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value: string | number | boolean, record: Customer) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Customer) => (
        <UpdateStatusForm
          customerId={record.customerId}
          onUpdate={(status) => onUpdateStatus(record.customerId, status)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={customers}
      rowKey="customerId"
      rowClassName={(record) => {
        if (record.status === 'Approved') return 'row-approved';
        if (record.status === 'Rejected') return 'row-rejected';
        return '';
      }}
    />
  );
};
