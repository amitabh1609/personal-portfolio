import { useState, useEffect, useRef } from "react";

const data = {
  name: "Amitabh Choudhury",
  title: "Software Engineer",
  tagline: "iOS Developer · ML Engineer · Web Developer",
  bio: "I'm a Data Engineer at Caterpillar, where I spend my days building production ETL pipelines, designing dashboards, and training machine learning models that actually get used by real teams. I graduated with a B.Tech in AI & ML from M.S Ramaiah University with a CGPA of 8.55, and somewhere along the way picked up a deep interest in the full data stack, from moving millions of rows cleanly into Snowflake to building forecasting models that help teams make smarter decisions. Outside of work, I had the chance to apply deep learning to real medical imaging research under a government-funded study in Karnataka, which is probably the project I'm most proud of. I'm always thinking about where data engineering and machine learning overlap, and I genuinely enjoy the problem-solving that lives at that intersection.",
  email: "choudhryamitabh@gmail.com",
  github: "https://github.com/amitabh1609",
  linkedin: "https://www.linkedin.com/in/amitabh-choudhury/",
  leetcode: "https://leetcode.com/amitabhchoudhury19999/",
  gfg: "https://auth.geeksforgeeks.org/user/amitabhchoudhury19999",
  skills: [
    { name: "SnapLogic", icon: "https://www.snaplogic.com/media-kit/Logocombo_SnapLogic_RGB.svg", category: "Data Engineering", isImg: true },
    { name: "Apache Spark", icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg", category: "Data Engineering", isImg: true },
    { name: "Apache Airflow", icon: "https://www.vectorlogo.zone/logos/apache_airflow/apache_airflow-icon.svg", category: "Data Engineering", isImg: true },
    { name: "Apache Kafka", icon: "https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg", category: "Data Engineering", isImg: true },
    { name: "dbt", icon: "https://www.vectorlogo.zone/logos/getdbt/getdbt-icon.svg", category: "Data Engineering", isImg: true },
    { name: "Tidal", icon: "\u23f1\ufe0f", category: "Data Engineering", isImg: false },
    { name: "ETL Pipelines", icon: "\u2699\ufe0f", category: "Data Engineering", isImg: false },
    { name: "Snowflake", icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg", category: "Databases & Warehousing", isImg: true },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Databases & Warehousing", isImg: true },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Databases & Warehousing", isImg: true },
    { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", category: "Machine Learning", isImg: true },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "Machine Learning", isImg: true },
    { name: "Keras", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg", category: "Machine Learning", isImg: true },
    { name: "MLflow", icon: "\ud83d\udd01", category: "Machine Learning", isImg: false },
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "Data Analysis & Visualization", isImg: true },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Data Analysis & Visualization", isImg: true },
    { name: "Power BI", icon: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg", category: "Data Analysis & Visualization", isImg: true },
    { name: "Matplotlib", icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg", category: "Data Analysis & Visualization", isImg: true },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages", isImg: true },
    { name: "SQL", icon: "\ud83d\udcbe", category: "Languages", isImg: false },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages", isImg: true },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools & Platforms", isImg: true },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools & Platforms", isImg: true },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", category: "Tools & Platforms", isImg: true },
    { name: "Dataiku", icon: "\ud83c\udfaf", category: "Tools & Platforms", isImg: false },
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
      color: "#1B2A4A",
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
      year: "2024",
      role: "Data Engineer",
      company: "Caterpillar",
      desc: "Building and maintaining 40+ production ETL pipelines, developing ML-based forecasting models, and designing Power BI dashboards to support warehouse and supply chain operations.",
    },
    {
      year: "2024",
      role: "Research Intern",
      company: "Vision Group on Science and Technology, Govt. of Karnataka",
      desc: "Developed a deep learning system under Dr. Divya B.S. and Dr. Roopa S. Rao to diagnose jaw lesions from whole slide histopathology images, achieving 88% accuracy on real clinical data.",
    },
    {
      year: "2023",
      role: "Software Engineer Intern",
      company: "Caterpillar",
      desc: "Built a data drift detection system that reduced false positives by 30%, and managed production data workflows using Tidal and Snowflake.",
    },
  ],
};

const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

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

function AnimSection({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.4 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ["All", ...Array.from(new Set(data.skills.map(s => s.category)))];
  const filteredSkills = filterCat === "All" ? data.skills : data.skills.filter(s => s.category === filterCat);

  const styles = {
    page: {
      background: "#04060f",
      minHeight: "100vh",
      width: "100%",
      color: "#e2e8f8",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      position: "relative",
      overflowX: "hidden",
    },
    glow: {
      position: "fixed",
      width: 600, height: 600,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0,255,200,0.04) 0%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 1,
      left: mousePos.x - 300,
      top: mousePos.y - 300,
      transition: "left 0.1s, top 0.1s",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(4,6,15,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,255,200,0.08)",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
      pointerEvents: "all",
    },
    navLogo: {
      fontFamily: "'Georgia', serif", fontStyle: "italic",
      fontSize: "1.2rem", color: "#00ffc8", letterSpacing: "-0.02em",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex", gap: "2rem", listStyle: "none", alignItems: "center",
    },
    section: {
      maxWidth: 1100, margin: "0 auto", padding: "100px 2rem",
    },
    tag: (color = "#00ffc8") => ({
      display: "inline-block",
      background: `${color}18`,
      border: `1px solid ${color}40`,
      color: color,
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: "0.7rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }),
    sectionLabel: {
      fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
      color: "#00ffc8", marginBottom: "1rem",
    },
    sectionTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      fontWeight: 400, lineHeight: 1.1,
      marginBottom: "1.5rem",
      color: "#e2e8f8",
    },
    divider: {
      width: 48, height: 2,
      background: "linear-gradient(90deg, #00ffc8, transparent)",
      marginBottom: "3rem",
    },
  };

  return (
    <div style={styles.page}>
      {/* Animated glow follow cursor */}
      <div style={styles.glow} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(0,255,200,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.02) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* NAV */}
      <nav style={styles.nav}>
        <a href="#home" style={styles.navLogo}>Amitabh Choudhury</a>
        <ul style={{ ...styles.navLinks, display: menuOpen ? "none" : "flex" }}>
          {NAV_ITEMS.map(item => (
            <li key={item} style={{ listStyle: "none" }}>
              <button
                onClick={() => {
                  const el = document.getElementById(item.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeNav === item ? "#00ffc8" : "#8896b3",
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  transition: "color 0.2s",
                  borderBottom: activeNav === item ? "1px solid #00ffc8" : "1px solid transparent",
                  paddingBottom: 2, fontFamily: "'DM Mono', monospace",
                }}
                onMouseEnter={e => e.target.style.color = "#00ffc8"}
                onMouseLeave={e => e.target.style.color = activeNav === item ? "#00ffc8" : "#8896b3"}
              >{item}</button>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" download target="_blank" rel="noreferrer" style={{
              background: "transparent",
              border: "1px solid #00ffc8",
              color: "#00ffc8", padding: "6px 16px",
              borderRadius: 4, fontSize: "0.75rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s",
              cursor: "pointer", display: "inline-block",
              zIndex: 1001, position: "relative",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,255,200,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Resume ↓</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ ...styles.section, paddingTop: 120 }}>
          <AnimSection delay={0}>
            <div style={styles.sectionLabel}>Available for opportunities</div>
          </AnimSection>
          <AnimSection delay={0.1}>
            <h1 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 400, lineHeight: 0.95,
              marginBottom: "1.5rem",
              color: "#e2e8f8",
              letterSpacing: "-0.02em",
            }}>
              I'm Amitabh<br />
              <span style={{ color: "#00ffc8", fontStyle: "italic" }}>Choudhury</span>
            </h1>
          </AnimSection>
          <AnimSection delay={0.2}>
            <p style={{ color: "#8896b3", fontSize: "0.9rem", marginBottom: "2.5rem", letterSpacing: "0.05em", lineHeight: 1.8 }}>
              Data Engineer &nbsp;·&nbsp; Machine Learning Engineer &nbsp;·&nbsp; Competitive Programmer<br />
              Proficient in Python, SQL, Snowflake, SnapLogic, scikit-learn, TensorFlow, Power BI
            </p>
          </AnimSection>
          <AnimSection delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })} style={{
                background: "#00ffc8", color: "#04060f",
                padding: "12px 28px", borderRadius: 4,
                border: "none", cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.1em", textTransform: "uppercase",
                fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,255,200,0.3)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >View Projects →</button>
              <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f8", padding: "12px 28px", borderRadius: 4,
                cursor: "pointer", fontSize: "0.8rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              >Contact Me</button>
            </div>
          </AnimSection>

          {/* Social links */}
          <AnimSection delay={0.4}>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "4rem", alignItems: "center", flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: data.github },
                { label: "LinkedIn", href: data.linkedin },
                { label: "LeetCode", href: data.leetcode },
                { label: "GFG", href: data.gfg },
                { label: "Email", href: `https://mail.google.com/mail/?view=cm&to=${data.email}` },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                  color: "#8896b3", textDecoration: "none", fontSize: "0.75rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  transition: "color 0.2s",
                  borderBottom: "1px solid rgba(136,150,179,0.3)", paddingBottom: 2,
                }}
                  onMouseEnter={e => e.target.style.color = "#00ffc8"}
                  onMouseLeave={e => e.target.style.color = "#8896b3"}
                >{s.label}</a>
              ))}
            </div>
          </AnimSection>
        </div>


      </section>

      {/* ABOUT */}
      <section id="about" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={styles.section}>
          <AnimSection>
            <div style={styles.sectionLabel}>Who I am</div>
            <h2 style={styles.sectionTitle}>About Me</h2>
            <div style={styles.divider} />
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <AnimSection delay={0.1}>
              <p style={{ color: "#a0aec0", lineHeight: 2, fontSize: "0.9rem" }}>{data.bio}</p>
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "Role", val: "Data Engineer @ Caterpillar" },
                  { label: "Degree", val: "B.Tech AI & ML — M.S Ramaiah University" },
                  { label: "CGPA", val: "8.55" },
                  { label: "LeetCode", val: "Rating 1923" },
                  { label: "Focus", val: "Data Engineering · ML · Research" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                    <span style={{ color: "#00ffc8", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", minWidth: 80 }}>{item.label}</span>
                    <span style={{ color: "#8896b3", fontSize: "0.85rem" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection delay={0.2}>
              <div style={{
                background: "linear-gradient(135deg, rgba(0,255,200,0.05), rgba(123,97,255,0.05))",
                border: "1px solid rgba(0,255,200,0.1)",
                borderRadius: 12, padding: "2rem",
              }}>
                <div style={{ fontSize: "0.7rem", color: "#00ffc8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>// What drives me</div>
                {[
                  { emoji: "🗄️", title: "Data Engineering", desc: "Building production ETL pipelines and data platforms that scale to millions of rows." },
                  { emoji: "🧠", title: "Machine Learning", desc: "Forecasting models, deep learning for medical imaging, and ML that actually ships." },
                  { emoji: "📊", title: "Analytics & BI", desc: "Designing dashboards in Power BI that turn raw supply chain data into clear decisions." },
                  { emoji: "⚡", title: "Competitive Programming", desc: "LeetCode rating 1923 — obsessed with elegant algorithms and clean problem-solving." },
                ].map(item => (
                  <div key={item.title} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", marginTop: 2 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: "0.85rem", color: "#e2e8f8", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8896b3", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1 }}>
        <div style={styles.section}>
          <AnimSection>
            <div style={styles.sectionLabel}>What I know</div>
            <h2 style={styles.sectionTitle}>Skills & Technologies</h2>
            <div style={styles.divider} />
          </AnimSection>

          {/* Filter */}
          <AnimSection delay={0.1}>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)} style={{
                  background: filterCat === cat ? "#00ffc8" : "transparent",
                  border: `1px solid ${filterCat === cat ? "#00ffc8" : "rgba(255,255,255,0.1)"}`,
                  color: filterCat === cat ? "#04060f" : "#8896b3",
                  padding: "6px 16px", borderRadius: 4, cursor: "pointer",
                  fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace", transition: "all 0.2s",
                }}>{cat}</button>
              ))}
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
            {filteredSkills.map((skill, i) => (
              <AnimSection key={skill.name} delay={i * 0.05}>
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8, padding: "1.25rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  cursor: "default", transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,255,200,0.05)";
                    e.currentTarget.style.borderColor = "rgba(0,255,200,0.3)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {skill.isImg
                    ? <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{ width: 40, height: 40, objectFit: "contain" }}
                        onError={e => { e.target.replaceWith(Object.assign(document.createElement("span"), { textContent: "🔷", style: "font-size:2rem" })); }}
                      />
                    : <span style={{ fontSize: "1.8rem" }}>{skill.icon}</span>
                  }
                  <span style={{ fontSize: "0.8rem", color: "#e2e8f8", letterSpacing: "0.04em" }}>{skill.name}</span>
                  <span style={styles.tag()}>{skill.category}</span>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={styles.section}>
          <AnimSection>
            <div style={styles.sectionLabel}>What I've built</div>
            <h2 style={styles.sectionTitle}>Projects</h2>
            <div style={styles.divider} />
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {data.projects.map((proj, i) => (
              <AnimSection key={proj.name} delay={i * 0.08}>
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, overflow: "hidden",
                  transition: "all 0.3s", cursor: "default",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${proj.color}60`;
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = `0 20px 60px ${proj.color}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Card header */}
                  <div style={{
                    background: `linear-gradient(135deg, ${proj.color}30, ${proj.color}10)`,
                    padding: "2rem", display: "flex", alignItems: "center",
                    justifyContent: "space-between", borderBottom: `1px solid ${proj.color}20`,
                  }}>
                    <div style={{ fontSize: "2.5rem" }}>{proj.emoji}</div>
                    <span style={styles.tag(proj.color === "#48CAE4" ? "#48CAE4" : "#00ffc8")}>{proj.type}</span>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.3rem", color: "#e2e8f8", marginBottom: "0.75rem" }}>{proj.name}</h3>
                    <p style={{ color: "#8896b3", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{proj.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {proj.tech.map(t => (
                        <span key={t} style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a0aec0", padding: "3px 8px",
                          borderRadius: 3, fontSize: "0.7rem",
                        }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
                      <a href={proj.link} target="_blank" rel="noreferrer" style={{
                        color: "#00ffc8", fontSize: "0.75rem", textDecoration: "none",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        borderBottom: "1px solid rgba(0,255,200,0.3)", paddingBottom: 1,
                      }}>Code →</a>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ position: "relative", zIndex: 1 }}>
        <div style={styles.section}>
          <AnimSection>
            <div style={styles.sectionLabel}>My journey</div>
            <h2 style={styles.sectionTitle}>Experience</h2>
            <div style={styles.divider} />
          </AnimSection>
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute", left: 0, top: 8, bottom: 0,
              width: 1, background: "linear-gradient(to bottom, #00ffc8, rgba(0,255,200,0.1))",
            }} />
            {data.experience.map((item, i) => (
              <AnimSection key={i} delay={i * 0.1}>
                <div style={{ position: "relative", marginBottom: "3rem" }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: -34, top: 6,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#00ffc8",
                    boxShadow: "0 0 12px rgba(0,255,200,0.6)",
                  }} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ color: "#00ffc8", fontSize: "0.8rem", letterSpacing: "0.1em" }}>{item.year}</span>
                    <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", color: "#e2e8f8" }}>{item.role}</h3>
                    <span style={{ color: "#8896b3", fontSize: "0.8rem" }}>@ {item.company}</span>
                  </div>
                  <p style={{ color: "#8896b3", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ ...styles.section, textAlign: "center" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>Get in touch</div>
            <h2 style={{ ...styles.sectionTitle, maxWidth: 600, margin: "0 auto 1.5rem" }}>
              Open to the <span style={{ fontStyle: "italic", color: "#00ffc8" }}>right opportunity</span>
            </h2>
            <div style={{ ...styles.divider, margin: "0 auto 2rem" }} />
            <p style={{ color: "#8896b3", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 3rem" }}>
              I'm currently open to full-time roles in Data Engineering and ML Engineering. If you're working on something interesting in data infrastructure, forecasting, or applied ML, I'd love to hear about it. No pitch needed, just a conversation.
            </p>
          </AnimSection>
          <AnimSection delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <button onClick={copyEmail} style={{
                background: "#00ffc8", color: "#04060f",
                border: "none", padding: "14px 32px", borderRadius: 4,
                fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.target.style.boxShadow = "0 8px 30px rgba(0,255,200,0.3)"}
                onMouseLeave={e => e.target.style.boxShadow = ""}
              >
                {copied ? "✓ Copied!" : "Copy Email"}
              </button>
              <a href={`https://mail.google.com/mail/?view=cm&to=${data.email}`} target="_blank" rel="noreferrer" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f8", padding: "14px 32px", borderRadius: 4,
                fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              >Send Email →</a>
              <a href={data.linkedin} target="_blank" rel="noreferrer" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f8", padding: "14px 32px", borderRadius: 4,
                fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              >LinkedIn →</a>
              <a href={data.github} target="_blank" rel="noreferrer" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f8", padding: "14px 32px", borderRadius: 4,
                fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              >GitHub →</a>
              <a href={data.leetcode} target="_blank" rel="noreferrer" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f8", padding: "14px 32px", borderRadius: 4,
                fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = "#00ffc8"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              >LeetCode →</a>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "2rem", textAlign: "center",
        color: "#4a5568", fontSize: "0.75rem",
        letterSpacing: "0.08em", position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#8896b3" }}>Amitabh Choudhury</span>
        {" "}— Built with React · {new Date().getFullYear()}
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; background: #04060f; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #04060f; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,200,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}