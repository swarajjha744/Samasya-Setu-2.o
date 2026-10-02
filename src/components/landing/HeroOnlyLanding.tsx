import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroVideoShowcase } from './HeroVideoShowcase';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Users,
  GraduationCap,
  Building2,
  Landmark,
  LogIn,
  UserPlus
} from 'lucide-react';

interface HeroOnlyLandingProps {
  onOpenSubmitModal?: () => void;
  onSelectProblem?: (problemId: string) => void;
}

export const HeroOnlyLanding: React.FC<HeroOnlyLandingProps> = () => {
  const {
    currentUser,
    setCurrentRole,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthIntendedAction
  } = useApp();

  const handleRequestAccess = (role: 'citizen' | 'university' | 'industry' | 'government') => {
    setAuthIntendedAction(`access_${role}_portal`);
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthIntendedAction('explore_information');
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthIntendedAction('explore_information');
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      {/* 1. PRIMARY HERO SECTION */}
      <section className="pt-8 sm:pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Title, Value Prop, Protected Action Gateways */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Credibility Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-semibold text-[#0052a5]">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
              <span>Jharkhand Societal Innovation Portal</span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0f172a] font-normal leading-[1.12] tracking-tight">
              Every challenge deserves a{' '}
              <span className="italic font-serif text-[#0052a5]">bridge</span> to
              innovation-driven solutions.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
              Connecting grassroots community challenges with university research labs, CSR funding, and government deployment across Jharkhand.
            </p>

            {/* ACTION GATE: LOGIN REQUIRED FOR MORE INFORMATION */}
            {!currentUser ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#bfdbfe] shadow-xs space-y-3 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0052a5] uppercase">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authentication Required for In-Depth Data</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    To protect community privacy and research intellectual property, please log in with your verified Citizen ID or University credentials to view projects and photo evidence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      id="hero-login-gate-btn"
                      onClick={handleOpenLogin}
                      className="px-5 py-3 bg-[#0052a5] hover:bg-[#003f80] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Log In to View Information</span>
                    </button>

                    <button
                      type="button"
                      id="hero-signup-gate-btn"
                      onClick={handleOpenSignup}
                      className="px-5 py-3 bg-white hover:bg-[#eff6ff] border border-[#cbd5e1] hover:border-[#0052a5] text-[#0052a5] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account</span>
                    </button>
                  </div>
                </div>

                {/* Direct Role Login Shortcuts */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-[#64748b] mb-2 uppercase tracking-wider">
                    Log in directly to your role portal:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
                    <button
                      type="button"
                      onClick={() => handleRequestAccess('citizen')}
                      className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[11px] font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>Citizen</span>
                      </div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">Ground Photo View</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRequestAccess('university')}
                      className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-[#0052a5] font-mono text-[11px] font-bold">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>University</span>
                      </div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">Lab Photo View</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRequestAccess('industry')}
                      className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-amber-700 font-mono text-[11px] font-bold">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Industry/CSR</span>
                      </div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">CSR Grants</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRequestAccess('government')}
                      className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-indigo-700 font-mono text-[11px] font-bold">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>Govt</span>
                      </div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">State Oversight</div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ALREADY LOGGED IN: DIRECT WORKSPACE ACCESS */
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>LOGGED IN AS {currentUser.role.toUpperCase()}</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-[#0f172a] mt-0.5">
                      Welcome, {currentUser.name}
                    </div>
                    <div className="text-xs text-emerald-700">
                      Role Photo Access: <strong className="capitalize">{currentUser.role} Photo Only</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentUser.role !== 'public') {
                        setCurrentRole(currentUser.role);
                      } else {
                        setCurrentRole('citizen');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Enter My {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Hero Video Showcase */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroVideoShowcase />
          </div>
        </div>
      </section>

      {/* Hero Footnote Assurance */}
      <div className="py-4 border-t border-[#e2e8f0] bg-white text-center text-xs font-mono text-[#64748b] px-4">
        <span>SamasyaSetu Jharkhand · Role-Governed Access · Secure Public-Academic-CSR Collaborative Pipeline</span>
      </div>
    </div>
  );
};
