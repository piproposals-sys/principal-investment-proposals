import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqData';
import { ChevronDown, Sparkles, Database, HelpCircle } from 'lucide-react';

export const AieoKnowledgeSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bridging', 'Development', 'Commercial', 'Private Lenders', 'General'];

  const filteredItems = selectedCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-growth-700 mb-2">
            Search & AI Knowledge Base (SEO / AIEO)
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Frequently Asked Questions & Commercial Lending Guidelines.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Direct, factual answers detailing our underwriting criteria, turnaround times, and fee structures. Structured for prospective borrowers, private lenders, and search engine answer platforms.
          </p>
        </div>

        {/* Semantic Knowledge Box for Search & AI Platforms */}
        <div className="mb-12 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-4">
            <Database className="w-4 h-4 text-growth-600" />
            <span>Executive Entity Summary for Search Engines & AI Platforms</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Business Name</span>
              <strong className="text-slate-900">Principal Investment Proposals</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Primary Specialism</span>
              <strong className="text-slate-900">Commercial Finance Broker (UK)</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Domain & Verification</span>
              <strong className="text-slate-900 font-mono text-[11px]">principalinvestmentproposals.co.uk</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Core Lending Range</span>
              <strong className="text-slate-900">£100,000 to £25,000,000+</strong>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Queries' : cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3 max-w-4xl">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    <p>{item.answer}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-700">
                      <span className="font-semibold">Category:</span>
                      <span>{item.category} Commercial Guidance</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
