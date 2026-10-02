import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem } from '../../types';
import { RolePhotoCard } from '../common/RolePhotoCard';
import {
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Star,
  ThumbsUp,
  ShieldCheck,
  Send,
  Loader2,
  Mic,
  StopCircle,
  Play,
  Volume2,
  X
} from 'lucide-react';
import { ProblemJourneyTimeline } from './ProblemJourneyTimeline';
import { CATEGORIES_LIST, JHARKHAND_DISTRICTS_LIST } from '../../data/mockData';

interface CitizenDashboardProps {
  onOpenSubmitModal: () => void;
  onOpenDetailModal: (problem: Problem) => void;
  onOpenFeedbackModal: (problem: Problem) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  onOpenSubmitModal,
  onOpenDetailModal,
  onOpenFeedbackModal
}) => {
  const { t, problems, clusters, coSignProblem, addProblem } = useApp();

  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>(null);
  const [showFeedbackForProblemId, setShowFeedbackForProblemId] = useState<string | null>(null);

  // Inline Quick Submission Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES_LIST[0]);
  const [formDistrict, setFormDistrict] = useState(JHARKHAND_DISTRICTS_LIST[0]);
  const [formAffected, setFormAffected] = useState('');
  const [formImage, setFormImage] = useState<string>('');
  const [formImageName, setFormImageName] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);

  // Voice Recording state for inline form
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  // Local feedback form state
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-100 text-rose-950 border border-rose-300 font-bold';
      case 'High':
        return 'bg-orange-100 text-orange-950 border border-orange-300 font-bold';
      case 'Medium':
        return 'bg-amber-100 text-amber-950 border border-amber-300 font-bold';
      default:
        return 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold';
    }
  };

  const getHeatmapCardClass = (severity: string, isOpen: boolean) => {
    const base = 'rounded-2xl border transition-all duration-200 bg-white shadow-xs flex flex-col justify-between';
    if (isOpen) {
      return `${base} ring-2 ring-[#0052a5] border-[#0052a5] shadow-md`;
    }
    switch (severity) {
      case 'Critical':
        return `${base} border-rose-200 hover:border-rose-400 hover:shadow-md`;
      case 'High':
        return `${base} border-orange-200 hover:border-orange-400 hover:shadow-md`;
      case 'Medium':
        return `${base} border-amber-200 hover:border-amber-400 hover:shadow-md`;
      default:
        return `${base} border-[#e2e8f0] hover:border-[#0052a5] hover:shadow-md`;
    }
  };

  const handleInlineImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      let chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setRecordingState('recording');
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) {
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecordingState('idle');
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
    setAudioUrl('');
    setRecordingTime(0);
  };

  const reRecordAudio = () => {
    removeAudio();
    startRecording();
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    setIsSubmitting(true);

    try {
      const affectedNum = Number(formAffected) || 120;
      const newId = `JH-PR-${Math.floor(1000 + Math.random() * 9000)}`;

      const created = addProblem({
        id: newId,
        title: formTitle.trim(),
        description: formDescription.trim(),
        district: formDistrict,
        locationDetails: `${formDistrict} Panchayat Ward`,
        category: formCategory,
        severity: affectedNum > 500 ? 'Critical' : affectedNum > 200 ? 'High' : 'Medium',
        peopleAffected: affectedNum,
        reportedDate: 'Just now',
        status: 'Submitted',
        userCoSigned: true,
        coSignCount: 1,
        images: formImage ? [formImage] : [],
        audioNote: audioUrl || undefined,
        problemDna: {
          rootCause: `Preliminary AI analysis: Chronic infrastructure bottleneck in ${formDistrict}.`,
          complexityScore: 72,
          requiredDisciplines: ['Civil', 'IoT / Telemetry', 'Environmental Engg'],
          suggestedBudgetRange: '₹3,50,000 - ₹8,000,000'
        }
      });

      setFormTitle('');
      setFormDescription('');
      setFormAffected('');
      setFormImage('');
      setFormImageName('');
      setAudioBlob(null);
      setAudioUrl('');
      setRecordingTime(0);
      const targetId = created?.id || newId;
      setSubmittedProblemId(targetId);
      setFormSubmitted(true);
      setExpandedProblemId(targetId);
      setTimeout(() => setFormSubmitted(false), 6000);
    } catch (err) {
      console.error('Error in handleInlineSubmit:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* SUBMISSION FORM - VISIBLE BY DEFAULT */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 shadow-xs sticky top-6">
            <div className="mb-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5] flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0052a5]" />
                <span>{t('citizen.badge', 'CITIZEN REPORTING')}</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#0f172a]">{t('citizen.reportProblem', 'Report a Problem')}</h2>
              <p className="text-xs text-[#64748b] mt-1">
                {t('citizen.reportSub', 'Tell us what is happening in your village or ward. We will verify it and notify civic and college teams.')}
              </p>
            </div>

            <form onSubmit={handleInlineSubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                  {t('citizen.problemTitleLabel', 'Problem Title')}
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Broken water pipeline near school"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                  {t('citizen.describeIssueLabel', 'Describe the Issue')}
                </label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Tell us what is broken, who is affected, and how long it has been there..."
                  rows={3}
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                    {t('citizen.categoryLabel', 'Category')}
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-2.5 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  >
                    {CATEGORIES_LIST.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                    {t('citizen.districtLabel', 'District')}
                  </label>
                  <select
                    value={formDistrict}
                    onChange={e => setFormDistrict(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-2.5 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  >
                    {JHARKHAND_DISTRICTS_LIST.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                  {t('citizen.peopleAffectedLabel', 'People Affected (Approx.)')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formAffected}
                  onChange={e => setFormAffected(e.target.value)}
                  placeholder="e.g. 350"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                  {t('citizen.photoEvidence', 'Photo Evidence (Optional)')}
                </label>
                <label className="flex items-center justify-between border border-[#cbd5e1] rounded-xl px-3 py-2 bg-[#f8fafc] hover:bg-[#eff6ff] hover:border-[#0052a5] cursor-pointer transition-all">
                  <span className="text-xs text-[#64748b] truncate max-w-[180px]">
                    {formImageName || t('citizen.uploadPhone', 'Upload photo from phone')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#cbd5e1] text-[10px] font-semibold text-[#0052a5]">
                    {t('citizen.browse', 'Browse')}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInlineImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#334155] uppercase block mb-1">
                  {t('citizen.voiceNote', 'Voice Note (Optional)')}
                </label>

                {recordingState === 'recording' || audioUrl ? (
                  <div className="space-y-2.5">
                    {recordingState === 'recording' && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs text-red-700 font-semibold">Recording: {Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}</span>
                        </div>
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <StopCircle className="w-3.5 h-3.5" />
                          Stop
                        </button>
                      </div>
                    )}

                    {audioUrl && recordingState !== 'recording' && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="text-xs text-blue-700 font-semibold">Audio recorded ({Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={playAudio}
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Play
                          </button>
                          <button
                            type="button"
                            onClick={reRecordAudio}
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            Re-record
                          </button>
                          <button
                            type="button"
                            onClick={removeAudio}
                            className="px-2.5 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold flex items-center justify-center transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-full px-3 py-2 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] hover:bg-[#eff6ff] hover:border-[#0052a5] text-[#0052a5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Mic className="w-4 h-4 shrink-0" />
                    Start Recording
                  </button>
                )}
              </div>

              <button
                id="citizen-inline-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#0052a5] hover:bg-[#003f80] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0052a5]/40 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white shrink-0" />
                    <span>{t('citizen.submitting', 'Submitting Problem...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white shrink-0" />
                    <span>{t('citizen.submitProblemBtn', 'Submit Problem')}</span>
                  </>
                )}
              </button>

              {formSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-mono space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('citizen.reportedSuccess', 'Problem reported successfully!')}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 pl-5">
                    {submittedProblemId ? `ID: #${submittedProblemId} · ` : ''}Our team and local administration will review the issue within 48 hours.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* PROBLEMS CARDS: Consistent with District Heatmap Cards */}
        <div className="lg:col-span-3 order-1 lg:order-2 space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between flex-wrap gap-2 animate-fade-in">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#0f172a]">
                {t('citizen.communityProblems', 'Community Problems')} ({problems.length})
              </h2>
              <p className="text-xs text-[#64748b]">
                {t('citizen.communityProblemsSub', 'Real ground problems mapped across Jharkhand districts')}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#0052a5] bg-[#eff6ff] px-2.5 py-1 rounded-lg border border-[#bfdbfe]">
              {t('citizen.clickToSeeAction', "Click 'View details' to see action steps")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
            {problems.map(problem => {
              const isOpen = expandedProblemId === problem.id;
              const isTimelineOpen = expandedTimelineId === problem.id;
              const isFeedbackOpen = showFeedbackForProblemId === problem.id;
              const coSignCount = problem.coSignCount || 18;
              const isCoSigned = !!problem.userCoSigned;

              return (
                <div
                  key={problem.id}
                  className={`${getHeatmapCardClass(problem.severity, isOpen)} ${
                    isOpen ? 'md:col-span-2' : ''
                  } p-5`}
                >
                  {/* Card Header matching Heatmap Tile style */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
                            {problem.id}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#ea580c] font-semibold">
                            <MapPin className="w-3 h-3 text-[#ea580c] shrink-0" />
                            <span>{problem.district}</span>
                          </span>
                        </div>
                      </div>

                      <div
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider shrink-0 ${getSeverityBadgeClass(
                          problem.severity
                        )}`}
                      >
                        {problem.severity}
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#0f172a] leading-snug">
                      {problem.title}
                    </h3>
                  </div>

                  {/* Primary Metric Pill consistent with Heatmap cards */}
                  <div className="my-3 bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0] space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#64748b] uppercase text-[10px]">{t('citizen.domain', 'Domain')}:</span>
                      <span className="font-bold text-[#0052a5] truncate max-w-[170px]">
                        {problem.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#64748b] uppercase text-[10px]">{t('citizen.peopleAffectedLabel', 'People Affected')}:</span>
                      <span className="font-bold text-[#0f172a]">
                        {(problem.peopleAffected || 120).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#64748b] uppercase text-[10px]">{t('citizen.currentStatus', 'Current Status')}:</span>
                      <span className="font-bold text-[#ea580c] truncate max-w-[170px]">
                        {problem.status}
                      </span>
                    </div>
                  </div>

                  {/* Action row at bottom of card */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#f1f5f9]">
                    <button
                      type="button"
                      onClick={() => coSignProblem(problem.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCoSigned
                          ? 'bg-[#ea580c] text-white'
                          : 'bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#475569] border border-[#cbd5e1]'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isCoSigned ? 'fill-white' : ''}`} />
                      <span>{isCoSigned ? t('citizen.supported', 'SUPPORTED') : t('citizen.support', 'SUPPORT')} ({coSignCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedProblemId(isOpen ? null : problem.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1 cursor-pointer border ${
                        isOpen
                          ? 'bg-[#0f172a] text-white border-[#0f172a]'
                          : 'bg-white text-[#0052a5] border-[#cbd5e1] hover:border-[#0052a5]'
                      }`}
                    >
                      <span>{isOpen ? t('citizen.hide', 'Hide') : t('citizen.viewDetails', 'View details')}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* HIDDEN UNTIL CLICKED: Full Description, Problem DNA, Cluster info, Feedback */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[#f1f5f9] space-y-4 animate-in fade-in duration-150 text-left">
                      {/* Description & Location */}
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {problem.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748b]">
                        <span className="flex items-center gap-1 text-[#334155]">
                          <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                          {problem.locationDetails || `${problem.district}, Jharkhand`}
                        </span>
                        <span>• Approx {(problem.peopleAffected || 120).toLocaleString()} {t('citizen.peopleAffectedLabel', 'people affected')}</span>
                        <span>• {t('citizen.currentStatus', 'Status')}: <strong className="text-[#0f172a]">{problem.status}</strong></span>
                      </div>

                      {/* Citizen Verified Ground Photo */}
                      <RolePhotoCard
                        category={problem.category}
                        district={problem.district}
                        title={`Verified Ground Photo · ${problem.title}`}
                        aspectRatio="video"
                      />

                      {/* Problem DNA Block */}
                      {problem.problemDna && (
                        <div className="p-4 rounded-xl bg-[#0f172a] text-[#f8fafc] font-mono text-xs space-y-2">
                          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t('citizen.aiAnalysis', 'AI PROBLEM ANALYSIS')}</span>
                          </div>
                          <div>
                            <span className="text-[#94a3b8]">{t('citizen.rootCause', 'Root cause')}: </span>
                            <span>{problem.problemDna.rootCause}</span>
                          </div>
                          <div className="text-[11px] text-[#94a3b8]">
                            {t('citizen.expertiseRequired', 'Expertise required')}: [{Array.isArray(problem.problemDna?.requiredDisciplines) ? problem.problemDna.requiredDisciplines.join(', ') : ''}]
                          </div>
                          <div className="text-[11px] text-[#94a3b8]">
                            {t('citizen.estimatedBudget', 'Estimated budget')}: {problem.problemDna.suggestedBudgetRange}
                          </div>
                        </div>
                      )}

                      {/* University Assignment */}
                      {problem.assignedUniversity && (
                        <div className="p-3 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-[#0052a5]" />
                            <span className="font-semibold text-[#0f172a]">
                              {problem.assignedUniversity.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-[#0052a5] font-bold">
                            {problem.assignedUniversity.matchScore}% {t('citizen.match', 'Match')}
                          </span>
                        </div>
                      )}

                      {/* Journey Timeline Sub-toggle */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setExpandedTimelineId(isTimelineOpen ? null : problem.id)}
                          className="text-xs font-mono font-semibold text-[#0052a5] flex items-center gap-1 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{isTimelineOpen ? t('citizen.hideProgress', 'Hide Progress Steps') : t('citizen.viewProgress', 'View Progress Steps')}</span>
                        </button>

                        {isTimelineOpen && (
                          <div className="mt-2 p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                            <ProblemJourneyTimeline problem={problem} />
                          </div>
                        )}
                      </div>

                      {/* Support / Co-Sign and Feedback triggers */}
                      <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => coSignProblem(problem.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isCoSigned
                              ? 'bg-[#ea580c] text-white'
                              : 'bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#475569] border border-[#cbd5e1]'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isCoSigned ? 'fill-white' : ''}`} />
                          <span>{isCoSigned ? t('citizen.supported', 'SUPPORTED') : t('citizen.support', 'SUPPORT')} ({coSignCount})</span>
                        </button>

                        {(problem.status === 'Deployed' || problem.status === 'Impact_Verified') && (
                          <button
                            type="button"
                            onClick={() => setShowFeedbackForProblemId(isFeedbackOpen ? null : problem.id)}
                            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-mono font-bold border border-amber-300 flex items-center gap-1 cursor-pointer"
                          >
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{isFeedbackOpen ? t('citizen.hideFeedback', 'HIDE FEEDBACK') : t('citizen.rateCompletedWork', 'RATE COMPLETED WORK')}</span>
                          </button>
                        )}
                      </div>

                      {/* Feedback Form (Hidden until clicked) */}
                      {isFeedbackOpen && (
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3 animate-in fade-in">
                          <p className="text-xs font-mono font-semibold text-amber-950">
                            {t('citizen.communityFeedbackFor', 'Community Feedback for')} {problem.title}
                          </p>
                          {feedbackSent ? (
                            <p className="text-xs font-mono text-emerald-800 bg-emerald-100 p-2 rounded-lg">
                              {t('citizen.feedbackSuccess', 'Thank you! Your feedback has been sent directly to the engineering team.')}
                            </p>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFeedbackRating(star)}
                                    className="p-1 cursor-pointer"
                                  >
                                    <Star
                                      className={`w-4 h-4 ${
                                        star <= feedbackRating
                                          ? 'fill-amber-500 text-amber-500'
                                          : 'text-[#cbd5e1]'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              <input
                                type="text"
                                value={feedbackComment}
                                onChange={e => setFeedbackComment(e.target.value)}
                                placeholder={t('citizen.feedbackPlaceholder', 'What is working well? What needs repair?')}
                                className="w-full text-xs font-mono p-2 rounded-lg bg-white border border-[#cbd5e1] focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (feedbackRating > 0) setFeedbackSent(true);
                                }}
                                className="px-3 py-1 rounded-lg bg-[#0052a5] text-white text-xs font-mono font-bold cursor-pointer"
                              >
                                {t('citizen.submitRating', 'Submit Rating')}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

