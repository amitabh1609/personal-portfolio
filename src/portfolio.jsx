import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const data = {
  name: "Amitabh Choudhury",
  title: "Software Engineer",
  tagline: "iOS Developer · ML Engineer · Web Developer",
  bio: "Data Engineer at Caterpillar, promoted from Systems Data Support Analyst after building domain expertise across warehouse and supply-chain data. Owns 25+ production Snowflake/dbt pipelines serving ~75 stakeholders. Led a 2,025-line SAS-to-Snowflake migration across 5 data domains with zero-defect cutover validated row by row. Builds rigorously evaluated data systems outside work: a Text-to-SQL engine with AST-based guardrails, a hybrid RAG pipeline with RAGAS evaluation and CI deployment gate, and an Iceberg/Dagster lakehouse with 36 automated data quality checks. B.Tech AI/ML (CGPA 8.55). LeetCode Knight — max rating 1923, top 1% globally.",
  email: "choudhryamitabh@gmail.com",
  github: "https://github.com/amitabh1609",
  linkedin: "https://www.linkedin.com/in/amitabh-choudhury/",
  leetcode: "https://leetcode.com/amitabhchoudhury19999/",
  gfg: "https://auth.geeksforgeeks.org/user/amitabhchoudhury19999",
  skills: [
    { name: "Snowflake",             icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg",                         category: "Data Engineering",   isImg: true  },
    { name: "dbt",                   icon: "https://www.vectorlogo.zone/logos/getdbt/getdbt-icon.svg",                               category: "Data Engineering",   isImg: true  },
    { name: "Apache Iceberg",        icon: "\ud83e\uddca",                                                                                      category: "Data Engineering",   isImg: false },
    { name: "DuckDB",                icon: "\ud83e\udd86",                                                                                      category: "Data Engineering",   isImg: false },
    { name: "Dagster",               icon: "\u2699\ufe0f",                                                                                      category: "Data Engineering",   isImg: false },
    { name: "Soda Core",             icon: "\ud83e\uddea",                                                                                      category: "Data Engineering",   isImg: false },
    { name: "SnapLogic",             icon: "https://www.snaplogic.com/media-kit/Logocombo_SnapLogic_RGB.svg",                         category: "Data Engineering",   isImg: true  },
    { name: "Tidal",                 icon: "\u23f1\ufe0f",                                                                                      category: "Data Engineering",   isImg: false },
    { name: "RAGAS",                 icon: "\ud83d\udcca",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "Langfuse",              icon: "\ud83d\udd2d",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "Qdrant",                icon: "\ud83c\udfaf",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "FastAPI",               icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",         category: "GenAI & Evaluation", isImg: true  },
    { name: "sentence-transformers", icon: "\ud83e\udd17",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "instructor",            icon: "\ud83d\udcd0",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "Pydantic v2",           icon: "\ud83d\udc0d",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "sqlparse",              icon: "\ud83d\udd0d",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "SQLAlchemy",            icon: "\ud83d\uddc3\ufe0f",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "BM25 / RRF",            icon: "\ud83d\udd00",                                                                                      category: "GenAI & Evaluation", isImg: false },
    { name: "Python",                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",          category: "Languages",          isImg: true  },
    { name: "SQL",                   icon: "\ud83d\udcbe",                                                                                      category: "Languages",          isImg: false },
    { name: "C++",                   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",    category: "Languages",          isImg: true  },
    { name: "Pandas",                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",          category: "Analytics & BI",     isImg: true  },
    { name: "NumPy",                 icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",            category: "Analytics & BI",     isImg: true  },
    { name: "Power BI",              icon: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg",         category: "Analytics & BI",     isImg: true  },
    { name: "scikit-learn",          icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",        category: "Analytics & BI",     isImg: true  },
    { name: "Matplotlib",            icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",                category: "Analytics & BI",     isImg: true  },
    { name: "Docker",                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",          category: "Infra & Dev",        isImg: true  },
    { name: "GitHub Actions",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",         category: "Infra & Dev",        isImg: true  },
    { name: "Git",                   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                category: "Infra & Dev",        isImg: true  },
    { name: "PostgreSQL 15",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",  category: "Infra & Dev",        isImg: true  },
    { name: "Jupyter",               icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",        category: "Infra & Dev",        isImg: true  },
  ],
  projects: [
    {
      name: "GitHub Archive Lakehouse",
      type: "Data Engineering / Lakehouse",
      description: "A Bronze/Silver/Gold Apache Iceberg lakehouse ingesting 7.4M+ GitHub Archive events. Manifest-tracked, crash-resumable pipeline with Silver-layer deduplication, 15 event-type payload parsing, and quarantine routing. 36 Soda Core data quality checks gate every Dagster run; Iceberg time-travel and live schema evolution demonstrated on a 3.8M-row table.",
      tech: ["Apache Iceberg", "DuckDB", "Dagster", "Soda Core", "MinIO", "Streamlit", "Docker"],
      color: "#00ffc8",
      emoji: "🏔️",
      link: "https://github.com/amitabh1609",
    },
    {
      name: "Text-to-SQL with Guardrails",
      type: "AI / Safety",
      description: "NL-to-SQL system with a multi-layer safety stack: sqlparse AST guardrails hard-block DDL/DML and SQL injection; all execution runs inside PostgreSQL SET TRANSACTION READ ONLY. Evaluated on a 50-question adversarial benchmark — passed all executable queries, blocked all 10 injection tests. Back-translation hallucination detection via MiniLM-L6 cosine similarity.",
      tech: ["FastAPI", "PostgreSQL 15", "Claude Sonnet", "instructor", "Pydantic v2", "sqlparse", "sentence-transformers", "Docker"],
      color: "#a78bfa",
      emoji: "🛡️",
      link: "https://github.com/amitabh1609",
    },
    {
      name: "Evaluated RAG Pipeline",
      type: "AI / RAG",
      description: "Hybrid retrieval pipeline (dense BGE-large + BM25 via RRF k=60) with cross-encoder reranking over crawled Snowflake docs, dbt docs, and 200 dbt Discourse threads. 50-question adversarial benchmark with CI eval gate in GitHub Actions that fails the build on RAGAS faithfulness regression. Live demo on Render.",
      tech: ["BGE-large-en-v1.5", "BM25/RRF", "Qdrant", "RAGAS", "Claude Sonnet", "Langfuse", "GitHub Actions", "Docker"],
      color: "#48CAE4",
      emoji: "🔍",
      link: "https://github.com/amitabh1609",
    },
    {
      name: "Gradient Descent",
      type: "ML / Math",
      description: "A complete walkthrough of how Gradient Descent works — from basics to intuitive visualizations. Implemented in multiple forms, from basic loops to 3D visualizations, to truly understand the why behind every step.",
      tech: ["Python", "NumPy", "Matplotlib", "Jupyter"],
      color: "#00ffc8",
      emoji: "📉",
      link: "https://github.com/amitabh1609/Gradient_Descent",
    },
    {
      name: "Sentiment Analysis",
      type: "ML / NLP",
      description: "Hate speech detection in tweets — classifying racist or sexist sentiment from a labelled dataset of 31,962 tweets. Built NLP pipelines to predict labels on unseen tweet data.",
      tech: ["Python", "NLP", "scikit-learn", "Pandas"],
      color: "#C77DFF",
      emoji: "🐦",
      link: "https://github.com/amitabh1609/Sentiment-Analysis-Using-Twitter-Tweets",
    },
    {
      name: "Facial Emotion Recognition",
      type: "ML / CNN",
      description: "Facial expression detection using CNNs trained on image data. Classifies 7 emotions — angry, disgust, fear, happy, neutral, sad, surprise — built with Keras and TensorFlow on Kaggle.",
      tech: ["Python", "TensorFlow", "Keras", "CNN"],
      color: "#FF6B6B",
      emoji: "🤖",
      link: "https://github.com/amitabh1609/Facial-Emotion-Recognition",
    },
  ],
  experience: [
    {
      year: "Jun 2025 – Present",
      role: "Data Engineer",
      company: "Caterpillar",
      current: true,
      bullets: [
        "Own and operate 25+ production Snowflake/dbt pipelines via SnapLogic serving ~75 warehouse and supply-chain stakeholders; pipelines refresh as frequently as every 20 minutes",
        "Led the MineStar MSU SAS-to-Snowflake migration: rewrote 2,025 lines of legacy SAS into 43 Snowflake objects across 5 data domains (inventory, demand, backorders, schedules, forecasts for ~5,500 globally-sourced parts)",
        "Designed a Goods Receipt dbt pipeline with SCD Type-2 history capture; 13 schema and relationship tests enforce data contracts; Snowflake Dynamic Tables auto-refresh every 30 minutes",
        "Built a Streamlit operations app for the Tidal monitoring team supporting 24/7 shift handovers with automated shift-transition email generation",
      ],
    },
    {
      year: "Jun 2024 – Jun 2025",
      role: "Systems Data Support Analyst",
      company: "Caterpillar",
      current: false,
      bullets: [
        "Delivered ad hoc analytical SQL across Snowflake for warehouse, procurement, and finance stakeholders",
        "Built a Random Forest demand-forecasting prototype using Python and pandas to surface seasonal demand patterns",
        "Onboarded into the enterprise data stack: Snowflake, SnapLogic, Tidal, Power BI",
      ],
    },
    {
      year: "Jun 2023 – Sep 2023",
      role: "SDE Intern",
      company: "Caterpillar",
      current: false,
      bullets: [
        "Implemented KS-test + PSI drift detection on 3 production Tidal data streams; reduced false-positive alerts by ~30%",
        "Automated production data workflows using Tidal scheduling",
      ],
    },
  ],
  achievements: [
    { icon: "🏆", title: "LeetCode Knight", desc: "Max rating 1923 · Global rank 283/29,865 in Weekly Contest 366 (top 1%)" },
    { icon: "⚡", title: "Codeforces Expert", desc: "Max rating 1800" },
    { icon: "⭐", title: "CodeChef 4★", desc: "Max rating 1711" },
    { icon: "🥇", title: "Centurion Hackathon", desc: "Team Lead · 13th out of 500+ participants (National Level)" },
  ],
  stats: [
    { value: 40,   suffix: "+",  label: "ETL Pipelines",    decimals: 0 },
    { value: 1923, suffix: "",   label: "LeetCode Rating",  decimals: 0 },
    { value: 8.55, suffix: "",   label: "CGPA",             decimals: 2 },
    { value: 88,   suffix: "%",  label: "Model Accuracy",   decimals: 0 },
  ],
};

const NAV_ITEMS = ["Home", "About", "Experience", "Skills", "Projects", "Achievements", "Contact"];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, decimals, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(parseFloat(current.toFixed(decimals)));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimals]);
  return val;
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function AnimSection({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function StatCounter({ value, suffix, label, decimals, active }) {
  const count = useCountUp(value, decimals, active);
  return (
    <div className="stat-item">
      <div className="stat-num">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

function TerminalCard() {
  return (
    <div className="terminal-card">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span style={{ marginLeft: "0.5rem", color: "#4a5568", fontSize: "0.7rem" }}>~/amitabh — zsh</span>
      </div>
      <div className="terminal-body">
        <div><span className="t-prompt">❯ </span><span className="t-cmd">whoami</span></div>
        <div style={{ color: "#f0ebff", paddingLeft: "1rem", marginBottom: "0.25rem" }}>Amitabh Choudhury</div>

        <div><span className="t-prompt">❯ </span><span className="t-cmd">cat role.json</span></div>
        <div style={{ paddingLeft: "1rem" }}>
          <div><span className="t-muted">{"{"}</span></div>
          <div style={{ paddingLeft: "1rem" }}>
            <span className="t-key">&quot;company&quot;</span><span className="t-muted">: </span><span className="t-str">&quot;Caterpillar&quot;</span><span className="t-muted">,</span>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <span className="t-key">&quot;role&quot;</span><span className="t-muted">: </span><span className="t-str">&quot;Data Engineer&quot;</span><span className="t-muted">,</span>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <span className="t-key">&quot;pipelines&quot;</span><span className="t-muted">: </span><span className="t-val">40</span><span className="t-muted">,</span>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <span className="t-key">&quot;leetcode&quot;</span><span className="t-muted">: </span><span className="t-val">1923</span><span className="t-muted">,</span>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <span className="t-key">&quot;open_to_work&quot;</span><span className="t-muted">: </span><span className="t-str">true</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}><span className="t-muted">{"}"}</span></div>
        </div>

        <div>
          <span className="t-prompt">❯ </span><span className="t-cursor" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED INLINE STYLES
───────────────────────────────────────── */
const S = {
  page: {
    background: "#0d0117",
    minHeight: "100vh",
    width: "100%",
    color: "#f0ebff",
    fontFamily: "'Inter', system-ui, sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: "rgba(13,1,23,0.88)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0,255,200,0.08)",
    padding: "0 2.5rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 64,
  },
  navLogo: {
    fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
    fontSize: "1.2rem", color: "#00ffc8", letterSpacing: "-0.01em",
    textDecoration: "none", fontWeight: 600,
  },
  section: {
    maxWidth: 1100, margin: "0 auto", padding: "100px 2.5rem",
  },
  sectionLabel: {
    fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase",
    color: "#00ffc8", marginBottom: "0.9rem",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 600, lineHeight: 1.1,
    marginBottom: "1.25rem",
    color: "#f0ebff",
    letterSpacing: "-0.02em",
  },
  divider: {
    width: 48, height: 2,
    background: "linear-gradient(90deg, #00ffc8, transparent)",
    marginBottom: "3rem",
  },
  tag: (color = "#00ffc8") => ({
    display: "inline-block",
    background: `${color}18`,
    border: `1px solid ${color}40`,
    color,
    padding: "3px 10px",
    borderRadius: 4,
    fontSize: "0.68rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }),
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Portfolio() {
  const [activeNav, setActiveNav]     = useState("Home");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [filterCat, setFilterCat]     = useState("All");
  const [copied, setCopied]           = useState(false);
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 });
  const [showTop, setShowTop]         = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);

  /* mouse glow + state */
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* ── custom cursor + sparkle trail ── */
  useEffect(() => {
    const dot  = document.getElementById("cur-dot");
    const ring = document.getElementById("cur-ring");
    if (!dot || !ring) return;

    let dotX = window.innerWidth / 2,  dotY = window.innerHeight / 2;
    let ringX = dotX, ringY = dotY;
    let lastSparkle = 0;
    let rafId;

    const SPARKLE_COLORS = ["#00ffc8", "#a78bfa", "#ffffff", "#7ee8fa", "#c4b5fd"];
    const HOVER_TARGETS  = "a, button, .terminal-card, [class*='card'], [class*='btn']";

    function onMouseMove(e) {
      dotX = e.clientX;
      dotY = e.clientY;
      dot.style.left = dotX + "px";
      dot.style.top  = dotY + "px";

      /* sparkle — throttled to every 35ms */
      const now = Date.now();
      if (now - lastSparkle > 35) {
        lastSparkle = now;
        const count = Math.random() < 0.4 ? 2 : 1;
        for (let i = 0; i < count; i++) spawnSparkle(e.clientX, e.clientY);
      }
    }

    function spawnSparkle(x, y) {
      const el = document.createElement("div");
      el.className = "sparkle";
      const size = Math.random() * 4 + 2;
      el.style.cssText = `
        left:${x}px; top:${y}px;
        width:${size}px; height:${size}px;
        background:${SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]};
        --dx:${(Math.random() - 0.5) * 44}px;
        --dy:${-(Math.random() * 38 + 8)}px;
        box-shadow: 0 0 ${size * 2}px currentColor;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 680);
    }

    function animateRing() {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    function onHoverIn()  { dot.classList.add("hovering");    ring.classList.add("hovering"); }
    function onHoverOut() { dot.classList.remove("hovering"); ring.classList.remove("hovering"); }
    function onLeave()    { dot.classList.add("hidden");      ring.classList.add("hidden"); }
    function onEnter()    { dot.classList.remove("hidden");   ring.classList.remove("hidden"); }

    /* attach hover listeners via delegation */
    function onDocMove(e) {
      const target = e.target.closest(HOVER_TARGETS);
      if (target) onHoverIn(); else onHoverOut();
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousemove", onDocMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", onDocMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* active nav */
  useEffect(() => {
    const secs = NAV_ITEMS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
      });
    }, { threshold: 0.35 });
    secs.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* scroll-to-top visibility */
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* stats count-up trigger */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true); }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const h = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const categories    = ["All", ...Array.from(new Set(data.skills.map(s => s.category)))];
  const filteredSkills = filterCat === "All" ? data.skills : data.skills.filter(s => s.category === filterCat);

  return (
    <div style={S.page}>

      {/* Custom cursor elements */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      {/* Large ambient glow that follows mouse */}
      <div style={{
        position: "fixed", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,50,180,0.07) 0%, rgba(0,255,200,0.03) 40%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        left: mousePos.x - 350, top: mousePos.y - 350,
        transition: "left 0.12s ease, top 0.12s ease",
      }} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ══ NAVBAR ══ */}
      <nav style={S.nav}>
        <a href="#home" style={S.navLogo}>Amitabh Choudhury</a>

        {/* Desktop */}
        <ul className="desktop-nav" style={{ display: "flex", gap: "1.75rem", listStyle: "none", alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <li key={item}>
              <button onClick={() => scrollTo(item)}
                className={activeNav === item ? "nav-active-pill" : ""}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeNav === item ? "#00ffc8" : "#8896b3",
                  fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase",
                  transition: "color 0.2s", fontFamily: "'DM Mono', monospace", padding: "4px 0",
                }}
                onMouseEnter={e => e.target.style.color = "#00ffc8"}
                onMouseLeave={e => e.target.style.color = activeNav === item ? "#00ffc8" : "#8896b3"}
              >{item}</button>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" download target="_blank" rel="noreferrer" style={{
              background: "transparent", border: "1px solid #00ffc8",
              color: "#00ffc8", padding: "6px 16px", borderRadius: 4,
              fontSize: "0.73rem", letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,255,200,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Resume ↓</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <button key={item} onClick={() => scrollTo(item)}
            style={{ color: activeNav === item ? "#00ffc8" : undefined }}
          >{item}</button>
        ))}
        <a href="/resume.pdf" download target="_blank" rel="noreferrer" style={{
          color: "#00ffc8", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem",
          letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
          padding: "0.9rem 0", borderTop: "1px solid rgba(0,255,200,0.1)", marginTop: "0.25rem",
        }}>↓ Download Resume</a>
      </div>

      {/* ══ HERO ══ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ ...S.section, paddingTop: 130, width: "100%" }} className="section-wrap">
          <div className="hero-two-col" style={{ display: "flex", gap: "4rem", alignItems: "center" }}>

            {/* Left: text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <AnimSection delay={0}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(0,255,200,0.07)", border: "1px solid rgba(0,255,200,0.18)",
                  borderRadius: 20, padding: "4px 14px", marginBottom: "1.5rem",
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#00ffc8",
                    boxShadow: "0 0 8px #00ffc8", display: "inline-block",
                    animation: "pulse-dot 1.5s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: "0.7rem", color: "#00ffc8", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Available for opportunities
                  </span>
                </div>
              </AnimSection>

              <AnimSection delay={0.1}>
                <h1 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 600, lineHeight: 0.95,
                  marginBottom: "1.5rem", color: "#f0ebff", letterSpacing: "-0.03em",
                }}>
                  I&apos;m Amitabh<br />
                  <span style={{ color: "#00ffc8", fontStyle: "italic" }}>Choudhury</span>
                </h1>
              </AnimSection>

              <AnimSection delay={0.2}>
                <p style={{ color: "#9d8fbe", fontSize: "0.95rem", marginBottom: "2.5rem", letterSpacing: "0", lineHeight: 1.8, maxWidth: 480, fontFamily: "'Inter', sans-serif" }}>
                  Data Engineer · Machine Learning Engineer · Competitive Programmer<br />
                  Python &nbsp;·&nbsp; SQL &nbsp;·&nbsp; Snowflake &nbsp;·&nbsp; SnapLogic &nbsp;·&nbsp; TensorFlow &nbsp;·&nbsp; Power BI
                </p>
              </AnimSection>

              <AnimSection delay={0.3}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button onClick={() => scrollTo("projects")} style={{
                    background: "#00ffc8", color: "#0d0117",
                    padding: "12px 28px", borderRadius: 4, border: "none", cursor: "pointer",
                    fontSize: "0.78rem", fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,255,200,0.3)"; }}
                    onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
                  >View Projects →</button>
                  <button onClick={() => scrollTo("contact")} style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.14)",
                    color: "#f0ebff", padding: "12px 28px", borderRadius: 4,
                    cursor: "pointer", fontSize: "0.78rem",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                    onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.14)"}
                  >Contact Me</button>
                </div>
              </AnimSection>

              {/* Social links */}
              <AnimSection delay={0.4}>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  {[
                    { label: "GitHub",   href: data.github },
                    { label: "LinkedIn", href: data.linkedin },
                    { label: "LeetCode", href: data.leetcode },
                    { label: "GFG",      href: data.gfg },
                    { label: "Email",    href: `https://mail.google.com/mail/?view=cm&to=${data.email}` },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                      color: "#9d8fbe", textDecoration: "none", fontSize: "0.73rem",
                      letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s",
                      borderBottom: "1px solid rgba(136,150,179,0.25)", paddingBottom: 2,
                    }}
                      onMouseEnter={e => e.target.style.color = "#00ffc8"}
                      onMouseLeave={e => e.target.style.color = "#8896b3"}
                    >{s.label}</a>
                  ))}
                </div>
              </AnimSection>

              {/* Stats row */}
              <AnimSection delay={0.5}>
                <div ref={statsRef} className="stats-row">
                  {data.stats.map(s => (
                    <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} decimals={s.decimals} active={statsActive} />
                  ))}
                </div>
              </AnimSection>
            </div>

            {/* Right: terminal card (desktop only) */}
            <div style={{ flexShrink: 0, width: 340 }} className="terminal-col">
              <AnimSection delay={0.35}>
                <TerminalCard />
              </AnimSection>
            </div>

          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={S.section} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>Who I am</div>
            <h2 style={S.sectionTitle}>About Me</h2>
            <div style={S.divider} />
          </AnimSection>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <AnimSection delay={0.1}>
              <p style={{ color: "#b0a4cc", lineHeight: 1.9, fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }}>{data.bio}</p>
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "Role",     val: "Data Engineer @ Caterpillar" },
                  { label: "Degree",   val: "B.Tech AI & ML — M.S Ramaiah University" },
                  { label: "CGPA",     val: "8.55 / 10" },
                  { label: "LeetCode", val: "Rating 1923" },
                  { label: "Focus",    val: "Data Engineering · ML · Research" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                    <span style={{ color: "#00ffc8", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", minWidth: 80 }}>{item.label}</span>
                    <span style={{ color: "#9d8fbe", fontSize: "0.83rem" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection delay={0.2}>
              <div style={{
                background: "linear-gradient(135deg, rgba(0,255,200,0.04), rgba(123,97,255,0.04))",
                border: "1px solid rgba(0,255,200,0.1)",
                borderRadius: 12, padding: "2rem",
              }}>
                <div style={{ fontSize: "0.68rem", color: "#00ffc8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>// What drives me</div>
                {[
                  { emoji: "🗄️", title: "Data Engineering",       desc: "Building production ETL pipelines and data platforms that scale to millions of rows." },
                  { emoji: "🧠", title: "Machine Learning",        desc: "Forecasting models, deep learning for medical imaging, and ML that actually ships." },
                  { emoji: "📊", title: "Analytics & BI",          desc: "Designing Power BI dashboards that turn raw supply chain data into clear decisions." },
                  { emoji: "⚡", title: "Competitive Programming", desc: "LeetCode rating 1923 — obsessed with elegant algorithms and clean problem-solving." },
                ].map(item => (
                  <div key={item.title} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.1rem", marginTop: 2 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: "0.83rem", color: "#f0ebff", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "#9d8fbe", lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" style={{ position: "relative", zIndex: 1 }}>
        <div style={S.section} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>My journey</div>
            <h2 style={S.sectionTitle}>Experience</h2>
            <div style={S.divider} />
          </AnimSection>
          <div className="experience-section" style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{
              position: "absolute", left: 0, top: 8, bottom: 0,
              width: 1, background: "linear-gradient(to bottom, #00ffc8, rgba(0,255,200,0.06))",
            }} />
            {data.experience.map((item, i) => (
              <AnimSection key={i} delay={i * 0.12}>
                <div style={{ position: "relative", marginBottom: "3rem" }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: -34, top: 6,
                    width: item.current ? 12 : 10, height: item.current ? 12 : 10,
                    borderRadius: "50%",
                    background: item.current ? "#00ffc8" : "rgba(0,255,200,0.45)",
                    boxShadow: item.current ? "0 0 14px rgba(0,255,200,0.7)" : "0 0 8px rgba(0,255,200,0.35)",
                  }} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      background: item.current ? "rgba(0,255,200,0.1)" : "rgba(0,255,200,0.06)",
                      border: `1px solid ${item.current ? "rgba(0,255,200,0.3)" : "rgba(0,255,200,0.15)"}`,
                      color: "#00ffc8", fontSize: "0.7rem", letterSpacing: "0.08em",
                      padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap",
                    }}>
                      {item.current && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffc8", animation: "pulse-exp 1.5s ease-in-out infinite", display: "inline-block" }} />}
                      {item.year}
                    </span>
                    <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", color: "#e2e8f8" }}>{item.role}</h3>
                    <span style={{ color: "#8896b3", fontSize: "0.8rem" }}>@ {item.company}</span>
                  </div>
                  {item.bullets ? (
                    <ul style={{ color: "#8896b3", fontSize: "0.85rem", lineHeight: 1.75, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  ) : (
                    <p style={{ color: "#8896b3", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.desc}</p>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ position: "relative", zIndex: 1 }}>
        <div style={S.section} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>What I know</div>
            <h2 style={S.sectionTitle}>Skills & Technologies</h2>
            <div style={S.divider} />
          </AnimSection>
          <AnimSection delay={0.1}>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)} style={{
                  background: filterCat === cat ? "#00ffc8" : "transparent",
                  border: `1px solid ${filterCat === cat ? "#00ffc8" : "rgba(255,255,255,0.1)"}`,
                  color: filterCat === cat ? "#0d0117" : "#8896b3",
                  padding: "5px 14px", borderRadius: 4, cursor: "pointer",
                  fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace", transition: "all 0.2s",
                }}>{cat}</button>
              ))}
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "1rem" }}>
            {filteredSkills.map((skill, i) => (
              <AnimSection key={skill.name} delay={Math.min(i * 0.04, 0.4)}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8, padding: "1.25rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  cursor: "default", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,200,0.05)"; e.currentTarget.style.borderColor = "rgba(0,255,200,0.28)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
                >
                  {skill.isImg
                    ? <img src={skill.icon} alt={skill.name} style={{ width: 38, height: 38, objectFit: "contain" }}
                        onError={e => { const s = document.createElement("span"); s.textContent = "🔷"; s.style.fontSize = "1.8rem"; e.target.replaceWith(s); }} />
                    : <span style={{ fontSize: "1.8rem" }}>{skill.icon}</span>
                  }
                  <span style={{ fontSize: "0.78rem", color: "#f0ebff", letterSpacing: "0.03em", textAlign: "center" }}>{skill.name}</span>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={S.section} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>What I&apos;ve built</div>
            <h2 style={S.sectionTitle}>Projects</h2>
            <div style={S.divider} />
          </AnimSection>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {data.projects.map((proj, i) => (
              <AnimSection key={proj.name} delay={Math.min(i * 0.07, 0.42)}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, overflow: "hidden", height: "100%",
                  display: "flex", flexDirection: "column", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${proj.color}55`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${proj.color}12`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{
                    background: `linear-gradient(135deg, ${proj.color}28, ${proj.color}10)`,
                    padding: "1.75rem", display: "flex", alignItems: "center",
                    justifyContent: "space-between", borderBottom: `1px solid ${proj.color}18`,
                  }}>
                    <div style={{ fontSize: "2.2rem" }}>{proj.emoji}</div>
                    <span style={S.tag()}>{proj.type}</span>
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", color: "#f0ebff", marginBottom: "0.6rem" }}>{proj.name}</h3>
                    <p style={{ color: "#9d8fbe", fontSize: "0.85rem", lineHeight: 1.75, marginBottom: "1.25rem", flex: 1, fontFamily: "'Inter', sans-serif" }}>{proj.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                      {proj.tech.map(t => (
                        <span key={t} style={{
                          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                          color: "#b0a4cc", padding: "2px 8px", borderRadius: 3, fontSize: "0.68rem",
                        }}>{t}</span>
                      ))}
                    </div>
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{
                      color: "#00ffc8", fontSize: "0.73rem", textDecoration: "none",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderBottom: "1px solid rgba(0,255,200,0.28)", paddingBottom: 1,
                      width: "fit-content", transition: "opacity 0.2s",
                    }}
                      onMouseEnter={e => e.target.style.opacity = ".7"}
                      onMouseLeave={e => e.target.style.opacity = "1"}
                    >View Code →</a>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={S.section} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>Recognition</div>
            <h2 style={S.sectionTitle}>Achievements</h2>
            <div style={S.divider} />
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {data.achievements.map((item, i) => (
              <AnimSection key={item.title} delay={i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10, padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,200,0.04)"; e.currentTarget.style.borderColor = "rgba(0,255,200,0.25)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
                >
                  <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.88rem", color: "#e2e8f8", marginBottom: "0.3rem", fontFamily: "'Georgia', serif" }}>{item.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "#8896b3", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ ...S.section, textAlign: "center" }} className="section-wrap">
          <AnimSection>
            <div style={S.sectionLabel}>Get in touch</div>
            <h2 style={{ ...S.sectionTitle, maxWidth: 600, margin: "0 auto 1.25rem" }}>
              Open to the <span style={{ fontStyle: "italic", color: "#00ffc8" }}>right opportunity</span>
            </h2>
            <div style={{ ...S.divider, margin: "0 auto 2rem" }} />
            <p style={{ color: "#9d8fbe", fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 460, margin: "0 auto 2.5rem", fontFamily: "'Inter', sans-serif" }}>
              I&apos;m currently open to full-time roles in Data Engineering and ML Engineering. If you&apos;re working on something interesting in data infrastructure, forecasting, or applied ML, I&apos;d love to hear about it.
            </p>
          </AnimSection>

          {/* Email display */}
          <AnimSection delay={0.1}>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.68rem", color: "#4a5568", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>reach me at</div>
              <a href={`https://mail.google.com/mail/?view=cm&to=${data.email}`} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                color: "#00ffc8", textDecoration: "none",
                borderBottom: "1px solid rgba(0,255,200,0.3)", paddingBottom: 2,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.target.style.opacity = ".7"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >{data.email}</a>
            </div>
          </AnimSection>

          {/* Primary buttons */}
          <AnimSection delay={0.15}>
            <div className="contact-buttons" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <button onClick={copyEmail} style={{
                background: "#00ffc8", color: "#0d0117",
                border: "none", padding: "13px 32px", borderRadius: 4,
                fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s", minWidth: 160,
              }}
                onMouseEnter={e => e.target.style.boxShadow = "0 8px 30px rgba(0,255,200,0.3)"}
                onMouseLeave={e => e.target.style.boxShadow = ""}
              >{copied ? "✓ Copied!" : "Copy Email"}</button>
              <a href={`https://mail.google.com/mail/?view=cm&to=${data.email}`} target="_blank" rel="noreferrer" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.14)",
                color: "#f0ebff", padding: "13px 32px", borderRadius: 4,
                fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.14)"}
              >Send Email →</a>
            </div>
          </AnimSection>

          {/* Secondary social icons */}
          <AnimSection delay={0.2}>
            <div style={{ fontSize: "0.68rem", color: "#4a5568", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>also find me on</div>
            <div className="contact-social-row">
              {[
                { label: "LinkedIn", href: data.linkedin,  icon: "in"  },
                { label: "GitHub",   href: data.github,    icon: "{}"  },
                { label: "LeetCode", href: data.leetcode,  icon: "<>"  },
                { label: "GFG",      href: data.gfg,       icon: "gfg" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact-icon-btn">
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "0.85rem", color: "#00ffc8" }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "2rem 2.5rem", textAlign: "center",
        color: "#2d3748", fontSize: "0.73rem", letterSpacing: "0.08em",
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "1.5rem", flexWrap: "wrap",
      }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", color: "#4a5568" }}>Amitabh Choudhury</span>
        <span>·</span>
        <span>Built with React + Vite</span>
        <span>·</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

      {/* ══ SCROLL TO TOP ══ */}
      <button className={`scroll-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >↑</button>

      <style>{`
        @keyframes pulse-exp {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
