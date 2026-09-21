import { AuthorityRow } from '../authorityTypes';
import { FEDERAL_FLOOR } from './federalFloor';
import { TEXAS_DEEP } from './texasDeep';
import { OTHER_STATES } from './otherStates';

export type { AuthorityRow, AuthorityJurisdiction, AuthorityKind, AuthorityConfidence } from '../authorityTypes';
export { FEDERAL_FLOOR } from './federalFloor';
export { TEXAS_DEEP } from './texasDeep';
export { OTHER_STATES } from './otherStates';

export const ALL_AUTHORITIES: AuthorityRow[] = [
  ...FEDERAL_FLOOR,
  ...TEXAS_DEEP,
  ...OTHER_STATES,
];

export function authoritiesByJurisdiction(jurisdiction: AuthorityRow['jurisdiction']): AuthorityRow[] {
  return ALL_AUTHORITIES.filter((row) => row.jurisdiction === jurisdiction);
}

export function authoritiesByStateCode(stateCode: string): AuthorityRow[] {
  const code = stateCode.toUpperCase();
  return ALL_AUTHORITIES.filter((row) => row.stateCode?.toUpperCase() === code);
}
