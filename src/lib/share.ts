// ============================================================
// Share Utilities — Copy & WhatsApp
// ============================================================

import { GSTResult, formatCurrency } from './gst-calculator';

/**
 * Generate formatted text for sharing
 */
export function generateShareText(result: GSTResult): string {
  const modeLabel = result.mode === 'add' ? 'GST Added' : 'GST Removed';
  const stateLabel = result.stateType === 'intra' ? 'Intra-State' : 'Inter-State';

  let text = `🧮 GST Calculation Result\n`;
  text += `━━━━━━━━━━━━━━━━━━\n`;
  text += `Mode: ${modeLabel}\n`;
  text += `Type: ${stateLabel}\n`;
  text += `GST Rate: ${result.rate}%\n`;
  text += `━━━━━━━━━━━━━━━━━━\n`;
  text += `Base Amount: ${formatCurrency(result.baseAmount)}\n`;
  text += `GST Amount: ${formatCurrency(result.gstAmount)}\n`;

  if (result.stateType === 'intra') {
    text += `CGST (${result.rate / 2}%): ${formatCurrency(result.cgst)}\n`;
    text += `SGST (${result.rate / 2}%): ${formatCurrency(result.sgst)}\n`;
  } else {
    text += `IGST (${result.rate}%): ${formatCurrency(result.igst)}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 Total: ${formatCurrency(result.totalAmount)}\n`;
  text += `━━━━━━━━━━━━━━━━━━\n`;
  text += `\nCalculated on gstcalculator.in`;

  return text;
}

/**
 * Copy result to clipboard
 */
export async function copyToClipboard(result: GSTResult): Promise<boolean> {
  try {
    const text = generateShareText(result);
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    // Fallback
    try {
      const textarea = document.createElement('textarea');
      textarea.value = generateShareText(result);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Share via WhatsApp
 */
export function shareWhatsApp(result: GSTResult): void {
  const text = encodeURIComponent(generateShareText(result));
  const url = `https://wa.me/?text=${text}`;
  window.open(url, '_blank');
}
