export interface FAQItem {
  question: string;
  answer: string;
  category: 'Bridging' | 'Development' | 'Commercial' | 'Private Lenders' | 'General';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Bridging',
    question: 'How quickly can Principal Investment Proposals secure a bridging loan?',
    answer: 'We issue indicative Decision in Principle (DIP) terms within 2 to 4 hours of receiving initial project information. Formal completions typically take between 5 to 14 working days, depending on valuation method (desktop vs physical RICS) and legal dual representation. For urgent auction deadlines, accelerated completions can be arranged in under 7 days.'
  },
  {
    category: 'General',
    question: 'Why choose Principal Investment Proposals over a high-street bank?',
    answer: 'Traditional banks rely on rigid, automated credit scoring and slow committee timelines (often 8 to 12 weeks), routinely rejecting viable deals due to property condition, strict debt-service ratios, or corporate age. Principal Investment Proposals works directly with specialist non-bank lenders, debt funds, and private family offices. We structure bespoke facilities based on asset value, deal viability, and realistic exit strategies with complete transparency, friendliness, and personal accountability.'
  },
  {
    category: 'Development',
    question: 'What is the maximum Loan to GDV and LTC available for development projects?',
    answer: 'We secure senior development debt up to 65% to 70% of Gross Development Value (GDV), and up to 85% to 90% of Loan to Cost (LTC) when paired with stretched senior or mezzanine funding. 100% of construction costs are typically funded in staged arrears drawdowns based on Quantity Surveyor (QS) progress certificates.'
  },
  {
    category: 'Commercial',
    question: 'How does Invoice Finance work, and will our customers know we are using it?',
    answer: 'Invoice Finance advances up to 90% of your billed invoice total within 24 hours of issue. With Confidential Invoice Discounting, the facility remains 100% invisible to your clients; you continue to issue invoices and collect payments under your own brand identity. If preferred, Full Factoring provides professional credit control support to handle chasing and debtor collections.'
  },
  {
    category: 'Commercial',
    question: 'Can I refinance machinery and vehicles that our business already owns?',
    answer: 'Yes. Through a Sale & Hire Purchase Back (or Sale & Leaseback), we appraise your unencumbered plant, transport fleet, or machinery and inject an immediate lump sum of cash (typically up to 80% of current trade market value) directly onto your balance sheet, while your company continues using the assets without any disruption to daily operations.'
  },
  {
    category: 'Private Lenders',
    question: 'I have capital to deploy. How can I join your Private Lending Panel?',
    answer: 'We actively partner with high-net-worth individuals, family offices, and private debt funds seeking attractive, risk-adjusted returns (typically 9% to 15% p.a.) secured by 1st or 2nd legal charges against UK commercial property and business assets. We fully diligence every opportunity, conduct AML/KYC, compile institutional-standard credit memorandums, and present only pre-vetted deals matching your specific ticket size and risk appetite.'
  },
  {
    category: 'General',
    question: 'Do you charge upfront fees to review and assess a deal?',
    answer: 'No. Principal Investment Proposals operates with total openness and trust. We do not charge upfront assessment or application fees. We review your proposal, analyze valuations, and issue formal funding options completely free of charge. Our broker commission is transparently disclosed from day one and only payable upon successful loan completion.'
  },
  {
    category: 'General',
    question: 'What UK geographic locations and regions do you cover?',
    answer: 'We operate nationwide across England, Scotland, Wales, and Northern Ireland. Whether your project is in Greater London, the Midlands, the North West, or regional industrial hubs, we have established lending relationships and local panel solicitors ready to act swiftly.'
  }
];
