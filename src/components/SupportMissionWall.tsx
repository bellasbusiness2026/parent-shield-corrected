import React from 'react';
import { Users, Scale, Lock, BookOpen, Share2, Check, Award, Copy, Shield, Heart, Printer } from 'lucide-react';
import { SupportPledge } from '../types';

interface SupportMissionWallProps {
  pledges: SupportPledge[];
  onNavigateToTab?: (tab: string) => void;
  onCopyShareLink: () => void;
  copiedLink: boolean;
  showThankYouModal: boolean;
  lastPledge: SupportPledge | null;
  onCloseThankYou: () => void;
}

export const SupportMissionWall: React.FC<SupportMissionWallProps> = ({
  pledges,
  onNavigateToTab,
  onCopyShareLink,
  copiedLink,
  showThankYouModal,
  lastPledge,
  onCloseThankYou,
}) => {
  return (
    <>
        {/* Right Column: Mission Core & Community Solidarity Wall (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mission Core Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>The ParentShield Mission</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Equipping Parents With Real Knowledge</strong>
                  Ensuring every parent knows their 4th Amendment rights against warrantless home entry and their statutory right to refuse voluntary testing.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <BookOpen className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Enforcing Texas Family Code § 261.307 (HB 730)</strong>
                  Holding state caseworkers accountable to mandatory disclosures, parental advisements, and procedural due process.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Keeping Families United</strong>
                  Empowering parents with clear paper trails, calm de-escalation, and legal confidence so children remain safely with their loving parents.
                </div>
              </div>
            </div>

            {/* Quick Action: Distribute Rights Cards */}
            {onNavigateToTab && (
              <button
                type="button"
                onClick={() => onNavigateToTab('one-pager')}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>View & Print Free Door-Rights One-Pager</span>
              </button>
            )}
          </div>

          {/* Community Solidarity Wall */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Solidarity Wall of Champions</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Includes illustrative samples</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {pledges.map((pledge) => (
                <div
                  key={pledge.id}
                  className="p-3 bg-slate-950 border border-slate-800/90 rounded-lg text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">
                      {pledge.isAnonymous ? 'Anonymous Texas Parent' : pledge.supporterName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                      ${pledge.amount} {pledge.frequency === 'monthly' ? '/mo' : ''}
                    </span>
                  </div>

                  {pledge.message && (
                    <p className="text-slate-300 italic text-[11px] leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800">
                      "{pledge.message}"
                    </p>
                  )}

                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-0.5">
                    <span>Level: {pledge.tierTitle}</span>
                    <span>{new Date(pledge.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Financial Ways to Support (Spread the Word) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-400" />
              <span>Share Knowledge & Save a Family</span>
            </h3>
            <p className="text-xs text-slate-300">
              Sharing ParentShield with a friend, parent group, or family member helps ensure no parent faces CPS without knowing their legal rights.
            </p>

            <button
              type="button"
              id="btn-copy-share-parentshield"
              onClick={onCopyShareLink}
              className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Share Link & Message'}</span>
            </button>
          </div>
        </div>
      {showThankYouModal && lastPledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl relative">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white font-serif">
                Thank You for Standing With Texas Parents!
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Official Recognition: ParentShield Community Champion
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2 text-left">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Support Level:</span>
                <span className="font-bold text-white">{lastPledge.tierTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Contribution Amount:</span>
                <span className="font-bold text-emerald-400">${lastPledge.amount} ({lastPledge.frequency})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Supporter:</span>
                <span className="font-semibold text-slate-200">{lastPledge.supporterName}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-400">Mission:</span>
                <span className="text-amber-300 text-right font-medium">Equipping Parents & Defending Families</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your solidarity helps ensure that no Texas family has to face CPS without knowing their 4th Amendment rights, HB 730 protections, and procedural due process.
            </p>

            <button
              type="button"
              onClick={onCloseThankYou}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Return to ParentShield
            </button>
          </div>
        </div>
      )}
    </>
  );
};
