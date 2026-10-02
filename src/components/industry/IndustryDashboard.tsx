import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EngageModal } from './EngageModal';
import { Problem } from '../../types';
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Briefcase
} from 'lucide-react';
import { MatchBadge } from '../dashboard/MatchBadge';

const ENGAGEMENT_TYPES = [
  'Fund Pilot Grant',
  'CSR Sponsorship',
  'Provide Tech / Cloud Tier',
  'Commercial Licensing',
  'Field Testing Support',
  'Mentorship / Review'
];

export const IndustryDashboard: React.FC = () => {
  const { t, problems, activeWorkspaceProblemId, setActiveWorkspaceProblemId } = useApp();

  const [expandedOpportunityId, setExpandedOpportunityId] = useState<string | null>(null);
  const [selectedProblemForModal, setSelectedProblemForModal] = useState<Problem | null>(null);
  const [selectedEngagements, setSelectedEngagements] = useState<{ [problemId: string]: string[] }>({});

  const toggleEngagement = (problemId: string, type: string) => {
    setSelectedEngagements(prev => {
      const current = prev[problemId] || [];
      const updated = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
      return { ...prev, [problemId]: updated };
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#e5e2db] shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
            Industry &amp; CSR Partners
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#181512] font-serif">
            {t('industry.title', 'Sponsor and Partner on Projects')}
          </h1>
          <p className="text-xs sm:text-sm text-[#575147] font-mono">
            {problems.length} community projects ready for CSR funding and corporate support.
          </p>
        </div>
      </div>

      {/* OPPORTUNITIES LIST: VISIBLE BY DEFAULT (Title + Match % + Engagement Checkboxes) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif text-[#181512]">
            Open Projects ({problems.length})
          </h2>
          <span className="text-xs font-mono text-[#787267]">
            Choose how to help or view project details
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(problem => {
            const matchScore = problem.assignedUniversity?.matchScore || 88;
            const isOpen = expandedOpportunityId === problem.id;
            const selectedTypes = selectedEngagements[problem.id] || [];

            return (
              <div
                key={problem.id}
                className="p-5 rounded-xl bg-white border border-[#e5e2db] flex flex-col justify-between shadow-xs transition-all hover:border-[#cbd5e1]"
              >
                {/* DEFAULT VISIBLE: Match % + Title */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <MatchBadge
                      score={matchScore}
                      breakdown={problem.assignedUniversity?.matchBreakdown}
                      rationale={problem.assignedUniversity?.matchRationale}
                      universityName="Industry Match"
                      size="sm"
                    />

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1]">
                      {problem.district}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#181512] leading-snug">
                    {problem.title}
                  </h3>

                  {/* DEFAULT VISIBLE: Engagement Selection Checkboxes */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono font-semibold text-[#575147]">
                      How You Can Help:
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {ENGAGEMENT_TYPES.slice(0, 3).map(type => {
                        const isChecked = selectedTypes.includes(type);
                        return (
                          <label
                            key={type}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                              isChecked
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                                : 'bg-[#faf8f5] text-[#575147] border-[#e5e2db] hover:bg-[#f0ece2]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleEngagement(problem.id, type)}
                              className="rounded border-[#d5d0c3] text-emerald-700 focus:ring-emerald-500 w-3.5 h-3.5"
                            />
                            <span className="truncate">{type}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* HIDDEN UNTIL CLICKED: Full Stage Tracker, University info, IP terms, Full Description */}
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-[#f0ece2] space-y-3 text-xs animate-in fade-in duration-150">
                      <p className="text-xs text-[#575147] leading-relaxed">
                        {problem.description}
                      </p>

                      {/* Remaining engagement options */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase font-bold text-[#787267]">
                          Other Ways to Help:
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {ENGAGEMENT_TYPES.slice(3).map(type => {
                            const isChecked = selectedTypes.includes(type);
                            return (
                              <label
                                key={type}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                                  isChecked
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                                    : 'bg-[#faf8f5] text-[#575147] border-[#e5e2db] hover:bg-[#f0ece2]'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleEngagement(problem.id, type)}
                                  className="rounded border-[#d5d0c3] text-emerald-700 focus:ring-emerald-500 w-3.5 h-3.5"
                                />
                                <span className="truncate">{type}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* R&D Stage & University Details */}
                      <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#787267]">Current Stage:</span>
                          <span className="font-bold text-[#c25e2e]">{problem.status}</span>
                        </div>
                        {problem.assignedUniversity && (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-[#787267]">Research Lead:</span>
                            <span className="font-medium text-[#181512]">{problem.assignedUniversity.name}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#787267]">IP License:</span>
                          <span className="text-[#181512]">Open Civic License</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#787267]">Funding Needed:</span>
                          <span className="font-bold text-emerald-800">
                            {problem.problemDna?.suggestedBudgetRange || '₹4,50,000'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 mt-3 border-t border-[#f0ece2] space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProblemForModal(problem)}
                    className="w-full py-2 rounded bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Support This Project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedOpportunityId(isOpen ? null : problem.id)}
                    className="w-full text-center text-[11px] font-mono text-[#787267] hover:text-[#181512] transition-colors cursor-pointer"
                  >
                    {isOpen ? '▲ Hide project details' : '▼ View project details & IP terms'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engagement Modal */}
      {selectedProblemForModal && (
        <EngageModal
          problem={selectedProblemForModal}
          isOpen={!!selectedProblemForModal}
          onClose={() => setSelectedProblemForModal(null)}
        />
      )}
    </div>
  );
};
