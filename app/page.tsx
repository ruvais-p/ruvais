"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AboutWindow from "./components/AboutWindow";
import AchievementsWindow from "./components/AchievementsWindow";
import ExperienceWindow from "./components/ExperienceWindow";
import GitHubWindow from "./components/GitHubWindow";
import LinkedInWindow from "./components/LinkedInWindow";
import MailWindow from "./components/MailWindow";
import ProjectsWindow from "./components/ProjectsWindow";
import SkillsWindow from "./components/SkillsWindow";

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
        return <AboutWindow onOpen={openWindow} />;

      case "experience":
        return <ExperienceWindow />;

      case "projects":
        return <ProjectsWindow />;

      case "achievements":
        return <AchievementsWindow />;

      case "github":
        return <GitHubWindow onClose={() => closeWindow("github")} />;

      case "linkedin":
        return <LinkedInWindow onClose={() => closeWindow("linkedin")} />;

      case "mail":
        return <MailWindow onClose={() => closeWindow("mail")} />;

      case "skills":
        return <SkillsWindow />;
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
              <div
                className={`window-body${
                  win.id === "about" ? " about-window-body" : ""
                }${
                  win.id === "projects" ? " projects-window-body" : ""
                }${
                  win.id === "experience" ? " experience-window-body" : ""
                }`}
              >
                {renderContent(win.id)}
              </div>
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
