import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  X,
  CheckCircle2,
  Users,
  Cpu,
  Building2,
  Rocket
} from 'lucide-react';

interface HeroVideoShowcaseProps {
  onExplorePortals?: () => void;
}

export const HeroVideoShowcase: React.FC<HeroVideoShowcaseProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const [activeStoryStage, setActiveStoryStage] = useState<number>(0);

  // Track if user scrolled away from the hero section
  const hasScrolledAwayRef = useRef<boolean>(false);

  // 4 Core Milestones depicted in the transition video
  const storyMilestones = [
    {
      id: 0,
      timePercent: 15,
      label: '01. Chaotic Problems',
      tag: 'Raw Community Pain',
      icon: <Users className="w-3.5 h-3.5 text-rose-500" />,
      desc: 'Unorganized pollution, road, and water issues isolated on one side of the gorge.'
    },
    {
      id: 1,
      timePercent: 40,
      label: '02. Neural Bridge Forms',
      tag: 'AI Problem DNA',
      icon: <Cpu className="w-3.5 h-3.5 text-[#0052a5]" />,
      desc: 'Smart AI structures the root cause and constructs the connecting engineering bridge.'
    },
    {
      id: 2,
      timePercent: 70,
      label: '03. Collaboration Hub',
      tag: 'Colleges & Sponsors',
      icon: <Building2 className="w-3.5 h-3.5 text-amber-500" />,
      desc: 'Students, researchers, companies, and local leaders join hands across the bridge.'
    },
    {
      id: 3,
      timePercent: 95,
      label: '04. SamasyaSetu Impact',
      tag: 'Verified Solution',
      icon: <Rocket className="w-3.5 h-3.5 text-emerald-500" />,
      desc: 'Crowd Problems turn into Collaborative, Lasting Solutions.'
    }
  ];

  // Update active stage based on video progress
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setCurrentProgress(progress);

      if (progress < 25) setActiveStoryStage(0);
      else if (progress < 55) setActiveStoryStage(1);
      else if (progress < 85) setActiveStoryStage(2);
      else setActiveStoryStage(3);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVideoEnded(true);
    setCurrentProgress(100);
    setActiveStoryStage(3);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        if (isVideoEnded) {
          videoRef.current.currentTime = 0;
          setIsVideoEnded(false);
        }
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsVideoEnded(false);
    }
  };

  // Setup IntersectionObserver for Scroll-Triggered Replay:
  // When user scrolls down out of Hero, mark hasScrolledAway = true
  // When user returns/scrolls back up to Hero, replay video once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            // User scrolled away from hero section
            hasScrolledAwayRef.current = true;
          } else {
            // User scrolled back into hero section
            if (hasScrolledAwayRef.current && videoRef.current) {
              hasScrolledAwayRef.current = false;
              videoRef.current.currentTime = 0;
              videoRef.current.play().then(() => {
                setIsPlaying(true);
                setIsVideoEnded(false);
              }).catch(() => {
                // Autoplay policy fallback
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative w-full group">
        {/* Ambient Natural Halo Glow behind the video card */}
        <div className="absolute -inset-3 bg-gradient-to-r from-[#0052a5]/25 via-[#f59e0b]/20 to-[#ea580c]/25 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

        {/* Outer Card Container with Natural Soft Border */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/70 shadow-2xl transition-all w-full">
          {/* Video Container (aspect-video 16:9 matching media content) */}
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* HTML5 Native Video Tag - Played once, stops on final logo */}
            <video
              ref={videoRef}
              poster="/Images/WhatsApp Image 2026-08-24 at 8.16.02 PM.jpeg"
              autoPlay
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onLoadedData={() => {
                setVideoLoaded(true);
                setVideoFailed(false);
              }}
              onError={() => {
                setVideoFailed(true);
              }}
              className="w-full h-full object-contain bg-black"
            >
              <source src="/Video/Creating_transition_video_from_f…_202608261828.mp4" type="video/mp4" />
              <source src="/transition.mp4" type="video/mp4" />
            </video>

            {/* Visual Animated Scene Overlay / Fallback Graphic (Only if video fails to load) */}
            {(!videoLoaded || videoFailed) && (
              <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-slate-950/90 to-slate-950 flex flex-col items-center justify-between p-6">
                {/* Visual Sun & Canyon Gorge Background Atmosphere */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-400/30 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-slate-800 rounded-tr-3xl" />
                  <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-slate-800 rounded-tl-3xl" />
                  <div className="absolute bottom-1/3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-400 via-amber-300 to-emerald-400 opacity-60" />
                </div>

                {/* Top Popped-Up Milestone Tag */}
                <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 shadow-md">
                  {storyMilestones[activeStoryStage].icon}
                  <span className="text-xs font-serif font-bold text-white">
                    {storyMilestones[activeStoryStage].label}
                  </span>
                </div>

                {/* Animated Bridge Nodes Graphic */}
                <div className="relative z-10 w-full max-w-sm flex items-center justify-between my-auto">
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-center shadow-lg">
                    <span className="text-[10px] text-rose-300 block font-semibold">CHAOS</span>
                    <span className="text-xs font-semibold text-white">Isolated Pains</span>
                  </div>

                  {/* Connecting Bridge Glow Line */}
                  <div className="flex-1 mx-3 relative flex items-center justify-center">
                    <div className="w-full h-0.5 bg-slate-700"></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-gradient-to-r from-rose-500 via-[#0052a5] to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_12px_#38bdf8]"
                      style={{ width: `${currentProgress}%` }}
                    />
                    <div className="absolute px-2 py-0.5 rounded-full bg-[#0052a5] text-[10px] font-semibold text-white shadow-md">
                      SETU / BRIDGE
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-center shadow-lg">
                    <span className="text-[10px] text-emerald-300 block font-semibold">SOLUTIONS</span>
                    <span className="text-xs font-semibold text-white">Verified Impact</span>
                  </div>
                </div>

                {/* Description at bottom of simulated view */}
                <div className="relative z-10 text-center max-w-md">
                  <p className="text-xs text-slate-300">
                    {storyMilestones[activeStoryStage].desc}
                  </p>
                </div>
              </div>
            )}

            {/* Minimal Play / Controls Bar on hover */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-30 flex items-center justify-between gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {/* Play / Pause / Restart */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Replay Video"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Scrubber */}
              <div className="flex-1 mx-2 relative h-1.5 bg-slate-800/80 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-[#0052a5] to-emerald-400 rounded-full transition-all"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>

              {/* Fullscreen Modal Toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Expand Cinema View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* THEATER FULLSCREEN MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-950 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0052a5] flex items-center justify-center text-white font-bold font-serif">
                  सेतु
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-white">
                    SamasyaSetu Logo Transition Story
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    How chaotic community problems transform into structured, collaborative solutions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <video
                poster="/Images/WhatsApp Image 2026-08-24 at 8.16.02 PM.jpeg"
                autoPlay
                controls
                className="w-full h-full object-contain"
              >
                <source src="/Video/Creating_transition_video_from_f…_202608261828.mp4" type="video/mp4" />
                <source src="/transition.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Story Takeaways Footer */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">1. Voice the Pain</strong>
                  Citizens submit raw problems without bureaucracy.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">2. Build the Bridge</strong>
                  AI extracts the root cause and creates engineering project pathways.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">3. Deploy Real Impact</strong>
                  Colleges build prototypes, sponsors fund scale, and government deploys.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
