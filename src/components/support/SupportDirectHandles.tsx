import React from 'react';
import { Check, Copy } from 'lucide-react';

type Props = {
  copiedHandle: string | null;
  handleCopyDirectHandle: (handle: string, label: string) => void;
};

export const SupportDirectHandles: React.FC<Props> = ({
  copiedHandle,
  handleCopyDirectHandle,
}) => (
              <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    Prefer to contribute directly? Send to ParentShield's support channels:
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">Cash App:</span>
                        <code className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded">$ParentShieldLegal</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyDirectHandle('$ParentShieldLegal', 'cashapp')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copiedHandle === 'cashapp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHandle === 'cashapp' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sky-400">Venmo:</span>
                        <code className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded">@ParentShieldDefense</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyDirectHandle('@ParentShieldDefense', 'venmo')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copiedHandle === 'venmo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHandle === 'venmo' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-400">PayPal / Zelle:</span>
                        <code className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded">support@parentshield.org</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyDirectHandle('support@parentshield.org', 'paypal')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copiedHandle === 'paypal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHandle === 'paypal' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic pt-1">
                    * Include "ParentShield Support" in the memo. Thank you for standing in solidarity with Texas families and supporting the fight for parents' rights.
                  </p>
                </div>
);
