import React, { useState, useEffect } from 'react';
import { FinanceType, DealSubmission } from '../types';
import { saveInquiry } from '../utils/inquiryStorage';
import { generateEmailContent, sendLiveEmailToBroker } from '../utils/emailDispatcher';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, ExternalLink, Loader2, Copy, Check } from 'lucide-react';

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFacility?: FinanceType;
  prefillData?: {
    loanAmount?: number;
    securityValue?: number;
    termMonths?: number;
    type?: FinanceType;
  };
}

export const DealModal: React.FC<DealModalProps> = ({
  isOpen,
  onClose,
  defaultFacility = 'bridging',
  prefillData
}) => {
  const [formData, setFormData] = useState<DealSubmission>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    financeType: defaultFacility,
    loanAmount: 1000000,
    securityValue: 1500000,
    timeframe: 'Urgent (under 14 days)',
    summary: '',
    exitStrategy: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const [emailUrls, setEmailUrls] = useState<{ gmailUrl: string; mailtoUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        financeType: prefillData.type || prev.financeType,
        loanAmount: prefillData.loanAmount ?? prev.loanAmount,
        securityValue: prefillData.securityValue ?? prev.securityValue
      }));
    } else if (defaultFacility) {
      setFormData(prev => ({ ...prev, financeType: defaultFacility }));
    }
  }, [defaultFacility, prefillData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email || !formData.phone) return;

    // 1. Save locally to Broker Inbox
    saveInquiry({
      type: 'deal-proposal',
      name: formData.clientName,
      company: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      facilityOrTopic: `${formData.financeType.toUpperCase()} Finance`,
      amountOrTicket: `£${formData.loanAmount.toLocaleString('en-GB')}`,
      timeframe: formData.timeframe,
      summary: `Urgency: ${formData.timeframe}\nSecurity Value: £${formData.securityValue.toLocaleString('en-GB')}\nExit: ${formData.exitStrategy}\nDetails: ${formData.summary}`
    });

    // 2. Prepare email content
    const emailData = {
      name: formData.clientName,
      company: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      facility: `${formData.financeType.toUpperCase()} Commercial Finance`,
      amount: `£${formData.loanAmount.toLocaleString('en-GB')}`,
      securityValue: `£${formData.securityValue.toLocaleString('en-GB')}`,
      urgency: formData.timeframe,
      message: `Exit Strategy: ${formData.exitStrategy || 'Not specified'}\n\nProject Details:\n${formData.summary || 'None provided'}`
    };

    const urls = generateEmailContent(emailData);
    setEmailUrls(urls);
    setIsSubmitted(true);
    setEmailStatus('sending');

    try {
      const res = await sendLiveEmailToBroker(emailData);
      if (res.success) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('fallback');
      }
    } catch {
      setEmailStatus('fallback');
    }
  };

  const handleCopy = () => {
    const text = `Proposal - Principal Investment Proposals\nClient: ${formData.clientName} (${formData.companyName || 'N/A'})\nContact: ${formData.phone} | ${formData.email}\nFacility: ${formData.financeType}\nLoan: £${formData.loanAmount.toLocaleString('en-GB')}\nValue: £${formData.securityValue.toLocaleString('en-GB')}\nDetails: ${formData.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-amber-400">
              Direct Broker Assessment
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Submit a Commercial Loan Proposal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-display">
                Proposal Logged & Prepared!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.clientName}</span>. Your {formData.financeType} proposal for £{formData.loanAmount.toLocaleString('en-GB')} has been registered in the broker inbox.
              </p>

              {/* Email Gateway Status */}
              <div className="max-w-md mx-auto p-3 rounded-lg text-xs border flex items-center justify-center gap-2 bg-slate-50 border-slate-200 text-slate-700">
                {emailStatus === 'sending' && (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    <span>Dispatching copy to piproposals@gmail.com...</span>
                  </>
                )}
                {emailStatus === 'sent' && (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct email delivered to piproposals@gmail.com!</span>
                  </>
                )}
                {(emailStatus === 'fallback' || emailStatus === 'idle') && (
                  <>
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ready to dispatch via your preferred email app:</span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                {emailUrls?.gmailUrl && (
                  <a
                    href={emailUrls.gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Gmail (Send to piproposals)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {emailUrls?.mailtoUrl && (
                  <a
                    href={emailUrls.mailtoUrl}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Outlook / Apple Mail</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Zero upfront review fees · Indicative DIP delivered in 2–4 hours</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Marcus Davenport"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Company / SPV (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Davenport Holdings Ltd"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@davenport.co.uk"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07700 900789"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Facility
                  </label>
                  <select
                    value={formData.financeType}
                    onChange={(e) => setFormData({ ...formData, financeType: e.target.value as FinanceType })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="bridging">Bridging Finance</option>
                    <option value="development">Development Finance</option>
                    <option value="working-capital">Working Capital</option>
                    <option value="invoice">Invoice Finance</option>
                    <option value="asset">Asset Refinance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Loan Required (£) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Asset Value (£)
                  </label>
                  <input
                    type="number"
                    value={formData.securityValue}
                    onChange={(e) => setFormData({ ...formData, securityValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Overview & Location of Asset
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Address, purchase price, current planning status, or works budget..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit for Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
