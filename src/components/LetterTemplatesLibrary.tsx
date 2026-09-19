import React, { useState } from 'react';
import { BookOpen, Copy, CheckCircle2, FileText, Send, Sparkles, Filter } from 'lucide-react';
import { LETTER_TEMPLATES, LetterTemplate } from '../data/letterTemplates';

interface LetterTemplatesLibraryProps {
  onSaveToAuditLog?: (draft: string, title: string) => void;
}

export const LetterTemplatesLibrary: React.FC<LetterTemplatesLibraryProps> = ({ onSaveToAuditLog }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate>(LETTER_TEMPLATES[0]);
  const [caseworkerName, setCaseworkerName] = useState('');
  const [parentName, setParentName] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [caseId, setCaseId] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Paper Trail Rule', 'Refusal of Voluntary Demand', 'Safety Plan / Custody', 'Statutory Rights Assertion'];

  const filteredTemplates = selectedCategory === 'All'
    ? LETTER_TEMPLATES
    : LETTER_TEMPLATES.filter(t => t.category === selectedCategory);

  // Substitute placeholders
  const renderPopulatedBody = (templateBody: string) => {
    return templateBody
      .replace(/\[Caseworker Name\]/g, caseworkerName.trim() || '[Caseworker Name]')
      .replace(/\[Parent Full Name\]/g, parentName.trim() || '[Parent Name]')
      .replace(/\[Parent Signature \/ Name\]/g, parentName.trim() || '[Parent Signature / Name]')
      .replace(/\[Parent Name\]/g, parentName.trim() || '[Parent Name]')
      .replace(/\[Date\]/g, date.trim() || '[Date]')
      .replace(/\[Time\]/g, time.trim() || '[Time]')
      .replace(/\[Case ID \/ Family Name\]/g, caseId.trim() || '[Case ID / Family Name]')
      .replace(/\[Case ID\]/g, caseId.trim() || '[Case ID]');
  };

  const handleCopy = () => {
    const text = renderPopulatedBody(selectedTemplate.body);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToLog = () => {
    if (!onSaveToAuditLog) return;
    const text = renderPopulatedBody(selectedTemplate.body);
    onSaveToAuditLog(text, selectedTemplate.title);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-amber-500">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">
            Formal Legal Letters & Paper Trail Library
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Standardized, legally precise communications designed to dismantle vague demands, assert Texas Family Code protections, and eliminate involuntary administrative admissions.
        </p>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Selection */}
        <div className="lg:col-span-5 space-y-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplate.id === template.id;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{template.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Placeholder Form & Live Document Preview */}
        <div className="lg:col-span-7 space-y-4">
          {/* Fill Placeholders Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Bracketed Placeholders:</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">[Caseworker Name]</label>
                <input
                  type="text"
                  placeholder="e.g. Worker Smith"
                  value={caseworkerName}
                  onChange={(e) => setCaseworkerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">[Parent Name]</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">[Case ID / Number]</label>
                <input
                  type="text"
                  placeholder="e.g. DFPS-109283"
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">[Date]</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">[Time]</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Letter Preview & Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-white font-serif">{selectedTemplate.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {selectedTemplate.subjectLine.replace(/\[Date\]/g, date).replace(/\[Time\]/g, time)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-copy-template"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Letter</span>
                    </>
                  )}
                </button>
                {onSaveToAuditLog && (
                  <button
                    onClick={handleSaveToLog}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{saved ? 'Saved to Log!' : 'Save to Log'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Rendered Text */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-500 selection:text-slate-950 overflow-x-auto max-h-[480px]">
              {renderPopulatedBody(selectedTemplate.body)}
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Legal Notice: I provide legal information, documentation, and communication drafting, but this is not formal legal counsel; consult a licensed family law attorney for active litigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
