import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldAlert,
  Lock,
  Users,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Search,
  Download,
  LogOut,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Database,
  Eye,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  AdminAccount,
  getAdminAccountInfo,
  claimAdminSlot,
  loginAdmin,
  getActiveAdminSession,
  logoutAdmin
} from '../../lib/adminAuth';
import { Problem } from '../../types';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const { problems, clusters, showToast } = useApp();

  // Auth State
  const [adminSession, setAdminSession] = useState<AdminAccount | null>(null);
  const [isSlotClaimed, setIsSlotClaimed] = useState<boolean>(false);

  // Form states for Claiming/Login
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'bookings' | 'clusters'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProblemDetail, setSelectedProblemDetail] = useState<Problem | null>(null);

  // Check admin registration & session on mount
  useEffect(() => {
    async function checkAuth() {
      const session = getActiveAdminSession();
      const info = await getAdminAccountInfo();
      setIsSlotClaimed(info.isClaimed);
      setAdminSession(session);
    }
    checkAuth();
  }, []);

  // Handle Claiming Admin Slot (Single Allowed Account)
  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const res = await claimAdminSlot({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    setIsSubmitting(false);

    if (res.success && res.account) {
      setAdminSession(res.account);
      setIsSlotClaimed(true);
      showToast('Admin slot claimed successfully! Welcome, Master Admin.', 'success');
    } else {
      setFormError(res.error || 'Failed to claim admin slot.');
    }
  };

  // Handle Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.email || !formData.password) {
      setFormError('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await loginAdmin({
      email: formData.email,
      password: formData.password
    });
    setIsSubmitting(false);

    if (res.success && res.account) {
      setAdminSession(res.account);
      showToast(`Welcome back, ${res.account.name}!`, 'success');
    } else {
      setFormError(res.error || 'Invalid admin credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdminSession(null);
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Collect All Bookings / Industry Pledges / Lab Assignments across all problems
  const allBookingsAndPledges = useMemo(() => {
    const records: Array<{
      id: string;
      problemId: string;
      problemTitle: string;
      district: string;
      type: 'CSR_PLEDGE' | 'LAB_BOOKING' | 'PILOT_RESERVATION';
      stakeholderName: string;
      contactOrLead: string;
      amountOrTeam: string;
      date: string;
      status: string;
    }> = [];

    problems.forEach(p => {
      // 1. Industry CSR pledges
      if (p.industryPartners && p.industryPartners.length > 0) {
        p.industryPartners.forEach(partner => {
          records.push({
            id: partner.id,
            problemId: p.id,
            problemTitle: p.title,
            district: p.district,
            type: 'CSR_PLEDGE',
            stakeholderName: partner.name,
            contactOrLead: partner.contribution,
            amountOrTeam: partner.committedAmount || 'CSR Allocation',
            date: p.submittedDate,
            status: 'Committed'
          });
        });
      }

      // 2. University Lab bookings / assignments
      if (p.assignedUniversity) {
        records.push({
          id: `LAB-BK-${p.id}`,
          problemId: p.id,
          problemTitle: p.title,
          district: p.district,
          type: 'LAB_BOOKING',
          stakeholderName: `${p.assignedUniversity.name} (${p.assignedUniversity.department})`,
          contactOrLead: p.assignedUniversity.leadFaculty,
          amountOrTeam: `${p.assignedUniversity.teamSize} Student Researchers Assigned`,
          date: p.submittedDate,
          status: p.universityStatus || 'Accepted'
        });
      }

      // 3. Pilot Interventions
      if (p.status === 'Pilot' || p.status === 'Deployed' || p.status === 'Impact_Verified') {
        records.push({
          id: `PILOT-${p.id}`,
          problemId: p.id,
          problemTitle: p.title,
          district: p.district,
          type: 'PILOT_RESERVATION',
          stakeholderName: `${p.district} District Administration & Panchayat`,
          contactOrLead: 'Gram Panchayat & Field Division',
          amountOrTeam: `Field deployment covering ~${p.peopleAffected} citizens`,
          date: p.submittedDate,
          status: p.status === 'Impact_Verified' ? 'Verified Impact' : 'Active On-Site'
        });
      }
    });

    return records;
  }, [problems]);

  // Filtered Problems
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.submittedBy?.name && p.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSeverity = severityFilter === 'all' || p.severity === severityFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesCategory && matchesStatus;
    });
  }, [problems, searchQuery, severityFilter, categoryFilter, statusFilter]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'District', 'Severity', 'Status', 'People Affected', 'Submitted By', 'Date'];
    const rows = filteredProblems.map(p => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.district}"`,
      `"${p.severity}"`,
      `"${p.status}"`,
      p.peopleAffected,
      `"${p.submittedBy?.name || 'Citizen'}"`,
      `"${p.submittedDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [(headers || []).join(','), ...(rows || []).map(e => (Array.isArray(e) ? e.join(',') : String(e)))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `samasya_setu_problems_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported problems to CSV successfully!', 'success');
  };

  const totalCitizensAffected = problems.reduce((acc, p) => acc + (p.peopleAffected || 0), 0);

  // ----------------------------------------------------
  // VIEW: Auth Screen (Claim Slot or Login)
  // ----------------------------------------------------
  if (!adminSession) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-6 border-b border-[#1e293b] bg-[#0f172a]/80 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-[#0052a5]/20 border border-[#0052a5]/50 flex items-center justify-center text-[#38bdf8] mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white tracking-wide">
              SamasyaSetu Admin Portal
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {isSlotClaimed
                ? 'Authorized Administrator Authentication'
                : 'Initial Setup: Claim the Single Admin Slot'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Single Slot Badge / Notice */}
            {!isSlotClaimed ? (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">1-Time Admin Slot Open:</strong>
                  You are creating the primary administrator account. Once created, nobody else will be able to register.
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Single Admin Account Registered</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  LOCKED
                </span>
              </div>
            )}

            {formError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* CLAIM FORM (When no admin exists yet) */}
            {!isSlotClaimed ? (
              <form onSubmit={handleClaimSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Administrator Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Swaraj Jha"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@samyasetu.gov.in"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Master Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Confirm Master Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0052a5] hover:bg-[#004182] text-white font-mono font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Securing Slot...' : 'Claim & Create Admin Account'}</span>
                </button>
              </form>
            ) : (
              /* LOGIN FORM (When single admin is already claimed) */
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@samyasetu.gov.in"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Master Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-[#0f172a] border border-[#334155] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#0052a5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0052a5] hover:bg-[#004182] text-white font-mono font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In as Administrator'}</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 font-mono pt-2 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Single admin slot active. New signups are closed.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: Admin Master Dashboard (Logged In)
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070d1e] text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#0b1329] border-b border-[#1e293b] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0052a5] flex items-center justify-center text-white font-bold font-serif text-base shadow-md">
            SS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold font-serif text-white tracking-wide">
                SamasyaSetu Super Admin Console
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                MASTER SLOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Logged in as: <strong className="text-white">{adminSession.name}</strong> ({adminSession.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase: <strong>yepjhuuvdqfrbfjagciz</strong></span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-mono transition-colors"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="bg-[#0f172a] border-b border-[#1e293b] px-4 sm:px-8 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#1e293b]/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overview Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'problems'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#1e293b]/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>All Submitted Problems ({problems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#1e293b]/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Bookings, Pledges &amp; Pilots ({allBookingsAndPledges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('clusters')}
          className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'clusters'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#1e293b]/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Clustered Portfolios ({clusters.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Total Problems Reported
                  </div>
                  <div className="text-2xl font-bold font-serif text-white mt-1">
                    {problems.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    Live Supabase &amp; Portal submissions
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Total Bookings &amp; Pledges
                  </div>
                  <div className="text-2xl font-bold font-serif text-amber-400 mt-1">
                    {allBookingsAndPledges.length}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Labs, CSR Sponsors &amp; Pilots
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Problem Clusters
                  </div>
                  <div className="text-2xl font-bold font-serif text-emerald-400 mt-1">
                    {clusters.length}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Aggregated Solution Portfolios
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Citizens Impacted
                  </div>
                  <div className="text-2xl font-bold font-serif text-white mt-1">
                    {totalCitizensAffected.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-sky-400 font-mono mt-1">
                    Across Jharkhand pilot blocks
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] space-y-4">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                  <h3 className="text-sm font-bold font-serif text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    <span>Recent Problem Submissions</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('problems')}
                    className="text-xs font-mono text-[#38bdf8] hover:underline flex items-center gap-1"
                  >
                    <span>View all {problems.length}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {problems.slice(0, 5).map(prob => (
                    <div
                      key={prob.id}
                      onClick={() => setSelectedProblemDetail(prob)}
                      className="p-3.5 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-[#38bdf8] cursor-pointer transition-all flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-slate-400">{prob.id}</span>
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.2 rounded ${
                            prob.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                            prob.severity === 'High' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {prob.severity}
                          </span>
                          <span className="text-[10px] font-mono text-[#38bdf8]">{prob.category}</span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{prob.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {prob.district} • ~{prob.peopleAffected} affected • By {prob.submittedBy?.name || 'Citizen'}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] px-2.5 py-1 rounded bg-[#1e293b] text-slate-300 font-mono">
                          {prob.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] space-y-4">
                <h3 className="text-sm font-bold font-serif text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Admin Slot Security</span>
                </h3>

                <div className="p-4 rounded-lg bg-[#0f172a] border border-[#1e293b] space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Slot:</span>
                    <span className="text-emerald-400 font-bold">1/1 Active (Locked)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Super Admin:</span>
                    <span className="text-white truncate">{adminSession.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white truncate">{adminSession.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Role Authority:</span>
                    <span className="text-sky-400 font-bold">SUPER_ADMIN</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Signup Restriction:</strong> Public registration is permanently turned off. Only this account has clearance to view bookings and manage problem workflows.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROBLEMS TABLE */}
        {activeTab === 'problems' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search ID, title, citizen, district..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-[#0f172a] border border-[#334155] pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <select
                  value={severityFilter}
                  onChange={e => setSeverityFilter(e.target.value)}
                  className="rounded-lg bg-[#0f172a] border border-[#334155] px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="rounded-lg bg-[#0f172a] border border-[#334155] px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Water & Sanitation">Water &amp; Sanitation</option>
                  <option value="Agriculture & Soil">Agriculture &amp; Soil</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Urban Mobility & Roads">Urban Mobility &amp; Roads</option>
                  <option value="Clean Energy & Power">Clean Energy &amp; Power</option>
                  <option value="Public Healthcare">Public Healthcare</option>
                  <option value="Rural Infrastructure">Rural Infrastructure</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="rounded-lg bg-[#0f172a] border border-[#334155] px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Research">Research</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Pilot">Pilot</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Impact_Verified">Impact_Verified</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0052a5] hover:bg-[#004182] text-white text-xs font-mono font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-[#0b1329] border border-[#1e293b] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0f172a] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1e293b]">
                    <tr>
                      <th className="px-4 py-3">Problem ID</th>
                      <th className="px-4 py-3">Title &amp; Category</th>
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Affected</th>
                      <th className="px-4 py-3">Submitted By</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b] text-slate-300 font-sans">
                    {filteredProblems.map(prob => (
                      <tr key={prob.id} className="hover:bg-[#0f172a]/60 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-[#38bdf8]">
                          {prob.id}
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <div className="font-semibold text-white truncate">{prob.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{prob.category}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-300">
                          {prob.district}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            prob.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            prob.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {prob.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-300">
                          ~{prob.peopleAffected.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{prob.submittedBy?.name || 'Citizen'}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{prob.submittedDate}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded bg-[#0f172a] text-slate-300 border border-[#334155] font-mono text-[11px]">
                            {prob.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedProblemDetail(prob)}
                            className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#334155] text-slate-200 font-mono text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProblems.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500 font-mono text-xs">
                          No problems match the selected search or filter parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1e293b] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  All Ecosystem Bookings, Pledges &amp; Interventions
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Complete ledger of University Lab research bookings, Corporate CSR sponsorship commitments, and District field pilot testing reservations.
                </p>
              </div>
              <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                {allBookingsAndPledges.length} Total Bookings
              </div>
            </div>

            <div className="rounded-xl bg-[#0b1329] border border-[#1e293b] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0f172a] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1e293b]">
                    <tr>
                      <th className="px-4 py-3">Booking ID</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Stakeholder Entity</th>
                      <th className="px-4 py-3">Problem Target</th>
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">Commitment / Allocation</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b] text-slate-300">
                    {allBookingsAndPledges.map(item => (
                      <tr key={item.id} className="hover:bg-[#0f172a]/60 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-300">
                          {item.id}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.type === 'CSR_PLEDGE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            item.type === 'LAB_BOOKING' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">{item.stakeholderName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.contactOrLead}</div>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <div className="font-mono text-[11px] text-[#38bdf8]">{item.problemId}</div>
                          <div className="text-slate-300 truncate">{item.problemTitle}</div>
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {item.district}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-white">
                          {item.amountOrTeam}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded bg-[#0f172a] text-slate-300 border border-[#334155] font-mono text-[10px]">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {allBookingsAndPledges.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500 font-mono text-xs">
                          No bookings or pledges recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLUSTERS */}
        {activeTab === 'clusters' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1e293b]">
              <h3 className="text-sm font-bold font-serif text-white">
                Cross-District Problem Clusters
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                AI combines isolated village reports into multi-village solution portfolios that receive dedicated engineering teams and CSR backing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clusters.map(cluster => (
                <div key={cluster.id} className="p-5 rounded-xl bg-[#0b1329] border border-[#1e293b] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#38bdf8]">{cluster.id}</span>
                      <h4 className="text-base font-bold text-white font-serif">{cluster.name}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {cluster.urgencyLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono p-3 rounded-lg bg-[#0f172a] border border-[#1e293b]">
                    <div>
                      <div className="text-slate-500 text-[10px]">REPORTS</div>
                      <div className="text-white font-bold">{cluster.totalProblemsCount}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">AFFECTED</div>
                      <div className="text-white font-bold">{cluster.totalPeopleAffected.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">PROJECTS</div>
                      <div className="text-emerald-400 font-bold">{cluster.activeProjectsCount}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-400 font-mono">Suggested Solution:</strong> {cluster.aiSuggestedSolution}
                  </div>

                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>District: {cluster.district}</span>
                    <span className="text-[#38bdf8] font-bold">{cluster.matchedUniversitiesCount} Labs Matched</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      {selectedProblemDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-[#1e293b] bg-[#0f172a] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#38bdf8]">{selectedProblemDetail.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedProblemDetail.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif text-white mt-1">
                  {selectedProblemDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProblemDetail(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Description</h4>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#0f172a] p-3 rounded-lg border border-[#1e293b]">
                  {selectedProblemDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0f172a] border border-[#1e293b]">
                  <div className="text-slate-500 text-[10px]">DISTRICT</div>
                  <div className="text-white font-bold">{selectedProblemDetail.district}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0f172a] border border-[#1e293b]">
                  <div className="text-slate-500 text-[10px]">SEVERITY</div>
                  <div className="text-amber-400 font-bold">{selectedProblemDetail.severity}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0f172a] border border-[#1e293b]">
                  <div className="text-slate-500 text-[10px]">AFFECTED</div>
                  <div className="text-white font-bold">~{selectedProblemDetail.peopleAffected}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0f172a] border border-[#1e293b]">
                  <div className="text-slate-500 text-[10px]">SUBMITTED BY</div>
                  <div className="text-white font-bold truncate">{selectedProblemDetail.submittedBy?.name || 'Citizen'}</div>
                </div>
              </div>

              {selectedProblemDetail.problemDna && (
                <div className="p-4 rounded-xl bg-[#030712] border border-[#1f2937] text-xs font-mono space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px] pb-1 border-b border-slate-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI SYNTHESIZED PROBLEM DNA</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Root Cause:</span>{' '}
                    <span className="text-slate-200">{selectedProblemDetail.problemDna.rootCause}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Suggested Approaches:</span>
                    <ul className="list-disc list-inside text-slate-300 mt-1 pl-1">
                      {selectedProblemDetail.problemDna.suggestedApproaches.map((appr, idx) => (
                        <li key={idx}>{appr}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Est Budget: {selectedProblemDetail.problemDna.estimatedBudget}</span>
                    <span>Complexity: {selectedProblemDetail.problemDna.complexityScore}/100</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#1e293b] bg-[#0f172a] flex justify-end">
              <button
                onClick={() => setSelectedProblemDetail(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
