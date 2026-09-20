import React from 'react';
import { Award } from 'lucide-react';
import { SupportPledge } from '../../types';

type Props = {
  showThankYouModal: boolean;
  lastPledge: SupportPledge | null;
  setShowThankYouModal: (b: boolean) => void;
};

export const SupportThankYouModal: React.FC<Props> = ({
  showThankYouModal,
  lastPledge,
  setShowThankYouModal,
}) => (
  <>
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
  </>
);
