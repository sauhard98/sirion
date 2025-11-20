import { Contract, ProcessingStatus } from '@/types/contract';

// Simulated processing stages for the AI analysis
const processingStages = [
  { stage: 'Initializing Document Scanner...', progress: 10 },
  { stage: 'Extracting Text from PDF...', progress: 25 },
  { stage: 'Analyzing Termination Clauses...', progress: 40 },
  { stage: 'Identifying Key Milestones...', progress: 55 },
  { stage: 'Extracting Deliverables...', progress: 70 },
  { stage: 'Calculating Risk Profiles...', progress: 85 },
  { stage: 'Generating Timeline Visualization...', progress: 95 },
  { stage: 'Analysis Complete', progress: 100 },
];

// Mock function to simulate AI processing with progress updates
export async function processContractWithGemini(
  file: File,
  onProgress?: (status: ProcessingStatus) => void
): Promise<Contract> {
  // Simulate processing stages
  for (const stage of processingStages) {
    if (onProgress) {
      onProgress(stage);
    }
    await new Promise(resolve => setTimeout(resolve, 400)); // 400ms per stage
  }

  // Generate mock analysis data
  const contractId = `CNT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate dates relative to today
  const today = new Date();
  const addDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const mockAnalysis: Contract = {
    contractId,
    filename: file.name,
    uploadDate: new Date().toISOString(),
    analysis: {
      metadata: {
        value: '$' + (Math.floor(Math.random() * 900000) + 100000).toLocaleString(),
        effectiveDate: today.toISOString().split('T')[0],
        expiryDate: addDays(365),
        parties: ['Sirion Inc.', extractCompanyName(file.name)],
      },
      structure: [
        {
          section: 'Metadata',
          content: `Contract Type: Master Services Agreement\nEffective Date: ${today.toISOString().split('T')[0]}\nGoverning Law: Delaware\nJurisdiction: United States`,
        },
        {
          section: 'Definitions',
          content: `"Services" means the professional consulting services described in Exhibit A.\n"Deliverables" means all work products, reports, and materials to be delivered by Service Provider.\n"Confidential Information" means all non-public information disclosed by either party.`,
        },
        {
          section: 'Scope of Work',
          content: `Service Provider shall deliver Phase 1 implementation within 60 days of contract execution, Phase 2 within 120 days, and final deployment within 180 days. All deliverables must meet acceptance criteria defined in Exhibit B.`,
        },
        {
          section: 'Payment Terms',
          content: `Client shall pay 30% upon contract execution, 40% upon Phase 1 completion, and 30% upon final delivery. Late payments incur 2% monthly interest. Payment due within 15 days of invoice.`,
        },
        {
          section: 'Termination Clauses',
          content: `Either party may terminate with 30 days written notice. Immediate termination permitted for material breach. Upon termination, Client must pay for all completed work. Service Provider must deliver all work-in-progress materials within 5 business days.`,
        },
        {
          section: 'Liability & Indemnification',
          content: `Service Provider liability capped at total contract value. Indemnification required for IP infringement claims. Both parties maintain insurance coverage of minimum $1M. Consequential damages excluded except for gross negligence.`,
        },
        {
          section: 'Intellectual Property',
          content: `All deliverables become Client property upon final payment. Service Provider retains rights to pre-existing IP and methodologies. Client grants limited license for portfolio use with prior written consent.`,
        },
        {
          section: 'Renewal Terms',
          content: `Contract auto-renews for successive 1-year terms unless either party provides 90 days notice. Renewal rate may increase by up to 5% annually based on CPI adjustments.`,
        },
      ],
      timelineEvents: [
        {
          id: '1',
          title: 'Contract Execution & Initial Payment Due',
          date: addDays(0),
          type: 'Payment',
          risk: 'Low',
          repercussion: '30% of contract value ($' + Math.floor((Math.random() * 900000 + 100000) * 0.3).toLocaleString() + ') due immediately',
        },
        {
          id: '2',
          title: 'Phase 1 Delivery Deadline',
          date: addDays(45),
          type: 'Deliverable',
          risk: 'High',
          repercussion: '10% penalty on total contract value for each week of delay. Client may terminate for cause if delayed beyond 2 weeks.',
        },
        {
          id: '3',
          title: 'Phase 1 Payment Milestone',
          date: addDays(60),
          type: 'Payment',
          risk: 'Medium',
          repercussion: '40% payment due within 15 days. Late payment incurs 2% monthly interest.',
        },
        {
          id: '4',
          title: 'Phase 2 Delivery Deadline',
          date: addDays(105),
          type: 'Deliverable',
          risk: 'High',
          repercussion: 'Material breach trigger. Client has right to terminate and withhold final payment if not delivered.',
        },
        {
          id: '5',
          title: 'Final Deployment & Go-Live',
          date: addDays(165),
          type: 'Milestone',
          risk: 'Critical',
          repercussion: 'Immediate termination of license if not completed. All payments become due immediately. Liquidated damages of $50,000 per week of delay.',
        },
        {
          id: '6',
          title: 'Final Payment Due',
          date: addDays(180),
          type: 'Payment',
          risk: 'Medium',
          repercussion: '30% final payment due. Withholding payment beyond 30 days triggers arbitration clause.',
        },
        {
          id: '7',
          title: 'Renewal Notice Deadline',
          date: addDays(275),
          type: 'Renewal',
          risk: 'High',
          repercussion: 'Auto-renewal at +5% rate if no notice provided. 90-day notice required to prevent automatic renewal.',
        },
        {
          id: '8',
          title: 'Contract Expiry & Renewal',
          date: addDays(365),
          type: 'Termination',
          risk: 'Critical',
          repercussion: 'Contract terminates unless renewed. All access to systems must be revoked. Final reconciliation of all outstanding items required.',
        },
      ],
    },
  };

  // Calculate days until for each event
  mockAnalysis.analysis.timelineEvents = mockAnalysis.analysis.timelineEvents.map(event => {
    const eventDate = new Date(event.date);
    const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { ...event, daysUntil };
  });

  return mockAnalysis;
}

// Helper to extract company name from filename
function extractCompanyName(filename: string): string {
  const nameMatch = filename.match(/(?:_|-|\s)([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
  return nameMatch ? nameMatch[1] + ' Corp.' : 'Partner Organization';
}

// Export processing stages for UI consumption
export { processingStages };
