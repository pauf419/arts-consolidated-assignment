"use client";

import { useRouter } from "next/navigation";
import styles from "./ErrorDisplay.module.css";

interface ErrorDisplayProps {
  title: string;
  message: string;
  showRetry?: boolean;
  showHome?: boolean;
}

export default function ErrorDisplay({
  title,
  message,
  showRetry = false,
  showHome = false,
}: ErrorDisplayProps) {
  const router = useRouter();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>{title}</h1>
        <p className={styles.errorMessage}>{message}</p>
        <div className={styles.errorActions}>
          {showRetry && (
            <button
              onClick={() => router.refresh()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          )}
          {showHome && (
            <button
              onClick={() => router.push("/")}
              className={styles.homeButton}
            >
              Go to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
