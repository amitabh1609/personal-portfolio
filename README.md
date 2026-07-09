# Amitabh Choudhury — Personal Portfolio

Live at **[personal-portfolio-cyan-eight-50.vercel.app](https://personal-portfolio-cyan-eight-50.vercel.app/)**

A single-page portfolio built with React + Vite, themed around data engineering & data science.

## Sections

- **Hero** — animated role typewriter (Data Engineer / Data Scientist / MLOps Builder / GenAI Evaluator) with a live Ingest → Transform → Model → Serve pipeline visual
- **Tech marquee** — scrolling strip of the core stack with logos
- **Impact metrics** — animated count-up dashboard (pipelines, events ingested, table reduction, LeetCode rating)
- **About** — narrative bio plus three engineering principles
- **Experience** — Caterpillar timeline (Data Engineer, Systems Data Support Analyst, Software Engineer Intern)
- **Projects** — Text-to-SQL Guardrails · Demand Forecasting MLOps (live demo) · Hybrid RAG (live demo) · GitHub Archive Lakehouse
- **Skills** — dedicated section with tech icons, grouped by Data Engineering, AI/GenAI, ML/MLOps, Languages & Analytics, Infra & Dev
- **Beyond work** — competitive programming achievements + education
- **Contact** — email, open-to roles and locations

## Design

- Dark technical palette with cyan → violet gradients and a mouse-following spotlight
- Fonts: Space Grotesk, JetBrains Mono, Inter
- Scroll-reveal animations, animated pipeline sweep, count-up metrics, typewriter hero
- Skill logos from devicon / vectorlogo with emoji fallbacks; dbt bundled locally in `public/icons`

## Tech Stack

- React 19 + Vite
- Plain CSS (App.css, CSS variables)
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```
