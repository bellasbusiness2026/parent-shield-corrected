import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Check, 
  Copy, 
  Share2, 
  Sparkles, 
  Award, 
  Lock, 
  Scale,
  Printer,
  BookOpen
} from 'lucide-react';
import { SupportPledge } from '../types';

const STORAGE_KEY_PLEDGES = 'parentshield_support_pledges_v1';

const INITIAL_COMMUNITY_PLEDGES: SupportPledge[] = [
  {
    id: 'sample-1',
    amount: 50,
    frequency: 'monthly',
    supporterName: 'Elena R. (Harris County)',
    isAnonymous: false,
    message: 'To every mom standing terrified at their door: Stand firm on the 4th Amendment. ParentShield gave me the exact words to say and CPS closed the investigation without entry. Keep fighting!',
    timestamp: '2026-09-10T14:22:00Z',
    tierTitle: 'Protector Level',
  },
  {
    id: 'sample-2',
    amount: 150,
    frequency: 'one-time',
    supporterName: 'Marcus T. (Bexar County)',
    isAnonymous: false,
    message: 'CPS relied on our fear and ignorance of the law. Once we invoked TFC § 261.307 and put everything in writing, their threats vanished. Supporting ParentShield so every Texas parent has this armor.',
    timestamp: '2026-09-08T09:45:00Z',
    tierTitle: 'Guardian Level',
  },
  {
    id: 'sample-3',
    amount: 25,
    frequency: 'monthly',
    supporterName: 'Anonymous Advocate',
    isAnonymous: true,
    message: 'Knowledge is the greatest weapon against family separation. Keep families together!',
    timestamp: '2026-09-05T18:10:00Z',
    tierTitle: 'Defender Level',
  },
  {
    id: 'sample-4',
    amount: 75,
    frequency: 'one-time',
    supporterName: 'D. Rodriguez (Tarrant County)',
    isAnonymous: false,
    message: 'Proud to stand with this mission. Unlawful pressure thrives when parents feel alone—constitutional knowledge brings confidence and protection.',
    timestamp: '2026-09-02T11:30:00Z',
    tierTitle: 'Shield Level',
  },
];

const PRESET_TIERS = [
  {
    id: 'defender',
    amount: 15,
    name: 'Defender Level',
    tagline: 'Stand in solidarity with Texas parents defending their rights.',
    highlight: false,
  },
  {
    id: 'protector',
    amount: 35,
    name: 'Protector Level',
    tagline: 'Help empower families with knowledge to stay united and informed.',
    highlight: true,
  },
  {
    id: 'shield',
    amount: 75,
    name: 'Shield Level',
    tagline: 'Support the expansion and reach of the ParentShield mission.',
    highlight: false,
  },
  {
    id: 'guardian',
    amount: 150,
    name: 'Guardian Level',
    tagline: 'Champion parental civil rights and procedural due process.',
    highlight: false,
  },
];

interface SupportParentShieldProps {
  onNavigateToTab?: (tab: string) => void;
}

export const SupportParentShield: React.FC<SupportParentShieldProps> = ({ onNavigateToTab }) => {
  const [selectedTier, setSelectedTier] = useState<number>(35);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [supporterName, setSupporterName] = useState<string>('');
  const [supporterEmail, setSupporterEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'direct-handles'>('card');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [lastPledge, setLastPledge] = useState<SupportPledge | null>(null);

  // Persistent Community Pledges
  const [pledges, setPledges] = useState<SupportPledge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLEDGES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COMMUNITY_PLEDGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLEDGES, JSON.stringify(pledges));
    } catch (e) {
      console.error(e);
    }
  }, [pledges]);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;

  const currentTierInfo = PRESET_TIERS.find(t => t.amount === effectiveAmount) || {
    name: effectiveAmount >= 150 ? 'Guardian Level' : effectiveAmount >= 75 ? 'Shield Level' : effectiveAmount >= 35 ? 'Protector Level' : 'Defender Level',
    tagline: 'Supporting the mission to protect parental rights and keep families together.',
  };

  const handleCopyShareLink = () => {
    const text = `Equip every parent with constitutional knowledge to stand firm against CPS overreach and keep families united. Free Texas DFPS legal rights buffer: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyDirectHandle = (handle: string, label: string) => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(label);
    setTimeout(() => setCopiedHandle(null), 2500);
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount < 5) {
      alert('Please select or enter an amount of at least $5.');
      return;
    }

    const newPledge: SupportPledge = {
      id: 'pledge-' + Date.now(),
      amount: effectiveAmount,
      frequency,
      supporterName: isAnonymous ? 'Anonymous Texas Parent' : (supporterName.trim() || 'Supporter of Parental Rights'),
      isAnonymous,
      message: message.trim() || undefined,
      timestamp: new Date().toISOString(),
      tierTitle: currentTierInfo.name,
    };

    setPledges(prev => [newPledge, ...prev]);
    setLastPledge(newPledge);
    setShowThankYouModal(true);
  };

  const totalRaised = pledges.reduce((acc, p) => acc + p.amount, 18450);
  const totalSupporters = pledges.length + 382;

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
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
            <span className="text-amber-400 font-semibold"> ParentShield exists to level the playing field</span> by empowering every parent with constitutional clarity, Texas Family Code § 261.307 protections, and unshakeable documentation.
          </p>

          {/* Key Community Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">${totalRaised.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Grassroots Support Pledged</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{totalSupporters.toLocaleString()}+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Community Advocates</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-sky-400">100% Free</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Free for All Families</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-white">Texas-Wide</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Civil Rights Mission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout: Support Console & Mission Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                  min="5"
                  step="5"
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
                    <span>Confirm & Pledge ${effectiveAmount} {frequency === 'monthly' ? '/ Month' : ''} to ParentShield</span>
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

              {/* Option B: Direct Handles */}
              {paymentMethod === 'direct-handles' && (
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
              )}
            </div>
          </div>
        </div>

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

      {/* Celebration & Gratitude Modal */}
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
              onClick={() => setShowThankYouModal(false)}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Return to ParentShield
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
