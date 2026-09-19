import React, { useState } from 'react';
import { Printer, Download, Copy, CheckCircle2, Shield, Scale, FileText, AlertOctagon, UserCheck, BookOpen } from 'lucide-react';

export const PrintableOnePager: React.FC = () => {
  const [parentName, setParentName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [attorneyInfo, setAttorneyInfo] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const getPlainTextVersion = () => {
    return `NOTICE OF CONSTITUTIONAL & STATUTORY RIGHTS UNDER TEXAS LAW
PRESENTED TO INVESTIGATORS / CASEWORKERS OF TEXAS DFPS (CPS)
AUTHORITIES: U.S. CONST. AMENDS. IV & XIV; TEXAS FAMILY CODE §§ 261.303, 261.307 (HB 730); TEX. PENAL CODE § 16.02

PARENT / HEAD OF HOUSEHOLD: ${parentName.trim() || '[PARENT FULL NAME]'}
RESIDENCE ADDRESS: ${address.trim() || '[RESIDENTIAL ADDRESS, TEXAS]'}
CONTACT NUMBER: ${phone.trim() || '[PARENT PHONE NUMBER]'}
DFPS CASE / INTAKE ID: ${caseNumber.trim() || '[CASE / INTAKE ID]'}
ATTORNEY OF RECORD (IF RETAINED): ${attorneyInfo.trim() || '[PENDING RETENTION / TO BE DESIGNATED]'}

--------------------------------------------------------------------------------
TO THE INVESTIGATOR OR LAW ENFORCEMENT OFFICER PRESENT:
PLEASE BE FORMALLY ADVISED THAT I AM ASSERTING ALL PROCEDURAL DUE PROCESS, STATUTORY, AND CONSTITUTIONAL RIGHTS UNDER TEXAS AND FEDERAL LAW.

1. REFUSAL OF WARRANTLESS RESIDENTIAL ENTRY (TEXAS FAMILY CODE § 261.303 & U.S. CONST. AMEND. IV)
I hereby decline to consent to any warrantless entry, inspection, search, or photography of my private residence, child living quarters, or personal premises. Under Texas Family Code § 261.303 and the Fourth Amendment, DFPS has NO authority to cross the threshold of this home absent a valid, signed search warrant or "Order in Aid of Investigation" executed by a judge of a court of competent jurisdiction. Administrative refusal does not constitute exigent circumstances or presumptive neglect.

2. MANDATORY STATUTORY DISCLOSURES & EXCLUSIONARY BAR (TEXAS FAMILY CODE § 261.307 - HB 730)
Effective September 1, 2023 under Texas House Bill 730, DFPS investigators are STATUTORILY MANDATED to deliver both verbal and written Form 261.307 notices upon initial contact advising me of: (1) my right to legal counsel, (2) my right to audio/video record, (3) my right to refuse entry, (4) my right to refuse drug testing, and (5) my right to withhold private records.
FAILURE TO DELIVER THESE STATUTORY DISCLOSURES PROHIBITS DFPS FROM USING ANY ADMISSIONS, STATEMENTS, OR DERIVATIVE EVIDENCE AGAINST ME UNDER TEXAS EVIDENTIARY EXCLUSIONARY PRINCIPLES.

3. NOTICE OF AUDIO AND VIDEO RECORDING (TFC § 261.307(a)(2) & TEX. PENAL CODE § 16.02)
Notice is hereby given that any and all verbal communications, doorway encounters, telephone discussions, and in-person interviews are or will be audio and/or video recorded. This is a protected statutory right under Texas Family Code § 261.307(a)(2) and lawful under Texas one-party consent recording statutes.

4. REFUSAL OF VOLUNTARY DRUG SCREENING & PSYCHOLOGICAL TESTING (TFC § 261.307(a)(4))
I decline to submit to any voluntary urinalysis, hair-follicle testing, saliva swab, blood screening, or psychological/psychiatric evaluation absent a certified court order signed by a judge upon a verified showing of probable cause.

5. RESERVATION OF RIGHT TO COUNSEL & WRITTEN COMMUNICATION STANDARD (TFC § 261.307(a)(1) & (5))
I decline to submit to interrogations, participate in child interviews, execute blanket medical/school/mental health records releases, or sign any "Parental Child Safety Plan" (PCSP) without first conferring with legal counsel. 
All future substantive allegations, statutory inquiries, and appointment requests MUST BE COMMUNICATED TO ME IN WRITING.

--------------------------------------------------------------------------------
CASEWORKER RECEIPT & VERIFICATION BLOCK:
Investigator Name: ___________________________________  Badge/Unit #: ________________________
Date of Contact: ___________________  Time: ___________________  County: _____________________
Was a Signed Judicial Court Order Presented?   [  ] YES (Certified Copy Attached)   [  ] NO (Voluntary Request)
Investigator Signature: ____________________________________________________________________

DISCLAIMER: This document provides legal information and formal assertion of statutory rights under Texas law. Consult a licensed Texas family law attorney for active litigation.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPlainTextVersion());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls (Hidden on Print) */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              Texas Parents' Printable 'Know Your Rights' One-Pager
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              A high-impact, legally grounded document specifically citing <strong>Texas Family Code § 261.307 (HB 730)</strong> and <strong>§ 261.303</strong>. Designed to be printed on a single 8.5" x 11" page to display on your front door, present on a clipboard, or physically hand to a DFPS investigator upon contact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-print-onepager"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              id="btn-copy-onepager-text"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Plaintext' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Form to Populate Custom Fields */}
        <div className="pt-3 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Customize Document Details (Optional - You can also write these by hand after printing):</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Parent / Resident Name</label>
              <input
                type="text"
                placeholder="Full Legal Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Residence Address</label>
              <input
                type="text"
                placeholder="Street Address, City, TX"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Contact Phone</label>
              <input
                type="text"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">DFPS Case / Intake #</label>
              <input
                type="text"
                placeholder="e.g. Case #1029384"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Attorney Info (If Any)</label>
              <input
                type="text"
                placeholder="Attorney Name & Phone"
                value={attorneyInfo}
                onChange={(e) => setAttorneyInfo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Printable Sheet (Standard US Letter 8.5 x 11 Layout) */}
      <div className="flex justify-center">
        <div 
          id="printable-know-your-rights-doc"
          className="print-page w-full max-w-4xl bg-white text-slate-900 border-2 border-slate-900 rounded-lg shadow-2xl p-6 sm:p-8 space-y-4 font-serif text-[13px] leading-snug"
        >
          {/* Header Seal & Formal Heading */}
          <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-slate-700">
                STATE OF TEXAS
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-rose-800">
                FORMAL ADMINISTRATIVE NOTICE
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-slate-700">
                U.S. CONSTITUTION
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 pt-1">
              NOTICE OF CONSTITUTIONAL & STATUTORY RIGHTS
            </h1>
            <p className="text-xs font-sans font-bold uppercase tracking-wider text-slate-800">
              FORMAL ADVISEMENT TO CASEWORKERS & INVESTIGATORS OF TEXAS DFPS (CPS)
            </p>
            <p className="text-[11px] font-sans text-slate-600">
              Pursuant to Texas Family Code §§ 261.303, 261.307 (HB 730); Texas Penal Code § 16.02; U.S. Const. Amends. IV & XIV
            </p>
          </div>

          {/* Demographic Identification Bar */}
          <div className="bg-slate-100 border border-slate-400 p-2.5 rounded font-sans text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Parent / Resident:</span>
              <span className="font-semibold text-slate-900">{parentName.trim() || '_______________________'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Residence Address:</span>
              <span className="font-semibold text-slate-900">{address.trim() || '_______________________'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Intake / Case #:</span>
              <span className="font-semibold text-slate-900">{caseNumber.trim() || '_______________________'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Legal Counsel of Record:</span>
              <span className="font-semibold text-slate-900">{attorneyInfo.trim() || 'To be designated / In consultation'}</span>
            </div>
          </div>

          {/* Formal Directives to DFPS Investigator */}
          <div className="space-y-3 pt-1">
            {/* Rule 1 */}
            <div className="border-l-4 border-slate-900 pl-3 py-0.5">
              <h2 className="text-xs sm:text-sm font-sans font-black uppercase tracking-wide text-slate-950 flex items-center justify-between">
                <span>1. REFUSAL OF WARRANTLESS ENTRY INTO RESIDENCE</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">TFC § 261.303 & U.S. CONST. AMEND. IV</span>
              </h2>
              <p className="text-slate-800 text-xs mt-0.5 leading-normal">
                Consent to enter, search, or photograph this private residence, living quarters, food pantries, or bedrooms is <strong>DENIED</strong>. Under <strong>Texas Family Code § 261.303</strong>, the Department has <strong>NO lawful authority</strong> to enter this home without: (a) voluntary informed consent, or (b) a signed <strong>"Order in Aid of Investigation"</strong> or search warrant executed by a Texas state district court judge. Exercising this constitutional and statutory right does <em>not</em> establish probable cause or exigent circumstances.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="border-l-4 border-amber-600 pl-3 py-0.5">
              <h2 className="text-xs sm:text-sm font-sans font-black uppercase tracking-wide text-slate-950 flex items-center justify-between">
                <span>2. MANDATORY STATUTORY DISCLOSURES & EVIDENTIARY EXCLUSIONARY BAR</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">TFC § 261.307 (HB 730)</span>
              </h2>
              <p className="text-slate-800 text-xs mt-0.5 leading-normal">
                Under <strong>Texas House Bill 730 (effective Sept. 1, 2023)</strong>, DFPS investigators are <strong>mandated by law</strong> to deliver both <strong>verbal</strong> and <strong>written Form 261.307 disclosures</strong> upon initial contact, advising parents of: (1) the right to legal counsel, (2) the right to record, (3) the right to refuse entry, (4) the right to refuse drug testing, and (5) the right to withhold records. 
                <span className="font-bold text-rose-900 ml-1">
                  Failure to fully deliver these mandatory disclosures triggers an exclusionary evidentiary bar prohibiting the Department from utilizing statements, admissions, or evidence obtained in violation.
                </span>
              </p>
            </div>

            {/* Rule 3 */}
            <div className="border-l-4 border-slate-900 pl-3 py-0.5">
              <h2 className="text-xs sm:text-sm font-sans font-black uppercase tracking-wide text-slate-950 flex items-center justify-between">
                <span>3. STATUTORY RIGHT TO AUDIO AND VIDEO RECORD</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">TFC § 261.307(a)(2) & TPC § 16.02</span>
              </h2>
              <p className="text-slate-800 text-xs mt-0.5 leading-normal">
                Take formal notice that <strong>all verbal communications, doorway encounters, telephone discussions, and in-person interviews are or will be audio and/or video recorded</strong>. This is an explicit statutory right codified under <strong>TFC § 261.307(a)(2)</strong> and lawful under the Texas one-party consent statute (Tex. Penal Code § 16.02).
              </p>
            </div>

            {/* Rule 4 */}
            <div className="border-l-4 border-slate-900 pl-3 py-0.5">
              <h2 className="text-xs sm:text-sm font-sans font-black uppercase tracking-wide text-slate-950 flex items-center justify-between">
                <span>4. REFUSAL OF VOLUNTARY DRUG, ALCOHOL, OR PSYCHIATRIC TESTING</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">TFC § 261.307(a)(4)</span>
              </h2>
              <p className="text-slate-800 text-xs mt-0.5 leading-normal">
                Consent to submit to any voluntary urinalysis, saliva swab, blood screening, hair-follicle drug test, or psychological evaluation is <strong>DENIED</strong>. The Department cannot compel biological sampling without a certified judicial order issued by a judge upon a verified showing of probable cause.
              </p>
            </div>

            {/* Rule 5 */}
            <div className="border-l-4 border-slate-900 pl-3 py-0.5">
              <h2 className="text-xs sm:text-sm font-sans font-black uppercase tracking-wide text-slate-950 flex items-center justify-between">
                <span>5. RIGHT TO COUNSEL & WRITTEN COMMUNICATION REQUIREMENT</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">TFC § 261.307(a)(1) & (5)</span>
              </h2>
              <p className="text-slate-800 text-xs mt-0.5 leading-normal">
                I reserve the right to retain and consult with an attorney prior to answering questions, producing children for private examination, executing blanket medical/school record releases, or signing any "Parental Child Safety Plan" (PCSP). <strong>All future inquiries, allegations, and demands MUST be transmitted in writing</strong> via mail or email to prevent dispute.
              </p>
            </div>
          </div>

          {/* Verification & Caseworker Receipt Block */}
          <div className="border-2 border-slate-900 rounded p-3 bg-slate-50 font-sans text-xs space-y-2 mt-2">
            <div className="flex items-center justify-between border-b border-slate-300 pb-1">
              <span className="font-bold uppercase tracking-wider text-slate-900">
                CASEWORKER / INVESTIGATOR SERVICE RECEIPT & ACKNOWLEDGMENT
              </span>
              <span className="text-[10px] text-slate-600 font-mono">
                TO BE COMPLETED AT TIME OF PRESENTATION
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 font-bold block">Investigator Name:</span>
                <div className="border-b border-slate-800 h-5 mt-0.5" />
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Badge / Unit / Region #:</span>
                <div className="border-b border-slate-800 h-5 mt-0.5" />
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Date of Encounter:</span>
                <div className="border-b border-slate-800 h-5 mt-0.5" />
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Time of Encounter:</span>
                <div className="border-b border-slate-800 h-5 mt-0.5" />
              </div>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-800">Court Order Presented?</span>
                <label className="flex items-center gap-1 font-semibold">
                  <span className="w-3.5 h-3.5 border border-slate-800 inline-block rounded-sm" />
                  <span>YES (Order in Aid / Warrant)</span>
                </label>
                <label className="flex items-center gap-1 font-semibold">
                  <span className="w-3.5 h-3.5 border border-slate-800 inline-block rounded-sm" />
                  <span>NO (Voluntary Administrative Inquiry)</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 italic text-[10px]">Worker Signature / Service Note:</span>
                <div className="border-b border-slate-800 w-36 h-4" />
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Footer */}
          <div className="text-[10px] text-slate-600 font-sans text-center pt-1 border-t border-slate-300">
            Legal Disclaimer: I provide legal information, documentation, and communication drafting, but this is not formal legal counsel; consult a licensed family law attorney for active litigation.
          </div>
        </div>
      </div>
    </div>
  );
};
