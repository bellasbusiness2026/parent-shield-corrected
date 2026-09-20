/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EmergencyAtTheDoorModal } from './components/EmergencyAtTheDoorModal';
import { CaseReviewer } from './components/CaseReviewer';
import { EmotionalStripper } from './components/EmotionalStripper';
import { HB730ExclusionaryAudit } from './components/HB730ExclusionaryAudit';
import { AuditTrailTracker } from './components/AuditTrailTracker';
import { LetterTemplatesLibrary } from './components/LetterTemplatesLibrary';
import { PrintableOnePager } from './components/PrintableOnePager';
import { AdvocateChat } from './components/AdvocateChat';
import { LegalReferenceDrawer } from './components/LegalReferenceDrawer';
import { SupportParentShield } from './components/SupportParentShield';
import { AuditLogEntry, CaseDeadlines } from './types';
import { CheckCircle2, ShieldAlert, Heart } from 'lucide-react';

const STORAGE_KEY_ENTRIES = 'parentshield_audit_entries_v1';
const STORAGE_KEY_DEADLINES = 'parentshield_deadlines_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('advisor');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent Audit Log entries
  const [entries, setEntries] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial demonstration entry to orient parents
    return [
      {
        id: 'initial-sample',
        timestamp: new Date().toISOString(),
        interactionType: 'In-Person Door Visit',
        caseworkerName: 'Investigator S. Hernandez',
        badgeOrUnit: '[SAMPLE] Texas DFPS Region 6',
        wasRecorded: true,
        courtOrderPresented: false,
        summaryOfDemands: '[SAMPLE / DEMO] Unannounced door visit regarding anonymous referral. Worker requested entry to view child bedrooms and take urinalysis screening. Parent asserted 4th Amendment and TFC § 261.303 refusal absent court order.',
        confirmationSent: true,
        notes: '[SAMPLE / DEMO — Region 6 illustration only] Worker departed after parent requested all inquiries in writing. Follow-up confirmation email sent within 15 minutes.',
      },
    ];
  });

  // Persistent Deadlines
  const [deadlines, setDeadlines] = useState<CaseDeadlines>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEADLINES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DEADLINES, JSON.stringify(deadlines));
    } catch (e) {
      console.error(e);
    }
  }, [deadlines]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddAuditEntry = (entry: AuditLogEntry) => {
    setEntries(prev => [entry, ...prev]);
    showToast('Interaction saved to Durable Audit Trail!');
  };

  const handleDeleteAuditEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    showToast('Entry removed from Audit Trail.');
  };

  const handleToggleConfirmation = (id: string) => {
    setEntries(prev =>
      prev.map(e => (e.id === id ? { ...e, confirmationSent: !e.confirmationSent } : e))
    );
  };

  const handleSaveDraftToAuditLog = (draft: string, title: string) => {
    const newEntry: AuditLogEntry = {
      id: 'entry-' + Date.now(),
      timestamp: new Date().toISOString(),
      interactionType: 'Email',
      caseworkerName: 'Caseworker',
      wasRecorded: true,
      courtOrderPresented: false,
      summaryOfDemands: `Generated formal communication: ${title}`,
      parentShieldResponseDraft: draft,
      confirmationSent: true,
      notes: 'Formal draft generated via ParentShield and logged for administrative record.',
    };
    handleAddAuditEntry(newEntry);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'advisor' && (
          <AdvocateChat onSaveToAuditLog={handleSaveDraftToAuditLog} />
        )}

        {activeTab === 'one-pager' && (
          <PrintableOnePager />
        )}

        {activeTab === 'review' && (
          <CaseReviewer onSaveDraftToAuditLog={handleSaveDraftToAuditLog} />
        )}

        {activeTab === 'de-escalate' && (
          <EmotionalStripper onSaveToAuditLog={handleSaveDraftToAuditLog} />
        )}

        {activeTab === 'hb730-audit' && (
          <HB730ExclusionaryAudit onSaveToAuditLog={handleSaveDraftToAuditLog} />
        )}

        {activeTab === 'paper-trail' && (
          <AuditTrailTracker
            entries={entries}
            onAddEntry={handleAddAuditEntry}
            onDeleteEntry={handleDeleteAuditEntry}
            onToggleConfirmation={handleToggleConfirmation}
            deadlines={deadlines}
            onUpdateDeadlines={setDeadlines}
          />
        )}

        {activeTab === 'templates' && (
          <LetterTemplatesLibrary onSaveToAuditLog={handleSaveDraftToAuditLog} />
        )}

        {activeTab === 'support' && (
          <SupportParentShield onNavigateToTab={setActiveTab} />
        )}

        {/* Legal Authorities Always Accessible */}
        <div className="pt-4 border-t border-slate-900">
          <LegalReferenceDrawer />
        </div>
      </main>

      {/* Emergency Investigator at Door Modal */}
      <EmergencyAtTheDoorModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onLogIncident={handleAddAuditEntry}
      />

      {/* Footer with Mission Callout & Persistent Grounded Disclaimer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Mission Funding Callout Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-sm">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>Support the Fight to Keep Families Together</span>
              </div>
              <p className="text-slate-300 text-xs max-w-2xl">
                ParentShield is free for parents in crisis. Help us equip every parent with tools to navigate DFPS contact and assert their rights.
              </p>
            </div>
            <button
              type="button"
              id="btn-footer-support-mission"
              onClick={() => {
                setActiveTab('support');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-md cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-950" />
              <span>Fund ParentShield's Mission</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left pt-2 border-t border-slate-800/80">
            <div className="space-y-1">
              <p className="font-semibold text-slate-300">
                ParentShield &bull; Texas DFPS Case Buffer & Administrative Civil Rights Advocate
              </p>
              <p className="text-slate-400 text-[11px]">
                Operating under U.S. Constitution (4th & 14th Amendments) and Texas Family Code Chapters 261, 262, and 263.
              </p>
            </div>

            <div className="max-w-xl bg-slate-950 border border-slate-800 rounded-md p-2.5 text-[11px] text-slate-300">
              <span className="font-semibold text-amber-400">Legal Disclaimer: </span>
              ParentShield is a parental-support tool that provides legal information, documentation, and communication drafting—not formal legal counsel or representation. Outcomes depend on your facts and court orders. Consult a licensed Texas family law attorney for active litigation or court deadlines.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
