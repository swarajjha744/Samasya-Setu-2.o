import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Problem,
  Cluster,
  UserRole,
  AuthUser,
  FilterState,
  Task,
  TaskStatus,
  ProjectStage,
  IndustryPartner,
  CitizenFeedback,
  ProblemCategory,
  ProblemSeverity
} from '../types';
import { INITIAL_PROBLEMS, INITIAL_CLUSTERS } from '../data/mockData';
import { supabase, saveProblemToSupabase, fetchProblemsFromSupabase } from '../lib/supabase';
import { Language, getTranslation } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  login: (userData: Partial<AuthUser> & { email: string; name?: string; role?: UserRole }) => void;
  signup: (userData: Partial<AuthUser> & { email: string; name: string; role: UserRole }) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  authIntendedAction: string | null;
  setAuthIntendedAction: (action: string | null) => void;
  requireAuth: (actionDescription: string, onSuccess: () => void) => void;

  publicTab: 'home' | 'how-it-works' | 'impact' | 'about';
  setPublicTab: (tab: 'home' | 'how-it-works' | 'impact' | 'about') => void;

  problems: Problem[];
  clusters: Cluster[];
  activeWorkspaceProblemId: string;
  setActiveWorkspaceProblemId: (id: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Actions
  submitNewProblem: (data: {
    title: string;
    description: string;
    category: ProblemCategory;
    district: string;
    state: string;
    locationDetails: string;
    peopleAffected: number;
    severity: ProblemSeverity;
    submittedByName: string;
    submittedByContact: string;
    images?: string[];
  }) => Problem;

  addProblem: (problem: Partial<Problem> & { title: string; description: string }) => Problem;

  selfAssessAndAssignCivic: (problemId: string, data: {
    entityType: 'Municipal Corporation' | 'MBMC' | 'PWD' | 'Jal Board' | 'Health & Sanitation' | 'District Administration';
    departmentName: string;
    officerInCharge: string;
    contactNumber: string;
    contactEmail: string;
    actionPlan: string;
    targetResolutionDate: string;
    notes?: string;
  }) => void;

  routeToUniversityRnD: (problemId: string, data: {
    universityName: string;
    department: string;
    leadFaculty: string;
    directives: string;
  }) => void;

  sendCitizenQuery: (problemId: string, query: {
    citizenName: string;
    citizenContact?: string;
    message: string;
  }) => void;
  
  acceptChallenge: (problemId: string) => void;
  declineChallenge: (problemId: string) => void;
  requestInfoChallenge: (problemId: string, note?: string) => void;
  updateTaskStatus: (problemId: string, taskId: string, newStatus: TaskStatus) => void;
  addTaskToProject: (problemId: string, task: Omit<Task, 'id'>) => void;
  advanceProjectStage: (problemId: string, targetStage: ProjectStage) => void;
  engageIndustryPartner: (problemId: string, partner: Omit<IndustryPartner, 'id'>) => void;
  submitCitizenFeedback: (problemId: string, feedback: { name: string; rating: number; comment: string }) => void;
  coSignProblem: (problemId: string) => void;
  replicateDeploymentToClusters: (problemId: string, targetClusterIds: string[]) => void;
  
  // Admin Portal Modal
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;

  // Notification banner
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  clearToast: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const defaultFilters: FilterState = {
  district: 'All Districts',
  category: 'All Categories',
  severity: 'All Severities',
  stage: 'All Stages',
  searchQuery: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('samasya_setu_language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('samasya_setu_language', language);
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    return getTranslation(key, language, fallback);
  };

  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('samasya_setu_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authIntendedAction, setAuthIntendedAction] = useState<string | null>(null);
  const [pendingAuthCallback, setPendingAuthCallback] = useState<(() => void) | null>(null);
  const [publicTab, setPublicTab] = useState<'home' | 'how-it-works' | 'impact' | 'about'>('home');

  const [problems, setProblems] = useState<Problem[]>(() => {
    const saved = localStorage.getItem('samasya_setu_problems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored problems', e);
      }
    }
    return INITIAL_PROBLEMS;
  });

  const [clusters, setClusters] = useState<Cluster[]>(() => {
    const saved = localStorage.getItem('samasya_setu_clusters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored clusters', e);
      }
    }
    return INITIAL_CLUSTERS;
  });

  const [activeWorkspaceProblemId, setActiveWorkspaceProblemId] = useState<string>('PR-2024-001');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  // Initial load from Supabase database
  useEffect(() => {
    async function loadSupabaseProblems() {
      try {
        const remoteProblems = await fetchProblemsFromSupabase();
        if (remoteProblems && remoteProblems.length > 0) {
          setProblems(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newFromRemote = remoteProblems.filter(rp => !existingIds.has(rp.id));
            if (newFromRemote.length > 0) {
              return [...newFromRemote, ...prev];
            }
            return prev;
          });
        }
      } catch (e) {
        console.warn('Supabase initial fetch ignored:', e);
      }
    }
    loadSupabaseProblems();

    // Supabase Realtime subscription for newly added problems
    try {
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'problems'
          },
          payload => {
            console.log('[Supabase Realtime] New problem inserted:', payload.new);
            const row: any = payload.new;
            if (row && row.id) {
              setProblems(prev => {
                if (prev.some(p => p.id === row.id)) return prev;
                const newProb: Problem = {
                  id: row.id,
                  title: row.title,
                  description: row.description,
                  category: row.category || 'Water & Sanitation',
                  district: row.district || 'Unspecified',
                  state: row.state || 'State Jurisdiction',
                  locationDetails: row.location_details || row.locationDetails || '',
                  submittedBy: {
                    name: row.submitted_by_name || row.submittedByName || 'Verified Citizen',
                    phoneOrEmail: row.submitted_by_contact || row.submittedByContact || '',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                  },
                  submittedDate: row.submitted_date || row.submittedDate || new Date().toISOString().split('T')[0],
                  peopleAffected: Number(row.people_affected || row.peopleAffected) || 500,
                  severity: row.severity || 'Medium',
                  status: row.status || 'Submitted',
                  stageProgress: 10,
                  clusterId: row.cluster_id || row.clusterId,
                  clusterName: row.cluster_name || row.clusterName,
                  images: row.images || [],
                  problemDna: row.problem_dna || row.problemDna,
                  tasks: [],
                  industryPartners: [],
                  feedback: []
                };
                return [newProb, ...prev];
              });
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime subscription not active:', err);
    }
  }, []);

  // Sync to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('samasya_setu_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('samasya_setu_clusters', JSON.stringify(clusters));
  }, [clusters]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('samasya_setu_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('samasya_setu_user');
    }
  }, [currentUser]);

  const login = (userData: Partial<AuthUser> & { email: string; name?: string; role?: UserRole }) => {
    const userRole = userData.role || 'citizen';
    const fallbackName = userData.name || userData.email.split('@')[0];
    const fullUser: AuthUser = {
      id: userData.id || `USR-${Date.now().toString().slice(-6)}`,
      name: fallbackName,
      email: userData.email,
      role: userRole,
      district: userData.district || 'Ranchi',
      organization: userData.organization || (userRole === 'citizen' ? 'Jharkhand Resident' : 'Partner Institution'),
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      phone: userData.phone
    };

    setCurrentUser(fullUser);
    if (fullUser.role && fullUser.role !== 'public') {
      setCurrentRole(fullUser.role);
    }
    showToast(`Welcome back, ${fullUser.name}! Signed in as ${fullUser.role.toUpperCase()}`, 'success');

    if (pendingAuthCallback) {
      const cb = pendingAuthCallback;
      setPendingAuthCallback(null);
      setAuthIntendedAction(null);
      setTimeout(() => cb(), 200);
    }
  };

  const signup = (userData: Partial<AuthUser> & { email: string; name: string; role: UserRole }) => {
    const fullUser: AuthUser = {
      id: userData.id || `USR-${Date.now().toString().slice(-6)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      district: userData.district || 'Ranchi',
      organization: userData.organization || (userData.role === 'citizen' ? `${userData.district || 'Ranchi'} Resident` : 'Institutional Partner'),
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      phone: userData.phone
    };

    setCurrentUser(fullUser);
    if (fullUser.role && fullUser.role !== 'public') {
      setCurrentRole(fullUser.role);
    }
    showToast(`Account created successfully! Welcome to SamasyaSetu, ${fullUser.name}`, 'success');

    if (pendingAuthCallback) {
      const cb = pendingAuthCallback;
      setPendingAuthCallback(null);
      setAuthIntendedAction(null);
      setTimeout(() => cb(), 200);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('public');
    showToast('You have been logged out securely.', 'info');
  };

  const requireAuth = (actionDescription: string, onSuccess: () => void) => {
    if (currentUser) {
      onSuccess();
    } else {
      setAuthIntendedAction(actionDescription);
      setPendingAuthCallback(() => onSuccess);
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      showToast('Please sign in or create an account to proceed.', 'info');
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const clearToast = () => setToast(null);

  const resetFilters = () => setFilters(defaultFilters);

  // AI-Assisted Problem DNA generator simulation
  const generateProblemDna = (
    title: string,
    description: string,
    category: ProblemCategory,
    severity: ProblemSeverity
  ) => {
    const categoryKeywords: Record<ProblemCategory, string[]> = {
      'Water & Sanitation': ['Biochar Nanocomposite', 'Adsorption Kinetics', 'IoT Turbidity Probes', 'Gravity Filtration'],
      'Agriculture & Soil': ['Phase Change Materials', 'Halotolerant Bio-inoculants', 'Soil EC Sensors', 'Precision Micro-irrigation'],
      'Rural Livelihoods & NTFP': ['Solar Micro-Dehydrators', 'Lac Value-Addition', 'Mahua Cold Storage', 'Tassar Silk reeling IoT'],
      'Education & Skill': ['Offline EdTech Kiosks', 'Interactive Vernacular Modules', 'Solar Lab Kits', 'Digital Literacy Hubs'],
      'Public Healthcare': ['Solar Direct-Drive Chiller', 'Phase-Change Insulated Holdover', 'Satellite LoRa Logger', 'Cold Chain Compliance'],
      'Waste Management': ['Pyrolysis Upcycling', 'Interlocking Paver Press', 'Decentralized Micro-Depot', 'Optical Sorting'],
      'Air Quality & Environment': ['Electrostatic Smog Precipitator', 'Bio-Filter Moss Wall', 'Particulate Laser Sensing', 'Fugitive Dust Suppression'],
      'Clean Energy & Power': ['Dynamic Shunt Active Filter', 'Solid State Inverter Controller', 'Thermal Adsorption Storage', 'Solar Microgrid'],
      'Urban Mobility & Roads': ['Waste Plastic Bitumen Matrix', 'Edge Computer Vision IRI', 'Self-Healing Bio-Concrete', 'Rapid Curing Grout'],
      'Rural Infrastructure': ['Prefabricated Modular Concrete', 'Bamboo Tensile Reinforcement', 'Rainwater Harvesting Swale', 'Off-Grid Lighting'],
      'Accessibility & Assistive Tech': ['Low-Cost All-Terrain Prosthetics', 'Tactile Navigation Systems', 'Audio Feedback Beacons', 'Ergonomic Grips'],
      'Public Administration': ['GIS Grievance Heatmaps', 'Smart Panchayat Ledger', 'Automated Scheme Verification', 'Citizen Feedback Telemetry']
    };

    const keywords = categoryKeywords[category] || ['Applied Engineering', 'IoT Sensing', 'Community Systems'];
    const complexityScore = severity === 'Critical' ? 88 : severity === 'High' ? 76 : 64;

    return {
      rootCause: `Systemic physical & infrastructural barrier identified in ${category}: ${description.slice(0, 110)}... aggravated by lack of low-cost field technology.`,
      technicalKeywords: keywords,
      complexityScore,
      estimatedFeasibility: severity === 'Critical' ? 'High Urgency (4-8 weeks pilot)' : 'Moderate (8-12 weeks)',
      estimatedBudget: severity === 'Critical' ? '₹4.5 - ₹6.0 Lakhs' : '₹2.5 - ₹4.0 Lakhs',
      suggestedApproaches: [
        `Rapid modular prototype utilizing ${keywords[0]} technology`,
        `Low-power ${keywords[1]} deployment with field feedback telemetry`,
        `Community-operated maintenance protocol with local technician training`
      ],
      patentPotential: severity === 'Critical' || complexityScore > 75,
      sdgGoals: category === 'Water & Sanitation' ? [6, 3, 11] : category === 'Agriculture & Soil' ? [2, 12, 13] : [9, 11, 13]
    };
  };

  // Find or create matching cluster
  const assignCluster = (district: string, category: ProblemCategory, problemTitle: string) => {
    const existingCluster = clusters.find(
      c => c.category === category || c.district.toLowerCase() === district.toLowerCase()
    );

    if (existingCluster) {
      // Update cluster count
      setClusters(prev =>
        prev.map(c =>
          c.id === existingCluster.id
            ? {
                ...c,
                totalProblemsCount: c.totalProblemsCount + 1,
                totalPeopleAffected: c.totalPeopleAffected + 2500
              }
            : c
        )
      );
      return {
        clusterId: existingCluster.id,
        clusterName: existingCluster.name,
        clusterCount: existingCluster.totalProblemsCount + 1
      };
    } else {
      const newClusterId = `CL-${Math.floor(800 + Math.random() * 100)}`;
      const newClusterName = `${district} ${category} Community Cluster`;
      const newCluster: Cluster = {
        id: newClusterId,
        name: newClusterName,
        category,
        district,
        totalProblemsCount: 1,
        totalPeopleAffected: 3000,
        primaryRootCause: `Recurring localized bottlenecks in ${category} reported by multiple wards in ${district}.`,
        aiSuggestedSolution: `Decentralized rapid-deployment intervention tailored for ${district} local conditions.`,
        matchedUniversitiesCount: 2,
        activeProjectsCount: 1,
        urgencyLevel: 'High'
      };
      setClusters(prev => [newCluster, ...prev]);
      return {
        clusterId: newClusterId,
        clusterName: newClusterName,
        clusterCount: 1
      };
    }
  };

  const submitNewProblem = (data: {
    title: string;
    description: string;
    category: ProblemCategory;
    district: string;
    state: string;
    locationDetails: string;
    peopleAffected: number;
    severity: ProblemSeverity;
    submittedByName: string;
    submittedByContact: string;
    images?: string[];
  }) => {
    const generatedDna = generateProblemDna(data.title, data.description, data.category, data.severity);
    const clusterInfo = assignCluster(data.district, data.category, data.title);

    const newId = `PR-2024-${String(problems.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newProblem: Problem = {
      id: newId,
      title: data.title,
      description: data.description,
      category: data.category,
      district: data.district,
      state: data.state || 'State Jurisdiction',
      locationDetails: data.locationDetails,
      submittedBy: {
        name: data.submittedByName || 'Verified Citizen',
        phoneOrEmail: data.submittedByContact || 'citizen@samasya.org',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
      },
      submittedDate: today,
      peopleAffected: Number(data.peopleAffected) || 1000,
      severity: data.severity,
      status: 'Under_Govt_Triage',
      triageStatus: 'pending_govt_review',
      stageProgress: 10,
      clusterId: clusterInfo.clusterId,
      clusterName: clusterInfo.clusterName,
      clusterCount: clusterInfo.clusterCount,
      images: data.images && data.images.length > 0 ? data.images : [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80'
      ],
      problemDna: generatedDna,
      industryPartners: [],
      tasks: [
        { id: `T-${newId}-1`, title: 'Synthesize AI Problem DNA and field feasibility check', assignee: 'State Triage Desk', status: 'done', priority: 'high', dueDate: today },
        { id: `T-${newId}-2`, title: 'Government self-assessment & routing determination', assignee: 'District Magistrate Office', status: 'in_progress', priority: 'high', dueDate: today }
      ],
      milestones: [
        { title: 'Citizen Grievance Logged & Verified', date: today, completed: true },
        { title: 'Government Administrative Triage', date: 'In Progress', completed: false }
      ],
      citizenQueries: []
    };

    setProblems(prev => [newProblem, ...prev]);
    
    // Save to Supabase backend table
    saveProblemToSupabase(newProblem).then(res => {
      if (res.success) {
        showToast(`Problem #${newId} submitted & forwarded to Government Triage Desk!`, 'success');
      } else {
        console.warn('Supabase save note:', res.error);
        showToast(`Problem #${newId} submitted & forwarded to Government Triage Desk!`, 'success');
      }
    }).catch(e => {
      console.error('Error saving to Supabase:', e);
      showToast(`Problem #${newId} submitted & forwarded to Government Triage Desk!`, 'success');
    });

    return newProblem;
  };

  const addProblem = (data: Partial<Problem> & { title: string; description: string }): Problem => {
    const today = new Date().toISOString().split('T')[0];
    const newId = data.id || `JH-PR-${Math.floor(1000 + Math.random() * 9000)}`;
    const category = data.category || 'Water & Sanitation';
    const district = data.district || 'Ranchi';
    const affectedNum = Number(data.peopleAffected) || 120;
    const severity: ProblemSeverity = data.severity || (affectedNum > 500 ? 'Critical' : affectedNum > 200 ? 'High' : 'Medium');

    const generatedDna = data.problemDna || generateProblemDna(
      data.title,
      data.description,
      category,
      severity
    );
    const clusterInfo = assignCluster(district, category, data.title);

    const newProblem: Problem = {
      id: newId,
      title: data.title,
      description: data.description,
      category,
      district,
      state: data.state || 'Jharkhand',
      locationDetails: data.locationDetails || `${district} Panchayat Ward`,
      submittedBy: data.submittedBy || {
        name: currentUser?.name || 'Verified Citizen',
        phoneOrEmail: currentUser?.email || 'citizen@samasya.org',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
      },
      submittedDate: data.submittedDate || today,
      peopleAffected: affectedNum,
      severity,
      status: (data.status as any) || 'Under_Govt_Triage',
      triageStatus: 'pending_govt_review',
      stageProgress: 10,
      clusterId: data.clusterId || clusterInfo.clusterId,
      clusterName: data.clusterName || clusterInfo.clusterName,
      clusterCount: clusterInfo.clusterCount,
      images: data.images && data.images.length > 0 ? data.images : [],
      problemDna: generatedDna,
      userCoSigned: true,
      coSignCount: data.coSignCount || 1,
      industryPartners: [],
      tasks: [
        { id: `T-${newId}-1`, title: 'Synthesize AI Problem DNA and field feasibility check', assignee: 'State Triage Desk', status: 'done', priority: 'high', dueDate: today },
        { id: `T-${newId}-2`, title: 'Government self-assessment & routing determination', assignee: 'District Magistrate Office', status: 'in_progress', priority: 'high', dueDate: today }
      ],
      milestones: [
        { title: 'Citizen Grievance Logged & Verified', date: today, completed: true },
        { title: 'Government Administrative Triage', date: 'In Progress', completed: false }
      ],
      citizenQueries: []
    };

    setProblems(prev => [newProblem, ...prev]);

    saveProblemToSupabase(newProblem).then(res => {
      if (res.success) {
        showToast(`Problem #${newId} submitted & recorded successfully!`, 'success');
      } else {
        showToast(`Problem #${newId} submitted & recorded locally!`, 'success');
      }
    }).catch(e => {
      console.error('Error saving to Supabase:', e);
      showToast(`Problem #${newId} submitted & recorded locally!`, 'success');
    });

    return newProblem;
  };

  const selfAssessAndAssignCivic = (problemId: string, data: {
    entityType: 'Municipal Corporation' | 'MBMC' | 'PWD' | 'Jal Board' | 'Health & Sanitation' | 'District Administration';
    departmentName: string;
    officerInCharge: string;
    contactNumber: string;
    contactEmail: string;
    actionPlan: string;
    targetResolutionDate: string;
    notes?: string;
  }) => {
    const today = new Date().toISOString().split('T')[0];
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const updatedCivic = {
            entityType: data.entityType,
            departmentName: data.departmentName,
            officerInCharge: data.officerInCharge,
            contactNumber: data.contactNumber,
            contactEmail: data.contactEmail,
            actionPlan: data.actionPlan,
            targetResolutionDate: data.targetResolutionDate,
            assignedAt: today
          };
          const updatedContact = {
            type: 'civic' as const,
            name: data.officerInCharge,
            title: `${data.entityType} Executive Officer`,
            organization: `${data.entityType} (${data.departmentName})`,
            phone: data.contactNumber,
            email: data.contactEmail,
            officeLocation: `${p.district} Civic Secretariat`
          };
          return {
            ...p,
            status: 'Assigned_Civic' as const,
            triageStatus: 'self_assessed_civic' as const,
            assignedCivicBody: updatedCivic,
            resolverContact: updatedContact,
            governmentAssessmentNote: data.notes || data.actionPlan,
            governmentAssessedBy: currentUser?.name || 'District Magistrate Office',
            governmentAssessedDate: today,
            stageProgress: 35,
            tasks: [
              ...(p.tasks || []),
              {
                id: `T-CIVIC-${Date.now()}`,
                title: `${data.entityType} Action: ${data.actionPlan.slice(0, 70)}...`,
                assignee: data.officerInCharge,
                status: 'in_progress',
                priority: 'urgent',
                dueDate: data.targetResolutionDate
              }
            ],
            milestones: [
              ...(p.milestones || []),
              {
                title: `Assigned to ${data.entityType} for Municipal Resolution`,
                date: today,
                completed: true
              }
            ]
          };
        }
        return p;
      })
    );
    showToast(`Self-assessed: Problem assigned to ${data.entityType} (${data.departmentName})! Citizen can now track municipal progress.`, 'success');
  };

  const routeToUniversityRnD = (problemId: string, data: {
    universityName: string;
    department: string;
    leadFaculty: string;
    directives: string;
  }) => {
    const today = new Date().toISOString().split('T')[0];
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const assignedUniv = {
            name: data.universityName,
            department: data.department,
            leadFaculty: data.leadFaculty,
            matchScore: 97,
            matchRationale: data.directives,
            teamSize: 6
          };
          const updatedContact = {
            type: 'university' as const,
            name: data.leadFaculty,
            title: 'Principal Investigator / Lab Head',
            organization: data.universityName,
            phone: '+91 651-2275444',
            email: 'rnd-desk@university.ac.in',
            officeLocation: `${data.universityName} Innovation Complex`
          };
          return {
            ...p,
            status: 'Research' as const,
            triageStatus: 'routed_to_university' as const,
            assignedUniversity: assignedUniv,
            resolverContact: updatedContact,
            universityStatus: 'Pending',
            governmentAssessmentNote: data.directives,
            governmentAssessedBy: currentUser?.name || 'State Higher & Technical Education Cell',
            governmentAssessedDate: today,
            stageProgress: 25,
            milestones: [
              ...(p.milestones || []),
              {
                title: `Routed to ${data.universityName} for Applied R&D Prototype`,
                date: today,
                completed: true
              }
            ]
          };
        }
        return p;
      })
    );
    showToast(`Routed to ${data.universityName}! Research scholars can now adopt this challenge in their portal.`, 'success');
  };

  const sendCitizenQuery = (problemId: string, query: {
    citizenName: string;
    citizenContact?: string;
    message: string;
  }) => {
    const queryObj = {
      id: `QRY-${Date.now()}`,
      citizenName: query.citizenName,
      citizenContact: query.citizenContact,
      message: query.message,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'sent' as const
    };
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            citizenQueries: [queryObj, ...(p.citizenQueries || [])]
          };
        }
        return p;
      })
    );
    showToast('Your message has been sent directly to the assigned solution provider!', 'success');
  };

  const acceptChallenge = (problemId: string) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            universityStatus: 'Accepted',
            status: p.status === 'Submitted' ? 'Research' : p.status,
            stageProgress: Math.max(p.stageProgress, 25),
            tasks: p.tasks && p.tasks.length > 0 ? p.tasks : [
              { id: `T-${problemId}-101`, title: 'Form initial project team & assign faculty co-investigator', assignee: 'Faculty Lead', status: 'done', priority: 'high', dueDate: '2026-08-28' },
              { id: `T-${problemId}-102`, title: 'Literature review & rapid CAD/schematic modeling', assignee: 'Student Lead', status: 'in_progress', priority: 'urgent', dueDate: '2026-09-10' },
              { id: `T-${problemId}-103`, title: 'Procure sensor and prototype bill of materials', assignee: 'Lab Manager', status: 'todo', priority: 'medium', dueDate: '2026-09-20' }
            ]
          };
        }
        return p;
      })
    );
    setActiveWorkspaceProblemId(problemId);
    showToast(`Challenge accepted! Project workspace initialized for ${problemId}`, 'success');
  };

  const declineChallenge = (problemId: string) => {
    setProblems(prev =>
      prev.map(p => (p.id === problemId ? { ...p, universityStatus: 'Declined' } : p))
    );
    showToast(`Challenge declined for ${problemId}. Re-routing to peer institution.`, 'info');
  };

  const requestInfoChallenge = (problemId: string, note?: string) => {
    setProblems(prev =>
      prev.map(p => (p.id === problemId ? { ...p, universityStatus: 'Info_Requested' } : p))
    );
    showToast(`Clarification query dispatched to Citizen / Ward Officer: "${note || 'Requesting field site GPS & water sample reports'}"`, 'info');
  };

  const updateTaskStatus = (problemId: string, taskId: string, newStatus: TaskStatus) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const updatedTasks = (p.tasks || []).map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
          );
          const completedCount = updatedTasks.filter(t => t.status === 'done').length;
          const progressCalc = updatedTasks.length > 0
            ? Math.round((completedCount / updatedTasks.length) * 100)
            : p.stageProgress;
          return {
            ...p,
            tasks: updatedTasks,
            stageProgress: Math.min(100, Math.max(15, progressCalc))
          };
        }
        return p;
      })
    );
  };

  const addTaskToProject = (problemId: string, task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `T-${Date.now()}`
    };
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            tasks: [...(p.tasks || []), newTask]
          };
        }
        return p;
      })
    );
    showToast(`New task added: "${task.title}"`, 'success');
  };

  const advanceProjectStage = (problemId: string, targetStage: ProjectStage) => {
    const stageProgressMap: Record<ProjectStage, number> = {
      Research: 25,
      Prototype: 50,
      Pilot: 75,
      Deployed: 95,
      Impact_Verified: 100
    };

    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            status: targetStage,
            stageProgress: stageProgressMap[targetStage] || p.stageProgress
          };
        }
        return p;
      })
    );
    showToast(`Project stage advanced to "${targetStage}"!`, 'success');
  };

  const engageIndustryPartner = (problemId: string, partner: Omit<IndustryPartner, 'id'>) => {
    const newPartner: IndustryPartner = {
      ...partner,
      id: `IND-${Date.now()}`
    };

    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const currentPartners = p.industryPartners || [];
          return {
            ...p,
            industryPartners: [newPartner, ...currentPartners],
            stageProgress: Math.min(100, p.stageProgress + 10)
          };
        }
        return p;
      })
    );
    showToast(`Industry commitment confirmed: ${partner.name} joined as ${partner.type} partner!`, 'success');
  };

  const submitCitizenFeedback = (
    problemId: string,
    feedback: { name: string; rating: number; comment: string }
  ) => {
    const newFeedback: CitizenFeedback = {
      id: `FB-${Date.now()}`,
      citizenName: feedback.name || 'Verified Resident',
      rating: feedback.rating,
      comment: feedback.comment,
      date: new Date().toISOString().split('T')[0],
      verifiedResident: true
    };

    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            feedback: [newFeedback, ...(p.feedback || [])]
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your feedback has been recorded and factored into the Impact Score.', 'success');
  };

  const coSignProblem = (problemId: string) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const alreadySigned = !!p.userCoSigned;
          const currentCount = p.coSignCount || 0;
          return {
            ...p,
            userCoSigned: !alreadySigned,
            coSignCount: alreadySigned ? Math.max(0, currentCount - 1) : currentCount + 1
          };
        }
        return p;
      })
    );

    const problem = problems.find(p => p.id === problemId);
    const isNowSigned = !problem?.userCoSigned;
    if (isNowSigned) {
      showToast(`Co-signed problem "${problem?.title.slice(0, 32)}..."! Your signature boosts this challenge's institutional urgency.`, 'success');
    } else {
      showToast('Co-signature removed.', 'info');
    }
  };

  const replicateDeploymentToClusters = (problemId: string, targetClusterIds: string[]) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const currentReplications = p.replicatedClusterIds || [];
          const combined = Array.from(new Set([...currentReplications, ...targetClusterIds]));
          return {
            ...p,
            replicatedClusterIds: combined
          };
        }
        return p;
      })
    );

    // Update target clusters status
    setClusters(prev =>
      prev.map(c => {
        if (targetClusterIds.includes(c.id)) {
          return {
            ...c,
            activeProjectsCount: c.activeProjectsCount + 1,
            urgencyLevel: 'Medium'
          };
        }
        return c;
      })
    );

    showToast(`Successfully dispatched replication to ${targetClusterIds.length} matching regional clusters!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRole,
        setCurrentRole,
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authIntendedAction,
        setAuthIntendedAction,
        requireAuth,
        publicTab,
        setPublicTab,
        problems,
        clusters,
        activeWorkspaceProblemId,
        setActiveWorkspaceProblemId,
        filters,
        setFilters,
        resetFilters,
        submitNewProblem,
        addProblem,
        selfAssessAndAssignCivic,
        routeToUniversityRnD,
        sendCitizenQuery,
        acceptChallenge,
        declineChallenge,
        requestInfoChallenge,
        updateTaskStatus,
        addTaskToProject,
        advanceProjectStage,
        engageIndustryPartner,
        submitCitizenFeedback,
        coSignProblem,
        replicateDeploymentToClusters,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        toast,
        clearToast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
