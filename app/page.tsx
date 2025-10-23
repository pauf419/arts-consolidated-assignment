"use server";
import { ProductsResponse } from "./api/types";
import ProductList from "./components/ProductsList/ProductList";

import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import { fetchWithRetry } from "./api/api";

async function getProducts(currentPage: number, limit: number) {
  const skip = (currentPage - 1) * limit;

  try {
    const data = await fetchWithRetry<ProductsResponse>(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 12;

  const { data, error } = await getProducts(currentPage, limit);

  if (error || !data) {
    return (
      <ErrorDisplay
        title="Failed to load products"
        message="We couldn't load the products. Please try again."
        showRetry
      />
    );
  }

  return (
    <div className="page-wrapper">
      <ProductList
        products={data.products}
        total={data.total}
        currentPage={currentPage}
        limit={limit}
      />
    </div>
  );
}
