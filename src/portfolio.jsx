import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const data = {
  name: "Amitabh Choudhury",
  title: "Software Engineer",
  tagline: "iOS Developer · ML Engineer · Web Developer",
  bio: "I'm a Data Engineer at Caterpillar, where I spend my days building production ETL pipelines, designing dashboards, and training machine learning models that actually get used by real teams. I graduated with a B.Tech in AI & ML from M.S Ramaiah University with a CGPA of 8.55, and somewhere along the way picked up a deep interest in the full data stack — from moving millions of rows cleanly into Snowflake to building forecasting models that help teams make smarter decisions. Outside of work, I had the chance to apply deep learning to real medical imaging research under a government-funded study in Karnataka, which is probably the project I'm most proud of. I'm always thinking about where data engineering and machine learning overlap, and I genuinely enjoy the problem-solving that lives at that intersection.",
  email: "choudhryamitabh@gmail.com",
  github: "https://github.com/amitabh1609",
  linkedin: "https://www.linkedin.com/in/amitabh-choudhury/",
  leetcode: "https://leetcode.com/amitabhchoudhury19999/",
  gfg: "https://auth.geeksforgeeks.org/user/amitabhchoudhury19999",
  skills: [
    { name: "SnapLogic",      icon: "https://www.snaplogic.com/media-kit/Logocombo_SnapLogic_RGB.svg",                          category: "Data Engineering",              isImg: true  },
    { name: "Apache Spark",   icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg",                     category: "Data Engineering",              isImg: true  },
    { name: "Apache Airflow", icon: "https://www.vectorlogo.zone/logos/apache_airflow/apache_airflow-icon.svg",                 category: "Data Engineering",              isImg: true  },
    { name: "Apache Kafka",   icon: "https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg",                     category: "Data Engineering",              isImg: true  },
    { name: "dbt",            icon: "https://www.vectorlogo.zone/logos/getdbt/getdbt-icon.svg",                                 category: "Data Engineering",              isImg: true  },
    { name: "Tidal",          icon: "⏱️",                                                                                        category: "Data Engineering",              isImg: false },
    { name: "ETL Pipelines",  icon: "⚙️",                                                                                        category: "Data Engineering",              isImg: false },
    { name: "Snowflake",      icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg",                           category: "Databases & Warehousing",       isImg: true  },
    { name: "MySQL",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",              category: "Databases & Warehousing",       isImg: true  },
    { name: "PostgreSQL",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",    category: "Databases & Warehousing",       isImg: true  },
    { name: "Scikit-learn",   icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",          category: "Machine Learning",              isImg: true  },
    { name: "TensorFlow",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",    category: "Machine Learning",              isImg: true  },
    { name: "Keras",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",              category: "Machine Learning",              isImg: true  },
    { name: "MLflow",         icon: "🔁",                                                                                        category: "Machine Learning",              isImg: false },
    { name: "Pandas",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",            category: "Data Analysis & Visualization", isImg: true  },
    { name: "NumPy",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",              category: "Data Analysis & Visualization", isImg: true  },
    { name: "Power BI",       icon: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg",           category: "Data Analysis & Visualization", isImg: true  },
    { name: "Matplotlib",     icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",                  category: "Data Analysis & Visualization", isImg: true  },
    { name: "Python",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",            category: "Languages",                     isImg: true  },
    { name: "SQL",            icon: "💾",                                                                                        category: "Languages",                     isImg: false },
    { name: "C++",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",      category: "Languages",                     isImg: true  },
    { name: "Docker",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",            category: "Tools & Platforms",             isImg: true  },
    { name: "Git",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                  category: "Tools & Platforms",             isImg: true  },
    { name: "Jupyter",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",          category: "Tools & Platforms",             isImg: true  },
    { name: "Dataiku",        icon: "🎯",                                                                                        category: "Tools & Platforms",             isImg: false },
  ],
  projects: [
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
    {
      name: "Kryptoverse",
      type: "Crypto Dashboard",
      description: "A comprehensive cryptocurrency tracking dashboard with live prices, market cap data, historical charts, and curated crypto news.",
      tech: ["React", "Redux", "CoinGecko API", "Chart.js"],
      color: "#48CAE4",
      emoji: "₿",
      link: "https://github.com/amitabh1609/Kryptoverse",
    },
    {
      name: "Chatify",
      type: "MERN Social Media",
      description: "A full-stack social media platform built on the MERN stack. Supports real-time messaging, post feeds, user profiles, and follow/unfollow mechanics.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
      color: "#E63946",
      emoji: "💬",
      link: "https://github.com/amitabh1609/Chatify",
    },
    {
      name: "GoFunds",
      type: "Web3 DApp",
      description: "A decentralized crowdfunding platform on the blockchain. Smart contracts handle fund management transparently without intermediaries.",
      tech: ["Solidity", "Ethereum", "Web3.js", "React"],
      color: "#48CAE4",
      emoji: "🌐",
      link: "https://github.com/amitabh1609/GoFund",
    },
    {
      name: "Stockers",
      type: "Web App",
      description: "A stock research platform helping investors make informed decisions. Aggregates real-time data, news sentiment, and technical indicators in a clean dashboard.",
      tech: ["React", "GraphQL", "Node.js", "REST APIs"],
      color: "#264653",
      emoji: "📈",
      link: "https://github.com/amitabh1609/Stockers",
    },
    {
      name: "Notebook",
      type: "iOS App",
      description: "A beautifully crafted iOS note-taking application built with Swift. Features rich text editing, iCloud sync, and an intuitive gesture-based UI designed for speed and focus.",
      tech: ["Swift", "SwiftUI", "CoreData", "iCloud"],
      color: "#F4A261",
      emoji: "📓",
      link: "https://github.com/amitabh1609/NoteBook",
    },
  ],
  experience: [
    {
      start: "Mar 2024",
      end: "Present",
      current: true,
      role: "Data Engineer",
      company: "Caterpillar",
      desc: "Building and maintaining 40+ production ETL pipelines, developing ML-based forecasting models, and designing Power BI dashboards to support warehouse and supply chain operations.",
    },
    {
      start: "Jun 2023",
      end: "Nov 2023",
      current: false,
      role: "Research Intern",
      company: "Vision Group on Science and Technology, Govt. of Karnataka",
      desc: "Developed a deep learning system under Dr. Divya B.S. and Dr. Roopa S. Rao to diagnose jaw lesions from whole slide histopathology images, achieving 88% accuracy on real clinical data.",
    },
    {
      start: "Jan 2023",
      end: "Jun 2023",
      current: false,
      role: "Software Engineer Intern",
      company: "Caterpillar",
      desc: "Built a data drift detection system that reduced false positives by 30%, and managed production data workflows using Tidal and Snowflake.",
    },
  ],
  stats: [
    { value: 40,   suffix: "+",  label: "ETL Pipelines",    decimals: 0 },
    { value: 1923, suffix: "",   label: "LeetCode Rating",  decimals: 0 },
    { value: 8.55, suffix: "",   label: "CGPA",             decimals: 2 },
    { value: 88,   suffix: "%",  label: "Model Accuracy",   decimals: 0 },
  ],
};

const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

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
        <div style={{ color: "#e2e8f8", paddingLeft: "1rem", marginBottom: "0.25rem" }}>Amitabh Choudhury</div>

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
    background: "#04060f",
    minHeight: "100vh",
    width: "100%",
    color: "#e2e8f8",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    position: "relative",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: "rgba(4,6,15,0.88)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0,255,200,0.08)",
    padding: "0 2.5rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 64,
  },
  navLogo: {
    fontFamily: "'Georgia', serif", fontStyle: "italic",
    fontSize: "1.15rem", color: "#00ffc8", letterSpacing: "-0.02em",
    textDecoration: "none",
  },
  section: {
    maxWidth: 1100, margin: "0 auto", padding: "100px 2.5rem",
  },
  sectionLabel: {
    fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase",
    color: "#00ffc8", marginBottom: "0.9rem",
  },
  sectionTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 400, lineHeight: 1.1,
    marginBottom: "1.25rem",
    color: "#e2e8f8",
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

  /* mouse glow */
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
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

      {/* Cursor glow */}
      <div style={{
        position: "fixed", width: 650, height: 650, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,200,0.045) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        left: mousePos.x - 325, top: mousePos.y - 325,
        transition: "left 0.1s, top 0.1s",
      }} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(0,255,200,0.018) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,255,200,0.018) 1px, transparent 1px)`,
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
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 400, lineHeight: 0.95,
                  marginBottom: "1.5rem", color: "#e2e8f8", letterSpacing: "-0.02em",
                }}>
                  I&apos;m Amitabh<br />
                  <span style={{ color: "#00ffc8", fontStyle: "italic" }}>Choudhury</span>
                </h1>
              </AnimSection>

              <AnimSection delay={0.2}>
                <p style={{ color: "#8896b3", fontSize: "0.88rem", marginBottom: "2.5rem", letterSpacing: "0.04em", lineHeight: 1.9, maxWidth: 480 }}>
                  Data Engineer · Machine Learning Engineer · Competitive Programmer<br />
                  Python &nbsp;·&nbsp; SQL &nbsp;·&nbsp; Snowflake &nbsp;·&nbsp; SnapLogic &nbsp;·&nbsp; TensorFlow &nbsp;·&nbsp; Power BI
                </p>
              </AnimSection>

              <AnimSection delay={0.3}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button onClick={() => scrollTo("projects")} style={{
                    background: "#00ffc8", color: "#04060f",
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
                    color: "#e2e8f8", padding: "12px 28px", borderRadius: 4,
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
                      color: "#8896b3", textDecoration: "none", fontSize: "0.73rem",
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
              <p style={{ color: "#a0aec0", lineHeight: 2, fontSize: "0.88rem" }}>{data.bio}</p>
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
                    <span style={{ color: "#8896b3", fontSize: "0.83rem" }}>{item.val}</span>
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
                      <div style={{ fontSize: "0.83rem", color: "#e2e8f8", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8896b3", lineHeight: 1.65 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
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
                  color: filterCat === cat ? "#04060f" : "#8896b3",
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
                  <span style={{ fontSize: "0.78rem", color: "#e2e8f8", letterSpacing: "0.03em", textAlign: "center" }}>{skill.name}</span>
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
                    <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", color: "#e2e8f8", marginBottom: "0.6rem" }}>{proj.name}</h3>
                    <p style={{ color: "#8896b3", fontSize: "0.78rem", lineHeight: 1.75, marginBottom: "1.25rem", flex: 1 }}>{proj.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                      {proj.tech.map(t => (
                        <span key={t} style={{
                          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a0aec0", padding: "2px 8px", borderRadius: 3, fontSize: "0.68rem",
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
                    position: "absolute", left: -34, top: 8,
                    width: item.current ? 12 : 10, height: item.current ? 12 : 10,
                    borderRadius: "50%",
                    background: item.current ? "#00ffc8" : "rgba(0,255,200,0.4)",
                    boxShadow: item.current ? "0 0 14px rgba(0,255,200,0.7)" : "none",
                    border: item.current ? "none" : "1px solid rgba(0,255,200,0.5)",
                  }} />
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.15rem", color: "#e2e8f8", marginBottom: "0.2rem" }}>{item.role}</h3>
                      <span style={{ color: "#8896b3", fontSize: "0.8rem" }}>@ {item.company}</span>
                    </div>
                    <span className={`exp-date-badge${item.current ? " current" : ""}`}>
                      {item.current && <span className="exp-dot-live" />}
                      {item.start} — {item.end}
                    </span>
                  </div>
                  <p style={{ color: "#8896b3", fontSize: "0.82rem", lineHeight: 1.75 }}>{item.desc}</p>
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
            <p style={{ color: "#8896b3", fontSize: "0.88rem", lineHeight: 1.85, maxWidth: 460, margin: "0 auto 2.5rem" }}>
              I&apos;m currently open to full-time roles in Data Engineering and ML Engineering. If you&apos;re working on something interesting in data infrastructure, forecasting, or applied ML, I&apos;d love to hear about it.
            </p>
          </AnimSection>

          {/* Email display */}
          <AnimSection delay={0.1}>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.68rem", color: "#4a5568", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>reach me at</div>
              <a href={`https://mail.google.com/mail/?view=cm&to=${data.email}`} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Georgia', serif", fontStyle: "italic",
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
                background: "#00ffc8", color: "#04060f",
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
                color: "#e2e8f8", padding: "13px 32px", borderRadius: 4,
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
                  <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#00ffc8" }}>{s.icon}</span>
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
        <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#4a5568" }}>Amitabh Choudhury</span>
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

    </div>
  );
}
