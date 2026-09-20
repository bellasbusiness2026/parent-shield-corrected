import React, { useState } from 'react';
import { AlertTriangle, Sparkles, Copy, CheckCircle2, ShieldCheck, ArrowRight, CornerDownRight, Send } from 'lucide-react';
import { StripEmotionResponse } from '../types';

interface EmotionalStripperProps {
  onSaveToAuditLog?: (draft: string, title: string) => void;
}

export const EmotionalStripper: React.FC<EmotionalStripperProps> = ({ onSaveToAuditLog }) => {
  const [rawText, setRawText] = useState('');
  const [context, setContext] = useState('Response to caseworker email/text demand');
  const [recipient, setRecipient] = useState('Caseworker');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StripEmotionResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const sampleEmotionalInputs = [
    {
      title: "Angry/Defensive Response to Drug Allegation",
      text: "I cannot believe you are accusing me of drugs! My neighbor is a crazy liar who hates my dog! I haven't done drugs in 7 years, I am a great mother, I go to church, and my kids love me. I took an over-the-counter allergy med last week so if that shows up it's just Benadryl! Stop harassing my family or I will sue you!",
    },
    {
      title: "Panicked Pleading Response to Threat of Removal",
      text: "Please don't take my babies away, I am begging you! I will do whatever you want, I'll sign whatever safety plan you have, I'll go to parenting classes tomorrow, just please don't take them tonight! My ex-husband came over uninvited and yelled at me, it wasn't my fault at all! I promise I will never talk to him again!",
    },
    {
      title: "Over-explaining Unannounced Inspection Refusal",
      text: "My house was a little messy because the kids were playing with Legos and I had a migraine so I didn't get to do the dishes yet. That is why I didn't want you to come inside today. I swear my house is normally spotless! You can come back on Friday after I clean everything up and I will show you my food cupboards!",
    }
  ];

  const handleApplyPreset = (text: string) => {
    setRawText(text);
  };

  const handleStripEmotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/advocate/strip-emotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText,
          messageContext: context,
          targetRecipient: recipient,
        }),
      });
      const data: StripEmotionResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.polishedDraft) return;
    navigator.clipboard.writeText(result.polishedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (!result?.polishedDraft || !onSaveToAuditLog) return;
    onSaveToAuditLog(result.polishedDraft, 'De-escalated Communication Draft');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Radical De-escalation & Emotional Stripping Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              When caseworkers push emotional triggers, parents instinctively defend themselves or over-explain—inadvertently making involuntary admissions or shifting the burden of proof onto themselves. 
              ParentShield strips all anger, panic, defensiveness, and pleading, outputting calm, legally assertive, audit-ready prose.
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Try Common Emotional Traps (Click to Load):
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleEmotionalInputs.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPreset(item.text)}
                className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                &bull; {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleStripEmotion} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Communication Context
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Responding to worker text message / Written confirmation"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Recipient
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Caseworker / Investigation Supervisor"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            Paste Your Raw, Stressed, or Angry Thoughts / Draft:
          </label>
          <textarea
            rows={5}
            required
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Type everything you want to say—vent your frustration, fear, or explanations here. ParentShield will strip the vulnerabilities and protect your case..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            id="btn-strip-emotion"
            type="submit"
            disabled={loading || !rawText.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Stripping Emotional Traps & Restoring Burden of Proof...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Strip Emotion & Generate Protective Buffer</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Comparison */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: What Was Stripped & Analysis */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-400 pb-2 border-b border-slate-800">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Vulnerabilities & Traps Removed
                </h3>
              </div>
              
              <div className="space-y-2.5">
                {result.trapsRemoved?.map((trap, idx) => (
                  <div key={idx} className="bg-slate-950/90 border border-rose-950 rounded-lg p-3 text-xs text-rose-200/90 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{trap}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Statutory Safeguards Applied:</span>
                </div>
                <div className="space-y-2">
                  {result.legalSafeguardsApplied?.map((sg, idx) => (
                    <div key={idx} className="bg-slate-950/80 border border-emerald-950 rounded-lg p-2.5 text-xs text-emerald-300/90 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{sg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: De-escalated Protective Draft */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wide font-serif">
                      Polished Protective Output
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-copy-stripped-draft"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    {onSaveToAuditLog && (
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{saved ? 'Saved!' : 'To Log'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {result.subjectLine && (
                  <div className="text-xs bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-300">
                    <strong className="text-amber-400">Subject: </strong>{result.subjectLine}
                  </div>
                )}

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-500 selection:text-slate-950 overflow-x-auto max-h-96">
                  {result.polishedDraft}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2">
                &bull; Remember: Replace the bracketed placeholders [Caseworker Name], [Date], [Time] with your actual case info.
              </p>
            </div>
          </div>

          {/* Single Grounded Disclaimer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-center text-xs text-slate-400">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
