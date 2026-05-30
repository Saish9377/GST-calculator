// ============================================================
// Calculation History — localStorage Management
// ============================================================

import { GSTResult } from './gst-calculator';

const STORAGE_KEY = 'gst-calculator-history';
const MAX_ENTRIES = 50;

/**
 * Save a calculation result to history
 */
export function saveCalculation(result: GSTResult): void {
  try {
    const history = getHistory();
    history.unshift(result);
    
    // Keep only the latest MAX_ENTRIES
    if (history.length > MAX_ENTRIES) {
      history.splice(MAX_ENTRIES);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save calculation to history:', error);
  }
}

/**
 * Get all saved calculations
 */
export function getHistory(): GSTResult[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as GSTResult[];
  } catch (error) {
    console.error('Failed to read history:', error);
    return [];
  }
}

/**
 * Delete a specific entry by ID
 */
export function deleteEntry(id: string): void {
  try {
    const history = getHistory();
    const filtered = history.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete entry:', error);
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

/**
 * Get history count
 */
export function getHistoryCount(): number {
  return getHistory().length;
}
