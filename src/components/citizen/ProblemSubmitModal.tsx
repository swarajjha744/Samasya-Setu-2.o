import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCategory, ProblemSeverity, Problem } from '../../types';
import { JHARKHAND_DISTRICTS_LIST, CATEGORIES_LIST } from '../../data/mockData';
import {
  X,
  Sparkles,
  Upload,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  Copy,
  ThumbsUp,
  ShieldCheck,
  Camera,
  RefreshCw,
  Check,
  Mic,
  StopCircle,
  Play,
  Volume2
} from 'lucide-react';

interface ProblemSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (problemId: string) => void;
}

export const ProblemSubmitModal: React.FC<ProblemSubmitModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { t, problems, submitNewProblem, coSignProblem, showToast, currentUser, requireAuth } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProblemCategory>('Water & Sanitation');
  const [district, setDistrict] = useState(currentUser?.district || 'Ranchi');
  const [locationDetails, setLocationDetails] = useState(
    currentUser?.organization ? `${currentUser.organization}, ${currentUser.district || 'Ranchi'}, Jharkhand` : 'Gram Panchayat / Ward, Ranchi, Jharkhand'
  );
  const [description, setDescription] = useState('');
  const [peopleAffected, setPeopleAffected] = useState<number>(3500);
  const [severity, setSeverity] = useState<ProblemSeverity>('High');
  const [citizenName, setCitizenName] = useState(currentUser?.name || 'Verified Citizen');
  const [citizenContact, setCitizenContact] = useState(currentUser?.email || currentUser?.phone || '');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imageVerified, setImageVerified] = useState(false);
  const [isVerifyingImage, setIsVerifyingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dismissDuplicateAlert, setDismissDuplicateAlert] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Voice recording states
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'playback'>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keep form synced with user if user logs in
  React.useEffect(() => {
    if (currentUser) {
      if (!citizenName || citizenName === 'Verified Citizen') setCitizenName(currentUser.name);
      if (!citizenContact) setCitizenContact(currentUser.email || currentUser.phone || '');
      if (currentUser.district) setDistrict(currentUser.district);
    }
  }, [currentUser]);

  // Live duplicate detection
  const duplicateMatches = useMemo(() => {
    if (!title.trim() && !description.trim()) return [];

    const searchTokens = `${title} ${description}`
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 3);

    if (searchTokens.length === 0) return [];

    const scoredProblems = problems.map(prob => {
      const probText = `${prob.title} ${prob.description} ${prob.category} ${prob.district}`.toLowerCase();
      let matchCount = 0;
      searchTokens.forEach(token => {
        if (probText.includes(token)) matchCount += 1;
      });

      if (prob.category === category) matchCount += 1.5;
      if (prob.district.toLowerCase() === district.toLowerCase()) matchCount += 2;

      const score = Math.min(98, Math.round((matchCount / (searchTokens.length + 3)) * 100));
      return { problem: prob, matchScore: score };
    });

    return scoredProblems
      .filter(item => item.matchScore >= 45)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 2);
  }, [title, description, category, district, problems]);

  if (!isOpen) return null;

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    setIsVerifyingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      setSelectedImage(resultUrl);
      setTimeout(() => {
        setIsVerifyingImage(false);
        setImageVerified(true);
        showToast('Photo evidence uploaded and verified', 'success');
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    setIsVerifyingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      setSelectedImage(resultUrl);
      setTimeout(() => {
        setIsVerifyingImage(false);
        setImageVerified(true);
        showToast('Photo evidence dropped and verified', 'success');
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage('');
    setImageFileName('');
    setImageVerified(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Voice recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        showToast('Voice recording saved successfully', 'success');
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setRecordingState('recording');
      setRecordingTime(0);
      showToast('Recording started... speak clearly', 'info');

      // Track recording time (max 2 minutes = 120 seconds)
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 119) {
            // Auto-stop at 2 minutes
            if (mediaRecorderRef.current && recordingState === 'recording') {
              mediaRecorderRef.current.stop();
              setRecordingState('idle');
              showToast('Recording stopped (max 2 minutes reached)', 'info');
            }
            if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      showToast('Microphone access denied or unavailable', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingState('idle');
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setRecordingState('playback');
      audio.onended = () => setRecordingState('idle');
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
    setAudioUrl('');
    setRecordingState('idle');
    setRecordingTime(0);
  };

  const reRecordAudio = async () => {
    removeAudio();
    await startRecording();
  };

  const handleCoSignExisting = (existingProb: Problem) => {
    coSignProblem(existingProb.id);
    showToast(`Supported problem #${existingProb.id}: "${existingProb.title}"!`, 'success');
    onClose();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!selectedImage) {
        showToast(t('submitModal.photoWarning', 'Please select or upload ground photo evidence.'), 'warning');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!title.trim() || !description.trim()) {
        showToast(t('submitModal.fillWarning', 'Please fill in the problem title and description.'), 'warning');
        return;
      }
      setStep(3);
    }
  };

  const handleFinalSubmit = () => {
    const cleanLocation = locationDetails.includes('Jharkhand')
      ? locationDetails.trim()
      : `${locationDetails.trim()}, ${district}, Jharkhand`;

    setIsSubmitting(true);

    setTimeout(() => {
      const newProblem = submitNewProblem({
        title,
        description,
        category,
        district,
        state: 'Jharkhand',
        locationDetails: cleanLocation,
        peopleAffected: Number(peopleAffected),
        severity,
        submittedByName: citizenName,
        submittedByContact: citizenContact,
        images: [selectedImage],
        audioNote: audioUrl || undefined  // Add voice recording
      });

      setIsSubmitting(false);
      onClose();
      if (onSuccess) {
        onSuccess(newProblem.id);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl max-w-2xl w-full p-4 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl my-4 sm:my-8 max-h-[94vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 animate-slide-down">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
                {t('submitModal.badge', 'JHARKHAND CITIZEN REPORT')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>{t('submitModal.jharkhandOnly', 'Strictly Inside Jharkhand')}</span>
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-serif text-[#0f172a]">
              {t('submitModal.title', 'Report a Local Ground Challenge')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] cursor-pointer smooth-transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Wizard Navigation */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 stagger">
          {[
            { num: 1, label: t('submitModal.step1', '1. Photo Evidence'), shortLabel: '1. Photo' },
            { num: 2, label: t('submitModal.step2', '2. Problem & Location'), shortLabel: '2. Problem' },
            { num: 3, label: t('submitModal.step3', '3. Impact & Submitter'), shortLabel: '3. Impact' }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < step || (s.num === 2 && selectedImage) || (s.num === 3 && title && description)) {
                  setStep(s.num as any);
                }
              }}
              className={`py-2 px-1 sm:px-3 rounded-lg text-[11px] sm:text-xs font-mono font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 smooth-transition ${
                step === s.num
                  ? 'bg-[#0052a5] text-white shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-[#f8fafc] text-[#94a3b8] border border-[#e2e8f0]'
              }`}
            >
              {step > s.num ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" /> : null}
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden truncate">{s.shortLabel}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleNextStep} className="space-y-5 text-xs">
          {/* STEP 1: PHOTO EVIDENCE */}
          {step === 1 && (
            <div className="space-y-4 animate-scale-in">
              <div className="space-y-1 animate-fade-in-up">
                <label className="font-mono uppercase font-bold text-[#0f172a] text-xs flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#0052a5]" />
                  <span>{t('submitModal.step1Heading', 'Step 1: Upload On-Ground Photo Evidence *')}</span>
                </label>
                <p className="text-[11px] text-[#64748b]">
                  {t('submitModal.step1Sub', 'Upload a photo of the local issue or site to authenticate the community report.')}
                </p>
              </div>

              {!selectedImage ? (
                /* Drag and Drop Zone */
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#0052a5] bg-[#eff6ff]'
                      : 'border-[#cbd5e1] hover:border-[#0052a5] hover:bg-[#f8fafc] bg-[#f8fafc]/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center mb-3 text-[#0052a5] shadow-xs">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="font-mono font-bold text-sm text-[#0f172a]">
                    {t('submitModal.clickBrowse', 'Click to browse or drag & drop photo here')}
                  </div>
                  <p className="text-xs text-[#64748b] mt-1.5 max-w-sm">
                    {t('submitModal.supportFormats', 'Supports JPG, PNG, WEBP from your device or mobile camera')}
                  </p>
                </div>
              ) : (
                /* Uploaded Image Preview Box */
                <div className="rounded-2xl border border-[#cbd5e1] bg-[#f8fafc] p-4 space-y-3">
                  <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-[#e2e8f0] bg-slate-900 shadow-inner">
                    <img
                      src={selectedImage}
                      alt="Uploaded ground evidence"
                      className="w-full h-full object-contain bg-slate-950"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>{district}, Jharkhand</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="space-y-0.5">
                      <div className="font-mono font-bold text-xs text-[#0f172a] truncate max-w-xs sm:max-w-md">
                        {imageFileName || 'Uploaded photo evidence'}
                      </div>
                      {imageVerified && (
                        <div className="text-emerald-800 text-[11px] font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{t('submitModal.photoAuth', 'Ground photo authenticated')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-xs font-mono font-semibold text-[#0f172a] cursor-pointer"
                      >
                        {t('submitModal.replace', 'Replace')}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-mono font-semibold text-rose-700 cursor-pointer"
                      >
                        {t('submitModal.remove', 'Remove')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Recording Option (Optional) */}
              <div className="border-t border-[#e2e8f0] pt-4 space-y-3">
                <label className="font-mono uppercase font-bold text-[#0f172a] text-xs flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('submitModal.voiceNote', 'Optional: Add Voice Description')}</span>
                </label>
                <p className="text-[11px] text-[#64748b]">
                  {t('submitModal.voiceDesc', 'Record a short audio note (max 2 mins) describing the issue in your own words. Helps government understand better.')}
                </p>

                {!audioUrl ? (
                  /* Recording Controls */
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={recordingState !== 'idle'}
                      className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-mono font-bold text-xs text-white transition-all cursor-pointer ${
                        recordingState === 'recording'
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-700'
                      } disabled:opacity-50`}
                    >
                      <Mic className="w-4 h-4 shrink-0" />
                      <span>{recordingState === 'recording' ? `Recording ${recordingTime}s` : 'Start Recording'}</span>
                    </button>

                    {recordingState === 'recording' && (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-4 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-700 text-white flex items-center gap-2 font-mono font-bold text-xs cursor-pointer transition-all"
                      >
                        <StopCircle className="w-4 h-4 shrink-0" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Audio Preview & Controls */
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-emerald-900 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>✓ Voice saved ({(audioBlob?.size || 0) / 1024 < 1024 ? ((audioBlob?.size || 0) / 1024).toFixed(0) + ' KB' : ((audioBlob?.size || 0) / (1024 * 1024)).toFixed(1) + ' MB'})</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={playAudio}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 font-mono font-bold text-xs cursor-pointer transition-all"
                      >
                        <Play className="w-4 h-4 shrink-0" />
                        <span>Play</span>
                      </button>

                      <button
                        type="button"
                        onClick={reRecordAudio}
                        className="px-4 py-2 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700 flex items-center gap-2 font-mono font-bold text-xs cursor-pointer transition-all"
                      >
                        <Mic className="w-4 h-4 shrink-0" />
                        <span>Re-record</span>
                      </button>

                      <button
                        type="button"
                        onClick={removeAudio}
                        className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 flex items-center gap-2 font-mono font-bold text-xs cursor-pointer transition-all"
                      >
                        <X className="w-4 h-4 shrink-0" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: PROBLEM & LOCATION */}
          {step === 2 && (
            <div className="space-y-4 animate-scale-in">
              {/* Duplicate alert if found */}
              {duplicateMatches.length > 0 && !dismissDuplicateAlert && (
                <div className="p-3.5 rounded-xl bg-[#fff7ed] border border-[#ffedd5] space-y-2 animate-pop-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#ea580c] flex items-center gap-1.5">
                      <Copy className="w-4 h-4" /> {t('submitModal.similarFound', 'Similar Problem Already Reported')} ({duplicateMatches[0].matchScore}% Match)
                    </span>
                    <button
                      type="button"
                      onClick={() => setDismissDuplicateAlert(true)}
                      className="text-[10px] font-mono text-[#64748b] underline cursor-pointer"
                    >
                      {t('submitModal.dismiss', 'Dismiss')}
                    </button>
                  </div>
                  <p className="text-xs text-[#475569]">
                    A similar challenge exists in {district}. You can support it to accelerate allocation:
                  </p>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#fed7aa]">
                    <div className="font-semibold text-[#0f172a] text-xs truncate max-w-sm">
                      {duplicateMatches[0].problem.title}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCoSignExisting(duplicateMatches[0].problem)}
                      className="px-3 py-1 bg-[#ea580c] text-white text-[11px] font-mono font-bold rounded-lg hover:bg-[#c2410c] flex items-center gap-1 shrink-0 smooth-transition"
                    >
                      <ThumbsUp className="w-3 h-3" /> {t('submitModal.supportExisting', 'Support This')}
                    </button>
                  </div>
                </div>
              )}

              <div className="animate-fade-in-up">
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('submitModal.problemTitle', 'Problem Title / Headline *')}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    setDismissDuplicateAlert(false);
                  }}
                  placeholder={t('submitModal.titlePlaceholder', 'e.g. High Fluoride in Silli Village Handpumps...')}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.thematicCategory', 'Thematic Category *')}
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                  >
                    {CATEGORIES_LIST.filter(c => c !== 'All Categories').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.district', 'Jharkhand District (24) *')}
                  </label>
                  <select
                    value={district}
                    onChange={e => {
                      const newDist = e.target.value;
                      setDistrict(newDist);
                      setLocationDetails(`Gram Panchayat / Ward in ${newDist}, Jharkhand`);
                    }}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] font-semibold focus:outline-none focus:border-[#0052a5] smooth-transition"
                    required
                  >
                    {JHARKHAND_DISTRICTS_LIST.filter(d => d !== 'All Districts').map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="animate-fade-in-up">
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('submitModal.landmark', 'Specific Panchayat / Block / Village Landmark *')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationDetails}
                    onChange={e => setLocationDetails(e.target.value)}
                    placeholder="e.g. Banta Hajam Gram Panchayat, Silli Block, Ranchi"
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-8 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                    required
                  />
                  <MapPin className="w-4 h-4 text-[#ea580c] absolute left-2.5 top-3" />
                </div>
              </div>

              <div className="animate-fade-in-up">
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('submitModal.desc', 'Problem Description (What is failing?) *')}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={t('submitModal.descPlaceholder', 'Explain what is broken, health/crop symptoms, and how it impacts local residents...')}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 3: IMPACT & SUBMITTER */}
          {step === 3 && (
            <div className="space-y-4 animate-scale-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.citizensAffected', 'Estimated Citizens Affected *')}
                  </label>
                  <input
                    type="number"
                    value={peopleAffected}
                    onChange={e => setPeopleAffected(Number(e.target.value))}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] font-mono focus:outline-none focus:border-[#0052a5] smooth-transition"
                    min={1}
                    required
                  />
                </div>

                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.urgency', 'Urgency Severity *')}
                  </label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as ProblemSeverity)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                  >
                    <option value="Critical">Critical (Immediate Hazard)</option>
                    <option value="High">High (Severe Daily Impact)</option>
                    <option value="Medium">Medium (Chronic Difficulty)</option>
                    <option value="Low">Low (Minor Inconvenience)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.yourName', 'Your Name / Mukhiya / Resident *')}
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={e => setCitizenName(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                    required
                  />
                </div>

                <div className="animate-fade-in-up">
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('submitModal.contact', 'Phone Number / Email *')}
                  </label>
                  <input
                    type="text"
                    value={citizenContact}
                    onChange={e => setCitizenContact(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-[#0f172a] focus:outline-none focus:border-[#0052a5] smooth-transition"
                    required
                  />
                </div>
              </div>

              {/* Summary review card */}
              <div className="p-3.5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] space-y-1.5 text-xs text-[#0f172a] animate-pop-in">
                <div className="font-mono font-bold text-[#0052a5] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> {t('submitModal.readyForRouting', 'Ready for Automated Lab Routing')}
                </div>
                <p className="text-[#334155]">
                  {t('submitModal.routingDesc', 'Your submission will be registered and instantly indexed for college engineering labs and CSR funding.')}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9] gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-3 sm:px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] font-mono font-bold text-xs text-[#64748b] hover:bg-[#e2e8f0] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-4 h-4" /> {t('submitModal.back', 'Back')}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] font-mono text-xs text-[#64748b] hover:bg-[#e2e8f0] cursor-pointer shrink-0"
              >
                {t('submitModal.cancel', 'Cancel')}
              </button>
            )}

            {step < 3 ? (
              <button
                type="submit"
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#0052a5] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#003f80] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{t('submitModal.continue', 'Continue')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-3.5 sm:px-6 py-2.5 rounded-xl bg-[#0052a5] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#003f80] transition-all disabled:opacity-50 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs text-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span className="truncate">{t('submitModal.submitting', 'Submitting...')}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t('submitModal.confirmSubmit', 'Confirm & Submit')}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
