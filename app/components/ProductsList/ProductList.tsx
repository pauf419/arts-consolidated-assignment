"use client";
import { Product } from "@/app/api/types";
import ProductComponent from "../Product/Product";
import styles from "./ProductList.module.css";
import Pagination from "../Pagination/Pagination";

interface ProductListProps {
  products: Product[];
  total: number;
  currentPage: number;
  limit: number;
}

export default function ProductList({
  products = [],
  total = 0,
  currentPage,
  limit,
}: ProductListProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.total}>Total: {total}</p>
      </div>

      <div className={styles.productListWrapper}>
        {products.length ? (
          products.map((product: Product) => (
            <ProductComponent key={product.id} product={product} />
          ))
        ) : (
          <h1>There are no products</h1>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
