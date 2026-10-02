import type { ReactNode } from "react";
import Image from "next/image";

const icons: Record<"mail" | "phone" | "location" | "linkedin" | "github" | "edu", ReactNode> = {
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

interface AboutWindowProps {
  onOpen: (id: "linkedin" | "github" | "mail") => void;
}

export default function AboutWindow({ onOpen }: AboutWindowProps) {
  return (
    <div className="about-window">
      <div className="about-portrait">
        <Image
          className="about-portrait-image"
          src="/ruvais-profile.png"
          alt="Portrait of Ruvais P"
          fill
          sizes="(max-width: 900px) 80vw, 36vw"
        />
      </div>

      <div className="about-content">
        <header className="about-heading">
          <h1 className="about-name">Ruvais P</h1>
          <p className="about-title">
            Computer Science Engineer · Flutter Developer
          </p>
        </header>

        <div className="about-details">
          <div className="about-detail">
            {icons.location}
            <span>Kochi, Kerala</span>
          </div>
          <div className="about-detail">
            {icons.mail}
            <span>ruvaispuv@gmail.com</span>
          </div>
          <div className="about-detail">
            {icons.phone}
            <span>+91 8592964750</span>
          </div>
          <div className="about-detail">
            {icons.edu}
            <span>B-Tech CSE · CUSAT · GPA: 8.91</span>
          </div>
        </div>

        <p className="about-summary">
          Computer Science undergraduate with practical experience in software
          development, AI integration, and cross-platform mobile application
          development. Proficient in Python, Flutter, and machine learning.
          Active in hackathons and technical conferences with strong analytical
          thinking and teamwork skills.
        </p>

        <div className="social-links">
          <button
            className="social-link"
            title="LinkedIn"
            aria-label="Open LinkedIn"
            onClick={() => onOpen("linkedin")}
          >
            {icons.linkedin}
          </button>
          <button
            className="social-link"
            title="GitHub"
            aria-label="Open GitHub"
            onClick={() => onOpen("github")}
          >
            {icons.github}
          </button>
          <button
            className="social-link"
            title="Email"
            aria-label="Open email composer"
            onClick={() => onOpen("mail")}
          >
            {icons.mail}
          </button>
        </div>
      </div>
    </div>
  );
}
