import React, { useState } from 'react';
import { PrivateLenderInquiry } from '../types';
import { saveInquiry } from '../utils/inquiryStorage';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

interface PrivateLenderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateLenderModal: React.FC<PrivateLenderModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<PrivateLenderInquiry>({
    lenderName: '',
    entityType: 'HNWI',
    email: '',
    phone: '',
    ticketSize: '£500,000 – £2,000,000',
    targetYield: '10% – 12% p.a.',
    preferredAssetClasses: ['1st Charge Bridging', 'Development Stretch Debt'],
    preferredGeography: 'London, South East & Major UK Hubs',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAssetClassToggle = (item: string) => {
    setForm(prev => {
      const exists = prev.preferredAssetClasses.includes(item);
      return {
        ...prev,
        preferredAssetClasses: exists
          ? prev.preferredAssetClasses.filter(x => x !== item)
          : [...prev.preferredAssetClasses, item]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.lenderName || !form.email) return;
    saveInquiry({
      type: 'private-lender',
      name: form.lenderName,
      company: form.entityType,
      email: form.email,
      phone: form.phone,
      facilityOrTopic: 'Private Debt Capital Partner',
      amountOrTicket: form.ticketSize,
      summary: `Target Yield: ${form.targetYield}\nPreferred Assets: ${form.preferredAssetClasses.join(', ')}\nGeography: ${form.preferredGeography}\nNotes: ${form.notes || 'None'}`
    });
    setIsSubmitted(true);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-amber-400">
                Institutional Syndicate Onboarding
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Join Our Private Lending Panel
              </h3>
            </div>
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
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white font-display">
                Lending Profile Registered
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{form.lenderName}</span>. Your capital deployment parameters have been logged. We will contact you for a brief introductory call to verify AML/KYC and agree on NDA terms before sending live deal memos.
              </p>
              <div className="pt-4">
                <a
                  href={`mailto:piproposals@gmail.com?subject=Private Lender Registration: ${encodeURIComponent(form.lenderName)}&body=${encodeURIComponent(`Entity: ${form.entityType}\nEmail: ${form.email}\nPhone: ${form.phone}\nTicket Size: ${form.ticketSize}\nYield: ${form.targetYield}\nAssets: ${form.preferredAssetClasses.join(', ')}`)}`}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email to Principal</span>
                </a>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <p className="text-xs text-slate-400 leading-relaxed">
                We introduce pre-screened borrowers with solid asset security to our private lender network. Complete this brief profile to receive deal memorandums aligned with your risk appetite.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lenderName}
                    onChange={(e) => setForm({ ...form, lenderName: e.target.value })}
                    placeholder="Julian Henderson"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Entity / Capital Type
                  </label>
                  <select
                    value={form.entityType}
                    onChange={(e) => setForm({ ...form, entityType: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="HNWI">High Net Worth Individual (HNWI)</option>
                    <option value="Family Office">Family Office</option>
                    <option value="Debt Fund">Boutique Debt Fund</option>
                    <option value="Private Equity">Private Equity / Investment Company</option>
                    <option value="Syndicate">Private Lending Syndicate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="julian@meridiancapital.co.uk"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Direct Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 7700 900321"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Target Ticket Size Per Deal
                  </label>
                  <select
                    value={form.ticketSize}
                    onChange={(e) => setForm({ ...form, ticketSize: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="£100,000 – £500,000">£100,000 – £500,000</option>
                    <option value="£500,000 – £2,000,000">£500,000 – £2,000,000 (Standard)</option>
                    <option value="£2,000,000 – £5,000,000">£2,000,000 – £5,000,000</option>
                    <option value="£5,000,000 – £15,000,000+">£5,000,000 – £15,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Target Annual Yield
                  </label>
                  <select
                    value={form.targetYield}
                    onChange={(e) => setForm({ ...form, targetYield: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="8% – 10% p.a. (Low risk 1st charge)">8% – 10% p.a. (Prime 1st charge)</option>
                    <option value="10% – 12% p.a. (Standard bridging)">10% – 12% p.a. (Commercial bridging)</option>
                    <option value="12% – 15%+ p.a. (Mezzanine / High yield)">12% – 15%+ p.a. (Stretch / Mezzanine)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Preferred Asset Classes (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    '1st Charge Bridging',
                    '2nd Charge Mezzanine',
                    'Development Stretch Debt',
                    'Commercial Refurbishment',
                    'Asset & Plant Refinance',
                    'Invoice Debt Receivables'
                  ].map((asset) => {
                    const isSelected = form.preferredAssetClasses.includes(asset);
                    return (
                      <button
                        key={asset}
                        type="button"
                        onClick={() => handleAssetClassToggle(asset)}
                        className={`p-2 text-left rounded-lg border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {asset}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Additional Notes or Specific Criteria
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Prefer residential assets in London/Home Counties, max 70% LTV..."
                  className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Lending Criteria</span>
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
