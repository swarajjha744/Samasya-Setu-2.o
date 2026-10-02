import React, { useState } from 'react';
import { Problem } from '../../types';
import {
  Calculator,
  Users,
  MapPin,
  TrendingUp,
  Leaf,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Sliders,
  Building2
} from 'lucide-react';

interface ImpactCalculatorProps {
  problem?: Problem;
  initialGrant?: number; // In Lakhs, e.g. 5
  className?: string;
  onCommitWithAmount?: (amountFormatted: string) => void;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({
  problem,
  initialGrant = 5,
  className = '',
  onCommitWithAmount
}) => {
  const [grantLakhs, setGrantLakhs] = useState<number>(initialGrant);

  // Baseline metrics derived from problem or defaults
  const basePeoplePerLakh = problem?.peopleAffected
    ? Math.round(problem.peopleAffected / 3.5)
    : 1200;
  const baseVillagesPerLakh = 2.4;
  const baseSavingsPerLakh = 4.2; // in Lakhs
  const baseCo2PerLakh = 18.5; // in Tons

  const projectedPeople = Math.round(grantLakhs * basePeoplePerLakh);
  const projectedVillages = Math.max(1, Math.round(grantLakhs * baseVillagesPerLakh));
  const projectedSavings = (grantLakhs * baseSavingsPerLakh).toFixed(1);
  const projectedCo2 = Math.round(grantLakhs * baseCo2PerLakh);
  const esgScore = Math.min(99, Math.round(80 + (grantLakhs / 20) * 19));

  return (
    <div className={`p-6 rounded-lg bg-white border border-[#e5e2db] shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0ece2]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#c25e2e]" />
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#181512]">
              Corporate ESG &amp; Projected Impact Calculator
            </h3>
          </div>
          <p className="text-xs text-[#575147]">
            Simulate CSR grant leverage, beneficiary scale, carbon offsets, and economic returns for {problem ? `"${problem.title.slice(0, 38)}..."` : 'selected civic cluster'}.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#faf3ed] text-[#c25e2e] border border-[#e8d5c8] font-mono font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ESG SCORE: {esgScore}/100</span>
        </div>
      </div>

      {/* Interactive Grant Slider */}
      <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e8e4dc] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold uppercase text-[#181512]">
            Committed CSR Grant Allocation:
          </label>
          <div className="text-lg font-bold font-mono text-[#c25e2e]">
            ₹{grantLakhs.toLocaleString()},00,000 <span className="text-xs font-normal text-[#787267]">({grantLakhs} Lakhs)</span>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="25"
          step="0.5"
          value={grantLakhs}
          onChange={e => setGrantLakhs(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#e0dad0] rounded-lg appearance-none cursor-pointer accent-[#c25e2e]"
        />

        <div className="flex justify-between text-[10px] font-mono text-[#787267]">
          <span>₹1 Lakh (Seed Trial)</span>
          <span>₹10 Lakhs (District Pilot)</span>
          <span>₹25 Lakhs (Regional Scale)</span>
        </div>
      </div>

      {/* Dynamic 4-Grid Outcome Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Citizens Benefitted */}
        <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#787267]">
            <Users className="w-3.5 h-3.5 text-[#c25e2e]" />
            <span>Direct Beneficiaries</span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#181512]">
            {projectedPeople.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-[#c25e2e]">
            Across {projectedVillages} Wards/Villages
          </div>
        </div>

        {/* Metric 2: Economic Savings */}
        <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#787267]">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Projected Annual Savings</span>
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-800">
            ₹{projectedSavings} Lakhs
          </div>
          <div className="text-[11px] font-mono text-emerald-700">
            {(parseFloat(projectedSavings) / grantLakhs).toFixed(1)}x Annual Economic Multiplier
          </div>
        </div>

        {/* Metric 3: Carbon / Environmental Offset */}
        <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#787267]">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>CO2 / Chemical Offset</span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#181512]">
            {projectedCo2} Tons
          </div>
          <div className="text-[11px] font-mono text-[#575147]">
            Verified Telemetry Offset
          </div>
        </div>

        {/* Metric 4: Government Cost Matching */}
        <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#787267]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c25e2e]" />
            <span>Govt / Lab Co-Funding</span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#181512]">
            ₹{(grantLakhs * 0.8).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] font-mono text-[#575147]">
            DST / Municipal matching grant
          </div>
        </div>
      </div>

      {/* Footer Callout */}
      <div className="p-4 rounded bg-[#faf8f5] border border-[#e8e4dc] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="font-mono font-bold text-[#181512]">
            Statutory CSR Compliance Guaranteed
          </div>
          <div className="text-[#575147]">
            Section 135 Schedule VII compliant for R&amp;D incubation, rural development, and clean technology pilots.
          </div>
        </div>

        {onCommitWithAmount && (
          <button
            onClick={() => onCommitWithAmount(`₹${grantLakhs},00,000`)}
            className="px-4 py-2 rounded bg-[#c25e2e] hover:bg-[#a94f24] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-sm"
          >
            Commit ₹{grantLakhs} Lakhs
          </button>
        )}
      </div>
    </div>
  );
};
