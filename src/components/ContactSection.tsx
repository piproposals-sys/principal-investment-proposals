import React, { useState } from 'react';
import { FinanceType, DirectMessage, DealSubmission } from '../types';
import { saveInquiry } from '../utils/inquiryStorage';
import { generateEmailContent, sendLiveEmailToBroker } from '../utils/emailDispatcher';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Inbox, 
  Sparkles, 
  ExternalLink,
  Loader2
} from 'lucide-react';

interface ContactSectionProps {
  initialFacility?: FinanceType;
  onOpenInbox?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialFacility = 'bridging', onOpenInbox }) => {
  const [activeTab, setActiveTab] = useState<'message' | 'deal'>('message');

  // Direct Message State
  const [msgForm, setMsgForm] = useState<DirectMessage>({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    topic: 'General Commercial Enquiry',
    message: ''
  });
  const [msgSubmitted, setMsgSubmitted] = useState(false);
  const [msgEmailDispatchState, setMsgEmailDispatchState] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const [lastDispatchedUrls, setLastDispatchedUrls] = useState<{ gmailUrl: string; mailtoUrl: string } | null>(null);

  // Deal Intake State
  const [dealForm, setDealForm] = useState<DealSubmission>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    financeType: initialFacility,
    loanAmount: 1000000,
    securityValue: 1500000,
    timeframe: 'Urgent (under 14 days)',
    summary: '',
    exitStrategy: ''
  });
  const [dealSubmitted, setDealSubmitted] = useState(false);
  const [dealEmailDispatchState, setDealEmailDispatchState] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Send Direct Message
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgForm.name || !msgForm.email || !msgForm.message) return;

    // 1. Save in local broker inbox
    saveInquiry({
      type: 'direct-message',
      name: msgForm.name,
      email: msgForm.email,
      phone: msgForm.phone,
      facilityOrTopic: msgForm.topic,
      summary: msgForm.message
    });

    // 2. Prepare email links
    const emailData = {
      name: msgForm.name,
      email: msgForm.email,
      phone: msgForm.phone,
      facility: msgForm.topic,
      message: msgForm.message
    };
    const links = generateEmailContent(emailData);
    setLastDispatchedUrls(links);
    setMsgSubmitted(true);
    setMsgEmailDispatchState('sending');

    // 3. Dispatch to email gateway
    try {
      const result = await sendLiveEmailToBroker(emailData);
      if (result.success) {
        setMsgEmailDispatchState('sent');
      } else {
        setMsgEmailDispatchState('fallback');
      }
    } catch {
      setMsgEmailDispatchState('fallback');
    }
  };

  // Send Deal Intake
  const handleDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealForm.clientName || !dealForm.email || !dealForm.loanAmount) return;

    // 1. Save in local broker inbox
    saveInquiry({
      type: 'deal-proposal',
      name: dealForm.clientName,
      company: dealForm.companyName,
      email: dealForm.email,
      phone: dealForm.phone,
      facilityOrTopic: `${dealForm.financeType.toUpperCase()} Finance`,
      amountOrTicket: `£${dealForm.loanAmount.toLocaleString('en-GB')}`,
      timeframe: dealForm.timeframe,
      summary: `Urgency: ${dealForm.timeframe}\nSecurity Value: £${dealForm.securityValue.toLocaleString('en-GB')}\nExit: ${dealForm.exitStrategy}\nDetails: ${dealForm.summary}`
    });

    // 2. Prepare email links
    const emailData = {
      name: dealForm.clientName,
      company: dealForm.companyName,
      email: dealForm.email,
      phone: dealForm.phone,
      facility: `${dealForm.financeType.toUpperCase()} Commercial Finance`,
      amount: `£${dealForm.loanAmount.toLocaleString('en-GB')}`,
      securityValue: `£${dealForm.securityValue.toLocaleString('en-GB')}`,
      urgency: dealForm.timeframe,
      message: `Exit Strategy: ${dealForm.exitStrategy || 'Not specified'}\n\nProject Overview:\n${dealForm.summary || 'None provided'}`
    };
    const links = generateEmailContent(emailData);
    setLastDispatchedUrls(links);
    setDealSubmitted(true);
    setDealEmailDispatchState('sending');

    // 3. Dispatch to email gateway
    try {
      const result = await sendLiveEmailToBroker(emailData);
      if (result.success) {
        setDealEmailDispatchState('sent');
      } else {
        setDealEmailDispatchState('fallback');
      }
    } catch {
      setDealEmailDispatchState('fallback');
    }
  };

  // 1-Click Test Enquiry Creator
  const handleFillTestEnquiry = (type: 'message' | 'deal') => {
    if (type === 'message') {
      setActiveTab('message');
      setMsgForm({
        name: 'Test Client (Broker Trial)',
        email: 'piproposals@gmail.com',
        phone: '07700 900999',
        preferredContact: 'email',
        topic: 'Bridging Finance',
        message: 'Hello, this is a test message from www.principalinvestmentproposals.co.uk to verify email delivery to piproposals@gmail.com.'
      });
      setMsgSubmitted(false);
    } else {
      setActiveTab('deal');
      setDealForm({
        clientName: 'Test Developer (Broker Trial)',
        companyName: 'Oakwood Developments SPV',
        email: 'piproposals@gmail.com',
        phone: '07700 900888',
        financeType: 'bridging',
        loanAmount: 1250000,
        securityValue: 1800000,
        timeframe: 'Urgent (under 14 days)',
        summary: 'Test proposal for auction bridging finance to verify email routing to piproposals@gmail.com.',
        exitStrategy: 'Refinance onto 5-year commercial mortgage.'
      });
      setDealSubmitted(false);
    }
  };



  const copyDealSummary = () => {
    const text = `Commercial Deal Intake - Principal Investment Proposals\nClient: ${dealForm.clientName} (${dealForm.companyName || 'N/A'})\nContact: ${dealForm.phone} | ${dealForm.email}\nFacility: ${dealForm.financeType.toUpperCase()}\nLoan Amount: £${dealForm.loanAmount.toLocaleString('en-GB')}\nSecurity Value: £${dealForm.securityValue.toLocaleString('en-GB')}\nTimeframe: ${dealForm.timeframe}\nSummary: ${dealForm.summary}\nExit: ${dealForm.exitStrategy}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-growth-700 mb-2">
            Open & Approachable
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Speak Directly with an Experienced Commercial Finance Broker.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            No gatekeepers, call center hold music, or automated rejection emails. Send a message, submit a deal brief, or contact us directly. We move fast and treat every transaction with the utmost integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Communication & Trust Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                Principal Investment Proposals
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Independent Commercial Lending Advisory · United Kingdom
              </p>

              <div className="space-y-4 text-sm">
                <a
                  href="mailto:piproposals@gmail.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 hover:text-slate-900 group"
                >
                  <div className="p-2.5 rounded-lg bg-growth-50 group-hover:bg-growth-100 text-growth-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Direct Email</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">piproposals@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Fast Turnaround Promise</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      DIP & Response within 2–4 Hours
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Broker Guarantee</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      Zero Upfront Assessment Fees
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours & Domain Reference */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex justify-between">
                  <span>Operating Hours:</span>
                  <span className="font-medium text-slate-800">Mon – Fri: 08:00 – 18:30 (Sat 09:00 – 13:00)</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Domain:</span>
                  <span className="font-mono text-slate-800">www.principalinvestmentproposals.co.uk</span>
                </div>
                <div className="flex justify-between">
                  <span>DNS & Hosting:</span>
                  <span className="text-slate-800">IONOS Cloud</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="p-5 rounded-2xl bg-growth-50 border border-growth-200/80 text-growth-950 text-xs leading-relaxed space-y-3">
              <div>
                <span className="font-bold block mb-1">Friendly & Reliable Service:</span>
                Whether you are an experienced developer running a £5M residential build or an SME exploring invoice discounting for the first time, we break down numbers in plain English and give you honest, actionable advice immediately.
              </div>
              {onOpenInbox && (
                <div className="pt-2 border-t border-growth-200/60">
                  <button
                    type="button"
                    onClick={onOpenInbox}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-growth-300 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5 text-growth-700" />
                    <span>View Broker Inbox (Check Received Messages)</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Tabbed Forms (Direct Message vs Deal Submission) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {/* Quick Test Trigger Banner */}
            <div className="mb-6 p-3 rounded-xl bg-growth-50/90 border border-growth-200/90 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-growth-950 font-medium">
                <Sparkles className="w-4 h-4 text-growth-700 shrink-0" />
                <span>Want to test sending an enquiry directly to <strong className="font-mono text-growth-900">piproposals@gmail.com</strong>?</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFillTestEnquiry('message')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-growth-300 rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  Prefill Test Message
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTestEnquiry('deal')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-growth-300 rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  Prefill Test Deal (£1.25M)
                </button>
              </div>
            </div>

            {/* Form Mode Segmented Switch */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('message');
                  setMsgSubmitted(false);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Send a Direct Message
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('deal');
                  setDealSubmitted(false);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'deal'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Submit a Deal for Assessment
              </button>
            </div>

            {/* Mode 1: Direct Message Form */}
            {activeTab === 'message' && (
              <div>
                {msgSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Message Logged & Prepared!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-900">{msgForm.name}</span>. Your enquiry has been registered in the broker inbox.
                    </p>

                    {/* Email gateway status badge */}
                    <div className="max-w-md mx-auto p-3 rounded-lg text-xs border flex items-center justify-center gap-2 bg-slate-50 border-slate-200 text-slate-700">
                      {msgEmailDispatchState === 'sending' && (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                          <span>Dispatching copy to piproposals@gmail.com...</span>
                        </>
                      )}
                      {msgEmailDispatchState === 'sent' && (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Delivered to piproposals@gmail.com via email gateway!</span>
                        </>
                      )}
                      {(msgEmailDispatchState === 'fallback' || msgEmailDispatchState === 'idle') && (
                        <>
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>Ready to dispatch via your preferred email app:</span>
                        </>
                      )}
                    </div>

                    {/* Multi-channel dispatch buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                      {lastDispatchedUrls?.gmailUrl && (
                        <a
                          href={lastDispatchedUrls.gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Gmail (Send to piproposals)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {lastDispatchedUrls?.mailtoUrl && (
                        <a
                          href={lastDispatchedUrls.mailtoUrl}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Outlook / Apple Mail</span>
                        </a>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setMsgSubmitted(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Send another test message
                      </button>
                    </div>
                  </div>
                ) : (

                  <form onSubmit={handleMessageSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={msgForm.name}
                          onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                          placeholder="e.g. David Richardson"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={msgForm.email}
                          onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                          placeholder="david@richardsonholdings.co.uk"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={msgForm.phone}
                          onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })}
                          placeholder="07700 900123"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Preferred Contact Channel
                        </label>
                        <select
                          value={msgForm.preferredContact}
                          onChange={(e) => setMsgForm({ ...msgForm, preferredContact: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="phone">Direct Phone Call</option>
                          <option value="whatsapp">WhatsApp Message</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Area of Interest
                      </label>
                      <select
                        value={msgForm.topic}
                        onChange={(e) => setMsgForm({ ...msgForm, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Bridging Finance">Bridging Finance (Auction / Refurb / Acquisition)</option>
                        <option value="Development Finance">Property Development Finance (Ground-Up / PDR)</option>
                        <option value="Working Capital">Working Capital & Business Growth</option>
                        <option value="Invoice Finance">Invoice Finance & Factoring</option>
                        <option value="Asset Finance">Asset Refinance & Plant Hire Purchase</option>
                        <option value="Private Lending">Looking to Deploy Capital as a Private Lender</option>
                        <option value="Other">General Discussion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Message or Project Summary *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={msgForm.message}
                        onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                        placeholder="Tell us about the property, asset, loan amount required, and your desired completion timeframe..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message to Broker</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Mode 2: Detailed Deal Intake Submission */}
            {activeTab === 'deal' && (
              <div>
                {dealSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Deal Proposal Logged & Prepared!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                      Your proposal for <span className="font-semibold text-slate-900">£{dealForm.loanAmount.toLocaleString('en-GB')}</span> ({dealForm.financeType.toUpperCase()}) has been queued and stored in your broker records.
                    </p>

                    {/* Email gateway status badge */}
                    <div className="max-w-md mx-auto p-3 rounded-lg text-xs border flex items-center justify-center gap-2 bg-slate-50 border-slate-200 text-slate-700">
                      {dealEmailDispatchState === 'sending' && (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                          <span>Dispatching copy to piproposals@gmail.com...</span>
                        </>
                      )}
                      {dealEmailDispatchState === 'sent' && (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Delivered to piproposals@gmail.com via email gateway!</span>
                        </>
                      )}
                      {(dealEmailDispatchState === 'fallback' || dealEmailDispatchState === 'idle') && (
                        <>
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>Ready to dispatch via your preferred email app:</span>
                        </>
                      )}
                    </div>

                    {/* Multi-channel dispatch buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                      {lastDispatchedUrls?.gmailUrl && (
                        <a
                          href={lastDispatchedUrls.gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Gmail (Send to piproposals)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {lastDispatchedUrls?.mailtoUrl && (
                        <a
                          href={lastDispatchedUrls.mailtoUrl}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Outlook / Apple Mail</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={copyDealSummary}
                        className="px-4 py-2.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSummary ? 'Copied' : 'Copy Deal Brief'}</span>
                      </button>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setDealSubmitted(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Submit another deal proposal
                      </button>
                    </div>
                  </div>
                ) : (

                  <form onSubmit={handleDealSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={dealForm.clientName}
                          onChange={(e) => setDealForm({ ...dealForm, clientName: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Company / SPV Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={dealForm.companyName}
                          onChange={(e) => setDealForm({ ...dealForm, companyName: e.target.value })}
                          placeholder="e.g. Apex Developments Ltd"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={dealForm.email}
                          onChange={(e) => setDealForm({ ...dealForm, email: e.target.value })}
                          placeholder="contact@business.co.uk"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={dealForm.phone}
                          onChange={(e) => setDealForm({ ...dealForm, phone: e.target.value })}
                          placeholder="07700 900456"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Facility Type
                        </label>
                        <select
                          value={dealForm.financeType}
                          onChange={(e) => setDealForm({ ...dealForm, financeType: e.target.value as FinanceType })}
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="bridging">Bridging Finance</option>
                          <option value="development">Development Finance</option>
                          <option value="working-capital">Working Capital</option>
                          <option value="invoice">Invoice Finance</option>
                          <option value="asset">Asset Finance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Loan Required (£) *
                        </label>
                        <input
                          type="number"
                          required
                          value={dealForm.loanAmount}
                          onChange={(e) => setDealForm({ ...dealForm, loanAmount: Number(e.target.value) })}
                          placeholder="1000000"
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Asset / Security Value (£)
                        </label>
                        <input
                          type="number"
                          value={dealForm.securityValue}
                          onChange={(e) => setDealForm({ ...dealForm, securityValue: Number(e.target.value) })}
                          placeholder="1500000"
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Completion Urgency
                        </label>
                        <select
                          value={dealForm.timeframe}
                          onChange={(e) => setDealForm({ ...dealForm, timeframe: e.target.value as any })}
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="Urgent (under 14 days)">Urgent (under 14 days / Auction deadline)</option>
                          <option value="1 to 4 weeks">1 to 4 weeks</option>
                          <option value="1 to 3 months">1 to 3 months</option>
                          <option value="Exploring options">Exploring terms for future deal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Proposed Exit Strategy
                        </label>
                        <input
                          type="text"
                          value={dealForm.exitStrategy}
                          onChange={(e) => setDealForm({ ...dealForm, exitStrategy: e.target.value })}
                          placeholder="e.g. Sale of completed units / Term refinance"
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Brief Deal Summary & Property/Asset Location
                      </label>
                      <textarea
                        rows={3}
                        value={dealForm.summary}
                        onChange={(e) => setDealForm({ ...dealForm, summary: e.target.value })}
                        placeholder="Key points: property address/type, purchase price, planning status, works budget, or debtor ledger info..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Submit Deal for Free Broker Appraisal</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
