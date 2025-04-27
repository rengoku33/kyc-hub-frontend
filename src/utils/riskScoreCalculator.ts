export const calculateRiskScore = (customer: any): number => {
    const { creditScore, loanRepaymentHistory, outstandingLoans, monthlyIncome } = customer;
  
    const missedPayments = loanRepaymentHistory.filter((x: number) => x === 0).length;
    const repaymentPenalty = missedPayments * 5; // e.g., 5 points per missed payment
    const loanIncomeRatio = (outstandingLoans / (monthlyIncome * 12)) * 100; // % of yearly income
    const loanPenalty = loanIncomeRatio > 50 ? 10 : 0;
  
    let risk = 100 - creditScore / 8; // Normalize credit score impact
    risk += repaymentPenalty;
    risk += loanPenalty;
  
    return Math.min(Math.max(risk, 0), 100); // Clamp 0-100
  };
  