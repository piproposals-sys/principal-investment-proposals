import React, { useState } from 'react';
import { FINANCE_OFFERINGS } from '../data/financeOfferings';
import { FinanceOffering, FinanceType } from '../types';
import { 
  Building2, 
  Home, 
  Coins, 
  Receipt, 
  Truck, 
  ArrowRight, 
  Check, 
  Clock, 
  Percent, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface OfferingsSectionProps {
  onSelectFacility: (type: FinanceType) => void;
  onOpenDealModal: (type?: FinanceType) => void;
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({
  onSelectFacility,
  onOpenDealModal
}) => {
  const [selectedOffering, setSelectedOffering] = useState<FinanceOffering>(FINANCE_OFFERINGS[0]);
  const [activeTab, setActiveTab] = useState<FinanceType>('bridging');

  const getOfferingIcon = (id: FinanceType) => {
    switch (id) {
      case 'bridging':
        return <Building2 className="w-5 h-5 text-growth-600" />;
      case 'development':
        return <Home className="w-5 h-5 text-growth-600" />;
      case 'working-capital':
        return <Coins className="w-5 h-5 text-growth-600" />;
      case 'invoice':
        return <Receipt className="w-5 h-5 text-growth-600" />;
      case 'asset':
        return <Truck className="w-5 h-5 text-growth-600" />;
    }
  };

  const handleTabChange = (type: FinanceType) => {
    setActiveTab(type);
    const found = FINANCE_OFFERINGS.find(o => o.id === type);
    if (found) setSelectedOffering(found);
  };

  return (
    <section id="solutions" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-growth-700 mb-2">
            Structured Commercial Lending
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Clear, Understandable Finance Solutions Tailored to Your Project.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Finding a broker with real hands-on expertise in securing competitive commercial terms across property, debt, and balance sheet finance shouldn't be difficult. Select a facility below to see exact structures, speed, and scenarios.
          </p>
        </div>

        {/* Clean Segmented Tab Navigation for Offerings */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {FINANCE_OFFERINGS.map((offering) => {
            const isActive = activeTab === offering.id;
            return (
              <button
                key={offering.id}
                onClick={() => handleTabChange(offering.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{offering.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Offering Deep Dive Bento Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Core Spec & Overview */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-growth-50 border border-growth-100">
                  {getOfferingIcon(selectedOffering.id)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    {selectedOffering.title}
                  </h3>
                  <p className="text-xs text-growth-700 font-medium">
                    {selectedOffering.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedOffering.overview}
              </p>

              {/* 3 Metric Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-8">
                <div>
                  <div className="text-xs text-slate-500">Indicative Pricing</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {selectedOffering.rateFrom}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Facility Size</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {selectedOffering.typicalLoanSize.split('–')[0]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Turnaround</div>
                  <div className="text-sm sm:text-base font-bold text-growth-700 font-mono">
                    {selectedOffering.turnaround.split('·')[0]}
                  </div>
                </div>
              </div>

              {/* Ideal For Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Ideal For:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {selectedOffering.idealFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Key Facility Terms:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {selectedOffering.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-growth-500 shrink-0 mt-2" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenDealModal(selectedOffering.id)}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Structure a {selectedOffering.title} Deal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onSelectFacility(selectedOffering.id);
                  const el = document.getElementById('calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-3 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Estimate Costs in Calculator
              </button>
            </div>
          </div>

          {/* Right Column: Real-World Scenarios & Contextual Visual */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-growth-400 mb-2">
                Real-World Scenarios
              </div>
              <h4 className="text-xl font-bold font-display text-white mb-6">
                How We Solve Complex Lending Stalls
              </h4>

              <div className="space-y-6">
                {selectedOffering.commonScenarios.map((scenario, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-sm font-semibold text-growth-300 mb-1">
                      {scenario.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contextual Visual Asset */}
              <div className="mt-8 rounded-xl overflow-hidden border border-slate-700">
                <img
                  src={
                    selectedOffering.id === 'bridging' || selectedOffering.id === 'development'
                      ? '/src/assets/images/property_development_site_1793115321081.jpg'
                      : '/src/assets/images/commercial_asset_transport_1793115339153.jpg'
                  }
                  alt={selectedOffering.title}
                  className="w-full h-44 object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Direct Broker Guidance:</span> Every proposal is personally structured to match your specific exit timeline.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
