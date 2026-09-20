import { SupportPledge } from '../types';

export const STORAGE_KEY_PLEDGES = 'parentshield_support_pledges_v1';

export const INITIAL_COMMUNITY_PLEDGES: SupportPledge[] = [
  {
    id: 'sample-1',
    amount: 50,
    frequency: 'monthly',
    supporterName: 'Elena R. (Harris County) [sample]',
    isAnonymous: false,
    message: '[Illustrative sample — not a verified outcome] To every mom standing terrified at their door: Stand firm on the 4th Amendment. ParentShield helped me find calm, rights-focused language for my situation. Keep fighting!',
    timestamp: '2026-09-10T14:22:00Z',
    tierTitle: 'Protector Level',
  },
  {
    id: 'sample-2',
    amount: 150,
    frequency: 'one-time',
    supporterName: 'Marcus T. (Bexar County) [sample]',
    isAnonymous: false,
    message: '[Illustrative sample — not a verified outcome] CPS pressure can feel overwhelming when parents do not know their rights. Invoking TFC § 261.307 and putting requests in writing helped us stay organized. Supporting ParentShield so every Texas parent has this armor.',
    timestamp: '2026-09-08T09:45:00Z',
    tierTitle: 'Guardian Level',
  },
  {
    id: 'sample-3',
    amount: 25,
    frequency: 'monthly',
    supporterName: 'Anonymous Advocate [sample]',
    isAnonymous: true,
    message: 'Knowledge is the greatest weapon against family separation. Keep families together!',
    timestamp: '2026-09-05T18:10:00Z',
    tierTitle: 'Defender Level',
  },
  {
    id: 'sample-4',
    amount: 75,
    frequency: 'one-time',
    supporterName: 'D. Rodriguez (Tarrant County) [sample]',
    isAnonymous: false,
    message: 'Proud to stand with this mission. Unlawful pressure thrives when parents feel alone—constitutional knowledge brings confidence and protection.',
    timestamp: '2026-09-02T11:30:00Z',
    tierTitle: 'Shield Level',
  },
];

export const PRESET_TIERS = [
  {
    id: 'defender',
    amount: 15,
    name: 'Defender Level',
    tagline: 'Stand in solidarity with Texas parents defending their rights.',
    highlight: false,
  },
  {
    id: 'protector',
    amount: 35,
    name: 'Protector Level',
    tagline: 'Help empower families with knowledge to stay united and informed.',
    highlight: true,
  },
  {
    id: 'shield',
    amount: 75,
    name: 'Shield Level',
    tagline: 'Support the expansion and reach of the ParentShield mission.',
    highlight: false,
  },
  {
    id: 'guardian',
    amount: 150,
    name: 'Guardian Level',
    tagline: 'Champion parental civil rights and procedural due process.',
    highlight: false,
  },
];

