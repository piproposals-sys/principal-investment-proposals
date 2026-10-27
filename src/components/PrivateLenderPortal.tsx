import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, FileText, CheckCircle2, Lock, ArrowRight, Eye } from 'lucide-react';

interface PrivateLenderPortalProps {
  onOpenLenderModal: () => void;
}

export const PrivateLenderPortal: React.FC<PrivateLenderPortalProps> = ({ onOpenLenderModal }) => {
  const [showSamplePack, setShowSamplePack] = useState(false);

  return (
    <section id="private-lenders" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background imagery with measured contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/private_capital_boardroom_1793115321010.jpg"
          alt="London private wealth and commercial debt boardroom"
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-growth-400 mb-2 font-mono">
            Capital Partners & Private Debt Syndication
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Deploy Capital into High-Yield, Asset-Secured Private Lending Opportunities.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Are you a high-net-worth individual, family office, or boutique debt fund looking for vetted commercial borrowers? We package institutional-grade proposals and introduce credit-worthy deals ready for rapid capital deployment.
          </p>
        </div>

        {/* 3 Pillars for Private Lenders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="p-3 w-fit rounded-lg bg-growth-500/10 text-growth-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1st & 2nd Charge Legal Security</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every loan is secured by registered legal charges over prime UK residential, commercial, or industrial real estate with conservative LTV covenants (typically 65%–75%).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="p-3 w-fit rounded-lg bg-growth-500/10 text-growth-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Target Yields: 9% – 15% p.a.</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earn attractive risk-adjusted monthly or rolled-up returns. Lenders retain complete autonomy: you choose the exact asset classes, risk profiles, and terms you wish to fund.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="p-3 w-fit rounded-lg bg-growth-500/10 text-growth-400 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Institutional-Grade Deal Packs</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No rough napkins or incomplete summaries. You receive full RICS valuation reviews, borrower track record audits, QS cost confirmations, and dual exit stress-testing.
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">Join Our Private Lender Network</h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Specify your lending criteria, ticket sizes (£100k to £10M+), and security preferences. We only send relevant, pre-qualified transactions directly to your desk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => setShowSamplePack(true)}
              className="px-5 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Sample Deal Memo</span>
            </button>
            <button
              onClick={onOpenLenderModal}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-growth-500 hover:bg-growth-400 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Submit Lending Criteria</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sample Deal Memo Modal */}
        {showSamplePack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="text-xs font-mono text-growth-400 uppercase">Sanitized Specimen Memo</div>
                  <h3 className="text-lg font-bold text-white">Executive Lending Proposal Summary</h3>
                </div>
                <button
                  onClick={() => setShowSamplePack(false)}
                  className="text-slate-400 hover:text-white text-sm px-2 py-1 cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-xs block">Facility Type</span>
                    <span className="font-bold text-white">1st Charge Commercial Bridging</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Required Capital</span>
                    <span className="font-bold text-white font-mono">£1,450,000</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Security Asset</span>
                    <span className="font-bold text-white">Freehold Mixed-Use Building, Bristol</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Independent RICS OMV</span>
                    <span className="font-bold text-white font-mono">£2,150,000 (67.4% LTV)</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-growth-300 mb-1">Borrower Profile & Track Record</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    UK-registered property investment SPV. Principal director has 12 years commercial property track record with £18M completed transactions. Clear credit profile and verified net worth exceeding 3x the loan amount.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-growth-300 mb-1">Proposed Return & Terms</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Coupon: 0.85% per month (10.2% p.a. gross yield). 12 months term with 9 months minimum interest guaranteed. 3 months interest retained upfront.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-growth-300 mb-1">Exit Strategy Verification</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Primary exit: Re-letting ground floor retail to national tenant followed by 5-year commercial term refinance (pre-qualification letter from challenger bank already secured). Secondary exit: Unconditional private treaty sale.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowSamplePack(false);
                    onOpenLenderModal();
                  }}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-slate-950 bg-growth-500 hover:bg-growth-400 rounded-lg cursor-pointer shadow-sm"
                >
                  Join Lending Panel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
