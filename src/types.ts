export interface CaseReviewResponse {
  immediateRightsRisks: string[];
  voluntaryVsMandatory: {
    demand: string;
    type: string;
    legalBasis: string;
    parentShieldGuidance: string;
  }[];
  actionChecklist: string[];
  auditTrailDraft?: string;
  disclaimer: string;
  rawAnalysis?: string;
}

export interface StripEmotionResponse {
  polishedDraft: string;
  subjectLine?: string;
  trapsRemoved?: string[];
  legalSafeguardsApplied?: string[];
  disclaimer: string;
}

export interface HB730AuditResult {
  isExclusionaryBarTriggered: boolean;
  violationsCount: number;
  violations: string[];
  statusAssessment: string;
  formalViolationNotice: string;
  disclaimer: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  interactionType: 'In-Person Door Visit' | 'Phone Call' | 'Text Message' | 'Email' | 'Office / Field Meeting' | 'Court / Order Notice';
  caseworkerName: string;
  supervisorName?: string;
  badgeOrUnit?: string;
  wasRecorded: boolean;
  courtOrderPresented: boolean;
  summaryOfDemands: string;
  parentShieldResponseDraft?: string;
  confirmationSent: boolean;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  category?: 'triage' | 'draft' | 'legal-basis' | 'de-escalation';
}

export interface CaseDeadlines {
  removalDate?: string;
  adversaryHearingDeadline?: string; // 14 days from removal (TFC § 262.201)
  suitFilingDate?: string;
  dropDeadDismissalDate?: string; // 1 year from suit filing (TFC § 263.401)
}

export interface LegalAuthorityInfo {
  code: string;
  title: string;
  category: 'Constitutional' | 'Texas Family Code' | 'Supreme Court Precedent';
  summary: string;
  protection: string;
  keyQuote: string;
}

export interface SupportPledge {
  id: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  supporterName: string;
  isAnonymous: boolean;
  message?: string;
  timestamp: string;
  tierTitle: string;
}

