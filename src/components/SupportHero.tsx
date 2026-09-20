import React from 'react';
import { Heart } from 'lucide-react';

interface SupportHeroProps {
  totalRaised: number;
  totalSupporters: number;
}

export const SupportHero: React.FC<SupportHeroProps> = ({ totalRaised, totalSupporters }) => {
  return (
    <>
      {/* Hero Mission Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Support the Mission &bull; Keep Families Together</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
            Equip Every Parent With Constitutional Knowledge to Stand Firm & Keep Families United.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The CPS system frequently relies on fear, urgency, and parents not knowing their statutory protections to demand warrantless entry or involuntary agreements.
            <span className="text-amber-400 font-semibold"> ParentShield exists to level the playing field</span> by empowering every parent with constitutional clarity, Texas Family Code § 261.307 protections, and durable documentation.
          </p>

          {/* Key Community Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">${totalRaised.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Pledged (local / demo totals)</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{totalSupporters.toLocaleString()}+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Listed Supporters (local / demo)</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-sky-400">Free</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Free for Parents in Crisis</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-white">Texas-Wide</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Civil Rights Mission</div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
