import { SupportPledge } from '../types';

export const STORAGE_KEY_PLEDGES = 'parentshield_support_pledges_v2';

/** Community wall starts empty — only real pledges from users. No sample/fabricated entries. */
export const INITIAL_COMMUNITY_PLEDGES: SupportPledge[] = [];

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
