import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Landmark,
  Building2,
  GraduationCap,
  Users,
  ShieldCheck,
  Award,
  ExternalLink,
  Mail,
  MapPin,
  FileCheck,
  HelpCircle,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Wind
} from 'lucide-react';
import { SamasyaSetuLogo } from '../common/SamasyaSetuLogo';

export const AboutPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-in fade-in duration-200 text-left">
      
      {/* 1. Header & Meaning of SamasyaSetu */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 p-2 flex items-center justify-center shrink-0">
            <SamasyaSetuLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#0052a5] uppercase tracking-wider">
              {t('about.badge', 'Jharkhand Public Innovation Initiative')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0f172a] tracking-tight">
              {t('about.title', 'About SamasyaSetu')}
            </h1>
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed">
          {t('about.lead', 'SamasyaSetu (Problem-to-Solution Bridge) is a state initiative designed to bridge the gap between grassroots citizens in Jharkhand and the real institutions that can fix their problems.')}
        </p>

        <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] text-xs sm:text-sm text-[#334155] leading-relaxed">
          {t('about.summaryBox', 'Instead of complaints disappearing into a paper file, SamasyaSetu gives every citizen a direct link to both Municipal repair teams (like MBMC and PWD) for routine fixes and premier college research labs (like BIT Mesra and IIT ISM Dhanbad) for tough technological challenges.')}
        </div>
      </div>

      {/* 2. THE BACKGROUND OF JHARKHAND & ITS DISTRICT PROBLEMS */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('about.contextBadge', 'Regional Context')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0f172a]">
            {t('about.contextTitle', "The Background: Challenges Across Jharkhand's 24 Districts")}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-3xl leading-relaxed">
            {t('about.contextSub', "Jharkhand is blessed with rich natural beauty, dense sal forests, fertile plateaus, and India's greatest mineral wealth. However, families and panchayats across its 24 districts face real, chronic challenges in their everyday lives:")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Challenge 1: Toxic Water */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0052a5] flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch1_title', 'Toxic Water Contamination')}
            </h3>
            <div className="text-[11px] font-mono text-[#0052a5] font-bold">
              {t('about.ch1_loc', 'Ranchi, Palamu, Dumka, Sahibganj')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch1_desc', 'Villages in Silli (Ranchi) and Palamu suffer from dangerous groundwater fluoride causing skeletal deformities. Hamlets along the Ganga in Sahibganj face arsenic poisoning from deep tubewells.')}
            </p>
          </div>

          {/* Challenge 2: Coal Dust & Air Quality */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch2_title', 'Coal Mining Dust & Smog')}
            </h3>
            <div className="text-[11px] font-mono text-amber-800 font-bold">
              {t('about.ch2_loc', 'Dhanbad, Bokaro, Ramgarh')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch2_desc', 'Open-cast coal mines and heavy coal hauling create massive clouds of silica and coal dust, leading to respiratory illnesses and asthma in schools and residential areas.')}
            </p>
          </div>

          {/* Challenge 3: Remote Tribal Healthcare */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch3_title', 'Vaccine Cold-Chain in Forests')}
            </h3>
            <div className="text-[11px] font-mono text-rose-800 font-bold">
              {t('about.ch3_loc', 'West Singhbhum (Saranda), Latehar, Gumla')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch3_desc', 'Primary healthcare centres inside deep forest belts suffer from multi-day power outages, causing essential snakebite anti-venom and infant vaccines to spoil.')}
            </p>
          </div>

          {/* Challenge 4: City Drainage & Pipe Leaks */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch4_title', 'Urban Drainage & Clean Water')}
            </h3>
            <div className="text-[11px] font-mono text-purple-800 font-bold">
              {t('about.ch4_loc', 'Ranchi (MBMC), Jamshedpur, Deoghar')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch4_desc', 'Urban wards struggle with choked stormwater drains (such as the Harmu basin in Ranchi) and burst ductile iron water pipes wasting thousands of liters of drinking water.')}
            </p>
          </div>

          {/* Challenge 5: Smallholder Crop Losses */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch5_title', 'Farmer Post-Harvest Losses')}
            </h3>
            <div className="text-[11px] font-mono text-emerald-800 font-bold">
              {t('about.ch5_loc', 'Bero Mandi (Ranchi), East Singhbhum, Khunti')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch5_desc', 'Tribal farmers and vegetable growers lose up to 40% of their harvest due to zero affordable local cooling or drying storage near village weekly haats.')}
            </p>
          </div>

          {/* Challenge 6: Road Subsidence & Culverts */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e2e8f0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {t('about.ch6_title', 'Rural Connectivity Cuts')}
            </h3>
            <div className="text-[11px] font-mono text-slate-800 font-bold">
              {t('about.ch6_loc', 'Giridih, Simdega, Godda, Garhwa')}
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.ch6_desc', 'Monsoon washouts and cracked culverts isolate entire panchayats from emergency ambulances, schools, and central district markets.')}
            </p>
          </div>
        </div>
      </div>

      {/* 3. THE PROBLEM STATEMENT */}
      <div className="p-6 sm:p-10 rounded-3xl bg-amber-50/50 border border-amber-300 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('about.disconnectBadge', 'The Core Problem Statement')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0f172a]">
            {t('about.disconnectTitle', 'Why Were These Problems Getting Stuck?')}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl">
            {t('howItWorks.subtitle', 'We connect neighborhood problems with university research labs, CSR funding, and government teams across Jharkhand.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800">1</span>
            <h3 className="text-sm font-bold text-[#0f172a]">{t('about.disc1_title', 'Dead-End Complaint Boxes')}</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.disc1_desc', 'Citizens filed complaints on generic government websites, but received only ticket numbers without named officers, direct contact info, or transparent progress tracking.')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800">2</span>
            <h3 className="text-sm font-bold text-[#0f172a]">{t('about.disc2_title', 'Colleges Working in Bubbles')}</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.disc2_desc', "Jharkhand's top engineering universities have world-class faculty and bright students, but student projects were often toy demos rather than solutions to real village water and air problems.")}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800">3</span>
            <h3 className="text-sm font-bold text-[#0f172a]">{t('about.disc3_title', 'Unfocused CSR Funding')}</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              {t('about.disc3_desc', 'Major industrial companies in Jharkhand allocate substantial CSR budgets, but struggled to find pre-vetted, high-impact grassroots innovations to sponsor.')}
            </p>
          </div>
        </div>
      </div>

      {/* 4. THE SAMASYASETU SOLUTION (DESCRIPTION) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('about.solutionBadge', 'The Innovation Bridge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0f172a]">
            {t('about.solutionTitle', 'The Solution: A Unified, Accountable Bridge')}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-3xl leading-relaxed">
            {t('howItWorks.subtitle', 'We send routine repairs to city teams and send hard scientific problems to college research labs.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('howItWorks.trackA_title', 'Track A: Routine Civic Work')}</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              {t('about.solutionTrackA', 'Broken pipes, clogged drains, bad culverts, and streetlights are routed directly to Municipal Corporations (MBMC) and the Public Works Department (PWD). The citizen is given the engineer name, phone number, and a target fix date.')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
              <CheckCircle2 className="w-4 h-4 text-[#0052a5]" />
              <span>{t('howItWorks.trackB_title', 'Track B: University Research & CSR')}</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              {t('about.solutionTrackB', 'Arsenic, fluoride, coal mine dust, and solar vaccine storage are routed to University Research Labs. Students build working hardware and chemical prototypes, sponsored by company CSR funds.')}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Institutional Partners */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0f172a]">
          {t('about.partnersTitle', 'Institutions Powering SamasyaSetu')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#0052a5] uppercase">
              Municipal Body
            </div>
            <div className="text-sm font-bold text-[#0f172a]">
              Ranchi Municipal Corp (MBMC)
            </div>
            <p className="text-[11px] text-[#64748b]">
              Urban drainage desilting, water distribution pipes, sanitation &amp; roads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#0052a5] uppercase">
              Premier University
            </div>
            <div className="text-sm font-bold text-[#0f172a]">
              BIT Mesra, Ranchi
            </div>
            <p className="text-[11px] text-[#64748b]">
              Water engineering labs, activated alumina filtration, rural technology.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#0052a5] uppercase">
              National Institute
            </div>
            <div className="text-sm font-bold text-[#0f172a]">
              IIT (ISM) Dhanbad
            </div>
            <p className="text-[11px] text-[#64748b]">
              Mine dust suppression, coal belt telemetry, industrial air quality.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#0052a5] uppercase">
              Technical Institute
            </div>
            <div className="text-sm font-bold text-[#0f172a]">
              NIT Jamshedpur
            </div>
            <p className="text-[11px] text-[#64748b]">
              Off-grid solar storage, healthcare vaccine coolers, mechanical design.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Official Contact & Verification */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#cbd5e1] flex items-center justify-center text-[#0052a5] shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-[#0f172a]">{t('about.helpdeskTitle', 'State Innovation Desk Help & Inquiries')}</div>
            <div className="text-[#64748b]">{t('about.helpdeskLoc', 'Project Secretariat · Ranchi, Jharkhand')}</div>
          </div>
        </div>

        <div className="text-right sm:text-right font-mono text-[#0052a5] font-bold">
          <div>Email: grievance-support@samasyasetu.jharkhand.gov.in</div>
          <div className="text-[#64748b] text-[11px]">{t('about.helpline', 'Toll-free Citizen Helpline: 1800-345-7890')}</div>
        </div>
      </div>

    </div>
  );
};
