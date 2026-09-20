import { SupportPledge } from '../types';

export const STORAGE_KEY_PLEDGES = 'parentshield_support_pledges_v1';

export const INITIAL_COMMUNITY_PLEDGES: SupportPledge[] = [
  {
    id: 'sample-1',
    amount: 50,
    frequency: 'monthly',
    supporterName: 'Elena R. (Harris County)',
    isAnonymous: false,
    message: 'To every mom standing terrified at their door: Stand firm on the 4th Amendment. ParentShield gave me the exact words to say and CPS closed the investigation without entry. Keep fighting!',
    timestamp: '2026-09-10T14:22:00Z',
    tierTitle: 'Protector Level',
  },
  {
    id: 'sample-2',
    amount: 150,
    frequency: 'one-time',
    supporterName: 'Marcus T. (Bexar County)',
    isAnonymous: false,
    message: 'CPS relied on our fear and ignorance of the law. Once we invoked TFC § 261.307 and put everything in writing, their threats vanished. Supporting ParentShield so every Texas parent has this armor.',
    timestamp: '2026-09-08T09:45:00Z',
    tierTitle: 'Guardian Level',
  },
  {
    id: 'sample-3',
    amount: 25,
    frequency: 'monthly',
    supporterName: 'Anonymous Advocate',
    isAnonymous: true,
    message: 'Knowledge is the greatest weapon against family separation. Keep families together!',
    timestamp: '2026-09-05T18:10:00Z',
    tierTitle: 'Defender Level',
  },
  {
    id: 'sample-4',
    amount: 75,
    frequency: 'one-time',
    supporterName: 'D. Rodriguez (Tarrant County)',
    isAnonymous: false,
    message: 'Proud to stand with this mission. Unlawful pressure thrives when parents feel alone—constitutional knowledge brings confidence and protection.',
    timestamp: '2026-09-02T11:30:00Z',
    tierTitle: 'Shield Level',
  },
];

/** Live Stripe Payment Links (ParentShield acct — buy.stripe.com only). */
export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  together: 'https://buy.stripe.com/14A28qdgcflw3ez3pkgUM04',
  defender: 'https://buy.stripe.com/9B64gygso7T44iDcZUgUM00',
  protector: 'https://buy.stripe.com/dRm8wOgso1uG16raRMgUM01',
  shield: 'https://buy.stripe.com/9B6bJ05NK1uG6qL9NIgUM03',
  guardian: 'https://buy.stripe.com/eVqcN4gsoflweXh8JEgUM02',
};

export const PRESET_TIERS = [
  {
    id: 'together',
    amount: 2,
    name: 'Together Level',
    tagline: 'A small act of solidarity that helps keep families together.',
    highlight: false,
  },
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
