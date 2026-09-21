export type AuthorityJurisdiction = 'federal' | 'TX' | 'other-state';
export type AuthorityKind = 'case' | 'statute' | 'agency';
export type AuthorityConfidence = 'high' | 'medium' | 'low';

/**
 * Canonical P3 data-row for state selector / legal authorities.
 * Sable drafts copy into these fields; Theo verifies officialUrl.
 */
export type AuthorityRow = {
  id: string;
  jurisdiction: AuthorityJurisdiction;
  /** ISO-ish 2-letter state code when jurisdiction === 'other-state' */
  stateCode?: string;
  kind: AuthorityKind;
  citation: string;
  title: string;
  summary: string;
  parentProtection: string;
  /** Primary official https URL (required) */
  officialUrl: string;
  secondaryUrl?: string;
  /** ISO date YYYY-MM-DD */
  lastVerified: string;
  confidence: AuthorityConfidence;
  caveat?: string;
  tags: string[];
  relatedIds: string[];
  meta?: Record<string, string | number | boolean>;
};
