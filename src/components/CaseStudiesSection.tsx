import React, { useState } from 'react';
import { CASE_STUDIES, CLIENT_TESTIMONIALS } from '../data/caseStudies';
import { Star, CheckCircle, MapPin, Clock, Building, ArrowUpRight, ExternalLink } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenReviewModal: () => void;
  onOpenDealModal: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenReviewModal,
  onOpenDealModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCaseStudies = activeFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.facility.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="case-studies" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
              Real Deals. Fast Completions. Zero Broken Promises.
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Examine verified UK transactions where traditional banks delayed or declined, and Principal Investment Proposals secured structured terms on schedule.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg self-start md:self-auto overflow-x-auto">
            {['all', 'Bridging', 'Development', 'Asset', 'Invoice'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Transactions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Meta header without pills */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium text-growth-700">
                    <Building className="w-3.5 h-3.5" />
                    <span>{study.facility}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{study.completionTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-display mb-3 leading-snug">
                  {study.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{study.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-slate-800">{study.loanAmount}</span>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 mb-6">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">The Hurdle:</span>
                    <p className="leading-relaxed text-slate-600">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Our Solution:</span>
                    <p className="leading-relaxed text-slate-600">{study.solution}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-emerald-950">
                    <span className="font-bold block mb-0.5">Commercial Outcome:</span>
                    <span className="text-xs leading-relaxed">{study.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Attributable Client Quote */}
              <div className="pt-6 border-t border-slate-100 bg-slate-50/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-2xl">
                <p className="text-xs italic text-slate-700 leading-relaxed mb-3">
                  "{study.clientFeedback.quote}"
                </p>
                <div className="text-xs">
                  <span className="font-bold text-slate-900">{study.clientFeedback.clientName}</span>
                  <span className="text-slate-500"> — {study.clientFeedback.clientRole}, {study.clientFeedback.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Testimonials & Google Business Review Block */}
        <div id="testimonials" className="pt-10">
          <div className="bg-slate-900 rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">5.0 Star Broker Service</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Client Trust & Google Business Profile Reviews
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                  We measure our success by the deals we rescue and the long-term relationships we build. Verified reviews from property developers, business owners, and private capital providers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={onOpenReviewModal}
                  className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-growth-500 hover:bg-growth-400 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>Leave a Google Review</span>
                </button>
                <a
                  href="https://www.google.co.uk/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CLIENT_TESTIMONIALS.map((t) => (
                <div key={t.id} className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed italic mb-4">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-700/60 text-xs">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-slate-400 text-[11px] truncate">{t.role}</div>
                    <div className="text-amber-300/80 text-[11px] font-medium mt-1">{t.facility}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
