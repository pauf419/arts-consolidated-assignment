"use server";

import { Product } from "@/app/api/types";
import styles from "./page.module.css";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";

import { notFound } from "next/navigation";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import { fetchWithRetry } from "@/app/api/api";

async function getProduct(productId: string) {
  if (!productId || isNaN(Number(productId))) {
    return { product: null, error: "invalid" };
  }

  try {
    const product = await fetchWithRetry<Product>(
      `https://dummyjson.com/products/${productId}`
    );

    if (!product || !product.id) {
      return { product: null, error: "not_found" };
    }

    return { product, error: null };
  } catch (error) {
    console.error(`Failed to fetch product ${productId}:`, error);
    return {
      product: null,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { product, error } = await getProduct(productId);

  if (error === "invalid" || error === "not_found") {
    notFound();
  }

  if (error || !product) {
    return (
      <ErrorDisplay
        title="Failed to load product"
        message="We couldn't load this product. There was a network error."
        showRetry
        showHome
      />
    );
  }

  return (
    <div className={`page-wrapper ${styles.pageContainer}`}>
      <div className={styles.pageThumbnailWrapper}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={styles.pageContentWrapper}>
        <div className={styles.productMainInfoSection}>
          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.productStats}>
            <div className="badge badge-orange">
              {product.rating}
              <span>★</span>
            </div>
          </div>
        </div>
        <div className={styles.productPriceSection}>
          <h2 className={styles.productPrice}>{product.price}EUR</h2>
          <div className="badge badge-orange">
            {product.discountPercentage}% OFF
          </div>
        </div>

        <p className={styles.productDescription}>{product.description}</p>
      </div>
      <div className={styles.cartButtonWrapper}>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
