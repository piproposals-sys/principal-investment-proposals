import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenDealModal: () => void;
  onOpenLenderModal: () => void;
  onOpenStrategyModal: () => void;
  onOpenInbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDealModal,
  onOpenLenderModal,
  onOpenStrategyModal,
  onOpenInbox
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top subtle contact bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">UK Commercial Finance Broker</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-amber-300 font-medium">Decisions in Principle within 2–4 Hours</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenInbox}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700"
            >
              <span>Inbox & Messages</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </button>
            <a
              href="mailto:piproposals@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>piproposals@gmail.com</span>
            </a>
            <button
              onClick={onOpenStrategyModal}
              className="hidden md:inline text-xs text-slate-400 hover:text-amber-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              GMB & SEO Strategy
            </button>
          </div>
        </div>
      </div>


      {/* Main 3-zone Header Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#"
            className="text-lg md:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors"
          >
            Principal Investment Proposals
          </a>

          {/* Zone 2: Clean 4–5 single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#solutions"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Solutions
            </a>
            <a
              href="#calculator"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Deal Calculator
            </a>
            <a
              href="#case-studies"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#testimonials"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#private-lenders"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-slate-800 font-semibold"
            >
              Private Lenders
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDealModal}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Submit a Deal
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenDealModal}
              className="sm:hidden px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md"
            >
              Submit Deal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4">
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-amber-700"
            >
              Finance Solutions
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-amber-700"
            >
              Deal Calculator
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-amber-700"
            >
              Case Studies & Proof
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-amber-700"
            >
              Client Reviews & Google
            </a>
            <a
              href="#private-lenders"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-amber-800"
            >
              Private Lenders & Capital Network
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-amber-700"
            >
              Message Broker
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInbox();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-slate-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg"
              >
                View Broker Inbox & Received Leads
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDealModal();
                }}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-slate-900 rounded-lg"
              >
                Submit a Deal for Assessment
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLenderModal();
                }}
                className="w-full py-2 text-center text-xs font-medium text-slate-700 border border-slate-300 rounded-lg"
              >
                Join Private Lending Panel
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStrategyModal();
                }}
                className="w-full py-2 text-center text-xs text-amber-800 bg-amber-50 rounded-lg"
              >
                View GMB & Inbound Acquisition Strategy
              </button>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
