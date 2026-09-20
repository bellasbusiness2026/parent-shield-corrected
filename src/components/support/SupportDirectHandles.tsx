import React from 'react';

type Props = {
  copiedHandle: string | null;
  handleCopyDirectHandle: (handle: string, label: string) => void;
};

/** Placeholders until real Cash App / Venmo / PayPal accounts exist. */
const DIRECT_PAY_PLACEHOLDERS = [
  { id: 'cashapp', label: 'Cash App', labelClass: 'text-emerald-400', value: 'Coming soon' },
  { id: 'venmo', label: 'Venmo', labelClass: 'text-sky-400', value: 'Coming soon' },
  { id: 'paypal', label: 'PayPal / Zelle', labelClass: 'text-blue-400', value: 'Coming soon' },
] as const;

export const SupportDirectHandles: React.FC<Props> = () => (
  <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs">
    <p className="text-slate-300 leading-relaxed">
      Prefer to contribute directly? Cash App, Venmo, and PayPal handles will appear here once those accounts are set up. For now, use a Stripe tier above.
    </p>

    <div className="space-y-2">
      {DIRECT_PAY_PLACEHOLDERS.map((row) => (
        <div
          key={row.id}
          className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg opacity-80"
        >
          <div className="flex items-center gap-2">
            <span className={`font-bold ${row.labelClass}`}>{row.label}:</span>
            <code className="text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded italic">{row.value}</code>
          </div>
          <span className="px-2.5 py-1 text-[11px] text-slate-500 border border-slate-700 rounded">
            Pending
          </span>
        </div>
      ))}
    </div>

    <p className="text-[11px] text-slate-400 italic pt-1">
      * Direct-pay tags are placeholders only — do not send funds here yet. Stripe checkout above is live.
    </p>
  </div>
);
