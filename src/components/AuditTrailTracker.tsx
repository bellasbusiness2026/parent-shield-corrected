import React, { useState } from 'react';
import { Scale, Plus, Calendar, Clock, CheckCircle2, AlertTriangle, FileText, Download, Printer, Shield, Trash2 } from 'lucide-react';
import { AuditLogEntry, CaseDeadlines } from '../types';

interface AuditTrailTrackerProps {
  entries: AuditLogEntry[];
  onAddEntry: (entry: AuditLogEntry) => void;
  onDeleteEntry: (id: string) => void;
  onToggleConfirmation: (id: string) => void;
  deadlines: CaseDeadlines;
  onUpdateDeadlines: (deadlines: CaseDeadlines) => void;
  onOpenNewDraftWithText?: (text: string) => void;
}

export const AuditTrailTracker: React.FC<AuditTrailTrackerProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
  onToggleConfirmation,
  deadlines,
  onUpdateDeadlines,
  onOpenNewDraftWithText,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [interactionType, setInteractionType] = useState<AuditLogEntry['interactionType']>('Phone Call');
  const [caseworkerName, setCaseworkerName] = useState('');
  const [badgeOrUnit, setBadgeOrUnit] = useState('');
  const [summaryOfDemands, setSummaryOfDemands] = useState('');
  const [wasRecorded, setWasRecorded] = useState(true);
  const [courtOrderPresented, setCourtOrderPresented] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [notes, setNotes] = useState('');

  // Handle deadline changes
  const handleRemovalDateChange = (val: string) => {
    if (!val) {
      onUpdateDeadlines({ ...deadlines, removalDate: undefined, adversaryHearingDeadline: undefined });
      return;
    }
    const d = new Date(val);
    const deadline14 = new Date(d);
    deadline14.setDate(deadline14.getDate() + 14);
    onUpdateDeadlines({
      ...deadlines,
      removalDate: val,
      adversaryHearingDeadline: deadline14.toISOString().split('T')[0],
    });
  };

  const handleSuitFilingDateChange = (val: string) => {
    if (!val) {
      onUpdateDeadlines({ ...deadlines, suitFilingDate: undefined, dropDeadDismissalDate: undefined });
      return;
    }
    const d = new Date(val);
    const dropDead = new Date(d);
    dropDead.setFullYear(dropDead.getFullYear() + 1);
    // Texas Family Code § 263.401: First Monday following the 1-year anniversary
    while (dropDead.getDay() !== 1) {
      dropDead.setDate(dropDead.getDate() + 1);
    }
    onUpdateDeadlines({
      ...deadlines,
      suitFilingDate: val,
      dropDeadDismissalDate: dropDead.toISOString().split('T')[0],
    });
  };

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseworkerName.trim() && !summaryOfDemands.trim()) return;

    const newEntry: AuditLogEntry = {
      id: 'entry-' + Date.now(),
      timestamp: new Date().toISOString(),
      interactionType,
      caseworkerName: caseworkerName.trim() || 'Texas DFPS Caseworker',
      badgeOrUnit: badgeOrUnit.trim(),
      wasRecorded,
      courtOrderPresented,
      summaryOfDemands: summaryOfDemands.trim(),
      confirmationSent,
      notes: notes.trim(),
    };

    onAddEntry(newEntry);
    setShowAddModal(false);
    // Reset form
    setCaseworkerName('');
    setBadgeOrUnit('');
    setSummaryOfDemands('');
    setNotes('');
  };

  const exportAuditTrailAsText = () => {
    let report = `# PARENTSHIELD AUDIT TRAIL DOSSIER
CONFIDENTIAL ADMINISTRATIVE LOG & CIVIL RIGHTS RECORD
Date of Generation: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Applicable Law: Texas Family Code Chapters 261, 262, 263; U.S. Const. Amends. IV, XIV

=== STATUTORY DEADLINES (TEXAS FAMILY CODE) ===
- Emergency Removal Date: ${deadlines.removalDate || 'Not Applicable'}
- 14-Day Adversary Hearing Deadline (TFC § 262.201): ${deadlines.adversaryHearingDeadline || 'Not set'}
- Suit Filing Date: ${deadlines.suitFilingDate || 'Not Applicable'}
- 1-Year Drop-Dead Dismissal Deadline (TFC § 263.401): ${deadlines.dropDeadDismissalDate || 'Not set'}

=== CHRONOLOGICAL LOG OF INTERACTIONS & COMMUNICATIONS ===
Total Documented Events: ${entries.length}

`;

    entries.forEach((ent, i) => {
      report += `[Record #${entries.length - i}]
Timestamp: ${new Date(ent.timestamp).toLocaleString()}
Type: ${ent.interactionType}
Worker / Representative: ${ent.caseworkerName} ${ent.badgeOrUnit ? `(${ent.badgeOrUnit})` : ''}
Audio/Video Recorded (TFC § 261.307(a)(2)): ${ent.wasRecorded ? 'YES' : 'NO'}
Signed Judicial Court Order Presented: ${ent.courtOrderPresented ? 'YES (Court Order)' : 'NO (Administrative Pressure)'}
Paper Trail Confirmation Email Sent: ${ent.confirmationSent ? 'YES' : 'PENDING'}
Summary of Demands / Discussion:
${ent.summaryOfDemands}
${ent.notes ? `Additional Field Notes:\n${ent.notes}\n` : ''}
------------------------------------------------------------
`;
    });

    report += `\nDisclaimer: I provide legal information, documentation, and communication drafting, but this is not formal legal counsel; consult a licensed family law attorney for active litigation.`;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ParentShield-Case-Audit-Trail-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Overview & Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              The Paper Trail Rule: Unshakeable Audit Trail & Statutory Clocks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              "If it is not written down, DFPS will write their own narrative." Follow every phone call, visit, or verbal exchange with a formal confirmation email.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-add-audit-log"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Log Interaction</span>
            </button>
            <button
              onClick={exportAuditTrailAsText}
              disabled={entries.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Dossier (.md)</span>
            </button>
            <button
              onClick={handlePrint}
              disabled={entries.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Texas Statutory Deadline Clocks */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 14-Day Clock */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                14-Day Adversary Hearing Clock (TFC § 262.201)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                POST-REMOVAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              If children were taken into custody without prior notice, a full evidentiary hearing MUST take place within 14 calendar days.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">Removal Date</label>
                <input
                  type="date"
                  value={deadlines.removalDate || ''}
                  onChange={(e) => handleRemovalDateChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">14-Day Hearing Deadline</label>
                <input
                  type="text"
                  readOnly
                  value={deadlines.adversaryHearingDeadline ? `Must be held on or before: ${deadlines.adversaryHearingDeadline}` : 'Set removal date'}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded px-2.5 py-1 text-xs text-amber-300 font-medium select-all"
                />
              </div>
            </div>
          </div>

          {/* 1-Year Dismissal Clock */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                1-Year Drop-Dead Dismissal Clock (TFC § 263.401)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                JURISDICTIONAL CUTOFF
              </span>
            </div>
            <p className="text-xs text-slate-400">
              DFPS lawsuits are automatically dismissed with prejudice on the first Monday following the 1-year anniversary of conservatorship.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">Suit / TMC Appointed Date</label>
                <input
                  type="date"
                  value={deadlines.suitFilingDate || ''}
                  onChange={(e) => handleSuitFilingDateChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">Drop-Dead Dismissal Date</label>
                <input
                  type="text"
                  readOnly
                  value={deadlines.dropDeadDismissalDate ? `Automatic dismissal: ${deadlines.dropDeadDismissalDate}` : 'Set suit date'}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded px-2.5 py-1 text-xs text-amber-300 font-medium select-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logged Interactions Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Documented Interactions & Confirmation Trail ({entries.length})</span>
          </h3>
          <span className="text-xs text-slate-400">
            Chronological order &bull; Local encrypted device storage
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
            <Shield className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No Interactions Logged Yet</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Did a caseworker call, leave a card on your door, or send a text? Click "Log Interaction" above to create an unshakeable written record.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log First Interaction</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3 transition-colors hover:border-slate-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {entry.interactionType}
                    </span>
                    <span className="text-xs font-bold text-white">
                      Worker: {entry.caseworkerName} {entry.badgeOrUnit ? `(${entry.badgeOrUnit})` : ''}
                    </span>
                    <span className="text-xs text-slate-400">
                      &bull; {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleConfirmation(entry.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                        entry.confirmationSent
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900/80'
                      }`}
                    >
                      {entry.confirmationSent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Confirmation Sent</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Send Confirmation Email!</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div>
                    <strong className="text-slate-200">What occurred / Demands: </strong>
                    <span className="leading-relaxed">{entry.summaryOfDemands}</span>
                  </div>
                  {entry.notes && (
                    <div className="text-xs text-slate-400 bg-slate-950 rounded p-2.5 border border-slate-800">
                      <strong className="text-slate-300">Notes: </strong>{entry.notes}
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${entry.wasRecorded ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                    <span>Recorded: {entry.wasRecorded ? 'Yes (TFC § 261.307)' : 'No'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${entry.courtOrderPresented ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                    <span>Court Order: {entry.courtOrderPresented ? 'Presented' : 'None (Voluntary request)'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 text-slate-100 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" />
              Document New Interaction
            </h3>

            <form onSubmit={handleCreateEntry} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Interaction Type</label>
                  <select
                    value={interactionType}
                    onChange={(e) => setInteractionType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="In-Person Door Visit">In-Person Door Visit</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Text Message">Text Message</option>
                    <option value="Email">Email</option>
                    <option value="Office / Field Meeting">Office / Field Meeting</option>
                    <option value="Court / Order Notice">Court / Order Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Worker Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Caseworker Adams"
                    value={caseworkerName}
                    onChange={(e) => setCaseworkerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge / Unit / County</label>
                <input
                  type="text"
                  placeholder="e.g. Harris County Unit 12 / Badge 890"
                  value={badgeOrUnit}
                  onChange={(e) => setBadgeOrUnit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Summary of Inquiries / Demands Made by Worker <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What did they say or ask for? e.g. Demanded drug test, asked to inspect home..."
                  value={summaryOfDemands}
                  onChange={(e) => setSummaryOfDemands(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wasRecorded}
                    onChange={(e) => setWasRecorded(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 bg-slate-950"
                  />
                  <span className="text-xs text-slate-300">Recorded Audio/Video</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courtOrderPresented}
                    onChange={(e) => setCourtOrderPresented(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 bg-slate-950"
                  />
                  <span className="text-xs text-slate-300">Court Order Presented</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
