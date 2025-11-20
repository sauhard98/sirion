export interface ContractMetadata {
  value: string;
  effectiveDate: string;
  expiryDate?: string;
  parties?: string[];
}

export interface ContractSection {
  section: string;
  content: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type: 'Deliverable' | 'Milestone' | 'Payment' | 'Renewal' | 'Termination';
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  repercussion: string;
  daysUntil?: number;
}

export interface ContractAnalysis {
  metadata: ContractMetadata;
  structure: ContractSection[];
  timelineEvents: TimelineEvent[];
}

export interface Contract {
  contractId: string;
  filename: string;
  uploadDate: string;
  analysis: ContractAnalysis;
}

export interface ProcessingStatus {
  stage: string;
  progress: number;
}
