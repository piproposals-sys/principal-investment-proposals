import React, { useState, useId } from 'react';
import { FinanceType } from '../types';
import { Calculator, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface DealCalculatorProps {
  initialType?: FinanceType;
  onApplyWithCalculation: (details: {
    type: FinanceType;
    loanAmount: number;
    securityValue: number;
    termMonths: number;
    estimatedLTV: number;
  }) => void;
}

export const DealCalculator: React.FC<DealCalculatorProps> = ({
  initialType = 'bridging',
  onApplyWithCalculation
}) => {
  const [financeType, setFinanceType] = useState<FinanceType>(initialType);
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [securityValue, setSecurityValue] = useState<number>(1450000);
  const [termMonths, setTermMonths] = useState<number>(12);
  const [interestModel, setInterestModel] = useState<'rolled' | 'serviced'>('rolled');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const loanAmountInputId = useId();
  const securityValueInputId = useId();
  const termMonthsSelectId = useId();

  // Facility-specific rates & mechanics
  const getRateConfig = () => {
    switch (financeType) {
      case 'bridging':
        return { monthlyRatePct: 0.65, arrangementFeePct: 1.5, maxLtv: 80 };
      case 'development':
        return { monthlyRatePct: 0.75, arrangementFeePct: 2.0, maxLtv: 70 };
      case 'working-capital':
        return { monthlyRatePct: 0.90, arrangementFeePct: 1.0, maxLtv: 100 };
      case 'invoice':
        return { monthlyRatePct: 0.35, arrangementFeePct: 0.5, maxLtv: 90 };
      case 'asset':
        return { monthlyRatePct: 0.50, arrangementFeePct: 1.0, maxLtv: 80 };
    }
  };

  const config = getRateConfig();
  const ltv = securityValue > 0 ? Math.min(100, Math.round((loanAmount / securityValue) * 100)) : 0;
  const isLtvWithinLimit = ltv <= config.maxLtv;

  // Financial calculations
  const monthlyInterest = Math.round(loanAmount * (config.monthlyRatePct / 100));
  const totalInterestOverTerm = monthlyInterest * termMonths;
  const arrangementFee = Math.round(loanAmount * (config.arrangementFeePct / 100));
  
  // Net cash released if rolled up vs serviced
  const netRelease = interestModel === 'rolled' 
    ? Math.max(0, loanAmount - totalInterestOverTerm - arrangementFee)
    : Math.max(0, loanAmount - arrangementFee);

  const handleApply = () => {
    onApplyWithCalculation({
      type: financeType,
      loanAmount,
      securityValue,
      termMonths,
      estimatedLTV: ltv
    });
  };

  return (
    <section id="calculator" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Instant Commercial Sizing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Interactive Commercial Facility Calculator.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Estimate indicative borrowing capacity, monthly costs, and net proceeds for your next commercial property acquisition or business requirement.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Facility Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                1. Select Commercial Facility
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'bridging', label: 'Bridging Loan' },
                  { id: 'development', label: 'Development' },
                  { id: 'working-capital', label: 'Working Capital' },
                  { id: 'invoice', label: 'Invoice Finance' },
                  { id: 'asset', label: 'Asset Refinance' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFinanceType(item.id as FinanceType)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer ${
                      financeType === item.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Amount Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={loanAmountInputId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Required Loan Amount (£)
                </label>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  £{loanAmount.toLocaleString('en-GB')}
                </span>
              </div>
              <input
                id={loanAmountInputId}
                type="range"
                min={100000}
                max={10000000}
                step={25000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                <span>£100k</span>
                <span>£2.5M</span>
                <span>£5M</span>
                <span>£10M+</span>
              </div>
            </div>

            {/* Security / Asset Value */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={securityValueInputId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. {financeType === 'invoice' ? 'Debtor Ledger Value (£)' : 'Estimated Security / Asset Value (£)'}
                </label>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  £{securityValue.toLocaleString('en-GB')}
                </span>
              </div>
              <input
                id={securityValueInputId}
                type="range"
                min={150000}
                max={15000000}
                step={50000}
                value={securityValue}
                onChange={(e) => setSecurityValue(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                <span>£150k</span>
                <span>£5M</span>
                <span>£10M</span>
                <span>£15M+</span>
              </div>
            </div>

            {/* Term and Interest Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={termMonthsSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  4. Facility Term
                </label>
                <select
                  id={termMonthsSelectId}
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months (Standard)</option>
                  <option value={18}>18 Months</option>
                  <option value={24}>24 Months</option>
                  <option value={36}>36 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  5. Interest Servicing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterestModel('rolled')}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg text-center cursor-pointer ${
                      interestModel === 'rolled'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Rolled-Up / Retained
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestModel('serviced')}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg text-center cursor-pointer ${
                      interestModel === 'serviced'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Serviced Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Results Card */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Indicative Facility Breakdown
                </span>
                <span className={`text-xs font-semibold ${isLtvWithinLimit ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isLtvWithinLimit ? 'LTV Within Guidelines' : 'Exceeds Standard LTV'}
                </span>
              </div>

              <div className="space-y-4 py-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Calculated LTV:</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums text-lg">
                    {ltv}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Indicative Rate:</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    {config.monthlyRatePct}% pcm
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Estimated Monthly Interest:</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    £{monthlyInterest.toLocaleString('en-GB')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Interest Carry ({termMonths}m):</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    £{totalInterestOverTerm.toLocaleString('en-GB')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Est. Arrangement Fee:</span>
                  <span className="text-slate-700 font-mono tabular-nums">
                    £{arrangementFee.toLocaleString('en-GB')} ({config.arrangementFeePct}%)
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-500">
                      Est. Net Day-1 Advance
                    </div>
                    <div className="text-xs text-slate-400">
                      {interestModel === 'rolled' ? 'After rolled interest & fee' : 'Before monthly payments'}
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
                    £{netRelease.toLocaleString('en-GB')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply with These Sized Figures</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>Figures are indicative. No hard credit checks are performed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
