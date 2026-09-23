import React, { useState } from 'react';
import { BookOpen, AlertOctagon, CheckCircle2, ShieldAlert, Copy, Send, FileText, Sparkles } from 'lucide-react';
import { HB730AuditResult } from '../types';

interface HB730AuditProps {
  onSaveToAuditLog?: (draft: string, title: string) => void;
}

export const HB730ExclusionaryAudit: React.FC<HB730AuditProps> = ({ onSaveToAuditLog }) => {
  const [verbalDisclosuresGiven, setVerbalDisclosuresGiven] = useState<boolean | null>(false);
  const [writtenFormProvided, setWrittenFormProvided] = useState<boolean | null>(false);
  const [advisedOfAttorneyRight, setAdvisedOfAttorneyRight] = useState<boolean | null>(false);
  const [advisedOfRecordingRight, setAdvisedOfRecordingRight] = useState<boolean | null>(false);
  const [advisedOfRightToRefuseEntry, setAdvisedOfRightToRefuseEntry] = useState<boolean | null>(false);
  const [advisedOfRightToRefuseDrugTest, setAdvisedOfRightToRefuseDrugTest] = useState<boolean | null>(false);
  const [advisedOfRightToWithholdRecords, setAdvisedOfRightToWithholdRecords] = useState<boolean | null>(false);

  const [caseworkerName, setCaseworkerName] = useState('');
  const [initialContactDate, setInitialContactDate] = useState('');
  const [firstContactLocation, setFirstContactLocation] = useState('Front door of private residence');

  const [auditResult, setAuditResult] = useState<HB730AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/advocate/hb730-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verbalDisclosuresGiven: !!verbalDisclosuresGiven,
          writtenFormProvided: !!writtenFormProvided,
          advisedOfAttorneyRight: !!advisedOfAttorneyRight,
          advisedOfRecordingRight: !!advisedOfRecordingRight,
          advisedOfRightToRefuseEntry: !!advisedOfRightToRefuseEntry,
          advisedOfRightToRefuseDrugTest: !!advisedOfRightToRefuseDrugTest,
          advisedOfRightToWithholdRecords: !!advisedOfRightToWithholdRecords,
          caseworkerName: caseworkerName.trim(),
          initialContactDate: initialContactDate.trim(),
          firstContactLocation: firstContactLocation.trim(),
        }),
      });
      const data: HB730AuditResult = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyNotice = () => {
    if (!auditResult?.formalViolationNotice) return;
    navigator.clipboard.writeText(auditResult.formalViolationNotice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToLog = () => {
    if (!auditResult?.formalViolationNotice || !onSaveToAuditLog) return;
    onSaveToAuditLog(auditResult.formalViolationNotice, 'TFC § 261.307 Exclusionary Bar Formal Notice');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const checklistItems = [
    {
      id: 'verbal',
      title: 'Verbal Notice Given Before Any Interview or Questioning',
      statute: 'TFC § 261.307(a)',
      value: verbalDisclosuresGiven,
      setter: setVerbalDisclosuresGiven,
    },
    {
      id: 'written',
      title: 'Required Written Notice Under § 261.307 Provided and Handed to Parent',
      statute: 'TFC § 261.307(a)',
      value: writtenFormProvided,
      setter: setWrittenFormProvided,
    },
    {
      id: 'attorney',
      title: 'Explicitly Advised of Right to Consult with an Attorney',
      statute: 'TFC § 261.307(a)(1)',
      value: advisedOfAttorneyRight,
      setter: setAdvisedOfAttorneyRight,
    },
    {
      id: 'recording',
      title: 'Explicitly Advised of Statutory Right to Audio/Video Record All Interviews',
      statute: 'TFC § 261.307(a)(2)',
      value: advisedOfRecordingRight,
      setter: setAdvisedOfRecordingRight,
    },
    {
      id: 'entry',
      title: 'Explicitly Advised of Right to Refuse Entry Without a Court Order',
      statute: 'TFC § 261.307(a)(3) & § 261.303',
      value: advisedOfRightToRefuseEntry,
      setter: setAdvisedOfRightToRefuseEntry,
    },
    {
      id: 'drug',
      title: 'Explicitly Advised of Right to Refuse Voluntary Drug / Alcohol Testing',
      statute: 'TFC § 261.307(a)(4)',
      value: advisedOfRightToRefuseDrugTest,
      setter: setAdvisedOfRightToRefuseDrugTest,
    },
    {
      id: 'records',
      title: 'Explicitly Advised of Right to Withhold Medical, Psychological, & School Records',
      statute: 'TFC § 261.307(a)(5)',
      value: advisedOfRightToWithholdRecords,
      setter: setAdvisedOfRightToWithholdRecords,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statutory Authority Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-amber-500">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">
            Texas Family Code § 261.307 (HB 730) Mandatory Disclosure Audit
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Effective September 1, 2023 under Texas House Bill 730, DFPS investigators <strong className="text-white">MUST</strong> deliver both verbal and written notice of rights upon initial contact before conducting any interview or inspection. 
          If required verbal and written notices are missing, information obtained (and derivative information) <span className="text-amber-400 font-semibold">may be inadmissible in civil proceedings</span>. This is not a universal criminal bar or automatic case dismissal.
        </p>
      </div>

      {/* Questionnaire Form */}
      <form onSubmit={handleRunAudit} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Caseworker / Investigator Name
            </label>
            <input
              type="text"
              placeholder="e.g. Investigator Smith"
              value={caseworkerName}
              onChange={(e) => setCaseworkerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Date & Approximate Time of First Contact
            </label>
            <input
              type="text"
              placeholder="e.g. October 14, 2026 at 2:30 PM"
              value={initialContactDate}
              onChange={(e) => setInitialContactDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Location of First Encounter
            </label>
            <input
              type="text"
              placeholder="e.g. Front porch / Phone / Child's school"
              value={firstContactLocation}
              onChange={(e) => setFirstContactLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 7 Disclosure Audits */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Audit the Investigator's Disclosures at Initial Contact:
          </p>

          <div className="space-y-2.5">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{item.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                      {item.statute}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => item.setter(true)}
                    className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                      item.value === true
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    YES (Provided)
                  </button>
                  <button
                    type="button"
                    onClick={() => item.setter(false)}
                    className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                      item.value === false
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    NO (Omitted)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            id="btn-evaluate-hb730-audit"
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Auditing Statutory Compliance...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Evaluate HB 730 Exclusionary Bar & Generate Notice</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Audit Output */}
      {auditResult && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Status Assessment Card */}
          <div className={`rounded-xl p-5 border shadow-sm ${
            auditResult.isExclusionaryBarTriggered
              ? 'bg-rose-950/40 border-rose-800 text-rose-100'
              : 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
          }`}>
            <div className="flex items-start gap-3">
              {auditResult.isExclusionaryBarTriggered ? (
                <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h3 className="font-bold text-base">
                  {auditResult.isExclusionaryBarTriggered
                    ? `STATUTORY EXCLUSIONARY BAR TRIGGERED (${auditResult.violationsCount} Violation${auditResult.violationsCount > 1 ? 's' : ''})`
                    : 'STATUTORY DISCLOSURES SATISFIED'}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {auditResult.statusAssessment}
                </p>
              </div>
            </div>

            {auditResult.violations.length > 0 && (
              <div className="mt-4 pt-3 border-t border-rose-900/60 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                  Documented Statutory Violations:
                </p>
                {auditResult.violations.map((v, idx) => (
                  <p key={idx} className="text-xs text-rose-200/90 pl-3">
                    &bull; {v}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Formal Notice of Statutory Non-Compliance */}
          {auditResult.formalViolationNotice && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Formal Notice of Non-Compliance & Exclusionary Bar Assertion
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Informational sample draft for your records and review with your licensed family law attorney.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-hb730-notice"
                    onClick={handleCopyNotice}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Notice</span>
                      </>
                    )}
                  </button>
                  {onSaveToAuditLog && (
                    <button
                      onClick={handleSaveToLog}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{saved ? 'Saved to Log!' : 'Save to Case Log'}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-500 selection:text-slate-950 overflow-x-auto">
                {auditResult.formalViolationNotice}
              </div>
            </div>
          )}

          {/* Grounded Single-Sentence Disclaimer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-center text-xs text-slate-400">
            {auditResult.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
