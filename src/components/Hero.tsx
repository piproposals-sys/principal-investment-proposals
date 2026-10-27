import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Clock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenDealModal: () => void;
  onOpenLenderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDealModal, onOpenLenderModal }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background with cinematic visual asset & measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_commercial_finance_1793115305728.jpg"
          alt="London commercial financial skyline at twilight"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Resilient fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed metadata trust markers - zero pill discipline */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-300 tracking-wide mb-6">
            <span>Specialist UK Commercial Finance Broker</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Bridging & Property Development</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Working Capital, Invoice & Asset Debt</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 font-display" style={{ textWrap: 'balance' }}>
            Securing Competitive Commercial Lending with Speed, Openness and Reliability.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-10">
            Professional clients find it hard to find a dedicated broker with the exact skillset to structure complex commercial borrowing. We cut through institutional delays with direct access to specialist principal lenders and private capital syndicates.
          </p>

          {/* Action Points */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={onOpenDealModal}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Submit a Deal for Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Explore Finance Solutions
            </a>
            <button
              onClick={onOpenLenderModal}
              className="inline-flex items-center justify-center px-4 py-3.5 text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Looking to lend capital? →
            </button>
          </div>

          {/* Core Values / Human Promise */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 pt-8 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Friendly & accessible broker</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Decisions within 2–4 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No upfront assessment fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-column KPI strip below hero split */}
      <div className="relative z-10 border-t border-slate-800 bg-slate-950/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">2 – 4 hrs</div>
            <div className="text-xs text-slate-400 mt-0.5">Average DIP turnaround</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">£100k – £25M+</div>
            <div className="text-xs text-slate-400 mt-0.5">Facilities arranged</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">Up to 80%</div>
            <div className="text-xs text-slate-400 mt-0.5">Max bridging LTV / 90% LTC</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">100% Nationwide</div>
            <div className="text-xs text-slate-400 mt-0.5">England, Scotland & Wales</div>
          </div>
        </div>
      </div>
    </section>
  );
};
