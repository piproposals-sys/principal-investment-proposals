export type FinanceType = 
  | 'bridging'
  | 'development'
  | 'working-capital'
  | 'invoice'
  | 'asset';

export interface FinanceOffering {
  id: FinanceType;
  title: string;
  tagline: string;
  typicalLoanSize: string;
  rateFrom: string;
  turnaround: string;
  maxLTV: string;
  overview: string;
  idealFor: string[];
  keyFeatures: string[];
  commonScenarios: {
    title: string;
    description: string;
  }[];
}

export interface CaseStudy {
  id: string;
  facility: string;
  title: string;
  location: string;
  loanAmount: string;
  completionTime: string;
  ltvOrLtc: string;
  challenge: string;
  solution: string;
  outcome: string;
  clientFeedback: {
    quote: string;
    clientName: string;
    clientRole: string;
    company: string;
  };
}

export interface PrivateLenderInquiry {
  lenderName: string;
  entityType: 'HNWI' | 'Family Office' | 'Debt Fund' | 'Private Equity' | 'Syndicate';
  email: string;
  phone: string;
  ticketSize: string;
  targetYield: string;
  preferredAssetClasses: string[];
  preferredGeography: string;
  notes?: string;
}

export interface DealSubmission {
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  financeType: FinanceType;
  loanAmount: number;
  securityValue: number;
  timeframe: 'Urgent (under 14 days)' | '1 to 4 weeks' | '1 to 3 months' | 'Exploring options';
  summary: string;
  exitStrategy: string;
}

export interface DirectMessage {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  topic: string;
  message: string;
}

export interface StoredInquiry {
  id: string;
  type: 'direct-message' | 'deal-proposal' | 'private-lender';
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  facilityOrTopic?: string;
  amountOrTicket?: string;
  summary: string;
  timeframe?: string;
  status: 'new' | 'reviewed' | 'contacted';
}

