import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { UniversityDashboard } from './components/university/UniversityDashboard';
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { GovernmentDashboard } from './components/government/GovernmentDashboard';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { ImpactPage } from './components/public/ImpactPage';
import { AboutPage } from './components/public/AboutPage';
import { ProblemSubmitModal } from './components/citizen/ProblemSubmitModal';
import { ProblemDetailModal } from './components/citizen/ProblemDetailModal';
import { FeedbackModal } from './components/citizen/FeedbackModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Problem } from './types';

const MainContent: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    publicTab,
    problems,
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    authIntendedAction,
    requireAuth
  } = useApp();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedProblemForDetail, setSelectedProblemForDetail] = useState<Problem | null>(null);
  const [selectedProblemForFeedback, setSelectedProblemForFeedback] = useState<Problem | null>(null);

  const handleOpenReportProblem = () => {
    requireAuth('report_problem', () => {
      setIsSubmitModalOpen(true);
    });
  };

  const handleSelectProblemById = (problemId: string) => {
    const found = problems.find(p => p.id === problemId);
    if (found) {
      setSelectedProblemForDetail(found);
    }
  };

  // Navigation Role Routing:
  // When browsing public pages (Home, How It Works, Impact, About), show the public view.
  // When inside a portal or authenticated dashboard, display that role's view.
  const effectiveRole = currentRole === 'public' ? 'public' : (currentUser ? currentUser.role : currentRole);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-[#0052a5] selection:text-white">
      <Navbar
        onOpenSubmitModal={handleOpenReportProblem}
        onRunPipeline={() => {
          if (currentRole !== 'public') {
            setCurrentRole('public');
          }
          setTimeout(() => {
            const el = document.getElementById('bridge-diagram-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <main className="flex-1">
        {effectiveRole === 'public' && (
          <>
            {publicTab === 'home' && (
              <LandingPage
                onOpenSubmitModal={handleOpenReportProblem}
                onSelectProblem={handleSelectProblemById}
              />
            )}
            {publicTab === 'how-it-works' && <HowItWorksPage />}
            {publicTab === 'impact' && <ImpactPage />}
            {publicTab === 'about' && <AboutPage />}
          </>
        )}

        {effectiveRole === 'citizen' && (
          <CitizenDashboard
            onOpenSubmitModal={handleOpenReportProblem}
            onOpenDetailModal={p => setSelectedProblemForDetail(p)}
            onOpenFeedbackModal={p => setSelectedProblemForFeedback(p)}
          />
        )}

        {effectiveRole === 'university' && <UniversityDashboard />}

        {effectiveRole === 'industry' && <IndustryDashboard />}

        {effectiveRole === 'government' && <GovernmentDashboard />}
      </main>

      <Footer />

      {/* Global Modals */}
      <ProblemSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={newId => {
          const created = problems.find(p => p.id === newId);
          if (created) {
            setSelectedProblemForDetail(created);
          }
        }}
      />

      <ProblemDetailModal
        problem={selectedProblemForDetail}
        isOpen={!!selectedProblemForDetail}
        onClose={() => setSelectedProblemForDetail(null)}
        onOpenFeedback={p => {
          setSelectedProblemForDetail(null);
          setSelectedProblemForFeedback(p);
        }}
      />

      <FeedbackModal
        problem={selectedProblemForFeedback}
        isOpen={!!selectedProblemForFeedback}
        onClose={() => setSelectedProblemForFeedback(null)}
      />

      {isAdminPortalOpen && (
        <AdminPortal
          onClose={() => setIsAdminPortalOpen(false)}
        />
      )}

      {/* Authentication & Onboarding Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        intendedAction={authIntendedAction}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
