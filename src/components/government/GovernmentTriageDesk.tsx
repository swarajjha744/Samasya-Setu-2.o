import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem, AssignedCivicBody } from '../../types';
import {
  ShieldAlert,
  Building2,
  GraduationCap,
  CheckCircle2,
  Clock,
  Send,
  User,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  MapPin,
  AlertTriangle,
  FileText,
  ChevronRight,
  Filter,
  Check,
  X,
  MessageSquare,
  Users
} from 'lucide-react';

export const GovernmentTriageDesk: React.FC = () => {
  const { t, problems, selfAssessAndAssignCivic, routeToUniversityRnD, showToast } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'civic' | 'university'>('all');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [triageAction, setTriageAction] = useState<'civic' | 'university' | null>(null);

  // Civic Assignment Form State
  const [civicEntityType, setCivicEntityType] = useState<'MBMC' | 'PWD' | 'DWSD' | 'DISCOM' | 'PANCHAYAT_ENGINEERING'>('MBMC');
  const [civicDeptName, setCivicDeptName] = useState('MBMC Municipal Public Works & Drainage Division (Zone-1)');
  const [officerName, setOfficerName] = useState('Er. Sunil Kumar Verma, Executive Engineer');
  const [officerPhone, setOfficerPhone] = useState('+91 651-2448910');
  const [officerEmail, setOfficerEmail] = useState('ee.drainage@mbmc.jharkhand.gov.in');
  const [actionPlan, setActionPlan] = useState('Dispatch mechanized excavator and municipal desilting jetting squad. Replace fractured concrete culvert slabs.');
  const [targetDate, setTargetDate] = useState('2026-09-18');
  const [govtAssessmentNote, setGovtAssessmentNote] = useState('Self-assessed as routine urban municipal infrastructure malfunction. Direct physical repair assigned to MBMC under strict turnaround SLA.');

  // University R&D Form State
  const [univName, setUnivName] = useState('Birla Institute of Technology (BIT) Mesra');
  const [univDept, setUnivDept] = useState('Department of Chemical & Environmental Engineering');
  const [leadFaculty, setLeadFaculty] = useState('Prof. Amitabh Sharma (Lab Director) & Dr. R. K. Soren');
  const [matchRationale, setMatchRationale] = useState('Contaminant concentrations require advanced adsorbent media development and IoT telemetry unavailable in routine municipal manuals.');

  // Filter problems for triage
  const triageProblems = problems.filter(p => {
    if (filterMode === 'pending') {
      return p.status === 'Under_Govt_Triage' || p.triageStatus === 'pending_govt_review';
    }
    if (filterMode === 'civic') {
      return p.status === 'Assigned_Civic' || p.triageStatus === 'self_assessed_civic';
    }
    if (filterMode === 'university') {
      return p.triageStatus === 'routed_to_university' || ['Research', 'Prototype', 'Pilot'].includes(p.status);
    }
    return true;
  });

  const pendingCount = problems.filter(p => p.status === 'Under_Govt_Triage' || p.triageStatus === 'pending_govt_review').length;
  const civicCount = problems.filter(p => p.status === 'Assigned_Civic' || p.triageStatus === 'self_assessed_civic').length;
  const univCount = problems.filter(p => p.triageStatus === 'routed_to_university' || ['Research', 'Prototype', 'Pilot'].includes(p.status)).length;

  const handleOpenTriage = (p: Problem, actionType: 'civic' | 'university') => {
    setSelectedProblem(p);
    setTriageAction(actionType);

    // Pre-populate sensible defaults based on problem category
    if (actionType === 'civic') {
      if (p.category.includes('Water') || p.category.includes('Drain')) {
        setCivicEntityType('MBMC');
        setCivicDeptName('MBMC Municipal Water Works & Drainage Division (Zone-2)');
        setOfficerName('Er. Rajesh Ranjan, Executive Engineer');
        setOfficerPhone('+91 651-2446102');
        setOfficerEmail('ee.water@mbmc.jharkhand.gov.in');
        setActionPlan(`Repair pipeline/drainage culvert at ${p.locationDetails}. Reconstruct concrete catchments and restore clean flow.`);
        setGovtAssessmentNote('Self-assessed by District Office: Standard municipal engineering infrastructure failure; assigned directly to MBMC Water Directorate for expedited on-ground replacement.');
      } else if (p.category.includes('Road') || p.category.includes('Infrastructure')) {
        setCivicEntityType('PWD');
        setCivicDeptName('Jharkhand State Road Development Directorate (Road Division 1)');
        setOfficerName('Er. Arun Kumar Sinha, Superintending Engineer');
        setOfficerPhone('+91 651-2441190');
        setOfficerEmail('se.road@pwd.jharkhand.gov.in');
        setActionPlan(`Emergency road surface resurfacing, base course reinforcement, and pothole compaction at ${p.locationDetails}.`);
        setGovtAssessmentNote('Classified as immediate civic road safety hazard. Handed over to PWD for road restoration within 7 days.');
      }
    } else {
      if (p.category.includes('Water') || p.title.toLowerCase().includes('arsenic') || p.title.toLowerCase().includes('fluoride')) {
        setUnivName('BIT Mesra & NIT Jamshedpur Water Tech Joint Hub');
        setUnivDept('Department of Environmental Chemical Engineering');
        setLeadFaculty('Dr. Amitabh Sharma & Dr. Ramesh Soren');
        setMatchRationale('Novel geogenic contamination requires low-cost ferric-oxide adsorption column and field test validation.');
      } else if (p.title.toLowerCase().includes('dust') || p.title.toLowerCase().includes('mining')) {
        setUnivName('IIT (ISM) Dhanbad Centre of Mining Environment');
        setUnivDept('Department of Environmental Science & Mining Engineering');
        setLeadFaculty('Prof. V. M. Pathak');
        setMatchRationale('Airborne PM10 particulate dispersion modeling and solar aerosol misting engineering.');
      }
    }
  };

  const handleConfirmCivicAssignment = () => {
    if (!selectedProblem) return;

    const civicData: AssignedCivicBody = {
      entityType: civicEntityType,
      departmentName: civicDeptName,
      officerInCharge: officerName,
      contactNumber: officerPhone,
      contactEmail: officerEmail,
      actionPlan: actionPlan,
      targetResolutionDate: targetDate,
      assignedAt: new Date().toLocaleDateString('en-GB')
    };

    selfAssessAndAssignCivic(selectedProblem.id, civicData, govtAssessmentNote);
    showToast(`Assigned ${selectedProblem.id} to ${civicEntityType} (${officerName}) for physical execution!`, 'success');
    setSelectedProblem(null);
    setTriageAction(null);
  };

  const handleConfirmUniversityRouting = () => {
    if (!selectedProblem) return;

    routeToUniversityRnD(selectedProblem.id, univName, univDept, leadFaculty, matchRationale);
    showToast(`Routed ${selectedProblem.id} to ${univName} for applied scientific R&D!`, 'success');
    setSelectedProblem(null);
    setTriageAction(null);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-mono font-bold text-[#0052a5] uppercase">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t('govtTriage.badge', 'Government Review & Routing')}</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#0f172a]">
              {t('govtTriage.title', 'Review and Assign Problems')}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              {t('govtTriage.sub', 'Every report is reviewed by district officers. The team decides whether to assign it directly to local city departments or forward it to university research labs.')}
            </p>
          </div>

          {/* Pending Review Badge */}
          {pendingCount > 0 && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></div>
              <div>
                <div className="text-xs font-mono font-bold uppercase">
                  {pendingCount} {t('govtTriage.needsReview', 'Needs Review')}
                </div>
                <div className="text-[11px] text-amber-800">
                  {t('govtTriage.waitingDecision', 'Waiting for government decision')}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#f1f5f9]">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-[#0052a5] text-white shadow-xs'
                  : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eff6ff]'
              }`}
            >
              {t('govtTriage.allReports', 'All Reports')} ({problems.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'pending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <span>{t('govtTriage.needsDecision', 'Needs Decision')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/30 text-[10px]">
                {pendingCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('civic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'civic'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eff6ff]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('govtTriage.assignedCity', 'Assigned to City/PWD')} ({civicCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('university')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'university'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eff6ff]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t('govtTriage.assignedUniv', 'University Lab Projects')} ({univCount})</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748b] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('govtTriage.liveFeed', 'Live Feed · Updated 2m ago')}</span>
          </div>
        </div>
      </div>

      {/* Problems Triage Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {triageProblems.map(problem => {
          const isPending = problem.status === 'Under_Govt_Triage' || problem.triageStatus === 'pending_govt_review';
          const isCivic = problem.status === 'Assigned_Civic' || problem.triageStatus === 'self_assessed_civic';
          const isUniv = problem.triageStatus === 'routed_to_university' || ['Research', 'Prototype', 'Pilot', 'Deployed'].includes(problem.status);

          return (
            <div
              key={problem.id}
              className={`p-6 rounded-2xl bg-white border transition-all shadow-xs ${
                isPending
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : isCivic
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-[#e2e8f0]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                {/* Left: Problem Details */}
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0052a5]">
                      {problem.id}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0052a5]" />
                      <span>{problem.district}, Jharkhand</span>
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                      {problem.category}
                    </span>

                    {/* Status Badge */}
                    {isPending ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-mono font-bold text-amber-900 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>{t('govtTriage.needsDecision', 'NEEDS DECISION')}</span>
                      </span>
                    ) : isCivic ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-mono font-bold text-amber-900 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-amber-800" />
                        <span>{t('govtTriage.assignedCity', 'ASSIGNED TO')} {problem.assignedCivicBody?.entityType || 'CITY'}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-[11px] font-mono font-bold text-purple-900 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-purple-700" />
                        <span>{t('govtTriage.assignedUniv', 'UNIVERSITY LAB')} ({problem.status})</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[#0f172a]">
                    {problem.title}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {problem.description}
                  </p>

                  <div className="text-[11px] font-mono text-[#64748b] flex flex-wrap items-center gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#64748b]" />
                      <span>{t('common.reportedBy', 'Reported by:')} <strong>{problem.submittedBy.name}</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#64748b]" />
                      <span>{problem.submittedBy.phoneOrEmail}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#64748b]" />
                      <span>{problem.peopleAffected?.toLocaleString()} {t('common.peopleAffected', 'People Affected')}</span>
                    </span>
                  </div>

                  {/* If Civic Body Assigned: Show Details */}
                  {problem.assignedCivicBody && (
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5 mt-2">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <Building2 className="w-4 h-4 text-amber-700" />
                        <span>Assigned Team: {problem.assignedCivicBody.entityType} - {problem.assignedCivicBody.departmentName}</span>
                      </div>
                      <div className="text-[11px] text-[#475569]">
                        <strong>Officer in Charge:</strong> {problem.assignedCivicBody.officerInCharge} ({problem.assignedCivicBody.contactNumber} · {problem.assignedCivicBody.contactEmail})
                      </div>
                      <div className="text-[11px] text-[#475569]">
                        <strong>Action Plan:</strong> {problem.assignedCivicBody.actionPlan}
                      </div>
                      <div className="text-[10px] font-mono text-amber-800 pt-0.5">
                        Target Date: <strong>{problem.assignedCivicBody.targetResolutionDate}</strong> · Assigned: {problem.assignedCivicBody.assignedAt}
                      </div>
                    </div>
                  )}

                  {/* If Routed to University: Show Details */}
                  {problem.assignedUniversity && (
                    <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 space-y-1.5 mt-2">
                      <div className="font-bold flex items-center gap-1.5 text-purple-900">
                        <GraduationCap className="w-4 h-4 text-purple-700" />
                        <span>Assigned University: {problem.assignedUniversity.name}</span>
                      </div>
                      <div className="text-[11px] text-[#475569]">
                        <strong>Department &amp; Lead:</strong> {problem.assignedUniversity.department} · {problem.assignedUniversity.leadFaculty}
                      </div>
                      {problem.assignedUniversity.matchRationale && (
                        <div className="text-[11px] text-[#475569]">
                          <strong>Reason:</strong> {problem.assignedUniversity.matchRationale}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Government Assessment Note */}
                  {problem.governmentAssessmentNote && (
                    <div className="text-[11px] text-[#475569] italic bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0]">
                      <strong>Official Note:</strong> "{problem.governmentAssessmentNote}"
                    </div>
                  )}

                  {/* Citizen Queries Log (if any) */}
                  {problem.citizenQueries && problem.citizenQueries.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-2 mt-2">
                      <div className="font-mono font-bold text-[#0052a5] flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Citizen Questions ({problem.citizenQueries.length})</span>
                      </div>
                      {problem.citizenQueries.map(q => (
                        <div key={q.id} className="p-2 rounded bg-white border border-[#e2e8f0] space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                            <span>From: {q.citizenName}</span>
                            <span>{q.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#0f172a]">"{q.message}"</p>
                          {q.reply && (
                            <div className="text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                              <strong>Reply:</strong> {q.reply} ({q.replyTimestamp})
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Triage Decision Action Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 self-start">
                  {isPending ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenTriage(problem, 'civic')}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-2 cursor-pointer text-left"
                      >
                        <Building2 className="w-4 h-4 shrink-0" />
                        <div>
                          <div>{t('govtTriage.btnCivicTitle', 'Assign to City Team')}</div>
                          <span className="text-[10px] opacity-85 normal-case font-sans">{t('govtTriage.btnCivicSub', 'Municipal or PWD')}</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenTriage(problem, 'university')}
                        className="px-4 py-2.5 rounded-xl bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-2 cursor-pointer text-left"
                      >
                        <GraduationCap className="w-4 h-4 shrink-0" />
                        <div>
                          <div>{t('govtTriage.btnUnivTitle', 'Send to University')}</div>
                          <span className="text-[10px] opacity-85 normal-case font-sans">{t('govtTriage.btnUnivSub', 'Research & Prototyping')}</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenTriage(problem, isCivic ? 'civic' : 'university')}
                        className="px-3 py-1.5 rounded-lg border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#475569] text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        {t('govtTriage.updateAssignment', 'Update Assignment')}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Self-Assess & Assign to Civic Body (MBMC / PWD) */}
      {selectedProblem && triageAction === 'civic' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#e2e8f0] rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#0f172a]">
                    {t('govtTriage.modalCivicTitle', 'Assign to Local City Department')}
                  </h3>
                  <p className="text-xs font-mono text-[#64748b]">
                    {t('govtTriage.modalCivicSub', 'Assigning for direct municipal repair')}: {selectedProblem.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setSelectedProblem(null); setTriageAction(null); }}
                className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
              <strong>{t('common.problem', 'Problem')}:</strong> {selectedProblem.title} ({selectedProblem.district})
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.responsibleAgency', 'Responsible Agency *')}
                </label>
                <select
                  value={civicEntityType}
                  onChange={e => setCivicEntityType(e.target.value as any)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] font-mono focus:border-[#0052a5]"
                >
                  <option value="MBMC">Municipal Corporation (MBMC / RMC)</option>
                  <option value="PWD">Public Works Department (PWD)</option>
                  <option value="DWSD">Drinking Water &amp; Sanitation Dept (DWSD)</option>
                  <option value="DISCOM">Jharkhand Power Utility (JBVNL)</option>
                  <option value="PANCHAYAT_ENGINEERING">District Rural Development Agency (DRDA)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.deptName', 'Department Name *')}
                </label>
                <input
                  type="text"
                  value={civicDeptName}
                  onChange={e => setCivicDeptName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('govtTriage.officerInCharge', 'Officer In Charge *')}
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={e => setOfficerName(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('govtTriage.contactPhone', 'Contact Phone *')}
                  </label>
                  <input
                    type="text"
                    value={officerPhone}
                    onChange={e => setOfficerPhone(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('govtTriage.officialEmail', 'Official Email *')}
                  </label>
                  <input
                    type="email"
                    value={officerEmail}
                    onChange={e => setOfficerEmail(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('govtTriage.targetDate', 'Target Completion Date *')}
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.actionPlan', 'Action Plan & Equipment Needed *')}
                </label>
                <textarea
                  rows={2}
                  value={actionPlan}
                  onChange={e => setActionPlan(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.officerReviewNote', 'Officer Review Note')}
                </label>
                <input
                  type="text"
                  value={govtAssessmentNote}
                  onChange={e => setGovtAssessmentNote(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#f1f5f9] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setSelectedProblem(null); setTriageAction(null); }}
                className="px-4 py-2 rounded-xl border border-[#cbd5e1] text-xs font-mono text-[#64748b] hover:bg-[#f8fafc]"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmCivicAssignment}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{t('govtTriage.confirmCityAssignment', 'Confirm City Assignment')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Route to University for Applied R&D */}
      {selectedProblem && triageAction === 'university' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#e2e8f0] rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#0f172a]">
                    {t('govtTriage.modalUnivTitle', 'Forward to University Research Lab')}
                  </h3>
                  <p className="text-xs font-mono text-[#64748b]">
                    {t('govtTriage.modalUnivSub', 'Assigning for research and prototype testing')}: {selectedProblem.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setSelectedProblem(null); setTriageAction(null); }}
                className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-[#0052a5]">
              <strong>{t('common.problem', 'Problem')}:</strong> {selectedProblem.title} ({selectedProblem.district})
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.univCollegeLabel', 'University / College *')}
                </label>
                <input
                  type="text"
                  value={univName}
                  onChange={e => setUnivName(e.target.value)}
                  placeholder="e.g. BIT Mesra, NIT Jamshedpur, IIT (ISM) Dhanbad..."
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.univDeptLabel', 'Department / Lab *')}
                </label>
                <input
                  type="text"
                  value={univDept}
                  onChange={e => setUnivDept(e.target.value)}
                  placeholder="e.g. Department of Mechanical Engineering, Water Technology Lab..."
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.univFacultyLabel', 'Lead Faculty Investigator(s) *')}
                </label>
                <input
                  type="text"
                  value={leadFaculty}
                  onChange={e => setLeadFaculty(e.target.value)}
                  placeholder="e.g. Dr. Amitabh Sharma & Research Team"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('govtTriage.univWhyNeeded', 'Why is Research Needed? *')}
                </label>
                <textarea
                  rows={3}
                  value={matchRationale}
                  onChange={e => setMatchRationale(e.target.value)}
                  placeholder="Why is this a new technical challenge that needs engineering research?"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:border-[#0052a5]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#f1f5f9] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setSelectedProblem(null); setTriageAction(null); }}
                className="px-4 py-2 rounded-xl border border-[#cbd5e1] text-xs font-mono text-[#64748b] hover:bg-[#f8fafc]"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmUniversityRouting}
                className="px-5 py-2.5 rounded-xl bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t('govtTriage.confirmUnivRouting', 'Confirm University Routing')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
