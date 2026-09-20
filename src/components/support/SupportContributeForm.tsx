import React from 'react';
import { Heart, Shield, Lock } from 'lucide-react';
import { SupportDirectHandles } from './SupportDirectHandles';
import { SupportTierPicker } from './SupportTierPicker';

type Props = {
  selectedTier: number;
  setSelectedTier: (n: number) => void;
  customAmount: string;
  setCustomAmount: (s: string) => void;
  frequency: 'one-time' | 'monthly';
  setFrequency: (f: 'one-time' | 'monthly') => void;
  supporterName: string;
  setSupporterName: (s: string) => void;
  supporterEmail: string;
  setSupporterEmail: (s: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (b: boolean) => void;
  message: string;
  setMessage: (s: string) => void;
  paymentMethod: 'card' | 'direct-handles';
  setPaymentMethod: (m: 'card' | 'direct-handles') => void;
  copiedHandle: string | null;
  handleCopyDirectHandle: (handle: string, label: string) => void;
  effectiveAmount: number;
  stripePaymentUrl?: string;
  handleSubmitPledge: (e: React.FormEvent) => void;
};

export const SupportContributeForm: React.FC<Props> = ({
  selectedTier,
  setSelectedTier,
  customAmount,
  setCustomAmount,
  frequency,
  setFrequency,
  supporterName,
  setSupporterName,
  supporterEmail,
  setSupporterEmail,
  isAnonymous,
  setIsAnonymous,
  message,
  setMessage,
  paymentMethod,
  setPaymentMethod,
  copiedHandle,
  handleCopyDirectHandle,
  effectiveAmount,
  stripePaymentUrl,
  handleSubmitPledge,
}) => (
        {/* Left Column: Contribution Form & Direct Handles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-7 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <span>Show Your Support</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Help ensure that parents facing CPS investigations have free access to the knowledge and tools needed to protect their families.
              </p>
            </div>

            <SupportTierPicker
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              frequency={frequency}
              setFrequency={setFrequency}
              effectiveAmount={effectiveAmount}
            />

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-slate-800 text-amber-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pledge & Community Support
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('direct-handles')}
                  className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                    paymentMethod === 'direct-handles'
                      ? 'bg-slate-800 text-amber-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Direct Cash App / Venmo / PayPal
                </button>
              </div>

              {/* Option A: Digital Pledge Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmitPledge} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Your Name or Alias</label>
                      <input
                        type="text"
                        placeholder="e.g. John D. or Texas Parent"
                        disabled={isAnonymous}
                        value={supporterName}
                        onChange={(e) => setSupporterName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Email for Updates (Optional)</label>
                      <input
                        type="email"
                        placeholder="parent@example.com"
                        value={supporterEmail}
                        onChange={(e) => setSupporterEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkbox-anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="checkbox-anonymous" className="text-xs text-slate-300 cursor-pointer">
                      Display my name as Anonymous on the community solidarity wall
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Message of Encouragement to Other Parents (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share words of strength or encouragement with families facing CPS right now..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-pledge"
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-slate-950" />
                    <span>
                      {stripePaymentUrl
                        ? `Contribute $${effectiveAmount}${frequency === 'monthly' ? '/mo' : ''} via Stripe`
                        : `Confirm & Pledge $${effectiveAmount}${frequency === 'monthly' ? ' / Month' : ''} to ParentShield`}
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      Dedicated to Parental Rights Defense
                    </span>
                    <span>&bull;</span>
                    <span>Grassroots & Independent</span>
                  </div>
                </form>
              )}

              {paymentMethod === 'direct-handles' && (
                <SupportDirectHandles
                  copiedHandle={copiedHandle}
                  handleCopyDirectHandle={handleCopyDirectHandle}
                />
              )}
            </div>
          </div>
        </div>


);
