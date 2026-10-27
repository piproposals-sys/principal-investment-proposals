import React from 'react';
import { Mail, ShieldCheck, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDealModal: () => void;
  onOpenLenderModal: () => void;
  onOpenStrategyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDealModal,
  onOpenLenderModal,
  onOpenStrategyModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block bg-white p-2.5 rounded-xl border border-slate-700 shadow-sm hover:border-growth-500 transition-colors">
              <img
                src="/assets/aistudio/logo_97a322f9.jpg"
                alt="Principal Investment Proposals - ...Because Investments Grow..."
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Independent UK commercial finance brokerage specialising in bridging loans, property development finance, working capital solutions, invoice discounting, and asset refinance.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>Primary Domain: <span className="font-mono text-slate-300">www.principalinvestmentproposals.co.uk</span></div>
              <div>Direct Inbox: <a href="mailto:piproposals@gmail.com" className="text-growth-400 hover:underline">piproposals@gmail.com</a></div>
              <div>DNS & Infrastructure: IONOS Cloud</div>
            </div>
          </div>

          {/* Solutions Col */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Commercial Lending</div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#solutions" className="hover:text-white transition-colors">Bridging Finance</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Development Finance</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Working Capital</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Invoice Discounting</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Asset Refinancing</a></li>
            </ul>
          </div>

          {/* Capital Providers & Broker Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Partners & Portals</div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={onOpenLenderModal} className="text-left hover:text-white transition-colors cursor-pointer">
                  Private Lending Panel
                </button>
              </li>
              <li>
                <button onClick={onOpenDealModal} className="text-left hover:text-white transition-colors cursor-pointer">
                  Submit a Deal Brief
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Facility Sizing Calculator
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Verified Case Studies
                </a>
              </li>
              <li>
                <button onClick={onOpenStrategyModal} className="text-left text-growth-400 hover:text-growth-300 transition-colors cursor-pointer">
                  GMB & Growth Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Client Commitment */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Broker Promise</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              We operate on trust, speed, friendliness, and openness. We do not charge upfront assessment fees. Terms in principle issued within 2–4 hours.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenDealModal}
                className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-growth-500 hover:bg-growth-400 rounded-lg transition-colors cursor-pointer text-center block shadow-sm"
              >
                Request Free Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory & Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-400">Regulatory Disclosure:</strong> Principal Investment Proposals operates as an independent commercial credit broker and introduces commercial borrowers to authorised principal lenders and private capital syndicates. Principal Investment Proposals is not a lender. Most commercial property finance, bridging loans secured on non-owner-occupied properties, and business borrowing facilities are not regulated by the Financial Conduct Authority (FCA).
          </p>
          <p>
            Secured commercial loans carry financial risk. Your property or assets may be repossessed if you do not keep up repayments on a mortgage, loan, or debt secured on it.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
            <div>
              © {new Date().getFullYear()} Principal Investment Proposals (www.principalinvestmentproposals.co.uk). All rights reserved.
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
