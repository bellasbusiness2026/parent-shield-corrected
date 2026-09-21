import type { AuthorityRow } from '../authorityTypes';
import { federalFloorAuthorities } from './federalFloor';
import { texasDeepAuthorities } from './texasDeep';
import { otherStateAuthorities } from './otherStates';

export { federalFloorAuthorities, FEDERAL_FLOOR_DISCLAIMER } from './federalFloor';
export { texasDeepAuthorities } from './texasDeep';
export { otherStateAuthorities } from './otherStates';

/** All jurisdiction packs combined for the P3 state selector. */
export const ALL_AUTHORITIES: AuthorityRow[] = [
  ...federalFloorAuthorities,
  ...texasDeepAuthorities,
  ...otherStateAuthorities,
];
