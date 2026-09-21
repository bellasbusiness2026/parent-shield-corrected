export type AuthorityJurisdiction = 'federal' | 'TX' | 'other-state';
export type AuthorityKind = 'case' | 'statute' | 'agency';
export type AuthorityRow = {
  id: string;
  jurisdiction: AuthorityJurisdiction;
  stateCode?: string;
  kind: AuthorityKind;
  citation: string;
  title: string;
  summary: string;
  parentProtection: string;
  officialUrl: string;
  secondaryUrl?: string;
  lastVerified: string; // YYYY-MM-DD
  confidence: 'high' | 'medium' | 'low';
  caveat?: string;
  tags: string[];
  relatedIds: string[];
  meta?: Record<string, string | number | boolean>;
};
