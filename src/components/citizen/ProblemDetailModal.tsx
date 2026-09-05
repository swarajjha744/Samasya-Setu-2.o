import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem, ProjectStage } from '../../types';
import { RolePhotoCard } from '../common/RolePhotoCard';
import {
  X,
  Sparkles,
  MapPin,
  Users,
  Building2,
  GraduationCap,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Award,
  DollarSign,
  Boxes,
  MessageSquare,
  ThumbsUp,
  Camera
} from 'lucide-react';
import { ProblemJourneyTimeline } from './ProblemJourneyTimeline';
import { MatchBadge } from '../dashboard/MatchBadge';

interface ProblemDetailModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFeedback: (problem: Problem) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  isOpen,
  onClose,
  onOpenFeedback
}) => {
  const { t, setCurrentRole, setActiveWorkspaceProblemId, coSignProblem } = useApp();
  const [activeTab, setActiveTab] = useState<'dna' | 'timeline' | 'pathways' | 'impact'>('dna');

  if (!isOpen || !problem) return null;

  const coSignCount = problem.coSignCount || 18;
  const isCoSigned = !!problem.userCoSigned;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#e5e2db] rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#f8fafc] border-b border-[#e2e8f0] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
                  {problem.id}
                </span>
                <span className="text-xs font-mono font-bold text-[#0052a5]">
                  {problem.category}
                </span>
                <span className="text-xs font-mono text-[#64748b]">
                  • {problem.district}, {problem.state}
                </span>
              </div>

              <h2 className="text-xl font-bold font-serif text-[#0f172a]">
                {problem.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#e2e8f0] overflow-x-auto">
            <button
              onClick={() => setActiveTab('dna')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                activeTab === 'dna'
                  ? 'bg-white text-[#0052a5] shadow-xs border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {t('problemDetail.tabDna', 'Root Cause & Match')}
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-white text-[#0052a5] shadow-xs border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{t('problemDetail.tabTimeline', 'Progress Steps')}</span>
            </button>
            <button
              onClick={() => setActiveTab('pathways')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                activeTab === 'pathways'
                  ? 'bg-white text-[#0052a5] shadow-xs border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {t('problemDetail.tabPathways', 'Possible Solutions')}
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                activeTab === 'impact'
                  ? 'bg-white text-[#0052a5] shadow-xs border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {t('problemDetail.tabImpact', 'Results & Impact')}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <ProblemJourneyTimeline problem={problem} />
            </div>
          )}

          {activeTab === 'dna' && (
            <div className="space-y-4">
              {/* Photo Evidence & Location Badge Banner - Role Governed */}
              <div className="space-y-3">
                <RolePhotoCard
                  category={problem.category}
                  district={problem.district}
                  title={`${problem.title} · Photo Record`}
                  aspectRatio="video"
                />

                <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="text-[10px] text-[#64748b] uppercase">{t('problemDetail.location', 'Location')}</div>
                    <div className="font-bold text-[#0f172a] truncate">{problem.locationDetails || `${problem.district}, Jharkhand`}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="text-[10px] text-[#64748b] uppercase">{t('problemDetail.population', 'Population')}</div>
                    <div className="font-bold text-[#0052a5]">{(problem.peopleAffected).toLocaleString()} {t('problemDetail.residents', 'Residents')}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <div className="text-[10px] text-emerald-700 uppercase">{t('problemDetail.reporter', 'Reporter')}</div>
                    <div className="font-bold truncate">{problem.submittedByName || 'Local Citizen'} ({problem.submittedDate})</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                <div className="text-xs font-mono uppercase font-bold text-[#ea580c] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {t('problemDetail.rootCauseAnalysis', 'AI Root Cause Analysis')}
                </div>
                <p className="text-sm font-medium text-[#0f172a]">
                  {problem.problemDna?.rootCause || 'Root cause analyzed by AI engine.'}
                </p>
                <div className="text-xs text-[#475569]">
                  {problem.description}
                </div>

                {problem.problemDna?.technicalKeywords && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-2">
                    {problem.problemDna.technicalKeywords.map(kw => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded bg-white text-[#475569] border border-[#cbd5e1] font-mono text-[11px]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Match Details with Explainable Popover */}
              {problem.assignedUniversity && (
                <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-mono font-bold text-xs uppercase text-[#0f172a] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#0052a5]" />
                      <span>{t('problemDetail.assignedLab', 'Assigned College Lab')}: {problem.assignedUniversity.name}</span>
                    </div>
                    <MatchBadge
                      score={problem.assignedUniversity.matchScore}
                      breakdown={problem.assignedUniversity.matchBreakdown}
                      rationale={problem.assignedUniversity.matchRationale}
                      universityName={problem.assignedUniversity.name}
                      size="md"
                    />
                  </div>
                  <p className="text-xs text-[#64748b]">
                    {problem.assignedUniversity.matchRationale || 'Matched based on nearby engineering lab expertise and equipment availability.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pathways' && (
            <div className="space-y-3">
              {problem.solutionPathways && problem.solutionPathways.length > 0 ? (
                problem.solutionPathways.map(pw => (
                  <div key={pw.id} className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
                      <span className="font-serif text-sm">{pw.title}</span>
                      <span className="font-mono text-[#0052a5]">{pw.estimatedCost}</span>
                    </div>
                    <p className="text-xs text-[#475569]">{pw.description}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b] pt-1 border-t border-[#e2e8f0]">
                      <span>{t('problemDetail.difficulty', 'Difficulty')}: {pw.feasibility}</span>
                      <span>{t('problemDetail.estimatedTime', 'Estimated Time')}: {pw.estimatedTime}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="font-bold text-sm font-serif text-[#0f172a]">
                    Low-Cost Modular Filter Solution
                  </div>
                  <p className="text-xs text-[#64748b]">
                    Built using locally available materials with water quality testing sensors.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-4">
              {problem.impactMetrics ? (
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-[#0f172a]">
                    {t('problemDetail.measuredMetric', 'Measured Metric')}: {problem.impactMetrics.metric}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                      <div className="text-[10px] font-mono text-rose-700 uppercase">{t('problemDetail.before', 'Before')}</div>
                      <div className="text-sm font-bold text-rose-900 font-mono mt-0.5">{problem.impactMetrics.baseline}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="text-[10px] font-mono text-emerald-700 uppercase">{t('problemDetail.after', 'After Installation')}</div>
                      <div className="text-sm font-bold text-emerald-900 font-mono mt-0.5">{problem.impactMetrics.postIntervention}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-[10px] font-mono text-[#0052a5] uppercase font-bold">{t('problemDetail.improvement', 'Total Improvement')}</div>
                      <div className="text-sm font-bold text-[#0052a5] font-mono mt-0.5">{problem.impactMetrics.delta}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs font-mono text-[#64748b]">
                  {t('problemDetail.pendingImpact', 'This solution is currently being built in the college lab. Before-and-after test results will appear here once installed in the area.')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => coSignProblem(problem.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                isCoSigned
                  ? 'bg-[#ea580c] text-white border border-[#ea580c]'
                  : 'bg-white hover:bg-[#e2e8f0] text-[#475569] hover:text-[#0f172a] border border-[#cbd5e1]'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isCoSigned ? 'fill-white text-white' : ''}`} />
              <span>{isCoSigned ? t('problemDetail.supported', 'SUPPORTED') : t('problemDetail.support', 'SUPPORT THIS')} ({coSignCount})</span>
            </button>

            <span className="text-xs font-mono text-[#64748b] hidden sm:inline">
              {t('problemDetail.status', 'Current Status')}: <strong className="text-[#0f172a]">{problem.status}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(problem.status === 'Deployed' || problem.status === 'Impact_Verified') && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFeedback(problem);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-mono font-bold text-xs border border-amber-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{t('problemDetail.giveRating', 'GIVE RATING')}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#0052a5] hover:bg-[#003f80] text-white font-mono font-bold text-xs uppercase cursor-pointer"
            >
              {t('common.close', 'CLOSE')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
