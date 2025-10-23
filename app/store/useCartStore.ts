import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/api/types";

interface CartStore {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      addToCart: (product) => {
        if (!get().isInCart(product.id)) {
          set({ cart: [...get().cart, product] });
        }
      },
      clearCart: () => set({ cart: [] }),
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      isInCart: (id) => get().cart.some((item) => item.id === id),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
