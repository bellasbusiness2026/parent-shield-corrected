import React, { useState } from 'react';
import { Scale, CheckSquare, ShieldCheck, AlertCircle, Copy, CheckCircle2, FileText, Send, ArrowRight, Sparkles } from 'lucide-react';
import { CaseReviewResponse } from '../types';

interface CaseReviewerProps {
  onSaveDraftToAuditLog?: (draft: string, title: string) => void;
}

export const CaseReviewer: React.FC<CaseReviewerProps> = ({ onSaveDraftToAuditLog }) => {
  const [situation, setSituation] = useState('');
  const [caseworkerDemands, setCaseworkerDemands] = useState('');
  const [courtOrderPresent, setCourtOrderPresent] = useState(false);
  const [initialContactDetails, setInitialContactDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<CaseReviewResponse | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [savedToLog, setSavedToLog] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const sampleScenarios = [
    {
      title: "Warrantless Home Inspection & Drug Test Demand",
      sit: "A caseworker knocked on my door saying an anonymous referral was made regarding dirty dishes and lack of food. They demand to inspect my entire house, look inside my refrigerator, and make me do an instant urine drug test.",
      demands: "1. Immediate entry to inspect bedrooms and pantry.\n2. Instant 5-panel drug test.\n3. Interview my 6-year-old child alone in the bedroom.",
      order: false,
      initial: "They showed an agency ID badge but gave me no written paperwork or Form 261.307 rights notice.",
    },
    {
      title: "Coerced 'Safety Plan' (PCSP) / Threat of Immediate Removal",
      sit: "Caseworker says my former partner had an argument with me and now CPS is claiming 'failure to protect.' The caseworker brought a document called a 'Parental Child Safety Placement' and said if I don't sign it right now and send my kids to stay with my aunt, they will remove the kids to foster care tonight.",
      demands: "Sign the PCSP immediately, relinquish physical custody to my aunt for 30 days, agree to not see my kids without supervision.",
      order: false,
      initial: "Caseworker arrived with a uniformed police officer for 'standby'.",
    },
    {
      title: "Blanket Medical & Therapy Records Release",
      sit: "Caseworker sent me a 4-page universal HIPAA and mental health records release form, demanding I sign it so they can pull all therapy notes, psychiatric records, and school records from the last 5 years.",
      demands: "Sign unrestricted releases for therapist notes and historical medical records.",
      order: false,
      initial: "Ongoing investigation contact via email.",
    }
  ];

  const handleApplyPreset = (preset: typeof sampleScenarios[0]) => {
    setSituation(preset.sit);
    setCaseworkerDemands(preset.demands);
    setCourtOrderPresent(preset.order);
    setInitialContactDetails(preset.initial);
  };

  const handleRunReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() && !caseworkerDemands.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/advocate/review-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation,
          caseworkerDemands,
          courtOrderPresent,
          initialContactDetails,
        }),
      });
      const data: CaseReviewResponse = await res.json();
      setReviewResult(data);
      setCompletedSteps({});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyDraft = () => {
    if (!reviewResult?.auditTrailDraft) return;
    navigator.clipboard.writeText(reviewResult.auditTrailDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleSaveToAuditLog = () => {
    if (!reviewResult?.auditTrailDraft || !onSaveDraftToAuditLog) return;
    onSaveDraftToAuditLog(reviewResult.auditTrailDraft, 'Case Review Formal Response Draft');
    setSavedToLog(true);
    setTimeout(() => setSavedToLog(false), 2500);
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              Administrative Case Review & Procedural Due Process Triage
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              ParentShield analyzes caseworker pressure against the U.S. Constitution and Texas Family Code. Every review is grouped strictly into:
              <span className="text-slate-200 font-medium"> (a) Immediate Rights/Risks</span>,
              <span className="text-slate-200 font-medium"> (b) Voluntary vs. Mandatory Demands</span>, and
              <span className="text-slate-200 font-medium"> (c) Action Checklist</span>, with a polished, copy-ready response draft.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Quick Situational Presets (Click to Test):
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleScenarios.map((sc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPreset(sc)}
                className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                &bull; {sc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleRunReview} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              1. What is the current situation or interaction? <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe what occurred, who showed up, what allegations were mentioned, and the setting..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              2. What specific demands or pressure did the worker apply? <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="e.g., Demanded to enter the home, drug screen, sign a Safety Plan, speak to children without parent present..."
              value={caseworkerDemands}
              onChange={(e) => setCaseworkerDemands(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              3. Initial Contact & HB 730 Context (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., First contact on porch; worker refused to provide written Form 261.307 disclosures"
              value={initialContactDetails}
              onChange={(e) => setInitialContactDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="court-order-check"
              checked={courtOrderPresent}
              onChange={(e) => setCourtOrderPresent(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900 bg-slate-950"
            />
            <label htmlFor="court-order-check" className="text-xs sm:text-sm text-slate-300 cursor-pointer select-none">
              Worker presented a <strong className="text-amber-400">signed court order / search warrant signed by a judge</strong> (Leave unchecked if only verbal requests or agency paperwork)
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="btn-run-case-review"
            type="submit"
            disabled={loading || (!situation.trim() && !caseworkerDemands.trim())}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Under Texas Law...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Uncompromising Case Review</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Review Results */}
      {reviewResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Output 3 Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Section A: Immediate Rights & Risks */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-rose-400 pb-2 border-b border-slate-800">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  (a) Immediate Rights & Risks
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Constitutional and statutory protections currently engaged:
              </p>
              <div className="space-y-2.5">
                {reviewResult.immediateRightsRisks?.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Voluntary vs. Mandatory Demands */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-400 pb-2 border-b border-slate-800">
                <Scale className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  (b) Voluntary vs. Mandatory Demands
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Administrative pressure distinguished from judicial court orders:
              </p>
              <div className="space-y-3">
                {reviewResult.voluntaryVsMandatory?.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-white truncate">{item.demand}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                        item.type.includes('Court')
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-slate-300">Legal Authority: </strong>{item.legalBasis}
                    </div>
                    <div className="text-xs text-amber-200/90 bg-amber-950/30 border border-amber-900/40 rounded p-2">
                      <strong className="text-amber-400">ParentShield Directive: </strong>{item.parentShieldGuidance}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section C: Action Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-400 pb-2 border-b border-slate-800">
                <CheckSquare className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  (c) Action Checklist
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Strict sequential protocol to secure procedural due process:
              </p>
              <div className="space-y-2">
                {reviewResult.actionChecklist?.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleStep(idx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                        isDone
                          ? 'bg-slate-950 border-emerald-800/80 text-slate-400 line-through'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isDone ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600 text-slate-400'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </span>
                      <span>{step}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Copy-Paste-Ready Draft Response with Bracketed Placeholders */}
          {reviewResult.auditTrailDraft && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Polished Audit Trail Draft (Ready for Email or Letter)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Calm, legally neutral prose stripped of emotional vulnerability. Fill in the bracketed placeholders: [Caseworker Name], [Date], [Time].
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-review-draft"
                    type="button"
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                  {onSaveDraftToAuditLog && (
                    <button
                      id="btn-save-to-audit-log"
                      type="button"
                      onClick={handleSaveToAuditLog}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{savedToLog ? 'Added to Audit Log!' : 'Save to Case Log'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Draft Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-500 selection:text-slate-950 overflow-x-auto">
                {reviewResult.auditTrailDraft}
              </div>
            </div>
          )}

          {/* Single Grounded Disclaimer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-center text-xs text-slate-400">
            {reviewResult.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
