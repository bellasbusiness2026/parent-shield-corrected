import { AuthorityRow } from '../authorityTypes';

/** Federal constitutional floor  -  SCOTUS cases (Theo-verified Justia URLs, 2026-09-21). */
export const FEDERAL_FLOOR: AuthorityRow[] = [
  {
    id: 'federal-camara',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Camara v. Municipal Court, 387 U.S. 523 (1967)',
    title: 'Administrative Searches Require a Warrant',
    summary:
      'The Supreme Court held that administrative inspections of private residences generally require a warrant under the Fourth Amendment. Agency convenience alone does not erase the warrant requirement for entering a home.',
    parentProtection:
      'A caseworker or inspector generally cannot treat a routine home visit as an automatic right of entry. Absent consent, a judicial warrant/order, or a recognized exception (such as true exigency), parents may lawfully decline warrantless administrative entry.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/387/523/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Exigent circumstances and other recognized Fourth Amendment exceptions can apply; outcomes are fact-specific. This is legal information, not formal legal counsel.',
    tags: ['fourth-amendment', 'warrantless-entry', 'administrative-search'],
    relatedIds: ['federal-stanley', 'federal-troxel'],
  },
  {
    id: 'federal-stanley',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Stanley v. Illinois, 405 U.S. 645 (1972)',
    title: 'Parents Are Entitled to a Hearing Before Losing Custody',
    summary:
      'The Court held that a parent cannot be presumed unfit and stripped of custody without an individualized hearing that respects due process. Parental fitness is not a rubber stamp for the state.',
    parentProtection:
      'The state generally bears the burden to prove unfitness with process  -  not to force parents to prove fitness on demand. Coerced "voluntary" placements and shortcuts that skip hearings raise serious due-process concerns.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/405/645/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Statutory frameworks and emergency-removal rules vary by state; consult counsel for active litigation.',
    tags: ['fourteenth-amendment', 'due-process', 'custody'],
    relatedIds: ['federal-santosky', 'federal-troxel'],
  },
  {
    id: 'federal-troxel',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Troxel v. Granville, 530 U.S. 57 (2000)',
    title: 'Presumption That Fit Parents Act in Their Child\'s Best Interests',
    summary:
      'The Court reaffirmed that fit parents have a fundamental liberty interest in the care, custody, and control of their children, and that the state may not casually override parental judgment.',
    parentProtection:
      'Investigators and agencies generally may not substitute their preferences for those of a fit parent without meeting constitutional and statutory thresholds. The burden stays with the state.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/530/57/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Troxel involved third-party visitation; its principles inform parental-rights analysis but do not decide every CPS fact pattern.',
    tags: ['fourteenth-amendment', 'parental-fitness', 'best-interests'],
    relatedIds: ['federal-santosky', 'federal-stanley'],
  },
  {
    id: 'federal-santosky',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Santosky v. Kramer, 455 U.S. 745 (1982)',
    title: 'Clear-and-Convincing Evidence Before Terminating Parental Rights',
    summary:
      'Before a state may permanently sever parental rights, due process requires proof by at least clear and convincing evidence  -  not a mere preponderance of rumor or speculation.',
    parentProtection:
      'Termination is an extreme remedy. Vague tips, uncorroborated gossip, or thin administrative opinions generally should not carry the day at the constitutional floor.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/455/745/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Applies to termination proceedings; investigatory stages use different procedural rules. Fact-specific  -  seek licensed counsel for court deadlines.',
    tags: ['fourteenth-amendment', 'termination', 'clear-and-convincing'],
    relatedIds: ['federal-troxel', 'federal-mlb'],
  },
  {
    id: 'federal-mlb',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'M.L.B. v. S.L.J., 519 U.S. 102 (1996)',
    title: 'Access to Appeal When Parental Rights Are at Stake',
    summary:
      'The Court held that a state may not deny a parent a meaningful appeal of a termination decree solely because the parent cannot afford transcript fees, recognizing the gravity of parental-rights cases.',
    parentProtection:
      'Indigency alone should not close the courthouse door when parental rights have been terminated. Parents facing termination should ask counsel about fee waivers and appeal paths.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/519/102/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Procedures for fee waivers and records vary by jurisdiction. This is general federal floor information, not case-specific advice.',
    tags: ['fourteenth-amendment', 'access-to-courts', 'termination-appeal'],
    relatedIds: ['federal-santosky'],
  },
];
