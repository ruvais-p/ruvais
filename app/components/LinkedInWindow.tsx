import { useEffect, useRef } from "react";

interface LinkedInWindowProps {
  onClose: () => void;
}

export default function LinkedInWindow({ onClose }: LinkedInWindowProps) {
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!hasOpened.current) {
      window.open("https://www.linkedin.com/in/ruvais-p/", "_blank");
      hasOpened.current = true;
    }

    const timeout = window.setTimeout(onClose, 200);
    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return null;
}
