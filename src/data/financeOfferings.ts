import { FinanceOffering } from '../types';

export const FINANCE_OFFERINGS: FinanceOffering[] = [
  {
    id: 'bridging',
    title: 'Bridging Finance',
    tagline: 'Rapid, flexible short-term capital when conventional bank timelines are too slow.',
    typicalLoanSize: '£100,000 – £15,000,000',
    rateFrom: 'From 0.55% pcm',
    turnaround: 'Terms in 2–4 hours · Completion in 5–14 days',
    maxLTV: 'Up to 75% – 80% OMV',
    overview: 'Bridging loans provide agile, short-term debt secured against property or land. Designed specifically for time-critical transactions such as auction completions, chain breaks, refurbishments, or planning enhancements before moving to long-term commercial mortgages or asset sales.',
    idealFor: [
      'Property auction buyers needing completion within 28 days',
      'Investors acquiring distressed or unmortgageable stock',
      'Developers financing light or heavy refurbishment prior to exit',
      'Commercial property traders seizing below-market value opportunities',
      'Borrowers needing urgent capital while awaiting permanent term finance'
    ],
    keyFeatures: [
      '1st and 2nd legal charge structures available',
      'Rolled-up or retained interest options (zero monthly payments during term)',
      'Terms from 1 to 24 months with flexible early repayment options',
      'No minimum term penalties with select specialist lenders',
      'Unregulated commercial, semi-commercial, and residential investment properties'
    ],
    commonScenarios: [
      {
        title: 'Auction Purchase Under Strict Deadlines',
        description: 'You won a lot at Allsop or Acuitus requiring 100% completion in 28 days. High-street banks take 8–12 weeks; our specialist bridging panel issues credit-backed terms in 24 hours and funds in 10 days.'
      },
      {
        title: 'Light to Heavy Refurbishment (BRRR Strategy)',
        description: 'Acquiring an uninhabitable Victorian terrace or commercial unit that standard lenders decline. Bridge funds 75% of purchase + 100% of works, exiting via refinancing onto a buy-to-let mortgage.'
      }
    ]
  },
  {
    id: 'development',
    title: 'Development Finance',
    tagline: 'Tailored construction and conversion facilities designed to see your project through to completion.',
    typicalLoanSize: '£500,000 – £25,000,000+',
    rateFrom: 'From 6.5% p.a. + Base',
    turnaround: 'Staged drawdowns · DIP issued within 24 hours',
    maxLTV: 'Up to 70% GDV / 90% LTC',
    overview: 'Property development finance funds ground-up new builds, major conversions, and extensive commercial-to-residential projects. Capital is released in tranches against certified Quantity Surveyor (QS) inspection milestones, minimising your interest carry.',
    idealFor: [
      'Residential developers building 2 to 50+ units or executive homes',
      'Commercial to residential conversions under Permitted Development (PDR)',
      'HMO conversions and multi-unit student/professional schemes',
      'Developers requiring stretch senior debt to reduce required cash equity',
      'Completed schemes requiring developer exit finance to release equity for the next site'
    ],
    keyFeatures: [
      'Funding up to 70% of Gross Development Value (GDV) and 90% of Loan to Cost (LTC)',
      'Stretched Senior and Mezzanine equity top-ups to bridge equity shortfalls',
      'Interest rolled up into the development facility until project completion',
      'Experienced and first-time developers considered with qualified main contractor',
      'Seamless transition into Developer Exit bridging or long-term investment debt'
    ],
    commonScenarios: [
      {
        title: 'Ground-Up 12-Apartment Scheme',
        description: 'Site acquired with full planning permission. We structured a 68% GDV senior facility covering 100% of construction costs and 60% of site cost, with interest fully serviced out of the facility.'
      },
      {
        title: 'Commercial Office Conversion to 18 Residential Units',
        description: 'A developer purchased an empty secondary office building. We secured a combined acquisition bridge transitioning into a structured conversion loan with QS drawdown monitoring.'
      }
    ]
  },
  {
    id: 'working-capital',
    title: 'Working Capital Finance',
    tagline: 'Inject liquidity to maintain steady operations, hire talent, or finance sudden growth spikes.',
    typicalLoanSize: '£50,000 – £2,000,000',
    rateFrom: 'From 5.9% APR equivalent',
    turnaround: 'Decision in 24 hours · Funds in 48–72 hours',
    maxLTV: 'Revenue & Cash-flow Based',
    overview: 'Working capital solutions provide companies with the day-to-day liquidity needed to cover operational expenses, bridge supplier payment terms, purchase bulk stock at discounts, and fulfill lucrative new client contracts without diluting equity.',
    idealFor: [
      'Growing SMEs facing extended customer payment terms',
      'Wholesalers & importers needing upfront supplier letters of credit or trade lines',
      'Seasonal businesses navigating high-demand inventory cycles',
      'Professional service firms funding staff expansion and client onboarding',
      'Businesses requiring an agile alternative to restrictive bank overdrafts'
    ],
    keyFeatures: [
      'Revolving credit facilities (draw down and repay flexibly as cash flows allow)',
      'Unsecured options for profitable trading companies with 12+ months history',
      'Transparent interest charged only on the funds actively drawn',
      'No personal asset debentures on select facilities',
      'Replaces rigid high-street overdraft limits with scalable headroom'
    ],
    commonScenarios: [
      {
        title: 'Fulfilling a Large Scale Contract',
        description: 'A commercial HVAC subcontractor won a £450k tender requiring £120k in upfront materials and sub-labour. A revolving credit facility bridged the 45-day gap until initial milestone certificates were paid.'
      },
      {
        title: 'Bulk Seasonal Inventory Purchase',
        description: 'An e-commerce distributor secured a 25% discount from an overseas manufacturer by paying upfront. Working capital debt delivered a net £60k profit increase above financing costs.'
      }
    ]
  },
  {
    id: 'invoice',
    title: 'Invoice Finance & Factoring',
    tagline: 'Unlock up to 90% of your unpaid invoices within 24 hours of issuing them.',
    typicalLoanSize: '£50,000 – £5,000,000 facility',
    rateFrom: 'Discount fee from 1.25% + base',
    turnaround: 'Facility set up in 5–7 days · Same-day releases',
    maxLTV: 'Up to 90% of debtor ledger',
    overview: 'Invoice finance bridges the crippling gap between completing work and getting paid by corporate clients on 30, 60, or 90-day credit terms. By securing funding directly against your verified debtor ledger, cash flows directly into your business the moment work is billed.',
    idealFor: [
      'Recruitment agencies with weekly temp/contractor payroll',
      'Manufacturing, haulage, and engineering contractors',
      'B2B service providers with blue-chip corporate or government clients',
      'Companies suffering cash crunches because customers take 60–90 days to settle',
      'Firms seeking confidential discounting so customers never know a funder is involved'
    ],
    keyFeatures: [
      'Confidential Invoice Discounting (your customers deal solely with you as normal)',
      'Selective / Spot Factoring (fund individual high-value invoices with no whole-ledger lock-in)',
      'Bad debt protection (credit insurance) options available to safeguard against insolvencies',
      'Facility grows organically alongside your sales revenue without fixed ceilings',
      'Integrates seamlessly with modern accounting software (Xero, QuickBooks, Sage)'
    ],
    commonScenarios: [
      {
        title: 'Fast-Growing Recruitment Firm',
        description: 'Deploying 45 specialist IT contractors weekly required £40k weekly payroll, while corporate clients paid on 60 days. Confidential discounting unlocked £280k instantly, allowing continuous team expansion.'
      },
      {
        title: 'Specialist Subcontractor on 90-Day Terms',
        description: 'Civil engineering supplier was owed £350k by a Tier-1 contractor. A tailored facility released £300k within 24 hours of invoice submission, restoring supplier credit terms.'
      }
    ]
  },
  {
    id: 'asset',
    title: 'Asset Finance & Equity Release',
    tagline: 'Acquire essential machinery and vehicles, or refinance existing equipment to unlock balance sheet cash.',
    typicalLoanSize: '£25,000 – £5,000,000',
    rateFrom: 'From 5.2% fixed p.a.',
    turnaround: 'Quick approval in 24–48 hours',
    maxLTV: 'Up to 100% of equipment cost / 80% refinance',
    overview: 'Asset finance enables businesses to acquire mission-critical equipment, commercial vehicles, and heavy plant without draining cash reserves. Alternatively, Sale & Leaseback enables you to release capital tied up in machinery you already own outright.',
    idealFor: [
      'Construction and groundworks firms acquiring excavators and heavy plant',
      'Logistics and courier operators investing in fleet tractors and trailers',
      'Precision engineering and CNC manufacturing businesses',
      'Medical, dental, and veterinary practices updating surgical/diagnostic tech',
      'Asset-rich firms needing equity release to fund an acquisition or property deposit'
    ],
    keyFeatures: [
      'Hire Purchase (HP) with eventual asset ownership upon completion',
      'Finance Lease with low initial capital outlay and tax-efficient write-offs',
      'Sale & HP Back (refinance existing unencumbered machinery to release working capital)',
      'Terms from 12 months up to 7 years matching the economic lifespan of the machinery',
      'Seasonal repayment structures available to match harvest or tourism cycles'
    ],
    commonScenarios: [
      {
        title: 'Unlocking £450k Equity from Unencumbered Transport Fleet',
        description: 'A regional logistics firm owned 14 commercial vehicles outright. We arranged a Sale & HP Back, releasing £450k in liquid capital to fund a secondary depot acquisition while the vehicles remained in full operation.'
      },
      {
        title: 'Acquiring a £220k Precision 5-Axis CNC Milling Center',
        description: 'An aerospace supplier secured a 5-year Hire Purchase agreement with a 10% deposit. Monthly payments were £3,400, while the machine generated £12,000/month in contract revenue.'
      }
    ]
  }
];
