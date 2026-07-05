"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ───── data ───── */
const experiences = [
  {
    role: "Product Engineer Intern",
    company: "Crink.app",
    location: "Kerala Startup Mission",
    period: "March 2026 – Present",
    points: [
      "Developing and maintaining their Mobile Application",
      "Developing and testing API as per the project requirement in Fast API",
      "Developed their OTC booking website",
    ],
  },
  {
    role: "Flutter Developer",
    company: "Senior Circle",
    location: "Cochin",
    period: "January 2026 – March 2026",
    points: [
      "Developed a mobile application designed for senior citizens",
      "Implemented chat functionality and room creation features",
      "Designed and developed the application UI/UX",
      "Integrated Supabase authentication for secure user login",
      "Implemented local message storage with data synchronization",
      "Followed clean architecture principles",
      "Implemented push notifications using native platform functionality",
    ],
  },
  {
    role: "Flutter Developer",
    company: "Rent A Tree",
    location: "Cochin",
    period: "December 2025 – February 2026",
    points: [
      "Developing a mobile application for activity tracking",
      "Managing multiple state animations within the application",
      "Implemented Supabase database functionalities",
      "Designed the UI and system architecture, and served as the project lead",
    ],
  },
  {
    role: "Flutter Developer and Mentor",
    company: "Equal Opportunity Cell & Skill Orientation Centre, CUSAT",
    location: "CUSAT, SOCE",
    period: "March 2025 – Present",
    points: [
      "Flutter mentor and full-stack developer",
      "Contributed to the development of multiple web and mobile applications",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "KaanMart",
    location: "Kalamassery, CITTIC",
    period: "Aug 2024 – June 2025",
    points: [
      "Developed a scalable frontend for large-scale production apps using Flutter and Clean Architecture",
      "Integrated REST APIs and implemented efficient state management",
      "Gained strong experience in UI development, responsive design, and Dart libraries",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "Kraltek",
    location: "Kalamassery, CITTIC",
    period: "May 2024 – June 2024",
    points: [
      "Developed a user interface for an automated medication system",
      "Gained experience with MediaQuery, Cupertino widgets, and UI animations",
      "Implemented state management and developed charts for data visualization",
    ],
  },
  {
    role: "Software Engineer",
    company: "Team HORIZON, CUSAT",
    location: "SOE, CUSAT",
    period: "Dec 2023 – July 2025",
    points: [
      "Contributed to wheel odometry, IMU-based navigation, and robotic arm systems",
      "Gained experience with ROS and IoT for Mars Rover software development",
    ],
  },
];

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

const achievements = [
  {
    title: "Code reCET – Kerala Hackathon, Trivandrum",
    result: "🏆 WINNERS",
    desc: 'Built "ARGUS" — a mobile application using Flutter with integrated object detection model that alerts supervisors when workers lack safety gear. 36-hour hackathon at CET, Trivandrum.',
  },
  {
    title: "GistAthon – Kerala Hackathon, SNGIST",
    result: "🥈 RUNNERS UP",
    desc: 'Built "Data Bot" — uses Gemini API to query databases with natural language prompts without requiring technical database knowledge.',
  },
  {
    title: "Magnathon 2.0 – Kerala Hackathon, Calicut",
    result: "🥉 THIRD PRIZE",
    desc: "Built a platform for weather, climate, and disaster updates with offline/online alert features for rescue camp and facility locations.",
  },
];

const skills = {
  Languages: ["Python", "Dart", "C++", "Java", "C", "Kotlin", "SQL"],
  "Frameworks / Tools": [
    "Flutter",
    "Django",
    "Arduino IDE",
    "OpenCV",
    "LangChain",
    "Gemini API",
    "ROS",
  ],
  Technologies: [
    "IMU Navigation",
    "REST APIs",
    "SQLite",
    "Mapbox",
    "Notification Channels",
    "Supabase",
    "Clean Architecture",
  ],
};

/* ───── SVG icons (inline) ───── */
const Icons = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  edu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

/* ───── window types ───── */
type WindowId = "about" | "experience" | "projects" | "achievements" | "skills" | "github" | "linkedin" | "mail";

interface WindowState {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  minimized: boolean;
  closing: boolean;
}

/* ───── page ───── */
export default function UbuntuDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(101);
  const [clock, setClock] = useState("");
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryCharging, setBatteryCharging] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [volume, setVolume] = useState(80);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const dragRef = useRef<{
    id: WindowId;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  /* clock */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }) +
          "  " +
          d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
      );
    };
    tick();
    const i = setInterval(tick, 10000);
    return () => clearInterval(i);
  }, []);

  /* battery API */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    if (nav.getBattery) {
      nav.getBattery().then((batt: { level: number; charging: boolean; addEventListener: (e: string, fn: () => void) => void }) => {
        setBatteryLevel(Math.round(batt.level * 100));
        setBatteryCharging(batt.charging);
        batt.addEventListener("levelchange", () => setBatteryLevel(Math.round(batt.level * 100)));
        batt.addEventListener("chargingchange", () => setBatteryCharging(batt.charging));
      });
    }
  }, []);

  /* online / offline */
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  /* close dropdowns on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.panel-dropdown-wrapper')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  /* calendar helpers */
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const calYear = calendarDate.getFullYear();
  const calMonth = calendarDate.getMonth();
  const calDaysInMonth = getDaysInMonth(calYear, calMonth);
  const calFirstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => setCalendarDate(new Date(calYear, calMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calYear, calMonth + 1, 1));

  /* open about window on mount */
  useEffect(() => {
    openWindow("about");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const windowDefs: Record<WindowId, { title: string; w: number; h: number }> =
    {
      about: { title: "About — Ruvais P", w: 440, h: 560 },
      experience: { title: "Experience", w: 560, h: 520 },
      projects: { title: "Projects", w: 560, h: 520 },
      achievements: { title: "Achievements", w: 520, h: 440 },
      skills: { title: "Technical Skills", w: 460, h: 400 },
      github: { title: "GitHub — ruvais-p", w: 900, h: 600 },
      linkedin: { title: "LinkedIn — Ruvais P", w: 900, h: 600 },
      mail: { title: "Mail — Compose", w: 600, h: 500 },
    };

  const openWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const exists = prev.find((w) => w.id === id);
        if (exists) {
          if (exists.minimized) {
            return prev.map((w) =>
              w.id === id
                ? { ...w, minimized: false, zIndex: zCounter + 1 }
                : w
            );
          }
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: zCounter + 1 } : w
          );
        }
        const def = windowDefs[id];
        const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        const dockWidth = 56;
        const panelHeight = 28;
        const availW = vw - dockWidth;
        const availH = vh - panelHeight;
        const w = Math.round(availW * 0.8);
        const h = Math.round(availH * 0.8);
        const x = Math.round((availW - w) / 2);
        const y = Math.round((availH - h) / 2);
        return [
          ...prev,
          {
            id,
            title: def.title,
            x,
            y,
            w,
            h,
            zIndex: zCounter + 1,
            minimized: false,
            closing: false,
          },
        ];
      });
      setZCounter((c) => c + 1);
    },
    [zCounter, windowDefs]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, closing: true } : w))
    );
    setTimeout(() => {
      setWindows((prev) => prev.filter((w) => w.id !== id));
    }, 200);
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const bringToFront = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: zCounter + 1 } : w
        )
      );
      setZCounter((c) => c + 1);
    },
    [zCounter]
  );

  /* drag */
  const onMouseDown = useCallback(
    (e: React.MouseEvent, id: WindowId) => {
      bringToFront(id);
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      dragRef.current = {
        id,
        offsetX: e.clientX - win.x,
        offsetY: e.clientY - win.y,
      };
    },
    [windows, bringToFront]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragRef.current) return;
      const { id, offsetX, offsetY } = dragRef.current;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, x: e.clientX - offsetX, y: e.clientY - offsetY }
            : w
        )
      );
    },
    []
  );

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  /* touch drag */
  const onTouchStart = useCallback(
    (e: React.TouchEvent, id: WindowId) => {
      bringToFront(id);
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      const touch = e.touches[0];
      dragRef.current = {
        id,
        offsetX: touch.clientX - win.x,
        offsetY: touch.clientY - win.y,
      };
    },
    [windows, bringToFront]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragRef.current) return;
      const touch = e.touches[0];
      const { id, offsetX, offsetY } = dragRef.current;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, x: touch.clientX - offsetX, y: touch.clientY - offsetY }
            : w
        )
      );
    },
    []
  );

  /* render window content */
  const renderContent = (id: WindowId) => {
    switch (id) {
      case "about":
        return (
          <div className="about-window">
            <div className="about-avatar">R</div>
            <div className="about-name">Ruvais P</div>
            <div className="about-title">
              Computer Science Engineer · Flutter Developer
            </div>
            <div className="about-details">
              <div className="about-detail">
                {Icons.location}
                <span>Kochi, Kerala</span>
              </div>
              <div className="about-detail">
                {Icons.mail}
                <span>ruvaispuv@gmail.com</span>
              </div>
              <div className="about-detail">
                {Icons.phone}
                <span>+91 8592964750</span>
              </div>
              <div className="about-detail">
                {Icons.edu}
                <span>B-Tech CSE · CUSAT · GPA: 8.91</span>
              </div>
            </div>
            <div className="about-summary">
              Computer Science undergraduate with practical experience in
              software development, AI integration, and cross-platform mobile
              application development. Proficient in Python, Flutter, and
              machine learning. Active in hackathons and technical conferences
              with strong analytical thinking and teamwork skills.
            </div>
            <div className="social-links">
              <button
                className="social-link"
                title="LinkedIn"
                onClick={() => openWindow('linkedin')}
              >
                {Icons.linkedin}
              </button>
              <button
                className="social-link"
                title="GitHub"
                onClick={() => openWindow('github')}
              >
                {Icons.github}
              </button>
              <button
                className="social-link"
                title="Email"
                onClick={() => openWindow('mail')}
              >
                {Icons.mail}
              </button>
            </div>
          </div>
        );

      case "experience":
        return (
          <div>
            <div className="section-title">💼 Experience</div>
            {experiences.map((e, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
                <div className="exp-meta">
                  <span>📍 {e.location}</span>
                  <span>📅 {e.period}</span>
                </div>
                <ul className="exp-list">
                  {e.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div>
            <div className="section-title">🚀 Projects</div>
            {projects.map((p, i) => (
              <div className="project-card" key={i}>
                <div className="project-name">
                  {p.name}
                  <a href={p.url} target="_blank" rel="noreferrer">
                    ↗ GitHub
                  </a>
                </div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tools">
                  {p.tools.map((t, j) => (
                    <span className="tool-tag" key={j}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "achievements":
        return (
          <div>
            <div className="section-title">🏆 Achievements</div>
            {achievements.map((a, i) => (
              <div className="achievement-card" key={i}>
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-result">{a.result}</div>
                <div className="achievement-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        );

      case "github":
        window.open("https://github.com/ruvais-p", "_blank");
        setTimeout(() => closeWindow("github"), 200);
        return null;

      case "linkedin":
        window.open("https://www.linkedin.com/in/ruvais-p/", "_blank");
        setTimeout(() => closeWindow("linkedin"), 200);
        return null;

      case "mail":
        return (
          <div className="mail-compose">
            <div className="mail-field">
              <label>To:</label>
              <span>ruvaispuv@gmail.com</span>
            </div>
            <div className="mail-field">
              <label>Subject:</label>
              <input type="text" placeholder="Enter subject..." className="mail-input" />
            </div>
            <div className="mail-field mail-body-field">
              <textarea placeholder="Write your message here..." className="mail-textarea" />
            </div>
            <div className="mail-actions">
              <a
                href="mailto:ruvaispuv@gmail.com"
                className="mail-send-btn"
              >
                ✉ Open in Mail App
              </a>
              <button className="mail-discard-btn" onClick={() => closeWindow('mail')}>
                Discard
              </button>
            </div>
          </div>
        );

      case "skills":
        return (
          <div>
            <div className="section-title">⚡ Technical Skills</div>
            {Object.entries(skills).map(([cat, list]) => (
              <div className="skills-category" key={cat}>
                <div className="skills-category-title">{cat}</div>
                <div className="skills-grid">
                  {list.map((s, i) => (
                    <span className="skill-chip" key={i}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  const desktopIcons: {
    id: WindowId;
    label: string;
    emoji: string;
    color: string;
  }[] = [
    { id: "experience", label: "Experience", emoji: "💼", color: "" },
    { id: "projects", label: "Projects", emoji: "🚀", color: "purple" },
    { id: "achievements", label: "Achievements", emoji: "🏆", color: "teal" },
    { id: "skills", label: "Technical Skills", emoji: "⚡", color: "blue" },
  ];

  const dockApps: { id: WindowId; emoji: string; label: string }[] = [
    { id: "about", emoji: "👤", label: "About Me" },
    { id: "experience", emoji: "💼", label: "Experience" },
    { id: "projects", emoji: "🚀", label: "Projects" },
    { id: "achievements", emoji: "🏆", label: "Achievements" },
    { id: "skills", emoji: "⚡", label: "Skills" },
    { id: "github", emoji: "🐙", label: "GitHub" },
    { id: "linkedin", emoji: "💼", label: "LinkedIn" },
    { id: "mail", emoji: "✉️", label: "Mail" },
  ];

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* ── top panel ── */}
      <div className="top-panel">
        <div className="panel-left">
          <span className="panel-activities">Activities</span>
          {(() => {
            const topWin = [...windows]
              .filter((w) => !w.minimized && !w.closing)
              .sort((a, b) => b.zIndex - a.zIndex)[0];
            return topWin ? (
              <span className="panel-app-name">
                <span className="panel-app-dot">●</span>
                {topWin.title}
              </span>
            ) : null;
          })()}
        </div>

        {/* Calendar dropdown (center) */}
        <div className="panel-dropdown-wrapper panel-center-wrapper">
          <div className="panel-center" onClick={() => toggleDropdown('calendar')}>
            <span>{clock}</span>
          </div>
          {activeDropdown === 'calendar' && (
            <div className="panel-dropdown calendar-dropdown">
              <div className="calendar-header">
                <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                <span className="cal-month-label">{monthNames[calMonth]} {calYear}</span>
                <button className="cal-nav-btn" onClick={nextMonth}>›</button>
              </div>
              <div className="calendar-grid">
                {dayNames.map((d) => (
                  <div className="cal-day-name" key={d}>{d}</div>
                ))}
                {Array.from({ length: calFirstDay }).map((_, i) => (
                  <div className="cal-day empty" key={`e${i}`} />
                ))}
                {Array.from({ length: calDaysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday =
                    day === today.getDate() &&
                    calMonth === today.getMonth() &&
                    calYear === today.getFullYear();
                  return (
                    <div className={`cal-day${isToday ? ' today' : ''}`} key={day}>
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="panel-right">
          {/* WiFi dropdown */}
          <div className="panel-dropdown-wrapper">
            <span className="panel-icon" onClick={() => toggleDropdown('wifi')}>
              {isOnline ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0114 0" />
                  <path d="M8.53 16.11a6 6 0 016.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                  <path d="M1.42 9a16 16 0 0121.16 0" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
                  <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
                  <path d="M10.71 5.05A16 16 0 0122.56 9" />
                  <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
                  <path d="M8.53 16.11a6 6 0 016.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
              )}
            </span>
            {activeDropdown === 'wifi' && (
              <div className="panel-dropdown wifi-dropdown">
                <div className="dropdown-title">Wi-Fi</div>
                <div className="dropdown-row">
                  <span className="dropdown-label">{isOnline ? 'Connected' : 'Disconnected'}</span>
                  <button
                    className={`toggle-switch${isOnline ? ' on' : ''}`}
                    onClick={() => setIsOnline((prev) => !prev)}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
                {isOnline && (
                  <>
                    <div className="dropdown-divider" />
                    <div className="dropdown-network-list">
                      <div className="network-item active">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /><path d="M1.42 9a16 16 0 0121.16 0" /></svg>
                        <span>Home Network</span>
                        <span className="network-connected">✓</span>
                      </div>
                      <div className="network-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                        <span>Office_5G</span>
                      </div>
                      <div className="network-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                        <span>Guest_WiFi</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Volume dropdown */}
          <div className="panel-dropdown-wrapper">
            <span className="panel-icon" onClick={() => toggleDropdown('volume')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {volume > 0 && <path d="M15.54 8.46a5 5 0 010 7.07" />}
                {volume > 50 && <path d="M19.07 4.93a10 10 0 010 14.14" />}
              </svg>
            </span>
            {activeDropdown === 'volume' && (
              <div className="panel-dropdown volume-dropdown">
                <div className="dropdown-title">Sound</div>
                <div className="dropdown-row volume-row">
                  <button className="vol-icon-btn" onClick={() => setVolume(volume > 0 ? 0 : 80)}>
                    {volume === 0 ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 010 7.07" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="volume-slider"
                  />
                  <span className="vol-pct">{volume}%</span>
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-row">
                  <span className="dropdown-label">Output Device</span>
                </div>
                <div className="dropdown-row output-device active">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></svg>
                  <span>Speakers — Built-in</span>
                  <span className="network-connected">✓</span>
                </div>
              </div>
            )}
          </div>

          {/* Battery */}
          {batteryLevel !== null && (
            <span className="panel-battery" title={`Battery: ${batteryLevel}%${batteryCharging ? " (Charging)" : ""}`}>
              <svg width="22" height="14" viewBox="0 0 22 14">
                <rect x="0.5" y="0.5" width="18" height="13" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="19" y="4" width="2.5" height="6" rx="1" fill="currentColor" opacity="0.5" />
                <rect
                  x="2" y="2.5" width={Math.max(0, (batteryLevel / 100) * 14.5)} height="9" rx="1"
                  fill={batteryLevel <= 20 ? "#f44336" : batteryLevel <= 50 ? "#ff9800" : "#4caf50"}
                />
                {batteryCharging && (
                  <text x="9" y="11" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">⚡</text>
                )}
              </svg>
              <span className="battery-pct">{batteryLevel}%</span>
            </span>
          )}

          {/* Power dropdown */}
          <div className="panel-dropdown-wrapper">
            <span className="panel-icon panel-power" onClick={() => toggleDropdown('power')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 11-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </span>
            {activeDropdown === 'power' && (
              <div className="panel-dropdown power-dropdown">
                <button className="power-option" onClick={() => { setActiveDropdown(null); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  <span>Lock</span>
                </button>
                <button className="power-option" onClick={() => { setActiveDropdown(null); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  <span>Suspend</span>
                </button>
                <div className="dropdown-divider" />
                <button className="power-option" onClick={() => { window.location.reload(); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
                  <span>Restart…</span>
                </button>
                <button className="power-option danger" onClick={() => { document.body.style.transition = 'opacity 0.8s'; document.body.style.opacity = '0'; setTimeout(() => { window.open('about:blank', '_self'); window.close(); }, 800); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18.36 6.64a9 9 0 11-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /></svg>
                  <span>Power Off…</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── desktop ── */}
      <div className="desktop">
        {/* desktop icons */}
        <div className="desktop-icons">
          {desktopIcons.map((icon) => (
            <div
              className="desktop-icon"
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id)}
              onClick={() => openWindow(icon.id)}
            >
              <div className={`icon-img ${icon.color}`}>{icon.emoji}</div>
              <span className="icon-label">{icon.label}</span>
            </div>
          ))}
        </div>

        {/* windows */}
        {windows
          .filter((w) => !w.minimized)
          .map((win) => (
            <div
              className={`ubuntu-window${win.closing ? " closing" : ""}`}
              key={win.id}
              style={{
                left: win.x,
                top: win.y,
                width: win.w,
                height: win.h,
                zIndex: win.zIndex,
              }}
              onMouseDown={() => bringToFront(win.id)}
            >
              <div
                className="window-header"
                onMouseDown={(e) => onMouseDown(e, win.id)}
                onTouchStart={(e) => onTouchStart(e, win.id)}
              >
                <div className="window-controls">
                  <button
                    className="window-btn close"
                    onClick={() => closeWindow(win.id)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <button
                    className="window-btn minimize"
                    onClick={() => minimizeWindow(win.id)}
                    aria-label="Minimize"
                  >
                    −
                  </button>
                  <button
                    className="window-btn maximize"
                    aria-label="Maximize"
                  >
                    □
                  </button>
                </div>
                <span className="window-title">{win.title}</span>
                <div style={{ width: 54 }} />
              </div>
              <div className="window-body">{renderContent(win.id)}</div>
            </div>
          ))}
      </div>

      {/* ── left sidebar dock ── */}
      <div className="dock">
        <div className="dock-apps">
          {dockApps.map((app) => {
            const isOpen = windows.some((w) => w.id === app.id && !w.closing);
            return (
              <div
                className={`dock-item${isOpen ? " active" : ""}`}
                key={app.id}
                onClick={() => openWindow(app.id)}
              >
                <span style={{ fontSize: 22 }}>{app.emoji}</span>
                <span className="tooltip">{app.label}</span>
              </div>
            );
          })}
        </div>
        <div className="dock-separator" />
        <div
          className="dock-item show-apps"
          title="Show Applications"
          onClick={() => {
            /* open all windows */
            (["about", "experience", "projects", "achievements", "skills", "github", "linkedin", "mail"] as WindowId[]).forEach(
              (id) => openWindow(id)
            );
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <rect x="1" y="1" width="6" height="6" rx="1.2" />
            <rect x="9" y="1" width="6" height="6" rx="1.2" />
            <rect x="17" y="1" width="6" height="6" rx="1.2" />
            <rect x="1" y="9" width="6" height="6" rx="1.2" />
            <rect x="9" y="9" width="6" height="6" rx="1.2" />
            <rect x="17" y="9" width="6" height="6" rx="1.2" />
            <rect x="1" y="17" width="6" height="6" rx="1.2" />
            <rect x="9" y="17" width="6" height="6" rx="1.2" />
            <rect x="17" y="17" width="6" height="6" rx="1.2" />
          </svg>
          <span className="tooltip">Show Applications</span>
        </div>
      </div>
    </div>
  );
}
