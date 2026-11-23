/**
 * 1. SUBJECTS & SYLLABUS TOPICS DIRECTORY (JSS 1 – SSS 3)
 * Strict per-subject isolation • 250-Question Bank Target • Smart Reshuffle
 */
const SYLLABUS_DIRECTORY = {
  "JSS 1": {
    "English Studies": [
      "Parts of Speech & Sentence Types",
      "Reading Comprehension & Vocabulary",
      "Tenses & Basic Concord",
      "Oral English: Pure Vowels & Consonants"
    ],
    "Mathematics": [
      "Whole Numbers, Place Value & Roman Numerals",
      "Fractions, Decimals & Percentages",
      "Basic Algebraic Simplification & Simple Equations",
      "Plane Shapes, Perimeter & Area",
      "Basic Statistics: Mean, Median & Mode"
    ],
    "Basic Science": [
      "Living and Non-Living Things",
      "Human Development & Personal Hygiene",
      "Matter, States of Matter & Changes",
      "Energy, Renewable & Non-Renewable Sources",
      "Forces, Gravitation & Space"
    ],
    "Digital Technologies (ICT)": [
      "Introduction to Digital Technology",
      "Historical Development of Digital Devices",
      "Types of Digital Computers",
      "Hardware Setup, Ports & Booting Sequence",
      "IT Careers & Digital Ethics"
    ],
    "Agricultural Science": [
      "Meaning & Importance of Agriculture",
      "Forms of Agriculture & Crop Classification",
      "Farm Animals & Their Uses",
      "Simple Farm Tools & Maintenance"
    ],
    "National Values": [
      "Values, Honesty & Cooperation",
      "Citizenship, Rights & Duties",
      "National Symbols & Consciousness",
      "Safety & Common Crimes Prevention"
    ]
  },
  "JSS 2": {
    "English Studies": [
      "Lexis & Structure: Synonyms, Antonyms & Idioms",
      "Active & Passive Voice",
      "Direct & Indirect Speech",
      "Reading Comprehension & Summary",
      "Oral English: Diphthongs & Word Stress"
    ],
    "Mathematics": [
      "Standard Form, Indices & Approximations",
      "Algebraic Expressions & Linear Inequalities",
      "Ratio, Proportion & Commercial Arithmetic",
      "Angles, Polygons & Pythagoras' Theorem",
      "Probability & Data Presentation"
    ],
    "Basic Science": [
      "Living Things: Habitat & Adaptation",
      "Chemicals, Elements, Compounds & Mixtures",
      "Work, Energy, Power & Kinetic Theory",
      "Thermal Energy & Heat Transfer",
      "Crude Oil & Petrochemicals"
    ],
    "Digital Technologies (ICT)": [
      "Classification & Generations of Computers",
      "Computer Software & Operating Systems",
      "Number Bases & Units of Storage",
      "Word Processing & Spreadsheets",
      "Internet, Email & Cyber Safety"
    ],
    "Agricultural Science": [
      "Farm Structures & Buildings",
      "Crop Propagation & Cultural Practices",
      "Soil Fertility & Soil Management",
      "Animal Feeds & Feeding",
      "Fishery & Forest Resources"
    ],
    "National Values": [
      "Integrity, Contentment & Discipline",
      "Courage & Federation",
      "Rule of Law & Human Rights",
      "Electoral Processes & Voter Responsibility"
    ]
  },
  "JSS 3": {
    "Intermediate Science (Basic Science)": [
      "Family Traits, Heredity & Genetics",
      "Environmental Hazards: Soil Erosion, Flooding & Bush Burning",
      "Desertification, Deforestation & Ozone Depletion",
      "Drug & Substance Abuse Prevention",
      "Resources from Living & Non-Living Things",
      "Light Energy: Reflection, Refraction & Dispersion",
      "Sound Energy & Hearing Mechanism",
      "Magnetism & Electrical Circuits",
      "Radioactivity & Atomic Structure",
      "Skill Acquisition & Ethical Issues in Science"
    ],
    "Basic Technology": [
      "Isometric, Oblique & Orthographic Projections",
      "One-Point & Two-Point Perspective Drawing",
      "Processing of Timber, Metals, Ceramics, Plastics & Rubber",
      "Woodwork & Metalwork Machines and Hand Tools",
      "Building Construction: Foundations, Walls, Floors & Roofs",
      "Simple Electrical Wiring, Blueprints & Circuit Accessories",
      "Mechanical Energy Transmission: Gears, Belts, Chains & Pulleys",
      "Airflow, Pneumatics & Hydraulic Devices",
      "Periodic Maintenance & Fault Detection"
    ],
    "Agricultural Science": [
      "Packaging, Branding, Pricing & Advertising of Farm Produce",
      "Farm Records, Farm Inventory & Bookkeeping Accounts",
      "Agriculture in the Stock Exchange",
      "Export Promotion in Nigerian Agriculture",
      "Crop Pests, Parasites & Disease Control",
      "Livestock Management & Animal Health",
      "Soil Fertility, Manuring & Crop Rotation",
      "Forestry, Silviculture & Wildlife Conservation",
      "Fishery & Aquaculture Management"
    ],
    "Mathematics": [
      "Number Base System (Binary Operations & Conversions)",
      "Simple & Compound Interest and Commercial Arithmetic",
      "Factorization of Algebraic & Quadratic Expressions",
      "Simultaneous Linear Equations & Word Problems",
      "Variation: Direct, Inverse, Joint & Partial",
      "Similar Shapes, Enlargement & Scale Factor",
      "Trigonometric Ratios: Sine, Cosine & Tangent",
      "Area & Volume of Plane Figures and Solid Shapes",
      "Statistics: Mean, Median, Mode & Data Presentation"
    ],
    "English Studies": [
      "Reading Comprehension & Vocabulary Development",
      "Lexis & Structure: Synonyms, Antonyms & Idioms",
      "Parts of Speech, Tense Consistency & Concord",
      "Active and Passive Voice",
      "Direct and Indirect (Reported) Speech",
      "Oral English: Vowels, Consonants & Stress",
      "Literature-in-English: Prose, Drama & Poetry"
    ],
    "Digital Technologies (ICT)": [
      "History, Generations & Classification of Computers",
      "Computer Hardware, System Unit & Peripherals",
      "System & Application Software and Operating Systems",
      "Computer Networks, Internet & Search Engines",
      "Spreadsheet Packages (MS Excel Formulas & Charts)",
      "Digital Safety, Cyber Ethics & Career Opportunities",
      "BASIC Programming & Logic Flowcharts"
    ],
    "National Values": [
      "Supremacy of the Nigerian Constitution",
      "Right Attitude to Work & Service Delivery",
      "Elections, Electoral Bodies (INEC) & Free and Fair Voting",
      "National Security, Common Crimes & Emergency Management"
    ]
  },
  "SSS 1": {
    "English Language": [
      "Lexis & Structure: Synonyms, Antonyms & Idioms",
      "Concord, Tenses & Sentence Structure",
      "Comprehension, Summary & Register",
      "Phrases, Clauses & Parts of Speech",
      "Oral English: Vowels, Consonants, Stress & Intonation"
    ],
    "Mathematics": [
      "Number Base System & Modular Arithmetic",
      "Indices, Standard Form & Logarithms",
      "Set Theory & Venn Diagrams",
      "Linear & Quadratic Equations",
      "Logical Reasoning & Geometric Constructions",
      "Trigonometric Ratios, Mensuration & Statistics"
    ],
    "Physics": [
      "Fundamental and Derived Quantities, Units & Dimensions",
      "Position, Distance, Displacement, Speed, Velocity & Acceleration",
      "Equations of Uniformly Accelerated Motion & Graphs",
      "Friction, Circular Motion & Centripetal Force",
      "Work, Energy, Power & Mechanical Energy",
      "Heat Energy, Thermometry & Thermal Expansivity",
      "Electrostatics & Current Electricity (Ohm's Law)"
    ],
    "Chemistry": [
      "Introduction to Chemistry & Separation Techniques",
      "Particulate Nature of Matter & Atomic Structure",
      "Electronic Configuration & Chemical Bonding",
      "Kinetic Theory of Matter & Gas Laws",
      "Acids, Bases, Salts & pH Scale",
      "Water, Hardness of Water & Carbon"
    ],
    "Biology": [
      "Classification of Living Things & Organization of Life",
      "Cell Structure & Functions of Cell Organelles",
      "The Cell and Its Environment: Diffusion, Osmosis & Plasmolysis",
      "Cellular Nutrition & Cellular Respiration",
      "Excretion, Growth & Cell Division (Mitosis and Meiosis)",
      "Tissues & Supporting Systems in Plants and Animals",
      "Basic Ecological Concepts & Micro-Organisms"
    ],
    "Agricultural Science": [
      "Meaning, Importance & Problems of Agriculture in Nigeria",
      "Land Tenure Systems & Agricultural Ecology",
      "Rock Formation, Soil Formation & Soil Properties",
      "Farm Machinery, Tractors & Simple Farm Tools",
      "Crop Husbandry, Classification & Cultural Practices"
    ],
    "Economics": [
      "Basic Concepts: Scarcity, Choice, Scale of Preference & Opportunity Cost",
      "Basic Economic Problems & Economic Systems",
      "Tools of Economic Analysis: Tables, Charts & Measures of Central Tendency",
      "Theory of Production & Division of Labour",
      "Business Organizations, Population & Labour Market"
    ],
    "Digital Technologies (ICT)": [
      "Overview of Computer Systems, Hardware & Software",
      "Data Representation, Binary & Number Systems",
      "Operating Systems & File Management",
      "Word Processing, Spreadsheets & Presentation Packages",
      "Communication Systems, Networks & Internet Safety"
    ],
    "Government": [
      "Basic Concepts: State, Power, Authority, Legitimacy & Sovereignty",
      "Political Socialization, Political Culture & Participation",
      "Forms of Government & Political Ideologies",
      "Unitary, Federal, Confederal, Presidential & Parliamentary Systems",
      "Organs of Government: Executive, Legislature & Judiciary",
      "Constitutions, Rule of Law & Separation of Powers",
      "Political Parties, Pressure Groups & Electoral Systems"
    ],
    "Citizenship and Heritage Studies": [
      "Values, National Consciousness & National Identity",
      "Citizenship Acquisition, Duties, Rights & Obligations",
      "Nigerian Cultural Heritage, Historical Monuments & Preservation",
      "Representative Democracy, Rule of Law & Pillars of Democracy",
      "Universal Declaration of Human Rights (UDHR)",
      "Cultism, Youth Empowerment & National Integration"
    ]
  },
  "SSS 2": {
    "English Language": [
      "Lexis & Structure: Phrasal Verbs, Idioms & Collocations",
      "Active/Passive Voice & Reported Speech",
      "Clause Types, Sentence Synthesis & Punctuation",
      "Comprehension, Summary & Figures of Speech",
      "Oral English: Consonant Clusters, Stress & Rhymes"
    ],
    "Mathematics": [
      "Logarithms, Approximations & Percentage Error",
      "Sequences and Series (AP & GP)",
      "Quadratic & Simultaneous Equations",
      "Circle Theorems, Trigonometry & Bearings",
      "Statistics & Probability"
    ],
    "Physics": [
      "Scalars, Vectors & Equilibrium of Forces",
      "Simple Harmonic Motion & Linear Momentum",
      "Simple Machines, Heat Capacity & Latent Heat",
      "Wave Motion, Sound Waves & Reflection/Refraction of Light"
    ],
    "Chemistry": [
      "Periodic Table & Periodic Trends",
      "Rates of Reaction, Chemical Equilibrium & Energy Changes",
      "Stoichiometry, Mole Concept & Titration",
      "Redox Reactions, Electrolysis & Hydrocarbons"
    ],
    "Biology": [
      "Digestive, Transport, Respiratory & Excretory Systems",
      "Nutrient Cycling in Nature (Carbon, Nitrogen, Water Cycles)",
      "Ecological Management, Pollution & Conservation",
      "Reproductive Systems in Plants & Vertebrates"
    ],
    "Agricultural Science": [
      "Plant Nutrients, Nutrient Cycles & Irrigation/Drainage",
      "Agricultural Surveying, Farm Planning & Forestry",
      "Crop Pests, Diseases & Weed Control",
      "Animal Nutrition, Anatomy & Livestock Management",
      "Basic Economic Principles in Agriculture"
    ],
    "Economics": [
      "Theory of Demand, Supply & Price Determination",
      "Elasticity of Demand & Supply",
      "Theory of Consumer Behaviour & Utility",
      "Market Structures: Perfect Competition, Monopoly & Oligopoly",
      "Money, Inflation, Financial Institutions & Public Finance"
    ],
    "Digital Technologies (ICT)": [
      "Central Processing Unit (CPU), Memory & Logic Gates",
      "Computer Data Conversion, Registers & Buses",
      "Database Management Systems (DBMS) & SQL Basics",
      "Networking Topologies, Protocols & Cybersecurity",
      "Algorithms, Flowcharts & High-Level Programming"
    ],
    "Government": [
      "Pre-Colonial Political Systems in Nigeria",
      "Colonial Administration: Indirect Rule & Assimilation",
      "Nationalism in West Africa",
      "Pre-Independence & Post-Independence Constitutions",
      "Civil Service, Public Corporations & Local Government"
    ],
    "Citizenship and Heritage Studies": [
      "Popular Participation & Political Apathy",
      "Human Rights Limitations",
      "Drug Abuse Prevention (NAFDAC & NDLEA)",
      "Responsible Parenthood & Traffic Regulations (FRSC)",
      "Inter-Personal & Inter-Communal Relationships"
    ]
  },
  "SSS 3": {
    "English Language": [
      "WAEC/JAMB Lexis & Structure: Nearest & Opposite in Meaning",
      "Idiomatic Expressions, Register & Sentence Interpretation",
      "Grammatical Concord, Tenses & Error Correction",
      "Comprehension, Summary & Logical Inference",
      "Oral English: Vowel/Consonant Contrasts, Emphatic Stress & Rhymes"
    ],
    "Mathematics": [
      "Surds, Matrices & Determinants",
      "Coordinate Geometry & Geometry of the Earth",
      "Differentiation & Integration (Calculus)",
      "Permutations, Combinations & Binomial Theorem"
    ],
    "Physics": [
      "Gravitational, Electric & Magnetic Fields",
      "Electromagnetic Induction & A.C. Circuits",
      "Atomic Models, Photoelectric Effect & Radioactivity",
      "Basic Electronics & Semiconductors"
    ],
    "Chemistry": [
      "Organic Chemistry II: Alkanols, Alkanoic Acids, Esters & Polymers",
      "Metals, Alloys & Corrosion",
      "Qualitative/Quantitative Analysis & Nuclear Chemistry",
      "Industrial Chemistry & Biotechnology"
    ],
    "Biology": [
      "Homeostasis, Endocrine & Nervous Coordination",
      "Sense Organs & Development of Seeds/Fruits",
      "Genetics, Heredity & Variation",
      "Adaptation & Theories of Evolution"
    ],
    "Agricultural Science": [
      "Crop Improvement, Genetics & Breeding",
      "Animal Health, Diseases & Parasite Control",
      "Aquaculture, Apiculture & Agricultural Finance",
      "Agricultural Marketing, Extension & Farm Accounts"
    ],
    "Economics": [
      "National Income Accounting & Economic Growth/Development",
      "International Trade, Balance of Payments & Exchange Rates",
      "Economic Integration (ECOWAS, AfCFTA, OPEC, IMF, World Bank)",
      "Petroleum & the Nigerian Economy, Agriculture & Industrialization"
    ],
    "Digital Technologies (ICT)": [
      "Networking, World Wide Web, HTML & Web Design",
      "Database Security, Backup & Data Integrity",
      "Graphics, Multimedia & Desktop Publishing",
      "Cyber Ethics, Data Privacy & Emerging Technologies (AI/Cloud)"
    ],
    "Government": [
      "Military Rule in Nigeria & Major Political Crises",
      "Nigeria's Foreign Policy & Non-Alignment",
      "International Organizations (ECOWAS, AU, Commonwealth, OPEC, UN)",
      "Electoral & Constitutional Reforms"
    ],
    "Citizenship and Heritage Studies": [
      "Categories of Human Rights & Public Service Reforms",
      "Anti-Corruption Agencies & Civil Society Organizations",
      "Constitutional Democracy & Human Trafficking (NAPTIP)",
      "Global Citizenship & Heritage Conservation"
    ]
  }
};

const BANK_STORAGE_KEY = "SCHOLARS_CBT_MASTER_BANK_V5";
const RECORDS_STORAGE_KEY = "SCHOLARS_CBT_RESULTS_HISTORY_V3";
const TOURNAMENTS_STORAGE_KEY = "SCHOLARS_CBT_TOURNAMENTS_V1";
const ACTIVE_SESSION_KEY = "SCHOLARS_CBT_ACTIVE_SESSION_V2";
const SEEN_HISTORY_KEY = "SCHOLARS_CBT_SEEN_IDS_V1";
const ACTIVE_PROFILE_KEY = "SCHOLARS_CBT_ACTIVE_PROFILE_V1";
const MAX_QUESTIONS_PER_SUBJECT = 250;
const MAX_TAB_WARNINGS = 3;
const LETTERS = ["A", "B", "C", "D"];

let questionBank = [];
let questionCountsBySubject = {};
let totalServerQuestionCount = 0;
let examRecords = [];
let tournamentEntries = [];
let tournamentBracketData = {
  isOpen: false,
  activeStage: "qualifiers",
  cupName: "Scholars Super Cup",
  reps: {},
  playoffs: { JSS: [], SSS: [] },
  juniorChampion: null,
  seniorChampion: null,
  finale: [],
  overallChampion: null,
  entries: []
};
let stagedDiagramDataURL = null;
let autoSaveIntervalId = null;
let authMode = "login";
let activeStudentProfile = JSON.parse(localStorage.getItem(ACTIVE_PROFILE_KEY) || "null");

let session = {
  candidateName: "",
  regNumber: "",
  classLevel: "JSS 3",
  subjects: [],
  questionsPerSubject: 15,
  questionsBySubject: {},
  activeSubject: "",
  currentIndexBySubject: {},
  answers: {},
  flagged: new Set(),
  tabWarnings: 0,
  durationSeconds: 1800,
  secondsRemaining: 1800,
  timerInterval: null,
  isTournament: false,
  tournamentDivision: "",
  tournamentStage: "",
  tournamentTitle: ""
};

let calcState = {
  current: "0",
  previous: null,
  operator: null,
  resetNext: false
};

function normalizePersonName(name) {
  return String(name || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeClassCode(cls) {
  const cleaned = String(cls || "").trim().toUpperCase().replace(/\s+/g, " ");
  const aliases = {
    "SS 1": "SSS 1",
    "SS 2": "SSS 2",
    "SS 3": "SSS 3",
    "JSS1": "JSS 1",
    "JSS2": "JSS 2",
    "JSS3": "JSS 3",
    "SSS1": "SSS 1",
    "SSS2": "SSS 2",
    "SSS3": "SSS 3"
  };
  return aliases[cleaned] || cleaned;
}

function getInitials(fullName) {
  const words = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "SC";
  return ((words[0][0] || "") + (words[words.length - 1][0] || "")).toUpperCase() || "SC";
}

function isExaminerUnlocked() {
  const params = new URLSearchParams(window.location.search);
  return params.get("examiner") === "1" && Boolean(document.getElementById("view-admin"));
}

function renderFormattedPrompt(rawPrompt) {
  const text = String(rawPrompt || "");
  if (!text.includes("<")) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  const clean = text
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/javascript:/gi, "");
  return clean
    .replace(/<table/gi, '<div class="question-table-wrap"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

function renderAvatarContent(el, student) {
  if (!el) return;
  if (student && student.avatar_data) {
    el.innerHTML = `<img src="${student.avatar_data}" alt="${student.full_name}" />`;
  } else {
    el.textContent = getInitials(student ? student.full_name : "SC");
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const loginBtn = document.getElementById("tab-auth-login");
  const regBtn = document.getElementById("tab-auth-register");
  const submitBtn = document.getElementById("auth-submit-btn");
  const feedback = document.getElementById("auth-feedback");

  if (loginBtn) loginBtn.className = mode === "login" ? "btn-primary" : "btn-outline";
  if (regBtn) regBtn.className = mode === "register" ? "btn-primary" : "btn-outline";
  if (submitBtn) {
    submitBtn.textContent = mode === "login" ? "Verify & Sign In" : "Create Profile & Sign In";
  }
  if (feedback) feedback.textContent = "";
}

async function handleStudentAuth(event) {
  event.preventDefault();
  const school_name = (document.getElementById("auth-school")?.value || "").trim();
  const class_level = normalizeClassCode(document.getElementById("auth-class")?.value || "JSS 3");
  const full_name = (document.getElementById("auth-fullname")?.value || "").trim();
  const pin = (document.getElementById("auth-pin")?.value || "").trim();
  const feedback = document.getElementById("auth-feedback");

  if (!/^\d{4}$/.test(pin)) {
    if (feedback) {
      feedback.style.color = "#dc2626";
      feedback.textContent = "PIN must be exactly 4 digits.";
    }
    return;
  }

  const endpoint = authMode === "register" ? "/api/register" : "/api/login";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school_name, class_level, full_name, pin })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      if (feedback) {
        feedback.style.color = "#dc2626";
        feedback.textContent = data.error || "Verification failed.";
      }
      return;
    }
    if (feedback) feedback.textContent = "";
    await syncRecordsAndBracketFromServer();
    applySignedInProfile(data.student);
  } catch (err) {
    if (feedback) {
      feedback.style.color = "#dc2626";
      feedback.textContent = "Could not reach Flask server. Make sure app.py is running.";
    }
  }
}

function applySignedInProfile(student) {
  if (!student) return;
  const normalizedStudent = {
    ...student,
    class_level: normalizeClassCode(student.class_level)
  };
  activeStudentProfile = normalizedStudent;
  localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(normalizedStudent));

  const nameInput = document.getElementById("candidate-name");
  const classSelect = document.getElementById("candidate-class");
  if (nameInput) {
    nameInput.value = normalizedStudent.full_name;
    nameInput.readOnly = true;
  }
  if (classSelect) {
    classSelect.value = normalizedStudent.class_level;
    classSelect.disabled = true;
    renderCandidateSubjects();
  }

  const authBox = document.getElementById("student-auth-box");
  if (authBox) authBox.classList.add("hidden");

  const badge = document.getElementById("nav-profile-badge");
  const badgeText = document.getElementById("nav-profile-text");
  const badgeAvatar = document.getElementById("nav-profile-avatar");
  if (badge && badgeText) {
    badgeText.textContent = `${normalizedStudent.full_name} • ${normalizedStudent.class_level}`;
    renderAvatarContent(badgeAvatar, normalizedStudent);
    badge.classList.remove("hidden");
  }

  const lbClass = document.getElementById("leaderboard-class-filter");
  if (lbClass) lbClass.value = normalizedStudent.class_level;
  renderStudentDashboard();
  renderClassLeaderboard();
  renderWorldCupBracket();
}

function handleProfilePhotoUpload(event) {
  if (!activeStudentProfile) {
    alert("Please sign in on the Exam tab first to upload your profile photo.");
    return;
  }
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = async function () {
      const canvas = document.createElement("canvas");
      const size = 180;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      const minSide = Math.min(img.width, img.height);
      const sx = (img.width - minSide) / 2;
      const sy = (img.height - minSide) / 2;
      ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.78);

      activeStudentProfile.avatar_data = compressedDataUrl;
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(activeStudentProfile));
      renderAvatarContent(document.getElementById("nav-profile-avatar"), activeStudentProfile);
      renderAvatarContent(document.getElementById("personal-avatar-lg"), activeStudentProfile);

      try {
        await fetch("/api/student/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: activeStudentProfile.id,
            avatar_data: compressedDataUrl
          })
        });
        await syncRecordsAndBracketFromServer();
      } catch (err) {}
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function logoutStudentProfile() {
  try {
    await fetch("/api/logout", { method: "POST" });
  } catch (e) {}

  activeStudentProfile = null;
  localStorage.removeItem(ACTIVE_PROFILE_KEY);

  const nameInput = document.getElementById("candidate-name");
  const classSelect = document.getElementById("candidate-class");
  if (nameInput) {
    nameInput.readOnly = false;
    nameInput.value = "";
  }
  if (classSelect) {
    classSelect.disabled = false;
  }

  const badge = document.getElementById("nav-profile-badge");
  const badgeAvatar = document.getElementById("nav-profile-avatar");
  if (badge) badge.classList.add("hidden");
  if (badgeAvatar) badgeAvatar.textContent = "SC";

  const authBox = document.getElementById("student-auth-box");
  if (authBox) authBox.classList.remove("hidden");
  renderStudentDashboard();
  renderWorldCupBracket();
}

function computeDailyStreakForCandidate(recordsList) {
  const validDates = Array.from(new Set(
    (recordsList || [])
      .filter(r => Number(r.percentage || 0) >= 40)
      .map(r => {
        if (r.isoDate) return r.isoDate;
        const parsed = new Date(r.date);
        return isNaN(parsed.getTime())
          ? new Date().toISOString().slice(0, 10)
          : parsed.toISOString().slice(0, 10);
      })
  )).sort();

  if (validDates.length === 0) return 0;

  let streak = 1;
  for (let i = validDates.length - 1; i > 0; i--) {
    const curr = new Date(validDates[i]);
    const prev = new Date(validDates[i - 1]);
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) streak++;
    else break;
  }
  return streak;
}

/**
 * 2. SERVER-FIRST SYNC (ALWAYS PULLS LIVE RECORDS & PAINTS UI)
 */
async function rescueAndPurgeBrowserStorage() {
  try { localStorage.removeItem(BANK_STORAGE_KEY); } catch (e) {}

  try {
    const rawRecs = localStorage.getItem(RECORDS_STORAGE_KEY);
    if (rawRecs) {
      const localRecs = JSON.parse(rawRecs);
      if (Array.isArray(localRecs) && localRecs.length > 0) {
        const syncRes = await fetch("/api/records/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localRecs)
        });
        if (syncRes.ok) {
          localStorage.removeItem(RECORDS_STORAGE_KEY);
        }
      } else {
        localStorage.removeItem(RECORDS_STORAGE_KEY);
      }
    }
  } catch (e) {}

  try { localStorage.removeItem(TOURNAMENTS_STORAGE_KEY); } catch (e) {}
}

async function syncRecordsAndBracketFromServer() {
  await rescueAndPurgeBrowserStorage();
  try {
    const [rRes, bRes, cRes] = await Promise.all([
      fetch("/api/records", { cache: "no-store" }),
      fetch("/api/tournaments/bracket", { cache: "no-store" }),
      fetch("/api/questions/counts", { cache: "no-store" })
    ]);

    if (rRes.ok) {
      const serverRecords = await rRes.json();
      if (Array.isArray(serverRecords)) {
        examRecords = serverRecords;
      }
    }

    if (bRes.ok) {
      const serverBracket = await bRes.json();
      if (serverBracket && typeof serverBracket === "object") {
        tournamentBracketData = serverBracket;
        tournamentEntries = serverBracket.entries || [];
      }
    }

    if (cRes.ok) {
      const cData = await cRes.json();
      totalServerQuestionCount = Number(cData.total || 0);
      questionCountsBySubject = cData.bySubject || {};
    }
  } catch (err) {
    console.error("Server sync error:", err);
  }

  renderStudentDashboard();
  renderClassLeaderboard();
  renderWorldCupBracket();
  renderTournamentStandings();
}

async function fetchQuestionsForSubjects(classLevel, subjectsList) {
  const query = encodeURIComponent((subjectsList || []).join("||"));
  const res = await fetch(
    `/api/questions?class_level=${encodeURIComponent(classLevel)}&subjects=${query}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load questions from server.");
  return await res.json();
}

async function loadAllQuestionsForAdmin() {
  try {
    const res = await fetch("/api/questions", { cache: "no-store" });
    if (res.ok) {
      questionBank = await res.json();
      totalServerQuestionCount = questionBank.length;
    }
  } catch (err) {}
}

async function syncFromServer(includeFullBank = false) {
  await syncRecordsAndBracketFromServer();
  if (includeFullBank) {
    await loadAllQuestionsForAdmin();
  }
}

function getCandidateIdentityKey(name, regNumber, classLevel) {
  if (regNumber && regNumber.trim()) {
    return `reg__${regNumber.trim().toLowerCase()}`;
  }
  return `name__${normalizePersonName(name)}__${normalizeClassCode(classLevel)}`;
}

function getSeenQuestionIdSet(candidateName, regNumber, classLevel) {
  const seen = new Set();
  const key = getCandidateIdentityKey(candidateName, regNumber, classLevel);

  examRecords.forEach(r => {
    const rKey = getCandidateIdentityKey(r.candidateName, r.regNumber, r.classLevel);
    if (rKey === key && Array.isArray(r.questionIds)) {
      r.questionIds.forEach(id => seen.add(String(id)));
    }
  });

  try {
    const localMap = JSON.parse(localStorage.getItem(SEEN_HISTORY_KEY) || "{}");
    (localMap[key] || []).forEach(id => seen.add(String(id)));
  } catch (err) {}

  return seen;
}

function recordSeenQuestionIdsLocally(candidateName, regNumber, classLevel, ids) {
  const key = getCandidateIdentityKey(candidateName, regNumber, classLevel);
  try {
    const localMap = JSON.parse(localStorage.getItem(SEEN_HISTORY_KEY) || "{}");
    const existing = new Set(localMap[key] || []);
    ids.forEach(id => existing.add(String(id)));
    localMap[key] = Array.from(existing);
    localStorage.setItem(SEEN_HISTORY_KEY, JSON.stringify(localMap));
  } catch (err) {}
}

function checkResumeBanner() {
  const banner = document.getElementById("resume-session-banner");
  const summaryEl = document.getElementById("resume-session-summary");
  if (!banner || !summaryEl) return;

  const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!raw) {
    banner.classList.add("hidden");
    return;
  }

  try {
    const saved = JSON.parse(raw);
    if (!saved || !saved.candidateName || !Array.isArray(saved.subjects) || saved.subjects.length === 0) {
      banner.classList.add("hidden");
      return;
    }
    const minsLeft = Math.max(1, Math.ceil((saved.secondsRemaining || 60) / 60));
    summaryEl.textContent =
      `${saved.candidateName} (${saved.classLevel}) — ~${minsLeft} min(s) remaining`;
    banner.classList.remove("hidden");
  } catch (err) {
    banner.classList.add("hidden");
  }
}

function persistActiveExamProgress() {
  const examView = document.getElementById("view-exam");
  if (!examView || !examView.classList.contains("active")) return;

  const snapshot = {
    candidateName: session.candidateName,
    regNumber: session.regNumber,
    classLevel: session.classLevel,
    subjects: session.subjects,
    questionsPerSubject: session.questionsPerSubject,
    questionsBySubject: session.questionsBySubject,
    activeSubject: session.activeSubject,
    currentIndexBySubject: session.currentIndexBySubject,
    answers: session.answers,
    flaggedArray: Array.from(session.flagged),
    tabWarnings: session.tabWarnings,
    durationSeconds: session.durationSeconds,
    secondsRemaining: session.secondsRemaining,
    isTournament: session.isTournament,
    tournamentDivision: session.tournamentDivision,
    tournamentStage: session.tournamentStage,
    tournamentTitle: session.tournamentTitle
  };
  try {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(snapshot));
  } catch (e) {}
}

function clearSavedActiveSession() {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  const banner = document.getElementById("resume-session-banner");
  if (banner) banner.classList.add("hidden");
}

function resumeSavedSession() {
  const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    session = {
      candidateName: saved.candidateName,
      regNumber: saved.regNumber || "",
      classLevel: normalizeClassCode(saved.classLevel),
      subjects: saved.subjects,
      questionsPerSubject: saved.questionsPerSubject || 15,
      questionsBySubject: saved.questionsBySubject,
      activeSubject: saved.activeSubject || saved.subjects[0],
      currentIndexBySubject: saved.currentIndexBySubject || {},
      answers: saved.answers || {},
      flagged: new Set(saved.flaggedArray || []),
      tabWarnings: saved.tabWarnings || 0,
      durationSeconds: saved.durationSeconds || 1800,
      secondsRemaining: saved.secondsRemaining || 600,
      timerInterval: null,
      isTournament: Boolean(saved.isTournament),
      tournamentDivision: saved.tournamentDivision || "",
      tournamentStage: saved.tournamentStage || "",
      tournamentTitle: saved.tournamentTitle || ""
    };
    enterLiveExamArena();
  } catch (err) {
    clearSavedActiveSession();
  }
}

function discardSavedSession() {
  clearSavedActiveSession();
}

window.addEventListener("DOMContentLoaded", async () => {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  if (activeStudentProfile) applySignedInProfile(activeStudentProfile);
  renderCandidateSubjects();
  checkResumeBanner();
  await syncRecordsAndBracketFromServer();
  if (activeStudentProfile) applySignedInProfile(activeStudentProfile);

  if (window.location.hash === "#admin" && isExaminerUnlocked()) {
    openAdminGate();
  }

  document.addEventListener("visibilitychange", () => {
    const examView = document.getElementById("view-exam");
    if (document.hidden && examView && examView.classList.contains("active")) {
      handleTabLeaveViolation();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "A" && isExaminerUnlocked()) {
      e.preventDefault();
      openAdminGate();
      return;
    }

    const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    const examActive = document.getElementById("view-exam")?.classList.contains("active");
    if (!examActive) return;

    const key = e.key.toUpperCase();
    const currentQ = getActiveQuestionObject();
    if (!currentQ) return;

    if (["A", "B", "C", "D"].includes(key)) {
      const idx = LETTERS.indexOf(key);
      if (idx < currentQ.options.length) chooseOption(currentQ.id, idx);
    } else if (key === "N" || e.key === "ArrowRight") {
      moveQuestion(1);
    } else if (key === "P" || e.key === "ArrowLeft") {
      moveQuestion(-1);
    } else if (key === "R") {
      clearCurrentAnswer();
    } else if (key === "S") {
      promptExamSubmission();
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleTabLeaveViolation() {
  session.tabWarnings = (session.tabWarnings || 0) + 1;
  const warnEl = document.getElementById("live-tab-warnings");
  if (warnEl) warnEl.textContent = `${session.tabWarnings} / ${MAX_TAB_WARNINGS}`;
  persistActiveExamProgress();

  if (session.tabWarnings >= MAX_TAB_WARNINGS) {
    alert(`Maximum tab-switch limit (${MAX_TAB_WARNINGS}) reached! Your exam is being auto-submitted.`);
    computeAndSaveResults();
  } else {
    alert(`Warning ${session.tabWarnings} of ${MAX_TAB_WARNINGS}: Leaving the exam tab/window is not permitted during an active test.`);
  }
}

async function switchPortalView(mode) {
  if (mode === "admin" && !isExaminerUnlocked()) {
    mode = "student";
  }

  document.getElementById("btn-student-view")?.classList.toggle("active", mode === "student");
  document.getElementById("btn-leaderboard-view")?.classList.toggle("active", mode === "leaderboard");
  document.getElementById("btn-tournaments-view")?.classList.toggle("active", mode === "tournaments");
  document.getElementById("btn-dashboard-view")?.classList.toggle("active", mode === "dashboard");
  document.getElementById("btn-admin-view")?.classList.toggle("active", mode === "admin");
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));

  await syncFromServer(mode === "admin");

  if (mode === "admin") {
    const adminSection = document.getElementById("view-admin");
    if (adminSection) {
      adminSection.classList.add("active");
      syncAdminSubjectDropdown();
      syncAdminTournamentControls();
      renderAdminRepository();
      renderAdminMonitor();
      renderWeakTopicsAnalytics();
    }
  } else if (mode === "leaderboard") {
    document.getElementById("view-leaderboard")?.classList.add("active");
    renderClassLeaderboard();
  } else if (mode === "tournaments") {
    document.getElementById("view-tournaments")?.classList.add("active");
    renderWorldCupBracket();
    renderTournamentStandings();
  } else if (mode === "dashboard") {
    document.getElementById("view-dashboard")?.classList.add("active");
    renderStudentDashboard();
  } else {
    document.getElementById("view-lobby")?.classList.add("active");
    renderCandidateSubjects();
    checkResumeBanner();
  }
  scrollToTop();
}

async function openAdminGate() {
  if (!isExaminerUnlocked()) {
    switchPortalView("student");
    return;
  }

  const enteredPin = prompt("Restricted Examiner Admin — Enter Examiner Passcode:");
  if (enteredPin === null) return;

  const cleanPin = enteredPin.trim();
  if (!cleanPin) {
    alert("Please enter the Examiner Passcode.");
    return;
  }

  try {
    const res = await fetch("/api/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: cleanPin })
    });
    const data = await res.json();
    if (res.ok && data.valid) {
      switchPortalView("admin");
      return;
    }
  } catch (err) {
    alert("Could not reach server to verify passcode.");
    return;
  }

  alert("Incorrect Examiner Passcode.");
}

function toggleCustomDurationInput() {
  const sel = document.getElementById("exam-duration-select")?.value;
  document.getElementById("custom-duration-row")?.classList.toggle("hidden", sel !== "CUSTOM");
}

function handleQuestionsPerSubjectChange() {
  const sel = document.getElementById("questions-per-subject-select")?.value;
  document.getElementById("custom-qcount-row")?.classList.toggle("hidden", sel !== "CUSTOM");
  refreshSelectedSubjectCounter();
}

function getSelectedQuestionsPerSubject() {
  const sel = document.getElementById("questions-per-subject-select")?.value;
  if (sel === "CUSTOM") {
    const val = parseInt(document.getElementById("custom-qcount-input")?.value, 10);
    if (!val || val < 5) return 5;
    return Math.min(MAX_QUESTIONS_PER_SUBJECT, val);
  }
  return Math.min(MAX_QUESTIONS_PER_SUBJECT, parseInt(sel, 10) || 15);
}

function getSelectedDurationMinutes() {
  const sel = document.getElementById("exam-duration-select")?.value;
  if (sel === "CUSTOM") {
    const val = parseInt(document.getElementById("custom-duration-mins")?.value, 10);
    return val && val >= 5 ? val : 30;
  }
  return parseInt(sel, 10) || 30;
}

/**
 * 3. CANDIDATE LOBBY & STRICT SUBJECT POOL DISPLAY
 */
function renderCandidateSubjects() {
  const classEl = document.getElementById("candidate-class");
  const grid = document.getElementById("candidate-subject-grid");
  if (!classEl || !grid) return;

  const classLevel = normalizeClassCode(classEl.value);
  const subjectsMap = SYLLABUS_DIRECTORY[classLevel] || {};
  const subjectNames = Object.keys(subjectsMap);

  grid.innerHTML = "";

  subjectNames.forEach((subject, idx) => {
    const countKey = `${classLevel}__${subject}`;
    const uploadedCount = questionCountsBySubject[countKey] !== undefined
      ? questionCountsBySubject[countKey]
      : questionBank.filter(q => normalizeClassCode(q.classLevel) === classLevel && q.subject === subject).length;

    const label = document.createElement("label");
    label.className = "subject-card-label";
    label.innerHTML = `
      <input type="checkbox" name="candidate-sub" value="${subject}" ${idx < 3 ? "checked" : ""} onchange="refreshSelectedSubjectCounter()" />
      <div>
        <div class="subject-card-title">${subject}</div>
        <div class="subject-card-sub">Past Q Bank: ${uploadedCount} / ${MAX_QUESTIONS_PER_SUBJECT} uploaded</div>
      </div>
    `;
    grid.appendChild(label);
  });

  refreshSelectedSubjectCounter();
}

function refreshSelectedSubjectCounter() {
  const pill = document.getElementById("selected-subjects-pill");
  if (!pill) return;
  const checked = document.querySelectorAll('input[name="candidate-sub"]:checked');
  const count = checked.length;
  const qPerSub = getSelectedQuestionsPerSubject();
  pill.textContent = `${count} Subject${count === 1 ? "" : "s"} • ${count * qPerSub} Qs Total`;
}

function shuffleList(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleQuestionOptions(questionObj) {
  const opts = Array.isArray(questionObj.options) ? [...questionObj.options] : ["A", "B", "C", "D"];
  const originalCorrect = Number(questionObj.correctIndex) || 0;
  const indexed = opts.map((text, idx) => ({ text, isCorrect: idx === originalCorrect }));
  const shuffled = shuffleList(indexed);
  const newCorrectIndex = Math.max(0, shuffled.findIndex(item => item.isCorrect));

  return {
    ...questionObj,
    options: shuffled.map(item => item.text),
    correctIndex: newCorrectIndex
  };
}

/**
 * 4. SMART RESHUFFLE ENGINE (Prioritizes Unseen WAEC/JAMB/NECO Questions)
 */
function buildSmartShuffledPool(sourceQuestions, classLevel, subject, desiredCount, seenIdSet) {
  const normClass = normalizeClassCode(classLevel);
  const allSubjectQuestions = (sourceQuestions || []).filter(
    q => normalizeClassCode(q.classLevel) === normClass && q.subject === subject
  );

  const unseen = shuffleList(allSubjectQuestions.filter(q => !seenIdSet.has(String(q.id))));
  const seen = shuffleList(allSubjectQuestions.filter(q => seenIdSet.has(String(q.id))));

  const prioritized = [...unseen, ...seen].slice(0, desiredCount).map(q => shuffleQuestionOptions(q));

  const topics = (SYLLABUS_DIRECTORY[normClass] && SYLLABUS_DIRECTORY[normClass][subject]) || ["General Topic"];
  while (prioritized.length < desiredCount) {
    const slotNum = prioritized.length + 1;
    const topicName = topics[(slotNum - 1) % topics.length];
    prioritized.push({
      id: `slot_${normClass}_${subject}_${slotNum}`,
      classLevel: normClass,
      subject,
      topic: topicName,
      examSource: "Slot Pending Upload",
      prompt: `[${subject} — Slot #${slotNum} (${topicName})] Upload WAEC/JAMB/NECO past questions for ${normClass} ${subject} in Examiner Admin to replace this slot.`,
      diagramSVG: null,
      diagramImage: null,
      options: [
        `${subject} Option A (Sample Correct)`,
        `${subject} Option B`,
        `${subject} Option C`,
        `${subject} Option D`
      ],
      correctIndex: 0,
      explanation: `Strictly in ${subject} (${normClass}) under topic: ${topicName}.`
    });
  }

  return prioritized;
}

async function startOfficialExam(event) {
  event.preventDefault();
  const candidateName = (document.getElementById("candidate-name")?.value || "").trim();
  const regNumber = (document.getElementById("candidate-reg-no")?.value || "").trim();
  const classLevel = normalizeClassCode(document.getElementById("candidate-class")?.value || "JSS 3");
  const durationMins = getSelectedDurationMinutes();
  const questionsPerSubject = getSelectedQuestionsPerSubject();
  const checkedBoxes = Array.from(document.querySelectorAll('input[name="candidate-sub"]:checked'));

  if (checkedBoxes.length === 0) {
    alert("Please tick at least one subject to start.");
    return;
  }

  const selectedSubjects = checkedBoxes.map(box => box.value);
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Loading Live Questions from Server...";
  }

  let fetchedPool = [];
  try {
    fetchedPool = await fetchQuestionsForSubjects(classLevel, selectedSubjects);
  } catch (err) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Start Examination Now →";
    }
    alert("Could not load questions from server. Check your internet connection and try again.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Start Examination Now →";
  }

  const seenIdSet = getSeenQuestionIdSet(candidateName, regNumber, classLevel);
  const questionsBySubject = {};
  const currentIndexBySubject = {};

  selectedSubjects.forEach(subject => {
    questionsBySubject[subject] = buildSmartShuffledPool(
      fetchedPool,
      classLevel,
      subject,
      questionsPerSubject,
      seenIdSet
    );
    currentIndexBySubject[subject] = 0;
  });

  const totalSeconds = durationMins * 60;
  session = {
    candidateName,
    regNumber,
    classLevel,
    subjects: selectedSubjects,
    questionsPerSubject,
    questionsBySubject,
    activeSubject: selectedSubjects[0],
    currentIndexBySubject,
    answers: {},
    flagged: new Set(),
    tabWarnings: 0,
    durationSeconds: totalSeconds,
    secondsRemaining: totalSeconds,
    timerInterval: null,
    isTournament: false,
    tournamentDivision: "",
    tournamentStage: "",
    tournamentTitle: ""
  };

  clearSavedActiveSession();
  enterLiveExamArena();
}

/**
 * 4B. SCHOLARS SUPER CUP (WORLD CUP BRACKET, BRIEFING & EXAMINER CONTROL)
 */
const STAGE_LABELS = {
  qualifiers: "Stage 1: Class Qualifiers",
  playoffs: "Stage 2: Division Playoffs",
  finale: "Stage 3: Grand Finale"
};

function renderWorldCupBracket() {
  const data = tournamentBracketData || {};
  const isOpen = Boolean(data.isOpen);
  const stage = data.activeStage || "qualifiers";
  const cupName = data.cupName || "Scholars Super Cup";

  const statusBadge = document.getElementById("wc-status-badge");
  const titleEl = document.getElementById("wc-cup-title");
  const descEl = document.getElementById("wc-stage-desc");
  const joinBtn = document.getElementById("wc-join-btn");
  const noteEl = document.getElementById("wc-eligibility-note");

  if (titleEl) titleEl.textContent = `${cupName} — World Cup Edition`;
  if (statusBadge) {
    statusBadge.textContent = isOpen
      ? `LIVE NOW • ${STAGE_LABELS[stage] || stage}`
      : "CLOSED • Waiting for Examiner";
    statusBadge.style.background = isOpen ? "#ecfdf5" : "#fef3c7";
    statusBadge.style.color = isOpen ? "#059669" : "#92400e";
    statusBadge.style.borderColor = isOpen ? "#34d399" : "#fbbf24";
  }

  if (descEl) {
    if (stage === "qualifiers") {
      descEl.textContent = "Stage 1 (Class Qualifiers): Verified members in JSS 1–3 & SSS 1–3 compete on their own devices. The #1 scorer in each class claims the Class Representative slot.";
    } else if (stage === "playoffs") {
      descEl.textContent = "Stage 2 (Division Playoffs): Class Representatives battle in the Junior Wing (JSS 1–3) and Senior Wing (SSS 1–3) to crown the two Division Champions.";
    } else {
      descEl.textContent = "Stage 3 (Grand Finale): The Junior Division Champion faces the Senior Division Champion for the Overall School Crown!";
    }
  }

  ["qualifiers", "playoffs", "finale"].forEach(st => {
    document.getElementById(`wc-step-${st}`)?.classList.toggle("active", st === stage);
  });

  if (joinBtn && noteEl) {
    if (!isOpen) {
      joinBtn.disabled = true;
      joinBtn.style.opacity = "0.6";
      joinBtn.textContent = "🔒 Round Closed by Examiner";
      noteEl.textContent = "Only the Examiner Admin can open a tournament round.";
    } else if (!activeStudentProfile) {
      joinBtn.disabled = false;
      joinBtn.style.opacity = "1";
      joinBtn.textContent = "Sign In to Join Active Round →";
      noteEl.textContent = "You must be a registered, signed-in member to participate.";
    } else {
      joinBtn.disabled = false;
      joinBtn.style.opacity = "1";
      joinBtn.textContent = `View Briefing & Join ${STAGE_LABELS[stage]} →`;
      noteEl.textContent = `Signed in as ${activeStudentProfile.full_name} (${activeStudentProfile.class_level}).`;
    }
  }

  const renderWingSlots = (containerId, classList) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = classList.map(cls => {
      const rep = (data.reps || {})[cls];
      if (!rep) {
        return `
          <div class="wc-slot">
            <div class="wc-slot-user">
              <div class="wc-mini-avatar">?</div>
              <div>
                <div class="wc-slot-name" style="color:#64748b;">Awaiting ${cls} Rep</div>
                <div class="wc-slot-class">${cls} • Open Qualifier</div>
              </div>
            </div>
            <span class="wc-slot-score" style="color:#94a3b8;">TBD</span>
          </div>
        `;
      }
      const avatarHtml = rep.avatarData
        ? `<img src="${rep.avatarData}" alt="${rep.studentName}" />`
        : getInitials(rep.studentName);
      return `
        <div class="wc-slot filled">
          <div class="wc-slot-user">
            <div class="wc-mini-avatar">${avatarHtml}</div>
            <div>
              <div class="wc-slot-name">${rep.studentName}</div>
              <div class="wc-slot-class">${cls} Rep • ${rep.percentage}%</div>
            </div>
          </div>
          <span class="wc-slot-score">${rep.pointsEarned} pts</span>
        </div>
      `;
    }).join("");
  };

  renderWingSlots("wc-junior-slots", ["JSS 1", "JSS 2", "JSS 3"]);
  renderWingSlots("wc-senior-slots", ["SSS 1", "SSS 2", "SSS 3"]);

  const jChamp = data.juniorChampion;
  const sChamp = data.seniorChampion;
  const oChamp = data.overallChampion;

  const jName = document.getElementById("wc-junior-champ-name");
  const jMeta = document.getElementById("wc-junior-champ-meta");
  if (jName && jMeta) {
    jName.textContent = jChamp ? jChamp.studentName : "TBD";
    jMeta.textContent = jChamp ? `${jChamp.classLevel} • ${jChamp.pointsEarned} pts (${jChamp.percentage}%)` : "Awaiting Junior Playoffs";
  }

  const sName = document.getElementById("wc-senior-champ-name");
  const sMeta = document.getElementById("wc-senior-champ-meta");
  if (sName && sMeta) {
    sName.textContent = sChamp ? sChamp.studentName : "TBD";
    sMeta.textContent = sChamp ? `${sChamp.classLevel} • ${sChamp.pointsEarned} pts (${sChamp.percentage}%)` : "Awaiting Senior Playoffs";
  }

  const oName = document.getElementById("wc-overall-champ-name");
  const oMeta = document.getElementById("wc-overall-champ-meta");
  if (oName && oMeta) {
    oName.textContent = oChamp ? oChamp.studentName : "To Be Crowned";
    oMeta.textContent = oChamp
      ? `${oChamp.classLevel} • ${oChamp.pointsEarned} pts (${oChamp.percentage}%)`
      : "Awaiting Grand Finale";
  }
}

function checkStudentTournamentEligibility() {
  const data = tournamentBracketData || {};
  if (!data.isOpen) {
    return { ok: false, reason: "The tournament is currently closed. Wait for the Examiner Admin to open the round." };
  }
  if (!activeStudentProfile) {
    return { ok: false, reason: "Only registered, signed-in platform members can compete. Please sign in on the Exam tab first." };
  }

  const stage = data.activeStage || "qualifiers";
  const myId = activeStudentProfile.id;
  const myClass = normalizeClassCode(activeStudentProfile.class_level);

  const alreadyPlayed = (data.entries || []).some(
    e => Number(e.studentId) === Number(myId) && e.stage === stage
  );
  if (alreadyPlayed) {
    return { ok: false, reason: `You have already submitted your official score for ${STAGE_LABELS[stage]}.` };
  }

  if (stage === "playoffs") {
    const classRep = (data.reps || {})[myClass];
    if (!classRep || Number(classRep.studentId) !== Number(myId)) {
      return { ok: false, reason: `Only the verified ${myClass} Class Representative can compete in Stage 2 (Division Playoffs).` };
    }
  } else if (stage === "finale") {
    const jChamp = data.juniorChampion;
    const sChamp = data.seniorChampion;
    const isFinalist =
      (jChamp && Number(jChamp.studentId) === Number(myId)) ||
      (sChamp && Number(sChamp.studentId) === Number(myId));
    if (!isFinalist) {
      return { ok: false, reason: "Only the Junior Division Champion and Senior Division Champion can compete in the Grand Finale." };
    }
  }

  return { ok: true, stage };
}

function openTournamentBriefingModal() {
  const check = checkStudentTournamentEligibility();
  if (!check.ok) {
    alert(check.reason);
    if (!activeStudentProfile) switchPortalView("student");
    return;
  }

  const stage = check.stage;
  const titleEl = document.getElementById("briefing-stage-title");
  const infoEl = document.getElementById("briefing-student-info");
  const modal = document.getElementById("tournament-briefing-modal");

  if (titleEl) titleEl.textContent = `🏆 ${tournamentBracketData.cupName || "Scholars Super Cup"} — ${STAGE_LABELS[stage]}`;
  if (infoEl) {
    infoEl.textContent = `Participant: ${activeStudentProfile.full_name} (${activeStudentProfile.class_level} • ${activeStudentProfile.school_name}) — 30 Class-Matched Questions • 15 Minutes`;
  }
  if (modal) modal.classList.remove("hidden");
}

function closeTournamentBriefingModal() {
  document.getElementById("tournament-briefing-modal")?.classList.add("hidden");
}

async function confirmStartTournamentQuiz() {
  const check = checkStudentTournamentEligibility();
  if (!check.ok) {
    closeTournamentBriefingModal();
    alert(check.reason);
    return;
  }

  const studentClass = normalizeClassCode(activeStudentProfile.class_level || "JSS 3");
  const division = studentClass.startsWith("SSS") ? "SSS" : "JSS";
  const availableSubjects = Object.keys(SYLLABUS_DIRECTORY[studentClass] || {});
  const selectedSubjects = availableSubjects.slice(0, 3);
  const questionsPerSubject = 10;
  const durationMins = 15;

  let fetchedPool = [];
  try {
    fetchedPool = await fetchQuestionsForSubjects(studentClass, selectedSubjects);
  } catch (err) {
    alert("Could not load tournament questions from server. Check your internet connection.");
    return;
  }

  closeTournamentBriefingModal();
  const seenIdSet = getSeenQuestionIdSet(activeStudentProfile.full_name, "", studentClass);

  const questionsBySubject = {};
  const currentIndexBySubject = {};
  selectedSubjects.forEach(subject => {
    questionsBySubject[subject] = buildSmartShuffledPool(
      fetchedPool,
      studentClass,
      subject,
      questionsPerSubject,
      seenIdSet
    );
    currentIndexBySubject[subject] = 0;
  });

  const totalSeconds = durationMins * 60;
  session = {
    candidateName: activeStudentProfile.full_name,
    regNumber: "",
    classLevel: studentClass,
    subjects: selectedSubjects,
    questionsPerSubject,
    questionsBySubject,
    activeSubject: selectedSubjects[0],
    currentIndexBySubject,
    answers: {},
    flagged: new Set(),
    tabWarnings: 0,
    durationSeconds: totalSeconds,
    secondsRemaining: totalSeconds,
    timerInterval: null,
    isTournament: true,
    tournamentDivision: division,
    tournamentStage: check.stage,
    tournamentTitle: `${tournamentBracketData.cupName || "Scholars Super Cup"} (${STAGE_LABELS[check.stage]})`
  };

  clearSavedActiveSession();
  enterLiveExamArena();
}

function renderTournamentStandings() {
  const stageFilter = document.getElementById("tournament-stage-filter")?.value || "ALL";
  const divFilter = document.getElementById("tournament-division-filter")?.value || "ALL";
  const tbody = document.getElementById("tournament-standings-tbody");
  if (!tbody) return;

  const filtered = (tournamentEntries || []).filter(e => {
    const matchStage = stageFilter === "ALL" || (e.stage || "qualifiers") === stageFilter;
    const matchDiv = divFilter === "ALL" || e.division === divFilter;
    return matchStage && matchDiv;
  });

  tbody.innerHTML = "";
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#475569;">No official tournament results recorded for this filter yet.</td></tr>`;
    return;
  }

  filtered.forEach((entry, idx) => {
    const rankNum = idx + 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="rank-badge ${rankNum === 1 ? "rank-1" : ""}">#${rankNum}</span></td>
      <td><strong>${entry.studentName}</strong>${entry.schoolName ? `<br><span class="muted-small">${entry.schoolName}</span>` : ""}</td>
      <td>${STAGE_LABELS[entry.stage] || entry.stage}<br><span class="muted-small">${entry.division} Wing • ${entry.classLevel}</span></td>
      <td><strong>${entry.percentage}%</strong> (${entry.correct}/${entry.total})</td>
      <td style="color:#059669; font-weight:700;">+${entry.speedBonus || 0} pts</td>
      <td style="color:#1E3A8A; font-weight:800;">${entry.pointsEarned} pts</td>
      <td>${entry.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function syncAdminTournamentControls() {
  const data = tournamentBracketData || {};
  const statusEl = document.getElementById("admin-wc-status-text");
  const nameInput = document.getElementById("admin-wc-cup-name");
  const stageSel = document.getElementById("admin-wc-stage-select");

  if (nameInput && data.cupName) nameInput.value = data.cupName;
  if (stageSel && data.activeStage) stageSel.value = data.activeStage;
  if (statusEl) {
    statusEl.textContent = data.isOpen
      ? `Status: OPEN (${STAGE_LABELS[data.activeStage] || data.activeStage})`
      : "Status: CLOSED";
    statusEl.style.background = data.isOpen ? "#ecfdf5" : "#fef2f2";
    statusEl.style.color = data.isOpen ? "#059669" : "#dc2626";
    statusEl.style.borderColor = data.isOpen ? "#34d399" : "#fca5a5";
  }
}

async function updateTournamentControl(isOpen) {
  const cupName = (document.getElementById("admin-wc-cup-name")?.value || "Scholars Super Cup").trim();
  const stage = document.getElementById("admin-wc-stage-select")?.value || "qualifiers";

  try {
    const res = await fetch("/api/tournaments/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage, isOpen, cupName })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Could not update tournament state.");
      return;
    }
    await syncRecordsAndBracketFromServer();
    syncAdminTournamentControls();
    alert(isOpen
      ? `Tournament OPENED for ${STAGE_LABELS[stage]}!`
      : "Tournament round has been PAUSED / CLOSED.");
  } catch (err) {
    alert("Could not reach server to update tournament state.");
  }
}

async function resetTournamentCup() {
  if (!confirm("Reset the entire World Cup bracket and clear all tournament scores?")) return;
  try {
    const res = await fetch("/api/tournaments", { method: "DELETE" });
    if (!res.ok) {
      alert("Examiner authorization required to reset the tournament.");
      return;
    }
    await syncRecordsAndBracketFromServer();
    syncAdminTournamentControls();
    alert("Tournament cup has been reset to Stage 1 (Closed).");
  } catch (err) {
    alert("Could not reach server to reset tournament.");
  }
}

function enterLiveExamArena() {
  const liveName = document.getElementById("live-name");
  const regBadge = document.getElementById("live-reg-badge");
  const liveClass = document.getElementById("live-class");
  const liveWarnings = document.getElementById("live-tab-warnings");
  const navControls = document.getElementById("top-nav-controls");
  const resumeBanner = document.getElementById("resume-session-banner");
  const examView = document.getElementById("view-exam");

  if (liveName) {
    liveName.textContent = session.isTournament
      ? `${session.candidateName} (${session.tournamentTitle})`
      : session.candidateName;
  }
  if (regBadge) {
    if (session.regNumber) {
      regBadge.textContent = session.regNumber;
      regBadge.classList.remove("hidden");
    } else {
      regBadge.classList.add("hidden");
    }
  }
  if (liveClass) liveClass.textContent = session.classLevel;
  if (liveWarnings) liveWarnings.textContent = `${session.tabWarnings} / ${MAX_TAB_WARNINGS}`;
  if (navControls) navControls.classList.add("hidden");
  if (resumeBanner) resumeBanner.classList.add("hidden");

  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  if (examView) examView.classList.add("active");

  startExamCountdown();
  renderJambSubjectTabs();
  renderCurrentExamQuestion();
  persistActiveExamProgress();

  clearInterval(autoSaveIntervalId);
  autoSaveIntervalId = setInterval(persistActiveExamProgress, 5000);
}

function getActiveQuestionObject() {
  const list = session.questionsBySubject[session.activeSubject] || [];
  const idx = session.currentIndexBySubject[session.activeSubject] || 0;
  return list[idx];
}

function renderJambSubjectTabs() {
  const container = document.getElementById("subject-tabs-container");
  if (!container) return;
  container.innerHTML = "";

  let grandTotal = 0;
  let grandAnswered = 0;

  session.subjects.forEach(subject => {
    const qList = session.questionsBySubject[subject] || [];
    const answeredCount = qList.filter(q => session.answers[q.id] !== undefined).length;
    grandTotal += qList.length;
    grandAnswered += answeredCount;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `subject-tab ${subject === session.activeSubject ? "active" : ""}`;
    btn.onclick = () => {
      session.activeSubject = subject;
      renderJambSubjectTabs();
      renderCurrentExamQuestion();
      persistActiveExamProgress();
    };
    btn.innerHTML = `
      <span>${subject}</span>
      <span class="subject-tab-count">${answeredCount} / ${qList.length}</span>
    `;
    container.appendChild(btn);
  });

  const answeredEl = document.getElementById("live-answered-total");
  if (answeredEl) answeredEl.textContent = `${grandAnswered} / ${grandTotal}`;
}

function renderCurrentExamQuestion() {
  const subject = session.activeSubject;
  const qList = session.questionsBySubject[subject] || [];
  const idx = session.currentIndexBySubject[subject] || 0;
  const q = qList[idx];
  if (!q) return;

  const subBadge = document.getElementById("live-subject-badge");
  const srcBadge = document.getElementById("live-source-badge");
  const topBadge = document.getElementById("live-topic-badge");
  const qNum = document.getElementById("live-q-number");
  const promptEl = document.getElementById("live-question-text");

  if (subBadge) subBadge.textContent = q.subject;
  if (srcBadge) srcBadge.textContent = q.examSource || "WAEC/JAMB/NECO";
  if (topBadge) topBadge.textContent = `Topic: ${q.topic}`;
  if (qNum) qNum.textContent = `Question ${idx + 1} of ${qList.length}`;
  if (promptEl) promptEl.innerHTML = renderFormattedPrompt(q.prompt);

  const diagramPanel = document.getElementById("live-diagram-panel");
  const diagramHolder = document.getElementById("live-diagram-holder");
  const layoutGrid = document.getElementById("question-content-grid");

  if (diagramPanel && diagramHolder && layoutGrid) {
    if (q.diagramImage || q.diagramSVG) {
      diagramPanel.classList.remove("hidden");
      layoutGrid.classList.add("with-diagram");
      diagramHolder.innerHTML = q.diagramImage
        ? `<img src="${q.diagramImage}" alt="Reference Diagram" />`
        : q.diagramSVG;
    } else {
      diagramPanel.classList.add("hidden");
      layoutGrid.classList.remove("with-diagram");
      diagramHolder.innerHTML = "";
    }
  }

  const optionsContainer = document.getElementById("live-options-list");
  if (optionsContainer) {
    optionsContainer.innerHTML = "";
    q.options.forEach((optText, optIndex) => {
      const isChosen = session.answers[q.id] === optIndex;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `option-row-btn ${isChosen ? "selected" : ""}`;
      btn.onclick = () => chooseOption(q.id, optIndex);
      btn.innerHTML = `
        <span class="option-key-box">${LETTERS[optIndex]}</span>
        <span>${optText}</span>
      `;
      optionsContainer.appendChild(btn);
    });
  }

  const flagBtn = document.getElementById("btn-flag");
  if (flagBtn) {
    flagBtn.textContent = session.flagged.has(q.id) ? "★ Flagged for Review" : "Flag for Review";
  }

  renderQuestionPalette();
}

function chooseOption(questionId, optionIndex) {
  session.answers[questionId] = optionIndex;
  renderJambSubjectTabs();
  renderCurrentExamQuestion();
  persistActiveExamProgress();
}

function clearCurrentAnswer() {
  const q = getActiveQuestionObject();
  if (!q) return;
  delete session.answers[q.id];
  renderJambSubjectTabs();
  renderCurrentExamQuestion();
  persistActiveExamProgress();
}

function toggleFlagCurrentQuestion() {
  const q = getActiveQuestionObject();
  if (!q) return;
  if (session.flagged.has(q.id)) session.flagged.delete(q.id);
  else session.flagged.add(q.id);
  renderCurrentExamQuestion();
  persistActiveExamProgress();
}

function moveQuestion(step) {
  const subject = session.activeSubject;
  const qList = session.questionsBySubject[subject] || [];
  const curIdx = session.currentIndexBySubject[subject] || 0;
  const nextIdx = curIdx + step;

  if (nextIdx >= 0 && nextIdx < qList.length) {
    session.currentIndexBySubject[subject] = nextIdx;
    renderCurrentExamQuestion();
    persistActiveExamProgress();
  } else if (step > 0) {
    const subIdx = session.subjects.indexOf(subject);
    if (subIdx < session.subjects.length - 1) {
      session.activeSubject = session.subjects[subIdx + 1];
      renderJambSubjectTabs();
      renderCurrentExamQuestion();
      persistActiveExamProgress();
    }
  }
}

function renderQuestionPalette() {
  const subject = session.activeSubject;
  const qList = session.questionsBySubject[subject] || [];
  const curIdx = session.currentIndexBySubject[subject] || 0;

  const titleEl = document.getElementById("palette-title");
  if (titleEl) {
    titleEl.textContent = `${subject} Question Palette (1 – ${qList.length})`;
  }

  const grid = document.getElementById("live-palette-grid");
  if (!grid) return;
  grid.innerHTML = "";

  qList.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    let statusClass = "";
    if (session.flagged.has(q.id)) statusClass = "flagged";
    else if (session.answers[q.id] !== undefined) statusClass = "answered";

    btn.className = `palette-cell ${statusClass} ${idx === curIdx ? "active-q" : ""}`;
    btn.textContent = idx + 1;
    btn.onclick = () => {
      session.currentIndexBySubject[subject] = idx;
      renderCurrentExamQuestion();
      persistActiveExamProgress();
    };
    grid.appendChild(btn);
  });
}

function startExamCountdown() {
  clearInterval(session.timerInterval);
  document.getElementById("timer-container")?.classList.remove("urgent");
  refreshTimerText();

  session.timerInterval = setInterval(() => {
    session.secondsRemaining--;
    refreshTimerText();

    if (session.secondsRemaining <= 180) {
      document.getElementById("timer-container")?.classList.add("urgent");
    }

    if (session.secondsRemaining <= 0) {
      clearInterval(session.timerInterval);
      alert("Time elapsed! Submitting your examination automatically.");
      computeAndSaveResults();
    }
  }, 1000);
}

function refreshTimerText() {
  const timerEl = document.getElementById("live-timer");
  if (!timerEl) return;
  const hrs = Math.floor(session.secondsRemaining / 3600);
  const mins = String(Math.floor((session.secondsRemaining % 3600) / 60)).padStart(2, "0");
  const secs = String(session.secondsRemaining % 60).padStart(2, "0");
  timerEl.textContent =
    hrs > 0 ? `${String(hrs).padStart(2, "0")}:${mins}:${secs}` : `${mins}:${secs}`;
}

function promptExamSubmission() {
  let totalQs = 0;
  let answeredQs = 0;
  session.subjects.forEach(sub => {
    const qList = session.questionsBySubject[sub] || [];
    totalQs += qList.length;
    answeredQs += qList.filter(q => session.answers[q.id] !== undefined).length;
  });

  const remaining = totalQs - answeredQs;
  const msg = remaining > 0
    ? `You have ${remaining} unanswered question(s) out of ${totalQs}. Submit now anyway?`
    : `All ${totalQs} questions attempted. Submit exam and save your score to the server?`;

  if (confirm(msg)) {
    computeAndSaveResults();
  }
}

/**
 * 5. SCORE COMPUTATION & IMMEDIATE DATABASE UPLOAD
 */
async function postExamRecordImmediately(payload) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {}
    await new Promise(resolve => setTimeout(resolve, 400 * (attempt + 1)));
  }
  return null;
}

async function computeAndSaveResults() {
  clearInterval(session.timerInterval);
  clearInterval(autoSaveIntervalId);
  clearSavedActiveSession();
  document.getElementById("floating-calculator")?.classList.add("hidden");
  document.getElementById("top-nav-controls")?.classList.remove("hidden");

  let totalQuestions = 0;
  let totalCorrect = 0;
  const topicStats = {};
  const realQuestionIdsServed = [];
  const subjectCardsContainer = document.getElementById("result-subject-cards");
  if (subjectCardsContainer) subjectCardsContainer.innerHTML = "";

  const reviewSelector = document.getElementById("review-subject-selector");
  if (reviewSelector) reviewSelector.innerHTML = `<option value="ALL">All Selected Subjects</option>`;

  session.subjects.forEach(subject => {
    const qList = session.questionsBySubject[subject] || [];
    let subjectCorrect = 0;

    qList.forEach(q => {
      if (!String(q.id).startsWith("slot_")) {
        realQuestionIdsServed.push(q.id);
      }

      const isRight = session.answers[q.id] === q.correctIndex;
      if (isRight) subjectCorrect++;

      const tKey = `${session.classLevel} • ${subject} — ${q.topic || "General"}`;
      if (!topicStats[tKey]) topicStats[tKey] = { correct: 0, total: 0 };
      topicStats[tKey].total += 1;
      if (isRight) topicStats[tKey].correct += 1;
    });

    totalQuestions += qList.length;
    totalCorrect += subjectCorrect;
    const subPercent = qList.length > 0 ? Math.round((subjectCorrect / qList.length) * 100) : 0;

    if (subjectCardsContainer) {
      const tile = document.createElement("div");
      tile.className = "subject-score-tile";
      tile.innerHTML = `
        <h4>${subject}</h4>
        <div style="font-size:1.3rem; font-weight:800; color:#1E3A8A; margin-top:4px;">
          ${subjectCorrect} / ${qList.length} <span style="font-size:0.9rem;">(${subPercent}%)</span>
        </div>
      `;
      subjectCardsContainer.appendChild(tile);
    }

    if (reviewSelector) {
      const opt = document.createElement("option");
      opt.value = subject;
      opt.textContent = subject;
      reviewSelector.appendChild(opt);
    }
  });

  recordSeenQuestionIdsLocally(
    session.candidateName,
    session.regNumber,
    session.classLevel,
    realQuestionIdsServed
  );

  const totalFailed = Math.max(0, totalQuestions - totalCorrect);
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const pointsEarned = Math.max(0, (totalCorrect * 3) - (totalFailed * 1) + (percentage >= 70 ? 10 : 0));
  const isoDate = new Date().toISOString().slice(0, 10);

  const payload = {
    regNumber: session.regNumber,
    candidateName: session.candidateName,
    classLevel: normalizeClassCode(session.classLevel),
    subjects: session.subjects,
    correct: totalCorrect,
    total: totalQuestions,
    percentage,
    pointsEarned,
    tabWarnings: session.tabWarnings,
    topicStats,
    questionIds: realQuestionIdsServed,
    isoDate
  };

  let savedRecord = await postExamRecordImmediately(payload);

  if (!savedRecord) {
    savedRecord = {
      id: Date.now(),
      ...payload,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };
    try {
      const pending = JSON.parse(localStorage.getItem(RECORDS_STORAGE_KEY) || "[]");
      pending.push(savedRecord);
      localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(pending));
    } catch (e) {}
    alert("Network unstable: Your score has been queued and will sync automatically to the database once connection returns.");
  }

  if (session.isTournament && activeStudentProfile) {
    const timeTakenSeconds = Math.max(1, (session.durationSeconds || 900) - (session.secondsRemaining || 0));
    const speedBonus = percentage >= 50
      ? Math.round(((session.secondsRemaining || 0) / Math.max(1, session.durationSeconds || 900)) * 20)
      : 0;
    const totalTournamentPoints = pointsEarned + speedBonus;

    try {
      await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: activeStudentProfile.id,
          studentName: activeStudentProfile.full_name,
          classLevel: normalizeClassCode(activeStudentProfile.class_level),
          subjects: session.subjects,
          correct: totalCorrect,
          total: totalQuestions,
          percentage,
          pointsEarned: totalTournamentPoints,
          timeTakenSeconds,
          speedBonus
        })
      });
    } catch (err) {}
  }

  await syncRecordsAndBracketFromServer();

  const candidateHistory = examRecords.filter(
    r => normalizePersonName(r.candidateName) === normalizePersonName(session.candidateName) &&
      normalizeClassCode(r.classLevel) === normalizeClassCode(session.classLevel)
  );
  const liveStreak = computeDailyStreakForCandidate(candidateHistory);

  let gradeRemark = "F9 (Needs Improvement)";
  if (percentage >= 75) gradeRemark = "A1 (Distinction)";
  else if (percentage >= 65) gradeRemark = "B2 (Very Good)";
  else if (percentage >= 50) gradeRemark = "C6 (Credit)";
  else if (percentage >= 40) gradeRemark = "P8 (Pass)";

  const regSuffix = session.regNumber ? ` [${session.regNumber}]` : "";
  const headingEl = document.getElementById("result-candidate-heading");
  const subheadingEl = document.getElementById("result-meta-subheading");
  const percentEl = document.getElementById("result-percent-big");
  const correctEl = document.getElementById("result-correct-count");
  const pointsEl = document.getElementById("result-points-earned");
  const streakEl = document.getElementById("result-streak-value");
  const remarkEl = document.getElementById("result-grade-remark");

  if (headingEl) headingEl.textContent = `${session.candidateName}${regSuffix} — Score Report`;
  if (subheadingEl) subheadingEl.textContent = `${session.classLevel} • ${session.subjects.join(", ")} • Saved on ${savedRecord.date}`;
  if (percentEl) percentEl.textContent = `${percentage}%`;
  if (correctEl) correctEl.textContent = `${totalCorrect} / ${totalQuestions}`;
  if (pointsEl) pointsEl.textContent = `+${pointsEarned} pts`;
  if (streakEl) streakEl.textContent = `${liveStreak}-Day Streak 🔥`;
  if (remarkEl) remarkEl.textContent = gradeRemark;

  renderScriptCorrections();

  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("view-result")?.classList.add("active");
}

function renderScriptCorrections() {
  const selectedSub = document.getElementById("review-subject-selector")?.value || "ALL";
  const container = document.getElementById("script-correction-list");
  if (!container) return;
  container.innerHTML = "";

  session.subjects.forEach(subject => {
    if (selectedSub !== "ALL" && selectedSub !== subject) return;
    const qList = session.questionsBySubject[subject] || [];

    qList.forEach((q, idx) => {
      const picked = session.answers[q.id];
      const isCorrect = picked === q.correctIndex;
      const pickedLabel = picked !== undefined ? `${LETTERS[picked]}. ${q.options[picked]}` : "Not Answered";
      const correctLabel = `${LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}`;

      const card = document.createElement("div");
      card.className = `script-item ${isCorrect ? "correct" : "wrong"}`;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:6px;">
          <strong>${subject} • Q${idx + 1} <span class="source-badge">${q.examSource || "Past Q"}</span> <span class="muted-small">(${q.topic})</span></strong>
          <span style="font-weight:700; color:${isCorrect ? '#059669' : '#DC2626'}">
            ${isCorrect ? "✓ Correct" : "✗ Incorrect"}
          </span>
        </div>
        <div style="margin-bottom:8px;">${renderFormattedPrompt(q.prompt)}</div>
        <p style="font-size:0.9rem;"><strong>Your Answer:</strong> ${pickedLabel}</p>
        <p style="font-size:0.9rem; color:#059669;"><strong>Correct Option:</strong> ${correctLabel}</p>
        ${q.explanation ? `<p class="muted-small" style="margin-top:6px;"><em>${q.explanation}</em></p>` : ""}
      `;
      container.appendChild(card);
    });
  });
}

function resetToCandidateLobby() {
  switchPortalView("student");
}

/**
 * 6. PERSONAL STUDENT DASHBOARD & PERFORMANCE-BASED CLASS LEADERBOARD
 */
function renderStudentDashboard() {
  const tbody = document.getElementById("student-history-tbody");
  const avatarLg = document.getElementById("personal-avatar-lg");
  const nameHeading = document.getElementById("personal-name-heading");
  const metaText = document.getElementById("personal-meta-text");
  const uploadLabel = document.getElementById("avatar-upload-label");
  if (!tbody) return;

  if (!activeStudentProfile) {
    renderAvatarContent(avatarLg, null);
    if (nameHeading) nameHeading.textContent = "Sign In to View Your Profile";
    if (metaText) metaText.textContent = "Sign in on the Exam tab to see your personal advancement, photo, streak, and history.";
    if (uploadLabel) uploadLabel.classList.add("hidden");

    document.getElementById("dash-total-points").textContent = "0 pts";
    document.getElementById("dash-streak").textContent = "0 🔥";
    document.getElementById("dash-exams-count").textContent = "0";
    document.getElementById("dash-avg-score").textContent = "0%";
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#475569;">Sign in on the Exam tab to view your personal examination history.</td></tr>`;
    return;
  }

  renderAvatarContent(avatarLg, activeStudentProfile);
  if (nameHeading) nameHeading.textContent = activeStudentProfile.full_name;
  if (metaText) metaText.textContent = `${activeStudentProfile.class_level} • ${activeStudentProfile.school_name}`;
  if (uploadLabel) uploadLabel.classList.remove("hidden");

  const myName = normalizePersonName(activeStudentProfile.full_name);
  const myClass = normalizeClassCode(activeStudentProfile.class_level);
  const rows = (examRecords || []).filter(
    r => normalizePersonName(r.candidateName) === myName && normalizeClassCode(r.classLevel) === myClass
  );

  const totalPoints = rows.reduce((sum, r) => sum + Number(r.pointsEarned || 0), 0);
  const liveStreak = computeDailyStreakForCandidate(rows);
  const avgScore = rows.length > 0
    ? Math.round(rows.reduce((sum, r) => sum + Number(r.percentage || 0), 0) / rows.length)
    : 0;

  document.getElementById("dash-total-points").textContent = `${totalPoints} pts`;
  document.getElementById("dash-streak").textContent = `${liveStreak} 🔥`;
  document.getElementById("dash-exams-count").textContent = `${rows.length}`;
  document.getElementById("dash-avg-score").textContent = `${avgScore}%`;

  tbody.innerHTML = "";
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#475569;">You haven't completed an exam yet. Head to the Exam tab to start!</td></tr>`;
    return;
  }

  rows.slice().reverse().forEach(r => {
    const tr = document.createElement("tr");
    const regDisplay = r.regNumber ? ` <span class="reg-pill">${r.regNumber}</span>` : "";
    tr.innerHTML = `
      <td><strong>${r.candidateName}</strong>${regDisplay}</td>
      <td>${r.classLevel}</td>
      <td>${(r.subjects || []).join(", ")}</td>
      <td><strong>${r.percentage}%</strong> (${r.correct}/${r.total})</td>
      <td style="color:#1E3A8A; font-weight:700;">+${r.pointsEarned} pts</td>
      <td>${r.tabWarnings || 0}</td>
      <td>${r.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderClassLeaderboard() {
  const classSelect = document.getElementById("leaderboard-class-filter");
  const subjectSelect = document.getElementById("leaderboard-subject-filter");
  const titleEl = document.getElementById("lb-dynamic-title");
  const podiumEl = document.getElementById("lb-podium-grid");
  const myRankEl = document.getElementById("lb-my-rank-bar");
  const tbody = document.getElementById("leaderboard-tbody");
  if (!tbody) return;

  const classFilter = classSelect ? normalizeClassCode(classSelect.value) : "ALL";
  const subjectFilter = subjectSelect ? subjectSelect.value : "ALL";

  if (titleEl) {
    titleEl.textContent = classFilter === "ALL"
      ? "Overall School Hall of Fame"
      : `${classFilter} Hall of Fame`;
  }

  if (subjectSelect && classFilter !== "ALL") {
    const prevSub = subjectSelect.value;
    const subjects = Object.keys(SYLLABUS_DIRECTORY[classFilter] || {});
    subjectSelect.innerHTML = `<option value="ALL">All Subjects</option>` +
      subjects.map(s => `<option value="${s}" ${s === prevSub ? "selected" : ""}>${s}</option>`).join("");
  }

  const leaderboardMap = {};

  (examRecords || []).forEach(r => {
    const recClass = normalizeClassCode(r.classLevel);
    if (classFilter !== "ALL" && recClass !== classFilter) return;
    if (subjectFilter !== "ALL" && !(r.subjects || []).includes(subjectFilter)) return;

    const identityKey = `${normalizePersonName(r.candidateName)}__${recClass}`;
    const correct = Number(r.correct || 0);
    const total = Number(r.total || 0);
    const failed = Math.max(0, total - correct);
    const pct = total > 0 ? (correct / total) * 100 : 0;
    const netPts = Math.max(0, (correct * 3) - (failed * 1) + (pct >= 70 ? 10 : 0));

    if (!leaderboardMap[identityKey]) {
      leaderboardMap[identityKey] = {
        name: r.candidateName,
        classLevel: recClass,
        totalCorrect: correct,
        totalFailed: failed,
        totalQuestions: total,
        totalNetPoints: netPts,
        records: [r]
      };
    } else {
      leaderboardMap[identityKey].totalCorrect += correct;
      leaderboardMap[identityKey].totalFailed += failed;
      leaderboardMap[identityKey].totalQuestions += total;
      leaderboardMap[identityKey].totalNetPoints += netPts;
      leaderboardMap[identityKey].records.push(r);
    }
  });

  const ranked = Object.values(leaderboardMap).map(entry => {
    const accuracy = entry.totalQuestions > 0
      ? Number(((entry.totalCorrect / entry.totalQuestions) * 100).toFixed(1))
      : 0;
    const rating = Number((entry.totalNetPoints * (accuracy / 100)).toFixed(1));
    const streak = computeDailyStreakForCandidate(entry.records);
    const isMe = activeStudentProfile &&
      normalizePersonName(entry.name) === normalizePersonName(activeStudentProfile.full_name) &&
      entry.classLevel === normalizeClassCode(activeStudentProfile.class_level);

    return { ...entry, accuracy, rating, streak, isMe };
  }).sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return b.totalCorrect - a.totalCorrect;
  });

  if (podiumEl) {
    const medals = ["gold", "silver", "bronze"];
    const labels = ["1st • Gold", "2nd • Silver", "3rd • Bronze"];
    podiumEl.innerHTML = ranked.slice(0, 3).map((s, i) => `
      <div class="podium-card ${medals[i]}">
        <span class="medal-pill ${medals[i]}">${labels[i]}</span>
        <div class="podium-name">${s.name}</div>
        <div class="podium-score">${s.rating} pts</div>
        <div class="podium-meta">${s.accuracy}% Acc &bull; ${s.totalCorrect}✓ / ${s.totalFailed}✗ &bull; 🔥 ${s.streak}d</div>
      </div>
    `).join("");
  }

  if (myRankEl) {
    const myIdx = ranked.findIndex(s => s.isMe);
    if (myIdx !== -1) {
      const me = ranked[myIdx];
      myRankEl.innerHTML = `
        <span>Your Position: <strong>#${myIdx + 1}</strong> in ${me.classLevel} &bull; Rating: <strong>${me.rating} pts</strong> (${me.accuracy}% Accuracy)</span>
        <span>🔥 ${me.streak}-Day Practice Streak</span>
      `;
      myRankEl.classList.remove("hidden");
    } else {
      myRankEl.classList.add("hidden");
    }
  }

  tbody.innerHTML = "";
  if (ranked.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#475569;">No ranked candidates for this class yet.</td></tr>`;
    return;
  }

  ranked.forEach((entry, index) => {
    const rankNum = index + 1;
    const tr = document.createElement("tr");
    if (entry.isMe) tr.className = "is-current-student-row";
    tr.innerHTML = `
      <td><span class="rank-badge ${rankNum === 1 ? "rank-1" : ""}">#${rankNum}</span></td>
      <td><strong>${entry.name}</strong> ${entry.isMe ? "(You)" : ""}</td>
      <td>${entry.classLevel}</td>
      <td><span style="color:#059669;font-weight:700;">${entry.totalCorrect}</span> / <span style="color:#dc2626;font-weight:700;">${entry.totalFailed}</span></td>
      <td><strong>${entry.accuracy}%</strong></td>
      <td style="color:#d97706; font-weight:700;">${entry.streak} 🔥</td>
      <td style="color:#1e3a8a; font-weight:800;">${entry.rating} pts</td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * 7. ADMIN MONITOR, WEAK-TOPIC ANALYTICS, BULK CSV & BROADSHEET EXPORT
 */
function renderAdminMonitor() {
  const attemptsEl = document.getElementById("admin-kpi-attempts");
  const candidatesEl = document.getElementById("admin-kpi-candidates");
  const avgEl = document.getElementById("admin-kpi-avg");
  const questionsEl = document.getElementById("admin-kpi-questions");
  const tbody = document.getElementById("admin-records-tbody");
  if (!attemptsEl || !tbody) return;

  const totalAttempts = examRecords.length;
  const uniqueKeys = new Set(
    examRecords.map(r => (r.regNumber || r.candidateName).toLowerCase())
  );
  const platformAvg = totalAttempts > 0
    ? Math.round(examRecords.reduce((sum, r) => sum + (r.percentage || 0), 0) / totalAttempts)
    : 0;

  attemptsEl.textContent = `${totalAttempts}`;
  if (candidatesEl) candidatesEl.textContent = `${uniqueKeys.size}`;
  if (avgEl) avgEl.textContent = `${platformAvg}%`;
  if (questionsEl) questionsEl.textContent = `${questionBank.length || totalServerQuestionCount}`;

  tbody.innerHTML = "";

  if (totalAttempts === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#475569;">No candidate exam records saved yet.</td></tr>`;
    return;
  }

  examRecords.slice().reverse().forEach(r => {
    const tr = document.createElement("tr");
    const regDisplay = r.regNumber ? ` <span class="reg-pill">${r.regNumber}</span>` : "";
    tr.innerHTML = `
      <td><strong>${r.candidateName}</strong>${regDisplay}</td>
      <td>${r.classLevel}</td>
      <td>${(r.subjects || []).join(", ")}</td>
      <td><strong>${r.percentage}%</strong> (${r.correct}/${r.total})</td>
      <td>+${r.pointsEarned} pts</td>
      <td>${r.tabWarnings || 0}</td>
      <td>${r.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderWeakTopicsAnalytics() {
  const grid = document.getElementById("weak-topics-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const aggregate = {};
  examRecords.forEach(r => {
    const stats = r.topicStats || {};
    Object.keys(stats).forEach(topicLabel => {
      if (!aggregate[topicLabel]) aggregate[topicLabel] = { correct: 0, total: 0 };
      aggregate[topicLabel].correct += Number(stats[topicLabel].correct || 0);
      aggregate[topicLabel].total += Number(stats[topicLabel].total || 0);
    });
  });

  const topicEntries = Object.keys(aggregate).map(label => {
    const { correct, total } = aggregate[label];
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { label, correct, total, accuracy };
  }).sort((a, b) => a.accuracy - b.accuracy);

  if (topicEntries.length === 0) {
    grid.innerHTML = `<p class="muted-small">Topic accuracy analytics appear automatically once candidates complete exams.</p>`;
    return;
  }

  topicEntries.slice(0, 8).forEach(item => {
    const card = document.createElement("div");
    card.className = `weak-topic-card ${item.accuracy < 50 ? "low-acc" : ""}`;
    card.innerHTML = `
      <div style="font-weight:700; font-size:0.88rem; color:#0F172A; margin-bottom:4px;">${item.label}</div>
      <div style="font-size:1.1rem; font-weight:800; color:${item.accuracy < 50 ? '#DC2626' : '#1E3A8A'};">
        ${item.accuracy}% Accuracy <span class="muted-small" style="font-weight:500;">(${item.correct}/${item.total})</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function downloadSampleCSVTemplate() {
  const csvHeader = "class_level,subject,topic,exam_source,prompt,diagram_svg,option_a,option_b,option_c,option_d,correct_option,explanation\n";
  const sampleRow = '"SSS 2","Economics","Theory of Demand, Supply & Price Determination","WAEC","Use the table below to find the equilibrium price.<table class=\'question-table\'><tr><th>Price (₦)</th><th>Qd</th><th>Qs</th></tr><tr><td>10</td><td>500</td><td>100</td></tr><tr><td>30</td><td>300</td><td>300</td></tr></table>","","₦10","₦20","₦30","₦40","C","Equilibrium occurs where Qd = Qs (300 units at ₦30)."\n';
  const blob = new Blob([csvHeader + sampleRow], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scholars_cbt_sample_questions.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function uploadBulkCSV() {
  const fileInput = document.getElementById("bulk-csv-input");
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert("Please choose a .csv file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  await sendCSVFormData(formData, () => {
    fileInput.value = "";
  });
}

async function uploadRawCSVText() {
  const textarea = document.getElementById("bulk-csv-textarea");
  const rawText = (textarea?.value || "").trim();
  if (!rawText) {
    alert("Please paste CSV text first.");
    return;
  }

  const csvBlob = new Blob([rawText], { type: "text/csv;charset=utf-8;" });
  const formData = new FormData();
  formData.append("file", csvBlob, "pasted_questions.csv");
  await sendCSVFormData(formData, () => {
    if (textarea) textarea.value = "";
  });
}

async function sendCSVFormData(formData, onSuccessClear) {
  try {
    const res = await fetch("/api/questions/bulk-csv", {
      method: "POST",
      body: formData
    });
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : { error: await res.text() };

    if (!res.ok) {
      alert(data.error || `Server error (${res.status}) while importing CSV.`);
      return;
    }

    questionBank = data.questions || questionBank;
    totalServerQuestionCount = questionBank.length;
    if (onSuccessClear) onSuccessClear();
    syncAdminTopicDropdown();
    renderAdminRepository();
    renderAdminMonitor();
    renderCandidateSubjects();
    alert(`Successfully imported ${data.inserted} questions!`);
  } catch (err) {
    alert(`Connection failed (${err.message}). Make sure Flask is running.`);
  }
}

function exportBroadsheetCSV() {
  if (examRecords.length === 0) {
    alert("No candidate exam records available to export.");
    return;
  }
  const lines = ["Candidate Name,Reg ID,Class Level,Subjects,Correct,Total,Percentage,Points Earned,Streak,Tab Warnings,Date"];
  examRecords.forEach(r => {
    const safeRow = [
      r.candidateName,
      r.regNumber || "",
      r.classLevel,
      (r.subjects || []).join(" | "),
      r.correct,
      r.total,
      `${r.percentage}%`,
      r.pointsEarned,
      r.streak || 0,
      r.tabWarnings || 0,
      r.date
    ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    lines.push(safeRow.join(","));
  });

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `scholars_cbt_broadsheet_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function clearAllSavedRecords() {
  if (!confirm("Clear all saved candidate exam records and leaderboard scores from the server?")) return;
  try {
    await fetch("/api/records", { method: "DELETE" });
  } catch (err) {}
  examRecords = [];
  localStorage.removeItem(RECORDS_STORAGE_KEY);
  localStorage.removeItem(SEEN_HISTORY_KEY);
  renderStudentDashboard();
  renderClassLeaderboard();
  renderAdminMonitor();
  renderWeakTopicsAnalytics();
}

/**
 * 8. FLOATING CALCULATOR & DIAGRAM ZOOM MODAL
 */
function toggleCalculator() {
  document.getElementById("floating-calculator")?.classList.toggle("hidden");
}

function refreshCalcScreen() {
  const disp = document.getElementById("calc-display");
  if (disp) disp.value = calcState.current;
}

function calcDigit(d) {
  if (calcState.current === "0" || calcState.resetNext) {
    calcState.current = d;
    calcState.resetNext = false;
  } else {
    calcState.current += d;
  }
  refreshCalcScreen();
}

function calcDecimal() {
  if (calcState.resetNext) {
    calcState.current = "0.";
    calcState.resetNext = false;
  } else if (!calcState.current.includes(".")) {
    calcState.current += ".";
  }
  refreshCalcScreen();
}

function calcClear() {
  calcState = { current: "0", previous: null, operator: null, resetNext: false };
  refreshCalcScreen();
}

function calcBackspace() {
  if (calcState.resetNext) return;
  calcState.current = calcState.current.length > 1 ? calcState.current.slice(0, -1) : "0";
  refreshCalcScreen();
}

function calcToggleSign() {
  if (calcState.current === "0") return;
  calcState.current = calcState.current.startsWith("-")
    ? calcState.current.slice(1)
    : "-" + calcState.current;
  refreshCalcScreen();
}

function calcSetOp(op) {
  calcState.previous = parseFloat(calcState.current);
  calcState.operator = op;
  calcState.resetNext = true;
}

function calcEquals() {
  if (calcState.previous === null || !calcState.operator) return;
  const b = parseFloat(calcState.current);
  const a = calcState.previous;
  let result = 0;

  if (calcState.operator === "+") result = a + b;
  else if (calcState.operator === "-") result = a - b;
  else if (calcState.operator === "*") result = a * b;
  else if (calcState.operator === "/") result = b === 0 ? "Error" : a / b;

  calcState.current = typeof result === "number"
    ? String(Math.round(result * 1000000) / 1000000)
    : result;
  calcState.previous = null;
  calcState.operator = null;
  calcState.resetNext = true;
  refreshCalcScreen();
}

function openDiagramModal() {
  const q = getActiveQuestionObject();
  const modalBody = document.getElementById("diagram-modal-body");
  const modal = document.getElementById("diagram-modal");
  if (!q || (!q.diagramImage && !q.diagramSVG) || !modalBody || !modal) return;

  modalBody.innerHTML = q.diagramImage
    ? `<img src="${q.diagramImage}" alt="Zoomed Diagram" />`
    : q.diagramSVG;
  modal.classList.remove("hidden");
}

function closeDiagramModal() {
  document.getElementById("diagram-modal")?.classList.add("hidden");
}

/**
 * 9. ADMIN QUESTION UPLOADER & TOPIC DIRECTORY (250-QUESTION TARGET)
 */
function syncAdminSubjectDropdown() {
  const classEl = document.getElementById("admin-class-select");
  const subjectSelect = document.getElementById("admin-subject-select");
  if (!classEl || !subjectSelect) return;

  const classLevel = normalizeClassCode(classEl.value);
  const subjects = Object.keys(SYLLABUS_DIRECTORY[classLevel] || {});
  subjectSelect.innerHTML = "";

  subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subjectSelect.appendChild(opt);
  });

  syncAdminTopicDropdown();
}

function syncAdminTopicDropdown() {
  const classEl = document.getElementById("admin-class-select");
  const subjectEl = document.getElementById("admin-subject-select");
  const topicSelect = document.getElementById("admin-topic-select");
  if (!classEl || !subjectEl || !topicSelect) return;

  const classLevel = normalizeClassCode(classEl.value);
  const subject = subjectEl.value;
  const topics = (SYLLABUS_DIRECTORY[classLevel] && SYLLABUS_DIRECTORY[classLevel][subject]) || [];

  topicSelect.innerHTML = "";

  topics.forEach(topic => {
    const countForTopic = questionBank.filter(
      q => normalizeClassCode(q.classLevel) === classLevel && q.subject === subject && q.topic === topic
    ).length;

    const opt = document.createElement("option");
    opt.value = topic;
    opt.textContent = `${topic} (${countForTopic})`;
    topicSelect.appendChild(opt);
  });

  renderAdminTopicPills(classLevel, subject, topics);
}

function renderAdminTopicPills(classLevel, subject, topics) {
  const progressEl = document.getElementById("admin-subject-progress-text");
  const pillsContainer = document.getElementById("admin-topic-pills");
  if (!progressEl || !pillsContainer) return;

  const totalForSubject = questionBank.filter(
    q => normalizeClassCode(q.classLevel) === classLevel && q.subject === subject
  ).length;
  progressEl.textContent =
    `${classLevel} → ${subject} (${totalForSubject} / ${MAX_QUESTIONS_PER_SUBJECT} Questions Uploaded)`;

  pillsContainer.innerHTML = "";
  const activeTopic = document.getElementById("admin-topic-select")?.value;

  topics.forEach(topic => {
    const count = questionBank.filter(
      q => normalizeClassCode(q.classLevel) === classLevel && q.subject === subject && q.topic === topic
    ).length;

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `topic-pill-btn ${topic === activeTopic ? "active" : ""}`;
    pill.textContent = `${topic} (${count})`;
    pill.onclick = () => {
      const topicSelect = document.getElementById("admin-topic-select");
      if (topicSelect) topicSelect.value = topic;
      renderAdminTopicPills(classLevel, subject, topics);
    };
    pillsContainer.appendChild(pill);
  });
}

function handleAdminDiagramSelect(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    stagedDiagramDataURL = e.target.result;
    const previewImg = document.getElementById("admin-diagram-preview-img");
    const previewBox = document.getElementById("admin-diagram-preview-box");
    if (previewImg) previewImg.src = stagedDiagramDataURL;
    if (previewBox) previewBox.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function clearAdminDiagramInput() {
  stagedDiagramDataURL = null;
  const inputEl = document.getElementById("admin-diagram-input");
  const previewBox = document.getElementById("admin-diagram-preview-box");
  if (inputEl) inputEl.value = "";
  if (previewBox) previewBox.classList.add("hidden");
}

async function handleAdminQuestionSave(event) {
  event.preventDefault();
  const classLevel = normalizeClassCode(document.getElementById("admin-class-select")?.value || "JSS 3");
  const subject = document.getElementById("admin-subject-select")?.value || "";
  const customTopic = (document.getElementById("admin-custom-topic")?.value || "").trim();
  const selectedTopic = customTopic || document.getElementById("admin-topic-select")?.value || "General";
  const examSource = document.getElementById("admin-source-select")?.value || "WAEC";
  const svgCode = (document.getElementById("admin-diagram-svg")?.value || "").trim() || null;

  const payload = {
    classLevel,
    subject,
    topic: selectedTopic,
    examSource,
    prompt: (document.getElementById("admin-question-prompt")?.value || "").trim(),
    diagramSVG: svgCode,
    diagramImage: stagedDiagramDataURL,
    options: [
      (document.getElementById("admin-opt-a")?.value || "").trim(),
      (document.getElementById("admin-opt-b")?.value || "").trim(),
      (document.getElementById("admin-opt-c")?.value || "").trim(),
      (document.getElementById("admin-opt-d")?.value || "").trim()
    ],
    correctIndex: parseInt(document.getElementById("admin-correct-option")?.value || "0", 10),
    explanation: (document.getElementById("admin-explanation-input")?.value || "").trim()
  };

  try {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const savedQ = await res.json();
      questionBank.push(savedQ);
      totalServerQuestionCount = questionBank.length;
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || "Could not save question. Make sure you are signed in as Examiner Admin.");
      return;
    }
  } catch (err) {
    alert("Could not reach server to save question.");
    return;
  }

  ["admin-question-prompt", "admin-diagram-svg", "admin-opt-a", "admin-opt-b", "admin-opt-c", "admin-opt-d", "admin-explanation-input", "admin-custom-topic"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  clearAdminDiagramInput();

  syncAdminTopicDropdown();
  const topicSelect = document.getElementById("admin-topic-select");
  if (topicSelect) topicSelect.value = selectedTopic;
  renderAdminRepository();
  renderAdminMonitor();
  renderCandidateSubjects();
}

function renderAdminRepository() {
  const totalEl = document.getElementById("admin-total-count");
  const filterSelect = document.getElementById("admin-filter-pool");
  const listContainer = document.getElementById("admin-repository-list");
  if (!totalEl || !filterSelect || !listContainer) return;

  totalEl.textContent = questionBank.length;

  const previousValue = filterSelect.value || "ALL";
  const uniquePools = Array.from(new Set(questionBank.map(q => `${normalizeClassCode(q.classLevel)} • ${q.subject}`)));

  filterSelect.innerHTML = `<option value="ALL">All Uploaded Subjects (${questionBank.length})</option>`;
  uniquePools.forEach(pool => {
    const opt = document.createElement("option");
    opt.value = pool;
    opt.textContent = pool;
    if (pool === previousValue) opt.selected = true;
    filterSelect.appendChild(opt);
  });

  listContainer.innerHTML = "";

  const activeFilter = filterSelect.value;
  const visibleQuestions = questionBank.filter(q =>
    activeFilter === "ALL" ? true : `${normalizeClassCode(q.classLevel)} • ${q.subject}` === activeFilter
  );

  visibleQuestions.slice().reverse().forEach(q => {
    const row = document.createElement("div");
    row.className = "script-item";
    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
        <div>
          <strong>${normalizeClassCode(q.classLevel)} • ${q.subject}</strong>
          <span class="source-badge">${q.examSource || "WAEC/JAMB/NECO"}</span>
          <span class="topic-badge">${q.topic}</span>
        </div>
        <button type="button" class="btn-danger-sm" onclick="removeQuestionFromBank(${q.id})">Delete Question</button>
      </div>
      <div style="margin-bottom:6px;">${renderFormattedPrompt(q.prompt)}</div>
      <small class="text-success" style="font-weight:700;">
        Correct Answer: ${LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}
      </small>
    `;
    listContainer.appendChild(row);
  });
}

async function removeQuestionFromBank(id) {
  if (!confirm("Delete this question permanently from the server?")) return;
  try {
    await fetch(`/api/questions/${id}`, { method: "DELETE" });
  } catch (err) {}
  questionBank = questionBank.filter(q => q.id !== id);
  totalServerQuestionCount = questionBank.length;
  syncAdminTopicDropdown();
  renderAdminRepository();
  renderAdminMonitor();
  renderCandidateSubjects();
}

function downloadQuestionBankBackup() {
  const jsonString = JSON.stringify(questionBank, null, 2);
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(jsonString);
  const link = document.createElement("a");
  link.setAttribute("href", dataUri);
  link.setAttribute("download", `scholars_cbt_questions_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function restoreQuestionBankBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed)) {
        const res = await fetch("/api/questions/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed)
        });
        if (res.ok) {
          questionBank = await res.json();
          totalServerQuestionCount = questionBank.length;
          syncAdminTopicDropdown();
          renderAdminRepository();
          renderAdminMonitor();
          renderCandidateSubjects();
          alert(`Restored ${questionBank.length} questions to the server database.`);
        }
      }
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
}
