import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, AuthUser, INSTITUTIONAL_ACCESS_KEYS, VALID_ACCESS_KEYS } from '../../types';
import { JHARKHAND_DISTRICTS_LIST } from '../../data/mockData';
import { SamasyaSetuLogo } from '../common/SamasyaSetuLogo';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Building2,
  Landmark,
  Users,
  AlertCircle,
  KeyRound,
  Copy,
  Check
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  intendedAction?: string | null;
  onAuthSuccess?: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  intendedAction = null,
  onAuthSuccess
}) => {
  const { t, login, signup, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [institutionalKey, setInstitutionalKey] = useState('');
  const [district, setDistrict] = useState('Ranchi');
  const [organization, setOrganization] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && intendedAction) {
      if (intendedAction.includes('citizen')) {
        setRole('citizen');
      } else if (intendedAction.includes('government')) {
        setRole('government');
        setInstitutionalKey(INSTITUTIONAL_ACCESS_KEYS.government);
      } else if (intendedAction.includes('university')) {
        setRole('university');
        setInstitutionalKey(INSTITUTIONAL_ACCESS_KEYS.university);
      } else if (intendedAction.includes('industry')) {
        setRole('industry');
        setInstitutionalKey(INSTITUTIONAL_ACCESS_KEYS.industry);
      }
    }
  }, [isOpen, intendedAction]);

  if (!isOpen) return null;

  // Preset demo accounts for quick 1-click test login
  const demoAccounts = [
    {
      role: 'citizen' as UserRole,
      title: 'Birendra Mahto',
      badge: 'Citizen / Mukhiya',
      email: 'birendra.silli@gmail.com',
      district: 'Ranchi',
      org: 'Silli Gram Panchayat',
      key: '',
      icon: Users,
      color: 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900'
    },
    {
      role: 'government' as UserRole,
      title: 'Siddharth Roy, IAS',
      badge: 'Govt / District DM',
      email: 'dc.ranchi@jharkhand.gov.in',
      district: 'Ranchi',
      org: 'District Administration & MBMC Oversight',
      key: INSTITUTIONAL_ACCESS_KEYS.government,
      icon: Landmark,
      color: 'border-blue-300 bg-blue-50/70 hover:bg-blue-100/70 text-[#0052a5]'
    },
    {
      role: 'university' as UserRole,
      title: 'Dr. Amitabh Sharma',
      badge: 'University Lab Lead',
      email: 'a.sharma@bitmesra.ac.in',
      district: 'Ranchi',
      org: 'BIT Mesra Innovation & Water Lab',
      key: INSTITUTIONAL_ACCESS_KEYS.university,
      icon: GraduationCap,
      color: 'border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-purple-900'
    },
    {
      role: 'industry' as UserRole,
      title: 'Meera Deshmukh',
      badge: 'Industry / CSR Head',
      email: 'm.deshmukh@tatatrusts.org',
      district: 'East Singhbhum',
      org: 'Tata Sustainability Council',
      key: INSTITUTIONAL_ACCESS_KEYS.industry,
      icon: Building2,
      color: 'border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900'
    }
  ];

  const handleCopyAndFillKey = (k: string, targetRole: UserRole) => {
    setRole(targetRole);
    setInstitutionalKey(k);
    setCopiedKey(k);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDemoLogin = (demo: typeof demoAccounts[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      const loggedUser: AuthUser = {
        id: `USR-${demo.role.toUpperCase()}-${Date.now().toString().slice(-4)}`,
        name: demo.title,
        email: demo.email,
        role: demo.role,
        district: demo.district,
        organization: demo.org,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`
      };
      login(loggedUser);
      setIsLoading(false);
      onClose();
      if (onAuthSuccess) {
        onAuthSuccess(loggedUser);
      }
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // Role-based Institutional Key Enforcement
    if (role !== 'citizen' && role !== 'public') {
      const validList = VALID_ACCESS_KEYS[role as keyof typeof VALID_ACCESS_KEYS] || [];
      const trimmedKey = institutionalKey.trim();

      if (!trimmedKey) {
        setErrorMessage(
          `An Institutional Security Key is required to log in as ${role.toUpperCase()}. Use key: ${INSTITUTIONAL_ACCESS_KEYS[role as keyof typeof INSTITUTIONAL_ACCESS_KEYS]}`
        );
        return;
      }

      if (!validList.includes(trimmedKey)) {
        setErrorMessage(
          `Invalid institutional key for ${role}. Official key is ${INSTITUTIONAL_ACCESS_KEYS[role as keyof typeof INSTITUTIONAL_ACCESS_KEYS]}`
        );
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        const fallbackName = email.split('@')[0].replace(/[._]/g, ' ');
        const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
        const loggedUser: AuthUser = {
          id: `USR-${role.toUpperCase()}-${Date.now().toString().slice(-4)}`,
          name: formattedName || 'Verified User',
          email,
          role: role || 'citizen',
          district: district || 'Ranchi',
          organization: organization || (role === 'citizen' ? `${district} Resident` : `${role.toUpperCase()} Authority`),
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`
        };
        login(loggedUser);
        setIsLoading(false);
        onClose();
        if (onAuthSuccess) onAuthSuccess(loggedUser);
      } else {
        const newUser: AuthUser = {
          id: `USR-${role.toUpperCase()}-${Date.now().toString().slice(-4)}`,
          name,
          email,
          phone,
          role,
          district,
          organization: organization || (role === 'citizen' ? `${district} Resident` : 'Institutional Partner'),
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`
        };
        signup(newUser);
        setIsLoading(false);
        onClose();
        if (onAuthSuccess) onAuthSuccess(newUser);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#e2e8f0] rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl my-8 max-h-[92vh] overflow-y-auto text-left">
        
        {/* Header with Circular Emblem */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#bfdbfe] bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-xs">
              <SamasyaSetuLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
                  SamasyaSetu Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Role-Isolated Auth</span>
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#0f172a] mt-0.5">
                {mode === 'login' ? t('auth.loginTitle', 'Role-Based Portal Access') : t('auth.signupTitle', 'Register New Account')}
              </h2>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice if auth required for problem reporting */}
        {intendedAction === 'report_problem' && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">{t('auth.loginRequired', 'Authentication Required')}:</strong> {t('auth.loginRequiredDesc', 'Please log in as a Citizen to submit a ground challenge. Your reports will be linked directly to your profile for tracking and municipal response.')}
            </div>
          </div>
        )}

        {/* Tab Toggle: Log In / Sign Up */}
        <div className="grid grid-cols-2 p-1 bg-[#f1f5f9] rounded-xl text-xs font-mono font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#0052a5] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            {t('nav.login', 'Log In')}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(''); }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#0052a5] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            {t('nav.register', 'Sign Up')}
          </button>
        </div>

        {/* Official Institutional Keys Directory Banner */}
        <div className="p-4 rounded-2xl bg-[#eff6ff]/70 border border-[#bfdbfe] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0052a5]">
            <span className="flex items-center gap-1.5 uppercase">
              <KeyRound className="w-3.5 h-3.5" />
              <span>{t('auth.keyLabel', 'Official Institutional Passkeys')}</span>
            </span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#bfdbfe]">
              {t('auth.clickToAutofill', 'Click to autofill')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            {/* Government Key */}
            <div
              onClick={() => handleCopyAndFillKey(INSTITUTIONAL_ACCESS_KEYS.government, 'government')}
              className="p-2.5 rounded-xl bg-white border border-[#bfdbfe] hover:border-[#0052a5] cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#0052a5] uppercase flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-[#0052a5]" />
                  <span>{t('role.government', 'Government')}</span>
                </span>
                <span className="text-[10px] text-[#64748b] group-hover:text-[#0052a5]">
                  {copiedKey === INSTITUTIONAL_ACCESS_KEYS.government ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </span>
              </div>
              <code className="block text-[11px] font-mono font-bold text-[#0f172a] truncate">
                {INSTITUTIONAL_ACCESS_KEYS.government}
              </code>
            </div>

            {/* University Key */}
            <div
              onClick={() => handleCopyAndFillKey(INSTITUTIONAL_ACCESS_KEYS.university, 'university')}
              className="p-2.5 rounded-xl bg-white border border-[#bfdbfe] hover:border-[#0052a5] cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-700 uppercase flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-purple-700" />
                  <span>{t('role.university', 'University')}</span>
                </span>
                <span className="text-[10px] text-[#64748b] group-hover:text-purple-700">
                  {copiedKey === INSTITUTIONAL_ACCESS_KEYS.university ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </span>
              </div>
              <code className="block text-[11px] font-mono font-bold text-[#0f172a] truncate">
                {INSTITUTIONAL_ACCESS_KEYS.university}
              </code>
            </div>

            {/* Industry Key */}
            <div
              onClick={() => handleCopyAndFillKey(INSTITUTIONAL_ACCESS_KEYS.industry, 'industry')}
              className="p-2.5 rounded-xl bg-white border border-[#bfdbfe] hover:border-[#0052a5] cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-amber-700" />
                  <span>{t('role.industry', 'Industry CSR')}</span>
                </span>
                <span className="text-[10px] text-[#64748b] group-hover:text-amber-700">
                  {copiedKey === INSTITUTIONAL_ACCESS_KEYS.industry ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </span>
              </div>
              <code className="block text-[11px] font-mono font-bold text-[#0f172a] truncate">
                {INSTITUTIONAL_ACCESS_KEYS.industry}
              </code>
            </div>
          </div>
          <div className="text-[10px] text-[#475569] italic pt-0.5">
            {t('auth.keyNote', '* Citizens require no key. Entering with an institutional key gives exclusive access only to that portal.')}
          </div>
        </div>

        {/* 1-Click Quick Demo Access Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
            <span>{t('auth.quickDemoHeader', 'Instant 1-Click Test Portals')}</span>
            <span className="text-[#0052a5]">{t('auth.preAuth', 'Pre-Authenticated')}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {demoAccounts.map(demo => {
              const IconComp = demo.icon;
              return (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => handleDemoLogin(demo)}
                  disabled={isLoading}
                  className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex flex-col justify-between ${demo.color}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-tight truncate">
                      {demo.badge}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-[#0f172a] truncate">
                    {demo.title}
                  </div>
                  <div className="text-[10px] text-[#64748b] truncate mt-0.5">
                    {demo.district}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#e2e8f0] w-full"></div>
          <span className="bg-white px-3 text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider absolute">
            {t('auth.orCredentials', 'Or log in with credentials')}
          </span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Standard Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Target Role Selector */}
          <div>
            <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
              {t('auth.roleLabel', 'Select Portal / Role *')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 ${
                  role === 'citizen'
                    ? 'bg-[#0052a5] text-white border-[#0052a5] shadow-xs'
                    : 'bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:bg-[#eff6ff]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t('role.citizen', 'Citizen')}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('government')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 ${
                  role === 'government'
                    ? 'bg-[#0052a5] text-white border-[#0052a5] shadow-xs'
                    : 'bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:bg-[#eff6ff]'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{t('role.government', 'Government')}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('university')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 ${
                  role === 'university'
                    ? 'bg-[#0052a5] text-white border-[#0052a5] shadow-xs'
                    : 'bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:bg-[#eff6ff]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t('role.university', 'University')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('industry');
                  if (!institutionalKey) setInstitutionalKey(INSTITUTIONAL_ACCESS_KEYS.industry);
                }}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 ${
                  role === 'industry'
                    ? 'bg-[#0052a5] text-white border-[#0052a5] shadow-xs'
                    : 'bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:bg-[#eff6ff]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t('role.industry', 'Industry')}</span>
              </button>
            </div>
          </div>

          {/* Conditional Institutional Key Input for Privileged Roles */}
          {role !== 'citizen' && role !== 'public' && (
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <label className="block font-mono uppercase text-amber-900 font-bold">
                  {role.toUpperCase()} {t('auth.keyLabel', 'Institutional Security Key')} *
                </label>
                <span className="text-[10px] font-mono font-bold text-[#0052a5] bg-white px-2 py-0.5 rounded border border-amber-200">
                  {t('auth.required', 'Required')}
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={institutionalKey}
                  onChange={e => setInstitutionalKey(e.target.value)}
                  placeholder={`Enter ${role} key`}
                  className="w-full bg-white border border-amber-400 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  required
                />
                <KeyRound className="w-4 h-4 text-amber-700 absolute left-3 top-2.5" />
              </div>
              <p className="text-[10px] text-amber-800">
                {t('auth.keyExplanation', 'Guarantees role isolation: anonymous users cannot enter privileged portals without this passkey.')}
              </p>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                {t('auth.fullNameLabel', 'Full Name')} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Oraon"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  required
                />
                <User className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
              {t('auth.emailLabel', 'Email Address')} *
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@organization.gov.in or gmail.com"
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                required
              />
              <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
              {t('auth.passwordLabel', 'Password')} *
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                required
              />
              <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('auth.districtLabel', 'District (Jharkhand)')} *
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  >
                    {JHARKHAND_DISTRICTS_LIST.filter(d => d !== 'All Districts').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                    {t('auth.phoneLabel', 'Phone Number')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                    />
                    <Phone className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#0f172a] font-bold mb-1">
                  {t('auth.orgLabel', 'Panchayat / Organization / Department (Optional)')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. Silli Panchayat, MBMC Water Directorate, BIT Mesra..."
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0052a5]"
                  />
                  <Building className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#0052a5] hover:bg-[#003f80] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{mode === 'login' ? t('auth.submitLogin', `Log In to Workspace`) : t('auth.submitSignup', 'Complete Registration')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="pt-2 border-t border-[#f1f5f9] text-center text-xs text-[#64748b]">
          {mode === 'login' ? (
            <span>
              {t('auth.noAccount', "Don't have an account yet?")}{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(''); }}
                className="text-[#0052a5] font-bold hover:underline cursor-pointer ml-1"
              >
                {t('nav.register', 'Sign Up')}
              </button>
            </span>
          ) : (
            <span>
              {t('auth.alreadyAccount', 'Already registered?')}{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className="text-[#0052a5] font-bold hover:underline cursor-pointer ml-1"
              >
                {t('nav.login', 'Log In')}
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
