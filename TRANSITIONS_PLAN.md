# 🎨 PLAN: Voice Recording + Beautiful Transitions

## PHASE 1: Voice Recording in Simple Report Form
**Location:** `src/components/citizen/CitizenDashboard.tsx` (the form shown in screenshot)

**Add:**
- Voice recording input alongside "Photo Evidence"
- Start/Stop/Play/Remove controls
- Display file size
- Attach to form submission

**Implementation:** 10 mins

---

## PHASE 2: Beautiful Transitions Throughout Website

### Animations to Add:

**1. Fade-In Animations**
- Page load fades in content
- Modal slides in from center
- Cards fade in on scroll

**2. Slide Transitions**
- Navbar slides down on load
- Sections slide in from left/right
- Form inputs slide up

**3. Hover Effects**
- Buttons scale up (1.05x)
- Cards lift on hover (shadow increase)
- Icons rotate/bounce

**4. Scale & Pop Animations**
- Success messages pop in
- Track A/B/C cards scale on load
- Badges pulse

**5. Scroll Animations**
- Hero section parallax
- Cards stagger animation
- Progress indicators animate

### Files to Update:
- `src/index.css` - Add @keyframes
- `src/components/landing/LandingPage.tsx` - Hero animations
- `src/components/public/HowItWorksPage.tsx` - Card stagger
- `src/components/citizen/CitizenDashboard.tsx` - Form animations
- `src/components/government/GovernmentTriageDesk.tsx` - Card animations
- `src/components/layout/Navbar.tsx` - Nav animations
- All modals - Slide/fade in

**Implementation:** 45 mins

---

## Total Time: ~55 minutes
