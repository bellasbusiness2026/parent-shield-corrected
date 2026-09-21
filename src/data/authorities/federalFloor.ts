/**
 * Federal constitutional floor — parent-facing authority rows.
 * Holdings verified by Theo (2026-09-21). Copy polished by Sable.
 * Not legal advice. Texas procedure and court orders still control day to day.
 */

import type { AuthorityRow } from '../authorityTypes';

/** Shared federal-floor disclaimer for UI chrome near this set. */
export const FEDERAL_FLOOR_DISCLAIMER =
  'These U.S. Supreme Court cases set a federal constitutional floor—not a substitute for Texas law, a promise of any outcome, or legal advice. Texas statutes, DFPS practice, and court orders still control day-to-day procedure. Talk with a licensed Texas attorney or appointed counsel about your situation.';

export const federalFloorAuthorities: AuthorityRow[] = [
  {
    id: 'us-scotus-camara-1967',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Camara v. Municipal Court, 387 U.S. 523 (1967)',
    title: 'Camara v. Municipal Court',
    summary:
      'For nonemergency administrative housing inspections of private homes, the Fourth Amendment generally requires a warrant. You generally cannot be prosecuted simply for refusing a warrantless housing inspection. Administrative “probable cause” for that warrant may rest on reasonable area-wide standards—not only on a suspected violation in your specific home.',
    parentProtection:
      'Supports that government home entry for inspection is not automatically warrant-free: consent, a warrant, or a recognized exception (such as a true emergency) still matters. It does not decide every DFPS home visit—Texas procedure and the facts of your case control.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/387/523/',
    secondaryUrl:
      'https://tile.loc.gov/storage-services/service/ll/usrep/usrep387/usrep387523/usrep387523.pdf',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Emergencies and other defined exceptions remain. Not a full CPS playbook or a criminal-warrant rule for every investigation.',
    tags: ['fourth-amendment', 'administrative-search', 'home-entry', 'federal-floor'],
    relatedIds: [],
    meta: {
      year: 1967,
      court: 'U.S. Supreme Court',
      volume: 387,
      reporter: 'U.S.',
      page: 523,
    },
  },
  {
    id: 'us-scotus-stanley-1972',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Stanley v. Illinois, 405 U.S. 645 (1972)',
    title: 'Stanley v. Illinois',
    summary:
      'Due process required a hearing on an unwed father’s fitness before the State took his children; fitness could not be presumed from marital status alone. Denying him the hearing afforded other parents also violated equal protection.',
    parentProtection:
      'Reinforces that lasting removal based on status presumptions generally needs an individualized fitness hearing—not a free pass around Texas emergency-removal statutes or Family Code timelines.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/405/645/',
    secondaryUrl: 'https://www.law.cornell.edu/supremecourt/text/405/645',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Federal hearing floor. Does not veto all temporary emergency removals under Texas law.',
    tags: ['due-process', 'equal-protection', 'fitness-hearing', 'federal-floor'],
    relatedIds: ['us-scotus-troxel-2000', 'us-scotus-santosky-1982'],
    meta: {
      year: 1972,
      court: 'U.S. Supreme Court',
      volume: 405,
      reporter: 'U.S.',
      page: 645,
    },
  },
  {
    id: 'us-scotus-troxel-2000',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Troxel v. Granville, 530 U.S. 57 (2000)',
    title: 'Troxel v. Granville',
    summary:
      'Fit parents have a fundamental Due Process interest in the care, custody, and control of their children. As applied, Washington’s unusually broad nonparent visitation statute failed to give special weight to a fit parent’s decision and unconstitutionally infringed that interest.',
    parentProtection:
      'Modern lead cite that a fit parent’s childrearing decisions carry constitutional weight against casual third-party overrides. Not a CPS search case and not a guaranteed outcome in any dispute.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/530/57/',
    secondaryUrl: 'https://www.law.cornell.edu/supct/html/99-138.ZO.html',
    lastVerified: '2026-09-21',
    confidence: 'medium',
    caveat:
      'Plurality opinion; as-applied holding. The Court left open whether a showing of harm is always required.',
    tags: ['due-process', 'parental-rights', 'visitation', 'federal-floor'],
    relatedIds: ['us-scotus-stanley-1972'],
    meta: {
      year: 2000,
      court: 'U.S. Supreme Court',
      volume: 530,
      reporter: 'U.S.',
      page: 57,
      docket: '99-138',
    },
  },
  {
    id: 'us-scotus-santosky-1982',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'Santosky v. Kramer, 455 U.S. 745 (1982)',
    title: 'Santosky v. Kramer',
    summary:
      'Before a State may completely and irrevocably terminate parental rights, due process requires proof by at least clear and convincing evidence. A mere preponderance standard is constitutionally inadequate for that permanent severance.',
    parentProtection:
      'Federal minimum burden for permanent termination of parental rights (TPR). Intermediate CPS findings and temporary orders may use different standards under Texas law.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/455/745/',
    secondaryUrl: 'https://www.law.cornell.edu/supremecourt/text/455/745',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Applies to complete, irrevocable TPR—not every temporary or intermediate CPS finding.',
    tags: ['due-process', 'tpr', 'burden-of-proof', 'federal-floor'],
    relatedIds: ['us-scotus-mlb-1996'],
    meta: {
      year: 1982,
      court: 'U.S. Supreme Court',
      volume: 455,
      reporter: 'U.S.',
      page: 745,
    },
  },
  {
    id: 'us-scotus-mlb-1996',
    jurisdiction: 'federal',
    kind: 'case',
    citation: 'M.L.B. v. S.L.J., 519 U.S. 102 (1996)',
    title: 'M.L.B. v. S.L.J.',
    summary:
      'If a State offers an appeal from a decree that forever terminates parental rights, it may not deny an indigent parent a record complete enough for appellate review solely because the parent cannot prepay transcript or record fees.',
    parentProtection:
      'Poverty alone should not bolt the door on a permanent-TPR appeal that depends on the trial record. Check Texas IFP and transcript practice for the operational path.',
    officialUrl: 'https://supreme.justia.com/cases/federal/us/519/102/',
    secondaryUrl: 'https://www.law.cornell.edu/supct/html/95-853.ZO.html',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat:
      'Narrow: permanent TPR appeals when the State provides an appeal—not a general free-civil-appeal right.',
    tags: ['due-process', 'equal-protection', 'tpr', 'indigent-access', 'federal-floor'],
    relatedIds: ['us-scotus-santosky-1982'],
    meta: {
      year: 1996,
      court: 'U.S. Supreme Court',
      volume: 519,
      reporter: 'U.S.',
      page: 102,
      docket: '95-853',
    },
  },
];
