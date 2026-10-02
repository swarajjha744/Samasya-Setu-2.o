import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Cpu,
  Boxes,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface InteractiveBridgeProps {
  onSelectRole?: (role: string) => void;
  onOpenSubmitModal?: () => void;
}

interface BridgeNode {
  id: string;
  stepNum: string;
  label: string;
  sublabel: string;
  xPercent: number; // percentage along the bridge
  yPercent: number; // suspension cable height percentage
  hindi: string;
  title: string;
  description: string;
  activeEntity: string;
  metric: string;
}

export const InteractiveBridge: React.FC<InteractiveBridgeProps> = ({
  onSelectRole,
  onOpenSubmitModal
}) => {
  const { problems, clusters, setCurrentRole } = useApp();
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(1);
  const [isRunningSimulation, setIsRunningSimulation] = useState<boolean>(false);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);

  const nodes: BridgeNode[] = [
    {
      id: 'node-citizen',
      stepNum: '01',
      label: 'CITIZEN & PRI',
      sublabel: 'Jharkhand Habitations',
      xPercent: 12,
      yPercent: 28,
      hindi: 'नागरिक व पंचायत',
      title: 'Panchayat & Citizen Submissions',
      description: 'Citizens, Mukhiyas, and SHG leaders report unaddressed challenges across Jharkhand blocks in simple language, audio notes, or geotagged photos.',
      activeEntity: 'Birendra Mahto (Mukhiya), Silli Block, Ranchi',
      metric: '4,200 villagers directly affected'
    },
    {
      id: 'node-ai',
      stepNum: '02',
      label: 'AI ANALYSIS',
      sublabel: 'Root Cause & Blueprint',
      xPercent: 27,
      yPercent: 34,
      hindi: 'कृत्रिम बुद्धिमत्ता विश्लेषण',
      title: 'Root Cause & Technical Blueprint',
      description: 'AI analyzes the citizen report to identify root causes, technical requirements, and estimated project feasibility.',
      activeEntity: 'State Innovation AI Analysis',
      metric: '84% Complexity & Feasibility Score'
    },
    {
      id: 'node-cluster',
      stepNum: '03',
      label: 'SMART GROUPING',
      sublabel: 'Statewide Need Synthesis',
      xPercent: 43,
      yPercent: 38,
      hindi: 'सामूहिक समस्या पहचान',
      title: 'Connecting Related Community Needs',
      description: 'Groups similar reports across districts into unified, high-impact regional challenges so solutions can be built and scaled efficiently.',
      activeEntity: 'Plateau Water Quality Cluster #CL-801',
      metric: '22 submissions grouped (78,000 citizens impacted)'
    },
    {
      id: 'node-university',
      stepNum: '04',
      label: 'HEI LABS',
      sublabel: 'NEP 2020 Student Cohorts',
      xPercent: 59,
      yPercent: 38,
      hindi: 'उच्च शिक्षण संस्थान',
      title: 'Multidisciplinary HEI R&D',
      description: 'Matched to premier state institutes like BIT Mesra, IIT (ISM) Dhanbad, NIT Jamshedpur, and BAU Ranchi for credit-bearing experiential prototypes.',
      activeEntity: 'BIT Mesra & IIT (ISM) Dhanbad Labs',
      metric: '97% Technical & Proximity Match'
    },
    {
      id: 'node-industry',
      stepNum: '05',
      label: 'CSR & INDUSTRY',
      sublabel: 'Funding & Fabrication',
      xPercent: 74,
      yPercent: 34,
      hindi: 'उद्योग व सीएसआर',
      title: 'CSR Seed Capital & Tooling',
      description: 'Jharkhand industrial anchors (Tata Steel Foundation, BCCL, SAIL, JSLPS Palash) provide prototype grants, equipment, and manufacturing tooling.',
      activeEntity: 'Tata Steel CSR & JCSTI',
      metric: '₹8,50,000 Committed Innovation Grant'
    },
    {
      id: 'node-impact',
      stepNum: '06',
      label: 'FIELD DEPLOYMENT',
      sublabel: 'Verified Panchayat Impact',
      xPercent: 88,
      yPercent: 28,
      hindi: 'सत्यापित समाधान',
      title: 'Commissioned & Verified',
      description: '12 handpump units deployed in Silli Gram Panchayat. Water quality laboratory tests and Mukhiya ratings confirm complete fluoride elimination.',
      activeEntity: 'Ranchi District Administration & Silli PRI',
      metric: '-86% Fluoride Contaminant Drop'
    }
  ];

  // Simulation loop
  useEffect(() => {
    let interval: any;
    if (isRunningSimulation) {
      interval = setInterval(() => {
        setSimulatedProgress(prev => {
          if (prev >= 100) {
            setIsRunningSimulation(false);
            return 100;
          }
          const nextVal = prev + 2;
          const nodeIdx = Math.min(5, Math.floor((nextVal / 100) * 6));
          setActiveNodeIndex(nodeIdx);
          return nextVal;
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isRunningSimulation]);

  const handleStartSimulation = () => {
    setSimulatedProgress(0);
    setActiveNodeIndex(0);
    setIsRunningSimulation(true);
  };

  const activeNode = nodes[activeNodeIndex] || nodes[0];

  return (
    <div id="bridge-diagram-section" className="w-full bg-[#f8fafc] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Labels */}
        <div className="flex flex-wrap sm:flex-nowrap items-center sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#e2e8f0] pb-4 mb-4">
          <div className="flex-1 sm:flex-initial">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0f172a] tracking-tight">
              समस्या
            </span>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-0.5 sm:mt-1">
              THE PROBLEM
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="order-last sm:order-none w-full sm:w-auto flex justify-center mt-1 sm:mt-0">
            <button
              onClick={handleStartSimulation}
              disabled={isRunningSimulation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-3.5 sm:py-1.5 bg-[#0052a5] hover:bg-[#003f80] disabled:opacity-50 text-white text-xs font-mono font-semibold tracking-wider uppercase rounded-lg sm:rounded transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
            >
              {isRunningSimulation ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>RUNNING DEMO ({simulatedProgress}%)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY LIVE DEMO</span>
                </>
              )}
            </button>
          </div>

          <div className="flex-1 sm:flex-initial text-right">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0f172a] tracking-tight">
              समाधान
            </span>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-0.5 sm:mt-1">
              THE SOLUTION
            </div>
          </div>
        </div>

        {/* 6 Step Badges Row aligned above the bridge */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-1 text-center mb-4">
          {nodes.map((n, idx) => {
            const isActive = activeNodeIndex === idx;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setActiveNodeIndex(idx);
                  setIsRunningSimulation(false);
                }}
                className={`py-2 px-2 sm:px-1 rounded-lg sm:rounded transition-all text-center flex flex-col items-center justify-center cursor-pointer min-h-[52px] sm:min-h-0 ${
                  isActive
                    ? 'bg-[#eff6ff] text-[#0052a5] font-bold border-b-2 border-[#0052a5] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a] hover:bg-slate-100/60'
                }`}
              >
                <div className="text-[10px] font-mono text-[#94a3b8]">
                  {n.stepNum}
                </div>
                <div className="text-[11px] sm:text-xs font-mono font-bold tracking-tight sm:tracking-wider uppercase leading-snug sm:leading-normal">
                  {n.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Illustrated Suspension Bridge Graphic (SVG Canvas) */}
        <div className="relative w-full overflow-x-auto overflow-y-hidden bg-white border border-[#e2e8f0] rounded-xl p-2 sm:p-4 select-none shadow-sm">
          <div className="min-w-[620px] sm:min-w-full aspect-[2.6/1] sm:aspect-[3.2/1] max-h-[360px] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
            <defs>
              {/* Subtle water gradient */}
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.7" />
              </linearGradient>

              {/* Blue glowing pulse */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0052a5" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Left Land / Abutment */}
            <path
              d="M 0 90 L 160 90 L 140 260 L 0 260 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            {/* Left pylon top notch */}
            <path
              d="M 160 90 L 180 90 L 165 260 L 140 260 Z"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* Right Land / Abutment */}
            <path
              d="M 840 90 L 1000 90 L 1000 260 L 860 260 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            {/* Right pylon top notch */}
            <path
              d="M 820 90 L 840 90 L 860 260 L 835 260 Z"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* River water background beneath the bridge */}
            <rect x="140" y="160" width="720" height="120" fill="url(#waterGrad)" />

            {/* Water Wave Curves */}
            <path
              d="M 180 200 C 240 190, 300 210, 360 200 C 420 190, 480 210, 540 200 C 600 190, 660 210, 720 200 C 780 190, 820 205, 850 200"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 190 225 C 260 215, 330 235, 400 225 C 470 215, 540 235, 610 225 C 680 215, 750 235, 830 225"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 210 248 C 280 240, 350 258, 420 248 C 490 240, 560 258, 630 248 C 700 240, 780 255, 840 248"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />

            {/* Horizontal Bridge Deck / Roadway Line */}
            <line
              x1="120"
              y1="90"
              x2="880"
              y2="90"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Secondary deck underside girder */}
            <line
              x1="140"
              y1="95"
              x2="860"
              y2="95"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Suspension Catenary Cable Arc (Smooth Sagging Curve) */}
            <path
              d="M 140 90 Q 500 205 860 90"
              stroke="#0052a5"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Vertical Suspender Hanger Cables */}
            {[
              { x: 190, yBottom: 110 },
              { x: 250, yBottom: 130 },
              { x: 310, yBottom: 148 },
              { x: 370, yBottom: 162 },
              { x: 430, yBottom: 172 },
              { x: 500, yBottom: 176 },
              { x: 570, yBottom: 172 },
              { x: 630, yBottom: 162 },
              { x: 690, yBottom: 148 },
              { x: 750, yBottom: 130 },
              { x: 810, yBottom: 110 }
            ].map((v, i) => (
              <line
                key={i}
                x1={v.x}
                y1="90"
                x2={v.x}
                y2={v.yBottom}
                stroke="#64748b"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
            ))}

            {/* 6 Interactive Bridge Nodes */}
            {[
              { idx: 0, x: 170, y: 90, label: '01' },
              { idx: 1, x: 290, y: 90, label: '02' },
              { idx: 2, x: 420, y: 90, label: '03' },
              { idx: 3, x: 580, y: 90, label: '04' },
              { idx: 4, x: 720, y: 90, label: '05' },
              { idx: 5, x: 840, y: 90, label: '06' }
            ].map(node => {
              const isSelected = activeNodeIndex === node.idx;
              const hasActiveDot = node.idx === 1 || node.idx === 4 || isSelected;

              return (
                <g
                  key={node.idx}
                  onClick={() => {
                    setActiveNodeIndex(node.idx);
                    setIsRunningSimulation(false);
                  }}
                  className="cursor-pointer transition-transform hover:scale-125"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  {/* Outer halo if selected */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill="#0052a5"
                      fillOpacity="0.15"
                      stroke="#0052a5"
                      strokeWidth="1.5"
                      strokeDasharray="3 2"
                      className="animate-spin"
                      style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '6s' }}
                    />
                  )}

                  {/* Base concentric circle ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="#f8fafc"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />

                  {/* Inner active dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 4.5 : 3.5}
                    fill={isSelected ? '#0052a5' : hasActiveDot ? '#ea580c' : '#0f172a'}
                    filter={isSelected ? 'url(#nodeGlow)' : undefined}
                  />

                  {/* Invisible generous touch target for mobile devices */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="transparent"
                  />
                </g>
              );
            })}

            {/* Animated Simulation Problem Packet traveling across bridge */}
            {isRunningSimulation && (
              <g
                style={{
                  transform: `translate(${170 + (simulatedProgress / 100) * 670}px, 90px)`,
                  transition: 'transform 0.07s linear'
                }}
              >
                <circle cx="0" cy="0" r="9" fill="#ea580c" filter="url(#nodeGlow)" />
                <circle cx="0" cy="0" r="14" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" />
                <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
              </g>
            )}
          </svg>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#64748b] mt-1.5">
          <Info className="w-3 h-3 text-[#0052a5]" />
          <span>Swipe horizontally or tap nodes 01-06 to inspect stages</span>
        </div>

        {/* Selected Stage Detail Insight Box */}
        <div className="mt-4 p-4 sm:p-5 bg-white border border-[#e2e8f0] rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center font-mono font-bold text-sm text-[#0052a5] shrink-0">
                {activeNode.stepNum}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#0052a5]">
                    {activeNode.label} STAGE · {activeNode.hindi}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#0f172a] font-serif">
                  {activeNode.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-end">
              <button
                onClick={() => {
                  const nextIdx = (activeNodeIndex + 1) % nodes.length;
                  setActiveNodeIndex(nextIdx);
                }}
                className="text-xs font-mono text-[#0052a5] hover:text-[#003f80] font-semibold flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-[#eff6ff] transition-colors"
              >
                <span>NEXT NODE ({nodes[(activeNodeIndex + 1) % nodes.length].label})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs sm:text-[13px]">
            <div className="md:col-span-2 text-[#475569] leading-relaxed">
              {activeNode.description}
            </div>

            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-[#64748b]">Active Instance</div>
                <div className="text-xs font-bold text-[#0f172a] mt-0.5">{activeNode.activeEntity}</div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#e2e8f0]">
                <div className="text-[10px] font-mono uppercase text-[#0052a5]">Ground Telemetry</div>
                <div className="text-xs font-mono font-bold text-[#0f172a]">{activeNode.metric}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Marquee Strip */}
        <div className="mt-8 bg-[#0f172a] text-[#f8fafc] rounded-lg border border-[#1e293b] py-2.5 px-4 overflow-hidden relative select-none flex items-center">
          {/* Subtle gradient edge masks for clean entry and exit transitions */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee whitespace-nowrap text-xs font-mono tracking-wider flex items-center">
            {/* First Sequence */}
            <div className="flex items-center shrink-0">
              <span className="text-[#38bdf8] font-bold">IIT (ISM) DHANBAD</span>
              <span className="ml-1.5 text-slate-300">accepted challenge #2214 — culvert redesign, Palamu</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#fb923c] font-bold">TERRATECH SENSORS</span>
              <span className="ml-1.5 text-slate-300">joined as technology partner on project SS-10233</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#4ade80] font-bold">PILOT RESULT</span>
              <span className="ml-1.5 text-slate-300">— solar micro-grid v1.1, Lesliganj: 41.2 kW operational</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#38bdf8] font-bold">CITIZEN SUBMISSION #2215</span>
              <span className="ml-1.5 text-slate-300">— Water Fluoride in Garhwa District</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#fb923c] font-bold">TATA STEEL FOUNDATION</span>
              <span className="ml-1.5 text-slate-300">committed ₹8.5L CSR grant on Arsenic Remediation</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#38bdf8] font-bold">NIT JAMSHEDPUR</span>
              <span className="ml-1.5 text-slate-300">fabricated biochar filtration cartridge v2</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#4ade80] font-bold">VERIFIED IMPACT</span>
              <span className="ml-1.5 text-slate-300">— 95.7% arsenic drop in Brahmapur Panchayat</span>
              <span className="mx-4 text-[#475569]">|</span>
            </div>

            {/* Second Identical Sequence for Seamless Infinite Looping */}
            <div className="flex items-center shrink-0">
              <span className="text-[#38bdf8] font-bold">IIT (ISM) DHANBAD</span>
              <span className="ml-1.5 text-slate-300">accepted challenge #2214 — culvert redesign, Palamu</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#fb923c] font-bold">TERRATECH SENSORS</span>
              <span className="ml-1.5 text-slate-300">joined as technology partner on project SS-10233</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#4ade80] font-bold">PILOT RESULT</span>
              <span className="ml-1.5 text-slate-300">— solar micro-grid v1.1, Lesliganj: 41.2 kW operational</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#38bdf8] font-bold">CITIZEN SUBMISSION #2215</span>
              <span className="ml-1.5 text-slate-300">— Water Fluoride in Garhwa District</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#fb923c] font-bold">TATA STEEL FOUNDATION</span>
              <span className="ml-1.5 text-slate-300">committed ₹8.5L CSR grant on Arsenic Remediation</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#38bdf8] font-bold">NIT JAMSHEDPUR</span>
              <span className="ml-1.5 text-slate-300">fabricated biochar filtration cartridge v2</span>
              <span className="mx-4 text-[#475569]">|</span>
              <span className="text-[#4ade80] font-bold">VERIFIED IMPACT</span>
              <span className="ml-1.5 text-slate-300">— 95.7% arsenic drop in Brahmapur Panchayat</span>
              <span className="mx-4 text-[#475569]">|</span>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Stat Counters */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-b border-[#e2e8f0] pb-6 text-left">
          <div className="border-r border-[#e2e8f0] pr-3 sm:pr-4">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0052a5] tracking-tight">
              {problems.length > 0 ? `${problems.length}` : '10'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-1.5 sm:mt-2">
              PROBLEMS SUBMITTED
            </div>
          </div>

          <div className="border-r-0 md:border-r border-[#e2e8f0] pr-0 md:pr-4">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0052a5] tracking-tight">
              {clusters.length > 0 ? `${clusters.length}` : '7'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-1.5 sm:mt-2">
              CLUSTERS FORMED
            </div>
          </div>

          <div className="border-r border-[#e2e8f0] pr-3 sm:pr-4">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0052a5] tracking-tight">
              {problems.filter(p => ['Prototype', 'Pilot', 'Deployed'].includes(p.status)).length || '4'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-1.5 sm:mt-2">
              SOLUTIONS DEVELOPED
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#16a34a] tracking-tight">
              {problems.filter(p => ['Deployed', 'Impact_Verified'].includes(p.status)).length || '1'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#64748b] uppercase mt-1.5 sm:mt-2">
              DEPLOYMENTS VERIFIED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
