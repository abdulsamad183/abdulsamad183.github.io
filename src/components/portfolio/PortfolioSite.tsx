import { useEffect, useState } from 'react'
import { academicRoles, education, profile, publications } from '../../data'

const navItems = [
  ['work', 'Work'], ['projects', 'Projects'], ['skills', 'Expertise'],
  ['research', 'Research'], ['education', 'Education'],
]

const work = [
  {
    company: 'Infobell IT Solutions', role: 'AI Engineer', period: 'Jun 2025 - Present',
    summary: 'Building production GenAI systems across enterprise knowledge, Voice AI, and automated software testing.',
    projects: [
      { name: 'MongoDB RAG', note: 'Enterprise knowledge intelligence', description: 'Agentic RAG over 10,000+ documents with planning, adaptive retrieval, hybrid search, cross-encoder reranking, model routing, and an evaluation suite.', result: '94% Top-K precision · p95 under 650ms · ~40% lower serving cost' },
      { name: 'Vivah.world', note: 'Multi-tenant voice agent platform', description: 'Tenant-isolated voice onboarding with duplex streaming, Gemini Live and OpenAI, Pydantic-validated extraction, guardrails, and AWS ECS Fargate deployment.', result: 'Sub-second conversational turn latency' },
      { name: 'RepoPilot', note: 'AI chatbot for automated testing', description: 'A multi-agent testing platform with one orchestrator, ten specialist agents, four LLM providers, and 139 tools generated from OpenAPI specifications.', result: 'API, workflow, UI, and security testing in one interface' },
    ],
  },
  {
    company: 'Siemens Technology and Services', role: 'Technical Intern', period: 'Nov 2024 - May 2025',
    summary: 'Built privacy-preserving federated learning for computer vision and time-series workloads on Siemens Industrial Edge.',
    projects: [
      { name: 'Federated Learning for Domain Adaptation', note: 'Industrial Edge', description: 'Cross-device PyTorch training with advanced aggregation, LoRA/QLoRA, parallel preprocessing, ONNX Runtime, and reproducible Docker workflows.', result: '~25% faster training throughput · ~20% higher global accuracy' },
    ],
  },
]

const projects = [
  {
    name: 'GitSight', eyebrow: 'Autonomous software engineering',
    description: 'A full-stack GitHub code intelligence platform that turns repositories into searchable, explorable knowledge. It combines repository-aware RAG chat, semantic and hybrid code search, dependency graph visualization, and AI-assisted pull request reviews with asynchronous indexing and provider fallbacks.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'Supabase', 'pgvector', 'Tree-sitter'],
    links: [['View source', 'https://github.com/abdulsamad183/GitSight-autonomous-se-platform'], ['Live demo', 'https://git-sight-autonomous-se-platform.vercel.app/']],
  },
  {
    name: 'Cervical Cancer Screening', eyebrow: "Master's thesis · IIT Dharwad",
    description: 'MRF-DCN is a lightweight medical-imaging architecture for Pap-smear screening. The research combines cervical-cell segmentation, classification, and probabilistic risk assessment in an end-to-end pipeline while using far fewer parameters than heavyweight baselines.',
    stack: ['PyTorch', 'Medical imaging', 'Deep learning', 'Multi-task learning'], metric: '~96% classification accuracy · IoU 0.83',
    links: [['Read research', 'https://arxiv.org/abs/2505.15505']],
  },
  {
    name: 'YesBroker', eyebrow: 'Multi-agent rental verification',
    description: 'A Bangalore rental verification system that coordinates five Gemini agents for photo forensics, price sanity, commute analysis, listing-text checks, and web reconnaissance. Agent traces stream to an interactive dashboard and completed trust reports are cached for quick review.',
    stack: ['FastAPI', 'Next.js', 'Gemini', 'Playwright', 'SSE', 'Leaflet'], links: [['View source', 'https://github.com/PSY27/YesBroker']],
  },
  {
    name: 'AI Engineering Playbook', eyebrow: 'Open knowledge base',
    description: 'A practical, structured knowledge base for modern AI engineering. It organizes reusable architecture patterns, implementation guides, templates, prompts, examples, and cheat sheets across LLMs, RAG, agents, MCP, system design, and production AI.',
    stack: ['LLMs', 'RAG', 'Agents', 'MCP', 'System design', 'Production AI'],
    links: [['Explore repository', 'https://github.com/abdulsamad183/ai-engineering-playbook']],
  },
  {
    name: 'Transformer Guide', eyebrow: 'Visual learning resource',
    description: 'A self-contained visual guide to the Transformer architecture, moving from attention mathematics through training and inference. Tensor shapes are tracked at every step to make the data flow concrete and easier to debug.',
    stack: ['Transformers', 'Attention', 'NLP', 'Deep learning', 'KaTeX'],
    links: [['Explore repository', 'https://github.com/abdulsamad183/transformer-guide']],
  },
  {
    name: 'Retrieval & Ranking Lab', eyebrow: 'RAG from first principles',
    description: 'A from-scratch, evaluated retrieval-augmented QA system built without managed vector databases or paid APIs. The project focuses on retrieval quality, reranking, latency trade-offs, evaluation, and transparent system design rather than hiding the pipeline behind an LLM call.',
    stack: ['Python', 'RAG', 'Retrieval', 'Reranking', 'Evaluation'],
    links: [['Explore repository', 'https://github.com/abdulsamad183/retrieval_ranking_system_for_qa']],
  },
  {
    name: 'AI Recipe Assistant', eyebrow: 'Multimodal agent',
    description: 'A LangGraph-based multimodal cooking agent that reads an image of available ingredients, extracts what it sees with vision models, proposes suitable recipes, and recommends missing ingredients when a complete dish is not yet possible.',
    stack: ['LangGraph', 'OpenAI Vision', 'Agentic AI', 'Python', 'Multimodal AI'],
    links: [['Explore repository', 'https://github.com/abdulsamad183/cooking_agent']],
  },
]

const skills = [
  { title: 'LLM systems', items: ['LLM gateways', 'vLLM', 'Ollama', 'Evals & observability', 'Prompt engineering', 'Structured outputs', 'LoRA / QLoRA', 'Guardrails', 'Voice AI', 'Multimodal AI', 'Model routing', 'Context engineering'] },
  { title: 'Agents & retrieval', items: ['LangGraph', 'LangChain', 'LlamaIndex', 'Multi-agent orchestration', 'ReAct', 'Supervisor-worker', 'Tool calling', 'Query decomposition', 'CRAG / Self-RAG', 'HITL', 'Agent memory', 'MCP', 'Hybrid search'] },
  { title: 'Models & providers', items: ['OpenAI', 'Gemini', 'Groq', 'Vertex AI', 'Hugging Face', 'Sentence Transformers', 'Pipecat', 'Silero VAD', 'Claude', 'Amazon Bedrock'] },
  { title: 'Backend engineering', items: ['Python', 'FastAPI', 'AsyncIO', 'REST APIs', 'WebSockets', 'Microservices', 'Pydantic', 'SQLAlchemy', 'Shell scripting', 'Redis', 'Pytest'] },
  { title: 'Data & retrieval', items: ['MongoDB Atlas', 'PostgreSQL', 'pgvector', 'FAISS', 'Milvus', 'BM25 + dense search', 'Cross-encoder reranking', 'Embedding pipelines', 'Elasticsearch', 'Pinecone'] },
  {
    title: 'Machine learning',
    items: [
      'Supervised learning', 'Unsupervised learning', 'Linear regression', 'Logistic regression', 'Decision trees',
      'Random forest', 'Gradient boosting', 'XGBoost', 'SVM', 'k-NN', 'K-Means clustering', 'PCA',
      'Anomaly detection', 'Scikit-learn', 'Pandas', 'NumPy', 'Dimensionality reduction',
      'Hyperparameter tuning', 'Cross-validation', 'Ensemble modeling', 'Model explainability',
    ],
  },
  {
    title: 'Deep learning',
    items: [
      'PyTorch', 'TensorFlow', 'Keras', 'Hugging Face Transformers', 'OpenCV', 'ANN', 'CNN', 'RNN',
      'LSTM', 'GRU', 'Transformers', 'Autoencoders', 'GANs', 'Diffusion models', 'NLP', 'Computer vision',
      'Retrieval-augmented generation (RAG)', 'Transfer learning', 'Reinforcement learning',
      'Self-supervised learning', 'Embeddings',
    ],
  },
  { title: 'Cloud & deployment', items: ['Docker', 'AWS EC2', 'ECS Fargate', 'S3', 'API Gateway', 'CI/CD', 'Model deployment', 'Latency optimization', 'Distributed training', 'GitHub Actions', 'Kubernetes'] },
]

const PHONE_NUMBER = '+91 90302 01771'

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.41-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.73 0-1.27.45-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.17 1.19a10.98 10.98 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.75.81 1.2 1.84 1.2 3.11 0 4.45-2.72 5.43-5.3 5.72.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
}

function LinkedInIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" /></svg>
}

function LeetCodeIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M13.48 4.06a1.25 1.25 0 0 0-1.77-1.77L5.8 8.2a5.37 5.37 0 0 0 0 7.6l3.05 3.05a5.37 5.37 0 0 0 7.6 0l1.43-1.43a1.25 1.25 0 1 0-1.77-1.77l-1.43 1.43a2.87 2.87 0 0 1-4.06 0l-3.05-3.05a2.87 2.87 0 0 1 0-4.06l5.91-5.91Zm-3.1 6.69a1.25 1.25 0 0 0 0 2.5h8.87a1.25 1.25 0 1 0 0-2.5h-8.87Z" /></svg>
}

export function PortfolioSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Abdul Samad, home">AS<span>.</span></a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav id="site-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href={`mailto:${profile.email}`}>Say hello</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-grid" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">AI ENGINEER · BENGALURU, INDIA</p>
            <div className="experience-highlight"><strong>2+ years</strong><span>building AI and ML systems</span></div>
            <h1 id="hero-title">I build useful AI systems that hold up in the real world.</h1>
            <p className="hero-intro">I’m Abdul Samad, an AI Engineer and IIT Dharwad graduate with more than two years of hands-on experience. I work across agentic RAG, multi-agent systems, Voice AI, and production ML - from retrieval quality to latency, guardrails, and deployment.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See my work</a>
              <a className="text-link" href={profile.links.resumeFolder} target="_blank" rel="noreferrer">View resume</a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Profile summary">
            <div className="hero-portrait"><img src="/portrait-cutout.png" alt="Abdul Samad Shaik" /></div>
            <div>
              <p className="availability"><span /> Open to AI engineering opportunities</p>
              <p className="hero-card-title">Currently building production GenAI systems at Infobell IT.</p>
              <div className="social-row">
                <a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a>
                <a href={profile.links.leetcode} target="_blank" rel="noreferrer"><LeetCodeIcon /> LeetCode</a>
              </div>
            </div>
          </aside>
        </section>

        <section className="section page-grid" id="work">
          <div className="section-heading"><p className="kicker">SELECTED EXPERIENCE</p><h2>Work built for production, not just demos.</h2></div>
          <div className="work-list">
            {work.map((job) => (
              <article className="job" key={job.company}>
                <div className="job-heading"><div><h3>{job.role}</h3><p>{job.company}</p></div><time>{job.period}</time></div>
                <p className="job-summary">{job.summary}</p>
                <div className="job-projects">
                  {job.projects.map((project) => (
                    <div className="job-project" key={project.name}>
                      <div className="project-title-line"><h4>{project.name}</h4><span>{project.note}</span></div>
                      <p>{project.description}</p><p className="result">{project.result}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="page-grid section-heading-row">
            <div className="section-heading"><p className="kicker">FEATURED PROJECTS</p><h2>A few things I’ve made.</h2></div>
            <a className="text-link" href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon /> More on GitHub</a>
          </div>
          <div className="page-grid project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.name}>
                <p className="kicker">{project.eyebrow}</p><h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>{project.metric && <p className="metric">{project.metric}</p>}
                <ul className="tag-list" aria-label={`${project.name} technologies`}>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                <div className="card-links">{project.links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{href.includes('github.com') && <GitHubIcon />}{label}</a>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-grid" id="skills">
          <div className="section-heading"><p className="kicker">EXPERTISE</p><h2>From model call to reliable system.</h2><p>I focus on the engineering around AI: retrieval, orchestration, evaluation, safety, latency, and operations.</p></div>
          <div className="skills-grid">{skills.map((group) => <div className="skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </section>

        <section className="section research-section" id="research">
          <div className="page-grid">
            <div className="section-heading"><p className="kicker">RESEARCH</p><h2>Medical AI, from segmentation to risk assessment.</h2></div>
            <div className="publication-list">{publications.map((publication) => <a className="publication" key={publication.url} href={publication.url} target="_blank" rel="noreferrer"><span><strong>{publication.title}</strong><small>{publication.venue}</small></span><span className="publication-action">Read paper</span></a>)}</div>
          </div>
        </section>

        <section className="section page-grid" id="education">
          <div className="section-heading"><p className="kicker">EDUCATION & CREDENTIALS</p><h2>A strong research foundation.</h2></div>
          <div className="education-layout">
            <div className="education-list">{education.map((item) => <article key={item.institution}><div><h3>{item.degree}</h3><p>{item.institution}</p></div><p className="education-meta">{item.period}<br />CGPA {item.cgpa}</p></article>)}</div>
            <a className="certificate-card" href="https://www.credly.com/badges/bc98f43e-f922-4679-b762-6eca70cff902" target="_blank" rel="noreferrer"><span className="certificate-mark">A</span><span><small>ANTHROPIC · VERIFIED CREDENTIAL</small><strong>Claude Certified Developer - Foundations</strong><span className="certificate-link">View credential</span></span></a>
          </div>
          <div className="academic-roles">
            <p className="kicker">ACADEMIC & LEADERSHIP ROLES</p>
            <div className="academic-role-grid">{academicRoles.map((role) => <article key={role.title}><time>{role.period}</time><h3>{role.title}</h3><p>{role.highlights.join(' · ')}</p></article>)}</div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-grid contact-inner"><div><p className="kicker">LET’S BUILD SOMETHING USEFUL</p><h2>Have an AI problem worth solving?</h2></div><div className="contact-copy"><p>I’m interested in AI engineering roles and collaborations involving agentic systems, RAG, Voice AI, and applied ML.</p><div className="contact-details"><a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email}</strong></a><a href="tel:+919030201771"><span>Phone</span><strong>{PHONE_NUMBER}</strong></a></div><div className="contact-socials"><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a><a href={profile.links.leetcode} target="_blank" rel="noreferrer"><LeetCodeIcon /> LeetCode</a></div></div></div>
        </section>
      </main>

      <footer className="site-footer page-grid"><p>© {new Date().getFullYear()} Abdul Samad Shaik</p><div><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a><a href={profile.links.leetcode} target="_blank" rel="noreferrer"><LeetCodeIcon /> LeetCode</a><a href="#top">Back to top</a></div></footer>
    </div>
  )
}
