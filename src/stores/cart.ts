import type { StateCreator } from "zustand";
import { create } from "zustand";
import { type Product } from "~/components/ProductCard";
import { type Discount } from "~/components/Cart";
import {
  getDiscountAmount,
  getTotalsFromCart,
  roundToBankers,
} from "~/utils/general";

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

interface CartState {
  itemsNo: number;
  totalAmount: number;
  cart: Cart | null;
  products: Product[];
  setProducts: (products: Product[]) => void;
  setCart: (cart?: Cart) => void;
  setTotalAmount: (totalAmount: number) => void;
  selectedDiscount?: Discount;
  setSelectedDiscount: (discount?: Discount) => void;
}

const cartStore: StateCreator<CartState> = (set, get) => ({
  itemsNo: 0,
  setCartItemsNo: (itemsNo: number) => {
    set({ itemsNo });
  },
  totalAmount: 0,
  setTotalAmount: (totalAmount: number) => {
    set({ totalAmount });
  },
  cart: null,
  setCart: (cart?: Cart) => {
    if (!cart || !cart.items.length) {
      set({
        cart: null,
        itemsNo: 0,
        totalAmount: 0,
        selectedDiscount: undefined,
      });
      return;
    }
    const { products, selectedDiscount } = get();
    const { total, no } = getTotalsFromCart(cart.items, products);

    const discountAmount = getDiscountAmount(
      total,
      cart.items,
      products,
      selectedDiscount,
    );
    const finalTotal = roundToBankers(Math.max(0, total - discountAmount));
    set({ cart, itemsNo: no, totalAmount: finalTotal });
  },
  products: [],
  setProducts: (products: Product[]) => {
    set({ products });
  },
  setSelectedDiscount: (discount?: Discount) => {
    const { cart, products, setTotalAmount } = get();
    set({ selectedDiscount: discount });

    const { total } = getTotalsFromCart(cart?.items ?? [], products);
    const discountAmount = getDiscountAmount(
      total,
      cart?.items ?? [],
      products,
      discount,
    );
    setTotalAmount(roundToBankers(Math.max(0, total - discountAmount)));
  },
});

export const useCartStore = create<CartState>(cartStore);
