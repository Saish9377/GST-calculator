'use client';

// ============================================================
// CalculationHistory — Past calculations from localStorage
// ============================================================

import { useState, useEffect } from 'react';
import { GSTResult, formatCurrency } from '@/lib/gst-calculator';
import { getHistory, deleteEntry, clearHistory } from '@/lib/history';
import { HiClock, HiTrash, HiXMark } from 'react-icons/hi2';

interface CalculationHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: GSTResult) => void;
}

export function CalculationHistory({ isOpen, onClose, onSelect }: CalculationHistoryProps) {
  const [history, setHistory] = useState<GSTResult[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-50 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <HiClock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">History</h2>
            {history.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {history.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-danger hover:text-danger/80 font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-danger/10 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-background transition-colors cursor-pointer"
            >
              <HiXMark className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <HiClock className="w-12 h-12 text-muted/30 mb-3" />
              <p className="text-sm text-muted">No calculations yet</p>
              <p className="text-xs text-muted/60 mt-1">Your calculations will appear here</p>
            </div>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="group relative rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md p-4 cursor-pointer transition-all duration-200"
                onClick={() => {
                  onSelect(entry);
                  onClose();
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                        entry.mode === 'add'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {entry.mode === 'add' ? 'ADD' : 'REMOVE'}
                    </span>
                    <span className="text-xs text-muted">{entry.rate}%</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs text-muted capitalize">
                      {entry.stateType === 'intra' ? 'Intra' : 'Inter'}
                    </span>
                  </div>
                  <span className="text-xs text-muted">{formatTime(entry.timestamp)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted">Base</div>
                    <div className="text-sm font-semibold text-foreground font-mono">
                      {formatCurrency(entry.baseAmount)}
                    </div>
                  </div>
                  <div className="text-muted text-lg">→</div>
                  <div className="text-right">
                    <div className="text-xs text-muted">Total</div>
                    <div className="text-sm font-bold text-primary font-mono">
                      {formatCurrency(entry.totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(entry.id);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-danger/10 text-danger transition-all cursor-pointer"
                  aria-label="Delete entry"
                >
                  <HiTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
