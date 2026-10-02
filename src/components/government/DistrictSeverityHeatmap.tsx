import React, { useState } from 'react';
import { DistrictStat } from '../../types';
import { DISTRICT_STATS_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Users,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface DistrictSeverityHeatmapProps {
  onSelectDistrict?: (districtName: string) => void;
  selectedDistrict?: string;
}

export const DistrictSeverityHeatmap: React.FC<DistrictSeverityHeatmapProps> = ({
  onSelectDistrict,
  selectedDistrict = 'All Districts'
}) => {
  const { t } = useApp();
  const [metricMode, setMetricMode] = useState<'severity' | 'affected' | 'critical'>('severity');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const stats = [...DISTRICT_STATS_DATA].sort((a, b) => {
    let diff = 0;
    if (metricMode === 'severity') diff = b.severityScore - a.severityScore;
    if (metricMode === 'affected') diff = b.peopleAffected - a.peopleAffected;
    if (metricMode === 'critical') diff = b.criticalCount - a.criticalCount;
    return sortOrder === 'desc' ? diff : -diff;
  });

  // Calculate color intensity based on score
  const getSeverityBgColor = (score: number) => {
    if (score >= 85) return 'bg-[#7c1d1d] text-white'; // Deep crimson
    if (score >= 80) return 'bg-[#c25e2e] text-white'; // SamasyaSetu terracotta
    if (score >= 75) return 'bg-[#ea580c] text-white'; // Intense amber-orange
    if (score >= 70) return 'bg-[#d97706] text-white'; // Warm amber
    return 'bg-[#65a30d] text-white'; // Olive/Green
  };

  const getHeatmapTileClass = (stat: DistrictStat) => {
    if (metricMode === 'severity') {
      if (stat.severityScore >= 85) return 'bg-rose-100 border-rose-400 text-rose-950';
      if (stat.severityScore >= 80) return 'bg-orange-100 border-orange-400 text-orange-950';
      if (stat.severityScore >= 75) return 'bg-amber-100 border-amber-400 text-amber-950';
      return 'bg-emerald-50 border-emerald-300 text-emerald-950';
    } else if (metricMode === 'affected') {
      if (stat.peopleAffected >= 100000) return 'bg-rose-100 border-rose-400 text-rose-950';
      if (stat.peopleAffected >= 50000) return 'bg-orange-100 border-orange-400 text-orange-950';
      return 'bg-amber-50 border-amber-300 text-amber-950';
    } else {
      if (stat.criticalCount >= 8) return 'bg-rose-100 border-rose-400 text-rose-950';
      if (stat.criticalCount >= 5) return 'bg-orange-100 border-orange-400 text-orange-950';
      return 'bg-amber-50 border-amber-300 text-amber-950';
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white border border-[#e5e2db] shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0ece2]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#c25e2e]" />
            <h3 className="text-base font-bold font-serif text-[#181512]">
              {t('heatmap.title', 'Regional Vulnerability & Severity Heatmap')}
            </h3>
          </div>
          <p className="text-xs text-[#575147]">
            {t('heatmap.sub', 'Jharkhand district-wise multi-factor crisis index weighted by grievance density, fluoride/mine-dust severity, and citizen population exposed.')}
          </p>
        </div>

        {/* View Dimension Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#faf8f5] p-1 rounded border border-[#e5e2db] text-xs font-mono">
            <button
              onClick={() => setMetricMode('severity')}
              className={`px-3 py-1.5 rounded font-bold uppercase transition-all ${
                metricMode === 'severity'
                  ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                  : 'text-[#787267] hover:text-[#181512]'
              }`}
            >
              {t('heatmap.severityIndex', 'Severity Index')}
            </button>
            <button
              onClick={() => setMetricMode('affected')}
              className={`px-3 py-1.5 rounded font-bold uppercase transition-all ${
                metricMode === 'affected'
                  ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                  : 'text-[#787267] hover:text-[#181512]'
              }`}
            >
              {t('heatmap.citizensExposed', 'Citizens Exposed')}
            </button>
            <button
              onClick={() => setMetricMode('critical')}
              className={`px-3 py-1.5 rounded font-bold uppercase transition-all ${
                metricMode === 'critical'
                  ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                  : 'text-[#787267] hover:text-[#181512]'
              }`}
            >
              {t('heatmap.criticalIncidents', 'Critical Incidents')}
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map(stat => {
          const isSelected = selectedDistrict === stat.district;

          return (
            <div
              key={stat.district}
              onClick={() => onSelectDistrict && onSelectDistrict(stat.district)}
              className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-3 ${
                getHeatmapTileClass(stat)
              } ${
                isSelected
                  ? 'ring-2 ring-[#c25e2e] shadow-md scale-[1.02]'
                  : 'hover:shadow-md hover:scale-[1.01]'
              }`}
            >
              {/* Header inside Tile */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold font-serif text-[#181512] leading-tight">
                    {t(stat.district, stat.district)}
                  </h4>
                  <span className="text-[11px] font-mono text-[#575147]">{stat.state}</span>
                </div>

                <div className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${getSeverityBgColor(stat.severityScore)}`}>
                  {stat.severityScore}/100
                </div>
              </div>

              {/* Primary Metric Pill */}
              <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded border border-[#e8e4dc] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#575147] uppercase text-[10px]">{t('heatmap.dominantDomain', 'Dominant Domain:')}</span>
                  <span className="font-bold text-[#c25e2e] truncate max-w-[130px]">{t(stat.topCategory, stat.topCategory)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#575147] uppercase text-[10px]">{t('heatmap.peopleImpacted', 'People Impacted:')}</span>
                  <span className="font-bold text-[#181512]">{stat.peopleAffected.toLocaleString()}</span>
                </div>
              </div>

              {/* Severity Counts Breakdown Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#787267]">
                  <span>{t('heatmap.vulnerabilitySpectrum', 'Vulnerability Spectrum')}</span>
                  <span>{stat.totalProblems} {t('heatmap.totalReports', 'Total Reports')}</span>
                </div>
                {/* Micro segmented bar */}
                <div className="flex h-2 rounded-full overflow-hidden w-full bg-[#e8e4dc]">
                  <div
                    style={{ width: `${(stat.criticalCount / stat.totalProblems) * 100}%` }}
                    className="bg-rose-600"
                    title={`${stat.criticalCount} Critical`}
                  />
                  <div
                    style={{ width: `${(stat.highCount / stat.totalProblems) * 100}%` }}
                    className="bg-amber-500"
                    title={`${stat.highCount} High`}
                  />
                  <div
                    style={{ width: `${(stat.mediumCount / stat.totalProblems) * 100}%` }}
                    className="bg-sky-500"
                    title={`${stat.mediumCount} Medium`}
                  />
                  <div
                    style={{ width: `${((stat.lowCount || 0) / stat.totalProblems) * 100}%` }}
                    className="bg-emerald-500"
                    title={`${stat.lowCount || 0} Low`}
                  />
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-2 border-t border-[#e8e4dc]/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#575147]">
                  {stat.activeClusters} {t('heatmap.activeClusters', 'Active Clusters')}
                </span>
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {stat.resolvedCount} {t('heatmap.resolved', 'Resolved')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heatmap Legend */}
      <div className="pt-3 border-t border-[#f0ece2] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#787267]">
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#181512]">{t('heatmap.severityKey', 'Severity Key:')}</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-600 inline-block" />
            <span>{t('heatmap.critical', 'Critical (>85)')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#c25e2e] inline-block" />
            <span>{t('heatmap.high', 'High (80-84)')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
            <span>{t('heatmap.elevated', 'Elevated (75-79)')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
            <span>{t('heatmap.moderate', 'Moderate (<75)')}</span>
          </div>
        </div>

        <span className="text-[11px] italic">
          {t('heatmap.filterHint', 'Click any district card above to filter the ecosystem ledger')}
        </span>
      </div>
    </div>
  );
};
