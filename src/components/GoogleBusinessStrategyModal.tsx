import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Lightbulb, 
  Target, 
  TrendingUp,
  X 
} from 'lucide-react';

interface GoogleBusinessStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleBusinessStrategyModal: React.FC<GoogleBusinessStrategyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedReviewScript, setCopiedReviewScript] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'reviews' | 'acquisition' | 'ionos'>('profile');

  if (!isOpen) return null;

  const reviewScript = `Hi [Client Name], really glad we got the [Loan Amount] [Facility Type, e.g. bridging loan] completed on time for your project in [Location]. As an independent broker, Google reviews mean the world to our business and help other developers and investors find us. If you have 60 seconds, could you leave a quick honest review on our Google Business Profile here: https://g.page/r/principalinvestmentproposals/review — Thank you so much!`;

  const copyScript = () => {
    navigator.clipboard.writeText(reviewScript);
    setCopiedReviewScript(true);
    setTimeout(() => setCopiedReviewScript(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400 text-slate-950 font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-amber-300">
                Turnkey Growth Blueprint
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Google My Business & Inbound Deal Acquisition Strategy
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50 overflow-x-auto">
          {[
            { id: 'profile', label: '1. GMB Setup & Categories' },
            { id: 'reviews', label: '2. Review Generation Script' },
            { id: 'acquisition', label: '3. Inbound Traffic Engine' },
            { id: 'ionos', label: '4. IONOS Domain & SEO Setup' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <span className="font-bold">Crucial GMB Insight:</span> Google uses your primary category to decide whether to trigger your profile for searches like "bridging finance broker near me" or "development finance specialist".
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Recommended Primary & Secondary Categories
                  </h3>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li><strong className="text-slate-900">Primary:</strong> "Finance Broker"</li>
                    <li><strong className="text-slate-900">Secondary 1:</strong> "Commercial Real Estate Inspector / Consultant"</li>
                    <li><strong className="text-slate-900">Secondary 2:</strong> "Mortgage Broker"</li>
                    <li><strong className="text-slate-900">Secondary 3:</strong> "Financial Consultant"</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Service Area Configuration
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Set up as a <strong className="text-slate-900">Service Area Business (SAB)</strong> so your home/office address can remain private while showing you serve clients across:
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-700">
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded">Greater London</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded">West Midlands</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded">Greater Manchester</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded">South East England</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded">Nationwide UK</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Weekly GMB Posting Schedule (Algorithmic Boost)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google rewards active profiles. Post 1 update per week using the headline formula:
                </p>
                <div className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-800">
                  "Completed: [Amount] [Facility] for [Property Type] in [City]. Terms issued in 24h. Link to deal calculator."
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Automated WhatsApp & Email Review Script</h3>
                <p className="text-xs text-slate-600">
                  Copy and send this message immediately after loan completion when client gratitude is at its peak:
                </p>
              </div>

              <div className="relative p-5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm leading-relaxed font-sans">
                {reviewScript}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={copyScript}
                    className="px-4 py-2 text-xs font-bold uppercase text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedReviewScript ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedReviewScript ? 'Copied to Clipboard' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Keywords in Reviews:</span>
                  Ask clients to naturally mention the facility name (e.g. "urgent bridging loan" or "development finance") and location in their review. Google's algorithm parses these review terms to rank local searches.
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Owner Response Etiquette:</span>
                  Always reply to every Google review within 24 hours thanking them by name and reinforcing the speed of delivery.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'acquisition' && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-900 text-base">Inbound Lead Generation Playbook</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-md w-fit">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase">1. High-Intent Google Ads</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Target exact-match keywords: <span className="font-mono text-slate-800">[auction bridging finance 28 days]</span>, <span className="font-mono text-slate-800">[commercial development finance broker]</span>. Avoid broad terms like "loans".
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-md w-fit">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase">2. Property Auction Houses</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Introduce yourself to auctioneers at Allsop, Acuitus, Barnard Marcus, and SDL Auctions. Hand buyers a 1-page "Decision in Principle in 2 Hours" leaflet on catalog drop days.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase">3. Private Lender Syndication</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Use our dedicated "Private Lenders" portal to onboard wealth managers, accountants, and family offices seeking 10%+ yield, turning investors into recurring capital providers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ionos' && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-900 text-base">Linking www.principalinvestmentproposals.co.uk on IONOS</h3>
              
              <div className="space-y-4 text-xs text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">Step 1: Custom Email Setup in IONOS</span>
                  <p>
                    Ensure your domain email (e.g. <span className="font-mono text-slate-800">enquiries@principalinvestmentproposals.co.uk</span>) is created in your IONOS Control Center and forwards or syncs with your <span className="font-mono text-slate-800">piproposals@gmail.com</span> inbox.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">Step 2: Google Search Console Verification</span>
                  <p>
                    Add a TXT DNS record in your IONOS DNS zone to verify ownership on Google Search Console. Submit the sitemap to index all five finance pages immediately.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">Step 3: GMB Website Field</span>
                  <p>
                    In your Google Business Profile, set the primary website URL to: <span className="font-mono text-slate-800">https://www.principalinvestmentproposals.co.uk</span> with the appointment link set to <span className="font-mono text-slate-800">https://www.principalinvestmentproposals.co.uk/#contact</span>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-xs text-slate-500">
            Strategy prepared for Principal Investment Proposals
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold uppercase text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
