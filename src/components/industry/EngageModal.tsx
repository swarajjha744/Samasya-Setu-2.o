import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem } from '../../types';
import {
  X,
  Building2,
  DollarSign,
  Cpu,
  GraduationCap,
  MapPin,
  Rocket,
  CheckCircle2,
  Sparkles,
  Calculator
} from 'lucide-react';
import { ImpactCalculator } from './ImpactCalculator';

interface EngageModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EngageModal: React.FC<EngageModalProps> = ({
  problem,
  isOpen,
  onClose
}) => {
  const { engageIndustryPartner } = useApp();

  const [partnerName, setPartnerName] = useState('Tata Steel Foundation & Thermax CSR');
  const [partnerType, setPartnerType] = useState<'Funding' | 'Technology' | 'Mentorship' | 'Pilot Site' | 'Manufacturing'>('Funding');
  const [committedAmount, setCommittedAmount] = useState('₹5,00,000');
  const [contributionDetails, setContributionDetails] = useState(
    'CSR grant for fabrication of 5 village filter units and sensor hardware procurement.'
  );

  if (!isOpen || !problem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    engageIndustryPartner(problem.id, {
      name: partnerName,
      supportType: partnerType,
      amount: committedAmount,
      commitmentDetails: contributionDetails
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#e5e2db] rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#f0ece2] pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#c25e2e]" />
            <h3 className="text-lg font-bold font-serif text-[#181512]">
              Offer CSR Funding or Support
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#787267] hover:text-[#181512] hover:bg-[#faf8f5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Project Summary */}
        <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e5e2db] space-y-1">
          <div className="text-[10px] font-mono uppercase font-bold text-[#c25e2e]">
            Project: {problem.id} ({problem.category})
          </div>
          <div className="text-sm font-bold text-[#181512] font-serif">
            {problem.title}
          </div>
          <div className="text-xs text-[#787267] font-mono">
            University: <span className="text-[#181512] font-semibold">{problem.assignedUniversity?.name}</span> • District: <span className="text-[#181512] font-semibold">{problem.district}</span>
          </div>
        </div>

        {/* Embedded Impact Calculator */}
        <ImpactCalculator
          problem={problem}
          initialGrant={5}
          onCommitWithAmount={amt => setCommittedAmount(amt)}
        />

        {/* Commitment Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
          <div>
            <label className="block font-mono uppercase text-[#787267] mb-1">
              Company or Foundation Name *
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase text-[#787267] mb-1">
                Support Type
              </label>
              <select
                value={partnerType}
                onChange={e => setPartnerType(e.target.value as any)}
                className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
              >
                <option value="Funding">CSR Grant (Money)</option>
                <option value="Technology">Hardware / Equipment</option>
                <option value="Mentorship">Technical Mentorship</option>
                <option value="Pilot Site">Testing Site</option>
                <option value="Manufacturing">Manufacturing Support</option>
              </select>
            </div>

            <div>
              <label className="block font-mono uppercase text-[#787267] mb-1">
                Estimated Value or Amount
              </label>
              <input
                type="text"
                value={committedAmount}
                onChange={e => setCommittedAmount(e.target.value)}
                className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2.5 text-xs text-[#181512] font-mono focus:outline-none focus:border-[#c25e2e]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-[#787267] mb-1">
              What will you provide? *
            </label>
            <textarea
              rows={2}
              value={contributionDetails}
              onChange={e => setContributionDetails(e.target.value)}
              className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f0ece2]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#faf8f5] border border-[#d5d0c3] font-mono text-[#575147] hover:bg-[#f4f0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded bg-[#c25e2e] text-white font-mono font-bold uppercase tracking-wider hover:bg-[#a94f24] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Support</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
