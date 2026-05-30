'use client';

// ============================================================
// useGSTCalculator — Main Calculator State Hook
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GSTMode,
  StateType,
  GSTResult,
  calculate,
} from '@/lib/gst-calculator';
import { saveCalculation } from '@/lib/history';

interface UseGSTCalculatorOptions {
  defaultMode?: GSTMode;
  defaultRate?: number;
  defaultStateType?: StateType;
  autoSave?: boolean;
}

interface UseGSTCalculatorReturn {
  // Inputs
  amount: string;
  rate: number;
  customRate: string;
  mode: GSTMode;
  stateType: StateType;
  roundOff: boolean;

  // Output
  result: GSTResult | null;

  // Actions
  setAmount: (value: string) => void;
  setRate: (value: number) => void;
  setCustomRate: (value: string) => void;
  setMode: (value: GSTMode) => void;
  setStateType: (value: StateType) => void;
  setRoundOff: (value: boolean) => void;
  reset: () => void;
}

export function useGSTCalculator(
  options: UseGSTCalculatorOptions = {}
): UseGSTCalculatorReturn {
  const {
    defaultMode = 'add',
    defaultRate = 18,
    defaultStateType = 'intra',
    autoSave = true,
  } = options;

  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<number>(defaultRate);
  const [customRate, setCustomRate] = useState<string>('');
  const [mode, setMode] = useState<GSTMode>(defaultMode);
  const [stateType, setStateType] = useState<StateType>(defaultStateType);
  const [roundOff, setRoundOff] = useState<boolean>(false);
  const [result, setResult] = useState<GSTResult | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedId = useRef<string | null>(null);

  // Auto-calculate with debounce
  const doCalculate = useCallback(() => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    const effectiveRate = rate === -1 ? parseFloat(customRate) || 0 : rate;

    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      return;
    }

    const newResult = calculate(numAmount, effectiveRate, mode, stateType, roundOff);
    setResult(newResult);

    // Auto-save to history (but not duplicates)
    if (autoSave && newResult && newResult.id !== lastSavedId.current) {
      // We'll save only when amount changes significantly (debounced)
      lastSavedId.current = newResult.id;
    }
  }, [amount, rate, customRate, mode, stateType, roundOff, autoSave]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      doCalculate();
    }, 150);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [doCalculate]);

  // Save to history when result stabilizes (user stops typing for 1.5s)
  useEffect(() => {
    if (!result || !autoSave) return;

    const saveTimer = setTimeout(() => {
      saveCalculation(result);
    }, 1500);

    return () => clearTimeout(saveTimer);
  }, [result, autoSave]);

  const handleSetRate = useCallback((value: number) => {
    setRate(value);
    if (value !== -1) {
      setCustomRate('');
    }
  }, []);

  const handleSetCustomRate = useCallback((value: string) => {
    setCustomRate(value);
    setRate(-1);
  }, []);

  const reset = useCallback(() => {
    setAmount('');
    setRate(defaultRate);
    setCustomRate('');
    setMode(defaultMode);
    setStateType(defaultStateType);
    setRoundOff(false);
    setResult(null);
    lastSavedId.current = null;
  }, [defaultRate, defaultMode, defaultStateType]);

  return {
    amount,
    rate,
    customRate,
    mode,
    stateType,
    roundOff,
    result,
    setAmount,
    setRate: handleSetRate,
    setCustomRate: handleSetCustomRate,
    setMode,
    setStateType,
    setRoundOff,
    reset,
  };
}
