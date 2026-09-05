import React from 'react';
import { useApp } from '../../context/AppContext';
import { SamasyaSetuLogo } from '../common/SamasyaSetuLogo';
import { ShieldCheck, GitBranch, ArrowUpRight, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setCurrentRole, setIsAdminPortalOpen } = useApp();

  return (
    <footer className="bg-white border-t border-[#e2e8f0] text-[#64748b] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#bfdbfe] bg-white flex items-center justify-center p-0.5 overflow-hidden shadow-xs">
                <SamasyaSetuLogo className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-bold font-mono tracking-widest text-[#0052a5]">
                SAMASYA SETU · JHARKHAND
              </span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed max-w-sm">
              {t('footer.brandDesc', 'Connecting community and panchayat challenges across all 24 districts of Jharkhand with Higher Education Institutions (HEIs), industry/CSR partners, and state departments under NEP 2020.')}
            </p>
            <div className="flex items-center gap-4 text-xs text-[#64748b] font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0052a5]" /> {t('landing.nepBadge', 'College R&D Projects')}
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-[#ea580c]" /> {t('landing.districtsBadge', '24 Districts Covered')}
              </span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f172a] mb-3">
              {t('footer.explorePortals', 'Explore Portals')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setCurrentRole('citizen')}
                  className="hover:text-[#0052a5] flex items-center gap-1 transition-colors cursor-pointer text-[#475569]"
                >
                  {t('nav.citizenPortal', 'Citizen Portal')} <ArrowUpRight className="w-3 h-3 text-[#94a3b8]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRole('university')}
                  className="hover:text-[#0052a5] flex items-center gap-1 transition-colors cursor-pointer text-[#475569]"
                >
                  {t('nav.univPortal', 'University Portal')} <ArrowUpRight className="w-3 h-3 text-[#94a3b8]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRole('industry')}
                  className="hover:text-[#0052a5] flex items-center gap-1 transition-colors cursor-pointer text-[#475569]"
                >
                  {t('nav.industryPortal', 'Industry Portal')} <ArrowUpRight className="w-3 h-3 text-[#94a3b8]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRole('government')}
                  className="hover:text-[#0052a5] flex items-center gap-1 transition-colors cursor-pointer text-[#475569]"
                >
                  {t('nav.govtPortal', 'Government Portal')} <ArrowUpRight className="w-3 h-3 text-[#94a3b8]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Solution Categories */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f172a] mb-3">
              {t('footer.thematicDomains', 'Thematic Domains')}
            </h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>{t('footer.domainWater', 'Water Resources & Fluoride Removal')}</li>
              <li>{t('footer.domainLivelihoods', 'Rural Livelihoods, Lac & NTFP Value-Add')}</li>
              <li>{t('footer.domainAgri', 'Agriculture & Micro-Lift Irrigation')}</li>
              <li>{t('footer.domainMining', 'Mining Clean Air & Environment')}</li>
              <li>{t('footer.domainHealth', 'Public Healthcare & Sickle Cell Testing')}</li>
              <li>{t('footer.domainEnergy', 'Clean Energy, Education & Governance')}</li>
            </ul>
          </div>

          {/* Architecture info */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f172a] mb-3">
              {t('footer.nepFramework', 'NEP 2020 Framework')}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="font-semibold text-[#0052a5] flex items-center gap-1.5 text-[11px] font-mono">
                  {t('footer.nepExperiential', 'Experiential HEI Research')}
                </div>
                <div className="text-[10px] text-[#64748b] mt-0.5">
                  {t('footer.nepDesc', 'Routes community challenges to BIT Mesra, IIT ISM, NIT, BAU, and state university labs')}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="font-semibold text-[#16a34a] flex items-center gap-1.5 text-[11px] font-mono">
                  {t('industry.csrSponsorship', 'Industry & CSR Scaling')}
                </div>
                <div className="text-[10px] text-[#64748b] mt-0.5">
                  Tata Steel CSR, CCL, BCCL, SAIL &amp; JSLPS
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b] font-mono">
          <div>
            © 2026 <span className="text-[#0052a5] font-semibold">SamasyaSetu Jharkhand</span> — {t('nav.portalSubtitle', 'Societal Innovation Portal')}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#ea580c] font-semibold">{t('landing.districtsBadge', '24 Districts Covered')}</span>
            <span>•</span>
            <span className="text-[#0052a5] font-semibold">50+ HEI Innovation Labs</span>
            <span>•</span>
            <button
              onClick={() => setIsAdminPortalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0f172a] text-slate-200 hover:bg-[#0052a5] hover:text-white transition-colors cursor-pointer border border-[#334155]"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

