import { StoredInquiry } from '../types';

const STORAGE_KEY = 'pip_commercial_inquiries';

const INITIAL_SEEDED_INQUIRIES: StoredInquiry[] = [
  {
    id: 'inq-seed-1',
    type: 'deal-proposal',
    timestamp: 'Today, 09:15',
    name: 'Oliver Sterling',
    company: 'Sterling Developments UK',
    email: 'oliver@sterlingdevelopments.co.uk',
    phone: '07700 900812',
    facilityOrTopic: 'Bridging Finance',
    amountOrTicket: '£1,450,000',
    timeframe: 'Urgent (under 14 days)',
    summary: 'Acquiring an unmodernised commercial parade in Leeds with pre-application support for 8 apartments. Need 75% LTV bridging to complete before seller deadline.',
    status: 'new'
  },
  {
    id: 'inq-seed-2',
    type: 'direct-message',
    timestamp: 'Yesterday, 16:40',
    name: 'Sophie Whitmore',
    company: 'Whitmore Manufacturing & Tooling',
    email: 's.whitmore@whitmoretooling.com',
    phone: '07700 900344',
    facilityOrTopic: 'Invoice Finance & Factoring',
    amountOrTicket: '£350,000 facility',
    summary: 'Our Tier-1 automotive client is extending terms to 75 days. We need confidential invoice discounting to keep up with raw material purchases and weekly payroll.',
    status: 'reviewed'
  },
  {
    id: 'inq-seed-3',
    type: 'private-lender',
    timestamp: '25 Oct 2026',
    name: 'Julian Henderson',
    company: 'Meridian Family Wealth',
    email: 'julian@meridianwealth.co.uk',
    phone: '07700 900980',
    facilityOrTopic: 'Private Debt Capital Provider',
    amountOrTicket: '£1,000,000 – £3,000,000',
    summary: 'Family office capital looking to deploy into 1st charge property bridging and development mezzanine debt. Target 10%–12% net annual coupon with conservative LTV.',
    status: 'contacted'
  }
];

export function getStoredInquiries(): StoredInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_INQUIRIES));
      return INITIAL_SEEDED_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEEDED_INQUIRIES;
  }
}

export function saveInquiry(data: {
  type: 'direct-message' | 'deal-proposal' | 'private-lender';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  facilityOrTopic?: string;
  amountOrTicket?: string;
  summary: string;
  timeframe?: string;
}): StoredInquiry {
  const current = getStoredInquiries();
  const newRecord: StoredInquiry = {
    id: `inq-${Date.now()}`,
    type: data.type,
    timestamp: 'Just now',
    name: data.name,
    email: data.email,
    phone: data.phone || 'N/A',
    company: data.company,
    facilityOrTopic: data.facilityOrTopic,
    amountOrTicket: data.amountOrTicket,
    summary: data.summary,
    timeframe: data.timeframe,
    status: 'new'
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to store inquiry', err);
  }
  return newRecord;
}

export function updateInquiryStatus(id: string, status: 'new' | 'reviewed' | 'contacted'): StoredInquiry[] {
  const current = getStoredInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error(err);
  }
  return updated;
}

export function deleteInquiry(id: string): StoredInquiry[] {
  const current = getStoredInquiries();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error(err);
  }
  return updated;
}
