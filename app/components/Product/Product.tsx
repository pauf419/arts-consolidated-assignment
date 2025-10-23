"use client";
import { Product } from "@/app/api/types";
import Link from "next/link";
import styles from "./Product.module.css";

interface ProductProps {
  product: Product;
}

export default function ProductComponent({ product }: ProductProps) {
  return (
    <Link href={`/products/${product.id}`} className={styles.productWrapper}>
      <img
        className={styles.productImage}
        src={product.images[0]}
        alt={product.title}
      />
      <div className={styles.productContentWrapper}>
        <div className={styles.productInfoWrapper}>
          <div className={styles.productInfoUnit}>
            <div className={styles.infoValue}>{product.title}</div>
          </div>
        </div>
        <div className={styles.productPriceWrapper}>{product.price}EUR</div>
      </div>

      <div className="badge badge-absolute badge-orange">
        {product.rating}
        <span>★</span>
      </div>
    </Link>
  );
}
