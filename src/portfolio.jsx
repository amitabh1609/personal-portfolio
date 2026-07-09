import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ─────────────────────────────────────────
   ICON HELPERS
───────────────────────────────────────── */
const DEV = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}.svg`;
const ICONS = {
  snowflake: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg",
  dbt: "/icons/dbt.svg",
  snaplogic: "https://www.snaplogic.com/media-kit/Logocombo_SnapLogic_RGB.svg",
  powerbi: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg",
  sklearn: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  python: DEV("python/python-original"),
  cpp: DEV("cplusplus/cplusplus-original"),
  pandas: DEV("pandas/pandas-original"),
  numpy: DEV("numpy/numpy-original"),
  fastapi: DEV("fastapi/fastapi-original"),
  docker: DEV("docker/docker-original"),
  github: DEV("github/github-original"),
  git: DEV("git/git-original"),
  postgres: DEV("postgresql/postgresql-original"),
  jupyter: DEV("jupyter/jupyter-original"),
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const data = {
  email: "choudhryamitabh@gmail.com",
  github: "https://github.com/amitabh1609",
  linkedin: "https://www.linkedin.com/in/amitabh-choudhury/",
  leetcode: "https://leetcode.com/amitabhchoudhury19999/",
  gfg: "https://auth.geeksforgeeks.org/user/amitabhchoudhury19999",

  roles: ["Data Engineer", "Data Scientist", "MLOps Builder", "GenAI Evaluator"],
  tagline:
    "I turn messy supply-chain data into systems that are safe to run in production — pipelines that don't silently drop rows, models that know when they're wrong, and LLM apps with guardrails you can actually trust.",

  pipeline: [
    { ico: "📥", name: "Ingest", desc: "SnapLogic · Streams · GitHub Archive", c: "#22d3ee" },
    { ico: "🔧", name: "Transform", desc: "dbt · SCD-2 · Iceberg Bronze→Gold", c: "#34d399" },
    { ico: "🧠", name: "Model", desc: "LightGBM · RAG · Cortex Analyst", c: "#a78bfa" },
    { ico: "🚀", name: "Serve", desc: "FastAPI · Power BI · Streamlit", c: "#fbbf24" },
  ],

  metrics: [
    { value: 25, suffix: "+", label: "Production pipelines owned", decimals: 0 },
    { value: 7.4, suffix: "M+", label: "Events ingested in lakehouse", decimals: 1 },
    { value: 69, suffix: "%", label: "Table reduction, SAS migration", decimals: 0 },
    { value: 1923, suffix: "", label: "LeetCode max rating (Knight)", decimals: 0 },
  ],

  about: [
    "Most data systems don't fail because someone wrote bad code. They fail because nobody thought carefully enough about what happens when the data is wrong, the query is ambiguous, or the pipeline silently drops rows at 3am.",
    "I'm a Data Engineer at Caterpillar in Bengaluru — promoted from Systems Data Support Analyst within 12 months. I own 25+ production ETL/ELT pipelines across SnapLogic, dbt, and Snowflake with refresh SLAs as tight as 20 minutes, feeding Power BI dashboards that drive daily shipment-allocation decisions for ~75 supply-chain stakeholders.",
    "Recently I shipped LPAgent — the first production LLM-powered application in PSLD at Caterpillar. Cortex Analyst generates anomaly-detection rule SQL behind a three-tier approval workflow, cutting rule deployment from a multi-day manual process to same-day self-service.",
    "Outside work I build data-science and GenAI systems adversarially, because I'd rather find the failure mode myself than have production find it for me.",
  ],
  pullQuote:
    "“'It works' and 'it's safe to run on real data' are two completely different statements.”",

  principles: [
    { ico: "🛡️", title: "Fail loud, fail early", desc: "36 Soda Core checks gating every run, CI gates that block deploys on quality regression — bad data should never reach a dashboard silently." },
    { ico: "📐", title: "Evaluate, don't vibe", desc: "50-question adversarial benchmarks, RAGAS faithfulness gates, walk-forward CV. If I can't measure it, I don't ship it." },
    { ico: "♻️", title: "Reproducible by default", desc: "Versioned feature stores, MLflow registries with promotion gates, manifest-tracked crash-resumable pipelines." },
  ],

  experience: [
    {
      date: "Jun 2025 — Present",
      role: "Data Engineer",
      company: "Caterpillar",
      current: true,
      note: "Promoted from Systems Data Support Analyst within 12 months",
      bullets: [
        "Architected and shipped the LPAgent Anomaly Detection & Alerting Platform (Streamlit-in-Snowflake) — the first production LLM-powered application in PSLD at Caterpillar; Cortex Analyst generates anomaly rule SQL, cutting rule deployment from a multi-day manual process to same-day self-service",
        "Implemented a three-tier (L1/L2/L3) rule approval workflow with Snowflake-native RBAC and real-time role resolution; soft-update audit trail captures every role change with attribution and reason; reviewer notifications replatformed from Dataiku to a native Snowflake trigger",
        "Led the MineStar MSU SAS-to-Snowflake migration end-to-end: refactored 2,025 lines of legacy SAS into 32 optimised Snowflake objects (69% table reduction) across 5 data domains covering ~5,500 global parts; verified cutover with row-level parity reconciliation",
        "Own 25+ production ETL/ELT pipelines (SnapLogic, dbt, Snowflake) with refresh SLAs as tight as 20 minutes, powering Power BI dashboards for ~75 supply-chain stakeholders",
        "Designed a Goods Receipt dbt pipeline with SCD Type-2 history at supplier/PO grain, enabling point-in-time audit and invoice dispute resolution; 13 data-contract tests; Dynamic Tables auto-refresh every 30 minutes",
      ],
    },
    {
      date: "Jun 2024 — Jun 2025",
      role: "Systems Data Support Analyst",
      company: "Caterpillar",
      current: false,
      bullets: [
        "Supported production Snowflake/SnapLogic/Tidal pipelines for warehouse, procurement, and finance stakeholders; owned data-quality triage and ad hoc analytical SQL feeding procurement-planning decisions",
        "Initiated a multi-year warehouse parts-usage analysis (Python, pandas) to surface seasonal demand patterns; built a Random Forest forecasting prototype with a time-based split — methodology carried forward into the Data Engineer role",
      ],
    },
    {
      date: "Jun 2023 — Sep 2023",
      role: "Software Engineer Intern",
      company: "Caterpillar",
      current: false,
      bullets: [
        "Implemented KS-test + PSI drift detection on 3 production Tidal data streams; tuned alert thresholds against 6 months of historical data, reducing false-positive alerts by ~30% and cutting unnecessary pipeline re-runs",
      ],
    },
  ],

  projects: [
    {
      name: "Text-to-SQL with Guardrails & Hallucination Detection",
      type: "AI / Safety",
      ico: "🛡️",
      accent: "#a78bfa",
      metrics: "100% guardrail block rate · 10/10 injection tests · 50-question adversarial benchmark",
      description:
        "NL-to-SQL over a supply-chain PostgreSQL database. sqlparse AST guardrails (token-type checking, not regex) hard-block DDL/DML, injection, and catalog access; execution runs inside PostgreSQL SET TRANSACTION READ ONLY as a database-enforced fallback. Back-translation hallucination detection via MiniLM-L6 cosine similarity; 6 Architecture Decision Records.",
      tech: ["FastAPI", "PostgreSQL 15", "Claude Sonnet", "sqlparse", "sentence-transformers", "Docker"],
      link: "https://github.com/amitabh1609/Text_To_SQL_Guardrails",
    },
    {
      name: "Supply Chain Demand Forecasting MLOps",
      type: "ML / MLOps",
      ico: "📈",
      accent: "#34d399",
      metrics: "500 SKUs · 34.9% WAPE · 82.6% interval coverage · 46% over baseline",
      description:
        "End-to-end forecasting platform for 500 spare-parts SKUs, rebuilt from a Caterpillar prototype. QuantileLightGBM (P10/P50/P90) via walk-forward CV; versioned Parquet feature store with 33 features. MLflow registry with a promotion gate; Evidently AI separates data drift from concept drift; GitHub Actions triggers automated retraining on drift alerts.",
      tech: ["LightGBM", "MLflow", "Evidently AI", "FastAPI", "Streamlit", "Docker", "GitHub Actions"],
      link: "https://github.com/amitabh1609/SupplyChain_Demand_Forecasting_MLOPS",
      demo: "https://supplychain-forecast-mlops.streamlit.app",
    },
    {
      name: "Hybrid RAG System with Evaluation Suite",
      type: "AI / RAG",
      ico: "🔍",
      accent: "#22d3ee",
      metrics: "0.86 RAGAS faithfulness vs 0.31 baseline · CI eval gate · live on Render",
      description:
        "Production RAG pipeline over Snowflake and dbt docs. Dense retrieval (BGE-large, Qdrant) fused with BM25 via RRF (k=60); BGE cross-encoder reranker; Claude Haiku query rewriter; answers grounded with cited chunks. 50-question adversarial benchmark across 4 tiers; CI eval gate fails the build on faithfulness regression; all retrievals traced in Langfuse.",
      tech: ["BGE-large", "BM25/RRF", "Qdrant", "RAGAS", "Claude Sonnet", "Langfuse", "Docker"],
      link: "https://github.com/amitabh1609/Evaluated_Rag_Snowflake_DBT",
      demo: "https://evaluated-rag-snowflake-dbt.onrender.com",
    },
    {
      name: "GitHub Archive Lakehouse",
      type: "Data Engineering",
      ico: "🧊",
      accent: "#fbbf24",
      metrics: "7.4M+ events · 36 Soda Core quality checks · time-travel on 3.8M rows",
      description:
        "Bronze/Silver/Gold Iceberg lakehouse ingesting 7.4M+ GitHub Archive events. Manifest-tracked, crash-resumable pipeline; Silver deduplicates by event ID, parses 15 event-type payloads, quarantines ~600 malformed rows with reasons. 36 Soda Core checks gate each Dagster run; Software-Defined Assets provide full lineage; 5 documented failure/recovery scenarios.",
      tech: ["Apache Iceberg", "DuckDB", "Dagster", "Soda Core", "MinIO", "Streamlit", "Docker"],
      link: "https://github.com/amitabh1609/AfterV1",
    },
  ],

  skillGroups: [
    {
      category: "Data Engineering",
      color: "#22d3ee",
      skills: [
        { name: "Snowflake", img: ICONS.snowflake },
        { name: "dbt", img: ICONS.dbt },
        { name: "SnapLogic", img: ICONS.snaplogic },
        { name: "Apache Iceberg", emoji: "🧊" },
        { name: "DuckDB", emoji: "🦆" },
        { name: "Dagster", emoji: "⚙️" },
        { name: "Soda Core", emoji: "🧪" },
        { name: "Tidal", emoji: "⏱️" },
      ],
    },
    {
      category: "AI / GenAI",
      color: "#a78bfa",
      skills: [
        { name: "Claude API", emoji: "✳️" },
        { name: "RAG", emoji: "🔗" },
        { name: "Qdrant", emoji: "🎯" },
        { name: "RAGAS", emoji: "📊" },
        { name: "Langfuse", emoji: "🔭" },
        { name: "BM25 / RRF", emoji: "🔀" },
        { name: "BGE embeddings", emoji: "🤗" },
        { name: "Guardrails", emoji: "🛡️" },
      ],
    },
    {
      category: "ML / MLOps",
      color: "#34d399",
      skills: [
        { name: "LightGBM", emoji: "🌳" },
        { name: "scikit-learn", img: ICONS.sklearn },
        { name: "MLflow", emoji: "📈" },
        { name: "Evidently AI", emoji: "📉" },
        { name: "FastAPI", img: ICONS.fastapi },
        { name: "Quantile regression", emoji: "📐" },
      ],
    },
    {
      category: "Languages & Analytics",
      color: "#fbbf24",
      skills: [
        { name: "Python", img: ICONS.python },
        { name: "SQL", emoji: "💾" },
        { name: "C++", img: ICONS.cpp },
        { name: "Pandas", img: ICONS.pandas },
        { name: "NumPy", img: ICONS.numpy },
        { name: "Power BI", img: ICONS.powerbi },
      ],
    },
    {
      category: "Infra & Dev",
      color: "#22d3ee",
      skills: [
        { name: "Docker", img: ICONS.docker },
        { name: "GitHub Actions", img: ICONS.github },
        { name: "Git", img: ICONS.git },
        { name: "PostgreSQL", img: ICONS.postgres },
        { name: "Jupyter", img: ICONS.jupyter },
      ],
    },
  ],

  marquee: [
    { name: "Snowflake", img: ICONS.snowflake },
    { name: "dbt", img: ICONS.dbt },
    { name: "Python", img: ICONS.python },
    { name: "Dagster", emoji: "⚙️" },
    { name: "Apache Iceberg", emoji: "🧊" },
    { name: "DuckDB", emoji: "🦆" },
    { name: "FastAPI", img: ICONS.fastapi },
    { name: "LightGBM", emoji: "🌳" },
    { name: "MLflow", emoji: "📈" },
    { name: "Docker", img: ICONS.docker },
    { name: "PostgreSQL", img: ICONS.postgres },
    { name: "Power BI", img: ICONS.powerbi },
    { name: "Qdrant", emoji: "🎯" },
    { name: "Claude API", emoji: "✳️" },
  ],

  achievements: [
    { ico: "🏆", title: "LeetCode Knight", desc: "Max rating 1923 · global rank 283/29,865 in Weekly Contest 366 (top 1%)" },
    { ico: "⚡", title: "Codeforces Expert", desc: "Max rating 1800 · @amitabh1208" },
    { ico: "⭐", title: "CodeChef 4★", desc: "Max rating 1711 · @amitabh1208" },
    { ico: "🥇", title: "Centurion Hackathon", desc: "Team Lead · 13th of 500+ participants (National Level)" },
  ],
  education: {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    school: "M.S. Ramaiah University of Applied Sciences, Bengaluru",
    meta: "2020 — Apr 2024 · CGPA 8.55/10",
  },

  openRoles: ["Data Engineer", "Data Scientist", "Analytics Engineer", "ML / MLOps Engineer"],
  locations: ["Bengaluru", "Singapore", "Dubai", "Switzerland", "Remote"],
};

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
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

function useTypewriter(words, { type = 90, del = 45, hold = 1600 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => { setDeleting(false); setI((n) => n + 1); }, del);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, deleting ? del : type);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, del, hold]);
  return text;
}

/* ─────────────────────────────────────────
   SHARED
───────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal${inView ? " in" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function SecHead({ kicker, title, sub }) {
  return (
    <Reveal>
      <div className="sec-head">
        <div className="sec-kicker">{kicker}</div>
        <h2 className="sec-title">{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
    </Reveal>
  );
}

function SkillLogo({ skill }) {
  const [failed, setFailed] = useState(false);
  if (skill.img && !failed) {
    return (
      <span className="skill-logo">
        <img src={skill.img} alt={skill.name} loading="lazy" onError={() => setFailed(true)} />
      </span>
    );
  }
  return <span className="skill-logo"><span className="emo">{skill.emoji || "🔷"}</span></span>;
}

function MarqueeItem({ item }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="marquee-item">
      {item.img && !failed
        ? <img src={item.img} alt={item.name} loading="lazy" onError={() => setFailed(true)} />
        : <span className="emo">{item.emoji || "🔷"}</span>}
      {item.name}
    </span>
  );
}

function Metric({ value, suffix, label, decimals, active }) {
  const n = useCountUp(value, decimals, active);
  return (
    <div className="metric-card">
      <div className="metric-num">{decimals > 0 ? n.toFixed(decimals) : Math.floor(n)}{suffix}</div>
      <div className="metric-lbl">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const [metricsOn, setMetricsOn] = useState(false);
  const metricsRef = useRef(null);
  const typed = useTypewriter(data.roles);

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 520);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!metricsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setMetricsOn(true); },
      { threshold: 0.35 }
    );
    obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const gmail = `https://mail.google.com/mail/?view=cm&to=${data.email}`;

  return (
    <div>
      <div className="bg-grid" />
      <div className="bg-glow a" />
      <div className="bg-glow b" />
      <div
        className="spotlight"
        style={{ background: `radial-gradient(560px circle at ${mouse.x}px ${mouse.y}px, rgba(34,211,238,0.06), transparent 72%)` }}
      />

      {/* ══ NAV ══ */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="bracket">{"{"}</span>amitabh<span className="bracket">{"}"}</span>
        </a>
        <div className="nav-links">
          {NAV.map((n) => (
            <button key={n.id} className={active === n.id ? "active" : ""} onClick={() => scrollTo(n.id)}>
              {n.label}
            </button>
          ))}
          <a className="nav-resume" href="/resume.pdf" download target="_blank" rel="noreferrer">Résumé ↓</a>
        </div>
        <button className={`nav-toggle${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV.map((n) => <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>)}
        <a href="/resume.pdf" download target="_blank" rel="noreferrer">Résumé ↓</a>
      </div>

      <div className="wrap" id="top">
        {/* ══ HERO ══ */}
        <header className="shell hero">
          <div className="hero-grid">
            <div>
              <div className="hero-badge"><span className="hero-dot" /> Open to Data Engineering & Data Science roles</div>
              <h1 className="hero-name">Amitabh <span className="grad">Choudhury</span></h1>
              <div className="hero-role">
                <span className="tw">{typed}</span><span className="caret" />
              </div>
              <p className="hero-tagline">{data.tagline}</p>
              <div className="hero-cta">
                <button className="btn-solid" onClick={() => scrollTo("projects")}>View Projects →</button>
                <a className="btn-ghost" href="/resume.pdf" download target="_blank" rel="noreferrer">Download Résumé ↓</a>
              </div>
              <div className="hero-socials">
                <a href={data.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={data.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
                <a href={data.gfg} target="_blank" rel="noreferrer">GFG</a>
                <a href={gmail} target="_blank" rel="noreferrer">Email</a>
              </div>
            </div>

            {/* Animated pipeline */}
            <div>
              <div className="pipe-card">
                <div className="pipe-bar">
                  <span className="d" style={{ background: "#ff5f57" }} />
                  <span className="d" style={{ background: "#febc2e" }} />
                  <span className="d" style={{ background: "#28c840" }} />
                  <span className="label">data_platform.pipeline</span>
                </div>
                <div className="pipe-flow">
                  {data.pipeline.map((s, i) => (
                    <div key={s.name}>
                      <div className="pipe-stage" style={{ "--d": `${i * 0.8}s` }}>
                        <span className="pipe-ico" style={{ background: `${s.c}18`, borderColor: `${s.c}55` }}>{s.ico}</span>
                        <div className="pipe-meta">
                          <div className="pipe-name">{s.name}</div>
                          <div className="pipe-desc">{s.desc}</div>
                        </div>
                      </div>
                      {i < data.pipeline.length - 1 && <div className="pipe-connector" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ══ TECH MARQUEE ══ */}
        <div className="marquee">
          <div className="marquee-track">
            {[...data.marquee, ...data.marquee].map((item, i) => <MarqueeItem key={i} item={item} />)}
          </div>
        </div>

        {/* ══ METRICS ══ */}
        <section className="shell section" style={{ paddingBottom: 0 }}>
          <div className="metric-grid" ref={metricsRef}>
            {data.metrics.map((m) => <Metric key={m.label} {...m} active={metricsOn} />)}
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="shell section">
          <SecHead kicker="01 · About" title="Data systems that earn trust" />
          <div className="about-grid">
            <Reveal delay={0.05}>
              <div className="about-copy">
                {data.about.map((p, i) => <p key={i}>{p}</p>)}
                <div className="pull-quote">{data.pullQuote}</div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="principles">
                {data.principles.map((p) => (
                  <div className="principle" key={p.title}>
                    <span className="principle-ico">{p.ico}</span>
                    <div className="principle-title">{p.title}</div>
                    <div className="principle-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section id="experience" className="shell section">
          <SecHead kicker="02 · Experience" title="Two years, shipping in production" />
          <div className="timeline">
            {data.experience.map((exp, i) => (
              <Reveal key={exp.role} delay={i * 0.06}>
                <div className={`exp-item${exp.current ? " current" : ""}`}>
                  <span className="exp-node" />
                  <div className="exp-head">
                    <span className="exp-date">
                      {exp.current && <span className="hero-dot" />} {exp.date}
                    </span>
                    <span className="exp-role">{exp.role}</span>
                    <span className="exp-company">@ {exp.company}</span>
                  </div>
                  {exp.note && <div className="exp-note">{exp.note}</div>}
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="projects" className="shell section">
          <SecHead
            kicker="03 · Projects"
            title="Built adversarially, on purpose"
            sub="Side projects where I stress-test data and GenAI systems against their own failure modes — guardrails, eval gates, and drift detection are the point, not an afterthought."
          />
          <div className="proj-grid">
            {data.projects.map((proj, i) => (
              <Reveal key={proj.name} delay={Math.min(i * 0.07, 0.28)}>
                <article
                  className="proj-card"
                  style={{ "--accent": proj.accent, "--accent-soft": `${proj.accent}18`, "--accent-border": `${proj.accent}55` }}
                >
                  <div className="proj-top">
                    <span className="proj-ico">{proj.ico}</span>
                    <span className="proj-type">{proj.type}</span>
                  </div>
                  <h3 className="proj-title">{proj.name}</h3>
                  <div className="proj-metrics">▸ {proj.metrics}</div>
                  <p className="proj-desc">{proj.description}</p>
                  <div className="proj-tech">{proj.tech.map((t) => <span key={t}>{t}</span>)}</div>
                  <div className="proj-links">
                    {proj.demo && <a className="proj-link-primary" href={proj.demo} target="_blank" rel="noreferrer">Live Demo →</a>}
                    <a className="proj-link-ghost" href={proj.link} target="_blank" rel="noreferrer">View Code →</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" className="shell section">
          <SecHead
            kicker="04 · Skills"
            title="The stack I build on"
            sub="From ingestion to serving — the tools I use across data engineering, data science, and GenAI."
          />
          <div className="skills-stack">
            {data.skillGroups.map((group, gi) => (
              <Reveal key={group.category} delay={Math.min(gi * 0.05, 0.2)}>
                <div style={{ "--gc": group.color }}>
                  <div className="skill-group-head">
                    <span className="name">{group.category}</span>
                    <span className="rule" />
                    <span className="count">{String(group.skills.length).padStart(2, "0")}</span>
                  </div>
                  <div className="skill-cards">
                    {group.skills.map((skill) => (
                      <div className="skill-card" key={skill.name}>
                        <SkillLogo skill={skill} />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ACHIEVEMENTS ══ */}
        <section className="shell section" style={{ paddingTop: 0 }}>
          <SecHead kicker="05 · Beyond work" title="Competitive programming & education" />
          <div className="ach-grid">
            {data.achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="ach-card">
                  <span className="ach-ico">{a.ico}</span>
                  <div>
                    <div className="ach-title">{a.title}</div>
                    <div className="ach-desc">{a.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="edu-block">
              <div>
                <div className="edu-degree">{data.education.degree}</div>
                <div className="edu-school">{data.education.school}</div>
              </div>
              <div className="edu-meta">{data.education.meta}</div>
            </div>
          </Reveal>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="shell section contact">
          <SecHead kicker="06 · Contact" title="Let's build something reliable" />
          <Reveal delay={0.05}>
            <p className="contact-lede">
              I&apos;m open to full-time roles in Data Engineering, Data Science, and ML Engineering. If you&apos;re
              working on something interesting in data infrastructure, forecasting, or GenAI evaluation, I&apos;d love to hear about it.
            </p>
            <a className="contact-email" href={gmail} target="_blank" rel="noreferrer">{data.email}</a>
            <div className="contact-buttons">
              <button className="btn-solid" onClick={copyEmail}>{copied ? "✓ Copied!" : "Copy Email"}</button>
              <a className="btn-ghost" href={gmail} target="_blank" rel="noreferrer">Send Email →</a>
            </div>
            <div className="roles-wrap">
              <div className="roles-label">Open to roles</div>
              <div className="roles-chips">{data.openRoles.map((r) => <span key={r}>{r}</span>)}</div>
              <div className="roles-label">Locations</div>
              <div className="loc-chips">{data.locations.map((l) => <span key={l}>{l}</span>)}</div>
            </div>
          </Reveal>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="shell footer">
          <span className="name">Amitabh Choudhury</span>
          <span>·</span>
          <span>Built with React + Vite</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>

      <button
        className={`scroll-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >↑</button>
    </div>
  );
}
