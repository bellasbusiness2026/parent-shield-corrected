export interface LetterTemplate {
  id: string;
  title: string;
  category: 'Paper Trail Rule' | 'Refusal of Voluntary Demand' | 'Statutory Rights Assertion' | 'Safety Plan / Custody';
  description: string;
  subjectLine: string;
  body: string;
}

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: "post-conversation-confirmation",
    title: "Post-Contact Confirmation Email (The Paper Trail Rule)",
    category: "Paper Trail Rule",
    description: "Follow-up email immediately following any in-person door visit, phone call, or verbal exchange with a caseworker to document key points, classify voluntary vs mandatory demands, and establish an audit trail.",
    subjectLine: "RE: Written Confirmation of Verbal Communication on [Date] at [Time] - Case ID: [Case ID / Family Name]",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS Investigator / Caseworker ([Caseworker Email])
CC: [Supervisor Name if applicable] ([Supervisor Email])
From: [Parent Full Name] ([Parent Email Address])
RE: Written Memorialization of Conversation Regarding [Child Name(s)] - Case #[Case ID]

Dear [Caseworker Name],

I am writing this communication to promptly confirm our verbal conversation today, [Date], at approximately [Time], regarding your inquiries concerning my family. In accordance with the "Paper Trail Rule" and administrative best practices, this email serves to confirm our discussion and ensure both parties maintain an accurate, objective written record of all key points discussed.

1. SUMMARY OF CONVERSATION & CASEWORKER INQUIRIES:
During our verbal exchange, you discussed the following points and communicated the following requests:
- [Prompt: Summarize the conversation and detail each request made by the caseworker, e.g., 'You requested that I submit to a voluntary drug screening, allow an unannounced inspection of my home, and provide signed medical release forms.']
- [Prompt: Detail any deadlines or verbal statements made by the worker, e.g., 'You stated that you needed a response by Friday at 5:00 PM.']

2. VOLUNTARY VERSUS MANDATORY DEMAND CLASSIFICATION:
To ensure mutual legal clarity and prevent misunderstandings regarding statutory authority:
- Absence of Judicial Order: During our discussion, you did not present or provide a signed judicial order, search warrant, or "Order in Aid of Investigation" executed by a court of competent jurisdiction under Texas Family Code § 261.303.
- Voluntary Nature: As no signed court order was provided, I understand that all requests made during our conversation—including requests for warrantless entry into my private home, execution of administrative releases, submission to drug or alcohol screenings, or child interviews—constitute voluntary administrative requests rather than legally mandatory demands.
- Mandatory Action Requirement: If the Department contends that any of the aforementioned requests are legally mandatory rather than voluntary, please immediately provide a certified copy of the underlying judicial court order compelling such action.

3. PARENT'S RESPONSE & INVOCATION OF STATUTORY RIGHTS:
In response to your verbal requests, please note my formal position:
- [Prompt: State your specific response to each request, e.g., 'As there is no court order compelling a home inspection or drug screening, I respectfully decline these voluntary requests at this time.']
- Right to Legal Counsel (TFC § 261.307(a)(1)): I am exercising my statutory right to consult with an attorney before executing any Department paperwork, signing any parental child safety plans, or submitting to formal questioning.
- Right to Written Communication: To eliminate confusion and protect the integrity of the record, all future requests, notices, or inquiries from DFPS must be submitted to me in writing via this email address.
- Notice of Audio/Video Recording (TFC § 261.307(a)(2)): As generally authorized under Texas one-party-consent law and DFPS notice provisions, please be advised that all future interactions and meetings will be audio and/or video recorded. Recording and consent rules can vary by situation; this note is general Texas information, not legal advice.

Please confirm receipt of this email to verify that this memorialization accurately reflects our conversation. If you believe any portion of this summary is inaccurate, please reply promptly in writing (suggested practice: within a few business days) specifying the Department's corrections. This reply window is suggested practice, not a statutory deadline.

Respectfully,

[Parent Signature / Name]
[Parent Phone Number]
[Parent Physical Address / County]`
  },
  {
    id: "refusal-warrantless-entry",
    title: "Response to Warrantless Home Entry Request (TFC § 261.303)",
    category: "Refusal of Voluntary Demand",
    description: "Formal written response documenting lawful refusal of caseworker entry absent a judicially signed 'Order in Aid of Investigation' or search warrant.",
    subjectLine: "RE: Texas DFPS Request for Home Entry - Notice of Constitutional and Statutory Rights (TFC § 261.303)",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Investigator, Texas DFPS
CC: [Supervisor Name if known]
From: [Parent Full Name]
RE: Department Request to Inspect Residence - Notice Under TFC § 261.303 & 4th Amendment

Dear [Caseworker Name],

This letter addresses your verbal request on [Date] at [Time] to enter and inspect my private residence located at [Address].

Please be advised of the following administrative and constitutional positions:
1. Constitutional Protection: Under the Fourth Amendment to the United States Constitution and Article I, Section 9 of the Texas Constitution, private citizens possess constitutional protection against unreasonable warrantless governmental searches and entries into their homes, generally absent a court order, consent, or recognized exceptions such as exigent circumstances.
2. Statutory Authority (TFC § 261.303): Texas Family Code § 261.303 explicitly establishes that a parent's refusal to grant admission to their residence during a child protective investigation is lawful. The statute specifically delineates that should the Department seek compelled entry, its sole lawful remedy is to petition a court of competent jurisdiction for an 'Order in Aid of Investigation' based upon sworn evidence of probable cause.
3. Non-Admission of Guilt: My exercise of this constitutional and statutory right is not an admission of any wrongdoing and cannot be lawfully construed as consciousness of guilt or lack of parental cooperation under Troxel v. Granville, 530 U.S. 57.

If the Department has obtained a certified judicial order signed by a judge granting lawful authority to enter my residence, please transmit a complete copy of that order to me in writing immediately. 

In the absence of a signed court order, I respectfully decline voluntary administrative entry. All questions or requests for relevant non-privileged information should be submitted to me in writing.

Sincerely,

[Parent Signature / Name]
[Parent Contact Info]`
  },
  {
    id: "refusal-voluntary-drug-test",
    title: "Refusal of Voluntary Substance Screening (TFC § 261.307(a)(4))",
    category: "Refusal of Voluntary Demand",
    description: "Asserts the right to decline voluntary drug or alcohol screening absent a signed court order, enforcing HB 730 protections.",
    subjectLine: "RE: Voluntary Substance Testing Request - Notice Under Texas Family Code § 261.307(a)(4)",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS
From: [Parent Full Name]
RE: Request for Substance Screening

Dear [Caseworker Name],

Confirming our communication on [Date] at [Time], during which you requested that I submit to [urinalysis / hair follicle / oral fluid] substance screening.

Please be advised of the following:
1. Statutory Right to Refuse (TFC § 261.307(a)(4)): Under Texas Family Code § 261.307, enacted via House Bill 730, Texas law under the cited statute generally provides that a parent may refuse to submit to voluntary drug or alcohol testing during an investigation, absent a court order or other lawful authority.
2. Absence of Judicial Compulsion: As confirmed, there is currently no judicial order signed by a court directing me to undergo drug testing. In the absence of a signed court order, any testing demand is an administrative request.
3. Decision: Exercising my statutory rights under Texas law and upon due consideration, I decline to participate in voluntary testing at this time. 

I remain willing to receive any specific, written inquiries the Department has concerning my family's welfare. Please ensure this notice is incorporated into the administrative case file.

Respectfully,

[Parent Signature / Name]
[Parent Contact Info]`
  },
  {
    id: "refusal-blanket-records-release",
    title: "Refusal of Blanket Medical, Mental Health & School Records Release",
    category: "Refusal of Voluntary Demand",
    description: "Rejects broad, un-tailored HIPAA and FERPA authorization forms that DFPS routinely requests parents to sign blindly.",
    subjectLine: "RE: Request for Universal Authorization to Disclose Confidential Records - Case: [Case Name]",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS
From: [Parent Full Name]
RE: Agency Request for Authorization for Release of Protected Information

Dear [Caseworker Name],

I am in receipt of the blanket Authorization for Release of Information forms provided by the Department on [Date].

Having reviewed these documents:
1. Excessive and Vague Scope: The forms requested constitute a blanket, unrestricted waiver of confidential medical, mental health, therapy, educational, and psychological records without temporal limitation, specific custodian designation, or narrow relevance to any substantiated factual allegation.
2. Statutory and Constitutional Rights: Under Texas Family Code § 261.307(a)(5), parents possess the legal right to withhold consent for the release of confidential records. Furthermore, private medical and mental health records are safeguarded by state statutory privilege and the Fourth and Fourteenth Amendments.
3. Decision: I decline to execute the blanket authorization forms as tendered. If the Department believes specific, narrowly defined records are necessary to address an identified safety concern, please specify in writing:
   (a) The exact records requested;
   (b) The specific custodian;
   (c) The precise statutory basis under which access is sought; and
   (d) The exact time period covered.

Upon receipt of a narrowly tailored written request, I will evaluate the request with legal counsel.

Sincerely,

[Parent Signature / Name]
[Parent Contact Info]`
  },
  {
    id: "refusal-safety-plan-pcsp",
    title: "Refusal of Coerced 'Safety Plan' or Parental Child Safety Placement (PCSP)",
    category: "Safety Plan / Custody",
    description: "Crucial buffer against signing voluntary 'Safety Plans' that remove children or force parents out of their homes without court oversight.",
    subjectLine: "RE: Proposed Parental Child Safety Placement (PCSP) / Administrative Safety Plan - [Case ID]",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS
CC: [DFPS Supervisor Name]
From: [Parent Full Name]
RE: Proposed Department 'Safety Plan' / PCSP Agreement

Dear [Caseworker Name],

I am writing regarding the proposed 'Safety Plan' / Parental Child Safety Placement (PCSP) document presented to me by the Department on [Date] at [Time].

Please note the following critical legal distinctions:
1. Voluntary Administrative Agreement: A Safety Plan or PCSP is a voluntary administrative document, not a court order. It does not carry judicial authority, nor does it represent a finding of abuse or neglect by a court of law.
2. Fundamental Liberty Rights: Under the Fourteenth Amendment to the U.S. Constitution and the landmark precedent of Troxel v. Granville, 530 U.S. 57 (2000), parents possess a fundamental liberty interest in the custody and care of their children, with a legal presumption of parental fitness that the state cannot arbitrarily dismantle.
3. Refusal to Execute Without Counsel: Because the proposed agreement would alter my physical custody, restrict my parental decision-making, or restrict my presence in my own home without procedural due process or an evidentiary hearing, I decline to execute this document as presented.
4. Demand for Formal Due Process: If the Department contends that exigent circumstances exist requiring court intervention, the Department has the legal authority to seek judicial review under Texas Family Code Chapter 262, where the state must prove its burden under strict evidentiary standards and provide an adversary hearing within 14 days pursuant to TFC § 262.201.

Please communicate all future proposed plans in writing and confirm receipt of this position for the record.

Respectfully,

[Parent Signature / Name]
[Parent Contact Info]`
  },
  {
    id: "notice-right-to-record",
    title: "Notice of Recording & Right to Legal Counsel (TFC § 261.307(a)(2))",
    category: "Statutory Rights Assertion",
    description: "Formally informs the caseworker that all future calls, meetings, and interactions will be recorded as authorized by Texas Family Code.",
    subjectLine: "RE: Formal Notice of Exercise of Statutory Right to Record Communications - TFC § 261.307(a)(2)",
    body: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS
From: [Parent Full Name]
RE: Notice of Recording Pursuant to Texas Family Code § 261.307

Dear [Caseworker Name],

Please be advised that pursuant to Texas Family Code § 261.307(a)(2), enacted through House Bill 730, parents have an explicit statutory right to make an audio or video recording of any interview or interaction conducted by the Department of Family and Protective Services.

In Texas, if you are part of a conversation, Penal Code § 16.02 generally lets you record it without the other person’s consent (one-party consent). For DFPS contact, Family Code § 261.307 also addresses the right to record interactions or interviews, and a recording may later be disclosed under a court order. Extra rules can apply to alleged-perpetrator interviews (§ 261.3027), including limits on posting identifying recordings online. This is general information, not legal advice—ask a Texas attorney about your situation.

Recording and consent rules can vary by situation; this note is general Texas information, not legal advice.

Accordingly:
1. Any and all upcoming telephone conversations, in-person conferences, or unannounced visits conducted by the Department will be recorded in their entirety to preserve an authentic, unaltered administrative audit record, consistent with the statutes cited above.
2. I formally assert my right to have legal counsel present during any formal interviews or discussions regarding allegations.
3. If an investigator or representative of the Department arrives at my residence or contacts me by phone, please be aware that the recording apparatus will be engaged from the outset of the encounter.

This notice is provided as a professional courtesy to promote mutual accountability and transparency.

Respectfully,

[Parent Signature / Name]
[Parent Contact Info]`
  }
];
