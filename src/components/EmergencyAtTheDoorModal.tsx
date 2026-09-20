import React, { useState } from 'react';
import { X, AlertOctagon, CheckCircle2, Copy, ShieldAlert, PhoneCall, Mic } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogIncident: (incident: any) => void;
}

export const EmergencyAtTheDoorModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onLogIncident,
}) => {
  const [copied, setCopied] = useState(false);
  const [caseworkerName, setCaseworkerName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [logged, setLogged] = useState(false);

  if (!isOpen) return null;

  const scriptText = `I am exercising my rights under the Fourth and Fourteenth Amendments to the United States Constitution and Texas Family Code § 261.303. I do not consent to entry into my home or an interview of my children without a signed judicial order. \n\nIf you possess an Order in Aid of Investigation or a search warrant signed by a judge, please slide it under the door or email it to me. \n\nOtherwise, please leave your business card and send all inquiries in writing to my email so I may review them with legal counsel. Pursuant to Texas Family Code § 261.307, this interaction is being recorded.`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleQuickLog = () => {
    const newIncident = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      interactionType: 'In-Person Door Visit',
      caseworkerName: caseworkerName.trim() || 'Unknown DFPS Investigator',
      badgeOrUnit: badgeNumber.trim(),
      wasRecorded: true,
      courtOrderPresented: false,
      summaryOfDemands: 'Unannounced door visit requesting warrantless entry. Parent read constitutional refusal script under TFC § 261.303.',
      confirmationSent: false,
      notes: notes.trim(),
    };
    onLogIncident(newIncident);
    setLogged(true);
    setTimeout(() => {
      setLogged(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-rose-600 rounded-xl shadow-2xl text-slate-100 overflow-hidden my-6">
        {/* Banner */}
        <div className="bg-rose-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-7 h-7 text-white animate-pulse" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                EMERGENCY PROTOCOL: INVESTIGATOR AT THE DOOR
              </h2>
              <p className="text-xs text-rose-100">
                Texas Family Code § 261.303 & Fourth Amendment Rapid Protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-rose-200 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm">
          {/* Step Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
              <span className="inline-block w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs leading-6 mb-1">1</span>
              <p className="font-semibold text-white text-xs">DO NOT OPEN DOOR</p>
              <p className="text-[11px] text-slate-400 mt-1">Speak firmly through the locked door. Opening allows visual inspection.</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
              <span className="inline-block w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs leading-6 mb-1">2</span>
              <p className="font-semibold text-white text-xs">START RECORDING</p>
              <p className="text-[11px] text-slate-400 mt-1">Texas is generally a one-party-consent state (Penal Code § 16.02). DFPS-related recording rights also appear in Family Code § 261.307. Not legal advice.</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
              <span className="inline-block w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs leading-6 mb-1">3</span>
              <p className="font-semibold text-white text-xs">READ EXACT SCRIPT</p>
              <p className="text-[11px] text-slate-400 mt-1">Assert TFC § 261.303 and ask for a signed court order.</p>
            </div>
          </div>

          {/* Exact Verbal Script */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-lg p-4 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-400" />
                Read Aloud Word-For-Word Through the Door:
              </span>
              <button
                onClick={handleCopyScript}
                className="text-xs inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Script'}</span>
              </button>
            </div>
            <p className="text-slate-100 font-serif leading-relaxed mt-3 text-sm italic">
              "{scriptText}"
            </p>
          </div>

          {/* Quick Legal Fact Box */}
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-lg p-3.5 text-xs text-amber-200/90 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <ShieldAlert className="w-4 h-4" />
              <span>What Caseworkers Might Say vs. The Law:</span>
            </div>
            <p>&bull; <strong className="text-white">Caseworker:</strong> "If you have nothing to hide, you should let me in."</p>
            <p className="pl-3 text-slate-300">&rarr; <strong className="text-amber-300">The Law:</strong> Fourth Amendment privacy is not consciousness of guilt. TFC § 261.303 protects refusal.</p>
            <p>&bull; <strong className="text-white">Caseworker:</strong> "I will call the police."</p>
            <p className="pl-3 text-slate-300">&rarr; <strong className="text-amber-300">The Law:</strong> As a general rule under TFC § 261.303, refusal of entry without a court order is protected; warrants, exigent circumstances, or other lawful authority can change the analysis. Ask counsel for your facts.</p>
          </div>

          {/* Immediate Logging Form */}
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <p className="font-semibold text-xs text-slate-300 uppercase tracking-wider">
              Document This Incident Instantly (Audit Trail Step):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Caseworker / Investigator Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={caseworkerName}
                  onChange={(e) => setCaseworkerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Badge / Unit / Region (if provided)</label>
                <input
                  type="text"
                  placeholder="e.g. Travis County Unit 4 / Badge #123"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Notes / What They Said</label>
              <textarea
                rows={2}
                placeholder="What statements did they make through the door? Did they leave a card?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Legal disclaimer + TX recording note */}
          <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-3 text-[11px] text-slate-300 space-y-1.5">
            <p>
              <span className="font-semibold text-amber-400">Legal Notice: </span>
              ParentShield is a parental-support tool that provides legal information, documentation, and communication drafting—not formal legal counsel or representation. Outcomes depend on your facts and court orders. Consult a licensed Texas family law attorney for active litigation or court deadlines.
            </p>
            <p className="text-slate-400">Recording and consent rules can vary by situation; this note is general Texas information, not legal advice.</p>
            <p className="text-slate-400 leading-relaxed">In Texas, if you are part of a conversation, Penal Code § 16.02 generally lets you record it without the other person’s consent (one-party consent). For DFPS contact, Family Code § 261.307 also addresses the right to record interactions or interviews, and a recording may later be disclosed under a court order. Extra rules can apply to alleged-perpetrator interviews (§ 261.3027), including limits on posting identifying recordings online. This is general information, not legal advice—ask a Texas attorney about your situation.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Next: Send a confirmation email under the Paper Trail Rule once they depart.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              id="btn-quick-log-door-incident"
              onClick={handleQuickLog}
              disabled={logged}
              className="px-4 py-1.5 rounded text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
            >
              {logged ? 'Logged to Audit Trail!' : 'Save to Audit Trail'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
