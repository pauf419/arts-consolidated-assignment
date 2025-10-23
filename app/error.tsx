"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Something went wrong!</h1>
        <p className={styles.errorMessage}>
          {error.message || "An unexpected error occurred"}
        </p>
        <div className={styles.errorActions}>
          <button onClick={() => reset()} className={styles.retryButton}>
            Try again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className={styles.homeButton}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
