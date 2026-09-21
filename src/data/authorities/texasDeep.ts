/**
 * Texas deep authorities — Theo citation pack 2026-09-21; copy polished by Sable.
 * Softened absolutes per P2 PASS. Not legal advice.
 */
import type { AuthorityRow } from '../authorityTypes';

export const texasDeepAuthorities: AuthorityRow[] = [
  {
    id: 'tx-fam-261-307',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Fam. Code § 261.307 (HB 730)',
    title: 'Mandatory verbal and written notice of rights',
    summary:
      'At first contact in a qualifying investigation, DFPS is generally required to give both a written summary and verbal notification of listed parental rights (counsel, recording, refusing entry/interview without a court order, withholding certain consents, refusing a drug test, consulting counsel before a voluntary safety plan). If both required notices are not received, information obtained from that person—and information that would not have been discovered without it—is not admissible against that person in a civil proceeding. That is a civil-evidence consequence, not an automatic case dismissal or a universal criminal-evidence bar.',
    parentProtection:
      'Helps you document whether required HB 730 notices were given. If both required notices were missing, that may affect whether what was obtained can be used against you in a civil case—not an automatic dismissal. Ask counsel how it applies to your facts.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.261.htm',
    secondaryUrl: 'https://capitol.texas.gov/tlodocs/88R/billtext/html/HB00730F.htm',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Applies to investigations of reports made on/after Sept. 1, 2023 (HB 730 transition). Not an automatic win.',
    tags: ['texas', 'hb730', 'notice', 'civil-inadmissibility', 'recording'],
    relatedIds: ['tx-fam-261-303', 'tx-penal-16-02', 'tx-fam-261-3027'],
  },
  {
    id: 'tx-fam-261-303',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Fam. Code § 261.303',
    title: 'Investigation access and court orders in aid of investigation',
    summary:
      'Parents are often told they may refuse home entry or a child interview without a court order, but the statute also authorizes courts—on good cause or probable cause standards described in the text—to order entrance, exams, or records access, with limits on ex parte hearings. Constitutional exigency, warrants, consent, and other authorities can change what happens at the door.',
    parentProtection:
      'Generally supports declining home entry or a child interview without a court order—but warrants, exigency, consent, or a court order can change what happens. Avoid absolute “they can never enter” claims.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.261.htm',
    secondaryUrl: 'https://capitol.texas.gov/tlodocs/88R/billtext/html/HB00730F.htm',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Do not use absolute “police/DFPS can never enter” slogans.',
    tags: ['texas', 'entry', 'order-in-aid', 'fourth-amendment-adjacent'],
    relatedIds: ['tx-fam-261-307', 'us-scotus-camara-1967'],
  },
  {
    id: 'tx-fam-261-3027',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Fam. Code § 261.3027',
    title: 'Alleged-perpetrator interview recording notice',
    summary:
      'Before interviewing an alleged perpetrator, DFPS must generally give oral and written notice that the person may create an audio or video recording of the interview (not “in any other manner”), that the recording may be subject to subpoena under a court order, and that the person may request DFPS’s recording policy. Identifying web posting of such interview recordings is restricted by statute.',
    parentProtection:
      'Supports asking for the statutory recording notice before an alleged-perpetrator interview and documenting what you were told.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.261.htm',
    secondaryUrl: 'https://capitol.texas.gov/tlodocs/87R/billtext/html/HB00135F.HTM',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Overlaps with, but is not identical to, § 261.307 recording notice.',
    tags: ['texas', 'recording', 'alleged-perpetrator'],
    relatedIds: ['tx-fam-261-307', 'tx-penal-16-02'],
  },
  {
    id: 'tx-penal-16-02',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Penal Code § 16.02',
    title: 'One-party consent recording (general)',
    summary:
      'Texas is generally a one-party-consent state: a person not acting under color of law may typically intercept a communication if they are a party or one party has consented, subject to expectation-of-privacy and unlawful-purpose limits. DFPS-related recording rights also appear in Family Code § 261.307 (and alleged-perpetrator interview rules in § 261.3027).',
    parentProtection:
      'Texas is generally a one-party-consent state (Penal Code § 16.02). DFPS-related recording rights also appear in Family Code § 261.307. Not legal advice.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/PE/htm/PE.16.htm',
    secondaryUrl: 'https://www.rcfp.org/reporters-recording-guide/texas/',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Interstate calls, hidden cameras, and recording people you are not a party to can change the analysis.',
    tags: ['texas', 'recording-consent', 'one-party'],
    relatedIds: ['tx-fam-261-307', 'tx-fam-261-3027'],
  },
  {
    id: 'tx-fam-262-201',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Fam. Code § 262.201',
    title: 'Adversary hearing timing after removal',
    summary:
      'In covered removal suits, a full adversary hearing is generally held not later than the 14th day after the child was taken into possession, unless the court grants a statutory extension. Local practice and case law affect how delays are treated—ask counsel what applies in your county.',
    parentProtection:
      'Helps you track the post-removal adversary-hearing clock. Timing is generally within about 14 days—subject to statutory exceptions and local scheduling.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.262.htm',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Subject to statutory exceptions; not an automatic case-ending rule for every delay.',
    tags: ['texas', 'removal', 'adversary-hearing', 'deadlines'],
    relatedIds: ['tx-fam-263-401'],
  },
  {
    id: 'tx-fam-263-401',
    jurisdiction: 'TX',
    kind: 'statute',
    citation: 'Tex. Fam. Code § 263.401',
    title: 'One-year dismissal deadline and limited extension',
    summary:
      'Unless trial on the merits has commenced or the court grants a qualifying extension, on the first Monday after the first anniversary of DFPS’s temporary managing conservatorship appointment the court generally loses jurisdiction and the suit is automatically dismissed. The court may retain the suit for a period not to exceed 180 days after that deadline only with required findings. This is a powerful timeline—not a guaranteed outcome.',
    parentProtection:
      'Helps you track the roughly one-year dismissal clock and any ≤180-day extension findings. Powerful timeline—not an automatic win.',
    officialUrl: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.263.htm',
    lastVerified: '2026-09-21',
    confidence: 'high',
    caveat: 'Subject to statutory exceptions and how “commenced the trial on the merits” is applied.',
    tags: ['texas', 'tpr', 'deadlines', 'dismissal'],
    relatedIds: ['tx-fam-262-201', 'us-scotus-santosky-1982'],
  },
];
