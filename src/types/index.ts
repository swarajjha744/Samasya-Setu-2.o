export type UserRole = 'citizen' | 'university' | 'industry' | 'government' | 'public';

export const INSTITUTIONAL_ACCESS_KEYS = {
  government: 'GOV-MBMC-SEC-2026',
  university: 'UNIV-RND-AUTH-7712',
  industry: 'IND-CSR-KEY-4409'
};

export const VALID_ACCESS_KEYS: Record<Exclude<UserRole, 'citizen' | 'public'>, string[]> = {
  government: ['GOV-MBMC-SEC-2026', 'JH-GOV-ADMIN-2026', 'MBMC-OFFICIAL-2026', 'MBMC-SEC-2026'],
  university: ['UNIV-RND-AUTH-7712', 'BIT-MESRA-RND-2026', 'NIT-JSR-LAB-2026', 'UNIV-AUTH-2026'],
  industry: ['IND-CSR-KEY-4409', 'TATA-CSR-GRANTS-2026', 'SAIL-CSR-2026', 'IND-KEY-2026']
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  avatar?: string;
  organization?: string;
  phone?: string;
  designation?: string;
}

export type ProblemCategory =
  | 'Water & Sanitation'
  | 'Agriculture & Soil'
  | 'Rural Livelihoods & NTFP'
  | 'Public Healthcare'
  | 'Air Quality & Environment'
  | 'Clean Energy & Power'
  | 'Urban Mobility & Roads'
  | 'Waste Management'
  | 'Education & Skill'
  | 'Public Administration'
  | 'Accessibility & Assistive Tech'
  | 'Rural Infrastructure';

export type ProblemSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type ProjectStage = 'Research' | 'Prototype' | 'Pilot' | 'Deployed' | 'Impact_Verified';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department?: string;
  institution?: string;
}

export interface IndustryPartner {
  id: string;
  name: string;
  logo: string;
  type: 'Funding' | 'Technology' | 'Mentorship' | 'Pilot Site' | 'Deployment';
  contribution: string;
  committedAmount?: string;
}

export interface ProblemDNA {
  rootCause: string;
  technicalKeywords: string[];
  complexityScore: number; // 1-100
  estimatedFeasibility: string; // e.g. "High (8-12 weeks)", "Moderate (3-6 months)"
  estimatedBudget: string;
  suggestedApproaches: string[];
  patentPotential: boolean;
  sdgGoals: number[]; // e.g. [6, 9, 11]
}

export interface ImpactMetrics {
  metricName: string;
  beforeValue: string;
  afterValue: string;
  changePercentage: string;
  unit: string;
  citizensBenefitted: number;
  economicSavings?: string;
  co2ReductionTons?: number;
  verificationDate?: string;
}

export interface CitizenFeedback {
  id: string;
  citizenName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verifiedResident: boolean;
}

export interface MatchBreakdown {
  expertiseFit: number; // e.g. 96
  proximityScore: number; // e.g. 92
  trackRecord: number; // e.g. 98
  expertiseDetails?: string;
  proximityDetails?: string;
  trackRecordDetails?: string;
}

export interface TimelineStep {
  id: string;
  name: 'Submitted' | 'Validated' | 'Clustered' | 'Matched' | 'Team Formed' | 'Piloted' | 'Deployed';
  status: 'completed' | 'in_progress' | 'upcoming';
  date: string;
  details: string;
}

export interface DistrictStat {
  district: string;
  state: string;
  totalProblems: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  peopleAffected: number;
  resolvedCount: number;
  activeClusters: number;
  severityScore: number; // 0-100 index
  topCategory: ProblemCategory;
}

export interface CrossClusterPatternInsight {
  id: string;
  title: string;
  category: ProblemCategory;
  sharedRootCause: string;
  affectedDistricts: string[];
  clusterIds: string[];
  totalPeopleAffected: number;
  interDistrictSynergy: string;
  recommendedIntervention: string;
  potentialLeadInstitutions: string[];
}

export interface AssignedCivicBody {
  entityType: 'Municipal Corporation' | 'MBMC' | 'PWD' | 'Jal Board' | 'Health & Sanitation' | 'District Administration' | 'DWSD' | 'DISCOM' | 'PANCHAYAT_ENGINEERING';
  departmentName: string;
  officerInCharge: string;
  contactNumber: string;
  contactEmail: string;
  actionPlan: string;
  targetResolutionDate: string;
  assignedAt: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: ProblemCategory;
  district: string;
  state: string;
  locationDetails: string;
  coordinates?: { lat: number; lng: number };
  submittedBy: {
    name: string;
    phoneOrEmail: string;
    avatar?: string;
  };
  submittedDate: string;
  peopleAffected: number;
  severity: ProblemSeverity;
  status: ProjectStage | 'Submitted' | 'Under_Review' | 'Clustered' | 'Under_Govt_Triage' | 'Assigned_Civic' | 'Routed_University';
  triageStatus?: 'pending_govt_review' | 'self_assessed_civic' | 'routed_to_university';
  assignedCivicBody?: AssignedCivicBody;
  resolverContact?: {
    type: 'civic' | 'university';
    name: string;
    title: string;
    organization: string;
    phone: string;
    email: string;
    officeLocation?: string;
  };
  governmentAssessmentNote?: string;
  governmentAssessedBy?: string;
  governmentAssessedDate?: string;
  citizenQueries?: Array<{
    id: string;
    citizenName: string;
    citizenContact?: string;
    message: string;
    timestamp: string;
    status: 'sent' | 'replied';
    reply?: string;
    replyTimestamp?: string;
  }>;
  clusterId?: string;
  clusterName?: string;
  clusterCount?: number;
  images?: string[];
  problemDna?: ProblemDNA;
  assignedUniversity?: {
    name: string;
    department: string;
    leadFaculty: string;
    matchScore: number;
    matchBreakdown?: MatchBreakdown;
    matchRationale?: string;
    teamSize: number;
  };
  universityStatus?: 'Pending' | 'Accepted' | 'Declined' | 'Info_Requested';
  industryPartners?: IndustryPartner[];
  stageProgress: number; // 0 - 100
  tasks?: Task[];
  teamMembers?: TeamMember[];
  milestones?: {
    title: string;
    date: string;
    completed: boolean;
  }[];
  impact?: ImpactMetrics;
  feedback?: CitizenFeedback[];
  coSignCount?: number;
  userCoSigned?: boolean;
  timelineSteps?: TimelineStep[];
  replicatedClusterIds?: string[];
}

export interface Cluster {
  id: string;
  name: string;
  title?: string;
  category: ProblemCategory;
  district: string;
  districts?: string[];
  totalProblemsCount: number;
  problemCount?: number;
  totalPeopleAffected: number;
  primaryRootCause: string;
  summary?: string;
  aiSuggestedSolution: string;
  matchedUniversitiesCount: number;
  activeProjectsCount: number;
  urgencyLevel: 'Critical' | 'High' | 'Medium';
}

export interface FilterState {
  district: string;
  category: string;
  severity: string;
  stage: string;
  searchQuery: string;
}
