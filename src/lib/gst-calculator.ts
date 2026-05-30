// ============================================================
// GST Calculator — Core Calculation Engine
// ============================================================

export type GSTMode = 'add' | 'remove';
export type StateType = 'intra' | 'inter';

export interface GSTResult {
  id: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  rate: number;
  mode: GSTMode;
  stateType: StateType;
  roundOff: boolean;
  timestamp: number;
}

/**
 * Generate a unique ID for each calculation
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/**
 * Round to 2 decimal places
 */
function roundTo2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Round to nearest integer
 */
function roundToWhole(num: number): number {
  return Math.round(num);
}

/**
 * Calculate GST — Add mode
 * Given a base amount, calculate GST and total
 */
export function calculateGSTAdd(
  amount: number,
  rate: number,
  stateType: StateType,
  roundOff: boolean = false
): GSTResult {
  const gstAmount = roundTo2((amount * rate) / 100);
  let totalAmount = roundTo2(amount + gstAmount);

  if (roundOff) {
    totalAmount = roundToWhole(totalAmount);
  }

  const { cgst, sgst, igst } = splitTax(gstAmount, rate, stateType);

  return {
    id: generateId(),
    baseAmount: roundTo2(amount),
    gstAmount,
    totalAmount,
    cgst,
    sgst,
    igst,
    rate,
    mode: 'add',
    stateType,
    roundOff,
    timestamp: Date.now(),
  };
}

/**
 * Calculate GST — Remove mode (Reverse Calculation)
 * Given a total (tax-inclusive) amount, find the base amount and GST
 */
export function calculateGSTRemove(
  totalAmount: number,
  rate: number,
  stateType: StateType,
  roundOff: boolean = false
): GSTResult {
  const baseAmount = roundTo2((totalAmount * 100) / (100 + rate));
  const gstAmount = roundTo2(totalAmount - baseAmount);

  let finalTotal = totalAmount;
  if (roundOff) {
    finalTotal = roundToWhole(totalAmount);
  }

  const { cgst, sgst, igst } = splitTax(gstAmount, rate, stateType);

  return {
    id: generateId(),
    baseAmount,
    gstAmount,
    totalAmount: finalTotal,
    cgst,
    sgst,
    igst,
    rate,
    mode: 'remove',
    stateType,
    roundOff,
    timestamp: Date.now(),
  };
}

/**
 * Split GST into CGST/SGST (intra-state) or IGST (inter-state)
 */
function splitTax(
  gstAmount: number,
  rate: number,
  stateType: StateType
): { cgst: number; sgst: number; igst: number } {
  if (stateType === 'inter') {
    return {
      cgst: 0,
      sgst: 0,
      igst: roundTo2(gstAmount),
    };
  }

  // Intra-state: split equally into CGST and SGST
  const half = roundTo2(gstAmount / 2);
  return {
    cgst: half,
    sgst: half,
    igst: 0,
  };
}

/**
 * Get CGST/SGST rate from total GST rate
 */
export function getHalfRate(rate: number): number {
  return roundTo2(rate / 2);
}

/**
 * Format number as Indian currency (₹1,00,000.00)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0.00';

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const [intPart, decPart] = absAmount.toFixed(2).split('.');

  // Indian numbering: last 3 digits, then groups of 2
  let formatted = '';
  const len = intPart.length;

  if (len <= 3) {
    formatted = intPart;
  } else {
    formatted = intPart.substring(len - 3);
    let remaining = intPart.substring(0, len - 3);
    while (remaining.length > 2) {
      formatted = remaining.substring(remaining.length - 2) + ',' + formatted;
      remaining = remaining.substring(0, remaining.length - 2);
    }
    if (remaining.length > 0) {
      formatted = remaining + ',' + formatted;
    }
  }

  return `${isNegative ? '-' : ''}₹${formatted}.${decPart}`;
}

/**
 * Format number with commas (Indian style) without currency symbol
 */
export function formatNumber(amount: number): string {
  if (isNaN(amount)) return '0';
  return formatCurrency(amount).replace('₹', '');
}

/**
 * Available GST rate presets
 */
export const GST_RATES = [0, 3, 5, 12, 18, 28] as const;

/**
 * Main calculator function that handles both modes
 */
export function calculate(
  amount: number,
  rate: number,
  mode: GSTMode,
  stateType: StateType,
  roundOff: boolean = false
): GSTResult | null {
  if (isNaN(amount) || amount <= 0 || isNaN(rate) || rate < 0) {
    return null;
  }

  if (mode === 'add') {
    return calculateGSTAdd(amount, rate, stateType, roundOff);
  } else {
    return calculateGSTRemove(amount, rate, stateType, roundOff);
  }
}
