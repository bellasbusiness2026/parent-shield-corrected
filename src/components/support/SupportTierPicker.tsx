import React from 'react';
import { Sparkles } from 'lucide-react';
import { PRESET_TIERS } from './supportData';

type Props = {
  selectedTier: number;
  setSelectedTier: (n: number) => void;
  customAmount: string;
  setCustomAmount: (s: string) => void;
  frequency: 'one-time' | 'monthly';
  setFrequency: (f: 'one-time' | 'monthly') => void;
  effectiveAmount: number;
};

export const SupportTierPicker: React.FC<Props> = ({
  selectedTier,
  setSelectedTier,
  customAmount,
  setCustomAmount,
  frequency,
  setFrequency,
  effectiveAmount,
}) => (
  <>
            {/* Frequency Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                  frequency === 'one-time'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                One-Time Support
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  frequency === 'monthly'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Monthly Sustainer</span>
              </button>
            </div>

            {/* Preset Tiers Grid */}
            <div className="grid grid-cols-2 gap-3">
              {PRESET_TIERS.map((tier) => {
                const isSelected = selectedTier === tier.amount && !customAmount;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.amount);
                      setCustomAmount('');
                    }}
                    className={`relative p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-2.5 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <div>
                      <div className="text-xl font-bold text-amber-400">${tier.amount}</div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">{tier.name}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2 leading-snug">
                      {tier.tagline}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Option */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Or Custom Amount:</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                <input
                  type="number"
                  min="2"
                  step="1"
                  placeholder="Enter amount (e.g. 50, 100, 250)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedTier(0);
                  }}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Selected Pledge Banner */}
            <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs flex items-start gap-2.5 text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Your ${effectiveAmount} {frequency} contribution: </span>
                <span>Standing in solidarity with parents to protect constitutional rights, demand due process, and keep children with loving families.</span>
              </div>
            </div>

  </>
);
