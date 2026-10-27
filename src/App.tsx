/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OfferingsSection } from './components/OfferingsSection';
import { DealCalculator } from './components/DealCalculator';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { PrivateLenderPortal } from './components/PrivateLenderPortal';
import { ContactSection } from './components/ContactSection';
import { AieoKnowledgeSection } from './components/AieoKnowledgeSection';
import { Footer } from './components/Footer';
import { DealModal } from './components/DealModal';
import { PrivateLenderModal } from './components/PrivateLenderModal';
import { GoogleReviewModal } from './components/GoogleReviewModal';
import { GoogleBusinessStrategyModal } from './components/GoogleBusinessStrategyModal';
import { BrokerInboxModal } from './components/BrokerInboxModal';
import { FinanceType } from './types';

export default function App() {
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [lenderModalOpen, setLenderModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [inboxModalOpen, setInboxModalOpen] = useState(false);
  
  const [selectedFacility, setSelectedFacility] = useState<FinanceType>('bridging');

  const [calculatorPrefill, setCalculatorPrefill] = useState<{
    loanAmount?: number;
    securityValue?: number;
    termMonths?: number;
    type?: FinanceType;
  } | undefined>(undefined);

  const handleOpenDealModal = (type?: FinanceType) => {
    if (type) setSelectedFacility(type);
    setDealModalOpen(true);
  };

  const handleApplyWithCalculation = (details: {
    type: FinanceType;
    loanAmount: number;
    securityValue: number;
    termMonths: number;
    estimatedLTV: number;
  }) => {
    setCalculatorPrefill({
      type: details.type,
      loanAmount: details.loanAmount,
      securityValue: details.securityValue,
      termMonths: details.termMonths
    });
    setSelectedFacility(details.type);
    setDealModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        onOpenDealModal={() => handleOpenDealModal()}
        onOpenLenderModal={() => setLenderModalOpen(true)}
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
        onOpenInbox={() => setInboxModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDealModal={() => handleOpenDealModal()}
          onOpenLenderModal={() => setLenderModalOpen(true)}
        />

        {/* Easily Understandable Finance Solutions */}
        <OfferingsSection
          onSelectFacility={(type) => setSelectedFacility(type)}
          onOpenDealModal={(type) => handleOpenDealModal(type)}
        />

        {/* Interactive Commercial Deal Calculator */}
        <DealCalculator
          initialType={selectedFacility}
          onApplyWithCalculation={handleApplyWithCalculation}
        />

        {/* Case Studies, Proof & Google Business Profile Testimonials */}
        <CaseStudiesSection
          onOpenReviewModal={() => setReviewModalOpen(true)}
          onOpenDealModal={() => handleOpenDealModal()}
        />

        {/* Private Lenders & Capital Network Portal */}
        <PrivateLenderPortal
          onOpenLenderModal={() => setLenderModalOpen(true)}
        />

        {/* SEO & AIEO Knowledge Base */}
        <AieoKnowledgeSection />

        {/* Direct Messaging & Deal Intake Forms */}
        <ContactSection
          initialFacility={selectedFacility}
          onOpenInbox={() => setInboxModalOpen(true)}
        />
      </main>

      {/* Footer with Regulatory Disclosures */}
      <Footer
        onOpenDealModal={() => handleOpenDealModal()}
        onOpenLenderModal={() => setLenderModalOpen(true)}
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DealModal
        isOpen={dealModalOpen}
        onClose={() => setDealModalOpen(false)}
        defaultFacility={selectedFacility}
        prefillData={calculatorPrefill}
      />

      <PrivateLenderModal
        isOpen={lenderModalOpen}
        onClose={() => setLenderModalOpen(false)}
      />

      <GoogleReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />

      <GoogleBusinessStrategyModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
      />

      <BrokerInboxModal
        isOpen={inboxModalOpen}
        onClose={() => setInboxModalOpen(false)}
      />
    </div>
  );
}

