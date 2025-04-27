import { Button, Form, Select } from 'antd';

const { Option } = Select;

interface UpdateStatusFormProps {
  customerId: string;
  onUpdate: (status: string) => void;
}

export const UpdateStatusForm = ({ customerId, onUpdate }: UpdateStatusFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { status: string }) => {
    onUpdate(values.status);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="inline">
      <Form.Item name="status" rules={[{ required: true, message: 'Select status!' }]}>
        <Select placeholder="Select Status" style={{ width: 120 }}>
          <Option value="Review">Review</Option>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" size="small">Update</Button>
      </Form.Item>
    </Form>
  );
};
