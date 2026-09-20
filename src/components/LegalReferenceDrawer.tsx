import React, { useState } from 'react';
import { Scale, BookOpen, ChevronDown, ChevronUp, Shield, ExternalLink } from 'lucide-react';
import { LEGAL_AUTHORITIES } from '../data/legalAuthorities';

export const LegalReferenceDrawer: React.FC = () => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const toggleExpand = (code: string) => {
    setExpandedCode(expandedCode === code ? null : code);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
            <Scale className="w-5 h-5 text-amber-500" />
            Core Legal Authorities & Statutory Architecture
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            The strong constitutional and statutory foundation under which ParentShield advocates for parents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {LEGAL_AUTHORITIES.map((auth) => {
          const isExpanded = expandedCode === auth.code;
          return (
            <div
              key={auth.code}
              className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 transition-all hover:border-slate-700"
            >
              <div
                onClick={() => toggleExpand(auth.code)}
                className="flex items-start justify-between gap-2 cursor-pointer select-none"
              >
                <div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400 uppercase tracking-wider">
                    {auth.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1">
                    {auth.code}
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    {auth.title}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-white p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {auth.summary}
              </p>

              {isExpanded && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs animate-in fade-in duration-200">
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 text-amber-200/90">
                    <strong className="text-amber-400">Parental Protection: </strong>
                    {auth.protection}
                  </div>
                  <div className="italic text-slate-400 border-l-2 border-amber-500/50 pl-2 text-[11px] font-serif">
                    "{auth.keyQuote}"
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
