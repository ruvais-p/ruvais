"use client";

import { useEffect, useRef } from "react";

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

export default function ExperienceWindow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      video.pause();
      video.style.opacity = "0";
      return;
    }

    const fadeDuration = 0.5;
    let animationFrame = 0;
    let restartTimeout: number | undefined;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        let opacity = 1;

        if (currentTime < fadeDuration) {
          opacity = currentTime / fadeDuration;
        } else if (currentTime > duration - fadeDuration) {
          opacity = (duration - currentTime) / fadeDuration;
        }

        video.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      }

      animationFrame = window.requestAnimationFrame(updateOpacity);
    };

    const restartVideo = () => {
      video.style.opacity = "0";
      restartTimeout = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }, 100);
    };

    video.addEventListener("ended", restartVideo);
    animationFrame = window.requestAnimationFrame(updateOpacity);
    void video.play().catch(() => undefined);

    return () => {
      video.removeEventListener("ended", restartVideo);
      window.cancelAnimationFrame(animationFrame);
      if (restartTimeout !== undefined) window.clearTimeout(restartTimeout);
    };
  }, []);

  return (
    <div className="experience-window">
      <section className="experience-hero" id="experience-hero">
        <video
          ref={videoRef}
          className="experience-hero-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            type="video/mp4"
          />
        </video>
        <div className="experience-video-fade" aria-hidden="true" />

        <nav className="experience-nav" aria-label="Experience navigation">
          <a className="experience-logo" href="#experience-hero">
            Ruvais<sup>®</sup>
          </a>
          <div className="experience-nav-links">
            <a href="#experience-hero">Home</a>
            <a className="active" href="#experience-archive">
              Experience
            </a>
            <a
              href="https://www.linkedin.com/in/ruvais-p/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <a className="experience-nav-cta" href="#experience-archive">
            View Experience
          </a>
        </nav>

        <div className="experience-hero-content">
          <h1 className="experience-fade-rise">
            Beyond <em>titles,</em> I build <em>lasting systems.</em>
          </h1>
          <p className="experience-fade-rise-delay">
            Product engineering, cross-platform development, mentorship, and
            robotics experience shaped through practical, collaborative work.
          </p>
          <a
            className="experience-hero-cta experience-fade-rise-delay-2"
            href="#experience-archive"
          >
            Explore Experience
          </a>
        </div>
      </section>

      <section className="experience-archive" id="experience-archive">
        <header className="experience-archive-header">
          <div>
            <span>Career record</span>
            <h2>Experience</h2>
          </div>
          <span>{String(experiences.length).padStart(2, "0")} roles</span>
        </header>

        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article
              className="exp-card"
              key={`${experience.company}-${experience.period}`}
            >
              <span className="exp-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="exp-content">
                <div className="exp-heading">
                  <div>
                    <h3 className="exp-role">{experience.role}</h3>
                    <p className="exp-company">{experience.company}</p>
                  </div>
                  <div className="exp-meta">
                    <span>{experience.location}</span>
                    <span>{experience.period}</span>
                  </div>
                </div>
                <ul className="exp-list">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
