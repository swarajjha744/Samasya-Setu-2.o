import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectWorkspace } from './ProjectWorkspace';
import { Problem } from '../../types';
import { RolePhotoCard } from '../common/RolePhotoCard';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MapPin,
  Clock,
  ChevronDown,
  Cpu,
  MessageSquare,
  X
} from 'lucide-react';
import { MatchBadge } from '../dashboard/MatchBadge';

export const UniversityDashboard: React.FC = () => {
  const {
    t,
    problems,
    activeWorkspaceProblemId,
    setActiveWorkspaceProblemId,
    acceptChallenge,
    declineChallenge,
    requestInfoChallenge
  } = useApp();

  const [showWorkspace, setShowWorkspace] = useState(false);
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null);
  const [infoModalProblem, setInfoModalProblem] = useState<Problem | null>(null);
  const [infoQueryText, setInfoQueryText] = useState('');

  // Active workspace problem
  const workspaceProblem =
    problems.find(p => p.id === activeWorkspaceProblemId) ||
    problems.find(p => p.universityStatus === 'Accepted') ||
    problems[0];

  // Incoming challenges queue
  const incomingChallenges = problems.filter(p => p.universityStatus !== 'Declined');
  const acceptedProjects = problems.filter(p => p.universityStatus === 'Accepted');

  const handleOpenInfoModal = (p: Problem) => {
    setInfoModalProblem(p);
    setInfoQueryText(
      `Requesting exact geochemical water sample parameters and borehole depth logs from ${p.district} field site.`
    );
  };

  const handleSendInfoQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (infoModalProblem) {
      requestInfoChallenge(infoModalProblem.id, infoQueryText);
      setInfoModalProblem(null);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Top Header & Workspace Toggle Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-lg bg-white border border-[#e5e2db] shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
            University Innovation Labs
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#181512] font-serif">
            {t('univ.title', 'Matched Community Problems')}
          </h1>
          <p className="text-xs sm:text-sm text-[#575147] font-mono">
            {incomingChallenges.length} problems matched to university engineering teams.
          </p>
        </div>

        {/* VIEW WORKSPACE BUTTON (Workspace is hidden until clicked) */}
        <button
          type="button"
          onClick={() => setShowWorkspace(!showWorkspace)}
          className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
            showWorkspace
              ? 'bg-[#181512] text-white border-[#181512]'
              : 'bg-white text-[#181512] border-[#cbd5e1] hover:border-[#181512]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#c25e2e]" />
          <span>{showWorkspace ? 'Hide Projects' : `View Projects (${acceptedProjects.length})`}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              showWorkspace ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* CHALLENGES LIST: VISIBLE BY DEFAULT (Title + Match % + Accept/Decline) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif text-[#181512]">
            Incoming Problems ({incomingChallenges.length})
          </h2>
          <span className="text-xs font-mono text-[#787267]">
            Showing problems matched to your lab
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomingChallenges.map(problem => {
            const matchScore = problem.assignedUniversity?.matchScore || 94;
            const isAccepted = problem.universityStatus === 'Accepted';
            const isDeclined = problem.universityStatus === 'Declined';
            const isOpen = expandedChallengeId === problem.id;

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
                      universityName={problem.assignedUniversity?.name}
                      size="sm"
                    />

                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isAccepted
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isDeclined
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-[#faf8f5] text-[#787267] border-[#d5d0c3]'
                      }`}
                    >
                      ● {isAccepted ? 'Accepted' : isDeclined ? 'Declined' : 'Pending'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#181512] leading-snug">
                    {problem.title}
                  </h3>

                  {/* HIDDEN UNTIL CLICKED: Required expertise, problem DNA, solution pathways */}
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-[#f0ece2] space-y-3 text-xs animate-in fade-in duration-150">
                      <p className="text-xs text-[#575147] leading-relaxed">
                        {problem.description}
                      </p>

                      {/* University Lab Prototype Verification Photo */}
                      <RolePhotoCard
                        category={problem.category}
                        district={problem.district}
                        title={`Engineering Lab Bench · ${problem.title}`}
                        aspectRatio="video"
                      />

                      <div className="text-[11px] font-mono text-[#787267]">
                        Location: <strong className="text-[#181512]">{problem.district}, {problem.state}</strong>
                      </div>

                      {/* Required Disciplines */}
                      {problem.problemDna?.requiredDisciplines && (
                        <div className="space-y-1">
                          <div className="text-[10px] font-mono uppercase font-bold text-[#c25e2e]">
                            Skills Needed:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {problem.problemDna.requiredDisciplines.map(d => (
                              <span
                                key={d}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4f0e6] text-[#3d3933] border border-[#e2ddd1]"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Root Cause */}
                      {problem.problemDna && (
                        <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-1">
                          <div className="text-[10px] font-mono uppercase font-bold text-[#787267]">
                            Identified Cause
                          </div>
                          <div className="text-[11px] text-[#181512]">
                            {problem.problemDna.rootCause}
                          </div>
                        </div>
                      )}

                      {/* Request Info button */}
                      <button
                        type="button"
                        onClick={() => handleOpenInfoModal(problem)}
                        className="text-[11px] font-mono text-[#0052a5] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Ask for site details or samples</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* DEFAULT VISIBLE: Accept / Decline Actions & Details Toggle */}
                <div className="pt-3 mt-3 border-t border-[#f0ece2] space-y-2">
                  <div className="flex items-center gap-2">
                    {!isAccepted ? (
                      <>
                        <button
                          type="button"
                          onClick={() => acceptChallenge(problem.id)}
                          className="flex-1 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => declineChallenge(problem.id)}
                          className="px-2.5 py-1.5 rounded bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <span className="flex-1 text-center py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                          Active in Lab
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveWorkspaceProblemId(problem.id);
                            setShowWorkspace(true);
                          }}
                          className="px-2.5 py-1 rounded bg-[#181512] text-white text-xs font-mono font-bold uppercase cursor-pointer"
                        >
                          Workspace
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedChallengeId(isOpen ? null : problem.id)}
                    className="w-full text-center text-[11px] font-mono text-[#787267] hover:text-[#181512] transition-colors cursor-pointer"
                  >
                    {isOpen ? '▲ Hide details' : '▼ Details & Skills'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROJECT WORKSPACE: HIDDEN UNTIL CLICKED (Collapsed behind button) */}
      {showWorkspace && (
        <div className="space-y-6 pt-4 border-t border-[#e5e2db] animate-in fade-in duration-150">
          {/* Select Workspace Problem Dropdown */}
          <div className="p-4 rounded-lg bg-white border border-[#e5e2db] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#f4f0e6] text-[#c25e2e] border border-[#e0dad0]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#c25e2e]">
                  Active Project Workspace
                </div>
                <div className="text-base font-bold font-serif text-[#181512]">
                  {workspaceProblem ? workspaceProblem.title : 'No Project Selected'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#787267]">Switch Project:</span>
              <select
                value={workspaceProblem?.id}
                onChange={e => setActiveWorkspaceProblemId(e.target.value)}
                className="bg-[#faf8f5] border border-[#d5d0c3] rounded px-3 py-1.5 text-xs text-[#181512] font-medium focus:outline-none focus:border-[#c25e2e]"
              >
                {problems.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id}: {p.title.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Workspace Kanban and Tools Component */}
          {workspaceProblem && <ProjectWorkspace problem={workspaceProblem} />}
        </div>
      )}

      {/* Request Info Modal */}
      {infoModalProblem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e2db] rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#f0ece2] pb-3">
              <h3 className="text-base font-bold font-serif text-[#181512] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#c25e2e]" />
                <span>Ask for Site Details or Samples</span>
              </h3>
              <button
                onClick={() => setInfoModalProblem(null)}
                className="p-1 rounded text-[#787267] hover:text-[#181512] hover:bg-[#faf8f5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendInfoQuery} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#787267] mb-1">
                  Question for {infoModalProblem.id} ({infoModalProblem.district})
                </label>
                <textarea
                  rows={4}
                  value={infoQueryText}
                  onChange={e => setInfoQueryText(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-3 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInfoModalProblem(null)}
                  className="px-3 py-2 rounded bg-[#faf8f5] border border-[#d5d0c3] text-xs font-mono text-[#575147]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#c25e2e] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#a94f24]"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
