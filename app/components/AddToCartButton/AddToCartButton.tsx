"use client";
import { useCartStore } from "@/app/store/useCartStore";
import styles from "./AddToCartButton.module.css";
import { Product } from "@/app/api/types";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart, isInCart, removeFromCart } = useCartStore();

  const alreadyInCart = isInCart(product.id);
  return (
    <button
      className={styles.buttonWrapper}
      onClick={() =>
        !alreadyInCart ? addToCart(product) : removeFromCart(product.id)
      }
    >
      {alreadyInCart ? "Product is already in cart" : "Add to cart"}
    </button>
  );
}
