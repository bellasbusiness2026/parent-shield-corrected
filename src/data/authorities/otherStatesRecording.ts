/**
 * Other-state recording-consent authorities — Theo 2026-09-21.
 */
import type { AuthorityRow } from '../authorityTypes';

export const OTHER_STATE_RECORDING_FOOTNOTE =
  'Recording laws differ by state and by situation. Interstate calls, hidden cameras, and CPS-specific rules may differ from this general map. Not legal advice.';

type Consent = 'one-party' | 'all-party' | 'mixed/unclear';
type Confidence = 'high' | 'medium' | 'low';
type Spec = [string, Consent, string, string, string, Confidence];

const specs: Spec[] = [
  ['AL', 'one-party', 'Ala. Code § 13A-11-30 et seq.', 'Alabama — recording consent (one-party)', 'https://alison.legislature.state.al.us/code-of-alabama', 'medium'],
  ['AK', 'one-party', 'Alaska Stat. § 42.20.310 et seq.', 'Alaska — recording consent (one-party)', 'https://www.akleg.gov/basis/statutes.asp#42.20.310', 'medium'],
  ['AZ', 'one-party', 'Ariz. Rev. Stat. § 13-3005', 'Arizona — recording consent (one-party)', 'https://www.azleg.gov/arsDetail/?title=13', 'medium'],
  ['AR', 'one-party', 'Ark. Code Ann. § 5-60-120', 'Arkansas — recording consent (one-party)', 'https://www.arkleg.state.ar.us/', 'medium'],
  ['CA', 'all-party', 'Cal. Penal Code § 632', 'California — recording consent (all-party)', 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=632', 'high'],
  ['CO', 'one-party', 'Colo. Rev. Stat. § 18-9-303', 'Colorado — recording consent (one-party)', 'https://leg.colorado.gov/', 'medium'],
  ['CT', 'mixed/unclear', 'Conn. Gen. Stat. § 52-570d; §§ 53a-187, 53a-189', 'Connecticut — recording consent (mixed/unclear)', 'https://www.cga.ct.gov/current/pub/chap_925.htm#sec_52-570d', 'medium'],
  ['DE', 'mixed/unclear', 'Del. Code Ann. tit. 11, § 1335', 'Delaware — recording consent (mixed/unclear)', 'https://delcode.delaware.gov/title11/c005/sc07/index.html', 'medium'],
  ['DC', 'one-party', 'D.C. Code § 23-542', 'District of Columbia — recording consent (one-party)', 'https://code.dccouncil.gov/us/dc/council/code/sections/23-542', 'medium'],
  ['FL', 'all-party', 'Fla. Stat. § 934.03', 'Florida — recording consent (all-party)', 'https://www.flsenate.gov/Laws/Statutes/2024/0934.03', 'high'],
  ['GA', 'one-party', 'Ga. Code Ann. § 16-11-62', 'Georgia — recording consent (one-party)', 'https://www.legis.ga.gov/', 'medium'],
  ['HI', 'mixed/unclear', 'Haw. Rev. Stat. § 803-42', 'Hawaii — recording consent (mixed/unclear)', 'https://www.capitol.hawaii.gov/hrscurrent/', 'medium'],
  ['ID', 'one-party', 'Idaho Code § 18-6702', 'Idaho — recording consent (one-party)', 'https://legislature.idaho.gov/statutesrules/idstat/', 'medium'],
  ['IL', 'all-party', '720 ILCS 5/14-1 to 5/14-9', 'Illinois — recording consent (all-party)', 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=1876&ChapterID=53', 'high'],
  ['IN', 'one-party', 'Ind. Code § 35-33.5-1-5', 'Indiana — recording consent (one-party)', 'https://iga.in.gov/laws/2024/ic/titles/35', 'medium'],
  ['IA', 'one-party', 'Iowa Code § 808B.2', 'Iowa — recording consent (one-party)', 'https://www.legis.iowa.gov/law/iowaCode', 'medium'],
  ['KS', 'one-party', 'Kan. Stat. Ann. § 21-6101', 'Kansas — recording consent (one-party)', 'https://www.ksrevisor.gov/', 'medium'],
  ['KY', 'one-party', 'Ky. Rev. Stat. § 526.010 et seq.', 'Kentucky — recording consent (one-party)', 'https://legislature.ky.gov/Law/Statutes/', 'medium'],
  ['LA', 'one-party', 'La. Rev. Stat. § 15:1303', 'Louisiana — recording consent (one-party)', 'https://legis.la.gov/legis/Law.aspx?d=78383', 'medium'],
  ['ME', 'mixed/unclear', 'Me. Rev. Stat. tit. 15, § 710', 'Maine — recording consent (mixed/unclear)', 'https://legislature.maine.gov/statutes/15/title15sec710.html', 'medium'],
  ['MD', 'all-party', 'Md. Code, Cts. & Jud. Proc. § 10-402', 'Maryland — recording consent (all-party)', 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gcj&section=10-402', 'high'],
  ['MA', 'all-party', 'Mass. Gen. Laws ch. 272, § 99', 'Massachusetts — recording consent (all-party)', 'https://malegislature.gov/Laws/GeneralLaws/PartIV/TitleI/Chapter272/Section99', 'high'],
  ['MI', 'mixed/unclear', 'Mich. Comp. Laws § 750.539c', 'Michigan — recording consent (mixed/unclear)', 'https://www.legislature.mi.gov/Laws/MCL?objectName=MCL-750-539C', 'medium'],
  ['MN', 'one-party', 'Minn. Stat. § 626A.02', 'Minnesota — recording consent (one-party)', 'https://www.revisor.mn.gov/statutes/cite/626A.02', 'medium'],
  ['MS', 'one-party', 'Miss. Code Ann. § 41-29-531', 'Mississippi — recording consent (one-party)', 'https://www.legislature.ms.gov/', 'low'],
  ['MO', 'mixed/unclear', 'Mo. Rev. Stat. § 542.402', 'Missouri — recording consent (mixed/unclear)', 'https://revisor.mo.gov/main/OneSection.aspx?section=542.402', 'medium'],
  ['MT', 'all-party', 'Mont. Code Ann. § 45-8-213', 'Montana — recording consent (all-party)', 'https://archive.legmt.gov/bills/mca/title_0450/chapter_0080/part_0020/section_0130/0450-0080-0020-0130.html', 'medium'],
  ['NE', 'one-party', 'Neb. Rev. Stat. § 86-290', 'Nebraska — recording consent (one-party)', 'https://nebraskalegislature.gov/laws/statutes.php?statute=86-290', 'medium'],
  ['NV', 'mixed/unclear', 'NRS 200.620; 200.650', 'Nevada — recording consent (mixed/unclear)', 'https://www.leg.state.nv.us/NRS/NRS-200.html#NRS200Sec620', 'medium'],
  ['NH', 'all-party', 'N.H. Rev. Stat. Ann. § 570-A:2', 'New Hampshire — recording consent (all-party)', 'https://www.gencourt.state.nh.us/rsa/html/LVIII/570-A/570-A-2.htm', 'high'],
  ['NJ', 'one-party', 'N.J. Stat. Ann. § 2A:156A-4', 'New Jersey — recording consent (one-party)', 'https://www.njleg.state.nj.us/', 'medium'],
  ['NM', 'one-party', 'N.M. Stat. Ann. § 30-12-1', 'New Mexico — recording consent (one-party)', 'https://nmonesource.com/nmos/nmsa/en/nav_date.do', 'medium'],
  ['NY', 'one-party', 'N.Y. Penal Law § 250.05', 'New York — recording consent (one-party)', 'https://www.nysenate.gov/legislation/laws/PEN/250.05', 'medium'],
  ['NC', 'one-party', 'N.C. Gen. Stat. § 15A-287', 'North Carolina — recording consent (one-party)', 'https://www.ncleg.gov/Laws/GeneralStatuteSections/Chapter15A', 'medium'],
  ['ND', 'one-party', 'N.D. Cent. Code § 12.1-15-02', 'North Dakota — recording consent (one-party)', 'https://www.ndlegis.gov/general-information/north-dakota-century-code', 'medium'],
  ['OH', 'one-party', 'Ohio Rev. Code § 2933.52', 'Ohio — recording consent (one-party)', 'https://codes.ohio.gov/ohio-revised-code/section-2933.52', 'medium'],
  ['OK', 'one-party', 'Okla. Stat. tit. 13, § 176.4', 'Oklahoma — recording consent (one-party)', 'https://www.oscn.net/applications/oscn/index.asp?ftdb=STOKST&level=1', 'medium'],
  ['OR', 'mixed/unclear', 'Or. Rev. Stat. § 165.540', 'Oregon — recording consent (mixed/unclear)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors165.html', 'medium'],
  ['PA', 'all-party', '18 Pa. Cons. Stat. § 5703–5704', 'Pennsylvania — recording consent (all-party)', 'https://www.legis.state.pa.us/cfdocs/legis/LI/consCheck.cfm?txtType=HTM&ttl=18&div=0&chpt=57', 'high'],
  ['RI', 'one-party', 'R.I. Gen. Laws § 11-35-21', 'Rhode Island — recording consent (one-party)', 'https://webserver.rilin.state.ri.us/Statutes/TITLE11/11-35/11-35-21.HTM', 'medium'],
  ['SC', 'one-party', 'S.C. Code Ann. § 17-30-30', 'South Carolina — recording consent (one-party)', 'https://www.scstatehouse.gov/code/t17c030.php', 'medium'],
  ['SD', 'one-party', 'S.D. Codified Laws § 23A-35A-20', 'South Dakota — recording consent (one-party)', 'https://sdlegislature.gov/Statutes/23A-35A-20', 'medium'],
  ['TN', 'one-party', 'Tenn. Code Ann. § 39-13-601', 'Tennessee — recording consent (one-party)', 'https://www.capitol.tn.gov/', 'medium'],
  ['TX', 'one-party', 'Tex. Penal Code § 16.02', 'Texas — recording consent (one-party)', 'https://statutes.capitol.texas.gov/Docs/PE/htm/PE.16.htm', 'high'],
  ['UT', 'one-party', 'Utah Code § 77-23a-4', 'Utah — recording consent (one-party)', 'https://le.utah.gov/xcode/Title77/Chapter23A/77-23a-S4.html', 'medium'],
  ['VT', 'one-party', '18 U.S.C. § 2511', 'Vermont — recording consent (one-party)', 'https://www.law.cornell.edu/uscode/text/18/2511', 'medium'],
  ['VA', 'one-party', 'Va. Code § 19.2-62', 'Virginia — recording consent (one-party)', 'https://law.lis.virginia.gov/vacode/title19.2/chapter6/section19.2-62/', 'medium'],
  ['WA', 'all-party', 'Wash. Rev. Code § 9.73.030', 'Washington — recording consent (all-party)', 'https://app.leg.wa.gov/RCW/default.aspx?cite=9.73.030', 'high'],
  ['WV', 'one-party', 'W. Va. Code § 62-1D-3', 'West Virginia — recording consent (one-party)', 'https://code.wvlegislature.gov/62-1D-3/', 'medium'],
  ['WI', 'one-party', 'Wis. Stat. § 968.31', 'Wisconsin — recording consent (one-party)', 'https://docs.legis.wisconsin.gov/statutes/statutes/968/31', 'medium'],
  ['WY', 'one-party', 'Wyo. Stat. Ann. § 7-3-702', 'Wyoming — recording consent (one-party)', 'https://wyoleg.gov/statutes/compress/title07.pdf', 'medium'],
];

export const otherStateRecordingAuthorities: AuthorityRow[] = specs.map(([stateCode, consent, citation, title, officialUrl, confidence]) => ({
  id: `us-${stateCode.toLowerCase()}-recording-consent`,
  jurisdiction: 'other-state',
  stateCode,
  kind: 'statute',
  citation,
  title,
  summary: `Generally ${consent} for participant recording, subject to privacy, interstate, and situation-specific limits.`,
  parentProtection: `Generally ${consent} for participant recording, subject to privacy, interstate, and situation-specific limits. ${OTHER_STATE_RECORDING_FOOTNOTE}`,
  officialUrl,
  lastVerified: '2026-09-21',
  confidence,
  caveat: 'Confirm current statute text and the facts of the recording; this general map is not legal advice.',
  tags: ['recording-consent', consent],
  relatedIds: [],
}));
