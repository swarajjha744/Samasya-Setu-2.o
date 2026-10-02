import React from 'react';
import { Problem } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, TrendingDown, TrendingUp, Users, MapPin, Star, Building2, GraduationCap } from 'lucide-react';

interface ImpactCardProps {
  problem: Problem;
  onOpenDetail?: (problem: Problem) => void;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({ problem, onOpenDetail }) => {
  const { t } = useApp();
  const impact = problem.impactMetrics;
  if (!impact) return null;

  const { metric, baseline, postIntervention, delta, verifiedDate, telemetrySource } = impact;

  return (
    <div className="p-6 rounded-lg bg-white border border-[#e5e2db] hover:border-[#c25e2e] transition-all space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1]">
              {problem.id}
            </span>
            <span className="text-xs font-mono font-bold text-[#c25e2e]">
              {t(problem.category, problem.category)}
            </span>
            <span className="text-xs text-[#787267] font-mono flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#c25e2e]" />
              {t(problem.district, problem.district)}, {problem.state}
            </span>
          </div>
          <h4 className="text-base font-bold font-serif text-[#181512]">
            {problem.title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('impactCard.verifiedResolution', 'Verified Ground Resolution')}</span>
        </div>
      </div>

      {/* Metric Focus: Before vs After Delta Box */}
      <div className="p-4 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-3">
        <div className="text-xs font-mono font-semibold text-[#181512] flex items-center justify-between">
          <span>{t('impactCard.primaryKpi', 'Primary KPI:')} {metric}</span>
          <span className="text-[11px] font-mono text-[#787267]">{t('impactCard.source', 'Source:')} {telemetrySource}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Baseline Before */}
          <div className="p-3 rounded bg-[#fff5f5] border border-rose-200 text-center">
            <div className="text-[10px] font-mono uppercase font-bold text-rose-800">
              {t('impactCard.baseline', 'Pre-Pilot Baseline')}
            </div>
            <div className="text-base sm:text-lg font-bold text-rose-900 font-mono mt-1">
              {baseline}
            </div>
          </div>

          {/* Outcome After */}
          <div className="p-3 rounded bg-[#f4fbf7] border border-emerald-200 text-center">
            <div className="text-[10px] font-mono uppercase font-bold text-emerald-800">
              {t('impactCard.postIntervention', 'Post-Intervention')}
            </div>
            <div className="text-base sm:text-lg font-bold text-emerald-900 font-mono mt-1">
              {postIntervention}
            </div>
          </div>

          {/* Improvement Delta */}
          <div className="p-3 rounded bg-[#f4f0e6] border border-[#e2ddd1] text-center">
            <div className="text-[10px] font-mono uppercase font-bold text-[#c25e2e]">
              {t('impactCard.verifiedDelta', 'Verified Delta')}
            </div>
            <div className="text-base sm:text-lg font-bold text-[#c25e2e] font-mono mt-1">
              {delta}
            </div>
          </div>
        </div>
      </div>

      {/* Ground Feedback and Citizen Ratings */}
      <div className="flex items-center justify-between text-xs font-mono pt-1 text-[#575147]">
        <div>
          {t('impactCard.citizensBenefitted', 'Citizens Benefitted:')} <span className="font-bold text-[#181512]">{(problem.peopleAffected).toLocaleString()}</span>
        </div>
        <div>
          {t('impactCard.verifiedOn', 'Verified On:')} <span className="font-bold text-[#181512]">{verifiedDate}</span>
        </div>
      </div>
    </div>
  );
};
