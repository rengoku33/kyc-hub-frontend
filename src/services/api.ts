// services/api.ts

const sampleData = [
    {
      customerId: 'CUST1001',
      name: 'Jim Halpert',
      monthlyIncome: 6200,
      monthlyExpenses: 3500,
      creditScore: 710,
      outstandingLoans: 15000,
      loanRepaymentHistory: [1, 0, 1, 1, 1, 1, 0, 1],
      accountBalance: 12500,
      status: 'Review',
    },
    {
        customerId: 'CUST1002',
        name: 'Bob Vance',
        monthlyIncome: 4800,
        monthlyExpenses: 2800,
        creditScore: 640,
        outstandingLoans: 20000,
        loanRepaymentHistory: [1, 1, 1, 0, 0, 1, 0, 0],
        accountBalance: 7300,
        status: 'Approved',
    },
    {
        customerId: 'CUST1003',
        name: 'Michael Scott',
        monthlyIncome: 12000,
        monthlyExpenses: 16000,
        creditScore: 100,
        outstandingLoans: 20000,
        loanRepaymentHistory: [1, 0, 0, 0, 0, 1, 0, 0],
        accountBalance: 20,
        status: 'Rejected',
    },
    {
        customerId: 'CUST1004',
        name: 'Dwight Schrute',
        monthlyIncome: 7000,
        monthlyExpenses: 300,
        creditScore: 900,
        outstandingLoans: 50,
        loanRepaymentHistory: [1, 1, 1, 1, 1, 1, 1, 1],
        accountBalance: 70000,
        status: 'Review',
      },
  ];
  
 
  
  export const getCustomers = async () => {
    return sampleData;
  };
  
  export const updateCustomerStatus = async (id: string, status: string) => {
    const customer = sampleData.find((c) => c.customerId === id);
    if (customer) customer.status = status;
  };
  
  export const sendAlert = async (customerId: string) => {
    console.log(`🚨 Alert sent for high-risk customer: ${customerId}`);
  };
  