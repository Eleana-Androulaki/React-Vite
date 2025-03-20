import { describe, it, expect } from "vitest";
import {
  roundToBankers,
  getTotalsFromCart,
  getDiscountAmount,
} from "./general";
import { type CartItem } from "~/stores";
import { type Product } from "~/components/ProductCard";
import { type Discount } from "~/components/Cart";

describe("roundToBankers", () => {
  it("should round to nearest even number when exactly .5", () => {
    expect(roundToBankers(2.5, 0)).toBe(2);
    expect(roundToBankers(3.5, 0)).toBe(4);
    expect(roundToBankers(4.5, 0)).toBe(4);
    expect(roundToBankers(5.5, 0)).toBe(6);
  });

  it("should round normally otherwise", () => {
    expect(roundToBankers(2.4, 0)).toBe(2);
    expect(roundToBankers(2.6, 0)).toBe(3);
    expect(roundToBankers(3.1, 0)).toBe(3);
  });
});

describe("getTotalsFromCart", () => {
  const products: Product[] = [
    { id: "1", price: 10, name: "Product 1", stock: 3 },
    { id: "2", price: 20, name: "Product 2", stock: 4 },
  ];

  const cart: CartItem[] = [
    { product_id: "1", quantity: 2 },
    { product_id: "2", quantity: 1 },
  ];

  it("should calculate total and number of items in cart", () => {
    const totals = getTotalsFromCart(cart, products);
    expect(totals).toEqual({ total: 40, no: 3 });
  });

  it("should return zero when cart is empty", () => {
    const totals = getTotalsFromCart([], products);
    expect(totals).toEqual({ total: 0, no: 0 });
  });
});

describe("getDiscountAmount", () => {
  const products: Product[] = [
    { id: "1", price: 50, name: "Product 1", stock: 3 },
    { id: "2", price: 100, name: "Product 2", stock: 6 },
  ];

  const cart: CartItem[] = [
    { product_id: "1", quantity: 3 },
    { product_id: "2", quantity: 2 },
  ];

  it("should calculate flat discount", () => {
    const discount: Discount = { type: "FLAT", code: "FLAT", amount: 20 };
    expect(getDiscountAmount(350, cart, products, discount)).toBe(20);
  });

  it("should calculate percentage discount", () => {
    const discount: Discount = {
      type: "PERCENTAGE",
      code: "PERCENTAGE",
      amount: 10,
    };
    expect(getDiscountAmount(350, cart, products, discount)).toBe(35);
  });

  it("should calculate BOGO discount", () => {
    const discount: Discount = { type: "BOGO", code: "BOGO" };
    expect(getDiscountAmount(350, cart, products, discount)).toBe(150);
  });

  it("should return zero if no discount is applied", () => {
    expect(getDiscountAmount(350, cart, products)).toBe(0);
  });
});
