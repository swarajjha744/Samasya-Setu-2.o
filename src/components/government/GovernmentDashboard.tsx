import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImpactCard } from './ImpactCard';
import { DistrictSeverityHeatmap } from './DistrictSeverityHeatmap';
import { CrossClusterPatternPanel } from './CrossClusterPatternPanel';
import { ReplicateDeploymentModal } from './ReplicateDeploymentModal';
import { GovernmentTriageDesk } from './GovernmentTriageDesk';
import { JHARKHAND_DISTRICTS_LIST } from '../../data/mockData';
import { Problem } from '../../types';
import {
  Landmark,
  Sparkles,
  Layers,
  Flame,
  Filter,
  BarChart3,
  Copy,
  ChevronDown,
  ArrowUpRight,
  ShieldAlert,
  Home,
  ArrowLeft,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PIE_COLORS = ['#0052a5', '#ea580c', '#0284c7', '#f97316', '#1e3a8a', '#fb923c', '#0369a1', '#c2410c'];

export const GovernmentDashboard: React.FC = () => {
  const { t, problems, clusters, setCurrentRole, setPublicTab } = useApp();

  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [activeTab, setActiveTab] = useState<'triage' | 'analytics' | 'heatmap' | 'patterns' | 'deployments' | 'clusters'>('triage');
  const [replicateProblem, setReplicateProblem] = useState<Problem | null>(null);

  // Filter problems by district
  const filteredProblems = problems.filter(p => {
    return districtFilter === 'All Districts' || p.district === districtFilter;
  });

  // Calculate 6 Core Stat Cards
  const problemsSubmitted = filteredProblems.length;
  const validated = filteredProblems.length; // all in system are AI-validated
  const clustersCount = clusters.filter(c => {
    if (districtFilter === 'All Districts') return true;
    if (c.district === districtFilter) return true;
    if (Array.isArray(c.districts) && c.districts.includes(districtFilter)) return true;
    return false;
  }).length;
  const projectsActive = filteredProblems.filter(p => ['Research', 'Prototype', 'Pilot'].includes(p.status)).length;
  const solutionsDeveloped = filteredProblems.filter(p => ['Prototype', 'Pilot', 'Deployed', 'Impact_Verified'].includes(p.status)).length;
  const solutionsDeployed = filteredProblems.filter(p => p.status === 'Deployed' || p.status === 'Impact_Verified').length;

  const STAT_CARDS = [
    { key: 'problemsSubmitted', label: t('governmentDashboard.problemsSubmitted', 'Problems submitted'), value: problemsSubmitted, sub: t('governmentDashboard.problemsSubmittedSub', 'Total reported across wards') },
    { key: 'validated', label: t('governmentDashboard.validated', 'Validated'), value: validated, sub: t('governmentDashboard.validatedSub', 'Ground-truth AI verified') },
    { key: 'clusters', label: t('governmentDashboard.clusters', 'Clusters'), value: clustersCount, sub: t('governmentDashboard.clustersSub', 'Active AI clustering · updated 4m ago') },
    { key: 'projectsActive', label: t('governmentDashboard.activeProjects', 'Active projects'), value: projectsActive, sub: t('governmentDashboard.activeProjectsSub', 'Currently in HEI lab R&D') },
    { key: 'solutionsDeveloped', label: t('governmentDashboard.solutionsDeveloped', 'Solutions developed'), value: solutionsDeveloped, sub: t('governmentDashboard.solutionsDevelopedSub', 'Prototypes & tested pilots') },
    { key: 'solutionsDeployed', label: t('governmentDashboard.solutionsDeployed', 'Solutions deployed'), value: solutionsDeployed, sub: t('governmentDashboard.solutionsDeployedSub', 'Serving panchayats') }
  ];

  // Status Distribution Data for Recharts
  const statusData = [
    { name: 'Submitted', count: filteredProblems.filter(p => p.status === 'Submitted' || p.status === 'Under_Govt_Triage').length, fill: '#0052a5' },
    { name: 'Research', count: filteredProblems.filter(p => p.status === 'Research').length, fill: '#0284c7' },
    { name: 'Prototype', count: filteredProblems.filter(p => p.status === 'Prototype').length, fill: '#ea580c' },
    { name: 'Pilot', count: filteredProblems.filter(p => p.status === 'Pilot').length, fill: '#f97316' },
    { name: 'Deployed', count: filteredProblems.filter(p => p.status === 'Deployed' || p.status === 'Impact_Verified').length, fill: '#1e3a8a' }
  ];

  // Category Distribution Data
  const categoryMap: { [key: string]: number } = {};
  filteredProblems.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });
  const categoryData = Object.keys(categoryMap).map(k => ({
    name: k.split(' ')[0],
    fullName: k,
    value: categoryMap[k]
  }));

  const deployedWithImpact = problems.filter(p => p.impactMetrics);

  const handleSelectDistrictFromHeatmap = (districtName: string) => {
    setDistrictFilter(districtName);
    setActiveTab('analytics');
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* Top Redirection Breadcrumb & Website Home Shortcut */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748b]">
          <button
            type="button"
            onClick={() => {
              setPublicTab('home');
              setCurrentRole('public');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#0052a5] hover:text-[#003f80] flex items-center gap-1.5 font-bold cursor-pointer hover:underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('governmentDashboard.websiteHome', 'Website Home')}</span>
          </button>
          <span>/</span>
          <span className="font-bold text-[#0f172a]">{t('governmentDashboard.portalTitle', 'Government Portal')}</span>
          <span>/</span>
          <span className="capitalize text-[#475569]">{activeTab}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setPublicTab('home');
            setCurrentRole('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-mono font-bold text-[#0052a5] hover:text-[#003f80] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('governmentDashboard.returnHome', 'Return to Public Website')}</span>
        </button>
      </div>

      {/* Top Banner Header & District Dropdown Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-mono font-bold uppercase text-[#0052a5]">
            <Landmark className="w-3.5 h-3.5" />
            <span>{t('governmentDashboard.badge', 'Government of Jharkhand · State Triage & Oversight')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-serif">
            {t('governmentDashboard.title', 'Government Triage & Civic Ledger')}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b]">
            {t('governmentDashboard.subtitle', 'Review incoming district grievances, assign municipal repairs to MBMC/PWD, and route complex challenges to universities.')}
          </p>
        </div>

        {/* District Filter Dropdown */}
        <div className="flex items-center gap-2.5 bg-[#f8fafc] p-2.5 rounded-2xl border border-[#cbd5e1] self-start md:self-auto shadow-xs">
          <Filter className="w-4 h-4 text-[#ea580c] shrink-0" />
          <span className="text-xs font-bold text-[#475569]">{t('governmentDashboard.districtLabel', 'District:')}</span>
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-1.5 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#0052a5] cursor-pointer"
          >
            {JHARKHAND_DISTRICTS_LIST.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* STAT CARDS: VISIBLE BY DEFAULT (6 Stat Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAT_CARDS.map(stat => (
          <div
            key={stat.key}
            className="p-4 rounded-xl bg-white border border-[#e5e2db] space-y-1 shadow-xs"
          >
            <div className="text-[11px] font-mono uppercase text-[#787267] truncate">
              {stat.label}
            </div>
            <div className="text-2xl font-bold font-serif text-[#181512]">
              {typeof stat.value === 'number' && stat.value === 0 ? (
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  In Progress
                </span>
              ) : (
                stat.value
              )}
            </div>
            <div className="text-[10px] font-mono text-[#575147] truncate">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* TABS / SECTIONS (Hidden behind click/toggle) */}
      <div className="space-y-4">
        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-[#faf8f5] p-1.5 rounded-xl border border-[#e5e2db] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-[#0052a5] text-white shadow-sm'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('governmentDashboard.tabTriage', 'GRIEVANCE TRIAGE')} ({problems.filter(p => p.status === 'Under_Govt_Triage' || p.triageStatus === 'pending_govt_review').length} PENDING)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#0052a5]" />
            <span>{t('governmentDashboard.tabAnalytics', 'ANALYTICS & BREAKDOWN')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('heatmap')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'heatmap'
                ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#c25e2e]" />
            <span>{t('governmentDashboard.tabHeatmap', 'DISTRICT HEATMAP (24)')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('patterns')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'patterns'
                ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c25e2e]" />
            <span>{t('governmentDashboard.tabPatterns', 'AI PATTERNS')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deployments')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'deployments'
                ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <span>{t('governmentDashboard.tabDeployments', 'DEPLOYMENTS')} ({deployedWithImpact.length > 0 ? deployedWithImpact.length : 'In Progress'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clusters')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'clusters'
                ? 'bg-white text-[#181512] shadow-sm border border-[#e0dad0]'
                : 'text-[#787267] hover:text-[#181512]'
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Layers className="w-3.5 h-3.5 text-[#0052a5]" />
            <span>{t('governmentDashboard.tabClusters', 'CLUSTERS')} ({clusters.length})</span>
          </button>
        </div>

        {/* Tab 0: Grievance Triage & Dual-Track Routing */}
        {activeTab === 'triage' && (
          <GovernmentTriageDesk />
        )}

        {/* Tab 1: Charts & Breakdown */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Pipeline Bar Chart */}
              <div className="p-6 rounded-xl bg-white border border-[#e5e2db] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-serif text-[#181512]">
                      {t('governmentDashboard.pipelineDist', 'Resolution Pipeline Distribution')}
                    </h3>
                    <p className="text-xs font-mono text-[#787267]">
                      {t('governmentDashboard.districtLabel', 'District:')} {districtFilter}
                    </p>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#334155', fontWeight: 500 }} />
                      <YAxis tick={{ fontSize: 13, fill: '#334155', fontWeight: 500 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: 8, fontSize: 12, border: '1px solid #334155' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {statusData.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown Pie Chart */}
              <div className="p-6 rounded-xl bg-white border border-[#e5e2db] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-serif text-[#181512]">
                      {t('governmentDashboard.categoryBreakdown', 'Category Domain Breakdown')}
                    </h3>
                    <p className="text-xs font-mono text-[#787267]">
                      Sector distribution of civic reports
                    </p>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: 8, fontSize: 12, border: '1px solid #334155' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Heatmap */}
        {activeTab === 'heatmap' && (
          <div className="animate-in fade-in duration-150">
            <DistrictSeverityHeatmap
              problems={problems}
              selectedDistrict={districtFilter}
              onSelectDistrict={handleSelectDistrictFromHeatmap}
            />
          </div>
        )}

        {/* Tab 3: AI Patterns */}
        {activeTab === 'patterns' && (
          <div className="animate-in fade-in duration-150">
            <CrossClusterPatternPanel clusters={clusters} problems={problems} />
          </div>
        )}

        {/* Tab 4: Deployed Impact & Replication */}
        {activeTab === 'deployments' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-serif text-[#181512]">
                {t('governmentDashboard.deployedTitle', 'Deployed Solutions & Verified Impact')} ({deployedWithImpact.length})
              </h2>
              <span className="text-xs font-mono text-[#787267]">
                {t('governmentDashboard.replicateHint', 'Click 1-Click Replicate to deploy in other panchayats')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deployedWithImpact.map(problem => (
                <div
                  key={problem.id}
                  className="p-5 rounded-xl bg-white border border-[#e5e2db] space-y-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                        {problem.status}
                      </span>
                      <h3 className="text-base font-bold font-serif text-[#181512] mt-1.5">
                        {problem.title}
                      </h3>
                      <div className="text-xs font-mono text-[#787267]">
                        Deployed at: {problem.district}, Jharkhand
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReplicateProblem(problem)}
                      className="px-3 py-1.5 rounded-lg bg-[#c25e2e] hover:bg-[#a94f24] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('governmentDashboard.replicateBtn', 'Replicate')}</span>
                    </button>
                  </div>

                  {problem.impactMetrics && (
                    <ImpactCard
                      metrics={problem.impactMetrics}
                      problemTitle={problem.title}
                      district={problem.district}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Problem Clusters */}
        {activeTab === 'clusters' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold font-serif text-[#181512]">
                  {t('governmentDashboard.identifiedClusters', 'Identified Problem Clusters')} ({clusters.length})
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] font-mono font-medium text-emerald-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{t('governmentDashboard.aiMonitorActive', 'AI Monitor Active')}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748b]">
                <Clock className="w-3.5 h-3.5 text-[#0052a5]" />
                <span>Last updated 4m ago · Geospatial Cluster Engine</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clusters.map(cluster => (
                <div
                  key={cluster.id}
                  className="p-5 rounded-xl bg-white border border-[#e5e2db] space-y-3 shadow-xs text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#c25e2e]">
                      {cluster.id}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933]">
                      {cluster.totalProblemsCount ?? cluster.problemCount ?? 0} {t('governmentDashboard.linkedProblems', 'Linked Problems')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#181512]">
                    {cluster.name || cluster.title}
                  </h3>

                  <p className="text-xs text-[#575147] leading-relaxed">
                    {cluster.primaryRootCause || cluster.summary}
                  </p>

                  <div className="text-xs font-mono text-[#787267] pt-2 border-t border-[#f0ece2] flex items-center justify-between">
                    <span>
                      District: {Array.isArray(cluster.districts) ? cluster.districts.join(', ') : (cluster.district || 'All Districts')}
                    </span>
                    <span className="text-[11px] font-bold text-[#0052a5]">
                      {cluster.matchedUniversitiesCount ?? 0} {t('governmentDashboard.labsMatched', 'Labs Matched')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Replicate Deployment Modal */}
      {replicateProblem && (
        <ReplicateDeploymentModal
          problem={replicateProblem}
          onClose={() => setReplicateProblem(null)}
        />
      )}
    </div>
  );
};
