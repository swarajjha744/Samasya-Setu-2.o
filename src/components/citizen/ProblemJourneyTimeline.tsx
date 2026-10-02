import React from 'react';
import { Problem, TimelineStep } from '../../types';
import {
  FileText,
  Cpu,
  Layers,
  Sparkles,
  Users,
  TestTube,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProblemJourneyTimelineProps {
  problem: Problem;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProblemJourneyTimeline: React.FC<ProblemJourneyTimelineProps> = ({
  problem,
  orientation = 'horizontal',
  className = ''
}) => {
  // Define standard 7 journey stages
  const standardStages: {
    key: 'Submitted' | 'Validated' | 'Clustered' | 'Matched' | 'Team Formed' | 'Piloted' | 'Deployed';
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    defaultDesc: string;
  }[] = [
    {
      key: 'Submitted',
      title: '1. Submitted',
      icon: FileText,
      defaultDesc: `Report logged on ${problem.submittedDate} by ${problem.submittedBy.name}`
    },
    {
      key: 'Validated',
      title: '2. Validated',
      icon: Cpu,
      defaultDesc: 'Issue analyzed and location details verified'
    },
    {
      key: 'Clustered',
      title: '3. Clustered',
      icon: Layers,
      defaultDesc: `Combined with ${problem.clusterCount || 12} similar reports in ${problem.district}`
    },
    {
      key: 'Matched',
      title: '4. Matched',
      icon: Sparkles,
      defaultDesc: `Linked to ${problem.assignedUniversity?.name || 'university engineering lab'}`
    },
    {
      key: 'Team Formed',
      title: '5. Team Formed',
      icon: Users,
      defaultDesc: 'Faculty lead and student engineering team assigned'
    },
    {
      key: 'Piloted',
      title: '6. Piloted',
      icon: TestTube,
      defaultDesc: 'Prototype tested in real village conditions'
    },
    {
      key: 'Deployed',
      title: '7. Deployed',
      icon: CheckCircle2,
      defaultDesc: 'Permanent solution installed and running'
    }
  ];

  // Determine stage index
  const getStageIndex = (status: string, stageProgress: number): number => {
    switch (status) {
      case 'Submitted':
        return 0;
      case 'Under_Review':
      case 'Validated':
        return 1;
      case 'Clustered':
        return 2;
      case 'Research':
        return 3;
      case 'Prototype':
        return 4;
      case 'Pilot':
        return 5;
      case 'Deployed':
      case 'Impact_Verified':
        return 6;
      default:
        // Fallback by progress
        if (stageProgress >= 90) return 6;
        if (stageProgress >= 65) return 5;
        if (stageProgress >= 40) return 4;
        if (stageProgress >= 25) return 3;
        if (stageProgress >= 15) return 2;
        if (stageProgress >= 5) return 1;
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(problem.status, problem.stageProgress);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#c25e2e]" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#181512]">
            End-to-End Problem Journey Timeline
          </h4>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#c25e2e] bg-[#faf3ed] px-2 py-0.5 rounded border border-[#e8d5c8]">
          Stage {currentStageIndex + 1} of 7: {standardStages[currentStageIndex]?.title.replace(/^\d+\.\s*/, '')}
        </span>
      </div>

      {/* Horizontal Stepper (Desktop) / Vertical (Mobile) */}
      <div className="hidden lg:block overflow-x-auto pb-3 pt-2">
        <div className="grid grid-cols-7 gap-2 min-w-[760px] relative">
          {/* Background progress connector line */}
          <div className="absolute top-5 left-4 right-4 h-0.5 bg-[#e5e2db] -z-0" />
          <div
            className="absolute top-5 left-4 h-0.5 bg-[#c25e2e] transition-all duration-500 -z-0"
            style={{ width: `${(currentStageIndex / 6) * 100}%` }}
          />

          {standardStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            // Use custom timeline step date if available
            const customStep = problem.timelineSteps?.find(s => s.name === stage.key);
            const stepDate = customStep?.date || (isCompleted || isCurrent ? problem.submittedDate : 'TBD');

            return (
              <div key={stage.key} className="flex flex-col items-center text-center relative z-10 px-1">
                {/* Stage Icon Node */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-700 text-white shadow-sm ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-[#c25e2e] text-white shadow-md ring-4 ring-[#faf3ed] animate-pulse'
                      : 'bg-white text-[#8c8577] border border-[#d5d0c3]'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                {/* Stage Title */}
                <div className="mt-2.5 space-y-1">
                  <div
                    className={`text-[11px] font-mono font-bold leading-tight ${
                      isCurrent
                        ? 'text-[#c25e2e]'
                        : isCompleted
                        ? 'text-[#181512]'
                        : 'text-[#8c8577]'
                    }`}
                  >
                    {stage.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#787267]">{stepDate}</div>
                  <p className="text-[10px] text-[#575147] line-clamp-2 leading-snug">
                    {customStep?.details || stage.defaultDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Stepper for Mobile / Compact Views */}
      <div className="lg:hidden space-y-3">
        {standardStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const customStep = problem.timelineSteps?.find(s => s.name === stage.key);
          const stepDate = customStep?.date || (isCompleted || isCurrent ? problem.submittedDate : 'Pending');

          return (
            <div
              key={stage.key}
              className={`p-3 rounded-lg border flex items-start gap-3 transition-all ${
                isCurrent
                  ? 'bg-[#faf8f5] border-[#c25e2e] shadow-sm ring-1 ring-[#c25e2e]'
                  : isCompleted
                  ? 'bg-white border-emerald-200'
                  : 'bg-[#faf8f5]/50 border-[#e8e4dc] opacity-70'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${
                  isCompleted
                    ? 'bg-emerald-700 text-white'
                    : isCurrent
                    ? 'bg-[#c25e2e] text-white'
                    : 'bg-white text-[#8c8577] border border-[#d5d0c3]'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isCurrent ? 'text-[#c25e2e]' : isCompleted ? 'text-[#181512]' : 'text-[#787267]'
                    }`}
                  >
                    {stage.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#787267] shrink-0">{stepDate}</span>
                </div>
                <p className="text-[11px] text-[#575147]">
                  {customStep?.details || stage.defaultDesc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
