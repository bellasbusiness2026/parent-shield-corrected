import { LegalAuthorityInfo } from "../types";

export const LEGAL_AUTHORITIES: LegalAuthorityInfo[] = [
  {
    code: "U.S. Const. Amend. IV",
    title: "Fourth Amendment - Warrantless Search & Seizure Ban",
    category: "Constitutional",
    summary: "Prohibits government agents (including DFPS caseworkers and accompanying law enforcement) from entering a private residence or seizing children without a judicially issued warrant or proven exigent circumstances.",
    protection: "Refusing entry to your home without a court order is a federally protected constitutional right. Silence or polite refusal cannot be construed as consciousness of guilt.",
    keyQuote: "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated."
  },
  {
    code: "U.S. Const. Amend. XIV",
    title: "Fourteenth Amendment - Substantive & Procedural Due Process",
    category: "Constitutional",
    summary: "Protects fundamental liberty interests in the care, custody, and management of children. Guards against arbitrary state interference and coerced agreements under due process principles.",
    protection: "The state cannot arbitrarily demand access to your children, compel medical examinations, or alter custody arrangements without procedural due process.",
    keyQuote: "Nor shall any State deprive any person of life, liberty, or property, without due process of law."
  },
  {
    code: "Troxel v. Granville, 530 U.S. 57 (2000)",
    title: "Presumption of Parental Fitness",
    category: "Supreme Court Precedent",
    summary: "The U.S. Supreme Court affirmed that fit parents are presumed to act in the best interests of their children. The state may not inject itself into private family life without demonstrating unfitness.",
    protection: "The burden of proof remains entirely on the State. Parents do not have to prove their fitness to an investigator; the state must prove unfitness with concrete evidence.",
    keyQuote: "There is a presumption that fit parents act in the best interests of their children... The Due Process Clause does not permit a State to infringe on the fundamental right of parents."
  },
  {
    code: "Santosky v. Kramer, 455 U.S. 745 (1982)",
    title: "Clear and Convincing Evidentiary Standard",
    category: "Supreme Court Precedent",
    summary: "Parental rights cannot be severed under a mere 'preponderance of the evidence'. Strict clear-and-convincing evidence is the constitutional floor required by the 14th Amendment.",
    protection: "DFPS cannot rely on vague rumors, uncorroborated third-party tips, or speculative agency opinions to sever parental rights.",
    keyQuote: "Before a State may sever completely and irrevocably the rights of parents in their natural child, due process requires that the State support its allegations by at least clear and convincing evidence."
  },
  {
    code: "Texas Family Code § 261.307 (HB 730)",
    title: "Mandatory Information Disclosed at Initial Contact & Exclusionary Bar",
    category: "Texas Family Code",
    summary: "At first contact, DFPS caseworkers are legally required under HB 730 to provide BOTH verbal and written notice of parental rights: right to legal counsel, right to record audio/video of all interviews, right to refuse entry, right to withhold child/records, and right to refuse drug testing.",
    protection: "If required verbal and written notices under TFC § 261.307 are missing, information obtained (and derivative information) may be inadmissible in civil proceedings. This is not a universal criminal bar or automatic case dismissal.",
    keyQuote: "Before conducting an interview of a person alleged to have abused or neglected a child or a parent... the department shall provide verbal and written notice of rights..."
  },
  {
    code: "Texas Family Code § 261.303",
    title: "Interference with Investigation & Lawful Refusal of Entry",
    category: "Texas Family Code",
    summary: "Refusal to permit a caseworker to enter the home or interview a child is an explicit lawful right. The Department may NOT force entry; its only legal recourse is petitioning a district court for an 'Order in Aid of Investigation' supported by probable cause.",
    protection: "Refusing entry without a court order is generally protected under TFC § 261.303; outcomes are fact-specific and exceptions (e.g., warrant, exigency) can apply. DFPS may petition a court for an Order in Aid of Investigation.",
    keyQuote: "If admission to the home... is refused, the department may petition the court for an order in aid of an investigation."
  },
  {
    code: "Texas Family Code § 262.201",
    title: "Mandatory 14-Day Adversary Hearing Post-Removal",
    category: "Texas Family Code",
    summary: "If DFPS removes a child under emergency circumstances without a prior hearing, a full adversary hearing is generally required within 14 days of removal (subject to statutory exceptions). The court generally must return the child unless DFPS proves urgent necessity.",
    protection: "Statutory clock: DFPS generally cannot hold a child indefinitely on administrative claims alone. They must present sworn testimony and evidence under judicial scrutiny within the statutory timeframe, subject to recognized exceptions.",
    keyQuote: "A full adversary hearing shall be held not later than the 14th day after the date the child was taken into possession by the governmental entity."
  },
  {
    code: "Texas Family Code § 263.401",
    title: "The Strict 1-Year Dismissal Deadline ('Drop-Dead Date')",
    category: "Texas Family Code",
    summary: "Any suit filed by DFPS requesting managing conservatorship or termination of parental rights is generally dismissed automatically by operation of law on the first Monday following the 1-year anniversary of DFPS being appointed temporary managing conservator, subject to statutory exceptions (including a possible one-time 180-day extension).",
    protection: "Generally limits how long DFPS can keep families in open litigation. If the case is not tried within 1 year (or granted a one-time 180-day extraordinary extension where authorized), the court generally loses jurisdiction and the suit is dismissed by operation of law—subject to statutory exceptions.",
    keyQuote: "Unless the court has commenced the trial on the merits... the court's jurisdiction over the suit... is terminated and the suit is automatically dismissed without a court order."
  }
];
