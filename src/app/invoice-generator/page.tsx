'use client';

// ============================================================
// Invoice Generator Page — PROFESSIONAL EDITION
// ============================================================

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  HiDocumentText,
  HiPlus,
  HiTrash,
  HiArrowDownTray,
  HiPhoto,
  HiXMark,
  HiBuildingOffice2,
  HiUser,
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiIdentification,
  HiBanknotes,
  HiDocumentDuplicate,
  HiCalendarDays,
  HiCreditCard,
} from 'react-icons/hi2';
import { formatCurrency } from '@/lib/gst-calculator';

// ─── Types ───
interface InvoiceItem {
  id: string;
  description: string;
  hsn: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  gstRate: number;
}

interface InvoiceData {
  // Seller
  sellerName: string;
  sellerAddress: string;
  sellerCity: string;
  sellerState: string;
  sellerPincode: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerGstin: string;
  sellerPan: string;
  sellerLogo: string | null;
  // Buyer
  buyerName: string;
  buyerAddress: string;
  buyerCity: string;
  buyerState: string;
  buyerPincode: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerGstin: string;
  // Invoice Meta
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  placeOfSupply: string;
  stateType: 'intra' | 'inter';
  // Payment
  paymentTerms: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  // Notes
  notes: string;
  termsAndConditions: string;
  // Items
  items: InvoiceItem[];
}

const emptyItem = (): InvoiceItem => ({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
  description: '',
  hsn: '',
  quantity: 1,
  unit: 'Nos',
  unitPrice: 0,
  discount: 0,
  gstRate: 18,
});

const initialItem = (): InvoiceItem => ({
  id: 'item-initial',
  description: '',
  hsn: '',
  quantity: 1,
  unit: 'Nos',
  unitPrice: 0,
  discount: 0,
  gstRate: 18,
});

// ─── Number to Words (Indian) ───
function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convert(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convert(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '');
  }

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  let result = convert(rupees) + ' Rupees';
  if (paise > 0) result += ' and ' + convert(paise) + ' Paise';
  result += ' Only';
  return result;
}

// ─── Reusable Input Component ───
function InputField({ label, icon: Icon, ...props }: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-3.5 h-3.5 text-muted/60" />
          </div>
        )}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-9' : 'px-3'} pr-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all ${props.className || ''}`}
        />
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════

export default function InvoiceGeneratorPage() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<string>('seller');

  const [invoice, setInvoice] = useState<InvoiceData>({
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerPincode: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerGstin: '',
    sellerPan: '',
    sellerLogo: null,
    buyerName: '',
    buyerAddress: '',
    buyerCity: '',
    buyerState: '',
    buyerPincode: '',
    buyerPhone: '',
    buyerEmail: '',
    buyerGstin: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    placeOfSupply: '',
    stateType: 'intra',
    paymentTerms: 'Net 30',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    notes: '',
    termsAndConditions: '1. Payment is due within the specified terms.\n2. Goods once sold cannot be returned.\n3. Subject to local jurisdiction.',
    items: [initialItem()],
  });

  useEffect(() => {
    setInvoice((prev) => ({
      ...prev,
      invoiceNumber: prev.invoiceNumber || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      invoiceDate: prev.invoiceDate || new Date().toISOString().split('T')[0],
      dueDate: prev.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    }));
  }, []);

  // ─── Handlers ───
  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = () => setInvoice((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    setInvoice((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateField('sellerLogo', reader.result as string);
    reader.readAsDataURL(file);
  };

  // ─── Calculations ───
  const calculations = invoice.items.map((item) => {
    const grossAmount = item.quantity * item.unitPrice;
    const discountAmount = (grossAmount * item.discount) / 100;
    const taxableAmount = grossAmount - discountAmount;
    const gstAmount = (taxableAmount * item.gstRate) / 100;
    const total = taxableAmount + gstAmount;
    return { ...item, grossAmount, discountAmount, taxableAmount, gstAmount, total };
  });

  const totalTaxable = calculations.reduce((s, c) => s + c.taxableAmount, 0);
  const totalDiscount = calculations.reduce((s, c) => s + c.discountAmount, 0);
  const totalGST = calculations.reduce((s, c) => s + c.gstAmount, 0);
  const grandTotal = totalTaxable + totalGST;

  // ─── PDF Generation ───
  const downloadPDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF();
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pw - margin * 2;
    let y = margin;

    // ── Colors ──
    const primary: [number, number, number] = [79, 70, 229];
    const darkText: [number, number, number] = [15, 23, 42];
    const grayText: [number, number, number] = [100, 116, 139];
    const lightBg: [number, number, number] = [248, 250, 252];
    const white: [number, number, number] = [255, 255, 255];

    // ══════════════════════════════════════════
    // HEADER — Gradient Bar
    // ══════════════════════════════════════════
    doc.setFillColor(...primary);
    doc.rect(0, 0, pw, 8, 'F');

    y = 18;

    // Logo (if exists)
    if (invoice.sellerLogo) {
      try {
        doc.addImage(invoice.sellerLogo, 'PNG', margin, y - 4, 22, 22);
      } catch { /* skip if logo fails */ }
    }

    const logoOffset = invoice.sellerLogo ? 40 : 0;

    // Business Name — Large
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...darkText);
    doc.text(invoice.sellerName || 'Your Business Name', margin + logoOffset, y + 4);

    // Business details line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    const sellerLine1 = [invoice.sellerAddress, invoice.sellerCity, invoice.sellerState, invoice.sellerPincode].filter(Boolean).join(', ');
    if (sellerLine1) doc.text(sellerLine1, margin + logoOffset, y + 11);

    const sellerLine2 = [
      invoice.sellerPhone ? `Ph: ${invoice.sellerPhone}` : '',
      invoice.sellerEmail ? `Email: ${invoice.sellerEmail}` : '',
    ].filter(Boolean).join('  |  ');
    if (sellerLine2) doc.text(sellerLine2, margin + logoOffset, y + 16);

    const sellerLine3 = [
      invoice.sellerGstin ? `GSTIN: ${invoice.sellerGstin}` : '',
      invoice.sellerPan ? `PAN: ${invoice.sellerPan}` : '',
    ].filter(Boolean).join('  |  ');
    if (sellerLine3) doc.text(sellerLine3, margin + logoOffset, y + 21);

    // ── TAX INVOICE badge (right side) ──
    doc.setFillColor(...primary);
    const badgeText = 'TAX INVOICE';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    const badgeWidth = doc.getTextWidth(badgeText) + 16;
    doc.roundedRect(pw - margin - badgeWidth, y - 2, badgeWidth, 11, 2, 2, 'F');
    doc.setTextColor(...white);
    doc.text(badgeText, pw - margin - badgeWidth / 2, y + 5.5, { align: 'center' });

    // Invoice details (right column)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...grayText);
    const rightX = pw - margin;
    doc.text(`Invoice #:  `, rightX - 50, y + 14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(invoice.invoiceNumber, rightX, y + 14, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text(`Date:  `, rightX - 50, y + 19);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(formatDate(invoice.invoiceDate), rightX, y + 19, { align: 'right' });

    if (invoice.dueDate) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grayText);
      doc.text(`Due Date:  `, rightX - 50, y + 24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkText);
      doc.text(formatDate(invoice.dueDate), rightX, y + 24, { align: 'right' });
    }

    y += 34;

    // ── Divider ──
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pw - margin, y);
    y += 8;

    // ══════════════════════════════════════════
    // BILL TO Section
    // ══════════════════════════════════════════
    // Left: Bill To | Right: Ship To / Place of Supply
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, y - 3, contentWidth / 2 - 4, 38, 3, 3, 'F');
    doc.roundedRect(margin + contentWidth / 2 + 4, y - 3, contentWidth / 2 - 4, 38, 3, 3, 'F');

    // Bill To
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...primary);
    doc.text('BILL TO', margin + 6, y + 3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...darkText);
    doc.text(invoice.buyerName || 'Buyer Name', margin + 6, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    const buyerAddr = [invoice.buyerAddress, invoice.buyerCity, invoice.buyerState, invoice.buyerPincode].filter(Boolean).join(', ');
    if (buyerAddr) {
      const splitAddr = doc.splitTextToSize(buyerAddr, contentWidth / 2 - 16);
      doc.text(splitAddr, margin + 6, y + 16);
    }

    const buyerContact = [
      invoice.buyerPhone ? `Ph: ${invoice.buyerPhone}` : '',
      invoice.buyerEmail ? invoice.buyerEmail : '',
    ].filter(Boolean).join(' | ');
    if (buyerContact) doc.text(buyerContact, margin + 6, y + 23);

    if (invoice.buyerGstin) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkText);
      doc.text(`GSTIN: ${invoice.buyerGstin}`, margin + 6, y + 29);
    }

    // Place of Supply / Payment
    const rightColX = margin + contentWidth / 2 + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...primary);
    doc.text('SUPPLY & PAYMENT', rightColX, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    if (invoice.placeOfSupply) doc.text(`Place of Supply: ${invoice.placeOfSupply}`, rightColX, y + 10);
    doc.text(`Type: ${invoice.stateType === 'intra' ? 'Intra-State (CGST+SGST)' : 'Inter-State (IGST)'}`, rightColX, y + 16);
    if (invoice.paymentTerms) doc.text(`Payment Terms: ${invoice.paymentTerms}`, rightColX, y + 22);
    if (invoice.dueDate) doc.text(`Due: ${formatDate(invoice.dueDate)}`, rightColX, y + 28);

    y += 44;

    // ══════════════════════════════════════════
    // ITEMS TABLE
    // ══════════════════════════════════════════
    const tableHead = invoice.stateType === 'intra'
      ? [['#', 'Description', 'HSN', 'Qty', 'Unit', 'Rate (Rs.)', 'Disc%', 'Taxable (Rs.)', 'CGST (Rs.)', 'SGST (Rs.)', 'Total (Rs.)']]
      : [['#', 'Description', 'HSN', 'Qty', 'Unit', 'Rate (Rs.)', 'Disc%', 'Taxable (Rs.)', 'IGST (Rs.)', 'Total (Rs.)']];

    const tableBody = calculations.map((c, i) => {
      const base = [
        String(i + 1),
        c.description || '-',
        c.hsn || '-',
        String(c.quantity),
        c.unit,
        c.unitPrice.toFixed(2),
        c.discount > 0 ? c.discount + '%' : '-',
        c.taxableAmount.toFixed(2),
      ];
      if (invoice.stateType === 'intra') {
        base.push((c.gstAmount / 2).toFixed(2), (c.gstAmount / 2).toFixed(2), c.total.toFixed(2));
      } else {
        base.push(c.gstAmount.toFixed(2), c.total.toFixed(2));
      }
      return base;
    });

    autoTable(doc, {
      startY: y,
      head: tableHead,
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: primary,
        fontSize: 7,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 7.5,
        cellPadding: 2.5,
        textColor: darkText,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 36 },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'right' },
        6: { halign: 'center' },
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
        10: { halign: 'right' },
      },
      styles: {
        lineColor: [226, 232, 240],
        lineWidth: 0.3,
      },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;

    // ══════════════════════════════════════════
    // SUMMARY BOX (Right-aligned)
    // ══════════════════════════════════════════
    const summaryX = pw - margin - 80;
    const summaryW = 80;
    let sy = y;

    // Summary background
    doc.setFillColor(...lightBg);
    const summaryH = invoice.stateType === 'intra' ? 48 : 40;
    doc.roundedRect(summaryX - 4, sy - 4, summaryW + 8, summaryH, 3, 3, 'F');

    const drawSummaryRow = (label: string, value: string, bold = false) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(bold ? 9 : 8);
      doc.setTextColor(...(bold ? darkText : grayText));
      doc.text(label, summaryX, sy);
      doc.setTextColor(...darkText);
      doc.text(value, summaryX + summaryW, sy, { align: 'right' });
      sy += bold ? 7 : 5.5;
    };

    drawSummaryRow('Sub Total:', `Rs. ${totalTaxable.toFixed(2)}`);
    if (totalDiscount > 0) drawSummaryRow('Discount:', `- Rs. ${totalDiscount.toFixed(2)}`);
    if (invoice.stateType === 'intra') {
      drawSummaryRow('CGST:', `Rs. ${(totalGST / 2).toFixed(2)}`);
      drawSummaryRow('SGST:', `Rs. ${(totalGST / 2).toFixed(2)}`);
    } else {
      drawSummaryRow('IGST:', `Rs. ${totalGST.toFixed(2)}`);
    }
    // Divider
    doc.setDrawColor(...primary);
    doc.setLineWidth(0.5);
    doc.line(summaryX, sy - 2, summaryX + summaryW, sy - 2);
    sy += 2;
    drawSummaryRow('GRAND TOTAL:', `Rs. ${grandTotal.toFixed(2)}`, true);

    // ── Amount in Words (below table, left side) ──
    const wordsY = y;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...primary);
    doc.text('AMOUNT IN WORDS', margin, wordsY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkText);
    const amountWords = numberToWords(grandTotal);
    const splitWords = doc.splitTextToSize(amountWords, contentWidth / 2 - 10);
    doc.text(splitWords, margin, wordsY + 5.5);

    y = Math.max(sy, wordsY + 15) + 8;

    // ══════════════════════════════════════════
    // BANK DETAILS & NOTES (Bottom Section)
    // ══════════════════════════════════════════
    const hasBankDetails = invoice.bankName || invoice.accountNumber || invoice.ifscCode || invoice.upiId;

    if (hasBankDetails || invoice.notes) {
      // Check if we need a new page
      if (y > ph - 60) {
        doc.addPage();
        y = margin;
      }

      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y, pw - margin, y);
      y += 8;

      if (hasBankDetails) {
        doc.setFillColor(...lightBg);
        doc.roundedRect(margin, y - 3, contentWidth / 2 - 4, 30, 3, 3, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...primary);
        doc.text('BANK DETAILS', margin + 6, y + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...grayText);
        let bankY = y + 9;
        if (invoice.bankName) { doc.text(`Bank: ${invoice.bankName}`, margin + 6, bankY); bankY += 5; }
        if (invoice.accountNumber) { doc.text(`A/C No: ${invoice.accountNumber}`, margin + 6, bankY); bankY += 5; }
        if (invoice.ifscCode) { doc.text(`IFSC: ${invoice.ifscCode}`, margin + 6, bankY); bankY += 5; }
        if (invoice.upiId) { doc.text(`UPI: ${invoice.upiId}`, margin + 6, bankY); }
      }

      if (invoice.notes) {
        const notesX = hasBankDetails ? margin + contentWidth / 2 + 10 : margin + 6;
        const notesBoxX = hasBankDetails ? margin + contentWidth / 2 + 4 : margin;

        doc.setFillColor(...lightBg);
        doc.roundedRect(notesBoxX, y - 3, (hasBankDetails ? contentWidth / 2 - 4 : contentWidth), 30, 3, 3, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...primary);
        doc.text('NOTES', notesX, y + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...grayText);
        const notesLines = doc.splitTextToSize(invoice.notes, (hasBankDetails ? contentWidth / 2 - 20 : contentWidth - 12));
        doc.text(notesLines.slice(0, 4), notesX, y + 9);
      }

      y += 38;
    }

    // ── Terms & Conditions ──
    if (invoice.termsAndConditions) {
      if (y > ph - 40) { doc.addPage(); y = margin; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...primary);
      doc.text('TERMS & CONDITIONS', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...grayText);
      const tcLines = doc.splitTextToSize(invoice.termsAndConditions, contentWidth);
      doc.text(tcLines.slice(0, 5), margin, y + 5.5);
      y += 5.5 + tcLines.slice(0, 5).length * 3.5;
    }

    // ── Signature ──
    if (y > ph - 30) { doc.addPage(); y = margin; }
    y = Math.max(y + 8, ph - 35);
    doc.setDrawColor(226, 232, 240);
    doc.line(pw - margin - 60, y + 10, pw - margin, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    doc.text('Authorized Signatory', pw - margin - 30, y + 16, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkText);
    doc.text(`For ${invoice.sellerName || 'Your Business'}`, pw - margin - 30, y + 21, { align: 'center' });

    // ── Footer Bar ──
    doc.setFillColor(...primary);
    doc.rect(0, ph - 8, pw, 8, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...white);
    doc.text('This is a computer-generated invoice.', pw / 2, ph - 3.5, { align: 'center' });

    doc.save(`${invoice.invoiceNumber}.pdf`);
  }, [invoice, calculations, totalTaxable, totalDiscount, totalGST, grandTotal]);

  // ─── Section Navigation ───
  const sections = [
    { id: 'seller', label: 'Your Business', icon: HiBuildingOffice2 },
    { id: 'buyer', label: 'Bill To', icon: HiUser },
    { id: 'invoice', label: 'Invoice Details', icon: HiDocumentDuplicate },
    { id: 'items', label: 'Items', icon: HiBanknotes },
    { id: 'payment', label: 'Payment', icon: HiCreditCard },
    { id: 'notes', label: 'Notes', icon: HiDocumentText },
  ];

  // ═════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <HiDocumentText className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              Invoice <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Create professional GST-compliant invoices with your business branding
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeSection === s.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-surface border border-border text-muted hover:text-foreground hover:border-primary/30'
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Input Form */}
            <div className="lg:col-span-3 space-y-6">

              {/* ── SELLER SECTION ── */}
              {activeSection === 'seller' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <HiBuildingOffice2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Your Business Details</h2>
                      <p className="text-xs text-muted">This information appears on the invoice header</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-xs font-medium text-muted mb-2">Business Logo</label>
                    <div className="flex items-center gap-4">
                      {invoice.sellerLogo ? (
                        <div className="relative group">
                          <img
                            src={invoice.sellerLogo}
                            alt="Logo"
                            className="w-20 h-20 object-contain rounded-xl border border-border bg-background p-1"
                          />
                          <button
                            onClick={() => updateField('sellerLogo', null)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                          >
                            <HiXMark className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted hover:text-primary transition-all cursor-pointer bg-background"
                        >
                          <HiPhoto className="w-6 h-6" />
                          <span className="text-[10px] font-medium">Upload</span>
                        </button>
                      )}
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="text-xs text-muted">
                        <p>Upload your business logo</p>
                        <p className="text-muted/60">PNG, JPG (max 500x500px)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Business Name *" icon={HiBuildingOffice2} placeholder="Acme Pvt Ltd" value={invoice.sellerName} onChange={(e) => updateField('sellerName', (e.target as HTMLInputElement).value)} />
                    <InputField label="Phone" icon={HiPhone} placeholder="+91 98765 43210" value={invoice.sellerPhone} onChange={(e) => updateField('sellerPhone', (e.target as HTMLInputElement).value)} />
                  </div>

                  <InputField label="Address" icon={HiMapPin} placeholder="123, MG Road, Shop No. 4" value={invoice.sellerAddress} onChange={(e) => updateField('sellerAddress', (e.target as HTMLInputElement).value)} />

                  <div className="grid grid-cols-3 gap-4">
                    <InputField label="City" placeholder="Mumbai" value={invoice.sellerCity} onChange={(e) => updateField('sellerCity', (e.target as HTMLInputElement).value)} />
                    <InputField label="State" placeholder="Maharashtra" value={invoice.sellerState} onChange={(e) => updateField('sellerState', (e.target as HTMLInputElement).value)} />
                    <InputField label="Pincode" placeholder="400001" value={invoice.sellerPincode} onChange={(e) => updateField('sellerPincode', (e.target as HTMLInputElement).value)} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Email" icon={HiEnvelope} placeholder="info@acme.com" value={invoice.sellerEmail} onChange={(e) => updateField('sellerEmail', (e.target as HTMLInputElement).value)} />
                    <InputField label="GSTIN *" icon={HiIdentification} placeholder="22AAAAA0000A1Z5" maxLength={15} value={invoice.sellerGstin} onChange={(e) => updateField('sellerGstin', (e.target as HTMLInputElement).value.toUpperCase())} className="font-mono" />
                  </div>

                  <InputField label="PAN" icon={HiIdentification} placeholder="AAAAA0000A" maxLength={10} value={invoice.sellerPan} onChange={(e) => updateField('sellerPan', (e.target as HTMLInputElement).value.toUpperCase())} className="font-mono sm:w-1/2" />

                  <div className="flex justify-end pt-2">
                    <button onClick={() => setActiveSection('buyer')} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                      Next: Bill To →
                    </button>
                  </div>
                </div>
              )}

              {/* ── BUYER SECTION ── */}
              {activeSection === 'buyer' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <HiUser className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Bill To — Customer Details</h2>
                      <p className="text-xs text-muted">Your customer / buyer information</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Customer Name *" icon={HiUser} placeholder="Customer Pvt Ltd" value={invoice.buyerName} onChange={(e) => updateField('buyerName', (e.target as HTMLInputElement).value)} />
                    <InputField label="Phone" icon={HiPhone} placeholder="+91 91234 56789" value={invoice.buyerPhone} onChange={(e) => updateField('buyerPhone', (e.target as HTMLInputElement).value)} />
                  </div>

                  <InputField label="Address" icon={HiMapPin} placeholder="456, Station Road" value={invoice.buyerAddress} onChange={(e) => updateField('buyerAddress', (e.target as HTMLInputElement).value)} />

                  <div className="grid grid-cols-3 gap-4">
                    <InputField label="City" placeholder="Pune" value={invoice.buyerCity} onChange={(e) => updateField('buyerCity', (e.target as HTMLInputElement).value)} />
                    <InputField label="State" placeholder="Maharashtra" value={invoice.buyerState} onChange={(e) => updateField('buyerState', (e.target as HTMLInputElement).value)} />
                    <InputField label="Pincode" placeholder="411001" value={invoice.buyerPincode} onChange={(e) => updateField('buyerPincode', (e.target as HTMLInputElement).value)} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Email" icon={HiEnvelope} placeholder="buyer@company.com" value={invoice.buyerEmail} onChange={(e) => updateField('buyerEmail', (e.target as HTMLInputElement).value)} />
                    <InputField label="GSTIN" icon={HiIdentification} placeholder="27BBBBB0000B1Z3" maxLength={15} value={invoice.buyerGstin} onChange={(e) => updateField('buyerGstin', (e.target as HTMLInputElement).value.toUpperCase())} className="font-mono" />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={() => setActiveSection('seller')} className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setActiveSection('invoice')} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                      Next: Invoice Details →
                    </button>
                  </div>
                </div>
              )}

              {/* ── INVOICE DETAILS SECTION ── */}
              {activeSection === 'invoice' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <HiDocumentDuplicate className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Invoice Details</h2>
                      <p className="text-xs text-muted">Invoice number, dates, and transaction type</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Invoice Number *" icon={HiDocumentDuplicate} value={invoice.invoiceNumber} onChange={(e) => updateField('invoiceNumber', (e.target as HTMLInputElement).value)} className="font-mono" />
                    <InputField label="Place of Supply" icon={HiMapPin} placeholder="Maharashtra" value={invoice.placeOfSupply} onChange={(e) => updateField('placeOfSupply', (e.target as HTMLInputElement).value)} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Invoice Date *" icon={HiCalendarDays} type="date" value={invoice.invoiceDate} onChange={(e) => updateField('invoiceDate', (e.target as HTMLInputElement).value)} />
                    <InputField label="Due Date" icon={HiCalendarDays} type="date" value={invoice.dueDate} onChange={(e) => updateField('dueDate', (e.target as HTMLInputElement).value)} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Transaction Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['intra', 'inter'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => updateField('stateType', type)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium text-center transition-all cursor-pointer ${
                            invoice.stateType === type
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border text-muted hover:border-primary/30'
                          }`}
                        >
                          {type === 'intra' ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={() => setActiveSection('buyer')} className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setActiveSection('items')} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                      Next: Items →
                    </button>
                  </div>
                </div>
              )}

              {/* ── ITEMS SECTION ── */}
              {activeSection === 'items' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <HiBanknotes className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">Invoice Items</h2>
                        <p className="text-xs text-muted">{invoice.items.length} item{invoice.items.length > 1 ? 's' : ''} added</p>
                      </div>
                    </div>
                    <button onClick={addItem} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors cursor-pointer">
                      <HiPlus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    {invoice.items.map((item, index) => (
                      <div key={item.id} className="p-5 rounded-2xl bg-background border border-border space-y-4 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                            Item #{index + 1}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground font-mono">
                              {formatCurrency(calculations[index]?.total || 0)}
                            </span>
                            {invoice.items.length > 1 && (
                              <button onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-danger hover:bg-danger/10 transition-colors cursor-pointer">
                                <HiTrash className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                          <div className="col-span-2 sm:col-span-3">
                            <label className="block text-[10px] font-medium text-muted mb-1">Description</label>
                            <input placeholder="Product/Service name" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground placeholder:text-muted/40 focus:border-primary outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">HSN/SAC</label>
                            <input placeholder="Code" value={item.hsn} onChange={(e) => updateItem(item.id, 'hsn', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground placeholder:text-muted/40 focus:border-primary outline-none transition-all font-mono" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">Qty</label>
                            <input type="number" min="1" value={item.quantity || ''} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground focus:border-primary outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">Unit</label>
                            <select value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground focus:border-primary outline-none transition-all cursor-pointer">
                              <option>Nos</option><option>Kg</option><option>Ltr</option><option>Pcs</option><option>Hrs</option><option>Sq.ft</option><option>Set</option><option>Box</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">Unit Price (₹)</label>
                            <input type="number" min="0" step="0.01" placeholder="0.00" value={item.unitPrice || ''} onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground focus:border-primary outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">Discount %</label>
                            <input type="number" min="0" max="100" step="0.1" placeholder="0" value={item.discount || ''} onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground focus:border-primary outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-muted mb-1">GST Rate</label>
                            <select value={item.gstRate} onChange={(e) => updateItem(item.id, 'gstRate', parseInt(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground focus:border-primary outline-none transition-all cursor-pointer">
                              <option value={0}>0%</option><option value={3}>3%</option><option value={5}>5%</option><option value={12}>12%</option><option value={18}>18%</option><option value={28}>28%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={() => setActiveSection('invoice')} className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setActiveSection('payment')} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                      Next: Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* ── PAYMENT SECTION ── */}
              {activeSection === 'payment' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <HiCreditCard className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Payment Details</h2>
                      <p className="text-xs text-muted">Bank account and payment terms (optional)</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <InputField label="Payment Terms" placeholder="Net 30 / Due on Receipt / COD" value={invoice.paymentTerms} onChange={(e) => updateField('paymentTerms', (e.target as HTMLInputElement).value)} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Bank Name" placeholder="State Bank of India" value={invoice.bankName} onChange={(e) => updateField('bankName', (e.target as HTMLInputElement).value)} />
                    <InputField label="Account Number" placeholder="1234567890" value={invoice.accountNumber} onChange={(e) => updateField('accountNumber', (e.target as HTMLInputElement).value)} className="font-mono" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="IFSC Code" placeholder="SBIN0001234" value={invoice.ifscCode} onChange={(e) => updateField('ifscCode', (e.target as HTMLInputElement).value.toUpperCase())} className="font-mono" />
                    <InputField label="UPI ID" placeholder="business@upi" value={invoice.upiId} onChange={(e) => updateField('upiId', (e.target as HTMLInputElement).value)} />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={() => setActiveSection('items')} className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setActiveSection('notes')} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                      Next: Notes →
                    </button>
                  </div>
                </div>
              )}

              {/* ── NOTES SECTION ── */}
              {activeSection === 'notes' && (
                <div className="card-elevated p-6 sm:p-8 space-y-5 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                      <HiDocumentText className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Notes & Terms</h2>
                      <p className="text-xs text-muted">Additional notes and terms & conditions (optional)</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Notes / Remarks</label>
                    <textarea
                      rows={3}
                      placeholder="Thank you for your business! Payment details above."
                      value={invoice.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Terms & Conditions</label>
                    <textarea
                      rows={4}
                      value={invoice.termsAndConditions}
                      onChange={(e) => updateField('termsAndConditions', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={() => setActiveSection('payment')} className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer">
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ═══ RIGHT COLUMN: LIVE SUMMARY ═══ */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated p-6 space-y-4 sticky top-24">
                {/* Invoice Preview Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Invoice Summary</h3>
                  <span className="text-xs text-muted font-mono">{invoice.invoiceNumber}</span>
                </div>

                {/* Business Info */}
                {invoice.sellerName && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background">
                    {invoice.sellerLogo ? (
                      <img src={invoice.sellerLogo} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <HiBuildingOffice2 className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-foreground">{invoice.sellerName}</p>
                      <p className="text-[10px] text-muted">{invoice.sellerGstin && `GSTIN: ${invoice.sellerGstin}`}</p>
                    </div>
                  </div>
                )}

                {/* Bill To */}
                {invoice.buyerName && (
                  <div className="p-3 rounded-xl bg-background">
                    <p className="text-[10px] text-muted uppercase font-semibold mb-1">Bill To</p>
                    <p className="text-sm font-semibold text-foreground">{invoice.buyerName}</p>
                    {invoice.buyerGstin && <p className="text-[10px] text-muted">GSTIN: {invoice.buyerGstin}</p>}
                  </div>
                )}

                <div className="h-px bg-border" />

                {/* Items List */}
                <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                  {calculations.map((c, i) => (
                    <div key={c.id} className="flex items-center justify-between text-muted">
                      <span className="truncate max-w-[55%]">
                        <span className="text-xs text-primary font-mono mr-1">{i + 1}.</span>
                        {c.description || `Item ${i + 1}`}
                        {c.discount > 0 && <span className="text-[10px] text-warning ml-1">(-{c.discount}%)</span>}
                      </span>
                      <span className="font-mono font-medium text-foreground">{formatCurrency(c.total)}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(totalTaxable + totalDiscount)}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-warning">
                      <span>Discount</span>
                      <span className="font-mono">- {formatCurrency(totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Taxable Amount</span>
                    <span className="font-mono">{formatCurrency(totalTaxable)}</span>
                  </div>
                  {invoice.stateType === 'intra' ? (
                    <>
                      <div className="flex justify-between text-muted">
                        <span>CGST</span>
                        <span className="font-mono">{formatCurrency(totalGST / 2)}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>SGST</span>
                        <span className="font-mono">{formatCurrency(totalGST / 2)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-muted">
                      <span>IGST</span>
                      <span className="font-mono">{formatCurrency(totalGST)}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-border" />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Grand Total</span>
                  <span className="text-2xl font-bold text-primary font-mono">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>

                {/* Amount in Words */}
                {grandTotal > 0 && (
                  <p className="text-[10px] text-muted italic bg-background rounded-lg px-3 py-2">
                    {numberToWords(grandTotal)}
                  </p>
                )}

                {/* Download Button */}
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer mt-2"
                >
                  <HiArrowDownTray className="w-5 h-5" />
                  Download Professional PDF
                </button>

                {/* Payment Info Badge */}
                {(invoice.bankName || invoice.upiId) && (
                  <div className="flex items-center gap-2 text-[10px] text-success bg-success/5 rounded-lg px-3 py-2">
                    <HiCreditCard className="w-3.5 h-3.5" />
                    Payment details will be included in PDF
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Helper ───
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
