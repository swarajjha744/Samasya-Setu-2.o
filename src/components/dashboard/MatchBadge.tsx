import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, MapPin, Award, BookOpen, Info } from 'lucide-react';
import { Problem, MatchBreakdown } from '../../types';

interface MatchBadgeProps {
  score?: number;
  breakdown?: MatchBreakdown;
  rationale?: string;
  universityName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({
  score = 94,
  breakdown,
  rationale,
  universityName,
  size = 'md',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Default simulated breakdown if not provided
  const expertise = breakdown?.expertiseFit ?? Math.min(99, score + 2);
  const proximity = breakdown?.proximityScore ?? Math.max(82, score - 4);
  const trackRecord = breakdown?.trackRecord ?? Math.min(98, score + 1);

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (val >= 75) return 'text-[#c25e2e] bg-[#faf3ed] border-[#e8d5c8]';
    return 'text-amber-700 bg-amber-50 border-amber-300';
  };

  const getBarColor = (val: number) => {
    if (val >= 90) return 'bg-emerald-600';
    if (val >= 75) return 'bg-[#c25e2e]';
    return 'bg-amber-500';
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Interactive Trigger Button */}
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="Click to view AI Match Score Breakdown"
        className={`flex items-center gap-1.5 font-mono font-bold rounded border transition-all cursor-pointer select-none ${
          size === 'sm'
            ? 'px-2 py-0.5 text-[11px]'
            : size === 'lg'
            ? 'px-3.5 py-1.5 text-sm'
            : 'px-2.5 py-1 text-xs'
        } ${
          isOpen
            ? 'bg-[#181512] text-white border-[#181512] shadow-md'
            : 'bg-[#faf8f5] hover:bg-[#f4f0e6] text-[#c25e2e] border-[#e0dad0] hover:border-[#c25e2e]'
        }`}
      >
        <Sparkles className={`shrink-0 ${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#c25e2e]`} />
        <span>{score}% MATCH</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 opacity-70" />
        ) : (
          <ChevronDown className="w-3 h-3 opacity-70" />
        )}
      </button>

      {/* Breakdown Popover */}
      {isOpen && (
        <div
          onClick={e => e.stopPropagation()}
          className="absolute z-50 right-0 sm:right-auto sm:left-0 mt-2 w-80 sm:w-96 p-4 bg-white rounded-lg border border-[#e5e2db] shadow-xl text-left font-sans text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c25e2e]" />
              <span className="font-serif font-bold text-[#181512] text-sm">
                AI Match Breakdown ({score}%)
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#f4f0e6] text-[#787267] px-2 py-0.5 rounded border border-[#e0dad0]">
              Explainability
            </span>
          </div>

          {universityName && (
            <div className="text-[11px] text-[#575147] font-medium bg-[#faf8f5] p-2 rounded border border-[#e8e4dc]">
              Candidate Lab: <span className="font-bold text-[#181512]">{universityName}</span>
            </div>
          )}

          {/* 3 Sub-scores */}
          <div className="space-y-3 pt-1">
            {/* Subscore 1: Expertise */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[#181512]">
                  <BookOpen className="w-3.5 h-3.5 text-[#c25e2e]" />
                  <span>Domain Expertise &amp; Patents</span>
                </span>
                <span className="font-mono font-bold text-[#181512]">{expertise}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#f0ece2] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getBarColor(expertise)}`} style={{ width: `${expertise}%` }} />
              </div>
              <p className="text-[10px] text-[#787267] leading-snug">
                {breakdown?.expertiseDetails || 'Alignment with departmental research publications, faculty lab hardware, and patent portfolio.'}
              </p>
            </div>

            {/* Subscore 2: Proximity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[#181512]">
                  <MapPin className="w-3.5 h-3.5 text-[#c25e2e]" />
                  <span>Geographic Proximity &amp; Site Access</span>
                </span>
                <span className="font-mono font-bold text-[#181512]">{proximity}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#f0ece2] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getBarColor(proximity)}`} style={{ width: `${proximity}%` }} />
              </div>
              <p className="text-[10px] text-[#787267] leading-snug">
                {breakdown?.proximityDetails || 'Regional road transit (< 3 hours) for rapid on-site sample collection, telemetry servicing, and community meetings.'}
              </p>
            </div>

            {/* Subscore 3: Track Record */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[#181512]">
                  <Award className="w-3.5 h-3.5 text-[#c25e2e]" />
                  <span>Historical Field Pilot Track Record</span>
                </span>
                <span className="font-mono font-bold text-[#181512]">{trackRecord}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#f0ece2] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getBarColor(trackRecord)}`} style={{ width: `${trackRecord}%` }} />
              </div>
              <p className="text-[10px] text-[#787267] leading-snug">
                {breakdown?.trackRecordDetails || 'Past verified civic project completions, student sprint on-time delivery, and government sign-off rate.'}
              </p>
            </div>
          </div>

          {/* Rationale explanation */}
          {rationale && (
            <div className="pt-2 border-t border-[#f0ece2] text-[11px] text-[#575147] italic">
              &ldquo;{rationale}&rdquo;
            </div>
          )}

          {/* Footer calculation note */}
          <div className="pt-2 border-t border-[#f0ece2] flex items-center justify-between text-[10px] font-mono text-[#8c8577]">
            <span>Formula: 45% Exp + 30% Prox + 25% Rec</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#c25e2e] hover:underline font-bold"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
