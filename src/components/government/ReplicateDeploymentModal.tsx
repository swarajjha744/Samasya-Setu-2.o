import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem, Cluster } from '../../types';
import {
  Copy,
  CheckCircle2,
  Sparkles,
  MapPin,
  Users,
  Layers,
  ArrowRight,
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ReplicateDeploymentModalProps {
  problem: Problem;
  isOpen: boolean;
  onClose: () => void;
}

export const ReplicateDeploymentModal: React.FC<ReplicateDeploymentModalProps> = ({
  problem,
  isOpen,
  onClose
}) => {
  const { clusters, replicateDeploymentToClusters, t } = useApp();

  // Find candidate clusters with same or related category, excluding current cluster
  const candidateClusters = clusters.filter(c => c.id !== problem.clusterId);

  const [selectedClusterIds, setSelectedClusterIds] = useState<string[]>(() => {
    // Default select first 2 matching candidate clusters
    const matching = candidateClusters.filter(c => c.category === problem.category);
    if (matching.length > 0) {
      return matching.map(m => m.id);
    }
    return candidateClusters.slice(0, 2).map(c => c.id);
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleClusterSelection = (id: string) => {
    if (selectedClusterIds.includes(id)) {
      setSelectedClusterIds(selectedClusterIds.filter(item => item !== id));
    } else {
      setSelectedClusterIds([...selectedClusterIds, id]);
    }
  };

  const selectedClusters = clusters.filter(c => selectedClusterIds.includes(c.id));
  const totalReplicationCitizens = selectedClusters.reduce(
    (acc, curr) => acc + curr.totalPeopleAffected,
    0
  );

  const handleConfirmReplication = () => {
    if (selectedClusterIds.length === 0) return;
    replicateDeploymentToClusters(problem.id, selectedClusterIds);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#e5e2db] rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#f0ece2]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-[#faf3ed] text-[#c25e2e] border border-[#e8d5c8]">
                <Copy className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c25e2e]">
                {t('replicateModal.badge', 'ONE-CLICK REPLICATION DISPATCH')}
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#181512]">
              {t('replicateModal.title', 'Replicate Deployed Solution to Matching Regional Clusters')}
            </h3>
            <p className="text-xs text-[#575147]">
              {t('replicateModal.sub', 'Instantly deploy proven hardware blueprints, sensor packages, and lab protocols to peer clusters sharing identical root causes.')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#787267] hover:text-[#181512] hover:bg-[#faf8f5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Verified Solution Card */}
        <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e8e4dc] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#787267] uppercase font-bold">{t('replicateModal.provenSource', 'Proven Solution Source:')}</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              ● Field Verified ({problem.impact?.changePercentage || '95% Verified'})
            </span>
          </div>
          <h4 className="text-sm font-bold font-serif text-[#181512]">
            {problem.title}
          </h4>
          <div className="text-xs text-[#575147]">
            {t('replicateModal.originLab', 'Origin Lab:')} <span className="font-semibold text-[#181512]">{problem.assignedUniversity?.name}</span> • {t('replicateModal.leadDistrict', 'Lead District:')} <span className="font-semibold text-[#181512]">{t(problem.district, problem.district)}</span>
          </div>
        </div>

        {/* Candidate Target Clusters Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase text-[#181512]">
              {t('replicateModal.selectCandidate', 'Select Candidate Target Clusters')} ({candidateClusters.length} Available)
            </h4>
            <span className="text-xs font-mono text-[#c25e2e] font-bold">
              {selectedClusterIds.length} {t('replicateModal.selected', 'Selected')}
            </span>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {candidateClusters.map(cluster => {
              const isChecked = selectedClusterIds.includes(cluster.id);
              const isSameCategory = cluster.category === problem.category;

              return (
                <div
                  key={cluster.id}
                  onClick={() => toggleClusterSelection(cluster.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-white border-[#c25e2e] ring-1 ring-[#c25e2e] shadow-xs'
                      : 'bg-[#faf8f5] border-[#e5e2db] hover:border-[#d5d0c3]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded text-[#c25e2e] focus:ring-[#c25e2e] accent-[#c25e2e]"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1]">
                          {cluster.id}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#181512]">
                          {t(cluster.district, cluster.district)}
                        </span>
                        {isSameCategory && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
                            {t('replicateModal.highAffinity', 'High Affinity Match')}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-[#575147] shrink-0">
                        {cluster.totalPeopleAffected.toLocaleString()} {t('common.affected', 'Citizens')}
                      </span>
                    </div>

                    <p className="text-xs font-serif font-bold text-[#181512] truncate">
                      {cluster.name}
                    </p>

                    <p className="text-[11px] text-[#575147] line-clamp-1">
                      {cluster.primaryRootCause}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projected Replication Reach Summary */}
        <div className="p-4 rounded-lg bg-[#faf3ed] border border-[#e8d5c8] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <div className="text-[10px] text-[#787267] uppercase">{t('replicateModal.scope', 'Replication Scope')}</div>
            <div className="text-base font-bold text-[#181512] mt-0.5">
              {selectedClusterIds.length} Clusters
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#787267] uppercase">{t('replicateModal.additionalImpact', 'Additional Impact')}</div>
            <div className="text-base font-bold text-[#c25e2e] mt-0.5">
              +{totalReplicationCitizens.toLocaleString()} Citizens
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#787267] uppercase">{t('replicateModal.estPilotTime', 'Est. Pilot Time')}</div>
            <div className="text-base font-bold text-emerald-800 mt-0.5">
              {t('replicateModal.fastTrack', '3-4 Weeks (Fast-track)')}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#f0ece2]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded bg-[#faf8f5] hover:bg-[#f0ece2] border border-[#d5d0c3] text-xs font-mono text-[#575147] transition-colors"
          >
            {t('common.cancel', 'CANCEL')}
          </button>

          <button
            type="button"
            disabled={selectedClusterIds.length === 0 || isSuccess}
            onClick={handleConfirmReplication}
            className={`px-5 py-2.5 rounded text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              isSuccess
                ? 'bg-emerald-700'
                : selectedClusterIds.length === 0
                ? 'bg-[#8c8577] opacity-50 cursor-not-allowed'
                : 'bg-[#c25e2e] hover:bg-[#a94f24]'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('replicateModal.success', 'REPLICATION DISPATCHED!')}</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>{t('replicateModal.dispatchBtn', 'CONFIRM REPLICATION DISPATCH')} ({selectedClusterIds.length})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
