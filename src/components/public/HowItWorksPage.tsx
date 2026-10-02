import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  PhoneCall,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Activity,
  Users,
  Layers,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DISTRICT_STATS_DATA } from '../../data/mockData';
import { DistrictStat } from '../../types';

// District short codes for cartographic telemetry display
const DISTRICT_CODES: Record<string, string> = {
  'Ranchi': 'RCH',
  'Dhanbad': 'DHN',
  'East Singhbhum': 'ESI',
  'Bokaro': 'BKO',
  'West Singhbhum': 'WSI',
  'Dumka': 'DMK',
  'Hazaribagh': 'HAZ',
  'Khunti': 'KHN',
  'Palamu': 'PLM',
  'Deoghar': 'DGH',
  'Giridih': 'GRD',
  'Ramgarh': 'RMG',
  'Saraikela Kharsawan': 'SKH',
  'Gumla': 'GML',
  'Simdega': 'SMD',
  'Lohardaga': 'LHD',
  'Koderma': 'KOD',
  'Chatra': 'CHT',
  'Garhwa': 'GRH',
  'Latehar': 'LTH',
  'Godda': 'GDA',
  'Jamtara': 'JMT',
  'Sahibganj': 'SBG',
  'Pakur': 'PKR'
};

export const HowItWorksPage: React.FC = () => {
  const { t, setPublicTab } = useApp();

  // District Coverage Map Teaser state
  const coverageSectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictStat>(DISTRICT_STATS_DATA[0]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Scroll into view detection via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (coverageSectionRef.current) {
      observer.observe(coverageSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track animation completion for signal replay
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, DISTRICT_STATS_DATA.length * 45 + 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, animationKey]);

  const handleReplayAnimation = () => {
    setIsInView(false);
    setIsAnimationComplete(false);
    setAnimationKey((prev) => prev + 1);
    setTimeout(() => {
      setIsInView(true);
    }, 100);
  };

  const handleNavigateToImpact = () => {
    setPublicTab('impact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-in fade-in duration-200 text-left">
      
      {/* 1. Clear Header & Jharkhand Context */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-semibold text-[#0052a5]">
          <Sparkles className="w-3.5 h-3.5 text-[#0052a5]" />
          <span>{t('howItWorks.badge', 'Simple 2-Track System for Jharkhand')}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0f172a] tracking-tight">
          {t('howItWorks.title', 'How SamasyaSetu Works')}
        </h1>
        
        <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed">
          {t('howItWorks.subtitle', 'We send routine repairs to city teams and send hard scientific problems to college research labs.')}
        </p>

        {/* Quick District Reality Banner */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#334155]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
              <span><strong>{t('howItWorks.districtsFact', 'All 24 Districts: From Ranchi to Sahibganj & Palamu')}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0052a5] shrink-0" />
              <span><strong>{t('howItWorks.civicFact', 'Municipal Work: MBMC & PWD for city repairs')}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>{t('howItWorks.labsFact', 'College Labs: BIT Mesra, NIT & IIT (ISM) for science')}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Simple Steps */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#0052a5] uppercase tracking-wider">
            {t('howItWorks.stepSectionTag', 'Step-by-Step Flow')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0f172a] mt-1">
            {t('howItWorks.stepSectionTitle', 'From Ground Problem to Finished Solution')}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            {t('howItWorks.stepSectionSub', 'Every step is open and verified. No lost paperwork, no forgotten complaints.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3 relative hover:border-[#0052a5] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm border border-amber-300">
              1
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 block">
              {t('howItWorks.step1_tag', 'Step 1')}
            </span>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('howItWorks.step1_title', '1. Citizen Reports an Issue')}
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('howItWorks.step1_desc', 'A resident takes a photo and submits details about the problem in their village or ward.')}
            </p>
            <div className="pt-2 border-t border-[#f1f5f9] text-[11px] text-[#475569] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.step1_sub1', 'Simple mobile form with photo upload')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.step1_sub2', 'Instant tracking ID provided')}</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#0052a5] shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#0052a5] font-bold flex items-center justify-center text-sm border border-[#bfdbfe]">
              2
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0052a5] block">
              {t('howItWorks.step2_tag', 'Step 2')}
            </span>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('howItWorks.step3_title', '2. Government Review')}
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('howItWorks.step3_desc', 'District officers assign the work to local civic bodies or send it to university research teams.')}
            </p>
            <div className="pt-2 border-t border-[#eff6ff] text-[11px] font-semibold text-[#0052a5] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t('howItWorks.step2_sub1', 'Track A: Civic / MBMC Repair')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#0052a5] shrink-0" />
                <span>{t('howItWorks.step2_sub2', 'Track B: University Lab R&D')}</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3 relative hover:border-emerald-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-sm border border-emerald-300">
              3
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
              {t('howItWorks.step3_tag', 'Step 3')}
            </span>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('howItWorks.step4_title', '3. Lab Solutions & CSR Funding')}
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('howItWorks.step4_desc', 'Professors and students build a prototype. Industry partners fund field trials.')}
            </p>
            <div className="pt-2 border-t border-[#f1f5f9] text-[11px] text-[#475569] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.step3_sub1', 'Named officer or lead faculty assigned')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.step3_sub2', 'Direct phone and email contact visible')}</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3 relative hover:border-purple-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-sm border border-purple-300">
              4
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 block">
              {t('howItWorks.step4_tag', 'Step 4')}
            </span>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('howItWorks.step5_title', '4. Field Deployment & Feedback')}
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('howItWorks.step5_desc', 'The solution is set up on the ground. Citizens confirm the repair with photos and ratings.')}
            </p>
            <div className="pt-2 border-t border-[#f1f5f9] text-[11px] text-[#475569] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>{t('howItWorks.step4_sub1', 'Live progress tracker (0% to 100%)')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>{t('howItWorks.step4_sub2', 'Citizen star rating and sign-off')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Comparison: Track A vs Track B */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#0052a5] uppercase tracking-wider">
            {t('howItWorks.compTag', 'Clear Separation')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0f172a]">
            {t('howItWorks.compTitle', 'Understanding the Three Tracks')}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b]">
            {t('howItWorks.compSub', 'Routine repairs go to civic teams, complex science goes to universities, and urgent emergencies are fast-tracked immediately.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Track A: Municipal Repair */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider">Track A</span>
                <h3 className="text-lg font-bold text-[#0f172a]">
                  {t('howItWorks.trackA_title', 'Track A: Routine Civic Work')}
                </h3>
                <span className="text-xs text-[#64748b]">
                  {t('howItWorks.trackA_handler', 'Handled by MBMC, PWD, and Jal Board')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t('howItWorks.trackA_desc', 'Standard civic fixes handled directly by departments like MBMC, DWSD, and PWD within strict deadlines.')}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#0f172a]">{t('howItWorks.realExamples', 'Real Examples in Jharkhand:')}</div>
              <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs space-y-1.5 text-[#334155]">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exA1_lead', 'Burst water pipe in Kantatoli, Ranchi:')}</strong> {t('howItWorks.exA1_body', 'Broken iron line flooded the road. Municipal crew dispatched to fix the pipe.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exA2_lead', 'Blocked drain in Harmu Ward 26, Ranchi:')}</strong> {t('howItWorks.exA2_body', 'Silt caused dirty water to back up. Drain jetting machine cleared the blockage.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exA3_lead', 'Broken road culvert in Bero block:')}</strong> {t('howItWorks.exA3_body', 'Farmers could not reach the highway. PWD replaced the cracked concrete slab.')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#334155] pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.trackA_meta1', 'Executive Engineer assigned with direct phone contact')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.trackA_meta2', 'Resolution target: 3 to 14 business days')}</span>
              </div>
            </div>
          </div>

          {/* Track B: University Research & Innovation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0052a5] text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#0052a5] tracking-wider">Track B</span>
                <h3 className="text-lg font-bold text-[#0f172a]">
                  {t('howItWorks.trackB_title', 'Track B: University Research & CSR')}
                </h3>
                <span className="text-xs text-[#64748b]">
                  {t('howItWorks.trackB_handler', 'Handled by BIT Mesra, NIT Jamshedpur & IIT (ISM) Dhanbad')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t('howItWorks.trackB_desc', 'Complex issues like fluoride water or mine dust go to engineering colleges for prototypes, funded by CSR.')}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#0f172a]">{t('howItWorks.realExamples', 'Real Examples in Jharkhand:')}</div>
              <div className="p-3 rounded-xl bg-white border border-blue-200 text-xs space-y-1.5 text-[#334155]">
                <div className="flex items-start gap-2">
                  <span className="text-[#0052a5] font-bold">•</span>
                  <span><strong>{t('howItWorks.exB1_lead', 'Fluoride in Silli, Ranchi:')}</strong> {t('howItWorks.exB1_body', '3.2 mg/L fluoride deformed joints. BIT Mesra built affordable clay filtration media.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0052a5] font-bold">•</span>
                  <span><strong>{t('howItWorks.exB2_lead', 'Arsenic in Sahibganj wells:')}</strong> {t('howItWorks.exB2_body', 'Deep wells contained poison. University chemical teams tested natural biochar filters.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0052a5] font-bold">•</span>
                  <span><strong>{t('howItWorks.exB3_lead', 'Vaccine storage in West Singhbhum:')}</strong> {t('howItWorks.exB3_body', 'Forest clinics had no power. NIT engineers built solar thermal coolers.')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#334155] pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.trackB_meta1', 'Students build capstone graduation prototypes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('howItWorks.trackB_meta2', 'Funded by corporate CSR grants (Tata Steel, Coal India, SAIL)')}</span>
              </div>
            </div>
          </div>

          {/* Track C: Urgent & High-Priority Issues */}
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-red-800 tracking-wider">Track C</span>
                <h3 className="text-lg font-bold text-[#0f172a]">
                  {t('howItWorks.trackC_title', 'Track C: Urgent & High-Priority Issues')}
                </h3>
                <span className="text-xs text-[#64748b]">
                  {t('howItWorks.trackC_handler', 'Immediate escalation to responsible authority')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t('howItWorks.trackC_desc', 'For emergencies like drinking water shortage, exposed electric lines, major road blockage, etc. Routed immediately to the responsible authority, with escalation/reminders triggered and tracking until citizen verification.')}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#0f172a]">{t('howItWorks.realExamples', 'Real Examples in Jharkhand:')}</div>
              <div className="p-3 rounded-xl bg-white border border-red-200 text-xs space-y-1.5 text-[#334155]">
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exC1_lead', 'Dry water supply in residential area:')}</strong> {t('howItWorks.exC1_body', 'Complete water cutoff affecting entire neighborhood. DWSD dispatched emergency crew within hours.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exC2_lead', 'Live exposed electric wire:')}</strong> {t('howItWorks.exC2_body', 'Dangerous live line fallen across public pathway. DISCOM safety team rushed to isolate and secure.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>{t('howItWorks.exC3_lead', 'Major road blocked by collapsed tree:')}</strong> {t('howItWorks.exC3_body', 'Highway access cut off due to accident. PWD and traffic authority coordinated rapid clearance.')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-red-200">
              <div className="text-xs font-bold text-red-900">{t('howItWorks.trackC_flow', 'Response Flow:')}</div>
              <div className="space-y-1.5 text-[11px] text-[#334155]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">1</div>
                  <span><strong>Immediate Assignment</strong> — Routed to authority within 15 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">2</div>
                  <span><strong>Escalation</strong> — Hourly updates & supervisor alerts if no action</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">3</div>
                  <span><strong>Resolution</strong> — On-ground physical fix completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">4</div>
                  <span><strong>Citizen Verification</strong> — Resident confirms fix with photos</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#334155] pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>{t('howItWorks.trackC_meta1', 'Direct officer contact and real-time tracking')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>{t('howItWorks.trackC_meta2', 'Resolution target: Same day or within 24 hours')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. District Coverage Interactive Map Teaser Section */}
      <div
        id="how-it-works-district-coverage"
        ref={coverageSectionRef}
        className="p-6 sm:p-10 rounded-3xl bg-[#091124] border border-slate-800 text-white shadow-xl relative overflow-hidden space-y-8"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#0052a5]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header & Metrics Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-[11px] font-mono font-bold text-[#ea580c] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
              <span>Statewide Coverage Grid</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight">
              Active Across 24 Districts
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every village handpump, urban drainage blockage, and industrial pollution hotspot in Jharkhand is linked to civic engineers or university research laboratories.
            </p>
          </div>

          {/* Quick Summary Strip & Replay */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 text-left">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Coverage</span>
              <span className="text-base font-bold font-mono text-emerald-400">24 / 24</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Citizens Impacted</span>
              <span className="text-base font-bold font-mono text-white">1.1M+</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Peak Severity</span>
              <span className="text-base font-bold font-mono text-[#ea580c]">94/100</span>
            </div>
            {isAnimationComplete && (
              <button
                type="button"
                onClick={handleReplayAnimation}
                title="Replay coverage animation"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile-Friendly Hotspot Filter Strip (visible on mobile / small screens) */}
        <div className="block lg:hidden space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Quick Select District:</span>
            <span className="text-[11px] text-[#ea580c] font-bold">{selectedDistrict.district} active</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {DISTRICT_STATS_DATA.slice(0, 10).map((d) => (
              <button
                key={`mob-chip-${d.district}`}
                type="button"
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  selectedDistrict.district === d.district
                    ? 'bg-[#ea580c] text-white border-[#ea580c] font-bold shadow-xs'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {d.district} ({d.severityScore})
              </button>
            ))}
          </div>
        </div>

        {/* Stylized District Grid (Cartogram Layout) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#ea580c]" />
              Hover or tap any district to inspect live telemetry
            </span>
            <span className="hidden sm:inline text-slate-500">
              Color tone indicates priority severity index
            </span>
          </div>

          <div
            key={`district-grid-${animationKey}`}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5"
          >
            {DISTRICT_STATS_DATA.map((district, index) => {
              const isSelected = selectedDistrict.district === district.district;
              const shortCode = DISTRICT_CODES[district.district] || district.district.slice(0, 3).toUpperCase();
              const isHighSeverity = district.severityScore >= 85;
              const isMidSeverity = district.severityScore >= 75 && district.severityScore < 85;

              return (
                <button
                  key={district.district}
                  type="button"
                  onClick={() => setSelectedDistrict(district)}
                  onMouseEnter={() => setSelectedDistrict(district)}
                  style={{
                    transitionDelay: isInView ? `${index * 45}ms` : '0ms'
                  }}
                  className={`relative p-2.5 sm:p-3 rounded-xl text-left transition-all duration-500 cursor-pointer min-h-[52px] sm:min-h-[64px] flex flex-col justify-between border ${
                    !isInView
                      ? 'opacity-25 scale-95 bg-slate-900/40 border-slate-800'
                      : isSelected
                      ? 'opacity-100 scale-[1.03] bg-[#0c1f44] border-[#ea580c] ring-2 ring-[#ea580c]/60 shadow-[0_0_20px_rgba(234,88,12,0.35)] z-10'
                      : 'opacity-100 scale-100 bg-slate-900/80 border-slate-800 hover:border-orange-500/50 hover:bg-[#0c162d]'
                  }`}
                >
                  {/* Top row: Code + Severity Pill */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {shortCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isHighSeverity
                          ? 'bg-orange-950/80 text-[#ea580c] border border-orange-500/30'
                          : isMidSeverity
                          ? 'bg-amber-950/70 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-950/60 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {district.severityScore}
                    </span>
                  </div>

                  {/* District Name */}
                  <div className="mt-1">
                    <div className="text-xs font-bold text-white truncate">
                      {district.district}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {(district.peopleAffected / 1000).toFixed(0)}k affected
                    </div>
                  </div>

                  {/* Active Indicator Pulse if Selected */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ea580c] border-2 border-[#091124] shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected District Telemetry Inspector HUD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-500/40 text-[#ea580c] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-serif text-white">
                    {selectedDistrict.district} District
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedDistrict.state}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Primary Domain: <strong className="text-slate-200">{selectedDistrict.topCategory}</strong>
                </p>
              </div>
            </div>

            {/* Severity Index Meter */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Severity Index</span>
                <span className="text-base font-bold font-mono text-[#ea580c]">
                  {selectedDistrict.severityScore} / 100
                </span>
              </div>
              <div className="w-20 sm:w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#ea580c] rounded-full transition-all duration-300"
                  style={{ width: `${selectedDistrict.severityScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4 Key Real Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Users className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>People Impacted</span>
              </div>
              <div className="text-base font-bold font-mono text-white mt-1">
                {selectedDistrict.peopleAffected.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Logged Problems</span>
              </div>
              <div className="text-base font-bold font-mono text-white mt-1">
                {selectedDistrict.totalProblems}
                <span className="text-xs font-normal text-slate-400 ml-1">
                  ({selectedDistrict.criticalCount} crit)
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resolved / Deployed</span>
              </div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                {selectedDistrict.resolvedCount}
                <span className="text-xs font-normal text-slate-400 ml-1">solutions</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-[#0052a5]" />
                <span>Active Clusters</span>
              </div>
              <div className="text-base font-bold font-mono text-white mt-1">
                {selectedDistrict.activeClusters}
                <span className="text-xs font-normal text-slate-400 ml-1">regional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Link to Impact Page */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Full field data, village repair trackers, and university research prototypes are publicly audited.</span>
          </div>

          <button
            type="button"
            onClick={handleNavigateToImpact}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#ea580c] hover:text-[#fb923c] transition-colors cursor-pointer py-2 px-3 rounded-xl hover:bg-slate-800/60 shrink-0"
          >
            <span>See full district data</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

    </div>
  );
};
