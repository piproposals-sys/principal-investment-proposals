/**
 * Helper to dispatch inquiries directly to piproposals@gmail.com
 */

export interface EmailDispatchData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  facility: string;
  amount?: string;
  securityValue?: string;
  urgency?: string;
  message: string;
}

export function generateEmailContent(data: EmailDispatchData) {
  const subject = `[Commercial Deal Enquiry] ${data.name} - ${data.facility}${data.amount ? ` (${data.amount})` : ''}`;
  
  const body = `PRINCIPAL INVESTMENT PROPOSALS - COMMERCIAL INQUIRY
==================================================

Client Name: ${data.name}
Company / Entity: ${data.company || 'Not provided'}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Facility Type: ${data.facility}
Loan / Facility Required: ${data.amount || 'Not specified'}
Estimated Security / Asset Value: ${data.securityValue || 'Not specified'}
Urgency / Timeframe: ${data.urgency || 'Standard'}

PROJECT & DEAL DETAILS:
${data.message}

--------------------------------------------------
Origin: www.principalinvestmentproposals.co.uk
Recipient: piproposals@gmail.com`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=piproposals@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:piproposals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, gmailUrl, mailtoUrl };
}

export async function sendLiveEmailToBroker(data: EmailDispatchData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('https://formsubmit.co/ajax/piproposals@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Deal Lead: ${data.name} - ${data.facility} (${data.amount || 'Enquiry'})`,
        Name: data.name,
        Company: data.company || 'N/A',
        Email: data.email,
        Phone: data.phone || 'N/A',
        Facility: data.facility,
        Amount: data.amount || 'N/A',
        SecurityValue: data.securityValue || 'N/A',
        Urgency: data.urgency || 'N/A',
        Message: data.message,
        _template: 'table'
      })
    });

    if (response.ok) {
      return { success: true, message: 'Enquiry sent directly to piproposals@gmail.com!' };
    } else {
      return { success: false, message: 'Email gateway responded with an error.' };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error attempting email dispatch.' };
  }
}
