import React, { useState } from 'react';
import {
  Users,
  Cpu,
  Boxes,
  Lightbulb,
  GraduationCap,
  Building2,
  Rocket,
  LineChart,
  CheckCircle2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface FlowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details: {
    input: string;
    aiAction: string;
    output: string;
    liveExample: string;
  };
}

export const FlowDiagram: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('step-1');

  const steps: FlowStep[] = [
    {
      id: 'step-1',
      stepNumber: '01',
      title: 'Citizen & Panchayat Input',
      subtitle: 'Voice of Jharkhand Habitations',
      icon: <Users className="w-5 h-5" />,
      details: {
        input: 'A citizen, Mukhiya, or SHG leader reports a local challenge in Hindi, English, or regional dialect via text, voice, or photo.',
        aiAction: 'AI extracts geolocation, classifies under Jharkhand thematic domains, and estimates community vulnerability.',
        output: 'Structured, verifiable Societal Challenge Dossier.',
        liveExample: '“14 tubewells in Silli Block discharge reddish water with high fluoride. Over 65 children suffer from dental fluorosis.”'
      }
    },
    {
      id: 'step-2',
      stepNumber: '02',
      title: 'Problem Root Cause Analysis',
      subtitle: 'Technical Assessment',
      icon: <Cpu className="w-5 h-5" />,
      details: {
        input: 'Panchayat report combined with regional environmental and infrastructure data.',
        aiAction: 'Identifies the underlying root causes, project complexity, and required engineering skills.',
        output: 'Structured Technical Blueprint & SDG alignment.',
        liveExample: 'Root Cause: High groundwater fluoride (>2.8 mg/L); 84% complexity score.'
      }
    },
    {
      id: 'step-3',
      stepNumber: '03',
      title: 'Smart Challenge Grouping',
      subtitle: 'Connecting Statewide Needs',
      icon: <Boxes className="w-5 h-5" />,
      details: {
        input: 'Submissions across Ranchi, Dhanbad, Bokaro, and all 24 districts.',
        aiAction: 'Combines isolated community issues into unified regional challenges for collaborative solutions.',
        output: 'Multi-district challenge representing thousands of impacted residents.',
        liveExample: 'Cluster CL-801: 22 high-fluoride tubewell complaints aggregated across Ranchi & Khunti (78,000 citizens impacted).'
      }
    },
    {
      id: 'step-4',
      stepNumber: '04',
      title: 'Solution Blueprints',
      subtitle: 'NEP 2020 Project Scaffolds',
      icon: <Lightbulb className="w-5 h-5" />,
      details: {
        input: 'Scientific root causes and state-level engineering frameworks.',
        aiAction: 'Generates 3 practical solution pathways with feasibility estimates, budget benchmarks, and patent potential.',
        output: 'Structured capstone project templates for university engineering and science faculties.',
        liveExample: 'Pathway: Activated alumina & biochar gravity filtration with solar automated backwash.'
      }
    },
    {
      id: 'step-5',
      stepNumber: '05',
      title: 'HEI Lab & Student Cohorts',
      subtitle: 'Experiential Learning at Work',
      icon: <GraduationCap className="w-5 h-5" />,
      details: {
        input: 'Algorithmic matching to specialized HEI labs (BIT Mesra, IIT ISM Dhanbad, NIT Jamshedpur, BAU Ranchi).',
        aiAction: 'Ranks university departments by domain expertise, proximity, and lab equipment fit.',
        output: 'Interdisciplinary student-faculty cohorts building testable physical/digital prototypes.',
        liveExample: 'BIT Mesra Water Tech Lab & IIT ISM team engineers 400 L/hr modular filtration units.'
      }
    },
    {
      id: 'step-6',
      stepNumber: '06',
      title: 'Industry & CSR Scaling',
      subtitle: 'CSR Capital & Incubation',
      icon: <Building2 className="w-5 h-5" />,
      details: {
        input: 'Validated lab prototypes seeking seed grants, field tooling, and fabrication support.',
        aiAction: 'Matches projects with corporate CSR mandates and startup incubators in Jharkhand.',
        output: 'Committed CSR grant, manufacturing mentorship, and field procurement linkages.',
        liveExample: 'Tata Steel Foundation CSR & JSLPS commit ₹8.5 Lakhs grant for 12 panchayat retrofits.'
      }
    },
    {
      id: 'step-7',
      stepNumber: '07',
      title: 'District & PRI Deployment',
      subtitle: 'On-Ground Panchayat Rollout',
      icon: <Rocket className="w-5 h-5" />,
      details: {
        input: 'Funded, lab-certified units ready for field installation in panchayats or urban wards.',
        aiAction: 'Coordinates with District Collectors, BDOs, and Mukhiyas for rapid zero-red-tape commissioning.',
        output: 'Operational civic infrastructure with trained local Pani Samiti / SHG operators.',
        liveExample: 'District Administration Ranchi approves Silli Panchayat handpump retrofit deployment.'
      }
    },
    {
      id: 'step-8',
      stepNumber: '08',
      title: 'Impact Verification',
      subtitle: 'Measurable Civic Outcomes',
      icon: <LineChart className="w-5 h-5" />,
      details: {
        input: 'NABL laboratory water tests, sensor telemetry, and direct panchayat resident ratings.',
        aiAction: 'Quantifies percentage improvement and triggers statewide replication playbooks.',
        output: 'Verified impact ledger closing the loop from citizen voice to permanent solution.',
        liveExample: 'Fluoride dropped from 3.2 mg/L to 0.45 mg/L (-86%); 5.0/5 rating from Gram Panchayat Mukhiya.'
      }
    }
  ];

  const currentStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#f1f5f9]">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5] mb-1">
            HOW IT WORKS · 8-STEP LIFECYCLE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-serif">
            How SamasyaSetu Turns Problems into Lasting Solutions
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] font-mono mt-1 max-w-2xl">
            Click on any stage below to see how a report turns into research, funding, and real improvement.
          </p>
        </div>

        <div className="text-xs font-mono text-[#0052a5] flex items-center gap-2 bg-[#eff6ff] px-3 py-1.5 rounded-lg border border-[#bfdbfe] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#0052a5] animate-ping"></span>
          <span className="font-semibold">Interactive Step Explorer</span>
        </div>
      </div>

      {/* Horizontal Flow Stepper on Desktop / Grid on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
        {steps.map((step, idx) => {
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`relative text-left p-3 rounded-lg border transition-all flex flex-col justify-between group cursor-pointer ${
                isActive
                  ? 'bg-[#eff6ff] border-[#0052a5] text-[#0f172a] shadow-xs'
                  : 'bg-[#f8fafc] border-[#e2e8f0] hover:bg-white text-[#475569]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#94a3b8]">
                    {step.stepNumber}
                  </span>
                  <div className={`p-1 rounded ${isActive ? 'text-[#0052a5]' : 'text-[#64748b]'}`}>
                    {step.icon}
                  </div>
                </div>
                <div className={`text-xs font-bold leading-tight ${isActive ? 'text-[#0052a5]' : 'text-[#0f172a]'}`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-[#64748b] truncate mt-0.5 font-mono">
                  {step.subtitle}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbd5e1] z-10" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Showcase Box */}
      <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] p-5 sm:p-6 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0] mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] text-[#0052a5]">
              {currentStep.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0052a5]">
                  STEP {currentStep.stepNumber}
                </span>
                <h4 className="text-lg font-bold text-[#0f172a] font-serif">
                  {currentStep.title}: {currentStep.subtitle}
                </h4>
              </div>
              <p className="text-xs text-[#64748b] font-mono mt-0.5">
                Automatically coordinated across citizens, colleges, companies, and government
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === activeStepId);
                const prevIndex = (currentIndex - 1 + steps.length) % steps.length;
                setActiveStepId(steps[prevIndex].id);
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#cbd5e1] text-xs font-mono font-semibold text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            >
              ← PREVIOUS
            </button>
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === activeStepId);
                const nextIndex = (currentIndex + 1) % steps.length;
                setActiveStepId(steps[nextIndex].id);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#0052a5] text-white font-mono font-semibold text-xs hover:bg-[#003f80] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4 Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-lg bg-white border border-[#e2e8f0]">
            <div className="text-[11px] font-mono font-semibold uppercase text-[#64748b] tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]"></span> What Comes In
            </div>
            <div className="text-xs text-[#334155] leading-relaxed">
              {currentStep.details.input}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe]">
            <div className="text-[11px] font-mono font-semibold uppercase text-[#0052a5] tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052a5]"></span> What AI Does
            </div>
            <div className="text-xs text-[#0f172a] leading-relaxed font-medium">
              {currentStep.details.aiAction}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#e2e8f0]">
            <div className="text-[11px] font-mono font-semibold uppercase text-[#64748b] tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> What Is Produced
            </div>
            <div className="text-xs text-[#334155] leading-relaxed">
              {currentStep.details.output}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#e2e8f0]">
            <div className="text-[11px] font-mono font-semibold uppercase text-emerald-700 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Real Example
            </div>
            <div className="text-xs text-[#334155] italic leading-relaxed">
              {currentStep.details.liveExample}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
