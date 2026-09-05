export type Language = 'en' | 'hi';

export interface TranslationItem {
  en: string;
  hi: string;
}

export const translations: Record<string, TranslationItem> = {
  // ==========================================
  // NAVBAR & GLOBAL HEADER
  // ==========================================
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.howItWorks': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'nav.impact': { en: 'Impact', hi: 'प्रभाव' },
  'nav.about': { en: 'About', hi: 'परिचय' },
  'nav.reportProblem': { en: 'Report a Problem', hi: 'समस्या दर्ज करें' },
  'nav.login': { en: 'Log In', hi: 'लॉग इन' },
  'nav.logout': { en: 'Log Out', hi: 'लॉग आउट' },
  'nav.myPortal': { en: 'My Portal', hi: 'मेरा पोर्टल' },
  'nav.citizenPortal': { en: 'Citizen Portal', hi: 'नागरिक पोर्टल' },
  'nav.govtPortal': { en: 'Government Portal', hi: 'सरकारी पोर्टल' },
  'nav.univPortal': { en: 'University Portal', hi: 'विश्वविद्यालय पोर्टल' },
  'nav.industryPortal': { en: 'Industry Portal', hi: 'उद्योग पोर्टल' },
  'nav.switchLang': { en: 'हिंदी', hi: 'English' },
  'nav.currentLangLabel': { en: 'EN', hi: 'हिं' },
  'nav.portalSubtitle': { en: 'Societal Innovation Portal', hi: 'सामाजिक जन नवाचार पोर्टल' },
  'nav.enterPortal': { en: 'Enter Portal', hi: 'पोर्टल में प्रवेश करें' },
  'nav.signOut': { en: 'Sign Out', hi: 'लॉग आउट' },
  'nav.activeAccount': { en: 'Active Account', hi: 'सक्रिय खाता' },
  'nav.inPortal': { en: 'In Portal', hi: 'पोर्टल में' },
  'nav.browsingWebsite': { en: 'Browsing Website', hi: 'वेबसाइट देख रहे हैं' },
  'nav.goToPortal': { en: 'Go to', hi: 'जाएं' },
  'nav.loginWithKey': { en: 'Login with Role or Institutional Key', hi: 'भूमिका या संस्थागत कुंजी से लॉगिन करें' },
  'nav.languagePrompt': { en: 'Language / भाषा:', hi: 'भाषा / Language:' },

  // ==========================================
  // FOOTER
  // ==========================================
  'footer.brandDesc': {
    en: 'Connecting community and panchayat challenges across all 24 districts of Jharkhand with Higher Education Institutions (HEIs), industry/CSR partners, and state departments under NEP 2020.',
    hi: 'झारखंड के सभी 24 जिलों में जमीनी व पंचायत स्तर की समस्याओं को उच्च शिक्षण संस्थानों (HEI), सीएसआर उद्योग साझेदारों और सरकारी विभागों से एनईपी 2020 के तहत सीधे जोड़ता है।'
  },
  'footer.explorePortals': { en: 'Explore Portals', hi: 'पोर्टल देखें' },
  'footer.thematicDomains': { en: 'Thematic Domains', hi: 'प्रमुख कार्यक्षेत्र' },
  'footer.domainWater': { en: 'Water Resources & Fluoride Removal', hi: 'जल संसाधन एवं फ्लोराइड निवारण' },
  'footer.domainLivelihoods': { en: 'Rural Livelihoods & Forest Produce', hi: 'ग्रामीण आजीविका व वनोपज संवर्धन' },
  'footer.domainAgri': { en: 'Agriculture & Solar Irrigation', hi: 'कृषि एवं सौर सूक्ष्म सिंचाई' },
  'footer.domainMining': { en: 'Mining Clean Air & Dust Suppression', hi: 'खनन क्षेत्र स्वच्छ वायु व धूल रोकथाम' },
  'footer.domainHealth': { en: 'Public Healthcare & Cold-Chain Storage', hi: 'सार्वजनिक स्वास्थ्य एवं कोल्ड-चेन वैक्सीन' },
  'footer.domainEnergy': { en: 'Clean Energy & Village Connectivity', hi: 'स्वच्छ ऊर्जा एवं ग्रामीण संपर्क मार्ग' },
  'footer.nepFramework': { en: 'NEP 2020 Framework', hi: 'एनईपी 2020 रूपरेखा' },
  'footer.nepExperiential': { en: 'Experiential HEI Research', hi: 'व्यावहारिक कॉलेज अनुसंधान' },
  'footer.nepDesc': {
    en: 'Transforms real village problems into credit-bearing student capstone projects.',
    hi: 'वास्तविक स्थानीय समस्याओं को छात्रों के व्यावहारिक प्रोजेक्ट और शोध में बदलता है।'
  },
  'footer.rights': {
    en: 'SamasyaSetu Jharkhand · Role-Governed Access · Secure Public-Academic-CSR Collaborative Pipeline',
    hi: 'समस्यासेतु झारखंड · सुरक्षित भूमिका-आधारित पहुंच · जन, कॉलेज एवं उद्योग सहयोग प्रणाली'
  },

  // ==========================================
  // 1. LANDING PAGE
  // ==========================================
  'landing.portalBadge': {
    en: 'Jharkhand Civic Innovation Portal',
    hi: 'झारखंड जन नवाचार पोर्टल'
  },
  'landing.heroTitlePre': {
    en: 'Every local problem deserves a ',
    hi: 'हर स्थानीय समस्या को चाहिए '
  },
  'landing.heroTitleBridge': {
    en: 'direct bridge',
    hi: 'एक मजबूत सेतु'
  },
  'landing.heroTitlePost': {
    en: ' to a real solution.',
    hi: ' असली समाधान तक।'
  },
  'landing.heroSubtitle': {
    en: 'We connect neighborhood problems with university research labs, CSR funding, and government teams across Jharkhand.',
    hi: 'हम पूरे झारखंड में जमीनी समस्याओं को कॉलेज रिसर्च लैब, सीएसआर फंड और सरकारी टीमों से सीधे जोड़ते हैं।'
  },
  'landing.reportProblemBtn': {
    en: 'Report a Ground Problem',
    hi: 'समस्या दर्ज करें'
  },
  'landing.selectWorkspaceBtn': {
    en: 'Choose Your Portal',
    hi: 'अपना पोर्टल चुनें'
  },
  'landing.districtsBadge': {
    en: '24 Districts Covered',
    hi: 'सभी 24 जिले शामिल'
  },
  'landing.aiTriageBadge': {
    en: 'Smart Problem Sorting',
    hi: 'स्मार्ट समस्या छंटाई'
  },
  'landing.nepBadge': {
    en: 'College R&D Projects',
    hi: 'कॉलेज आर एंड डी प्रोजेक्ट'
  },
  'landing.scrollPrompt': {
    en: 'Scroll down to log in to your portal',
    hi: 'पोर्टल लॉगिन के लिए नीचे स्क्रॉल करें'
  },
  'landing.workspaceHeading': {
    en: 'Log in to your workspace',
    hi: 'अपने पोर्टल में लॉग इन करें'
  },
  'landing.workspaceSubtitle': {
    en: 'Select your role to continue',
    hi: 'आगे बढ़ने के लिए अपनी भूमिका चुनें'
  },
  'landing.loggedInAs': {
    en: 'Logged in as',
    hi: 'लॉग इन किया हुआ है'
  },
  'landing.activePill': {
    en: 'ACTIVE',
    hi: 'सक्रिय'
  },
  'landing.citizenTitle': {
    en: 'Citizen',
    hi: 'नागरिक'
  },
  'landing.citizenTag': {
    en: 'COMMUNITY & PUBLIC',
    hi: 'जनता और समुदाय'
  },
  'landing.citizenDesc': {
    en: 'Report local problems with photos. Track ground updates until work is finished.',
    hi: 'फोटो के साथ इलाके की समस्या बताएं। काम पूरा होने तक हर अपडेट देखें।'
  },
  'landing.citizenAction': {
    en: 'Log in as Citizen',
    hi: 'नागरिक के रूप में लॉगिन करें'
  },
  'landing.citizenActiveAction': {
    en: 'Open Citizen Portal',
    hi: 'नागरिक पोर्टल खोलें'
  },
  'landing.govtTitle': {
    en: 'Government',
    hi: 'सरकार'
  },
  'landing.govtTag': {
    en: 'STATE & ADMINISTRATION',
    hi: 'राज्य और प्रशासन'
  },
  'landing.govtDesc': {
    en: 'Review issues, assign civic teams, and track resolution deadlines across departments.',
    hi: 'समस्याओं की जांच करें, सरकारी टीमों को सौंपें और समय पर समाधान ट्रैक करें।'
  },
  'landing.govtAction': {
    en: 'Log in as Government',
    hi: 'सरकार के रूप में लॉगिन करें'
  },
  'landing.govtActiveAction': {
    en: 'Open Government Portal',
    hi: 'सरकारी पोर्टल खोलें'
  },
  'landing.univTitle': {
    en: 'University',
    hi: 'विश्वविद्यालय'
  },
  'landing.univTag': {
    en: 'COLLEGE & R&D LABS',
    hi: 'कॉलेज और अनुसंधान लैब'
  },
  'landing.univDesc': {
    en: 'Build working models for tough problems and guide student research teams.',
    hi: 'कठिन चुनौतियों के लिए मॉडल बनाएं और छात्र अनुसंधान टीमों का मार्गदर्शन करें।'
  },
  'landing.univAction': {
    en: 'Log in as University',
    hi: 'विश्वविद्यालय के रूप में लॉगिन करें'
  },
  'landing.univActiveAction': {
    en: 'Open University Portal',
    hi: 'विश्वविद्यालय पोर्टल खोलें'
  },
  'landing.industryTitle': {
    en: 'Industry',
    hi: 'उद्योग'
  },
  'landing.industryTag': {
    en: 'CSR & SPONSORS',
    hi: 'सीएसआर और प्रायोजक'
  },
  'landing.industryDesc': {
    en: 'Fund proven student solutions and deploy social welfare projects through CSR.',
    hi: 'छात्रों के सफल समाधानों को फंड करें और सीएसआर से सामाजिक प्रोजेक्ट लागू करें।'
  },
  'landing.industryAction': {
    en: 'Log in as Industry',
    hi: 'उद्योग के रूप में लॉगिन करें'
  },
  'landing.industryActiveAction': {
    en: 'Open Industry Portal',
    hi: 'उद्योग पोर्टल खोलें'
  },
  'landing.footerAssurance': {
    en: 'SamasyaSetu Jharkhand · Role-Governed Access · Secure Public-Academic-CSR Collaborative Pipeline',
    hi: 'समस्यासेतु झारखंड · सुरक्षित भूमिका-आधारित पहुंच · जन, कॉलेज एवं उद्योग सहयोग प्रणाली'
  },

  // ==========================================
  // INTERACTIVE BRIDGE (समस्या -> समाधान)
  // ==========================================
  'bridge.title': {
    en: 'Interactive Problem-to-Solution Suspension Bridge',
    hi: 'समस्या से समाधान तक का संवादात्मक सेतु'
  },
  'bridge.subtitle': {
    en: 'Watch how an unaddressed village issue travels across departments, college labs, and CSR funding to become a verified reality.',
    hi: 'देखें कैसे एक अनसुलझी ग्रामीण समस्या सरकारी विभागों, कॉलेज लैब और सीएसआर फंड से गुजरकर एक ठोस समाधान बनती है।'
  },
  'bridge.simulateBtn': {
    en: 'Simulate Pipeline',
    hi: 'पाइपलाइन चलाएं'
  },
  'bridge.resetBtn': {
    en: 'Reset',
    hi: 'रीसेट करें'
  },
  'bridge.explorePortalBtn': {
    en: 'Explore Portal',
    hi: 'पोर्टल में देखें'
  },
  'bridge.node1_label': { en: 'CITIZEN & PRI', hi: 'नागरिक व पंचायत' },
  'bridge.node1_title': { en: 'Panchayat & Citizen Submissions', hi: 'पंचायत व नागरिक रिपोर्ट' },
  'bridge.node1_desc': {
    en: 'Citizens, Mukhiyas, and SHG leaders report unaddressed challenges across Jharkhand blocks in simple language, audio notes, or geotagged photos.',
    hi: 'नागरिक, मुखिया और स्वयं सहायता समूह अपनी क्षेत्रीय समस्याओं को सरल भाषा, ऑडियो या फोटो के माध्यम से दर्ज करते हैं।'
  },
  'bridge.node2_label': { en: 'SMART TRIAGE', hi: 'स्मार्ट छंटाई' },
  'bridge.node2_title': { en: 'Root Cause & Technical Assessment', hi: 'मूल कारण एवं तकनीकी विश्लेषण' },
  'bridge.node2_desc': {
    en: 'Identifies the technical requirements, project feasibility, and whether it requires routine repair or scientific research.',
    hi: 'तकनीकी जरूरतों का विश्लेषण करता है कि समस्या सामान्य मरम्मत से हल होगी या कॉलेज अनुसंधान की आवश्यकता है।'
  },
  'bridge.node3_label': { en: 'NEED GROUPING', hi: 'सामूहिक जरूरत' },
  'bridge.node3_title': { en: 'Connecting Related Community Needs', hi: 'समान समस्याओं का एकीकरण' },
  'bridge.node3_desc': {
    en: 'Groups similar reports across districts into unified, high-impact regional challenges so solutions can be built and scaled efficiently.',
    hi: 'विभिन्न जिलों की समान समस्याओं को एक साथ जोड़ता है ताकि एक ही समाधान से हजारों लोगों को लाभ मिल सके।'
  },
  'bridge.node4_label': { en: 'COLLEGE LABS', hi: 'कॉलेज लैब' },
  'bridge.node4_title': { en: 'Multidisciplinary HEI R&D', hi: 'उच्च शिक्षण संस्थानों में शोध' },
  'bridge.node4_desc': {
    en: 'Matched to premier state institutes like BIT Mesra, IIT (ISM) Dhanbad, NIT Jamshedpur, and BAU Ranchi for student prototypes.',
    hi: 'बीआईटी मेसरा, आईआईटी धनबाद, एनआईटी जमशेदपुर जैसे प्रमुख संस्थानों के छात्र और प्रोफेसर प्रोटोटाइप तैयार करते हैं।'
  },
  'bridge.node5_label': { en: 'INDUSTRY CSR', hi: 'उद्योग सीएसआर' },
  'bridge.node5_title': { en: 'CSR Grant Underwriting', hi: 'सीएसआर अनुदान व प्रायोजन' },
  'bridge.node5_desc': {
    en: 'Major companies provide capital grants under Section 135 to scale and field-test validated prototypes.',
    hi: 'टाटा स्टील, कोल इंडिया जैसी प्रमुख कंपनियां सीएसआर फंड के तहत समाधान के परीक्षण और निर्माण का खर्च वहन करती हैं।'
  },
  'bridge.node6_label': { en: 'FIELD TRIAL', hi: 'फील्ड ट्रायल' },
  'bridge.node6_title': { en: 'Local Ward Deployment', hi: 'स्थानीय वार्ड में स्थापना' },
  'bridge.node6_desc': {
    en: 'Hardware is installed on-site with district administration and monitored with telemetry and regular check-ups.',
    hi: 'जिला प्रशासन की देखरेख में उपकरण को गांव में लगाया जाता है और उसके कामकाज पर नजर रखी जाती है।'
  },
  'bridge.node7_label': { en: 'CITIZEN AUDIT', hi: 'नागरिक सत्यापन' },
  'bridge.node7_title': { en: 'Verified Community Results', hi: 'सत्यापित जन परिणाम' },
  'bridge.node7_desc': {
    en: 'Villagers inspect the finished repair or installed tech, giving star ratings and photo confirmation before ticket closure.',
    hi: 'स्थानीय निवासी काम पूरा होने पर फोटो और स्टार रेटिंग देकर पुष्टि करते हैं, तभी समाधान को अंतिम रूप दिया जाता है।'
  },

  // ==========================================
  // FLOW DIAGRAM (8 STAGES)
  // ==========================================
  'flow.title': {
    en: '8-Stage Lifecycle: From Village Voice to Working Reality',
    hi: '8-चरणीय चक्र: गांव की आवाज से सफल समाधान तक'
  },
  'flow.subtitle': {
    en: 'Every stage is recorded, assigned to accountable teams, and publicly verified.',
    hi: 'प्रत्येक चरण पारदर्शी है, जिम्मेदार टीम को सौंपा जाता है और जनता द्वारा सत्यापित होता है।'
  },
  'flow.inputLabel': { en: 'Input', hi: 'इनपुट' },
  'flow.actionLabel': { en: 'System Action', hi: 'प्रणाली कार्रवाई' },
  'flow.outputLabel': { en: 'Output', hi: 'परिणाम' },
  'flow.exampleLabel': { en: 'Live Example', hi: 'वास्तविक उदाहरण' },

  // ==========================================
  // 2. HOW IT WORKS PAGE
  // ==========================================
  'howItWorks.badge': {
    en: 'Simple 2-Track System for Jharkhand',
    hi: 'झारखंड के लिए सरल 2-ट्रैक प्रणाली'
  },
  'howItWorks.title': {
    en: 'How SamasyaSetu Works',
    hi: 'समस्यासेतु कैसे काम करता है'
  },
  'howItWorks.subtitle': {
    en: 'We send routine repairs to city teams and send hard scientific problems to college research labs.',
    hi: 'हम सामान्य मरम्मत कार्य नगर निगम को भेजते हैं और जटिल वैज्ञानिक समस्याएं कॉलेज रिसर्च लैब को देते हैं।'
  },
  'howItWorks.districtsFact': {
    en: 'All 24 Districts: From Ranchi to Sahibganj & Palamu',
    hi: 'सभी 24 जिले: रांची से लेकर साहिबगंज और पलामू तक'
  },
  'howItWorks.civicFact': {
    en: 'Municipal Work: MBMC & PWD for city repairs',
    hi: 'नगर निगम कार्य: शहरी मरम्मत हेतु रांची निगम एवं पथ निर्माण विभाग'
  },
  'howItWorks.labsFact': {
    en: 'College Labs: BIT Mesra, NIT & IIT (ISM) for science',
    hi: 'कॉलेज लैब: वैज्ञानिक समाधान हेतु बीआईटी मेसरा, एनआईटी एवं आईआईटी धनबाद'
  },
  'howItWorks.stepSectionTitle': {
    en: 'From Ground Problem to Finished Solution',
    hi: 'जमीनी समस्या से लेकर पूर्ण समाधान तक'
  },
  'howItWorks.stepSectionSub': {
    en: 'Every step is open and verified. No lost paperwork, no forgotten complaints.',
    hi: 'प्रत्येक चरण पारदर्शी और सत्यापित है। कोई कागजी देरी नहीं, कोई भूली हुई शिकायत नहीं।'
  },
  'howItWorks.step1_title': {
    en: '1. Citizen Reports an Issue',
    hi: '1. नागरिक समस्या दर्ज करते हैं'
  },
  'howItWorks.step1_desc': {
    en: 'A resident takes a photo and submits details about the problem in their village or ward.',
    hi: 'निवासी फोटो खींचकर अपने गांव या वार्ड की समस्या की जानकारी पोर्टल पर डालते हैं।'
  },
  'howItWorks.step2_title': {
    en: '2. Smart Verification & Triage',
    hi: '2. स्मार्ट जांच और छंटाई'
  },
  'howItWorks.step2_desc': {
    en: 'The system tags location and seriousness, then groups related problems together.',
    hi: 'सिस्टम स्थान और गंभीरता की जांच कर एक जैसी समस्याओं का समूह बनाता है।'
  },
  'howItWorks.step3_title': {
    en: '3. Government Review',
    hi: '3. सरकारी समीक्षा'
  },
  'howItWorks.step3_desc': {
    en: 'District officers assign the work to local civic bodies or send it to university research teams.',
    hi: 'जिला अधिकारी तय करते हैं कि काम स्थानीय नगर निगम करेगा या अनुसंधान के लिए कॉलेज को भेजा जाएगा।'
  },
  'howItWorks.step4_title': {
    en: '4. Lab Solutions & CSR Funding',
    hi: '4. लैब में समाधान और सीएसआर फंड'
  },
  'howItWorks.step4_desc': {
    en: 'Professors and students build a prototype. Industry partners fund field trials.',
    hi: 'प्रोफेसर और छात्र मॉडल तैयार करते हैं। उद्योग साझीदार फील्ड ट्रायल के लिए फंड देते हैं।'
  },
  'howItWorks.step5_title': {
    en: '5. Field Deployment & Feedback',
    hi: '5. फील्ड में काम और नागरिक फीडबैक'
  },
  'howItWorks.step5_desc': {
    en: 'The solution is set up on the ground. Citizens confirm the repair with photos and ratings.',
    hi: 'समाधान जमीन पर लागू होता है। नागरिक फोटो और रेटिंग देकर पुष्टि करते हैं कि काम पूरा हुआ।'
  },
  'howItWorks.trackA_title': {
    en: 'Track A: Routine Civic Work',
    hi: 'ट्रैक A: सामान्य नागरिक कार्य'
  },
  'howItWorks.trackA_desc': {
    en: 'Standard civic fixes handled directly by departments like MBMC, DWSD, and PWD within strict deadlines.',
    hi: 'सड़क, नाली और पानी जैसी सामान्य समस्याओं को संबंधित सरकारी विभाग सीधे समय सीमा में ठीक करते हैं।'
  },
  'howItWorks.trackB_title': {
    en: 'Track B: University Research & CSR',
    hi: 'ट्रैक B: विश्वविद्यालय अनुसंधान और सीएसआर'
  },
  'howItWorks.trackB_desc': {
    en: 'Complex issues like fluoride water or mine dust go to engineering colleges for prototypes, funded by CSR.',
    hi: 'फ्लोराइड पानी या खदान धूल जैसी जटिल समस्याओं पर इंजीनियरिंग कॉलेज समाधान बनाते हैं, जिन्हें कंपनियां फंड करती हैं।'
  },
  'howItWorks.stepSectionTag': { en: 'Step-by-Step Flow', hi: 'चरणबद्ध प्रक्रिया' },
  'howItWorks.step1_tag': { en: 'Step 1', hi: 'चरण 1' },
  'howItWorks.step1_sub1': { en: 'Simple mobile form with photo upload', hi: 'फोटो अपलोड के साथ सरल मोबाइल फॉर्म' },
  'howItWorks.step1_sub2': { en: 'Instant tracking ID provided', hi: 'तुरंत ट्रैकिंग आईडी उपलब्ध' },
  'howItWorks.step2_tag': { en: 'Step 2', hi: 'चरण 2' },
  'howItWorks.step2_sub1': { en: 'Track A: Civic / MBMC Repair', hi: 'ट्रैक A: नागरिक / नगर निगम मरम्मत' },
  'howItWorks.step2_sub2': { en: 'Track B: University Lab R&D', hi: 'ट्रैक B: विश्वविद्यालय लैब शोध' },
  'howItWorks.step3_tag': { en: 'Step 3', hi: 'चरण 3' },
  'howItWorks.step3_sub1': { en: 'Named officer or lead faculty assigned', hi: 'नामित अधिकारी या प्रमुख संकाय नियुक्त' },
  'howItWorks.step3_sub2': { en: 'Direct phone and email contact visible', hi: 'सीधा फोन और ईमेल संपर्क उपलब्ध' },
  'howItWorks.step4_tag': { en: 'Step 4', hi: 'चरण 4' },
  'howItWorks.step4_sub1': { en: 'Live progress tracker (0% to 100%)', hi: 'लाइव प्रगति ट्रैकर (0% से 100%)' },
  'howItWorks.step4_sub2': { en: 'Citizen star rating and sign-off', hi: 'नागरिक स्टार रेटिंग और स्वीकृति' },
  'howItWorks.compTag': { en: 'Clear Separation', hi: 'स्पष्ट विभाजन' },
  'howItWorks.compTitle': { en: 'Understanding the Two Tracks', hi: 'दोनों ट्रैकों को समझें' },
  'howItWorks.compSub': { en: 'Why two tracks? Routine repairs need fast civic action. Deep scientific issues need university laboratories.', hi: 'दो ट्रैक क्यों? सामान्य मरम्मत के लिए त्वरित नागरिक कार्रवाई चाहिए, जबकि जटिल वैज्ञानिक समस्याओं के लिए विश्वविद्यालय लैब।' },
  'howItWorks.trackA_handler': { en: 'Handled by MBMC, PWD, and Jal Board', hi: 'नगर निगम (MBMC), पथ निर्माण व पेयजल विभाग द्वारा संचालित' },
  'howItWorks.realExamples': { en: 'Real Examples in Jharkhand:', hi: 'झारखंड में वास्तविक उदाहरण:' },
  'howItWorks.exA1_lead': { en: 'Burst water pipe in Kantatoli, Ranchi:', hi: 'कांटाटोली, रांची में फटी पानी की पाइप:' },
  'howItWorks.exA1_body': { en: 'Broken iron line flooded the road. Municipal crew dispatched to fix the pipe.', hi: 'टूटी लोहे की लाइन से सड़क जलमग्न हो गई थी। मरम्मत हेतु नगर निगम टीम भेजी गई।' },
  'howItWorks.exA2_lead': { en: 'Blocked drain in Harmu Ward 26, Ranchi:', hi: 'हरमू वार्ड 26, रांची में जाम नाली:' },
  'howItWorks.exA2_body': { en: 'Silt caused dirty water to back up. Drain jetting machine cleared the blockage.', hi: 'गाद के कारण गंदा पानी भर रहा था। जेटिंग मशीन से नाली साफ की गई।' },
  'howItWorks.exA3_lead': { en: 'Broken road culvert in Bero block:', hi: 'बेड़ो प्रखंड में टूटा पुलिया/कल्वर्ट:' },
  'howItWorks.exA3_body': { en: 'Farmers could not reach the highway. PWD replaced the cracked concrete slab.', hi: 'किसान मुख्य सड़क तक नहीं पहुंच पा रहे थे। पथ निर्माण विभाग ने स्लैब बदला।' },
  'howItWorks.trackA_meta1': { en: 'Executive Engineer assigned with direct phone contact', hi: 'कार्यपालक अभियंता सीधे फोन संपर्क के साथ नियुक्त' },
  'howItWorks.trackA_meta2': { en: 'Resolution target: 3 to 14 business days', hi: 'समाधान लक्ष्य: 3 से 14 कार्य दिवस' },
  'howItWorks.trackB_handler': { en: 'Handled by BIT Mesra, NIT Jamshedpur & IIT (ISM) Dhanbad', hi: 'बीआईटी मेसरा, एनआईटी जमशेदपुर और आईआईटी धनबाद द्वारा संचालित' },
  'howItWorks.exB1_lead': { en: 'Fluoride in Silli, Ranchi:', hi: 'सिल्ली, रांची में फ्लोराइड समस्या:' },
  'howItWorks.exB1_body': { en: '3.2 mg/L fluoride deformed joints. BIT Mesra built affordable clay filtration media.', hi: '3.2 मिलीग्राम/लीटर फ्लोराइड से जोड़ों में विकृति। बीआईटी मेसरा ने मिट्टी आधारित फिल्टर तैयार किया।' },
  'howItWorks.exB2_lead': { en: 'Arsenic in Sahibganj wells:', hi: 'साहिबगंज के कुओं में आर्सेनिक:' },
  'howItWorks.exB2_body': { en: 'Deep wells contained poison. University chemical teams tested natural biochar filters.', hi: 'गहरे कुओं में जहरीला तत्व था। रसायन विभाग की टीम ने बायोचार फिल्टर का परीक्षण किया।' },
  'howItWorks.exB3_lead': { en: 'Vaccine storage in West Singhbhum:', hi: 'पश्चिमी सिंहभूम में वैक्सीन भंडारण:' },
  'howItWorks.exB3_body': { en: 'Forest clinics had no power. NIT engineers built solar thermal coolers.', hi: 'जंगल के स्वास्थ्य केंद्रों में बिजली नहीं थी। एनआईटी इंजीनियरों ने सोलर थर्मल कूलर बनाया।' },
  'howItWorks.trackB_meta1': { en: 'Students build capstone graduation prototypes', hi: 'छात्र अपने अंतिम वर्ष के शोध में प्रोटोटाइप तैयार करते हैं' },
  'howItWorks.trackB_meta2': { en: 'Funded by corporate CSR grants (Tata Steel, Coal India, SAIL)', hi: 'सीएसआर अनुदान (टाटा स्टील, कोल इंडिया, सेल) द्वारा वित्तपोषित' },
  'howItWorks.ctaBadge': { en: 'Authorized Portal Access', hi: 'अधिकृत पोर्टल पहुंच' },
  'howItWorks.ctaTitle': { en: 'Ready to Take Action?', hi: 'क्या आप कार्रवाई के लिए तैयार हैं?' },
  'howItWorks.ctaDesc': { en: 'Citizens can report ground problems anytime without fees. Government officers and university labs log in with authorized passkeys to manage solutions.', hi: 'नागरिक बिना किसी शुल्क के कभी भी समस्याएं दर्ज कर सकते हैं। सरकारी अधिकारी और विश्वविद्यालय लैब समाधान प्रबंधित करने हेतु पासकी से लॉगिन करते हैं।' },

  // ==========================================
  // 3. ABOUT PAGE
  // ==========================================
  'about.badge': {
    en: 'Jharkhand Public Innovation Initiative',
    hi: 'झारखंड जन नवाचार पहल'
  },
  'about.title': {
    en: 'About SamasyaSetu',
    hi: 'समस्यासेतु का परिचय'
  },
  'about.lead': {
    en: 'SamasyaSetu (Problem-to-Solution Bridge) is a state initiative designed to bridge the gap between grassroots citizens in Jharkhand and the real institutions that can fix their problems.',
    hi: 'समस्यासेतु (समस्या से समाधान का पुल) झारखंड में आम नागरिकों और उनकी समस्याओं को हल करने वाले सक्षम संस्थानों के बीच की दूरी पाटने की राज्य पहल है।'
  },
  'about.summaryBox': {
    en: 'Instead of complaints disappearing into a paper file, SamasyaSetu gives every citizen a direct link to both Municipal repair teams (like MBMC and PWD) for routine fixes and premier college research labs (like BIT Mesra and IIT ISM Dhanbad) for tough technological challenges.',
    hi: 'कागजी फाइलों में शिकायतें खो जाने के बजाय, समस्यासेतु हर नागरिक को सामान्य मरम्मत हेतु नगर निगम (MBMC व PWD) और जटिल चुनौतियों हेतु शीर्ष कॉलेज लैब (BIT मेसरा व IIT धनबाद) से सीधे जोड़ता है।'
  },
  'about.contextBadge': {
    en: 'Regional Context',
    hi: 'क्षेत्रीय संदर्भ'
  },
  'about.contextTitle': {
    en: "The Background: Challenges Across Jharkhand's 24 Districts",
    hi: 'पृष्ठभूमि: झारखंड के 24 जिलों की प्रमुख चुनौतियां'
  },
  'about.contextSub': {
    en: "Jharkhand is blessed with rich natural beauty, dense sal forests, fertile plateaus, and India's greatest mineral wealth. However, families and panchayats across its 24 districts face real, chronic challenges in their everyday lives:",
    hi: 'झारखंड प्राकृतिक संपदा, घने जंगलों और विशाल खनिज भंडार से समृद्ध है। फिर भी इसके 24 जिलों के ग्रामीण व शहरी क्षेत्रों में नागरिक कई दीर्घकालिक समस्याओं से जूझते हैं:'
  },
  'about.ch1_title': { en: 'Toxic Water Contamination', hi: 'दूषित भूजल एवं फ्लोराइड' },
  'about.ch1_loc': { en: 'Ranchi, Palamu, Dumka, Sahibganj', hi: 'रांची, पलामू, दुमका, साहिबगंज' },
  'about.ch1_desc': {
    en: 'Villages in Silli (Ranchi) and Palamu suffer from dangerous groundwater fluoride causing skeletal deformities. Hamlets along the Ganga in Sahibganj face arsenic poisoning from deep tubewells.',
    hi: 'सिल्ली (रांची) और पलामू के गांवों में फ्लोराइड युक्त पानी से हड्डियों की बीमारी होती है, वहीं साहिबगंज में गंगा किनारे गहरे चापाकलों में आर्सेनिक की समस्या है।'
  },
  'about.ch2_title': { en: 'Coal Mining Dust & Smog', hi: 'कोयला खनन धूल व वायु प्रदूषण' },
  'about.ch2_loc': { en: 'Dhanbad, Bokaro, Ramgarh', hi: 'धनबाद, बोकारो, रामगढ़' },
  'about.ch2_desc': {
    en: 'Open-cast coal mines and heavy coal hauling create massive clouds of silica and coal dust, leading to respiratory illnesses and asthma in schools and residential areas.',
    hi: 'ओपन-कास्ट कोयला खदानों और भारी ट्रकों की आवाजाही से उड़ने वाली धूल से आवासीय इलाकों और स्कूलों में दमा व सांस की बीमारियां फैलती हैं।'
  },
  'about.ch3_title': { en: 'Vaccine Cold-Chain in Forests', hi: 'घने जंगलों में वैक्सीन सुरक्षा' },
  'about.ch3_loc': { en: 'West Singhbhum (Saranda), Latehar, Gumla', hi: 'पश्चिमी सिंहभूम (सारंडा), लातेहार, गुमला' },
  'about.ch3_desc': {
    en: 'Primary healthcare centres inside deep forest belts suffer from multi-day power outages, causing essential snakebite anti-venom and infant vaccines to spoil.',
    hi: 'सारंडा जैसे घने जंगलों में बिजली कटने के कारण प्राथमिक स्वास्थ्य केंद्रों में सर्पदंश की दवाइयां और बच्चों के टीके खराब हो जाते हैं।'
  },
  'about.ch4_title': { en: 'Urban Drainage & Clean Water', hi: 'शहरी जल निकासी व पाइपलाइन' },
  'about.ch4_loc': { en: 'Ranchi (MBMC), Jamshedpur, Deoghar', hi: 'रांची, जमशेदपुर, देवघर' },
  'about.ch4_desc': {
    en: 'Urban wards struggle with choked stormwater drains (such as the Harmu basin in Ranchi) and burst ductile iron water pipes wasting thousands of liters of drinking water.',
    hi: 'हरमू नदी जैसे शहरी नालों के जाम होने और मुख्य पेयजल पाइपलाइनों के टूटने से हजारों लीटर पीने का पानी बर्बाद होता है।'
  },
  'about.ch5_title': { en: 'Farmer Post-Harvest Losses', hi: 'किसानों का फसल नुकसान' },
  'about.ch5_loc': { en: 'Bero Mandi (Ranchi), East Singhbhum, Khunti', hi: 'बेड़ो मंडी (रांची), पूर्वी सिंहभूम, खूंटी' },
  'about.ch5_desc': {
    en: 'Tribal farmers and vegetable growers lose up to 40% of their harvest due to zero affordable local cooling or drying storage near village weekly haats.',
    hi: 'स्थानीय हाट-बाजारों के पास उचित शीतगृह (कोल्ड स्टोरेज) न होने से आदिवासी व सब्जी उत्पादक किसानों की 40% फसल सड़ जाती है।'
  },
  'about.ch6_title': { en: 'Rural Connectivity Cuts', hi: 'ग्रामीण संपर्क व पुलिया क्षति' },
  'about.ch6_loc': { en: 'Giridih, Simdega, Godda, Garhwa', hi: 'गिरिडीह, सिमडेगा, गोड्डा, गढ़वा' },
  'about.ch6_desc': {
    en: 'Monsoon washouts and cracked culverts isolate entire panchayats from emergency ambulances, schools, and central district markets.',
    hi: 'मानसून में पुलिया बह जाने और कच्ची सड़कों के कट जाने से पूरी पंचायत एम्बुलेंस, स्कूल और मुख्य बाजारों से कट जाती है।'
  },
  'about.disconnectBadge': { en: 'The Core Problem Statement', hi: 'मुख्य समस्या का कारण' },
  'about.disconnectTitle': { en: 'Why Were These Problems Getting Stuck?', hi: 'पहले समस्याएं क्यों अटकी रह जाती थीं?' },
  'about.disc1_title': { en: 'Dead-End Complaint Boxes', hi: 'लावारिस शिकायत पेटियां' },
  'about.disc1_desc': {
    en: 'Citizens filed complaints on generic government websites, but received only ticket numbers without named officers, direct contact info, or transparent progress tracking.',
    hi: 'शिकायत दर्ज करने पर सिर्फ टोकन नंबर मिलता था; न तो किसी अधिकारी का नाम होता था और न ही कोई प्रगति दिखाई देती थी।'
  },
  'about.disc2_title': { en: 'Colleges Working in Bubbles', hi: 'विश्वविद्यालयों का अलगाव' },
  'about.disc2_desc': {
    en: "Jharkhand's top engineering universities have world-class faculty and bright students, but student projects were often toy demos rather than solutions to real village water and air problems.",
    hi: 'शीर्ष इंजीनियरिंग कॉलेजों में उत्कृष्ट प्रोफेसर और छात्र थे, लेकिन उनके प्रोजेक्ट असली गांव की समस्याओं के बजाय केवल कागजी मॉडल रह जाते थे।'
  },
  'about.disc3_title': { en: 'Unfocused CSR Funding', hi: 'सीएसआर फंड का अभाव' },
  'about.disc3_desc': {
    en: 'Major industrial companies in Jharkhand allocate substantial CSR budgets, but struggled to find pre-vetted, high-impact grassroots innovations to sponsor.',
    hi: 'बड़ी कंपनियों के पास करोड़ों का सीएसआर बजट था, पर जमीनी स्तर के उपयोगी और प्रमाणित प्रोजेक्ट नहीं मिल पाते थे।'
  },
  'about.solutionBadge': { en: 'The Innovation Bridge', hi: 'नवाचार का सेतु' },
  'about.solutionTitle': { en: 'The Solution: A Unified, Accountable Bridge', hi: 'समाधान: एक पारदर्शी और जवाबदेह सेतु' },
  'about.solutionTrackA': {
    en: 'Broken pipes, clogged drains, bad culverts, and streetlights are routed directly to Municipal Corporations (MBMC) and the Public Works Department (PWD). The citizen is given the engineer name, phone number, and a target fix date.',
    hi: 'टूटी पाइप, नाली, पुलिया और स्ट्रीट लाइट सीधे नगर निगम और पथ निर्माण विभाग को भेजी जाती हैं। नागरिक को इंजीनियर का नाम, नंबर और तारीख मिलती है।'
  },
  'about.solutionTrackB': {
    en: 'Arsenic, fluoride, coal mine dust, and solar vaccine storage are routed to University Research Labs. Students build working hardware and chemical prototypes, sponsored by company CSR funds.',
    hi: 'आर्सेनिक, फ्लोराइड, कोयला धूल और वैक्सीन कूलर जैसी तकनीकी समस्याएं कॉलेज रिसर्च लैब को दी जाती हैं, जिनका खर्च कंपनियां उठाती हैं।'
  },
  'about.partnersTitle': { en: 'Institutions Powering SamasyaSetu', hi: 'समस्यासेतु से जुड़े प्रमुख संस्थान' },
  'about.helpdeskTitle': { en: 'State Innovation Desk Help & Inquiries', hi: 'राज्य नवाचार सहायता केंद्र' },
  'about.helpdeskLoc': { en: 'Project Secretariat · Ranchi, Jharkhand', hi: 'परियोजना सचिवालय · रांची, झारखंड' },
  'about.helpline': { en: 'Toll-free Citizen Helpline: 1800-345-7890', hi: 'टोल-फ्री नागरिक हेल्पलाइन: 1800-345-7890' },

  // ==========================================
  // 4. CITIZEN PORTAL & DASHBOARD
  // ==========================================
  'citizen.headerBadge': {
    en: 'CITIZEN REPORTING & TRACKING',
    hi: 'नागरिक रिपोर्टिंग और ट्रैकिंग'
  },
  'citizen.headerTitle': {
    en: 'Community Problems in Jharkhand',
    hi: 'झारखंड में दर्ज स्थानीय समस्याएं'
  },
  'citizen.headerDesc': {
    en: 'View problems reported across Jharkhand. Add your support or report a new problem in your area.',
    hi: 'पूरे झारखंड की समस्याएं देखें। किसी समस्या का समर्थन करें या अपने क्षेत्र की नई समस्या दर्ज करें।'
  },
  'citizen.reportProblem': {
    en: 'Report a Problem',
    hi: 'समस्या दर्ज करें'
  },
  'citizen.reportProblemDesc': {
    en: 'Tell us what is happening in your village or ward. We will verify it and notify civic and college teams.',
    hi: 'बताएं कि आपके गांव या वार्ड में क्या समस्या है। हम जांच करके सरकारी और कॉलेज टीमों को सूचित करेंगे।'
  },
  'citizen.problemTitleLabel': { en: 'Problem Title', hi: 'समस्या का शीर्षक' },
  'citizen.describeIssueLabel': { en: 'Describe the Issue', hi: 'समस्या का विवरण दें' },
  'citizen.categoryLabel': { en: 'Category', hi: 'श्रेणी' },
  'citizen.districtLabel': { en: 'District', hi: 'जिला' },
  'citizen.peopleAffectedLabel': { en: 'People Affected (Approx.)', hi: 'प्रभावित लोग (अनुमानित)' },
  'citizen.uploadPhotoLabel': { en: 'Upload Photo of Problem', hi: 'समस्या की फोटो अपलोड करें' },
  'citizen.clickToUpload': { en: 'Click to select photo from camera/files', hi: 'कैमरा या फाइल से फोटो चुनने के लिए क्लिक करें' },
  'citizen.submitBtn': { en: 'Submit Problem Report', hi: 'समस्या रिपोर्ट दर्ज करें' },
  'citizen.submitting': { en: 'Submitting...', hi: 'दर्ज हो रहा है...' },
  'citizen.submittedSuccess': { en: 'Problem reported successfully! Verification in progress.', hi: 'समस्या सफलतापूर्वक दर्ज हुई! जांच जारी है।' },
  'citizen.activeProblemsHeading': { en: 'Reported Community Issues', hi: 'दर्ज की गई समस्याएं' },
  'citizen.allDistricts': { en: 'All Districts', hi: 'सभी जिले' },
  'citizen.allCategories': { en: 'All Categories', hi: 'सभी श्रेणियां' },
  'citizen.supportBtn': { en: 'Support This Issue', hi: 'समर्थन दें' },
  'citizen.supportedBtn': { en: 'Supported', hi: 'समर्थन दिया' },
  'citizen.viewTimeline': { en: 'Track Progress', hi: 'प्रगति देखें' },
  'citizen.giveFeedback': { en: 'Give Feedback on Fix', hi: 'समाधान पर फीडबैक दें' },
  'citizen.badge': { en: 'CITIZEN REPORTING', hi: 'नागरिक रिपोर्टिंग' },
  'citizen.reportSub': { en: 'Tell us what is happening in your village or ward. We will verify it and notify civic and college teams.', hi: 'बताएं कि आपके गांव या वार्ड में क्या समस्या है। हम जांच करके सरकारी और कॉलेज टीमों को सूचित करेंगे।' },
  'citizen.photoEvidence': { en: 'Photo Evidence (Optional)', hi: 'फोटो प्रमाण (वैकल्पिक)' },
  'citizen.uploadPhone': { en: 'Upload photo from phone', hi: 'फोन से फोटो अपलोड करें' },
  'citizen.browse': { en: 'Browse', hi: 'ब्राउज़ करें' },
  'citizen.submitProblemBtn': { en: 'Submit Problem', hi: 'समस्या दर्ज करें' },
  'citizen.reportedSuccess': { en: 'Problem reported. Our team will review the issue within 48 hours.', hi: 'समस्या दर्ज की गई। हमारी टीम 48 घंटों में जांच करेगी।' },
  'citizen.communityProblems': { en: 'Community Problems', hi: 'स्थानीय समस्याएं' },
  'citizen.communityProblemsSub': { en: 'Real ground problems mapped across Jharkhand districts', hi: 'झारखंड के विभिन्न जिलों से दर्ज की गई वास्तविक समस्याएं' },
  'citizen.clickToSeeAction': { en: 'Click "View details" to see action steps', hi: 'कार्रवाई चरण देखने के लिए "विवरण देखें" पर क्लिक करें' },
  'citizen.domain': { en: 'Domain', hi: 'क्षेत्र' },
  'citizen.currentStatus': { en: 'Current Status', hi: 'वर्तमान स्थिति' },
  'citizen.support': { en: 'SUPPORT', hi: 'समर्थन दें' },
  'citizen.supported': { en: 'SUPPORTED', hi: 'समर्थन दिया' },
  'citizen.hide': { en: 'Hide', hi: 'छिपाएं' },
  'citizen.viewDetails': { en: 'View details', hi: 'विवरण देखें' },
  'citizen.aiAnalysis': { en: 'AI PROBLEM ANALYSIS', hi: 'एआई समस्या विश्लेषण' },
  'citizen.rootCause': { en: 'Root cause', hi: 'मूल कारण' },
  'citizen.expertiseRequired': { en: 'Expertise required', hi: 'आवश्यक विशेषज्ञता' },
  'citizen.estimatedBudget': { en: 'Estimated budget', hi: 'अनुमानित बजट' },
  'citizen.match': { en: 'Match', hi: 'मेल' },
  'citizen.hideProgress': { en: 'Hide Progress Steps', hi: 'प्रगति चरण छिपाएं' },
  'citizen.viewProgress': { en: 'View Progress Steps', hi: 'प्रगति चरण देखें' },
  'citizen.rateCompletedWork': { en: 'RATE COMPLETED WORK', hi: 'पूर्ण कार्य की रेटिंग दें' },
  'citizen.hideFeedback': { en: 'HIDE FEEDBACK', hi: 'फीडबैक छिपाएं' },
  'citizen.communityFeedbackFor': { en: 'Community Feedback for', hi: 'सामुदायिक फीडबैक:' },
  'citizen.feedbackSuccess': { en: 'Thank you! Your feedback has been sent directly to the engineering team.', hi: 'धन्यवाद! आपका फीडबैक सीधे इंजीनियरिंग टीम को भेज दिया गया है।' },
  'citizen.feedbackPlaceholder': { en: 'What is working well? What needs repair?', hi: 'क्या सही काम कर रहा है? क्या मरम्मत की जरूरत है?' },
  'citizen.submitRating': { en: 'Submit Rating', hi: 'रेटिंग दर्ज करें' },

  // ==========================================
  // 5. GOVERNMENT TRIAGE & DASHBOARD
  // ==========================================
  'govt.badge': {
    en: 'STATE & DISTRICT ADMINISTRATION',
    hi: 'राज्य और जिला प्रशासन'
  },
  'govt.title': {
    en: 'Review and Assign Problems',
    hi: 'समस्याओं की समीक्षा और आवंटन'
  },
  'govt.subtitle': {
    en: 'Sort citizen reports, assign work to civic bodies, or route complex challenges to university labs.',
    hi: 'समस्याओं की जांच करें, नगर निगम को काम सौंपें या जटिल मामलों को कॉलेज लैब में भेजें।'
  },
  'govt.tabTriage': { en: 'Assign Problems', hi: 'समस्या आवंटन' },
  'govt.tabAnalytics': { en: 'Overview & Stats', hi: 'आंकड़े और विश्लेषण' },
  'govt.tabHeatmap': { en: 'District Map', hi: 'जिला नक्शा' },
  'govt.tabPatterns': { en: 'Repeated Issues', hi: 'समान समस्याएं' },
  'govt.tabDeployments': { en: 'Replicate Solutions', hi: 'सफल मॉडल दोहराएं' },
  'govt.statSubmitted': { en: 'Problems Submitted', hi: 'कुल दर्ज समस्याएं' },
  'govt.statValidated': { en: 'Validated', hi: 'सत्यापित' },
  'govt.statClusters': { en: 'Problem Groups', hi: 'समूहबद्ध समस्याएं' },
  'govt.statActive': { en: 'Active Projects', hi: 'सक्रिय प्रोजेक्ट' },
  'govt.statDeveloped': { en: 'Prototypes Built', hi: 'तैयार प्रोटोटाइप' },
  'govt.statDeployed': { en: 'Solutions Deployed', hi: 'स्थापित समाधान' },
  'govt.filterByDistrict': { en: 'Filter by District', hi: 'जिले के अनुसार देखें' },
  'govt.assignCivicBtn': { en: 'Assign to Local Civic Team (Track A)', hi: 'स्थानीय नगर निगम को सौंपें (ट्रैक A)' },
  'govt.routeUnivBtn': { en: 'Send to College Research Lab (Track B)', hi: 'कॉलेज अनुसंधान लैब को भेजें (ट्रैक B)' },
  'govt.askCitizenBtn': { en: 'Ask Citizen for More Details', hi: 'नागरिक से अतिरिक्त विवरण मांगें' },

  // ==========================================
  // 6. UNIVERSITY LAB PORTAL
  // ==========================================
  'univ.badge': {
    en: 'HIGHER EDUCATION INSTITUTIONS (HEI) · NEP 2020',
    hi: 'उच्च शिक्षा संस्थान (HEI) · एनईपी 2020'
  },
  'univ.title': {
    en: 'Matched Community Problems',
    hi: 'विश्वविद्यालय से मेल खाती समस्याएं'
  },
  'univ.subtitle': {
    en: 'Turn real grassroots challenges from Jharkhand into student capstone projects and working prototypes.',
    hi: 'झारखंड की वास्तविक समस्याओं पर छात्रों के साथ प्रोटोटाइप और तकनीकी समाधान बनाएं।'
  },
  'univ.viewWorkspace': { en: 'View Projects', hi: 'प्रोजेक्ट कार्यक्षेत्र देखें' },
  'univ.hideWorkspace': { en: 'Hide Projects', hi: 'कार्यक्षेत्र छिपाएं' },
  'univ.incomingProblems': { en: 'Incoming Problems', hi: 'प्राप्त समस्याएं' },
  'univ.acceptBtn': { en: 'Accept as Research Project', hi: 'रिसर्च प्रोजेक्ट के रूप में स्वीकार करें' },
  'univ.declineBtn': { en: 'Not Suitable for Lab', hi: 'इस लैब के लिए उपयुक्त नहीं' },
  'univ.requestInfoBtn': { en: 'Ask for Site Details or Samples', hi: 'साइट विवरण या नमूने मांगें' },
  'univ.stageResearch': { en: 'Lab Testing', hi: 'लैब परीक्षण' },
  'univ.stagePrototype': { en: 'Building Prototype', hi: 'प्रोटोटाइप निर्माण' },
  'univ.stagePilot': { en: 'Field Trial', hi: 'फील्ड ट्रायल' },
  'univ.stageDeployed': { en: 'Deployed to Community', hi: 'समुदाय में स्थापित' },

  // ==========================================
  // 7. INDUSTRY / CSR PORTAL
  // ==========================================
  'industry.badge': {
    en: 'JHARKHAND INDUSTRY PARTNERSHIP · CSR & DEPLOYMENT',
    hi: 'झारखंड उद्योग साझेदारी · सीएसआर एवं स्थापना'
  },
  'industry.title': {
    en: 'Sponsor and Partner on Projects',
    hi: 'प्रोजेक्ट्स को स्पॉन्सर करें और भागीदार बनें'
  },
  'industry.subtitle': {
    en: 'Support proven university solutions with CSR grants to deploy real fixes in Jharkhand communities.',
    hi: 'कॉलेज लैब के सफल समाधानों को सीएसआर फंड दें और झारखंड के गांवों में स्थापित करें।'
  },
  'industry.openProjects': { en: 'Open Projects', hi: 'उपलब्ध प्रोजेक्ट्स' },
  'industry.howToHelp': { en: 'How You Can Help', hi: 'सहयोग के प्रकार' },
  'industry.offerSupportBtn': { en: 'Offer CSR Funding or Support', hi: 'सीएसआर फंड या सहयोग प्रदान करें' },
  'industry.fundPilot': { en: 'Fund Pilot Grant', hi: 'पायलट ग्रांट फंड करें' },
  'industry.csrSponsorship': { en: 'CSR Sponsorship', hi: 'सीएसआर प्रायोजन' },
  'industry.techTier': { en: 'Provide Tech / Cloud Tier', hi: 'तकनीकी सहायता दें' },
  'industry.licensing': { en: 'Commercial Licensing', hi: 'व्यावसायिक लाइसेंसिंग' },
  'industry.fieldTesting': { en: 'Field Testing Support', hi: 'फील्ड टेस्टिंग सहयोग' },
  'industry.mentorship': { en: 'Mentorship / Review', hi: 'मेंटरशिप व मार्गदर्शन' },

  // ==========================================
  // 8. IMPACT PAGE
  // ==========================================
  'impact.badge': { en: 'Real Results in Jharkhand', hi: 'झारखंड में वास्तविक परिणाम' },
  'impact.title': { en: 'Our Ground Impact', hi: 'जमीन पर हमारा प्रभाव' },
  'impact.subtitle': {
    en: 'See how problems across Jharkhand get solved. Local repairs happen quickly in cities, while university teams tackle deep technical issues.',
    hi: 'देखें कि कैसे झारखंड की समस्याएं हल होती हैं। शहरों में तुरंत मरम्मत होती है और जटिल तकनीकी मामलों पर कॉलेज टीमें काम करती हैं।'
  },
  'impact.totalProblems': { en: 'Total Problems Handled', hi: 'कुल हल की गई समस्याएं' },
  'impact.screenedByGovt': { en: 'Screened by Government', hi: 'सरकार द्वारा जांची गई' },
  'impact.cityRepairs': { en: 'City Repairs Assigned', hi: 'नगर निगम को सौंपे गए' },
  'impact.cityDept': { en: 'MBMC, PWD & Water Board', hi: 'नगर निगम व जल बोर्ड' },
  'impact.univProjects': { en: 'University Lab Projects', hi: 'कॉलेज लैब प्रोजेक्ट' },
  'impact.univLabs': { en: 'BIT Mesra, NIT & IIT ISM', hi: 'बीआईटी, एनआईटी व आईआईटी' },
  'impact.citizensBenefited': { en: 'Citizens Benefited', hi: 'लाभान्वित नागरिक' },
  'impact.verifiedAudit': { en: 'Verified by Ground Audit', hi: 'जमीनी सत्यापन द्वारा प्रमाणित' },
  'impact.storiesSectionTitle': { en: 'Featured Success Stories', hi: 'प्रमुख सफलता की कहानियां' },
  'impact.storiesSectionSub': {
    en: 'See how fast city repairs and university research help real communities.',
    hi: 'देखें कैसे त्वरित मरम्मत और कॉलेज शोध से आम जनजीवन आसान हुआ है।'
  },
  'impact.chartTitle': { en: 'Problems Reported vs. Fixed by District', hi: 'जिलों में दर्ज बनाम हल की गई समस्याएं' },
  'impact.chartSub': { en: 'Comparing issues reported to work finished across Jharkhand', hi: 'झारखंड के प्रमुख जिलों में दर्ज समस्याओं और पूर्ण कार्यों की तुलना' },
  'impact.reportedLabel': { en: 'Reported', hi: 'दर्ज' },
  'impact.fixedLabel': { en: 'Solved / Active', hi: 'हल / सक्रिय' },

  // ==========================================
  // 9. AUTH MODAL & LOGIN
  // ==========================================
  'auth.loginTitle': { en: 'Sign in to SamasyaSetu', hi: 'समस्यासेतु में लॉगिन करें' },
  'auth.signupTitle': { en: 'Create SamasyaSetu Account', hi: 'नया खाता बनाएं' },
  'auth.loginSub': { en: 'Select your role or enter credentials to continue', hi: 'आगे बढ़ने के लिए अपनी भूमिका चुनें या लॉगिन करें' },
  'auth.quickDemoHeader': { en: '1-Click Quick Demo Access', hi: '1-क्लिक त्वरित डेमो लॉगिन' },
  'auth.quickDemoSub': { en: 'Select any profile below to instantly test its dedicated portal', hi: 'पोर्टल आजमाने के लिए नीचे किसी भी प्रोफाइल पर क्लिक करें' },
  'auth.orCredentials': { en: 'Or sign in with account details', hi: 'या अपने विवरण से लॉगिन करें' },
  'auth.emailLabel': { en: 'Email Address', hi: 'ईमेल पता' },
  'auth.passwordLabel': { en: 'Password', hi: 'पासवर्ड' },
  'auth.fullNameLabel': { en: 'Full Name', hi: 'पूरा नाम' },
  'auth.phoneLabel': { en: 'Mobile Number', hi: 'मोबाइल नंबर' },
  'auth.roleLabel': { en: 'Select Your Role', hi: 'अपनी भूमिका चुनें' },
  'auth.districtLabel': { en: 'District (Jharkhand)', hi: 'जिला (झारखंड)' },
  'auth.orgLabel': { en: 'Organization / Ward / College', hi: 'संस्था / वार्ड / कॉलेज' },
  'auth.keyLabel': { en: 'Institutional Access Key', hi: 'संस्थागत एक्सेस कुंजी' },
  'auth.submitLogin': { en: 'Log In to Workspace', hi: 'पोर्टल में लॉगिन करें' },
  'auth.submitSignup': { en: 'Create Verified Account', hi: 'खाता बनाएं' },
  'auth.noAccount': { en: "Don't have an account? Sign up", hi: 'खाता नहीं है? पंजीकरण करें' },
  'auth.alreadyAccount': { en: 'Already have an account? Log in', hi: 'पहले से खाता है? लॉगिन करें' },

  // ==========================================
  // 10. SUBMIT PROBLEM MODAL
  // ==========================================
  'submitModal.badge': { en: 'JHARKHAND CITIZEN REPORT', hi: 'झारखंड नागरिक रिपोर्ट' },
  'submitModal.jharkhandOnly': { en: 'Strictly Inside Jharkhand', hi: 'केवल झारखंड क्षेत्र' },
  'submitModal.title': { en: 'Report a Local Ground Challenge', hi: 'स्थानीय जमीनी समस्या दर्ज करें' },
  'submitModal.step1': { en: '1. Photo Evidence', hi: '1. फोटो प्रमाण' },
  'submitModal.step2': { en: '2. Problem & Location', hi: '2. समस्या और स्थान' },
  'submitModal.step3': { en: '3. Impact & Submitter', hi: '3. प्रभाव और विवरण' },
  'submitModal.step1Heading': { en: 'Step 1: Upload On-Ground Photo Evidence *', hi: 'चरण 1: जमीनी फोटो प्रमाण अपलोड करें *' },
  'submitModal.step1Sub': { en: 'Upload a photo of the local issue or site to authenticate the community report.', hi: 'सामुदायिक रिपोर्ट को प्रमाणित करने के लिए समस्या स्थल की फोटो अपलोड करें।' },
  'submitModal.clickBrowse': { en: 'Click to browse or drag & drop photo here', hi: 'फोटो चुनने के लिए क्लिक करें या यहाँ खींच कर छोड़ें' },
  'submitModal.supportFormats': { en: 'Supports JPG, PNG, WEBP from your device or mobile camera', hi: 'आपके फोन या कैमरे से JPG, PNG, WEBP समर्थित' },
  'submitModal.photoAuth': { en: 'Ground photo authenticated', hi: 'जमीनी फोटो प्रमाणित' },
  'submitModal.replace': { en: 'Replace', hi: 'बदलें' },
  'submitModal.remove': { en: 'Remove', hi: 'हटाएं' },
  'submitModal.similarFound': { en: 'Similar Problem Already Reported', hi: 'समान समस्या पहले से दर्ज है' },
  'submitModal.dismiss': { en: 'Dismiss', hi: 'हटाएं' },
  'submitModal.supportExisting': { en: 'Support This', hi: 'इसका समर्थन करें' },
  'submitModal.problemTitle': { en: 'Problem Title / Headline *', hi: 'समस्या का शीर्षक / मुख्य विषय *' },
  'submitModal.titlePlaceholder': { en: 'e.g. High Fluoride in Silli Village Handpumps...', hi: 'उदा. सिल्ली गांव के चापाकलों में फ्लोराइड की समस्या...' },
  'submitModal.thematicCategory': { en: 'Thematic Category *', hi: 'विषय श्रेणी *' },
  'submitModal.district': { en: 'Jharkhand District (24) *', hi: 'झारखंड का जिला (24) *' },
  'submitModal.landmark': { en: 'Specific Panchayat / Block / Village Landmark *', hi: 'विशिष्ट पंचायत / ब्लॉक / गांव का पता *' },
  'submitModal.desc': { en: 'Problem Description (What is failing?) *', hi: 'समस्या का विवरण (क्या खराब है?) *' },
  'submitModal.descPlaceholder': { en: 'Explain what is broken, health/crop symptoms, and how it impacts local residents...', hi: 'बताएं क्या खराब है, फसल या स्वास्थ्य पर क्या असर है, और लोगों पर क्या प्रभाव पड़ रहा है...' },
  'submitModal.citizensAffected': { en: 'Estimated Citizens Affected *', hi: 'अनुमानित प्रभावित नागरिक *' },
  'submitModal.urgency': { en: 'Urgency Severity *', hi: 'गंभीरता स्तर *' },
  'submitModal.yourName': { en: 'Your Name / Mukhiya / Resident *', hi: 'आपका नाम / मुखिया / निवासी *' },
  'submitModal.contact': { en: 'Phone Number / Email *', hi: 'फोन नंबर / ईमेल *' },
  'submitModal.readyForRouting': { en: 'Ready for Automated Lab Routing', hi: 'स्वचालित लैब आवंटन हेतु तैयार' },
  'submitModal.routingDesc': { en: 'Your submission will be registered and instantly indexed for college engineering labs and CSR funding.', hi: 'आपकी समस्या दर्ज होकर कॉलेज इंजीनियरिंग लैब्स और सीएसआर फंडिंग के लिए उपलब्ध होगी।' },
  'submitModal.back': { en: 'Back', hi: 'पीछे' },
  'submitModal.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'submitModal.continue': { en: 'Continue', hi: 'आगे बढ़ें' },
  'submitModal.confirmSubmit': { en: 'Confirm & Submit', hi: 'पुष्टि करें और भेजें' },
  'submitModal.submitting': { en: 'Submitting...', hi: 'भेजा जा रहा है...' },

  // ==========================================
  // 11. PROBLEM DETAIL & TIMELINE MODAL
  // ==========================================
  'problemDetail.rootCauseMatch': { en: 'Root Cause & Match', hi: 'मूल कारण व मेल' },
  'problemDetail.progressSteps': { en: 'Progress Steps', hi: 'प्रगति चरण' },
  'problemDetail.possibleSolutions': { en: 'Possible Solutions', hi: 'संभावित समाधान' },
  'problemDetail.resultsImpact': { en: 'Results & Impact', hi: 'परिणाम व प्रभाव' },
  'problemDetail.aiRootCause': { en: 'AI Root Cause Analysis', hi: 'एआई मूल कारण विश्लेषण' },
  'problemDetail.assignedCollegeLab': { en: 'Assigned College Lab', hi: 'आवंटित कॉलेज लैब' },
  'problemDetail.supportThis': { en: 'SUPPORT THIS', hi: 'समर्थन दें' },
  'problemDetail.supported': { en: 'SUPPORTED', hi: 'समर्थन दिया' },
  'problemDetail.giveRating': { en: 'GIVE RATING', hi: 'रेटिंग दें' },
  'problemDetail.close': { en: 'CLOSE', hi: 'बंद करें' },
  'problemDetail.location': { en: 'Location', hi: 'स्थान' },
  'problemDetail.population': { en: 'Population', hi: 'जनसंख्या' },
  'problemDetail.reporter': { en: 'Reporter', hi: 'रिपोर्टर' },
  'problemDetail.before': { en: 'Before', hi: 'पहले' },
  'problemDetail.after': { en: 'After Installation', hi: 'समाधान के बाद' },
  'problemDetail.totalImprovement': { en: 'Total Improvement', hi: 'कुल सुधार' },
  'problemDetail.inProgressNote': { en: 'This solution is currently being built in the college lab. Before-and-after test results will appear here once installed in the area.', hi: 'यह समाधान वर्तमान में कॉलेज लैब में बनाया जा रहा है। स्थापना के बाद परीक्षण परिणाम यहाँ दिखेंगे।' },
  'timeline.step1': { en: '1. Submitted', hi: '1. दर्ज किया गया' },
  'timeline.step2': { en: '2. Validated', hi: '2. सत्यापित' },
  'timeline.step3': { en: '3. Clustered', hi: '3. समूहबद्ध' },
  'timeline.step4': { en: '4. Matched', hi: '4. कॉलेज से संबद्ध' },
  'timeline.step5': { en: '5. Team Formed', hi: '5. टीम गठित' },
  'timeline.step6': { en: '6. Piloted', hi: '6. फील्ड परीक्षण' },
  'timeline.step7': { en: '7. Deployed', hi: '7. जमीन पर स्थापित' },

  // ==========================================
  // 12. FEEDBACK MODAL
  // ==========================================
  'feedbackModal.title': { en: 'Rate Deployed Solution Impact', hi: 'स्थापित समाधान प्रभाव का मूल्यांकन करें' },
  'feedbackModal.ratingLabel': { en: 'Citizen Satisfaction Star Rating', hi: 'नागरिक संतुष्टि स्टार रेटिंग' },
  'feedbackModal.stars': { en: 'Stars', hi: 'स्टार' },
  'feedbackModal.nameLabel': { en: 'Your Name / Resident Panchayat', hi: 'आपका नाम / निवासी पंचायत' },
  'feedbackModal.outcomeLabel': { en: 'Ground Outcome & Life Improvement Details', hi: 'जमीनी परिणाम और जीवन में आए सुधार का विवरण' },
  'feedbackModal.submitBtn': { en: 'SUBMIT VERIFICATION', hi: 'सत्यापन दर्ज करें' },

  // ==========================================
  // 13. GOVERNMENT DASHBOARD & TRIAGE DESK
  // ==========================================
  'govtDashboard.breadcrumbHome': { en: 'Website Home', hi: 'वेबसाइट होम' },
  'govtDashboard.breadcrumbGovt': { en: 'Government Portal', hi: 'सरकार पोर्टल' },
  'govtDashboard.returnHome': { en: 'Return to Public Website', hi: 'सार्वजनिक वेबसाइट पर वापस जाएं' },
  'govtDashboard.headerBadge': { en: 'Government of Jharkhand · State Triage & Oversight', hi: 'झारखंड सरकार · राज्य स्तरीय समीक्षा एवं निगरानी' },
  'govtDashboard.headerTitle': { en: 'Government Triage & Civic Ledger', hi: 'सरकारी समीक्षा और नागरिक लेज़र' },
  'govtDashboard.headerSub': { en: 'Review incoming district grievances, assign municipal repairs to MBMC/PWD, and route complex challenges to universities.', hi: 'आने वाली समस्याओं की समीक्षा करें, नगर निगम/पीडब्ल्यूडी को मरम्मत सौंपें, और जटिल मामलों को विश्वविद्यालयों को भेजें।' },
  'govtDashboard.district': { en: 'District:', hi: 'जिला:' },
  'govtDashboard.statProblemsSubmitted': { en: 'Problems submitted', hi: 'दर्ज समस्याएं' },
  'govtDashboard.statSubmittedSub': { en: 'Total reported across wards', hi: 'सभी वार्डों से प्राप्त' },
  'govtDashboard.statValidated': { en: 'Validated', hi: 'सत्यापित' },
  'govtDashboard.statValidatedSub': { en: 'Ground-truth AI verified', hi: 'एआई द्वारा जमीनी सत्यापित' },
  'govtDashboard.statClusters': { en: 'Clusters', hi: 'क्लस्टर' },
  'govtDashboard.statClustersSub': { en: 'Active AI clustering · updated 4m ago', hi: 'सक्रिय एआई समूह' },
  'govtDashboard.statProjectsActive': { en: 'Active projects', hi: 'सक्रिय प्रोजेक्ट्स' },
  'govtDashboard.statProjectsActiveSub': { en: 'Currently in HEI lab R&D', hi: 'कॉलेज लैब में अनुसंधानधीन' },
  'govtDashboard.statSolutionsDev': { en: 'Solutions developed', hi: 'विकसित समाधान' },
  'govtDashboard.statSolutionsDevSub': { en: 'Prototypes & tested pilots', hi: 'प्रोटोटाइप व फील्ड परीक्षण' },
  'govtDashboard.statSolutionsDep': { en: 'Solutions deployed', hi: 'स्थापित समाधान' },
  'govtDashboard.statSolutionsDepSub': { en: 'Serving panchayats', hi: 'पंचायतों में कार्यरत' },
  'govtDashboard.tabTriage': { en: 'GRIEVANCE TRIAGE', hi: 'समस्या समीक्षा' },
  'govtDashboard.tabAnalytics': { en: 'ANALYTICS & BREAKDOWN', hi: 'विश्लेषण व आंकड़े' },
  'govtDashboard.tabHeatmap': { en: 'DISTRICT HEATMAP (24)', hi: 'जिला हीटमैप (24)' },
  'govtDashboard.tabPatterns': { en: 'AI PATTERNS', hi: 'एआई पैटर्न' },
  'govtDashboard.tabDeployments': { en: 'DEPLOYED WORK', hi: 'स्थापित कार्य' },
  'govtDashboard.tabClusters': { en: 'CLUSTERS', hi: 'समूहबद्ध समस्याएं' },
  'govtDashboard.pending': { en: 'PENDING', hi: 'लंबित' },
  'govtTriage.badge': { en: 'Government Review & Routing', hi: 'सरकारी समीक्षा एवं आवंटन' },
  'govtTriage.title': { en: 'Review and Assign Problems', hi: 'समस्याओं की समीक्षा और आवंटन' },
  'govtTriage.sub': { en: 'Every report is reviewed by district officers. The team decides whether to assign it directly to local city departments or forward it to university research labs.', hi: 'हर रिपोर्ट की जिला अधिकारियों द्वारा समीक्षा की जाती है। वे तय करते हैं कि काम स्थानीय नगर निगम को सौंपना है या कॉलेज अनुसंधान लैब को भेजना है।' },
  'govtTriage.needsReview': { en: 'Needs Review', hi: 'समीक्षा आवश्यक' },
  'govtTriage.waitingDecision': { en: 'Waiting for government decision', hi: 'सरकारी निर्णय की प्रतीक्षा में' },
  'govtTriage.allReports': { en: 'All Reports', hi: 'सभी रिपोर्ट' },
  'govtTriage.needsDecision': { en: 'Needs Decision', hi: 'निर्णय लंबित' },
  'govtTriage.assignedCity': { en: 'Assigned to City/PWD', hi: 'नगर निगम/पीडब्ल्यूडी को सौंपा गया' },
  'govtTriage.assignedUniv': { en: 'University Lab Projects', hi: 'कॉलेज लैब प्रोजेक्ट्स' },
  'govtTriage.liveFeed': { en: 'Live Feed · Updated 2m ago', hi: 'लाइव फीड · 2 मिनट पूर्व अपडेट' },
  'govtTriage.btnCivic': { en: 'Direct Civic Repair (Track A)', hi: 'सीधी नागरिक मरम्मत (ट्रैक A)' },
  'govtTriage.btnUniv': { en: 'Send to University Lab (Track B)', hi: 'कॉलेज लैब को भेजें (ट्रैक B)' },
  'govtTriage.btnCivicTitle': { en: 'Assign to City Team', hi: 'शहर की टीम को सौंपें' },
  'govtTriage.btnCivicSub': { en: 'Municipal or PWD', hi: 'नगर निगम या पीडब्ल्यूडी' },
  'govtTriage.btnUnivTitle': { en: 'Send to University', hi: 'विश्वविद्यालय को भेजें' },
  'govtTriage.btnUnivSub': { en: 'Research & Prototyping', hi: 'अनुसंधान व प्रोटोटाइपिंग' },
  'govtTriage.updateAssignment': { en: 'Update Assignment', hi: 'आवंटन बदलें' },
  'govtTriage.modalCivicTitle': { en: 'Assign to Local City Department', hi: 'स्थानीय नगर निकाय को सौंपें' },
  'govtTriage.modalCivicSub': { en: 'Assigning for direct municipal repair', hi: 'प्रत्यक्ष मरम्मत कार्य हेतु आवंटन' },
  'govtTriage.responsibleAgency': { en: 'Responsible Agency *', hi: 'जिम्मेदार विभाग *' },
  'govtTriage.deptName': { en: 'Department Name *', hi: 'विभाग का नाम *' },
  'govtTriage.officerInCharge': { en: 'Officer In Charge *', hi: 'प्रभारी अधिकारी *' },
  'govtTriage.contactPhone': { en: 'Contact Phone *', hi: 'संपर्क फोन नंबर *' },
  'govtTriage.officialEmail': { en: 'Official Email *', hi: 'आधिकारिक ईमेल *' },
  'govtTriage.targetDate': { en: 'Target Completion Date *', hi: 'कार्य पूरा करने की तिथि *' },
  'govtTriage.actionPlan': { en: 'Action Plan & Equipment Needed *', hi: 'कार्य योजना व आवश्यक उपकरण *' },
  'govtTriage.officerReviewNote': { en: 'Officer Review Note', hi: 'अधिकारी समीक्षा टिप्पणी' },
  'govtTriage.confirmCityAssignment': { en: 'Confirm City Assignment', hi: 'नगर निकाय आवंटन की पुष्टि करें' },
  'govtTriage.modalUnivTitle': { en: 'Forward to University Research Lab', hi: 'विश्वविद्यालय अनुसंधान लैब को भेजें' },
  'govtTriage.modalUnivSub': { en: 'Assigning for research and prototype testing', hi: 'अनुसंधान और प्रोटोटाइप परीक्षण हेतु आवंटन' },
  'govtTriage.univCollegeLabel': { en: 'University / College *', hi: 'विश्वविद्यालय / कॉलेज *' },
  'govtTriage.univDeptLabel': { en: 'Department / Lab *', hi: 'विभाग / लैब *' },
  'govtTriage.univFacultyLabel': { en: 'Lead Faculty Investigator(s) *', hi: 'प्रमुख प्राध्यापक / शोधकर्ता *' },
  'govtTriage.univWhyNeeded': { en: 'Why is Research Needed? *', hi: 'अनुसंधान क्यों आवश्यक है? *' },
  'govtTriage.confirmUnivRouting': { en: 'Confirm University Routing', hi: 'विश्वविद्यालय आवंटन की पुष्टि करें' },
  'common.reportedBy': { en: 'Reported by:', hi: 'दर्जकर्ता:' },
  'common.peopleAffected': { en: 'People Affected', hi: 'प्रभावित लोग' },

  // ==========================================
  // 14. UNIVERSITY LAB DASHBOARD
  // ==========================================
  'univDashboard.labTitle': { en: 'University Innovation Labs', hi: 'विश्वविद्यालय नवाचार लैब्स' },
  'univDashboard.heading': { en: 'Matched Community Problems', hi: 'विश्वविद्यालय से मेल खाती समस्याएं' },
  'univDashboard.sub': { en: 'problems matched to university engineering teams.', hi: 'समस्याएं विश्वविद्यालय इंजीनियरिंग टीमों से मेल खाती हैं।' },
  'univDashboard.viewProjects': { en: 'View Projects', hi: 'प्रोजेक्ट देखें' },
  'univDashboard.hideProjects': { en: 'Hide Projects', hi: 'प्रोजेक्ट छिपाएं' },
  'univDashboard.incoming': { en: 'Incoming Problems', hi: 'प्राप्त समस्याएं' },
  'univDashboard.showingMatched': { en: 'Showing problems matched to your lab', hi: 'आपकी लैब से मेल खाती समस्याएं प्रदर्शित' },
  'univDashboard.accepted': { en: 'Accepted', hi: 'स्वीकृत' },
  'univDashboard.declined': { en: 'Declined', hi: 'अस्वीकृत' },
  'univDashboard.pending': { en: 'Pending', hi: 'लंबित' },
  'univDashboard.activeInLab': { en: 'Active in Lab', hi: 'लैब में सक्रिय' },
  'univDashboard.skillsNeeded': { en: 'Skills Needed:', hi: 'आवश्यक कौशल:' },
  'univDashboard.identifiedCause': { en: 'Identified Cause', hi: 'पहचाना गया कारण' },
  'univDashboard.askDetails': { en: 'Ask for site details or samples', hi: 'साइट विवरण या नमूने मांगें' },
  'univDashboard.accept': { en: 'Accept', hi: 'स्वीकार करें' },
  'univDashboard.hideDetails': { en: 'Hide details', hi: 'विवरण छिपाएं' },
  'univDashboard.viewDetails': { en: 'Details & Skills', hi: 'विवरण व कौशल' },
  'univDashboard.activeWorkspace': { en: 'Active Project Workspace', hi: 'सक्रिय प्रोजेक्ट कार्यक्षेत्र' },
  'univDashboard.switchProject': { en: 'Switch Project:', hi: 'प्रोजेक्ट बदलें:' },

  // ==========================================
  // 15. INDUSTRY DASHBOARD & ENGAGE MODAL
  // ==========================================
  'industryDashboard.badge': { en: 'Industry & CSR Partners', hi: 'उद्योग व सीएसआर भागीदार' },
  'industryDashboard.heading': { en: 'Sponsor and Partner on Projects', hi: 'प्रोजेक्ट्स को स्पॉन्सर करें और भागीदार बनें' },
  'industryDashboard.sub': { en: 'community projects ready for CSR funding and corporate support.', hi: 'समुदायिक प्रोजेक्ट्स सीएसआर फंडिंग और कॉरपोरेट सहयोग के लिए तैयार हैं।' },
  'industryDashboard.openProjects': { en: 'Open Projects', hi: 'उपलब्ध प्रोजेक्ट्स' },
  'industryDashboard.howToHelp': { en: 'How You Can Help:', hi: 'सहयोग के प्रकार:' },
  'industryDashboard.supportBtn': { en: 'Support This Project', hi: 'इस प्रोजेक्ट को सहयोग दें' },
  'industryDashboard.viewDetails': { en: 'View project details & IP terms', hi: 'प्रोजेक्ट विवरण व आईपी शर्तें देखें' },
  'industryDashboard.hideDetails': { en: 'Hide project details', hi: 'प्रोजेक्ट विवरण छिपाएं' },
  'engageModal.title': { en: 'Offer CSR Funding or Support', hi: 'सीएसआर फंडिंग या सहयोग प्रदान करें' },
  'engageModal.companyName': { en: 'Company or Foundation Name *', hi: 'कंपनी या फाउंडेशन का नाम *' },
  'engageModal.supportType': { en: 'Support Type', hi: 'सहयोग का प्रकार' },
  'engageModal.grantOption': { en: 'CSR Grant (Money)', hi: 'सीएसआर अनुदान (धनराशि)' },
  'engageModal.hardwareOption': { en: 'Hardware / Equipment', hi: 'हार्डवेयर / उपकरण' },
  'engageModal.mentorshipOption': { en: 'Technical Mentorship', hi: 'तकनीकी मार्गदर्शन' },
  'engageModal.testingOption': { en: 'Testing Site', hi: 'परीक्षण स्थल' },
  'engageModal.manufacturingOption': { en: 'Manufacturing Support', hi: 'उत्पादन सहयोग' },
  'engageModal.amountLabel': { en: 'Estimated Value or Amount', hi: 'अनुमानित मूल्य या धनराशि' },
  'engageModal.provideLabel': { en: 'What will you provide? *', hi: 'आप क्या सहयोग प्रदान करेंगे? *' },
  'engageModal.confirmBtn': { en: 'Confirm Support', hi: 'सहयोग की पुष्टि करें' },

  // ==========================================
  // 16. HEATMAP, PATTERNS & REPLICATION
  // ==========================================
  'heatmap.title': { en: 'Regional Vulnerability & Severity Heatmap', hi: 'क्षेत्रीय संकट व गंभीरता हीटमैप' },
  'heatmap.sub': { en: 'Jharkhand district-wise multi-factor crisis index weighted by grievance density, fluoride/mine-dust severity, and citizen population exposed.', hi: 'शिकायत घनत्व, फ्लोराइड/खनन धूल की गंभीरता और प्रभावित आबादी के आधार पर झारखंड का जिलावार संकट सूचकांक।' },
  'heatmap.severityIndex': { en: 'Severity Index', hi: 'गंभीरता सूचकांक' },
  'heatmap.citizensExposed': { en: 'Citizens Exposed', hi: 'प्रभावित नागरिक' },
  'heatmap.criticalIssues': { en: 'Critical Issues', hi: 'अति गंभीर समस्याएं' },
  'heatmap.criticalIncidents': { en: 'Critical Incidents', hi: 'गंभीर घटनाएं' },
  'heatmap.dominantDomain': { en: 'Dominant Domain:', hi: 'प्रमुख क्षेत्र:' },
  'heatmap.peopleImpacted': { en: 'People Impacted:', hi: 'प्रभावित लोग:' },
  'heatmap.vulnerabilitySpectrum': { en: 'Vulnerability Spectrum', hi: 'संकट विस्तार' },
  'heatmap.totalReports': { en: 'Total Reports', hi: 'कुल रिपोर्ट' },
  'heatmap.activeClusters': { en: 'Active Clusters', hi: 'सक्रिय समूह' },
  'heatmap.resolved': { en: 'Resolved', hi: 'समाधान हुआ' },
  'heatmap.severityKey': { en: 'Severity Key:', hi: 'गंभीरता कुंजी:' },
  'heatmap.critical': { en: 'Critical (>85)', hi: 'अति गंभीर (>85)' },
  'heatmap.high': { en: 'High (80-84)', hi: 'उच्च (80-84)' },
  'heatmap.elevated': { en: 'Elevated (75-79)', hi: 'मध्यम-उच्च (75-79)' },
  'heatmap.moderate': { en: 'Moderate (<75)', hi: 'सामान्य (<75)' },
  'heatmap.filterHint': { en: 'Click any district card above to filter the ecosystem ledger', hi: 'फिल्टर करने के लिए किसी भी जिला कार्ड पर क्लिक करें' },
  'patterns.title': { en: 'AI Cross-Cluster Root Cause & Systemic Pattern Insights', hi: 'एआई बहु-जिला मूल कारण और व्यवस्थागत पैटर्न अंतर्दृष्टि' },
  'patterns.sub': { en: 'Surfacing multi-district commonalities to unlock shared university blueprints, pooled CSR grants, and joint procurement economies of scale.', hi: 'साझा विश्वविद्यालय मॉडल, संयुक्त सीएसआर अनुदान और बड़े पैमाने पर समाधान तैयार करने के लिए समान समस्याओं की पहचान।' },
  'patterns.badge': { en: '3 SYSTEMIC PATTERNS DETECTED', hi: '3 व्यवस्थागत पैटर्न पहचाने गए' },
  'patterns.connectedDistricts': { en: 'Connected Districts:', hi: 'जुड़े हुए जिले:' },
  'patterns.rootCause': { en: 'Underlying Systemic Root Cause', hi: 'मुख्य व्यवस्थागत मूल कारण' },
  'patterns.synergy': { en: 'Inter-District Synergy & Cost Savings', hi: 'अंतर-जिला समन्वय और लागत बचत' },
  'patterns.recommendedAction': { en: 'Recommended Institutional Action', hi: 'अनुशंसित संस्थागत कार्रवाई' },
  'patterns.suggestedConsortium': { en: 'Suggested R&D Consortium:', hi: 'सुझाया गया अनुसंधान संघ:' },
  'patterns.linkedClusters': { en: 'Linked Clusters:', hi: 'संबंधित समूह:' },
  'patterns.citizensImpacted': { en: 'Combined Citizens Impacted', hi: 'कुल प्रभावित नागरिक' },
  'replicateModal.badge': { en: 'ONE-CLICK REPLICATION DISPATCH', hi: '1-क्लिक समाधान विस्तार' },
  'replicateModal.title': { en: 'Replicate Deployed Solution to Matching Regional Clusters', hi: 'सफल समाधान को अन्य प्रभावित क्षेत्रों में लागू करें' },
  'replicateModal.sub': { en: 'Instantly deploy proven hardware blueprints, sensor packages, and lab protocols to peer clusters sharing identical root causes.', hi: 'समान समस्या वाले अन्य क्षेत्रों में परखे गए मॉडल, उपकरण और लैब प्रोटोकॉल तुरंत तैनात करें।' },
  'replicateModal.sourceSolution': { en: 'SOURCE VERIFIED SOLUTION', hi: 'मूल प्रमाणित समाधान' },
  'replicateModal.provenSource': { en: 'Proven Solution Source:', hi: 'सत्यापित समाधान स्रोत:' },
  'replicateModal.originLab': { en: 'Origin Lab:', hi: 'मूल लैब:' },
  'replicateModal.leadDistrict': { en: 'Lead District:', hi: 'प्रमुख जिला:' },
  'replicateModal.targetClusters': { en: 'TARGET MATCHING CLUSTERS (SELECT TO DISPATCH)', hi: 'लक्षित क्षेत्र (विस्तार के लिए चुनें)' },
  'replicateModal.selectCandidate': { en: 'Select Candidate Target Clusters', hi: 'लक्षित क्षेत्र चुनें' },
  'replicateModal.selected': { en: 'Selected', hi: 'चयनित' },
  'replicateModal.highAffinity': { en: 'High Affinity Match', hi: 'समान समस्या मिलान' },
  'replicateModal.scope': { en: 'Replication Scope', hi: 'विस्तार दायरा' },
  'replicateModal.additionalImpact': { en: 'Additional Impact', hi: 'अतिरिक्त प्रभाव' },
  'replicateModal.estPilotTime': { en: 'Est. Pilot Time', hi: 'अनुमानित पायलट समय' },
  'replicateModal.fastTrack': { en: '3-4 Weeks (Fast-track)', hi: '3-4 सप्ताह (त्वरित)' },
  'replicateModal.dispatchBtn': { en: 'CONFIRM REPLICATION DISPATCH', hi: 'विस्तार पैकेज लागू करें' },
  'replicateModal.success': { en: 'REPLICATION DISPATCHED!', hi: 'समाधान सफलतापूर्वक लागू किया गया!' },

  // Impact Card
  'impactCard.verifiedResolution': { en: 'Verified Ground Resolution', hi: 'सत्यापित जमीनी समाधान' },
  'impactCard.primaryKpi': { en: 'Primary KPI:', hi: 'प्रमुख संकेतक:' },
  'impactCard.source': { en: 'Source:', hi: 'स्रोत:' },
  'impactCard.baseline': { en: 'Pre-Pilot Baseline', hi: 'पायलट पूर्व स्थिति' },
  'impactCard.postIntervention': { en: 'Post-Intervention', hi: 'हस्तक्षेप के बाद' },
  'impactCard.verifiedDelta': { en: 'Verified Delta', hi: 'प्रमाणित सुधार' },
  'impactCard.citizensBenefitted': { en: 'Citizens Benefitted:', hi: 'लाभान्वित नागरिक:' },
  'impactCard.verifiedOn': { en: 'Verified On:', hi: 'सत्यापन तिथि:' },

  // ==========================================
  // COMMON LABELS, BUTTONS, & STATUSES
  // ==========================================
  'common.close': { en: 'Close', hi: 'बंद करें' },
  'common.save': { en: 'Save', hi: 'सहेजें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.submit': { en: 'Submit', hi: 'दर्ज करें' },
  'common.search': { en: 'Search problems...', hi: 'समस्या खोजें...' },
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.allDistricts': { en: 'All Districts', hi: 'सभी जिले' },
  'common.allCategories': { en: 'All Categories', hi: 'सभी श्रेणियां' },
  'common.filterByDistrict': { en: 'Filter by District', hi: 'जिले के अनुसार देखें' },
  'common.district': { en: 'District', hi: 'जिला' },
  'common.status': { en: 'Status', hi: 'स्थिति' },
  'common.severity': { en: 'Urgency', hi: 'गंभीरता' },
  'common.affected': { en: 'people affected', hi: 'लोग प्रभावित' },
  'common.viewDetails': { en: 'View Details', hi: 'विवरण देखें' },
  'common.inProgress': { en: 'In Progress', hi: 'प्रगति पर' },
  'common.completed': { en: 'Completed', hi: 'पूर्ण' },
  'common.verified': { en: 'Verified', hi: 'सत्यापित' }
};

// Common direct mappings for categories, severities, and statuses
const COMMON_DICTIONARY: Record<string, TranslationItem> = {
  // Categories
  'water & sanitation': { en: 'Water & Sanitation', hi: 'जल एवं स्वच्छता' },
  'agriculture & soil': { en: 'Agriculture & Soil', hi: 'कृषि एवं मृदा' },
  'rural livelihoods & ntfp': { en: 'Rural Livelihoods & NTFP', hi: 'ग्रामीण आजीविका व वनोपज' },
  'public healthcare': { en: 'Public Healthcare', hi: 'सार्वजनिक स्वास्थ्य' },
  'air quality & environment': { en: 'Air Quality & Environment', hi: 'स्वच्छ वायु व पर्यावरण' },
  'clean energy & power': { en: 'Clean Energy & Power', hi: 'स्वच्छ ऊर्जा एवं बिजली' },
  'urban mobility & roads': { en: 'Urban Mobility & Roads', hi: 'शहरी आवागमन व सड़कें' },
  'waste management': { en: 'Waste Management', hi: 'कचरा प्रबंधन' },
  'education & skill': { en: 'Education & Skill', hi: 'शिक्षा एवं कौशल' },
  'public administration': { en: 'Public Administration', hi: 'लोक प्रशासन' },
  'accessibility & assistive tech': { en: 'Accessibility & Assistive Tech', hi: 'दिव्यांग सहायता तकनीक' },
  'rural infrastructure': { en: 'Rural Infrastructure', hi: 'ग्रामीण अवसंरचना' },
  'water & health': { en: 'Water & Health', hi: 'पेयजल एवं स्वास्थ्य' },
  'city drainage & water': { en: 'City Drainage & Water', hi: 'शहरी जल निकासी व पेयजल' },
  'clean air & environment': { en: 'Clean Air & Environment', hi: 'स्वच्छ वायु व पर्यावरण' },
  'healthcare & energy': { en: 'Healthcare & Energy', hi: 'स्वास्थ्य एवं ऊर्जा' },
  'safe water': { en: 'Safe Water', hi: 'सुरक्षित पेयजल' },

  // Severities
  'critical': { en: 'Critical', hi: 'अति गंभीर' },
  'high': { en: 'High', hi: 'उच्च' },
  'medium': { en: 'Medium', hi: 'मध्यम' },
  'low': { en: 'Low', hi: 'सामान्य' },

  // Statuses
  'under review': { en: 'Under Review', hi: 'समीक्षाधीन' },
  'assigned to civic body': { en: 'Assigned to Civic Body', hi: 'नगर निगम को सौंपा गया' },
  'assigned_civic': { en: 'Assigned to Civic Body', hi: 'नगर निगम को सौंपा गया' },
  'under university research': { en: 'Under University Research', hi: 'कॉलेज लैब में अनुसंधान' },
  'research': { en: 'Lab Research', hi: 'लैब अनुसंधान' },
  'prototype': { en: 'Prototype', hi: 'प्रोटोटाइप' },
  'pilot': { en: 'Field Pilot', hi: 'फील्ड पायलट' },
  'deployed': { en: 'Deployed to Ground', hi: 'जमीन पर स्थापित' },
  'impact_verified': { en: 'Impact Verified', hi: 'प्रभाव सत्यापित' },
  'resolved': { en: 'Work Completed', hi: 'कार्य पूर्ण' },
  'accepted': { en: 'Accepted', hi: 'स्वीकृत' },
  'declined': { en: 'Declined', hi: 'अस्वीकृत' },
  'pending': { en: 'Pending', hi: 'लंबित' },
  'active': { en: 'Active', hi: 'सक्रिय' },

  // Roles
  'citizen': { en: 'Citizen', hi: 'नागरिक' },
  'government': { en: 'Government', hi: 'सरकार' },
  'university': { en: 'University', hi: 'विश्वविद्यालय' },
  'industry': { en: 'Industry', hi: 'उद्योग' },
  'public': { en: 'Public', hi: 'जनसामान्य' },

  // Common UI labels
  'home': { en: 'Home', hi: 'होम' },
  'how it works': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'impact': { en: 'Impact', hi: 'प्रभाव' },
  'about': { en: 'About', hi: 'परिचय' },
  'report a problem': { en: 'Report a Problem', hi: 'समस्या दर्ज करें' },
  'report': { en: 'Report', hi: 'रिपोर्ट' },
  'login': { en: 'Log In', hi: 'लॉग इन' },
  'logout': { en: 'Log Out', hi: 'लॉग आउट' },
  'all districts': { en: 'All Districts', hi: 'सभी जिले' },
  'all categories': { en: 'All Categories', hi: 'सभी श्रेणियां' },
  'all severities': { en: 'All Severities', hi: 'सभी गंभीरताएं' },
  'all stages': { en: 'All Stages', hi: 'सभी चरण' },
  'submit': { en: 'Submit', hi: 'दर्ज करें' },
  'close': { en: 'Close', hi: 'बंद करें' },
  'cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'save': { en: 'Save', hi: 'सहेजें' },
  'category': { en: 'Category', hi: 'श्रेणी' },
  'district': { en: 'District', hi: 'जिला' }
};

export function getTranslation(key: string, lang: Language, fallback?: string): string {
  if (!key) return fallback || '';

  // 1. Direct key match in translations table
  const item = translations[key];
  if (item && item[lang]) {
    return item[lang];
  }

  // 2. Check if key matches common dictionary (case-insensitive)
  const lowerKey = key.trim().toLowerCase();
  if (COMMON_DICTIONARY[lowerKey] && COMMON_DICTIONARY[lowerKey][lang]) {
    return COMMON_DICTIONARY[lowerKey][lang];
  }

  // 3. If a fallback was provided, check if fallback matches in common dictionary or translations
  if (fallback) {
    const fallbackItem = translations[fallback];
    if (fallbackItem && fallbackItem[lang]) {
      return fallbackItem[lang];
    }
    const lowerFallback = fallback.trim().toLowerCase();
    if (COMMON_DICTIONARY[lowerFallback] && COMMON_DICTIONARY[lowerFallback][lang]) {
      return COMMON_DICTIONARY[lowerFallback][lang];
    }
  }

  // 4. Default return
  if (item) {
    return item[lang] || item.en || fallback || key;
  }

  return fallback !== undefined ? fallback : key;
}

export function translateCategory(cat: string, lang: Language): string {
  if (lang === 'en') return cat;
  const lower = cat.trim().toLowerCase();
  return COMMON_DICTIONARY[lower]?.hi || cat;
}

export function translateStatus(status: string, lang: Language): string {
  if (lang === 'en') return status;
  const lower = status.trim().toLowerCase();
  return COMMON_DICTIONARY[lower]?.hi || status;
}

export function translateSeverity(severity: string, lang: Language): string {
  if (lang === 'en') return severity;
  const lower = severity.trim().toLowerCase();
  return COMMON_DICTIONARY[lower]?.hi || severity;
}
