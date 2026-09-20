import React from 'react';
import { Shield, AlertTriangle, Scale, BookOpen, AlertOctagon, Printer, Heart } from 'lucide-react';

interface HeaderProps {
  onOpenEmergencyModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergencyModal,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top Banner with Statutory Anchors & Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Scale className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Texas DFPS Administrative Buffer &bull; Operating Under U.S. Const. Amends. IV & XIV &bull; TFC § 261.307 (HB 730) &bull; TFC § 261.303</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="btn-fund-parentshield-top"
            onClick={() => setActiveTab('support')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
              activeTab === 'support'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/40'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Support & Fund ParentShield</span>
          </button>
          <button
            id="btn-emergency-door-protocol"
            onClick={onOpenEmergencyModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-700 hover:bg-rose-600 text-white font-semibold transition-colors shadow-sm animate-pulse cursor-pointer"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Investigator at Door Protocol</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-inner">
              <Shield className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                  ParentShield
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  TEXAS DFPS BUFFER
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Constitutional Advocate, Procedural Due Process Buffer & Durable Audit Trail Engine
              </p>
            </div>
          </div>

          {/* Grounded Mandatory Single-Sentence Disclaimer */}
          <div className="max-w-xl bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-200">Legal Notice: </span>
              ParentShield is a parental-support tool that provides legal information, documentation, and communication drafting—not formal legal counsel or representation. Outcomes depend on your facts and court orders. Consult a licensed Texas family law attorney for active litigation or court deadlines.
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="mt-5 flex items-center gap-1 overflow-x-auto pb-1 border-t border-slate-800/80 pt-3">
          {[
            { id: 'advisor', label: 'AI Advocate Consultation', icon: Shield },
            { id: 'one-pager', label: 'Printable Rights One-Pager', icon: Printer },
            { id: 'review', label: 'Case Review & Triage', icon: Scale },
            { id: 'de-escalate', label: 'Emotional Stripper & Buffer', icon: AlertTriangle },
            { id: 'hb730-audit', label: 'HB 730 Exclusionary Audit', icon: BookOpen },
            { id: 'paper-trail', label: 'Audit Trail & Timelines', icon: Scale },
            { id: 'templates', label: 'Formal Letter Library', icon: BookOpen },
            { id: 'support', label: 'Support & Fund Mission', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
