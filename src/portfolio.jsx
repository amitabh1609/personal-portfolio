import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const data = {
  name: "Amitabh Choudhury",
  role: "Data Engineer",
  company: "Caterpillar",
  tagline:
    "I build production data platforms and LLM systems that are safe to run on real data — Snowflake, dbt, Cortex, RAG, and rigorously evaluated GenAI.",
  email: "choudhryamitabh@gmail.com",
  github: "https://github.com/amitabh1609",
  linkedin: "https://www.linkedin.com/in/amitabh-choudhury/",
  leetcode: "https://leetcode.com/amitabhchoudhury19999/",
  gfg: "https://auth.geeksforgeeks.org/user/amitabhchoudhury19999",

  about: [
    "Most data systems don't fail because someone wrote bad code. They fail because nobody thought carefully enough about what happens when the data is wrong, the query is ambiguous, or the pipeline silently drops rows at 3am.",
    "I'm a Data Engineer at Caterpillar, Bengaluru — promoted from Systems Data Support Analyst within 12 months. I own 25+ production ETL/ELT pipelines across SnapLogic, dbt, and Snowflake with refresh SLAs as tight as 20 minutes, powering Power BI dashboards that drive daily shipment-allocation decisions for ~75 supply-chain stakeholders.",
    "Most recently I architected and shipped LPAgent — an LLM-powered anomaly detection & alerting platform on Streamlit-in-Snowflake, the first production LLM application in PSLD at Caterpillar. Cortex Analyst generates anomaly rule SQL, cutting rule deployment from a multi-day manual process to same-day self-service, governed by a three-tier approval workflow with a full audit trail.",
    "Outside work I build GenAI systems adversarially: a Text-to-SQL engine with AST guardrails and a 50-question injection benchmark, a hybrid RAG pipeline whose CI gate blocks deploys on faithfulness regression, and a quantile forecasting platform with drift-triggered automated retraining.",
  ],
  pullQuote:
    "“'It works' and 'it's safe to run on real data' are two completely different statements.”",
  facts: [
    { label: "Currently", value: "Data Engineer @ Caterpillar, Bengaluru" },
    { label: "Education", value: "B.Tech AI & ML — M.S. Ramaiah University (2020–2024)" },
    { label: "CGPA", value: "8.55 / 10" },
    { label: "Focus", value: "Data platforms · GenAI evaluation · MLOps" },
  ],
  stats: [
    { value: 25, suffix: "+", label: "Production pipelines", decimals: 0 },
    { value: 69, suffix: "%", label: "Table reduction, SAS migration", decimals: 0 },
    { value: 1923, suffix: "", label: "LeetCode max rating", decimals: 0 },
    { value: 0.86, suffix: "", label: "RAGAS faithfulness", decimals: 2 },
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
        "Implemented a three-tier (L1/L2/L3) rule approval workflow with Snowflake-native RBAC and real-time role resolution; soft-update audit trail captures all role changes with attribution and reason; reviewer email notifications replatformed from Dataiku to a native Snowflake trigger",
        "Led the MineStar MSU SAS-to-Snowflake migration end-to-end: refactored 2,025 lines of legacy SAS into 32 optimised Snowflake objects (69% table reduction) across 5 data domains covering ~5,500 global parts; verified cutover with row-level parity reconciliation",
        "Own 25+ production ETL/ELT pipelines (SnapLogic, dbt, Snowflake) with refresh SLAs as tight as 20 minutes, powering Power BI dashboards that drive daily shipment-allocation decisions for ~75 supply-chain stakeholders",
        "Designed a Goods Receipt dbt pipeline with SCD Type-2 history at supplier/PO grain, enabling point-in-time audit and invoice dispute resolution; 13 data-contract tests; Dynamic Tables auto-refresh every 30 minutes",
        "Audited a Snowflake Cortex NL-to-SQL prototype, identified critical safety gaps, and open-sourced a hardened rebuild with AST-based guardrails and hallucination detection",
      ],
    },
    {
      date: "Jun 2024 — Jun 2025",
      role: "Systems Data Support Analyst",
      company: "Caterpillar",
      current: false,
      bullets: [
        "Supported production Snowflake/SnapLogic/Tidal pipelines for warehouse, procurement, and finance stakeholders; owned data-quality triage and ad hoc analytical SQL feeding procurement-planning decisions",
        "Initiated a multi-year warehouse parts usage analysis (Python, pandas) to surface seasonal demand patterns; built a Random Forest forecasting prototype with time-based train/test split — methodology carried forward into the Data Engineer role",
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
      metrics: "▸ 100% guardrail block rate · 10/10 injection tests · 50-question adversarial benchmark · zero unsafe queries",
      description:
        "NL-to-SQL over a supply chain PostgreSQL database. sqlparse AST guardrails (token-type checking, not regex) hard-block DDL/DML, injection, and catalog access; all execution runs inside PostgreSQL SET TRANSACTION READ ONLY as a database-enforced fallback. Back-translation hallucination detection via MiniLM-L6 cosine similarity; multi-query validation surfaces SQL divergence to the user; 6 Architecture Decision Records.",
      tech: ["FastAPI", "PostgreSQL 15", "Claude Sonnet", "sqlparse", "sentence-transformers", "Docker"],
      link: "https://github.com/amitabh1609/Text_To_SQL_Guardrails",
    },
    {
      name: "Supply Chain Demand Forecasting MLOps",
      type: "ML / MLOps",
      metrics: "▸ 500 SKUs · 34.9% WAPE · 82.6% interval coverage · 46% over seasonal-naive baseline",
      description:
        "End-to-end forecasting platform for 500 spare-parts SKUs, rebuilt from a Caterpillar prototype. QuantileLightGBM (P10/P50/P90) via walk-forward CV; versioned Parquet feature store with 33 hand-crafted features. MLflow registry with a promotion gate (candidate must beat production WAPE by >2%); Evidently AI separates data drift from concept drift; GitHub Actions triggers automated retraining on drift alerts; FastAPI serving returns quantiles with model-version headers.",
      tech: ["LightGBM", "MLflow", "Evidently AI", "FastAPI", "Streamlit", "Docker", "GitHub Actions"],
      link: "https://github.com/amitabh1609/SupplyChain_Demand_Forecasting_MLOPS",
      demo: "https://supplychain-forecast-mlops.streamlit.app",
    },
    {
      name: "Hybrid RAG System with Evaluation Suite",
      type: "AI / RAG",
      metrics: "▸ 0.86 RAGAS faithfulness vs 0.31 baseline · CI eval gate · 3-config ablation · live on Render",
      description:
        "Production RAG pipeline over Snowflake and dbt documentation. Dense retrieval (BGE-large, Qdrant) fused with BM25 via RRF (k=60); BGE cross-encoder reranker; Claude Haiku query rewriter; answers grounded with cited source chunks. 50-question adversarial benchmark across 4 tiers; CI eval gate fails the build on faithfulness regression; all retrievals traced in Langfuse.",
      tech: ["BGE-large", "BM25/RRF", "Qdrant", "RAGAS", "Claude Sonnet", "Langfuse", "GitHub Actions", "Docker"],
      link: "https://github.com/amitabh1609/Evaluated_Rag_Snowflake_DBT",
      demo: "https://evaluated-rag-snowflake-dbt.onrender.com",
    },
    {
      name: "GitHub Archive Lakehouse",
      type: "Data Engineering",
      metrics: "▸ 7.4M+ events ingested · 36 Soda Core quality checks · time-travel on a 3.8M-row table",
      description:
        "Bronze/Silver/Gold Iceberg lakehouse ingesting 7.4M+ GitHub Archive events. Manifest-tracked, crash-resumable pipeline; Silver deduplicates by event ID, parses 15 event-type payloads, and routes ~600 malformed rows to quarantine with error reasons. 36 Soda Core checks gate each Dagster run; CI fails on >3 check failures; Software-Defined Assets provide full lineage; 5 documented failure scenarios with exact recovery commands.",
      tech: ["Apache Iceberg", "DuckDB", "Dagster", "Soda Core", "MinIO", "Streamlit", "Docker"],
      link: "https://github.com/amitabh1609/AfterV1",
    },
  ],

  skills: [
    {
      category: "AI / GenAI",
      items: ["LLM application development", "RAG", "Prompt engineering", "Hallucination detection", "Embeddings & semantic search", "Qdrant", "BM25 / RRF hybrid search", "Evals · RAGAS", "Langfuse", "Claude Sonnet API", "sentence-transformers (BGE)"],
    },
    {
      category: "ML / MLOps",
      items: ["LightGBM (LambdaMART, Quantile)", "MLflow", "Evidently AI", "scikit-learn", "KS-test · PSI · quantile regression", "Time-series forecasting", "FastAPI"],
    },
    {
      category: "Data Engineering",
      items: ["Snowflake (Cortex, Dynamic Tables, Tasks, Streams)", "dbt (SCD-2, snapshots, tests)", "ETL/ELT & orchestration", "Data modeling", "Apache Iceberg", "DuckDB", "Dagster", "Soda Core", "SnapLogic", "Tidal"],
    },
    { category: "Languages", items: ["Python", "SQL", "C++"] },
    { category: "Analytics & BI", items: ["Pandas", "Power BI"] },
    { category: "Infra & Dev", items: ["Docker", "GitHub Actions CI/CD", "Git", "PostgreSQL 15"] },
  ],

  achievements: [
    { icon: "🏆", title: "LeetCode Knight", desc: "Max rating 1923 · global rank 283/29,865 in Weekly Contest 366 (top 1%)" },
    { icon: "⚡", title: "Codeforces Expert", desc: "Max rating 1800 · @amitabh1208" },
    { icon: "⭐", title: "CodeChef 4★", desc: "Max rating 1711 · @amitabh1208" },
    { icon: "🥇", title: "Centurion Hackathon", desc: "Team Lead · 13th of 500+ participants (National Level)" },
  ],

  education: {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    school: "M.S. Ramaiah University of Applied Sciences, Bengaluru",
    meta: "2020 — Apr 2024 · CGPA 8.55/10",
  },

  roles: ["Data Engineer", "Analytics Engineer", "AI / Data Engineer", "ML Engineer (data-infra)"],
  locations: ["Bengaluru", "Singapore", "Dubai", "Switzerland", "Remote"],
};

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
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

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal${inView ? " in" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function Section({ id, num, title, children }) {
  return (
    <section id={id} className="section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">{num}</span>
          <h2 className="section-title">{title}</h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function StatCounter({ value, suffix, label, decimals, active }) {
  const count = useCountUp(value, decimals, active);
  return (
    <div>
      <div className="stat-num">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -400, y: -400 });
  const [showTop, setShowTop] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);

  /* spotlight follows mouse */
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* active section tracking */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* scroll-to-top visibility */
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* stats count-up trigger */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Mouse spotlight */}
      <div
        className="spotlight"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,180,84,0.055), transparent 75%)`,
        }}
      />

      <div className="layout">
        {/* ══ SIDEBAR ══ */}
        <aside className="sidebar">
          <div>
            <div className="status-badge">
              <span className="status-dot" />
              Open to new roles
            </div>

            <h1 className="hero-name">
              Amitabh<br /><span className="accent">Choudhury</span>
            </h1>
            <p className="hero-role">
              {data.role} <span>@ {data.company}</span>
            </p>
            <p className="hero-tagline">{data.tagline}</p>

            <a className="resume-btn" href="/resume.pdf" download target="_blank" rel="noreferrer">
              Resume ↓
            </a>

            <nav className="side-nav" aria-label="Section navigation">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={activeSection === s.id ? "active" : ""}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="side-foot">
            <div className="side-snippet">
              <div><span className="k">shipped</span>: <span className="v">&quot;LLM anomaly platform @ Caterpillar&quot;</span></div>
              <div><span className="k">stack</span>: <span className="v">&quot;Snowflake · dbt · Cortex · RAG&quot;</span></div>
              <div><span className="k">open_to_work</span>: <span className="v">true</span></div>
            </div>
            <div className="social-row">
              <a href={data.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={data.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              <a href={data.gfg} target="_blank" rel="noreferrer">GFG</a>
              <a href={`mailto:${data.email}`}>Email</a>
            </div>
          </div>
        </aside>

        {/* ══ CONTENT ══ */}
        <main className="content">
          {/* ── ABOUT ── */}
          <Section id="about" num="01" title="About">
            <Reveal delay={0.05}>
              <div className="about-copy">
                {data.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="pull-quote">{data.pullQuote}</div>
              <div className="fact-grid">
                {data.facts.map((f) => (
                  <div className="fact-item" key={f.label}>
                    <div className="fact-label">{f.label}</div>
                    <div className="fact-value">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="stats-row" ref={statsRef}>
                {data.stats.map((s) => (
                  <StatCounter key={s.label} {...s} active={statsActive} />
                ))}
              </div>
            </Reveal>
          </Section>

          {/* ── EXPERIENCE ── */}
          <Section id="experience" num="02" title="Experience">
            {data.experience.map((exp, i) => (
              <Reveal key={exp.role} delay={i * 0.08}>
                <div className="exp-item">
                  <div className="exp-date">
                    {exp.current && <span className="live" />}
                    {exp.date}
                  </div>
                  <div>
                    <h3 className="exp-role">
                      {exp.role} <span className="exp-company">· {exp.company}</span>
                    </h3>
                    {exp.note && <div className="exp-note">{exp.note}</div>}
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </Section>

          {/* ── PROJECTS ── */}
          <Section id="projects" num="03" title="Projects">
            {data.projects.map((proj, i) => (
              <Reveal key={proj.name} delay={Math.min(i * 0.07, 0.3)}>
                <article className="proj-card">
                  <div className="proj-top">
                    <h3 className="proj-title">{proj.name}</h3>
                    <span className="proj-type">{proj.type}</span>
                  </div>
                  <div className="proj-metrics">{proj.metrics}</div>
                  <p className="proj-desc">{proj.description}</p>
                  <div className="proj-tech">
                    {proj.tech.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <div className="proj-links">
                    {proj.demo && (
                      <a className="proj-link-primary" href={proj.demo} target="_blank" rel="noreferrer">
                        Live Demo →
                      </a>
                    )}
                    <a className="proj-link-ghost" href={proj.link} target="_blank" rel="noreferrer">
                      View Code →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </Section>

          {/* ── SKILLS ── */}
          <Section id="skills" num="04" title="Skills">
            {data.skills.map((group, i) => (
              <Reveal key={group.category} delay={Math.min(i * 0.05, 0.25)}>
                <div className="skill-group">
                  <div className="skill-group-label">{group.category}</div>
                  <div className="skill-chips">
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </Section>

          {/* ── ACHIEVEMENTS ── */}
          <Section id="achievements" num="05" title="Achievements">
            <div className="ach-grid">
              {data.achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.07}>
                  <div className="ach-card">
                    <span className="ach-icon">{a.icon}</span>
                    <div>
                      <div className="ach-title">{a.title}</div>
                      <div className="ach-desc">{a.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <div className="edu-block">
                <div>
                  <div className="edu-degree">{data.education.degree}</div>
                  <div className="edu-school">{data.education.school}</div>
                </div>
                <div className="edu-meta">{data.education.meta}</div>
              </div>
            </Reveal>
          </Section>

          {/* ── CONTACT ── */}
          <Section id="contact" num="06" title="Get in touch">
            <Reveal delay={0.05}>
              <p className="contact-lede">
                I&apos;m open to full-time roles in Data Engineering, Analytics Engineering, and
                ML Engineering. If you&apos;re working on something interesting in data
                infrastructure, GenAI evaluation, or applied ML, I&apos;d love to hear about it.
              </p>
              <a className="contact-email" href={`mailto:${data.email}`}>{data.email}</a>
              <div className="contact-buttons">
                <button className="btn-solid" onClick={copyEmail}>
                  {copied ? "✓ Copied!" : "Copy Email"}
                </button>
                <a
                  className="btn-outline"
                  href={`https://mail.google.com/mail/?view=cm&to=${data.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send Email →
                </a>
              </div>
              <div className="roles-label">Open to roles</div>
              <div className="roles-chips">
                {data.roles.map((r) => <span key={r}>{r}</span>)}
              </div>
              <div className="roles-label">Locations</div>
              <div className="loc-chips">
                {data.locations.map((l) => <span key={l}>{l}</span>)}
              </div>
            </Reveal>
          </Section>

          {/* ── FOOTER ── */}
          <footer className="footer">
            <span className="name">Amitabh Choudhury</span>
            <span>·</span>
            <span>Built with React + Vite</span>
            <span>·</span>
            <span>{new Date().getFullYear()}</span>
          </footer>
        </main>
      </div>

      {/* ── SCROLL TO TOP ── */}
      <button
        className={`scroll-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >↑</button>
    </div>
  );
}
