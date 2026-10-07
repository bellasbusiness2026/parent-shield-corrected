import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { SupportPledge } from '../types';
import {
  STORAGE_KEY_PLEDGES,
  INITIAL_COMMUNITY_PLEDGES,
  PRESET_TIERS,
} from './support/supportData';
import { SupportContributeColumn } from './support/SupportContributeColumn';
import { SupportSidebarColumn } from './support/SupportSidebarColumn';
import { SupportThankYouModal } from './support/SupportThankYouModal';
import { httpsOrigin } from '../utils/secureUrl';

const PENDING_CHECKOUT_PLEDGE_KEY = 'parentshield_pending_checkout_pledge';

interface SupportParentShieldProps {
  onNavigateToTab?: (tab: string) => void;
  checkoutStatus?: 'success' | 'cancel' | null;
}

export const SupportParentShield: React.FC<SupportParentShieldProps> = ({ onNavigateToTab, checkoutStatus }) => {
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  // After returning from Stripe Checkout, add the pending pledge to the wall only on success.
  useEffect(() => {
    if (!checkoutStatus) return;
    try {
      const pending = sessionStorage.getItem(PENDING_CHECKOUT_PLEDGE_KEY);
      sessionStorage.removeItem(PENDING_CHECKOUT_PLEDGE_KEY);
      if (checkoutStatus === 'success' && pending) {
        const pledge: SupportPledge = JSON.parse(pending);
        setPledges(prev => [pledge, ...prev]);
        setLastPledge(pledge);
        setShowThankYouModal(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [checkoutStatus]);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;

  const selectedPresetTier = PRESET_TIERS.find(t => t.amount === effectiveAmount);
  const currentTierInfo = selectedPresetTier || {
    name: effectiveAmount >= 150 ? 'Guardian Level' : effectiveAmount >= 75 ? 'Shield Level' : effectiveAmount >= 35 ? 'Protector Level' : effectiveAmount >= 15 ? 'Defender Level' : 'Together Level',
    tagline: 'Supporting the mission to protect parental rights and keep families together.',
  };
  // Preset tiers go through Stripe Checkout (server maps the tier name to a price).
  const stripeCheckoutTier = selectedPresetTier?.id;

  const handleCopyShareLink = () => {
    const text = `Equip every parent with constitutional knowledge to stand firm against CPS overreach and keep families united. Free Texas DFPS legal rights buffer: ${httpsOrigin()}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyDirectHandle = (handle: string, label: string) => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(label);
    setTimeout(() => setCopiedHandle(null), 2500);
  };

  const handleSubmitPledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount < 2) {
      alert('Please select or enter an amount of at least $2.');
      return;
    }

    const newPledge: SupportPledge = {
      id: 'pledge-' + Date.now(),
      amount: effectiveAmount,
      frequency: stripeCheckoutTier ? 'one-time' : frequency,
      supporterName: isAnonymous ? 'Anonymous Texas Parent' : (supporterName.trim() || 'Supporter of Parental Rights'),
      isAnonymous,
      message: message.trim() || undefined,
      timestamp: new Date().toISOString(),
      tierTitle: currentTierInfo.name,
    };

    if (stripeCheckoutTier) {
      setCheckoutLoading(true);
      try {
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: stripeCheckoutTier }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Could not start checkout.');
        }
        try {
          sessionStorage.setItem(PENDING_CHECKOUT_PLEDGE_KEY, JSON.stringify(newPledge));
        } catch (storageError) {
          console.error(storageError);
        }
        window.location.assign(data.url);
      } catch (err: any) {
        console.error(err);
        alert(err?.message || 'Could not start checkout. Please try again.');
        setCheckoutLoading(false);
      }
      return;
    }

    setPledges(prev => [newPledge, ...prev]);
    setLastPledge(newPledge);
    setShowThankYouModal(true);
  };

  const totalRaised = pledges.reduce((acc, p) => acc + p.amount, 0);
  const totalSupporters = pledges.length;

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
            <span className="text-amber-400 font-semibold"> ParentShield exists to level the playing field</span> by empowering every parent with constitutional clarity, Texas Family Code § 261.307 protections, and durable documentation.
          </p>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <SupportContributeColumn
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          frequency={frequency}
          setFrequency={setFrequency}
          supporterName={supporterName}
          setSupporterName={setSupporterName}
          supporterEmail={supporterEmail}
          setSupporterEmail={setSupporterEmail}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          message={message}
          setMessage={setMessage}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          copiedHandle={copiedHandle}
          handleCopyDirectHandle={handleCopyDirectHandle}
          effectiveAmount={effectiveAmount}
          stripeCheckoutTier={stripeCheckoutTier}
          checkoutLoading={checkoutLoading}
          handleSubmitPledge={handleSubmitPledge}
        />
        <SupportSidebarColumn
          onNavigateToTab={onNavigateToTab}
          pledges={pledges}
          copiedLink={copiedLink}
          handleCopyShareLink={handleCopyShareLink}
        />
      </div>

      <SupportThankYouModal
        showThankYouModal={showThankYouModal}
        lastPledge={lastPledge}
        setShowThankYouModal={setShowThankYouModal}
      />
    </div>
  );
};
