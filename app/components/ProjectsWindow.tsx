const projects = [
  {
    name: "AutoFlow",
    url: "https://github.com/ruvais-p/AutoFlow.git",
    desc: "End-to-end Intelligent Developer Platform that unifies CI/CD automation and agentic observability into a single visual, workflow-driven system.",
    tools: ["Next.js", "React", "Radix UI", "Flask", "Prometheus"],
  },
  {
    name: "AdSage.AI",
    url: "https://github.com/ruvais-p/AdSage.AI.git",
    desc: "Next-generation marketing intelligence dashboard using multi-persona AI agents to predict, analyze, and optimize social media campaigns.",
    tools: ["Python", "Gemini", "Next.js", "React"],
  },
  {
    name: "Flow",
    url: "https://github.com/ruvais-p/flow.git",
    desc: "Personal finance tracking app that automatically reads transaction messages, classifies them using Regex models, and helps monitor UPI activity.",
    tools: ["Flutter", "Regex", "SQLite", "Kotlin"],
  },
  {
    name: "Wrist Route",
    url: "https://github.com/ruvais-p/WristRoute",
    desc: "Android app enabling real-time turn-by-turn navigation on smartwatches via notifications for devices without built-in GPS navigation.",
    tools: ["Kotlin", "Mapbox", "Notification Channel"],
  },
  {
    name: "AI Washing Machine",
    url: "https://github.com/ruvais-p/AI-integrated-washing-machine.git",
    desc: "Transformed a semi-automatic washing machine into an intelligent system that considers fabric type and sensitivity for washing parameters.",
    tools: ["Arduino", "Linear Regression"],
  },
  {
    name: "DataRock – AI Data Retrieval",
    url: "https://github.com/ruvais-p/DataRock",
    desc: "Local AI-based tool for retrieving and querying data from various file formats using RAG concept and LLM-based SQL query generation.",
    tools: ["Python", "LangChain", "Ollama"],
  },
  {
    name: "Driver Monitoring System",
    url: "https://github.com/ruvais-p/DriverMonitoringSystem",
    desc: "System to monitor driver activity and issue drowsiness alerts with an integrated fire detection system for safety.",
    tools: ["Python", "Arduino IDE", "OpenCV"],
  },
];

export default function ProjectsWindow() {
  return (
    <div className="projects-window">
      <section className="projects-hero" id="projects-hero">
        <video
          className="projects-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>

        <nav className="projects-nav" aria-label="Projects navigation">
          <a className="projects-logo" href="#projects-hero">
            Ruvais<sup>®</sup>
          </a>
          <div className="projects-nav-links">
            <a href="#projects-hero">Home</a>
            <a className="active" href="#project-archive">
              Projects
            </a>
            <a
              href="https://github.com/ruvais-p"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <a className="liquid-glass projects-nav-cta" href="#project-archive">
            View Projects
          </a>
        </nav>

        <div className="projects-hero-content">
          <h1 className="animate-fade-rise">
            Where <em>ideas</em> become <em>working systems.</em>
          </h1>
          <p className="animate-fade-rise-delay">
            A selection of developer platforms, intelligent tools, mobile
            products, and connected systems built to solve practical problems.
          </p>
          <a
            className="liquid-glass projects-hero-cta animate-fade-rise-delay-2"
            href="#project-archive"
          >
            Explore Projects
          </a>
        </div>
      </section>

      <section className="projects-archive" id="project-archive">
        <header className="projects-archive-header">
          <div>
            <span>Selected work</span>
            <h2>Projects</h2>
          </div>
          <span>{String(projects.length).padStart(2, "0")} projects</span>
        </header>

        <div className="projects-list">
          {projects.map((project, index) => (
            <article className="project-card" key={project.url}>
              <span className="project-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="project-content">
                <div className="project-name">
                  <h3>{project.name}</h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    View source <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tools" aria-label="Technologies used">
                  {project.tools.map((tool) => (
                    <span className="tool-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
