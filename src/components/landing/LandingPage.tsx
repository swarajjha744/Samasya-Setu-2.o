import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroVideoShowcase } from './HeroVideoShowcase';
import { InteractiveBridge } from './InteractiveBridge';
import { FlowDiagram } from './FlowDiagram';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap,
  Building2,
  Landmark,
  CheckCircle2,
  PlusCircle,
  Sparkles,
  MapPin
} from 'lucide-react';

interface LandingPageProps {
  onOpenSubmitModal: () => void;
  onSelectProblem: (problemId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenSubmitModal,
  onSelectProblem
}) => {
  const {
    t,
    currentUser,
    setCurrentRole,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthIntendedAction
  } = useApp();

  const handleRequestAccess = (role: 'citizen' | 'university' | 'industry' | 'government') => {
    if (currentUser) {
      if (currentUser.role === role) {
        setCurrentRole(role);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    setAuthIntendedAction(`access_${role}_portal`);
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const workspaceTiles = [
    {
      id: 'citizen',
      cardId: 'workspace-card-citizen',
      btnId: 'btn-login-citizen',
      title: t('landing.citizenTitle', 'Citizen'),
      role: 'citizen' as const,
      categoryTag: t('landing.citizenTag', 'COMMUNITY & PUBLIC'),
      description: t('landing.citizenDesc', 'Report local problems with photos. Track ground updates until work is finished.'),
      icon: Users,
      iconContainer: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
      tagStyle: 'bg-emerald-50/60 text-emerald-800 border-emerald-200/50',
      btnStyle: 'bg-[#059669] hover:bg-[#047857] text-white',
      borderHover: 'hover:border-emerald-300 hover:shadow-emerald-50/50'
    },
    {
      id: 'government',
      cardId: 'workspace-card-government',
      btnId: 'btn-login-government',
      title: t('landing.govtTitle', 'Government'),
      role: 'government' as const,
      categoryTag: t('landing.govtTag', 'STATE & ADMINISTRATION'),
      description: t('landing.govtDesc', 'Review issues, assign civic teams, and track resolution deadlines across departments.'),
      icon: Landmark,
      iconContainer: 'bg-blue-50 text-[#0052a5] border-blue-200/70',
      tagStyle: 'bg-blue-50/60 text-[#0052a5] border-blue-200/50',
      btnStyle: 'bg-[#0052a5] hover:bg-[#003f80] text-white',
      borderHover: 'hover:border-blue-300 hover:shadow-blue-50/50'
    },
    {
      id: 'university',
      cardId: 'workspace-card-university',
      btnId: 'btn-login-university',
      title: t('landing.univTitle', 'University'),
      role: 'university' as const,
      categoryTag: t('landing.univTag', 'COLLEGE & R&D LABS'),
      description: t('landing.univDesc', 'Build working models for tough problems and guide student research teams.'),
      icon: GraduationCap,
      iconContainer: 'bg-purple-50 text-purple-600 border-purple-200/70',
      tagStyle: 'bg-purple-50/60 text-purple-800 border-purple-200/50',
      btnStyle: 'bg-[#4f46e5] hover:bg-[#4338ca] text-white',
      borderHover: 'hover:border-purple-300 hover:shadow-purple-50/50'
    },
    {
      id: 'industry',
      cardId: 'workspace-card-industry',
      btnId: 'btn-login-industry',
      title: t('landing.industryTitle', 'Industry'),
      role: 'industry' as const,
      categoryTag: t('landing.industryTag', 'CSR & SPONSORS'),
      description: t('landing.industryDesc', 'Fund proven student solutions and deploy social welfare projects through CSR.'),
      icon: Building2,
      iconContainer: 'bg-amber-50 text-[#ea580c] border-amber-200/70',
      tagStyle: 'bg-amber-50/60 text-amber-800 border-amber-200/50',
      btnStyle: 'bg-[#ea580c] hover:bg-[#c2410c] text-white',
      borderHover: 'hover:border-amber-300 hover:shadow-amber-50/50'
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      {/* 1. PRIMARY HERO SECTION WITH TRANSITION VIDEO (Full Viewport Fold) */}
      <section className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-between pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
          {/* Left Column: Title, Value Prop, Action Buttons */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Credibility Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-semibold text-[#0052a5]">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
              <span>{t('landing.portalBadge', 'Jharkhand Civic Innovation Portal')}</span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0f172a] font-normal leading-[1.14] tracking-tight">
              {t('landing.heroTitlePre', 'Every local problem deserves a ')}
              <span className="italic font-serif text-[#0052a5]">{t('landing.heroTitleBridge', 'direct bridge')}</span>
              {t('landing.heroTitlePost', ' to a real solution.')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
              {t('landing.heroSubtitle', 'We connect neighborhood problems with university research labs, CSR funding, and government teams across Jharkhand.')}
            </p>

            {/* Quick Action Gateways */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                id="hero-report-challenge-btn"
                onClick={onOpenSubmitModal}
                className="px-6 py-3.5 bg-[#0052a5] hover:bg-[#003f80] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('landing.reportProblemBtn', 'Report a Ground Problem')}</span>
              </button>

              <button
                type="button"
                id="hero-explore-workspaces-btn"
                onClick={() => {
                  document.getElementById('workspace-login-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white hover:bg-[#eff6ff] border border-[#cbd5e1] hover:border-[#0052a5] text-[#0052a5] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('landing.selectWorkspaceBtn', 'Choose Your Portal')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748b]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('landing.districtsBadge', '24 Districts Covered')}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0052a5] shrink-0" />
                <span>{t('landing.aiTriageBadge', 'Smart Problem Sorting')}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>{t('landing.nepBadge', 'College R&D Projects')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Showcase */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroVideoShowcase
              onExplorePortals={() => {
                document.getElementById('workspace-login-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>

        {/* Subtle Scroll Cue at the bottom of the Hero fold */}
        <div className="pt-6 pb-2 flex flex-col items-center justify-center text-center">
          <button
            type="button"
            id="hero-scroll-cue-btn"
            onClick={() => {
              document.getElementById('workspace-login-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex flex-col items-center gap-1.5 text-[#64748b] hover:text-[#0052a5] transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold">
              {t('landing.scrollPrompt', 'Scroll down to log in to your portal')}
            </span>
            <div className="w-5 h-7 rounded-full border-2 border-[#cbd5e1] group-hover:border-[#0052a5] flex items-start justify-center p-1 transition-colors">
              <div className="w-1.5 h-1.5 bg-[#64748b] group-hover:bg-[#0052a5] rounded-full animate-bounce transition-colors" />
            </div>
          </button>
        </div>
      </section>

      {/* 2. LOGIN TO YOUR WORKSPACE SECTION (Revealed after scrolling) */}
      <section id="workspace-login-section" className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#e2e8f0]">
        <div className="text-center space-y-1.5 mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a] tracking-tight">
            {t('landing.workspaceHeading', 'Log in to your workspace')}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b]">
            {t('landing.workspaceSubtitle', 'Select your role to continue')}
          </p>

          {currentUser && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('landing.loggedInAs', 'Logged in as')} <strong>{currentUser.name}</strong> ({currentUser.role.toUpperCase()})</span>
              </span>
            </div>
          )}
        </div>

        {/* The 4 Workspace Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workspaceTiles.map(tile => {
            const Icon = tile.icon;
            const isUserActiveRole = currentUser?.role === tile.role;

            return (
              <div
                key={tile.id}
                id={tile.cardId}
                className={`rounded-2xl border bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left ${
                  isUserActiveRole
                    ? 'ring-2 ring-[#0052a5] border-[#0052a5] shadow-sm'
                    : `border-[#e2e8f0] ${tile.borderHover}`
                }`}
              >
                <div>
                  {/* Top Row: Icon Container + Category Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${tile.iconContainer}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border truncate max-w-[170px] ${tile.tagStyle}`}
                    >
                      {tile.categoryTag}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-[#0f172a] tracking-tight">
                        {tile.title}
                      </h3>
                      {isUserActiveRole && (
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed">
                      {tile.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6">
                  <button
                    type="button"
                    id={tile.btnId}
                    onClick={() => handleRequestAccess(tile.role)}
                    className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98] ${tile.btnStyle}`}
                  >
                    <span>
                      {isUserActiveRole
                        ? (tile.role === 'citizen' ? t('landing.citizenActiveAction', 'Open Citizen Portal') :
                           tile.role === 'government' ? t('landing.govtActiveAction', 'Open Government Portal') :
                           tile.role === 'university' ? t('landing.univActiveAction', 'Open University Portal') :
                           t('landing.industryActiveAction', 'Open Industry Portal'))
                        : (tile.role === 'citizen' ? t('landing.citizenAction', 'Log in as Citizen') :
                           tile.role === 'government' ? t('landing.govtAction', 'Log in as Government') :
                           tile.role === 'university' ? t('landing.univAction', 'Log in as University') :
                           t('landing.industryAction', 'Log in as Industry'))}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. THE INTERACTIVE SUSPENSION BRIDGE (समस्या -> समाधान) */}
      <InteractiveBridge
        onSelectRole={role => setCurrentRole(role as any)}
        onOpenSubmitModal={onOpenSubmitModal}
      />

      {/* 4. 8-STAGE COLLABORATIVE LIFECYCLE FLOW */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FlowDiagram />
      </section>

      {/* Hero Footnote Assurance */}
      <div className="py-4 border-t border-[#e2e8f0] bg-white text-center text-xs font-mono text-[#64748b] px-4">
        <span>SamasyaSetu Jharkhand · Role-Governed Access · Secure Public-Academic-CSR Collaborative Pipeline</span>
      </div>
    </div>
  );
};
