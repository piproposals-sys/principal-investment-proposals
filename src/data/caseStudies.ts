import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'birmingham-auction-bridge',
    facility: 'Bridging Finance',
    title: '£1,850,000 Urgent Auction Acquisition of a Mixed-Use Retail & Office Parade',
    location: 'Birmingham City Centre, West Midlands',
    loanAmount: '£1,850,000',
    completionTime: '7 working days',
    ltvOrLtc: '75% LTV against £2.47M valuation',
    challenge: 'A private property investor won a prime freehold mixed-use parade at auction with a non-negotiable 28-day completion condition. The investor\'s primary high-street bank delayed issuing formal valuation instructions with only 9 days remaining, leaving the £185k deposit at imminent risk of forfeiture.',
    solution: 'Principal Investment Proposals stepped in immediately. Within 3 hours, we structured terms with a specialist debt fund who accepted a desktop valuation alongside an existing RICS report, issuing credit committee approval in 24 hours.',
    outcome: 'Completed and drawn down in 7 working days. The client secured the property at a 22% discount to vacant possession value and subsequently transitioned into a 5-year commercial mortgage after lease renewals.',
    clientFeedback: {
      quote: "When my bank stalled with 9 days left on an auction completion, I thought my deposit was gone. The team at Principal Investment Proposals didn't just find a lender; they personally managed the valuation and legals round-the-clock. Friendly, completely open, and moved with ferocious speed. Easily the best broker experience in my 15 years in property.",
      clientName: 'Marcus Davenport',
      clientRole: 'Managing Director',
      company: 'Davenport Real Estate Holdings Ltd'
    }
  },
  {
    id: 'surrey-development-scheme',
    facility: 'Development Finance',
    title: '£3,400,000 GDV Stretch Senior Facility for 8 Luxury Townhouses',
    location: 'Guildford, Surrey',
    loanAmount: '£2,350,000 Facility (69% GDV / 88% LTC)',
    completionTime: 'Terms agreed in 24h · Drawdowns on schedule',
    ltvOrLtc: '69% GDV / 88% Total Costs',
    challenge: 'A bespoke regional housebuilder required funding for an 8-home residential scheme. Traditional senior lenders would only offer 60% of GDV, demanding £750k in cash equity which would have stalled their concurrent site acquisition in Hampshire.',
    solution: 'We structured a stretch senior facility combining tier-one bank senior debt with a non-bank mezzanine tranche into a single unified facility agreement, reducing the developer\'s required equity by over £400,000.',
    outcome: '100% of construction costs and 65% of land cost funded with rolled-up interest. Project delivered on time and within budget, with 6 units pre-sold off-plan.',
    clientFeedback: {
      quote: "Most brokers send your deal into an automated portal and you never hear from them. Principal Investment Proposals took the time to understand our site economics, sat down with our QS, and delivered a structure that saved us £400k in upfront capital. Reliable, responsive, and truly on our side.",
      clientName: 'Eleanor Vance',
      clientRole: 'Development Director',
      company: 'Surrey Heritage Living Ltd'
    }
  },
  {
    id: 'haulage-asset-refinance',
    facility: 'Asset Finance & Refinancing',
    title: '£620,000 Equity Release on Commercial Haulage Fleet & Heavy Plant',
    location: 'Coventry & Leicestershire',
    loanAmount: '£620,000 Capital Release',
    completionTime: '10 working days',
    ltvOrLtc: '78% of unencumbered asset book value',
    challenge: 'A third-generation transport and earthmoving contractor was awarded a major 3-year aggregate distribution contract requiring £350k in upfront working capital. Traditional bank overdraft extensions were rejected due to the firm\'s previous year loss during fuel price surges.',
    solution: 'Principal Investment Proposals conducted an on-site physical appraisal of 16 unencumbered Euro-6 tractor units and two CAT excavators, structuring a Sale & HP-Back facility providing a substantial lump sum with manageable 5-year fixed repayments.',
    outcome: '£620,000 released directly into company reserves within 10 days while vehicles stayed fully operational on the road. The company scaled fleet capacity by 35% without personal debentures.',
    clientFeedback: {
      quote: "Transparent, honest, and refreshingly down-to-earth. They looked past a tricky prior financial year and recognized the hard value in our vehicles. The funds were in our bank within a fortnight. Cannot recommend them highly enough.",
      clientName: 'Graham Bennett',
      clientRole: 'Operations Director',
      company: 'Bennett Logistics & Plant Services'
    }
  },
  {
    id: 'invoice-engineering-contractor',
    facility: 'Invoice Finance',
    title: '£400,000 Confidential Invoice Discounting Facility for Structural Engineering Contractor',
    location: 'Manchester, North West',
    loanAmount: '£400,000 Revolving Headroom',
    completionTime: '5 working days to first drawdown',
    ltvOrLtc: '85% advance rate against certified debtor book',
    challenge: 'A fast-growing steel fabrication contractor was experiencing severe cash strain because major Tier-1 construction contractors operated on 60 to 90-day payment terms, while their own skilled fabricators and steel suppliers required weekly and 14-day settlement.',
    solution: 'We installed a Confidential Invoice Discounting facility connected directly to their Xero ledger. The facility advanced 85% of approved invoice values within 24 hours of dispatch, completely invisibly to their end clients.',
    outcome: 'Eliminated cash flow stress overnight, enabled the contractor to take on £1.2M in additional fabrication contracts, and secured 3% early-settlement discounts from raw steel suppliers.',
    clientFeedback: {
      quote: "Cash flow was choking our growth despite having a full order book. Principal Investment Proposals explained invoice discounting in simple terms without financial jargon, got the lender approved in 5 days, and continues to check in regularly. A trusted partner to our business.",
      clientName: 'Tariq Al-Mansoor',
      clientRole: 'Chief Executive Officer',
      company: 'Apex Fabrications & Engineering UK'
    }
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Marcus Davenport',
    company: 'Davenport Real Estate Holdings',
    role: 'Managing Director',
    facility: 'Bridging Loan (£1.85M)',
    rating: 5,
    date: 'Verified Client Review',
    text: "Securing an £1.85M bridge in 7 days to beat an auction deadline seemed impossible until I spoke with Principal Investment Proposals. Unrivalled speed, calm professionalism, and transparent fees from minute one."
  },
  {
    id: 'test-2',
    name: 'Eleanor Vance',
    company: 'Surrey Heritage Living Ltd',
    role: 'Development Director',
    facility: 'Development Finance (£2.35M)',
    rating: 5,
    date: 'Verified Client Review',
    text: "The personal attention and deep market knowledge were exceptional. They restructured our stretch senior debt, freeing £400k in working capital for our next site. Always on the other end of the phone when we needed them."
  },
  {
    id: 'test-3',
    name: 'Graham Bennett',
    company: 'Bennett Logistics & Plant Services',
    role: 'Operations Director',
    facility: 'Asset Refinance (£620k)',
    rating: 5,
    date: 'Verified Client Review',
    text: "Friendly, straight-talking, and delivered exactly what they promised. They released £620k against our fleet in 10 days when our high-street bank took 6 weeks just to say no. A breath of fresh air."
  },
  {
    id: 'test-4',
    name: 'Julian Henderson',
    company: 'Meridian Capital Partners',
    role: 'Private Lender & Family Office Trustee',
    facility: 'Private Lending Partner',
    rating: 5,
    date: 'Capital Provider Review',
    text: "As a private lender deploying between £500k and £3M per deal, deal flow quality is everything. Principal Investment Proposals presents the most thoroughly diligence-packaged credit memos in the UK market. First charge security, realistic exits, zero fluff."
  }
];
