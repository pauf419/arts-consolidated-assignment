"use client";

import { useCartStore } from "@/app/store/useCartStore";
import styles from "./page.module.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, hasHydrated } = useCartStore();

  if (!hasHydrated) return <p>Loading cart...</p>;

  if (cart.length === 0) {
    return <h1 className={styles.emptyCartTitle}>Your cart is empty</h1>;
  }

  const totalItems = cart.reduce((sum, p) => sum + 1, 0);
  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className={`page-wrapper ${styles.pageContainer}`}>
      <div className={styles.pageContentWrapper}>
        <h1 className={styles.pageTitle}>Your Cart</h1>

        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemContent}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemInfo}>
                  <h2 className={styles.cartItemTitle}>{item.title}</h2>
                  <p className={styles.cartItemPrice}>Price: {item.price} €</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.cartSummary}>
          <p className={styles.summaryText}>Total items: {totalItems}</p>
          <p className={styles.summaryTotal}>
            Total price: {totalPrice.toFixed(2)} €
          </p>

          <button onClick={clearCart} className={styles.clearButton}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
