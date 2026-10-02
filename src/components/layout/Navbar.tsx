import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SamasyaSetuLogo } from '../common/SamasyaSetuLogo';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  PlusCircle,
  Menu,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  KeyRound,
  MapPin,
  Languages
} from 'lucide-react';

interface NavbarProps {
  onOpenSubmitModal?: () => void;
  onRunPipeline?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmitModal
}) => {
  const {
    language,
    setLanguage,
    t,
    currentRole,
    setCurrentRole,
    currentUser,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthIntendedAction,
    requireAuth,
    publicTab,
    setPublicTab,
    toast,
    clearToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenLogin = () => {
    setAuthIntendedAction(null);
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleReportClick = () => {
    if (onOpenSubmitModal) {
      requireAuth('report_problem', onOpenSubmitModal);
    }
  };

  // The 4 requested public navigation items: Home, How It Works, Impact, About
  const publicNavItems: Array<{ id: 'home' | 'how-it-works' | 'impact' | 'about'; label: string }> = [
    { id: 'home', label: t('nav.home', 'Home') },
    { id: 'how-it-works', label: t('nav.howItWorks', 'How It Works') },
    { id: 'impact', label: t('nav.impact', 'Impact') },
    { id: 'about', label: t('nav.about', 'About') }
  ];

  const handleNavClick = (tabId: 'home' | 'how-it-works' | 'impact' | 'about') => {
    setPublicTab(tabId);
    setCurrentRole('public');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToPortal = () => {
    if (currentUser && currentUser.role && currentUser.role !== 'public') {
      setCurrentRole(currentUser.role);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get human-friendly label for current user's exclusive portal
  const getPortalLabel = () => {
    if (!currentUser) return t('nav.myPortal', 'My Portal');
    switch (currentUser.role) {
      case 'citizen':
        return t('nav.citizenPortal', 'Citizen Portal');
      case 'government':
        return t('nav.govtPortal', 'Government Portal');
      case 'university':
        return t('nav.univPortal', 'University Lab Portal');
      case 'industry':
        return t('nav.industryPortal', 'Industry CSR Portal');
      default:
        return t('nav.myPortal', 'My Portal');
    }
  };

  return (
    <>
      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4">
            
            {/* Left: Brand Lockup */}
            <div
              onClick={() => {
                setPublicTab('home');
                if (currentUser) {
                  setCurrentRole('public');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none"
              id="brand-logo"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#bfdbfe] bg-white flex items-center justify-center p-1 shadow-xs group-hover:border-[#0052a5] transition-colors overflow-hidden shrink-0">
                <SamasyaSetuLogo className="w-full h-full object-contain" />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0052a5] leading-tight font-serif">
                    SamasyaSetu
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200 text-[10px] font-mono font-bold text-amber-800">
                    JH
                  </span>
                </div>
                <span className="hidden md:block text-[11px] font-medium text-[#64748b] tracking-tight leading-none mt-0.5">
                  {t('nav.portalSubtitle', 'Societal Innovation Portal')}
                </span>
              </div>
            </div>

            {/* Center: NAVIGATION BAR: Home, (Role Portal if logged in), How It Works, Impact, About */}
            <nav className="hidden md:flex items-center gap-1 sm:gap-1.5">
              <button
                key="nav-home"
                id="nav-home-btn"
                onClick={() => handleNavClick('home')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  currentRole === 'public' && publicTab === 'home'
                    ? 'bg-[#eff6ff] text-[#0052a5] font-bold'
                    : 'text-[#475569] hover:text-[#0052a5] hover:bg-[#f8fafc]'
                }`}
              >
                {t('nav.home', 'Home')}
              </button>

              {/* If user is logged in (e.g. Government official), provide direct portal toggle button */}
              {currentUser && currentUser.role !== 'public' && (
                <button
                  id="nav-role-portal-btn"
                  onClick={handleReturnToPortal}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentRole === currentUser.role
                      ? 'bg-[#0052a5] text-white shadow-xs'
                      : 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{getPortalLabel()}</span>
                </button>
              )}

              <button
                key="nav-how-it-works"
                id="nav-how-it-works-btn"
                onClick={() => handleNavClick('how-it-works')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  currentRole === 'public' && publicTab === 'how-it-works'
                    ? 'bg-[#eff6ff] text-[#0052a5] font-bold'
                    : 'text-[#475569] hover:text-[#0052a5] hover:bg-[#f8fafc]'
                }`}
              >
                {t('nav.howItWorks', 'How It Works')}
              </button>

              <button
                key="nav-impact"
                id="nav-impact-btn"
                onClick={() => handleNavClick('impact')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  currentRole === 'public' && publicTab === 'impact'
                    ? 'bg-[#eff6ff] text-[#0052a5] font-bold'
                    : 'text-[#475569] hover:text-[#0052a5] hover:bg-[#f8fafc]'
                }`}
              >
                {t('nav.impact', 'Impact')}
              </button>

              <button
                key="nav-about"
                id="nav-about-btn"
                onClick={() => handleNavClick('about')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  currentRole === 'public' && publicTab === 'about'
                    ? 'bg-[#eff6ff] text-[#0052a5] font-bold'
                    : 'text-[#475569] hover:text-[#0052a5] hover:bg-[#f8fafc]'
                }`}
              >
                {t('nav.about', 'About')}
              </button>
            </nav>

            {/* Right: Actions & Login */}
            <div className="flex items-center gap-2 sm:gap-2.5">

              {/* Language Switcher Toggle: EN / हिंदी */}
              <button
                type="button"
                id="nav-language-toggle-btn"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-xl border border-[#cbd5e1] hover:border-[#0052a5] bg-white hover:bg-[#eff6ff] text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs text-[#0f172a]"
                title={language === 'en' ? 'हिंदी में बदलें (Switch to Hindi)' : 'Switch to English'}
                aria-label="Toggle language between English and Hindi"
              >
                <Languages className="w-3.5 h-3.5 text-[#0052a5] shrink-0" />
                <span className={language === 'en' ? 'text-[#0052a5]' : 'text-slate-400'}>EN</span>
                <span className="text-slate-300">/</span>
                <span className={language === 'hi' ? 'text-[#0052a5] font-bold' : 'text-slate-400'}>हिंदी</span>
              </button>
              
              {/* Report Problem (available for citizens / logged in) */}
              {onOpenSubmitModal && (
                <button
                  onClick={handleReportClick}
                  id="nav-report-problem-btn"
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t('nav.reportProblem', 'Report')}</span>
                </button>
              )}

              {/* If NOT Logged In: Exactly "Login" as requested */}
              {!currentUser ? (
                <button
                  type="button"
                  id="nav-login-btn"
                  onClick={handleOpenLogin}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{t('nav.login', 'Login')}</span>
                </button>
              ) : (
                /* If Logged In: Role-specific User Menu with strictly isolated portal access */
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    id="nav-user-profile-menu-btn"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-[#e2e8f0] hover:border-[#0052a5] bg-[#f8fafc] hover:bg-white transition-all cursor-pointer group shadow-xs"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0052a5] text-white flex items-center justify-center font-mono font-bold text-xs overflow-hidden shrink-0 border border-white shadow-xs relative">
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{currentUser.name.charAt(0).toUpperCase()}</span>
                      )}
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute bottom-0 right-0 border border-white"></span>
                    </div>

                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-bold text-[#0f172a] leading-tight truncate max-w-[110px]">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-[#0052a5] leading-none">
                        {currentUser.role}
                      </span>
                    </div>

                    <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#0052a5] transition-transform" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#e2e8f0] shadow-xl p-3 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                      
                      {/* User Info */}
                      <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0f172a] truncate">
                            {currentUser.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[9px] font-mono font-bold text-emerald-800 uppercase">
                            {currentUser.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#64748b] truncate">
                          {currentUser.email}
                        </div>
                        {currentUser.district && (
                          <div className="text-[10px] font-mono text-[#0052a5] pt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#0052a5]" />
                            <span>{currentUser.district}, Jharkhand</span>
                          </div>
                        )}
                      </div>

                      {/* Single Portal Action (Strictly Isolated - No other roles can be viewed) */}
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (currentUser.role !== 'public') {
                              setCurrentRole(currentUser.role);
                            }
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#0052a5] transition-colors text-left cursor-pointer"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#0052a5]" />
                          <span>Enter {getPortalLabel()}</span>
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div className="pt-2 border-t border-[#f1f5f9]">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t('nav.signOut', 'Sign Out')}</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                id="nav-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] border border-[#e2e8f0] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#0052a5]" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay for closing on touch/click outside */}
            <div
              className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-xs z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative z-40 md:hidden border-t border-[#e2e8f0] bg-white px-4 py-4 space-y-3 animate-in fade-in duration-150 text-left shadow-lg">
              
              {/* If logged in as Government or another role, show prominent portal switcher at top */}
              {currentUser && currentUser.role !== 'public' && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-900 uppercase">
                      {t('nav.activeAccount', 'Active Account')}: {currentUser.role}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-mono font-bold">
                      {currentRole === currentUser.role ? t('nav.inPortal', 'In Portal') : t('nav.browsingWebsite', 'Browsing Website')}
                    </span>
                  </div>
                  <button
                    onClick={handleReturnToPortal}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t('nav.goToPortal', 'Go to')} {getPortalLabel()}</span>
                  </button>
                </div>
              )}

              {/* Nav items */}
              <div className="space-y-1">
                {/* Mobile Language Toggle */}
                <button
                  type="button"
                  id="mobile-nav-language-toggle-btn"
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0052a5] bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#0052a5]" />
                    <span>{t('nav.languagePrompt', 'Language / भाषा:')}</span>
                  </div>
                  <span className="font-mono font-bold">
                    {language === 'en' ? 'English (Switch to हिंदी)' : 'हिंदी (Switch to EN)'}
                  </span>
                </button>

                {publicNavItems.map(item => {
                  const isActive = currentRole === 'public' && publicTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#eff6ff] text-[#0052a5] font-bold border border-[#bfdbfe]'
                          : 'text-[#475569] hover:bg-[#f8fafc]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0052a5]"></span>}
                    </button>
                  );
                })}
              </div>

              {/* User Session Footer */}
              {currentUser ? (
                <div className="pt-2 border-t border-[#f1f5f9] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#64748b] px-1">
                    <span>{t('landing.loggedInAs', 'Logged in as')} <strong>{currentUser.name}</strong></span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full py-2 px-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-mono font-bold text-center cursor-pointer"
                  >
                    {t('nav.signOut', 'Sign Out')}
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-[#f1f5f9]">
                  <button
                    onClick={handleOpenLogin}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-mono font-bold text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{t('nav.loginWithKey', 'Login with Role or Institutional Key')}</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </header>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-white border-emerald-500/40 text-[#0f172a] shadow-lg'
                : toast.type === 'warning'
                ? 'bg-white border-amber-500/40 text-[#0f172a] shadow-lg'
                : 'bg-white border-[#0052a5]/40 text-[#0f172a] shadow-lg'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-[#0052a5] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs leading-relaxed text-[#334155]">
              {toast.message}
            </div>
            <button
              onClick={clearToast}
              className="text-[#94a3b8] hover:text-[#0f172a] shrink-0 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
