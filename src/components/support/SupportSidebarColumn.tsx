import React from 'react';
import { Heart, Shield, Users, Check, Copy, Share2, Scale, Printer, BookOpen } from 'lucide-react';
import { SupportPledge } from '../../types';

type Props = {
  onNavigateToTab?: (tab: string) => void;
  pledges: SupportPledge[];
  copiedLink: boolean;
  handleCopyShareLink: () => void;
};

export const SupportSidebarColumn: React.FC<Props> = ({
  onNavigateToTab,
  pledges,
  copiedLink,
  handleCopyShareLink,
}) => (
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
              <span className="text-[11px] text-slate-400 font-medium">Recent Pledges</span>
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
              onClick={handleCopyShareLink}
              className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Share Link & Message'}</span>
            </button>
          </div>
        </div>
      </div>


);
