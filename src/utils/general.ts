import { type Discount } from "~/components/Cart";
import { type Product } from "~/components/ProductCard";
import { type CartItem } from "~/stores";

export const roundToBankers = (num: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  const n = num * factor;

  if (n % 1 === 0.5) {
    return (Math.floor(n) % 2 === 0 ? Math.floor(n) : Math.ceil(n)) / factor;
  }

  return Math.round(n) / factor;
};

export const getTotalsFromCart = (items: CartItem[], products: Product[]) => {
  const totals = items.reduce(
    (acc, current) => {
      const currentPrice =
        products.find(({ id }) => id === current.product_id)?.price ?? 0;
      acc["total"] += currentPrice * current.quantity;
      acc["no"] += current.quantity;
      return acc;
    },
    { total: 0, no: 0 },
  );

  return {
    total: totals.total,
    no: totals.no,
  };
};

export const getDiscountAmount = (
  total: number,
  items: CartItem[],
  products: Product[],
  discount?: Discount,
) => {
  let discountAmount = 0;

  if (discount) {
    switch (discount.type) {
      case "FLAT":
        discountAmount = discount.amount ?? 0;
        break;
      case "PERCENTAGE":
        discountAmount = (total * (discount.amount ?? 0)) / 100;
        break;
      case "BOGO":
        items?.forEach((item) => {
          const currentPrice =
            products?.find(({ id }) => id === item.product_id)?.price ?? 0;
          const freeItems = Math.floor(item.quantity / 2);
          discountAmount += freeItems * currentPrice;
        });
        break;
    }
  }

  return discountAmount;
};
