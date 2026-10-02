import React, { useState } from 'react';
import { CrossClusterPatternInsight } from '../../types';
import { CROSS_CLUSTER_INSIGHTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  GitMerge,
  Network,
  ArrowRight,
  Layers,
  Building2,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const CrossClusterPatternPanel: React.FC = () => {
  const { t } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>('INS-001');

  return (
    <div className="p-6 rounded-lg bg-white border border-[#e5e2db] shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0ece2]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-[#c25e2e]" />
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#181512]">
              {t('patterns.title', 'AI Cross-Cluster Root Cause & Systemic Pattern Insights')}
            </h3>
          </div>
          <p className="text-xs text-[#575147]">
            {t('patterns.sub', 'Surfacing multi-district commonalities to unlock shared university blueprints, pooled CSR grants, and joint procurement economies of scale.')}
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#faf3ed] text-[#c25e2e] border border-[#e8d5c8] shrink-0">
          {t('patterns.badge', '3 SYSTEMIC PATTERNS DETECTED')}
        </span>
      </div>

      {/* Pattern Cards List */}
      <div className="space-y-4">
        {CROSS_CLUSTER_INSIGHTS.map(insight => {
          const isExpanded = expandedId === insight.id;

          return (
            <div
              key={insight.id}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? 'bg-white border-[#c25e2e] shadow-md ring-1 ring-[#c25e2e]'
                  : 'bg-[#faf8f5] border-[#e5e2db] hover:border-[#d5d0c3]'
              }`}
            >
              {/* Collapsed/Header bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1]">
                      {insight.id}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#c25e2e]">
                      {t(insight.category, insight.category)}
                    </span>
                    <span className="text-xs font-mono text-[#787267]">
                      • {insight.totalPeopleAffected.toLocaleString()} {t('patterns.citizensImpacted', 'Combined Citizens Impacted')}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-[#181512] leading-snug">
                    {insight.title}
                  </h4>

                  <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                    <span className="text-[#787267]">{t('patterns.connectedDistricts', 'Connected Districts:')}</span>
                    {insight.affectedDistricts.map((dist, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white text-[#181512] border border-[#e5e2db] font-semibold text-[11px]"
                      >
                        {t(dist, dist)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2 rounded hover:bg-[#f4f0e6] text-[#787267]">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#c25e2e]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#f0ece2] animate-in fade-in duration-150">
                  {/* Shared Root Cause Box */}
                  <div className="p-3.5 rounded bg-[#faf8f5] border border-[#e8e4dc] space-y-1">
                    <div className="text-[10px] font-mono font-bold uppercase text-[#c25e2e]">
                      {t('patterns.rootCause', 'Underlying Systemic Root Cause')}
                    </div>
                    <p className="text-xs text-[#181512] leading-relaxed">
                      {insight.sharedRootCause}
                    </p>
                  </div>

                  {/* 2-Column Synergy & Recommendation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-emerald-800">
                        <Zap className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t('patterns.synergy', 'Inter-District Synergy & Cost Savings')}</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {insight.interDistrictSynergy}
                      </p>
                    </div>

                    <div className="p-3.5 rounded bg-amber-50/60 border border-amber-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('patterns.recommendedAction', 'Recommended Institutional Action')}</span>
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        {insight.recommendedIntervention}
                      </p>
                    </div>
                  </div>

                  {/* Consortium Partners & Lead Labs */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#787267] uppercase text-[10px] font-bold">{t('patterns.suggestedConsortium', 'Suggested R&D Consortium:')}</span>
                      {insight.potentialLeadInstitutions.map((inst, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1] text-[11px]"
                        >
                          {inst}
                        </span>
                      ))}
                    </div>

                    <span className="text-[#c25e2e] font-bold">
                      {t('patterns.linkedClusters', 'Linked Clusters:')} {Array.isArray(insight.clusterIds) ? insight.clusterIds.join(', ') : (insight.clusterIds || '')}
                    </span>
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
