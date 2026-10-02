import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, GraduationCap, Users, Building2, Landmark, Camera, MapPin } from 'lucide-react';

interface RolePhotoCardProps {
  category?: string;
  district?: string;
  title?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

// Curated high-resolution imagery for each role domain
export const ROLE_PHOTOS = {
  citizen: {
    title: 'Citizen & Panchayat Field Report Photo',
    subtitle: 'Ground-truth community priority & verified village infrastructure evidence',
    badge: 'CITIZEN REPORT PHOTO EVIDENCE',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1000&auto=format&fit=crop&q=80',
    alt: 'Jharkhand rural community handpump water and sanitation problem photo',
    caption: 'Verified field photo submitted by Village Panchayat Mukhiya · Ground survey site',
    color: 'emerald'
  },
  university: {
    title: 'University R&D Engineering Lab Photo',
    subtitle: 'Advanced hardware fabrication & water chemistry research bench',
    badge: 'UNIVERSITY R&D LAB PHOTO',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80',
    alt: 'Academic engineering research laboratory bench with prototypes and testing equipment',
    caption: 'Birla Institute of Technology (BIT) Mesra Water Tech & Electronics Prototyping Facility',
    color: 'blue'
  },
  industry: {
    title: 'Industry & CSR Sustainability Deployment Photo',
    subtitle: 'Corporate CSR validation, green manufacturing & grant sponsorship',
    badge: 'INDUSTRY & CSR SPONSOR PHOTO',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    alt: 'Corporate CSR infrastructure and industrial sustainability hub',
    caption: 'Tata Steel Foundation CSR & Sustainable Industrial Development Hub',
    color: 'amber'
  },
  government: {
    title: 'District Administration & Oversight Photo',
    subtitle: 'State civic governance, smart administrative monitoring & inter-panchayat scaling',
    badge: 'DISTRICT GOVERNANCE PHOTO',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&auto=format&fit=crop&q=80',
    alt: 'Jharkhand State Administrative Secretariat & District Oversight Facility',
    caption: 'Jharkhand State Government Innovation & District Magistrate Coordination Centre',
    color: 'indigo'
  }
};

export const RolePhotoCard: React.FC<RolePhotoCardProps> = ({
  category,
  district,
  title,
  className = '',
  aspectRatio = 'video'
}) => {
  const { currentUser, currentRole, requireAuth } = useApp();

  // If user is not logged in, show lock prompt
  if (!currentUser) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border border-[#cbd5e1] bg-[#f8fafc] p-6 text-center flex flex-col items-center justify-center gap-3 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#0052a5] shadow-xs">
          <Lock className="w-6 h-6" />
        </div>
        <div className="max-w-md space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
            Authentication Required
          </div>
          <h4 className="text-sm font-bold font-serif text-[#0f172a]">
            Log in to view role-specific photographic evidence
          </h4>
          <p className="text-xs text-[#64748b]">
            Citizens view verified ground photos; University labs view research apparatus photos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => requireAuth('view_photos', () => {})}
          className="mt-1 px-4 py-2 bg-[#0052a5] hover:bg-[#003f80] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-xs cursor-pointer"
        >
          Sign In to Access Photos
        </button>
      </div>
    );
  }

  // Determine user's effective role for photo authorization
  const userRole = currentUser.role === 'public' ? currentRole : currentUser.role;
  const activeRoleKey = (userRole === 'public' ? 'citizen' : userRole) as keyof typeof ROLE_PHOTOS;
  const photoData = ROLE_PHOTOS[activeRoleKey] || ROLE_PHOTOS.citizen;

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-21/9'
      : 'aspect-video';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-[#cbd5e1] bg-slate-950 group shadow-md text-left ${className}`}
    >
      {/* Top Banner Tag */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/20 flex items-center gap-1.5 shadow-xs">
          <Camera className="w-3 h-3 text-amber-400" />
          <span>{photoData.badge}</span>
        </span>
        {district && (
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold border border-white/20 items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{district}</span>
          </span>
        )}
      </div>

      {/* Verified Role Access Tag */}
      <div className="absolute top-3 right-3 z-20">
        <span className="px-2.5 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase">{currentUser.role} Access Only</span>
        </span>
      </div>

      {/* Photographic View */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-slate-900`}>
        <img
          src={photoData.url}
          alt={photoData.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Bottom Caption & Identity */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-20 space-y-1">
          <div className="text-xs font-mono font-bold text-white tracking-tight flex items-center gap-2">
            <span>{title || photoData.title}</span>
            {category && (
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 px-1.5 py-0.5 rounded border border-amber-500/30">
                {category}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
            {photoData.caption}
          </p>
          <div className="text-[10px] font-mono text-slate-400 pt-0.5">
            Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.organization || currentUser.role})
          </div>
        </div>
      </div>
    </div>
  );
};
