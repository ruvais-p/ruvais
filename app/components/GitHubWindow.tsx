import { useEffect, useRef } from "react";

interface GitHubWindowProps {
  onClose: () => void;
}

export default function GitHubWindow({ onClose }: GitHubWindowProps) {
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!hasOpened.current) {
      window.open("https://github.com/ruvais-p", "_blank");
      hasOpened.current = true;
    }

    const timeout = window.setTimeout(onClose, 200);
    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return null;
}
