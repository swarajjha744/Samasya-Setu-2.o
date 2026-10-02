import { Problem, Cluster, CrossClusterPatternInsight, DistrictStat } from '../types';

export const JHARKHAND_DISTRICTS_LIST = [
  'All Districts',
  'Ranchi',
  'Dhanbad',
  'East Singhbhum',
  'Bokaro',
  'Hazaribagh',
  'Deoghar',
  'Dumka',
  'Giridih',
  'Palamu',
  'Ramgarh',
  'West Singhbhum',
  'Saraikela Kharsawan',
  'Khunti',
  'Gumla',
  'Simdega',
  'Lohardaga',
  'Koderma',
  'Chatra',
  'Garhwa',
  'Latehar',
  'Godda',
  'Jamtara',
  'Sahibganj',
  'Pakur'
];

export const INITIAL_CLUSTERS: Cluster[] = [
  {
    id: 'CL-801',
    name: 'Chotanagpur Plateau High-Fluoride & Iron Groundwater Crisis',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    totalProblemsCount: 22,
    totalPeopleAffected: 78000,
    primaryRootCause: 'Geogenic granitic gneiss leaching causing elevated Fluoride (>2.8 mg/L) and dissolved Iron in unconfined plateau handpumps without affordable village-level de-fluoridation',
    aiSuggestedSolution: 'Activated alumina / biochar nano-composite multi-stage gravity filtration cartridges with zero electricity requirement and solar-backwash automated regeneration',
    matchedUniversitiesCount: 4,
    activeProjectsCount: 2,
    urgencyLevel: 'Critical'
  },
  {
    id: 'CL-802',
    name: 'Jharia & Dhanbad Coalfield Fugitive Dust & Particulate Pollution',
    category: 'Air Quality & Environment',
    district: 'Dhanbad',
    totalProblemsCount: 28,
    totalPeopleAffected: 165000,
    primaryRootCause: 'Unpaved haul roads, opencast overburden dumping, and spontaneous coal seam fires releasing dangerous PM10 (>350 µg/m³) and volatile hydrocarbons across dense settlements',
    aiSuggestedSolution: 'Bio-surfactant dust suppression misting towers coupled with real-time Edge-AI optical particulate monitoring networks and biochar green buffer barriers',
    matchedUniversitiesCount: 5,
    activeProjectsCount: 3,
    urgencyLevel: 'Critical'
  },
  {
    id: 'CL-803',
    name: 'Kolhan Tribal Non-Timber Forest Produce (NTFP) & Lac Solar Cold Storage Losses',
    category: 'Rural Livelihoods & NTFP',
    district: 'East Singhbhum',
    totalProblemsCount: 19,
    totalPeopleAffected: 52000,
    primaryRootCause: 'Lack of decentralized climate-controlled storage for raw Kushmi/Rangeeni lac, Mahua flowers, and Sal seeds causing 40% post-harvest spoilage and distressed distress selling',
    aiSuggestedSolution: 'Phase-change material (PCM) evaporative solar dome storage chambers and mechanized scraper-dryers operated by rural women Self-Help Groups (SHGs)',
    matchedUniversitiesCount: 3,
    activeProjectsCount: 2,
    urgencyLevel: 'High'
  },
  {
    id: 'CL-804',
    name: 'Damodar River Catchment Industrial Fly Ash & Effluent Remediation',
    category: 'Environment & Forestry' as any,
    district: 'Bokaro',
    totalProblemsCount: 16,
    totalPeopleAffected: 89000,
    primaryRootCause: 'Fly ash slurry pond overflow and industrial heavy-metal runoff leaching into irrigation canals during monsoon rain spikes across the industrial corridor',
    aiSuggestedSolution: 'Constructed floating phytoremediation wetlands using Vetiver & hyperaccumulating native plants combined with geopolymer paver block upcycling',
    matchedUniversitiesCount: 4,
    activeProjectsCount: 2,
    urgencyLevel: 'High'
  },
  {
    id: 'CL-805',
    name: 'Remote Forest PHC & Anganwadi Vaccine Cold Chain Failures',
    category: 'Public Healthcare',
    district: 'West Singhbhum',
    totalProblemsCount: 14,
    totalPeopleAffected: 44000,
    primaryRootCause: 'Frequent grid power outages exceeding 10 hours daily in Saranda & Kolhan forest belts degrading temperature-sensitive vaccine vials and anti-venom stocks',
    aiSuggestedSolution: 'Direct-drive solar thermoelectric ice-pack coolers with satellite/BLE remote temperature telemetry and automated alert triggers',
    matchedUniversitiesCount: 3,
    activeProjectsCount: 1,
    urgencyLevel: 'Critical'
  },
  {
    id: 'CL-806',
    name: 'Santhal Pargana Sloped Rainwater Runoff & Micro-Lift Irrigation',
    category: 'Agriculture & Soil',
    district: 'Dumka',
    totalProblemsCount: 21,
    totalPeopleAffected: 61000,
    primaryRootCause: 'Steep undulating plateau topography causing 80% monsoon precipitation runoff within 48 hours, leaving Kharif-Rabi transition farmlands water-stressed',
    aiSuggestedSolution: 'Low-head solar-powered micro-lift siphon irrigation network connected to tiered check-dam recharge trenches with smart IoT soil moisture gates',
    matchedUniversitiesCount: 4,
    activeProjectsCount: 2,
    urgencyLevel: 'High'
  },
  {
    id: 'CL-807',
    name: 'Palamu Drought Belt Millet Processing & Decentralized Solar Micro-Mills',
    category: 'Agriculture & Soil',
    district: 'Palamu',
    totalProblemsCount: 15,
    totalPeopleAffected: 48000,
    primaryRootCause: 'High drudgery and grain loss during traditional manual threshing and dehusking of drought-resilient finger millets (Marua) and pulses',
    aiSuggestedSolution: 'Ergonomic, low-power solar dehullers and automated grading units tailored for tribal smallholder farmer producer organizations (FPOs)',
    matchedUniversitiesCount: 3,
    activeProjectsCount: 1,
    urgencyLevel: 'Medium'
  }
];

export const INITIAL_PROBLEMS: Problem[] = [
  {
    id: 'PR-2024-000A',
    title: 'Overflowing Sewage Nullah & Blocked Storm Drain in Harmu Ward-26',
    description: 'Severe monsoon siltation, household debris, and plastic blockage have caused drain overflow across the main access road in Harmu Ward-26. Stagnant blackwater is entering ground-floor houses, causing acute stench, water-borne dermatitis, and dengue mosquito breeding.',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    state: 'Jharkhand',
    locationDetails: 'Harmu Housing Colony, Near Community Park, Ward 26, Ranchi, Jharkhand',
    coordinates: { lat: 23.3541, lng: 85.3121 },
    submittedBy: {
      name: 'Sunil Kumar Tirkey (Resident Forum)',
      phoneOrEmail: 'sunil.tirkey.harmu@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-08-30',
    peopleAffected: 3200,
    severity: 'High',
    status: 'Assigned_Civic',
    triageStatus: 'self_assessed_civic',
    stageProgress: 65,
    resolverContact: {
      type: 'civic',
      name: 'Er. Rajeshwar Soren',
      title: 'Executive Engineer (Drainage & Stormwater)',
      organization: 'Ranchi Municipal Corporation (RMC)',
      phone: '+91 94311 02844',
      email: 'drainage.rmc@jharkhand.gov.in',
      officeLocation: 'RMC Headquarters, Kutchery Road, Ranchi'
    },
    governmentAssessmentNote: 'Direct municipal dispatch: Silt suction jetting truck deployed; culvert replacement scheduled under Ward 26 monsoon relief budget.',
    governmentAssessedBy: 'Dr. Ananya Verma, IAS (Special Secretary, Urban Development & Housing Dept, GoJ)',
    governmentAssessedDate: '2026-08-31',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Inadequate secondary culvert diameter and lack of mechanized pre-monsoon desilting along the Harmu river sub-basin storm line.',
      technicalKeywords: ['Drainage Desilting', 'MBMC Ward Action', 'Culvert Reconstruction', 'Urban Waterlogging'],
      complexityScore: 42,
      estimatedFeasibility: 'High (Immediate municipal contractor machinery dispatch)',
      estimatedBudget: '₹2,40,000 for desilting and precast concrete slab cover',
      suggestedApproaches: [
        'Dispatch MBMC suction jetting machine and municipal cleaning crew',
        'Replace collapsed brick drainage culvert with reinforced precast concrete box drains'
      ],
      patentPotential: false,
      sdgGoals: [6, 11]
    },
    citizenQueries: [
      {
        id: 'QRY-001',
        citizenName: 'Sunil Kumar Tirkey',
        citizenContact: 'sunil.tirkey.harmu@gmail.com',
        message: 'Water logging is getting worse after yesterday night rain. Has the government team inspected the nullah yet?',
        timestamp: '30 Aug 2026, 11:30 AM',
        status: 'sent'
      }
    ]
  },
  {
    id: 'PR-2024-000B',
    title: 'High Arsenic Groundwater Contamination in Ganga Basin Tubewells',
    description: 'Multiple government school and public tubewells in Rajmahal and Udhwa blocks register arsenic concentrations up to 0.12 mg/L (permissible limit 0.01 mg/L). Several villagers report melanosis skin lesions. Requires specialized nano-adsorbent filtration or academic bio-remediation development.',
    category: 'Water & Sanitation',
    district: 'Sahibganj',
    state: 'Jharkhand',
    locationDetails: 'Udhwa Bird Sanctuary Fringe & Rajmahal Diara Villages, Sahibganj, Jharkhand',
    coordinates: { lat: 25.0482, lng: 87.8385 },
    submittedBy: {
      name: 'Anupama Murmu (Panchayat Samiti)',
      phoneOrEmail: 'anupama.murmu.udhwa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-08-29',
    peopleAffected: 6400,
    severity: 'Critical',
    status: 'Under_Govt_Triage',
    triageStatus: 'pending_govt_review',
    stageProgress: 10,
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Geogenic dissolution of Holocene alluvial arsenic-bearing pyrite minerals into reducing shallow aquifers.',
      technicalKeywords: ['Arsenic Mitigation', 'Iron-Oxide Nano-Adsorption', 'Safe Aquifer Tapping', 'Public Health'],
      complexityScore: 88,
      estimatedFeasibility: 'Moderate (Suitable for Academic R&D prototype validation)',
      estimatedBudget: '₹6,50,000 for institutional pilot',
      suggestedApproaches: [
        'Route to University Water Tech Lab for low-cost granular ferric hydroxide adsorption columns',
        'Deploy IoT automated spectrophotometric arsenic alert telemetry'
      ],
      patentPotential: true,
      sdgGoals: [3, 6, 9]
    }
  },
  {
    id: 'PR-2024-000C',
    title: 'Burst Feeder Water Pipe & Road Cavity near Kantatoli Flyover',
    description: 'Main 250mm ductile iron potable water feeder pipeline fractured underneath the road surface, causing thousands of liters of clean drinking water to gush out into traffic lanes while 850 families face complete tap water cutoff.',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    state: 'Jharkhand',
    locationDetails: 'Old Hazaribagh Road, Near Kantatoli Chowk Pillar 14, Ranchi, Jharkhand',
    coordinates: { lat: 23.3685, lng: 85.3421 },
    submittedBy: {
      name: 'Pramod Jha (Kantatoli Traders Welfare)',
      phoneOrEmail: 'pramod.kantatoli@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-08-26',
    peopleAffected: 4500,
    severity: 'High',
    status: 'Assigned_Civic',
    triageStatus: 'self_assessed_civic',
    stageProgress: 50,
    assignedCivicBody: {
      entityType: 'MBMC',
      departmentName: 'Municipal Water Works & Sewerage Directorate (Zone-2)',
      officerInCharge: 'Er. Rajesh Ranjan, Executive Engineer',
      contactNumber: '+91 651-2446102',
      contactEmail: 'ee.water@mbmc.jharkhand.gov.in',
      actionPlan: 'Pavement trench excavation, collar clamp replacement on 250mm DI line, hydrostatic pressure testing, and bitumen road restoration.',
      targetResolutionDate: '2026-09-08',
      assignedAt: '2026-08-27'
    },
    resolverContact: {
      type: 'civic',
      name: 'Er. Rajesh Ranjan',
      title: 'Executive Engineer (Water Supply & Public Works)',
      organization: 'Municipal Corporation (MBMC)',
      phone: '+91 651-2446102',
      email: 'ee.water@mbmc.jharkhand.gov.in',
      officeLocation: 'MBMC Civic Headquarters, Kutchery Road, Ranchi'
    },
    governmentAssessmentNote: 'Self-Assessed by Government: Classified as routine civic infrastructure failure suitable for immediate municipal resolution. Handed over to MBMC Water Directorate with strict 10-day turnaround deadline.',
    governmentAssessedBy: 'Ranchi District Magistrate Grievance Cell',
    governmentAssessedDate: '2026-08-27',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
    ],
    citizenQueries: [
      {
        id: 'QRY-101',
        citizenName: 'Pramod Jha',
        citizenContact: 'pramod.kantatoli@gmail.com',
        message: 'When will the trench excavation start? Traffic is backed up during peak morning hours.',
        timestamp: '28 Aug 2026, 09:15 AM',
        status: 'replied',
        reply: 'Work order issued to MBMC Rapid Response Team #4. Excavation commenced at 10 PM to avoid traffic disruption.',
        replyTimestamp: '28 Aug 2026, 02:30 PM'
      }
    ]
  },
  {
    id: 'PR-2024-001',
    title: 'High Fluoride & Dissolved Iron in Rural Tubewells across Plateau Panchayats',
    description: 'Over 14 community handpumps across Silli & Angara blocks discharge reddish, brackish water with high Fluoride (3.2 mg/L, exceeding permissible 1.0 mg/L limit) and dissolved Iron. Over 65 children and elderly residents have developed dental fluorosis, severe joint stiffness, and gastrointestinal illness.',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    state: 'Jharkhand',
    locationDetails: 'Banta Hajam Gram Panchayat, Silli Block, Ranchi, Jharkhand (Near Upgraded Middle School)',
    coordinates: { lat: 23.3642, lng: 85.3344 },
    submittedBy: {
      name: 'Birendra Kumar Mahto (Mukhiya)',
      phoneOrEmail: 'birendra.silli.panchayat@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-06-12',
    peopleAffected: 4200,
    severity: 'Critical',
    status: 'Deployed',
    stageProgress: 95,
    clusterId: 'CL-801',
    clusterName: 'Chotanagpur Plateau High-Fluoride & Iron Groundwater Crisis',
    clusterCount: 22,
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Geogenic hydrothermal dissolution of hornblende and fluorite minerals from Chotanagpur granitic gneiss basement into shallow weathered unconfined aquifers.',
      technicalKeywords: [
        'Fluorosis Remediation',
        'Activated Alumina Adsorption',
        'Iron Hydroxide Coagulation',
        'Gravity Nano-Filtration',
        'Plateau Hydro-Geology'
      ],
      complexityScore: 84,
      estimatedFeasibility: 'High (8-12 weeks for field-scale modular retrofit)',
      estimatedBudget: '₹4,80,000 per 10-handpump community cluster',
      suggestedApproaches: [
        'Multi-stage gravity cartridge combining activated alumina & biochar',
        'Solar-powered low-pressure backwash valve with periodic media regeneration',
        'Community IoT sensor telemetry for continuous fluoride & turbidity monitoring'
      ],
      patentPotential: true,
      sdgGoals: [6, 3, 9, 11]
    },
    assignedUniversity: {
      name: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
      department: 'Department of Civil & Environmental Engineering (Water Tech Lab)',
      leadFaculty: 'Dr. Anand Kumar Sinha & Prof. Smriti Soren',
      matchScore: 97,
      matchBreakdown: {
        expertiseFit: 98,
        proximityScore: 96,
        trackRecord: 97,
        expertiseDetails: 'Specialized lab in geogenic fluoride adsorption and indigenous low-cost ceramic-alumina matrices.',
        proximityDetails: 'Campus situated within 28 km of Silli block with established rural extension testbenches.',
        trackRecordDetails: 'Successfully engineered and validated 3 rural fluoride water purification systems across Khunti.'
      },
      matchRationale: 'BIT Mesra Water Technology Lab possesses cutting-edge spectrophotometry instrumentation and active field immersion in Ranchi rural blocks.',
      teamSize: 8
    },
    universityStatus: 'Accepted',
    industryPartners: [
      {
        id: 'IND-001',
        name: 'Tata Steel Foundation CSR',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
        type: 'Funding',
        contribution: 'Grant funding for 12 village filtration units, raw materials, and community water committee training.',
        committedAmount: '₹8,50,000'
      },
      {
        id: 'IND-002',
        name: 'Jharkhand Council on Science & Technology (JCSTI)',
        logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=100&auto=format&fit=crop&q=80',
        type: 'Deployment',
        contribution: 'Standard operating protocol validation and district-wide replication clearance.'
      }
    ],
    tasks: [
      {
        id: 'TSK-101',
        title: 'Complete water sample ICP-MS chemical profiling across 14 Silli handpumps',
        assignee: 'Anjali Kerketta (M.Tech Research Fellow)',
        status: 'done',
        priority: 'urgent',
        dueDate: '2026-06-20'
      },
      {
        id: 'TSK-102',
        title: 'Fabricate 400 L/hr modular activated alumina & biochar filtration canisters',
        assignee: 'Rohan Sharma (B.Tech Mech & Civil Team)',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-10'
      },
      {
        id: 'TSK-103',
        title: 'Install solar backwash valves and GSM real-time fluoride sensors',
        assignee: 'BIT Mesra IoT Student Cell',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-28'
      },
      {
        id: 'TSK-104',
        title: 'Handover maintenance checklist to Gram Panchayat Pani Samiti',
        assignee: 'Birendra Mahto (Panchayat Head) & Team',
        status: 'done',
        priority: 'medium',
        dueDate: '2026-08-15'
      }
    ],
    teamMembers: [
      {
        id: 'TM-01',
        name: 'Dr. Anand Kumar Sinha',
        role: 'Faculty Principal Investigator (Environmental Engg)',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        department: 'Civil & Environmental Engg',
        institution: 'BIT Mesra, Ranchi'
      },
      {
        id: 'TM-02',
        name: 'Anjali Kerketta',
        role: 'Lead Research Scholar (Water Chemistry)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        department: 'Environmental Science',
        institution: 'BIT Mesra, Ranchi'
      },
      {
        id: 'TM-03',
        name: 'Rohan Sharma',
        role: 'Student Hardware Prototype Lead',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
        department: 'Mechanical Engineering',
        institution: 'BIT Mesra, Ranchi'
      }
    ],
    milestones: [
      { title: 'Community Water Sample Baseline Profiling', date: '2026-06-25', completed: true },
      { title: 'Lab Pilot Adsorption Column Validation (<0.5 mg/L Fluoride)', date: '2026-07-12', completed: true },
      { title: '12 On-Ground Handpump Retrofits Deployed in Silli', date: '2026-08-01', completed: true },
      { title: '30-Day NABL Laboratory & Resident Impact Verification', date: '2026-08-20', completed: true }
    ],
    impact: {
      metricName: 'Treated Water Fluoride & Iron Concentration',
      beforeValue: '3.2 mg/L F⁻ / 2.8 mg/L Fe',
      afterValue: '0.45 mg/L F⁻ / 0.1 mg/L Fe',
      changePercentage: '-86% Contaminant Reduction',
      unit: 'mg/L',
      citizensBenefitted: 4200,
      economicSavings: '₹14.2 Lakhs saved in annual medical fluorosis treatments',
      verificationDate: '2026-08-22'
    },
    feedback: [
      {
        id: 'FB-001',
        citizenName: 'Birendra Kumar Mahto (Mukhiya, Banta Hajam)',
        rating: 5,
        comment: 'For the first time in 12 years, our village school handpumps give crystal-clear drinking water. The BIT Mesra team explained maintenance in simple Hindi and Sadri. Dental pain and yellow teeth in children has stopped.',
        date: '2026-08-23',
        verifiedResident: true
      },
      {
        id: 'FB-002',
        citizenName: 'Saraswati Devi (JSLPS SHG Leader)',
        rating: 5,
        comment: 'Our women group was trained to clean the alumina filters once every 3 months. Simple, robust and zero electricity needed!',
        date: '2026-08-24',
        verifiedResident: true
      }
    ],
    coSignCount: 142,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-06-12', details: 'Reported by Silli Gram Panchayat with photos of discolored water' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-06-14', details: 'AI matched geochemical root cause: Chotanagpur granitic fluoride leaching' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-06-15', details: 'Grouped with 21 similar complaints in Ranchi & Khunti into Cluster CL-801' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-06-17', details: 'Assigned to BIT Mesra Water Technology Lab (97% Match Score)' },
      { id: 'T5', name: 'Team Formed', status: 'completed', date: '2026-06-20', details: 'Multidisciplinary team of 8 students and 2 faculty mentors formed' },
      { id: 'T6', name: 'Piloted', status: 'completed', date: '2026-07-20', details: 'Laboratory testing and field pilot deployed at Banta Hajam Middle School' },
      { id: 'T7', name: 'Deployed', status: 'completed', date: '2026-08-05', details: 'Full deployment on 12 village handpumps with Tata Steel Foundation CSR backing' }
    ]
  },
  {
    id: 'PR-2024-002',
    title: 'Severe Coal Dust Particulate (PM10 > 380 µg/m³) & Open Seam Air Pollution',
    description: 'Continuous coal transport trucks and unpaved haul roads near Jharia and Katras settlements generate thick clouds of coal dust. PM2.5 and PM10 levels exceed safe national standards by 4.5x, causing chronic asthma, tuberculosis flare-ups, and respiratory distress in over 18,000 residents.',
    category: 'Air Quality & Environment',
    district: 'Dhanbad',
    state: 'Jharkhand',
    locationDetails: 'Katras-Jharia Coal Haul Corridor, Kenduadih Chowk, Dhanbad, Jharkhand',
    coordinates: { lat: 23.7428, lng: 86.4172 },
    submittedBy: {
      name: 'Sunil Sen (Citizen Environmental Forum)',
      phoneOrEmail: 'sunil.dhanbad.cleanair@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-06-18',
    peopleAffected: 18500,
    severity: 'Critical',
    status: 'Pilot',
    stageProgress: 75,
    clusterId: 'CL-802',
    clusterName: 'Jharia & Dhanbad Coalfield Fugitive Dust & Particulate Pollution',
    clusterCount: 28,
    images: [
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Fugitive particulate resuspension from unpaved heavy mineral haulage routes combined with spontaneous combustion of exposed coal seams in opencast pits.',
      technicalKeywords: [
        'Fugitive Coal Dust',
        'Bio-surfactant Misting',
        'Optical Dust Sensing',
        'Edge AI Telemetry',
        'Mining Environmental Tech'
      ],
      complexityScore: 89,
      estimatedFeasibility: 'Moderate (12-16 weeks for automated misting array deployment)',
      estimatedBudget: '₹12,50,000 for 1.5 km corridor dust mitigation',
      suggestedApproaches: [
        'Automated bio-surfactant atomization misting triggered by optical dust thresholds',
        'Solar-powered low-cost PM2.5/PM10 IoT monitoring grid with public visual display',
        'Dense native vegetative buffer belts using Bamboo and Neem along haul borders'
      ],
      patentPotential: true,
      sdgGoals: [3, 11, 13, 9]
    },
    assignedUniversity: {
      name: 'Indian Institute of Technology (ISM) Dhanbad',
      department: 'Department of Mining Engineering & Centre of Mining Environment',
      leadFaculty: 'Prof. Subhashis Ray & Dr. Priya Murmu',
      matchScore: 98,
      matchBreakdown: {
        expertiseFit: 99,
        proximityScore: 99,
        trackRecord: 96,
        expertiseDetails: 'Premier national laboratory for mine ventilation, airborne dust sampling, and particulate suppression systems.',
        proximityDetails: 'Located within 8 km of Jharia-Katras mining haulage zones.',
        trackRecordDetails: 'Authored CPCB national guidelines on opencast mining dust abatement and industrial air monitoring.'
      },
      matchRationale: 'IIT (ISM) Dhanbad is the premier national centre with deep mining environmental expertise and immediate proximity to the coal belt.',
      teamSize: 10
    },
    universityStatus: 'Accepted',
    industryPartners: [
      {
        id: 'IND-003',
        name: 'Bharat Coking Coal Limited (BCCL) CSR',
        logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&auto=format&fit=crop&q=80',
        type: 'Funding',
        contribution: 'Co-funding ₹15 Lakhs for misting nozzle fabrication, solar compressor arrays, and field test site access.',
        committedAmount: '₹15,00,000'
      }
    ],
    tasks: [
      {
        id: 'TSK-201',
        title: 'Calibrate optical particulate sensors against BAM-1020 reference analyzer',
        assignee: 'Vikram Hansda (PhD Scholar)',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-05'
      },
      {
        id: 'TSK-202',
        title: 'Test eco-friendly plant-based bio-surfactant misting droplet binding efficiency',
        assignee: 'IIT ISM Chem & Mining Lab Team',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-25'
      },
      {
        id: 'TSK-203',
        title: 'Install 6 automated solar misting towers along Kenduadih Chowk haul road',
        assignee: 'BCCL Field Engineering Team',
        status: 'in_progress',
        priority: 'urgent',
        dueDate: '2026-08-30'
      }
    ],
    milestones: [
      { title: 'Corridor Air Quality Baseline Mapping', date: '2026-07-10', completed: true },
      { title: 'Aerosol Misting Pilot Prototype Assembly in Lab', date: '2026-07-28', completed: true },
      { title: 'Field Pilot Installation at Kenduadih Chowk (60% PM Drop)', date: '2026-08-18', completed: true }
    ],
    impact: {
      metricName: 'Ambient PM10 Airborne Concentration on Haul Corridor',
      beforeValue: '385 µg/m³ PM10',
      afterValue: '112 µg/m³ PM10',
      changePercentage: '-71% Dust Suppression',
      unit: 'µg/m³',
      citizensBenefitted: 18500,
      economicSavings: '₹22.5 Lakhs in reduced respiratory hospitalizations',
      verificationDate: '2026-08-20'
    },
    coSignCount: 284,
    userCoSigned: true,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-06-18', details: 'Submitted by citizen forum with air pollution data and video evidence' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-06-20', details: 'AI recognized acute mining haulage dust etiology and priority' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-06-22', details: 'Aggregated with 27 mining belt complaints into Cluster CL-802' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-06-24', details: 'Matched with IIT (ISM) Dhanbad Centre of Mining Environment (98% Score)' },
      { id: 'T5', name: 'Team Formed', status: 'completed', date: '2026-06-28', details: 'Project team formed with faculty and student researchers' },
      { id: 'T6', name: 'Piloted', status: 'in_progress', date: '2026-08-15', details: 'Autonomous misting array undergoing live field pilot trials' }
    ]
  },
  {
    id: 'PR-2024-003',
    title: 'Smallholder Tribal Lac & Mahua Crop Storage Spoilage (40% Post-Harvest Loss)',
    description: 'Tribal farmers in Ghatshila and Bahragora collect raw Kusmi/Rangeeni lac and Mahua forest produce during peak summer. Due to high humidity and lack of decentralized drying and cold-room facilities, 35-40% of the produce develops fungal mold within 3 weeks, forcing distress sales at ₹110/kg instead of fair value ₹450/kg.',
    category: 'Rural Livelihoods & NTFP',
    district: 'East Singhbhum',
    state: 'Jharkhand',
    locationDetails: 'Ghatshila Sub-Division, Dhalbhumgarh & Bahragora Panchayat Blocks, East Singhbhum, Jharkhand',
    coordinates: { lat: 22.5855, lng: 86.4815 },
    submittedBy: {
      name: 'Sukram Munda (Van Dhan Vikas Kendra Coordinator)',
      phoneOrEmail: 'sukram.munda.vandhan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-06-25',
    peopleAffected: 6200,
    severity: 'High',
    status: 'Prototype',
    stageProgress: 60,
    clusterId: 'CL-803',
    clusterName: 'Kolhan Tribal Non-Timber Forest Produce (NTFP) & Lac Solar Cold Storage Losses',
    clusterCount: 19,
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Moisture retention (>18% water content) triggering Aspergillus mold sporulation on scraped sticklac and fermented Mahua during pre-monsoon storage.',
      technicalKeywords: [
        'NTFP Preservation',
        'Solar Convective Dehydrator',
        'Phase Change Material Cooling',
        'Tribal Value Addition',
        'SHG Micro-Enterprise'
      ],
      complexityScore: 72,
      estimatedFeasibility: 'High (6-8 weeks for community solar unit rollout)',
      estimatedBudget: '₹3,20,000 per Van Dhan storage hub',
      suggestedApproaches: [
        'Solar tunnel dryer with forced air convection to reduce moisture to <6%',
        'PCM-insulated cool chamber maintaining 18-20°C with zero grid electricity',
        'Mechanized pedal/solar sticklac scraper-cum-grader for women SHGs'
      ],
      patentPotential: true,
      sdgGoals: [1, 8, 9, 12]
    },
    assignedUniversity: {
      name: 'National Institute of Technology (NIT) Jamshedpur & Birsa Agricultural University',
      department: 'Department of Mechanical Engineering (Renewable Energy Hub) & BAU Forestry',
      leadFaculty: 'Dr. Sanjay Sen & Dr. Ramesh Soren (BAU)',
      matchScore: 95,
      matchBreakdown: {
        expertiseFit: 96,
        proximityScore: 97,
        trackRecord: 92,
        expertiseDetails: 'Extensive research in decentralized solar thermal processing, agricultural drying, and tribal mechanization.',
        proximityDetails: 'NIT Jamshedpur is located 42 km from Ghatshila tribal belts with field extension wings.',
        trackRecordDetails: 'Developed 4 low-cost processing machines for JSLPS Palash Brand SHG collectives.'
      },
      matchRationale: 'Joint technical partnership between NIT Jamshedpur mechanical engineers and BAU Forestry researchers gives complete domain depth.',
      teamSize: 7
    },
    universityStatus: 'Accepted',
    industryPartners: [
      {
        id: 'IND-004',
        name: 'Tata Steel CSR & JSLPS Palash Brand',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
        type: 'Mentorship',
        contribution: 'Connecting prototypes to 8 Van Dhan Kendras with assured buy-back marketing linkages.',
        committedAmount: '₹6,00,000'
      }
    ],
    tasks: [
      {
        id: 'TSK-301',
        title: 'Design high-efficiency solar thermal collector with biomass auxiliary backup',
        assignee: 'NIT Jamshedpur Solar Lab Team',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-15'
      },
      {
        id: 'TSK-302',
        title: 'Build 500 kg capacity modular solar dryer prototype in NIT workshop',
        assignee: 'Student Fabrication Cell',
        status: 'in_progress',
        priority: 'urgent',
        dueDate: '2026-08-28'
      }
    ],
    milestones: [
      { title: 'Lac & Mahua Spoilage Thermodynamic Analysis', date: '2026-07-10', completed: true },
      { title: 'Lab Scale Convective Dryer Fabrication', date: '2026-08-05', completed: true },
      { title: 'Van Dhan Kendra Field Pilot in Ghatshila', date: '2026-09-10', completed: false }
    ],
    coSignCount: 189,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-06-25', details: 'Submitted by Van Dhan Vikas Kendra coordinator with loss estimates' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-06-27', details: 'Categorized under Rural Livelihoods & NTFP innovation domain' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-06-28', details: 'Joined with 18 forest village submissions in Cluster CL-803' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-06-30', details: 'Assigned to NIT Jamshedpur & Birsa Agricultural University (95% Score)' },
      { id: 'T5', name: 'Team Formed', status: 'completed', date: '2026-07-05', details: '7-member student and researcher engineering team constituted' },
      { id: 'T6', name: 'Piloted', status: 'upcoming', date: '2026-09-10', details: 'On-site installation scheduled at Ghatshila Van Dhan Kendra' }
    ]
  },
  {
    id: 'PR-2024-004',
    title: 'Fly Ash Slurry Seepage & Heavy Metal Runoff Contaminating Damodar Tributaries',
    description: 'Unlined thermal power ash ponds near Chandrapura and Bermo overflow during heavy rains, depositing heavy metal sediments (Cadmium, Nickel, Lead) in the Konar and Damodar river channels used by 32 villages for bathing and vegetable farming.',
    category: 'Air Quality & Environment',
    district: 'Bokaro',
    state: 'Jharkhand',
    locationDetails: 'Bhandaridah Panchayat, Bermo-Chandrapura River Stretch, Bokaro, Jharkhand',
    coordinates: { lat: 23.7505, lng: 85.9554 },
    submittedBy: {
      name: 'Maheshwar Prasad (Fisheries Cooperative Head)',
      phoneOrEmail: 'maheshwar.damodar.fisheries@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-02',
    peopleAffected: 12400,
    severity: 'High',
    status: 'Research',
    stageProgress: 40,
    clusterId: 'CL-804',
    clusterName: 'Damodar River Catchment Industrial Fly Ash & Effluent Remediation',
    clusterCount: 16,
    images: [
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Leaching of soluble heavy metals and fine pozzolanic silicate ash particles due to unlined ash pond bund breaches during monsoon hydraulic over-pressurization.',
      technicalKeywords: [
        'Fly Ash Geopolymerization',
        'Phytoremediation Wetland',
        'Heavy Metal Chelation',
        'Damodar River Ecology'
      ],
      complexityScore: 86,
      estimatedFeasibility: 'Moderate (12-16 weeks for bio-trench and geopolymer plant setup)',
      estimatedBudget: '₹9,80,000',
      suggestedApproaches: [
        'Engineered floating wetlands with Vetiver grass for heavy metal bio-accumulation',
        'Cold-curing alkali-activated geopolymerization to turn slurry into construction pavers',
        'Real-time optical turbidity and heavy metal telemetry probes'
      ],
      sdgGoals: [6, 14, 9, 12],
      patentPotential: true
    },
    assignedUniversity: {
      name: 'BIT Mesra & NIT Jamshedpur Materials Lab',
      department: 'Department of Chemical & Environmental Engineering',
      leadFaculty: 'Dr. Rajeev Ranjan & Dr. Ananya Mukherjee',
      matchScore: 94,
      teamSize: 6
    },
    universityStatus: 'Accepted',
    coSignCount: 96,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-02', details: 'Filed by local fisheries cooperative with water toxicity reports' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-04', details: 'AI confirmed industrial ash slurry contamination etiology' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-07-05', details: 'Grouped under Damodar River Remediation Cluster CL-804' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-07-08', details: 'Assigned to BIT Mesra Chemical & Environmental Engg Lab (94% Score)' },
      { id: 'T5', name: 'Team Formed', status: 'in_progress', date: '2026-07-15', details: 'Undergraduate and postgraduate researchers conducting baseline chemical profiling' }
    ]
  },
  {
    id: 'PR-2024-005',
    title: 'Sickle Cell Point-of-Care Testing & Vaccine Solar Cold Chain in Saranda Forest',
    description: 'Remote Anganwadis and health sub-centres in Manoharpur and Noamundi blocks lack reliable electricity. Power failures destroy temperature-sensitive pentavalent vaccines and snake anti-venom. Furthermore, tribal populations have a high prevalence of Sickle Cell Trait (HbS) with no rapid on-site diagnostic screening.',
    category: 'Public Healthcare',
    district: 'West Singhbhum',
    state: 'Jharkhand',
    locationDetails: 'Saranda Forest Belt, Manoharpur & Anandpur Health Sub-Centres, West Singhbhum, Jharkhand',
    coordinates: { lat: 22.4285, lng: 85.2014 },
    submittedBy: {
      name: 'Dr. Joseph Bodra (Rural Medical Officer)',
      phoneOrEmail: 'dr.joseph.saranda@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-10',
    peopleAffected: 9500,
    severity: 'Critical',
    status: 'Prototype',
    stageProgress: 65,
    clusterId: 'CL-805',
    clusterName: 'Remote Forest PHC & Anganwadi Vaccine Cold Chain Failures',
    clusterCount: 14,
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Intermittent 12-hour grid blackouts in densely forested terrains causing temperature excursions outside the +2°C to +8°C vaccine stability window, combined with lack of point-of-care microfluidic hemoglobin electrophoresis.',
      technicalKeywords: [
        'Direct-Drive Solar Refrigeration',
        'Sickle Cell Microfluidics',
        'Cold-Chain Telemetry',
        'Tribal Health Diagnostics'
      ],
      complexityScore: 88,
      estimatedFeasibility: 'High (8-10 weeks for battery-free solar chillers)',
      estimatedBudget: '₹4,20,000 per health sub-center package',
      suggestedApproaches: [
        'Battery-less direct solar ice-pack refrigeration utilizing variable speed BLDC compressor',
        'Paper-based microfluidic solubility assay for Sickle Cell anemia testing (<₹25 per test)',
        'Satellite/BLE automated temperature SMS alerts for ANM health workers'
      ],
      sdgGoals: [3, 9, 10],
      patentPotential: true
    },
    assignedUniversity: {
      name: 'Rajendra Institute of Medical Sciences (RIMS) Ranchi & BIT Mesra Bioengineering',
      department: 'Department of Bio-Engineering & Public Health Diagnostics Division',
      leadFaculty: 'Dr. Vivek Horo & Prof. Sangeeta Murmu',
      matchScore: 96,
      teamSize: 7
    },
    universityStatus: 'Accepted',
    coSignCount: 178,
    userCoSigned: true,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-10', details: 'Submitted by Medical Officer with temperature logs' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-12', details: 'Prioritized under Public Healthcare & Tribal Diagnostics' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-07-14', details: 'Added to Cluster CL-805 with 13 tribal health centers' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-07-16', details: 'Matched with RIMS Ranchi & BIT Mesra Bioengineering (96% Score)' },
      { id: 'T5', name: 'Team Formed', status: 'completed', date: '2026-07-20', details: 'Combined clinical-engineering team constituted' },
      { id: 'T6', name: 'Piloted', status: 'in_progress', date: '2026-08-10', details: 'Lab validation of direct-drive solar cooler and test strips underway' }
    ]
  },
  {
    id: 'PR-2024-006',
    title: 'Steep Sloped Farmland Water Runoff & Soil Erosion in Santhal Pargana',
    description: 'Sloped plateau farmland in Ranishwar and Dumka rural blocks experiences intense soil erosion during monsoon downpours. Over 80% of rainwater flows away down rocky ravines in 3 days, causing acute water scarcity for second-crop Rabi cultivation.',
    category: 'Agriculture & Soil',
    district: 'Dumka',
    state: 'Jharkhand',
    locationDetails: 'Ranishwar Block, Mayurakshi Basin Farmlands, Dumka, Jharkhand',
    coordinates: { lat: 24.2684, lng: 87.2486 },
    submittedBy: {
      name: 'Hopna Marandi (Kisan Club President)',
      phoneOrEmail: 'hopna.dumka.kisan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-14',
    peopleAffected: 5400,
    severity: 'High',
    status: 'Research',
    stageProgress: 35,
    clusterId: 'CL-806',
    clusterName: 'Santhal Pargana Sloped Rainwater Runoff & Micro-Lift Irrigation',
    clusterCount: 21,
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Lack of tiered check-dams and micro-lift siphon infrastructure on steep undulating topography leading to high runoff coefficient and topsoil nutrient leaching.',
      technicalKeywords: [
        'Solar Micro-Lift Irrigation',
        'Contour Trenches',
        'Plateau Rainwater Harvesting',
        'Santhal Pargana Agriculture'
      ],
      complexityScore: 78,
      estimatedFeasibility: 'High (8-10 weeks)',
      estimatedBudget: '₹5,50,000 for 50-hectare command area',
      suggestedApproaches: [
        'Tiered check-dam micro-catchments with solar-powered flexible hose siphon lifts',
        'Contour bunding with Vetiver and deep-root leguminous ground cover',
        'IoT smart water distribution valves managed by Village Pani Panchayat'
      ],
      sdgGoals: [1, 2, 6, 13],
      patentPotential: false
    },
    assignedUniversity: {
      name: 'Birsa Agricultural University (BAU) Ranchi & S.K.M. University Dumka',
      department: 'College of Agricultural Engineering & Soil Water Conservation',
      leadFaculty: 'Dr. Dilip Besra & Prof. Arvind Kumar',
      matchScore: 93,
      teamSize: 6
    },
    universityStatus: 'Accepted',
    coSignCount: 114,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-14', details: 'Submitted by Ranishwar Kisan Club with farm survey maps' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-16', details: 'Identified key watershed topography bottleneck' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-07-18', details: 'Connected to Santhal Pargana Watershed Cluster CL-806' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-07-20', details: 'Assigned to Birsa Agricultural University Soil Conservation Lab' },
      { id: 'T5', name: 'Team Formed', status: 'in_progress', date: '2026-07-25', details: 'Field surveying team mapping micro-catchment elevation lines' }
    ]
  },
  {
    id: 'PR-2024-007',
    title: 'Drudgery & Low Yield in Smallholder Finger Millet (Marua) Dehulling in Palamu',
    description: 'Tribal women farmers in Daltonganj and Lesliganj manually pound drought-resilient finger millets (Marua) using traditional wooden pestles (Dhenki), causing high grain breakage (over 25% loss) and extreme physical strain.',
    category: 'Agriculture & Soil',
    district: 'Palamu',
    state: 'Jharkhand',
    locationDetails: 'Lesliganj Block, Daltonganj Rural Cluster, Palamu, Jharkhand',
    coordinates: { lat: 24.0384, lng: 84.0722 },
    submittedBy: {
      name: 'Sunita Devi (Mahila Kisan Samiti)',
      phoneOrEmail: 'sunita.palamu.kisan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-18',
    peopleAffected: 3800,
    severity: 'Medium',
    status: 'Research',
    stageProgress: 30,
    clusterId: 'CL-807',
    clusterName: 'Palamu Drought Belt Millet Processing & Decentralized Solar Micro-Mills',
    clusterCount: 15,
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Lack of low-power, affordable centrifugal abrasive dehulling machinery suited for small-seeded minor millets in off-grid rural hamlets.',
      technicalKeywords: [
        'Millet Dehuller Mechanization',
        'Solar Post-Harvest Processing',
        'Tribal Drudgery Reduction',
        'Nutri-Cereal Value Chain'
      ],
      complexityScore: 68,
      estimatedFeasibility: 'High (6-8 weeks)',
      estimatedBudget: '₹2,40,000 per mini-mill unit',
      suggestedApproaches: [
        'Portable solar-powered abrasive emery dehuller with adjustable hull-separation cyclone',
        'Ergonomic pedal-assisted mechanical thresher for remote off-grid SHGs',
        'Standardized packaging and moisture testing kit for local FPO retail'
      ],
      sdgGoals: [1, 2, 5, 8],
      patentPotential: false
    },
    assignedUniversity: {
      name: 'Birsa Agricultural University (BAU) Ranchi',
      department: 'Department of Agricultural Engineering & Food Processing',
      leadFaculty: 'Dr. Nirmal Tirkey & Prof. Kavita Roy',
      matchScore: 92,
      teamSize: 5
    },
    universityStatus: 'Accepted',
    coSignCount: 88,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-18', details: 'Submitted by Mahila Kisan Samiti leader' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-20', details: 'AI validated mechanization potential and market linkages' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-07-22', details: 'Grouped into Palamu Millet Processing Cluster CL-807' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-07-25', details: 'Assigned to BAU Ranchi Agricultural Engineering Lab' }
    ]
  },
  {
    id: 'PR-2024-008',
    title: 'Biomass Briquette Upcycling for Coal-Fired Brick Kiln Emission Reduction in Hazaribagh',
    description: 'Over 60 informal brick kilns operating across Mandu and Charhi burn raw low-grade coal, creating dense sulfurous smog plumes that settle on adjacent paddy fields and residential colonies.',
    category: 'Clean Energy & Power',
    district: 'Hazaribagh',
    state: 'Jharkhand',
    locationDetails: 'Mandu-Charhi Industrial Belt, Hazaribagh, Jharkhand',
    coordinates: { lat: 23.9925, lng: 85.3637 },
    submittedBy: {
      name: 'Rameshwar Sahu (Village Pradhan)',
      phoneOrEmail: 'rameshwar.mandu@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-22',
    peopleAffected: 7200,
    severity: 'High',
    status: 'Research',
    stageProgress: 35,
    clusterId: 'CL-802',
    clusterName: 'Jharia & Dhanbad Coalfield Fugitive Dust & Particulate Pollution',
    clusterCount: 28,
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Inefficient natural-draft clamp kilns with 100% reliance on raw high-sulfur coal without agro-residue biomass blending or induced draft scrubbers.',
      technicalKeywords: [
        'Zig-Zag Kiln Retrofitting',
        'Agro-Biomass Briquettes',
        'Particulate Scrubbing',
        'Clean Thermal Energy'
      ],
      complexityScore: 76,
      estimatedFeasibility: 'Moderate (10-12 weeks)',
      estimatedBudget: '₹6,80,000 per kiln cluster retrofit',
      suggestedApproaches: [
        'Densified paddy straw and pine-needle bio-briquette co-firing blend',
        'Low-cost wet cyclonic sulfur and soot separator for kiln exhaust stacks',
        'Sensor-assisted internal temperature and draft regulation'
      ],
      sdgGoals: [7, 9, 11, 13],
      patentPotential: false
    },
    assignedUniversity: {
      name: 'University College of Engineering (Vinoba Bhave University) Hazaribagh',
      department: 'Department of Mechanical & Energy Engineering',
      leadFaculty: 'Dr. Alok Verma',
      matchScore: 89,
      teamSize: 5
    },
    universityStatus: 'Accepted',
    coSignCount: 65,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-22', details: 'Filed with air quality and crop impact documentation' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-24', details: 'AI categorized under Clean Energy & Thermal Emission Reduction' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-07-26', details: 'Linked with regional industrial particulate remediation initiatives' }
    ]
  },
  {
    id: 'PR-2024-009',
    title: 'Lack of Micro-Cold Storage for Perishable Vegetable & Tomato Harvests in Bero, Ranchi',
    description: 'Smallholder vegetable farmers in Bero, Lapung, and Itki blocks produce bumper harvests of tomatoes, green chillies, and cauliflower. Lacking local decentralized pre-cooling facilities, over 30% of daily harvest rots within 48 hours during peak monsoon and summer heat, compelling farmers to sell at ₹2-3/kg.',
    category: 'Agriculture & Soil',
    district: 'Ranchi',
    state: 'Jharkhand',
    locationDetails: 'Bero Weekly Haat Mandi, Lapung-Bero Rural Highway, Ranchi, Jharkhand',
    coordinates: { lat: 23.2796, lng: 85.0084 },
    submittedBy: {
      name: 'Somra Oraon (Bero Vegetable FPO Secretary)',
      phoneOrEmail: 'somra.bero.farmers@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-07-28',
    peopleAffected: 5800,
    severity: 'High',
    status: 'Prototype',
    stageProgress: 55,
    clusterId: 'CL-803',
    clusterName: 'Kolhan Tribal Non-Timber Forest Produce (NTFP) & Lac Solar Cold Storage Losses',
    clusterCount: 19,
    images: [
      'https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Rapid post-harvest respiration and bacterial soft rot under ambient tropical temperature (34-38°C) without zero-energy evaporative cooling or solar micro-cold rooms.',
      technicalKeywords: [
        'Zero Energy Cool Chamber (ZECC)',
        'Solar Evaporative Cold Room',
        'Post-Harvest Perishable Preservation',
        'FPO Cold Chain Logistics'
      ],
      complexityScore: 71,
      estimatedFeasibility: 'High (6-8 weeks for community installation)',
      estimatedBudget: '₹3,50,000 for 5-metric-ton solar cool room',
      suggestedApproaches: [
        'Solar DC-powered evaporative cooling chamber using local clay-brick double wall insulation',
        'Phase Change Material (PCM) thermal storage backup for night-time temperature stability (10-14°C)',
        'Digital marketplace inventory app for local FPO bulk dispatch coordination'
      ],
      sdgGoals: [1, 2, 9, 12],
      patentPotential: true
    },
    assignedUniversity: {
      name: 'Birsa Agricultural University (BAU) & BIT Mesra',
      department: 'Centre for Agricultural Post-Harvest Technology & Mechanical Engg',
      leadFaculty: 'Dr. Pratibha Kumari & Dr. Sanjay Sen',
      matchScore: 94,
      teamSize: 6
    },
    universityStatus: 'Accepted',
    coSignCount: 156,
    userCoSigned: false,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-07-28', details: 'Submitted by Bero Kisan Collective with spoilage documentation' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-07-30', details: 'AI verified agricultural distress pricing and cold-chain gap' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-08-01', details: 'Aggregated with rural perishables preservation cluster' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-08-05', details: 'Assigned to BAU Post-Harvest Technology Lab' }
    ]
  },
  {
    id: 'PR-2024-010',
    title: 'Arsenic & Iron Groundwater Contamination in Ganga Basin Handpumps in Sahibganj',
    description: 'Over 18 community handpumps in Rajmahal and Udhwa blocks along the Ganga floodplains discharge water with toxic Arsenic concentrations exceeding 0.08 mg/L (8x national standard) alongside heavy dissolved iron. Several residents show severe skin pigmentation (melanosis) and keratosis lesions.',
    category: 'Water & Sanitation',
    district: 'Sahibganj',
    state: 'Jharkhand',
    locationDetails: 'Radhanagar Panchayat, Rajmahal-Udhwa Floodplain Belt, Sahibganj, Jharkhand',
    coordinates: { lat: 25.0489, lng: 87.8342 },
    submittedBy: {
      name: 'Manzar Hussain (Panchayat Samiti Member)',
      phoneOrEmail: 'manzar.rajmahal.samiti@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    submittedDate: '2026-08-02',
    peopleAffected: 6400,
    severity: 'Critical',
    status: 'Research',
    stageProgress: 40,
    clusterId: 'CL-801',
    clusterName: 'Chotanagpur Plateau High-Fluoride & Iron Groundwater Crisis',
    clusterCount: 22,
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
    ],
    problemDna: {
      rootCause: 'Reductive dissolution of arsenic-rich iron oxyhydroxides in shallow Holocene alluvial aquifers triggered by high organic matter deposition and anaerobic groundwater conditions.',
      technicalKeywords: [
        'Arsenic Adsorption Remediation',
        'Zero-Valent Iron Filter',
        'Co-Precipitation Nano-Media',
        'Ganga Basin Hydro-Geology'
      ],
      complexityScore: 87,
      estimatedFeasibility: 'High (8-10 weeks for community retrofit)',
      estimatedBudget: '₹4,60,000 per 10-handpump package',
      suggestedApproaches: [
        'Multi-stage granular ferric hydroxide / zero-valent iron (ZVI) adsorption column with gravel pre-filter',
        'Community solar aeration basin for rapid iron and arsenic co-precipitation',
        'Colorimetric test-strip surveillance kit distributed to local ASHA and Jal Sahiya workers'
      ],
      sdgGoals: [3, 6, 9, 10],
      patentPotential: true
    },
    assignedUniversity: {
      name: 'IIT (ISM) Dhanbad & BIT Mesra Water Tech Lab',
      department: 'Department of Environmental Science & Engineering',
      leadFaculty: 'Dr. Manish Kumar & Prof. Smriti Soren',
      matchScore: 96,
      teamSize: 7
    },
    universityStatus: 'Accepted',
    coSignCount: 198,
    userCoSigned: true,
    timelineSteps: [
      { id: 'T1', name: 'Submitted', status: 'completed', date: '2026-08-02', details: 'Submitted by Rajmahal Panchayat Samiti with water test reports' },
      { id: 'T2', name: 'Validated', status: 'completed', date: '2026-08-04', details: 'AI matched alluvial aquifer reductive dissolution etiology' },
      { id: 'T3', name: 'Clustered', status: 'completed', date: '2026-08-06', details: 'Integrated into State Toxic Water Remediation Cluster' },
      { id: 'T4', name: 'Matched', status: 'completed', date: '2026-08-08', details: 'Assigned to IIT (ISM) Dhanbad Environmental Science Lab' }
    ]
  }
];

export const CATEGORIES_LIST = [
  'All Categories',
  'Water & Sanitation',
  'Agriculture & Soil',
  'Rural Livelihoods & NTFP',
  'Public Healthcare',
  'Air Quality & Environment',
  'Clean Energy & Power',
  'Urban Mobility & Roads',
  'Waste Management',
  'Education & Skill',
  'Public Administration',
  'Accessibility & Assistive Tech'
];

export const SEVERITIES_LIST = ['All Severities', 'Critical', 'High', 'Medium', 'Low'];

export const STAGES_LIST = ['All Stages', 'Submitted', 'Research', 'Prototype', 'Pilot', 'Deployed'];

export const CROSS_CLUSTER_INSIGHTS: CrossClusterPatternInsight[] = [
  {
    id: 'INS-001',
    title: 'Chotanagpur Granitic Gneiss Geogenic Fluoride & Iron Contamination',
    category: 'Water & Sanitation',
    sharedRootCause: 'Hydrothermal dissolution of fluorite and biotite minerals from the Precambrian basement into shallow unconfined village handpumps across the central plateau.',
    affectedDistricts: ['Ranchi (Jharkhand)', 'Khunti (Jharkhand)', 'Gumla (Jharkhand)', 'Lohardaga (Jharkhand)'],
    clusterIds: ['CL-801'],
    totalPeopleAffected: 142000,
    interDistrictSynergy: 'Shared regional hydro-geology enables identical activated alumina / biochar gravity cartridges and solar backwash valves to be fabricated at 42% lower unit cost through centralized BIT Mesra & university maker spaces.',
    recommendedIntervention: 'Form a unified Jharkhand State Fluoride Remediation Taskforce linking BIT Mesra, PHED Department, and Tata Steel Foundation CSR for 200-panchayat turnkey deployment.',
    potentialLeadInstitutions: ['BIT Mesra, Ranchi', 'IIT (ISM) Dhanbad', 'Tata Steel Foundation CSR']
  },
  {
    id: 'INS-002',
    title: 'Damodar Valley Industrial & Mining Particulate Corridor',
    category: 'Air Quality & Environment',
    sharedRootCause: 'High density of unpaved coal haul corridors, overburden dumps, and thermal power fly ash disposal creating acute PM10 / PM2.5 resuspension.',
    affectedDistricts: ['Dhanbad (Jharkhand)', 'Bokaro (Jharkhand)', 'Ramgarh (Jharkhand)', 'Hazaribagh (Jharkhand)'],
    clusterIds: ['CL-802', 'CL-804'],
    totalPeopleAffected: 320000,
    interDistrictSynergy: 'Edge AI optical dust telemetry towers and bio-surfactant misting arrays engineered by IIT (ISM) Dhanbad can be replicated across CCL, BCCL, and SAIL industrial belts without re-engineering.',
    recommendedIntervention: 'Deploy a joint Damodar Valley Clean Air & Watershed Council with centralized CPCB telemetry dashboard and industrial CSR co-funding.',
    potentialLeadInstitutions: ['IIT (ISM) Dhanbad', 'NIT Jamshedpur', 'BCCL / CCL CSR Cell']
  },
  {
    id: 'INS-003',
    title: 'Kolhan & Santhal Pargana Forest Produce (NTFP) Post-Harvest Spoilage',
    category: 'Rural Livelihoods & NTFP',
    sharedRootCause: 'High pre-monsoon humidity triggering mold sporulation and quality degradation on raw Lac, Mahua, Tussar silk, and Chironji without decentralized solar drying.',
    affectedDistricts: ['East Singhbhum (Jharkhand)', 'West Singhbhum (Jharkhand)', 'Dumka (Jharkhand)', 'Godda (Jharkhand)'],
    clusterIds: ['CL-803', 'CL-806'],
    totalPeopleAffected: 175000,
    interDistrictSynergy: 'NIT Jamshedpur and Birsa Agricultural University solar convective drying blueprints can be mass-deployed across all 400+ Van Dhan Vikas Kendras under JSLPS Palash Brand.',
    recommendedIntervention: 'Establish a state-wide NTFP Solar Mechanization Mission connecting university prototype labs with women Self-Help Groups (SHGs).',
    potentialLeadInstitutions: ['Birsa Agricultural University (BAU) Ranchi', 'NIT Jamshedpur', 'JSLPS Palash Brand']
  }
];

export const DISTRICT_STATS_DATA: DistrictStat[] = [
  {
    district: 'Ranchi',
    state: 'Jharkhand',
    totalProblems: 28,
    criticalCount: 11,
    highCount: 10,
    mediumCount: 5,
    lowCount: 2,
    peopleAffected: 92000,
    resolvedCount: 9,
    activeClusters: 3,
    severityScore: 91,
    topCategory: 'Water & Sanitation'
  },
  {
    district: 'Dhanbad',
    state: 'Jharkhand',
    totalProblems: 34,
    criticalCount: 14,
    highCount: 12,
    mediumCount: 6,
    lowCount: 2,
    peopleAffected: 175000,
    resolvedCount: 11,
    activeClusters: 4,
    severityScore: 94,
    topCategory: 'Air Quality & Environment'
  },
  {
    district: 'East Singhbhum',
    state: 'Jharkhand',
    totalProblems: 24,
    criticalCount: 8,
    highCount: 11,
    mediumCount: 4,
    lowCount: 1,
    peopleAffected: 68000,
    resolvedCount: 8,
    activeClusters: 2,
    severityScore: 84,
    topCategory: 'Rural Livelihoods & NTFP'
  },
  {
    district: 'Bokaro',
    state: 'Jharkhand',
    totalProblems: 21,
    criticalCount: 7,
    highCount: 9,
    mediumCount: 4,
    lowCount: 1,
    peopleAffected: 89000,
    resolvedCount: 7,
    activeClusters: 2,
    severityScore: 83,
    topCategory: 'Air Quality & Environment'
  },
  {
    district: 'West Singhbhum',
    state: 'Jharkhand',
    totalProblems: 19,
    criticalCount: 8,
    highCount: 7,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 56000,
    resolvedCount: 5,
    activeClusters: 2,
    severityScore: 88,
    topCategory: 'Public Healthcare'
  },
  {
    district: 'Dumka',
    state: 'Jharkhand',
    totalProblems: 22,
    criticalCount: 6,
    highCount: 11,
    mediumCount: 4,
    lowCount: 1,
    peopleAffected: 61000,
    resolvedCount: 6,
    activeClusters: 2,
    severityScore: 82,
    topCategory: 'Agriculture & Soil'
  },
  {
    district: 'Hazaribagh',
    state: 'Jharkhand',
    totalProblems: 18,
    criticalCount: 5,
    highCount: 8,
    mediumCount: 4,
    lowCount: 1,
    peopleAffected: 54000,
    resolvedCount: 5,
    activeClusters: 2,
    severityScore: 79,
    topCategory: 'Clean Energy & Power'
  },
  {
    district: 'Khunti',
    state: 'Jharkhand',
    totalProblems: 16,
    criticalCount: 6,
    highCount: 6,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 42000,
    resolvedCount: 6,
    activeClusters: 1,
    severityScore: 85,
    topCategory: 'Water & Sanitation'
  },
  {
    district: 'Palamu',
    state: 'Jharkhand',
    totalProblems: 17,
    criticalCount: 5,
    highCount: 8,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 48000,
    resolvedCount: 4,
    activeClusters: 1,
    severityScore: 80,
    topCategory: 'Agriculture & Soil'
  },
  {
    district: 'Deoghar',
    state: 'Jharkhand',
    totalProblems: 15,
    criticalCount: 4,
    highCount: 7,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 46000,
    resolvedCount: 5,
    activeClusters: 1,
    severityScore: 76,
    topCategory: 'Waste Management'
  },
  {
    district: 'Giridih',
    state: 'Jharkhand',
    totalProblems: 16,
    criticalCount: 5,
    highCount: 7,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 49000,
    resolvedCount: 4,
    activeClusters: 1,
    severityScore: 78,
    topCategory: 'Air Quality & Environment'
  },
  {
    district: 'Ramgarh',
    state: 'Jharkhand',
    totalProblems: 14,
    criticalCount: 4,
    highCount: 6,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 41000,
    resolvedCount: 4,
    activeClusters: 1,
    severityScore: 77,
    topCategory: 'Air Quality & Environment'
  },
  {
    district: 'Saraikela Kharsawan',
    state: 'Jharkhand',
    totalProblems: 13,
    criticalCount: 3,
    highCount: 6,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 38000,
    resolvedCount: 4,
    activeClusters: 1,
    severityScore: 74,
    topCategory: 'Urban Mobility & Roads'
  },
  {
    district: 'Gumla',
    state: 'Jharkhand',
    totalProblems: 14,
    criticalCount: 4,
    highCount: 6,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 36000,
    resolvedCount: 4,
    activeClusters: 1,
    severityScore: 76,
    topCategory: 'Water & Sanitation'
  },
  {
    district: 'Simdega',
    state: 'Jharkhand',
    totalProblems: 11,
    criticalCount: 3,
    highCount: 5,
    mediumCount: 2,
    lowCount: 1,
    peopleAffected: 29000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 72,
    topCategory: 'Public Healthcare'
  },
  {
    district: 'Lohardaga',
    state: 'Jharkhand',
    totalProblems: 10,
    criticalCount: 3,
    highCount: 4,
    mediumCount: 2,
    lowCount: 1,
    peopleAffected: 27000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 71,
    topCategory: 'Water & Sanitation'
  },
  {
    district: 'Koderma',
    state: 'Jharkhand',
    totalProblems: 12,
    criticalCount: 3,
    highCount: 5,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 33000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 73,
    topCategory: 'Clean Energy & Power'
  },
  {
    district: 'Chatra',
    state: 'Jharkhand',
    totalProblems: 12,
    criticalCount: 3,
    highCount: 5,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 31000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 73,
    topCategory: 'Education & Skill'
  },
  {
    district: 'Garhwa',
    state: 'Jharkhand',
    totalProblems: 13,
    criticalCount: 4,
    highCount: 5,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 35000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 75,
    topCategory: 'Agriculture & Soil'
  },
  {
    district: 'Latehar',
    state: 'Jharkhand',
    totalProblems: 11,
    criticalCount: 3,
    highCount: 5,
    mediumCount: 2,
    lowCount: 1,
    peopleAffected: 28000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 72,
    topCategory: 'Rural Livelihoods & NTFP'
  },
  {
    district: 'Godda',
    state: 'Jharkhand',
    totalProblems: 13,
    criticalCount: 4,
    highCount: 5,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 37000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 75,
    topCategory: 'Clean Energy & Power'
  },
  {
    district: 'Jamtara',
    state: 'Jharkhand',
    totalProblems: 11,
    criticalCount: 3,
    highCount: 4,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 29000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 71,
    topCategory: 'Education & Skill'
  },
  {
    district: 'Sahibganj',
    state: 'Jharkhand',
    totalProblems: 14,
    criticalCount: 4,
    highCount: 6,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 39000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 76,
    topCategory: 'Water & Sanitation'
  },
  {
    district: 'Pakur',
    state: 'Jharkhand',
    totalProblems: 12,
    criticalCount: 3,
    highCount: 5,
    mediumCount: 3,
    lowCount: 1,
    peopleAffected: 32000,
    resolvedCount: 3,
    activeClusters: 1,
    severityScore: 73,
    topCategory: 'Public Healthcare'
  }
];
