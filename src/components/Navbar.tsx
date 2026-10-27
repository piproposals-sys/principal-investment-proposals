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
            <span className="hidden sm:inline text-growth-400 font-medium">Decisions in Principle within 2–4 Hours</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenInbox}
              className="flex items-center gap-1.5 text-xs text-growth-300 hover:text-white transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700"
            >
              <span>Inbox & Messages</span>
              <span className="w-1.5 h-1.5 rounded-full bg-growth-500 animate-pulse"></span>
            </button>
            <a
              href="mailto:piproposals@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-growth-400" />
              <span>piproposals@gmail.com</span>
            </a>
            <button
              onClick={onOpenStrategyModal}
              className="hidden md:inline text-xs text-slate-400 hover:text-growth-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              GMB & SEO Strategy
            </button>
          </div>
        </div>
      </div>


      {/* Main 3-zone Header Contract */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Original Brand Logo Asset */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 py-1 group"
            title="Principal Investment Proposals - ...Because Investments Grow..."
          >
            <img
              src="/assets/aistudio/logo_97a322f9.jpg"
              alt="Principal Investment Proposals - ...Because Investments Grow..."
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#solutions"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0"
            >
              Solutions
            </a>
            <a
              href="#calculator"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0"
            >
              Deal Calculator
            </a>
            <a
              href="#case-studies"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#testimonials"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#private-lenders"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0 text-slate-800 font-semibold"
            >
              Private Lenders
            </a>
            <a
              href="#contact"
              className="hover:text-growth-700 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDealModal}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
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
              className="block text-base font-medium text-slate-800 hover:text-growth-700"
            >
              Finance Solutions
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-growth-700"
            >
              Deal Calculator
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-growth-700"
            >
              Case Studies & Proof
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-growth-700"
            >
              Client Reviews & Google
            </a>
            <a
              href="#private-lenders"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-growth-800"
            >
              Private Lenders & Capital Network
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 hover:text-growth-700"
            >
              Message Broker
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInbox();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-slate-900 bg-growth-50 hover:bg-growth-100 border border-growth-200 rounded-lg"
              >
                View Broker Inbox & Received Leads
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDealModal();
                }}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-growth-600 rounded-lg"
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
                className="w-full py-2 text-center text-xs text-growth-800 bg-growth-50 rounded-lg"
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
