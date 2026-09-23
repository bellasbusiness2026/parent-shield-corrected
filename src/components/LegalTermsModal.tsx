import React from 'react';
import { ShieldAlert, Scale, Check, X, AlertTriangle, FileText, Lock } from 'lucide-react';

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="terms-modal-title" className="text-lg font-bold text-white font-serif">
                Terms of Use, Legal Disclaimers & Limitation of Liability
              </h2>
              <p className="text-xs text-amber-300 font-medium">
                Mandatory Legal Notice: Self-Help Educational Software Only
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Terms"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Terms Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs leading-relaxed text-slate-300">
          {/* Important Highlight Box */}
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>CRITICAL NOTICE: READ BEFORE USING THIS APPLICATION</span>
            </div>
            <p>
              ParentShield is an automated self-help informational tool and clerical communication drafting utility. 
              <strong> Neither ParentShield, nor its developers, creators, owners, operators, affiliates, or contributors are licensed attorneys, a law firm, or a legal referral service.</strong>
              Nothing contained within this software constitutes legal advice, formal representation, or a substitute for advice from a licensed family law attorney.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>1. No Attorney-Client Relationship & No Legal Advice</span>
            </h3>
            <p>
              Access to, interaction with, or use of this application—including the automated chat buffer, letter template generator, case reviewer, HB 730 audit checklist, or door emergency scripts—does <strong>NOT</strong> create an attorney-client relationship, a fiduciary duty, a confidential legal relationship, or privileged legal communication between you and the software's creators, developers, or operators.
            </p>
            <p>
              All materials, statutory citations, and generated drafts are provided solely for general educational, self-help, and organizational purposes. Only an attorney licensed in your jurisdiction (such as the State of Texas) who has reviewed the specific facts of your case can provide legal advice regarding child protective proceedings, parental rights, or statutory defenses.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>2. Clerical & Educational Self-Help Utility</span>
            </h3>
            <p>
              This application functions strictly as a clerical template generator and educational reference tool to help parents organize their thoughts, document interactions, and review publicly accessible statutory references (including the United States Constitution and Texas Family Code Chapters 261, 262, and 263).
            </p>
            <p>
              Any draft communications, sample letters, or checklists produced by this tool are generic self-help aids. Laws and judicial interpretations change rapidly and can vary significantly across counties, courtrooms, and factual contexts. You are solely responsible for verifying the current accuracy and applicability of any information before relying on or sending any communication.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>3. "AS IS" & "AS AVAILABLE" Disclaimer — No Warranties</span>
            </h3>
            <p className="uppercase text-[11px] text-slate-400 font-semibold tracking-wider">
              DISCLAIMER OF ALL WARRANTIES:
            </p>
            <p>
              THE APPLICATION, ITS CODE, ITS PROMPTS, ITS TEMPLATES, AND ALL ASSOCIATED CONTENT ARE PROVIDED ON AN <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE CREATORS, DEVELOPERS, AND OPERATORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, AND NON-INFRINGEMENT.
            </p>
            <p>
              NO REPRESENTATION, PROMISE, OR GUARANTEE IS MADE THAT USE OF THIS APPLICATION WILL RESULT IN THE DISMISSAL OF AN INVESTIGATION, EXCLUSION OF EVIDENCE, PREVENTION OF CHILD REMOVAL, CLOSURE OF A DFPS CASE, OR ANY PARTICULAR OUTCOME IN ADMINISTRATIVE OR JUDICIAL PROCEEDINGS.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>4. Absolute Limitation of Liability & Hold Harmless</span>
            </h3>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE CREATORS, DEVELOPERS, HOSTS, OPERATORS, CONTRIBUTORS, OR AFFILIATES OF PARENTSHIELD BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF CUSTODY, LEGAL FEES, ATTORNEY COSTS, COURT SANCTIONS, EMOTIONAL DISTRESS, PERSONAL INJURY, LOSS OF DATA, OR TIME) ARISING OUT OF OR IN CONNECTION WITH:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Your use of, or inability to use, this application or any of its tools;</li>
              <li>Any decision made or action taken or omitted by you in reliance upon any content or draft generated by this application;</li>
              <li>Any interaction, confrontation, or communication between you and any representative of the Texas Department of Family and Protective Services (DFPS), Child Protective Services (CPS), law enforcement agencies, or courts;</li>
              <li>Any errors, omissions, inaccuracies, or delays in information or statutory citations provided.</li>
            </ul>
            <p>
              BY USING THIS APPLICATION, YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS THE CREATORS, DEVELOPERS, AND OPERATORS FROM ANY CLAIMS, LIABILITIES, LOSSES, COSTS, OR EXPENSES (INCLUDING ATTORNEY FEES) ARISING FROM YOUR USE OF THE SOFTWARE OR VIOLATION OF THESE TERMS.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>5. Sole User Responsibility & Consultation with Licensed Counsel</span>
            </h3>
            <p>
              You acknowledge and agree that you are solely responsible for reviewing, verifying, editing, and determining the appropriateness of any draft, letter, or script before using or sending it. If you are facing an active DFPS investigation, court petition, or emergency hearing, you are strongly advised to seek immediate advice from a qualified family law attorney admitted to practice in Texas.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide text-slate-100">
              <span>6. Voluntary Support & Contributions</span>
            </h3>
            <p>
              Any voluntary pledges, donations, or community contributions made in support of ParentShield are strictly gratuitous community support for open educational software and web hosting. Pledges do NOT constitute payment for legal fees, attorney retainers, legal services, or contractual guarantees of any kind.
            </p>
          </div>
        </div>

        {/* Footer with Acceptance Button */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete legal insulation under Texas & U.S. law</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
