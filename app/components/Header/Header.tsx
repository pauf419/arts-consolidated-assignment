"use client";

import Link from "next/link";
import { useCartStore } from "@/app/store/useCartStore";
import styles from "./Header.module.css";

export default function Header() {
  const { cart, hasHydrated } = useCartStore();

  const itemCount = hasHydrated ? cart.length : 0;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.siteName}>
          Store
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/cart" className={styles.cartLink}>
            <span className={styles.cartIcon}>🛒</span>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
