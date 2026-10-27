import React, { useState, useEffect } from 'react';
import { StoredInquiry } from '../types';
import { getStoredInquiries, updateInquiryStatus, deleteInquiry, saveInquiry } from '../utils/inquiryStorage';
import { generateEmailContent, sendLiveEmailToBroker } from '../utils/emailDispatcher';
import { 
  Inbox, 
  Mail, 
  Phone, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Send, 
  CheckCircle, 
  Trash2, 
  X, 
  Plus, 
  MessageSquare,
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';

interface BrokerInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrokerInboxModal: React.FC<BrokerInboxModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'direct-message' | 'deal-proposal' | 'private-lender'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailSuccess, setTestEmailSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const items = getStoredInquiries();
      setInquiries(items);
      if (items.length > 0 && !selectedId) {
        setSelectedId(items[0].id);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredInquiries = activeFilter === 'all'
    ? inquiries
    : inquiries.filter(item => item.type === activeFilter);

  const selectedInquiry = inquiries.find(i => i.id === selectedId) || inquiries[0];

  const handleStatusChange = (id: string, status: 'new' | 'reviewed' | 'contacted') => {
    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
  };

  const handleGenerateTestMessage = () => {
    const newRecord = saveInquiry({
      type: 'deal-proposal',
      name: 'James Thornton',
      company: 'Thornton Capital Ltd',
      email: 'james@thorntoncapital.co.uk',
      phone: '07700 900555',
      facilityOrTopic: 'Urgent Auction Bridge',
      amountOrTicket: '£850,000',
      timeframe: 'Urgent (under 14 days)',
      summary: 'Purchased commercial unit at SDL auction on Thursday. Need fast bridging to complete within 20 days. Property valued at £1.2M.'
    });
    const items = getStoredInquiries();
    setInquiries(items);
    setSelectedId(newRecord.id);
  };

  const handleDispatchLiveTestEmail = async () => {
    setTestEmailSending(true);
    setTestEmailSuccess(false);

    const testData = {
      name: 'Marcus Davenport (Test Verification)',
      company: 'Davenport Real Estate Ltd',
      email: 'piproposals@gmail.com',
      phone: '07700 900123',
      facility: 'Urgent Commercial Bridging (£1,850,000)',
      amount: '£1,850,000',
      securityValue: '£2,450,000 (75% LTV)',
      urgency: 'Urgent (7-day auction deadline)',
      message: 'This is a live test enquiry dispatched from www.principalinvestmentproposals.co.uk to verify email delivery directly to piproposals@gmail.com.'
    };

    saveInquiry({
      type: 'deal-proposal',
      name: testData.name,
      company: testData.company,
      email: testData.email,
      phone: testData.phone,
      facilityOrTopic: testData.facility,
      amountOrTicket: testData.amount,
      summary: testData.message
    });
    setInquiries(getStoredInquiries());

    const { gmailUrl } = generateEmailContent(testData);

    try {
      await sendLiveEmailToBroker(testData);
      setTestEmailSending(false);
      setTestEmailSuccess(true);
      setTimeout(() => setTestEmailSuccess(false), 4000);
      // Open Gmail compose tab directly for immediate verification
      window.open(gmailUrl, '_blank');
    } catch {
      setTestEmailSending(false);
      window.open(gmailUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg font-bold">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-amber-300">
                Broker Lead & Messaging Management
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                Principal Investment Proposals Inbox
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDispatchLiveTestEmail}
              disabled={testEmailSending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
            >
              {testEmailSending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : testEmailSuccess ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Mail className="w-3.5 h-3.5" />
              )}
              <span>{testEmailSuccess ? 'Test Sent to piproposals!' : 'Send Test Email to piproposals'}</span>
            </button>
            <button
              onClick={handleGenerateTestMessage}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Mock Lead</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Top Control Bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: `All (${inquiries.length})` },
              { id: 'direct-message', label: 'Direct Messages' },
              { id: 'deal-proposal', label: 'Deal Proposals' },
              { id: 'private-lender', label: 'Private Lenders' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Notifications routed to: <strong className="text-slate-800">piproposals@gmail.com</strong>
          </div>
        </div>

        {/* Main Inbox Two-Column Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Inquiry List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto bg-slate-50 p-2 space-y-1.5">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No inquiries in this category yet.
              </div>
            ) : (
              filteredInquiries.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-white border-slate-900 shadow-xs'
                        : 'bg-white/70 hover:bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-xs truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>

                    <div className="text-[11px] font-medium text-amber-800 mb-1 flex items-center justify-between">
                      <span>{item.facilityOrTopic || 'General Inquiry'}</span>
                      {item.amountOrTicket && (
                        <span className="font-mono text-slate-700">{item.amountOrTicket}</span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{item.company || 'Private Client'}</span>
                      <span
                        className={`font-semibold uppercase tracking-wider ${
                          item.status === 'new'
                            ? 'text-amber-600'
                            : item.status === 'reviewed'
                            ? 'text-blue-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        ● {item.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Inquiry Detail View */}
          <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto bg-white p-6 sm:p-8">
            {selectedInquiry ? (
              <div className="space-y-6">
                {/* Contact Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      {selectedInquiry.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {selectedInquiry.company ? `${selectedInquiry.company} · ` : ''}
                      Submitted: {selectedInquiry.timestamp}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
                    >
                      <option value="new">Status: New</option>
                      <option value="reviewed">Status: Reviewed</option>
                      <option value="contacted">Status: Contacted</option>
                    </select>

                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Email Address</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="font-bold text-slate-900 hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedInquiry.email}</span>
                    </a>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Direct Phone</span>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="font-bold text-slate-900 hover:underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedInquiry.phone || 'Not provided'}</span>
                    </a>
                  </div>

                  {selectedInquiry.facilityOrTopic && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-0.5">Facility / Topic</span>
                      <strong className="text-slate-900 font-semibold">{selectedInquiry.facilityOrTopic}</strong>
                    </div>
                  )}

                  {selectedInquiry.amountOrTicket && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-0.5">Required Sum / Ticket</span>
                      <strong className="text-amber-800 font-mono text-sm">{selectedInquiry.amountOrTicket}</strong>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Client Proposal / Message Details:
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.summary}
                  </div>
                </div>

                {/* Action Buttons: Reply */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Principal Investment Proposals - Re: ${encodeURIComponent(selectedInquiry.facilityOrTopic || 'Commercial Lending')}&body=${encodeURIComponent(`Hi ${selectedInquiry.name},\n\nThank you for reaching out to Principal Investment Proposals regarding your ${selectedInquiry.facilityOrTopic || 'commercial finance enquiry'}.\n\nI have reviewed your requirements and would be delighted to discuss indicative terms and next steps with you.\n\nWhen would be a convenient time for a quick 5-minute call?\n\nWarm regards,\nPrincipal Investment Proposals\nwww.principalinvestmentproposals.co.uk`)}`}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>

                  {selectedInquiry.phone && selectedInquiry.phone !== 'N/A' && (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedInquiry.name}, thank you for contacting Principal Investment Proposals regarding your ${selectedInquiry.facilityOrTopic || 'enquiry'}. When is a good time to connect?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'contacted')}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Mark as Contacted
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs">
                Select an inquiry from the list to view details and reply.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
