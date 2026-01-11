/**
 * Payment Calculator and Credit System Utilities
 * Handles monthly payment calculations for Algerian Dinar
 */

import { PaymentPlan, Payment } from '@/types/ecommerce';

export interface PaymentCalculationParams {
  totalAmount: number;
  downPaymentPercentage: number; // Percentage (e.g., 20 for 20%)
  numberOfMonths: number;
  interestRate: number; // Annual percentage rate
}

export interface PaymentCalculationResult {
  totalAmount: number;
  downPayment: number;
  financedAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayable: number;
  numberOfMonths: number;
  interestRate: number;
}

/**
 * Calculate monthly payment plan
 */
export function calculateMonthlyPayment(params: PaymentCalculationParams): PaymentCalculationResult {
  const { totalAmount, downPaymentPercentage, numberOfMonths, interestRate } = params;

  // Calculate down payment
  const downPayment = (totalAmount * downPaymentPercentage) / 100;
  
  // Amount to be financed
  const financedAmount = totalAmount - downPayment;

  // Monthly interest rate
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate monthly payment using amortization formula
  let monthlyPayment: number;
  let totalInterest: number;

  if (monthlyInterestRate === 0) {
    // No interest - simple division
    monthlyPayment = financedAmount / numberOfMonths;
    totalInterest = 0;
  } else {
    // With interest - compound interest formula
    monthlyPayment =
      (financedAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    
    totalInterest = monthlyPayment * numberOfMonths - financedAmount;
  }

  const totalPayable = downPayment + (monthlyPayment * numberOfMonths);

  return {
    totalAmount,
    downPayment: Math.round(downPayment * 100) / 100,
    financedAmount: Math.round(financedAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayable: Math.round(totalPayable * 100) / 100,
    numberOfMonths,
    interestRate,
  };
}

/**
 * Standard payment plans available
 */
export const STANDARD_PAYMENT_PLANS = [
  {
    months: 3,
    downPayment: 30,
    interestRate: 0,
    name: '3 mois sans intérêts',
  },
  {
    months: 6,
    downPayment: 25,
    interestRate: 3,
    name: '6 mois - 3% intérêts',
  },
  {
    months: 12,
    downPayment: 20,
    interestRate: 5,
    name: '12 mois - 5% intérêts',
  },
  {
    months: 24,
    downPayment: 20,
    interestRate: 8,
    name: '24 mois - 8% intérêts',
  },
];

/**
 * Get available payment plans for an amount
 */
export function getAvailablePaymentPlans(amount: number): Array<{
  plan: typeof STANDARD_PAYMENT_PLANS[0];
  calculation: PaymentCalculationResult;
}> {
  return STANDARD_PAYMENT_PLANS.map(plan => ({
    plan,
    calculation: calculateMonthlyPayment({
      totalAmount: amount,
      downPaymentPercentage: plan.downPayment,
      numberOfMonths: plan.months,
      interestRate: plan.interestRate,
    }),
  }));
}

/**
 * Check if customer is eligible for credit
 */
export function checkCreditEligibility(
  customerCreditLimit: number,
  requestedAmount: number,
  activePaymentPlans: PaymentPlan[]
): {
  eligible: boolean;
  reason?: string;
  availableCredit: number;
} {
  // Calculate total outstanding credit
  const outstandingCredit = activePaymentPlans.reduce(
    (total, plan) => total + plan.remainingBalance,
    0
  );

  const availableCredit = customerCreditLimit - outstandingCredit;

  if (requestedAmount > availableCredit) {
    return {
      eligible: false,
      reason: `Crédit disponible insuffisant. Disponible: ${availableCredit.toLocaleString()} DZD`,
      availableCredit,
    };
  }

  // Check if customer has too many active plans
  if (activePaymentPlans.length >= 3) {
    return {
      eligible: false,
      reason: 'Vous avez atteint le nombre maximum de plans de paiement actifs (3)',
      availableCredit,
    };
  }

  return {
    eligible: true,
    availableCredit,
  };
}

/**
 * Generate payment schedule
 */
export function generatePaymentSchedule(
  startDate: Date,
  monthlyPayment: number,
  numberOfMonths: number
): Array<{
  paymentNumber: number;
  dueDate: Date;
  amount: number;
}> {
  const schedule = [];
  
  for (let i = 1; i <= numberOfMonths; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i);
    
    schedule.push({
      paymentNumber: i,
      dueDate,
      amount: monthlyPayment,
    });
  }

  return schedule;
}

/**
 * Calculate remaining balance after payments
 */
export function calculateRemainingBalance(
  totalFinanced: number,
  payments: Payment[],
  monthlyPayment: number
): number {
  const completedPayments = payments.filter(p => p.status === 'completed');
  const paidAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  return Math.max(0, totalFinanced - paidAmount);
}

/**
 * Format DZD currency
 */
export function formatDZD(amount: number): string {
  return `${amount.toLocaleString('fr-DZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} د.ج`;
}

/**
 * Check if payment is overdue
 */
export function isPaymentOverdue(dueDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  return today > due;
}

/**
 * Calculate late fee (example: 2% per month late)
 */
export function calculateLateFee(
  amount: number,
  dueDate: Date,
  currentDate: Date = new Date()
): number {
  if (!isPaymentOverdue(dueDate)) {
    return 0;
  }

  const monthsLate = Math.floor(
    (currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  const lateFeeRate = 0.02; // 2% per month
  return amount * lateFeeRate * monthsLate;
}
