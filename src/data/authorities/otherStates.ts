/**
 * Other-state authorities — Theo research pack 2026-09-21.
 */
import type { AuthorityRow } from '../authorityTypes';
import { otherStateRecordingAuthorities, OTHER_STATE_RECORDING_FOOTNOTE } from './otherStatesRecording';
import { otherStateAgencyAuthorities } from './otherStatesAgencies';

export { OTHER_STATE_RECORDING_FOOTNOTE };

export const otherStateAuthorities: AuthorityRow[] = [
  ...otherStateRecordingAuthorities,
  ...otherStateAgencyAuthorities,
];
