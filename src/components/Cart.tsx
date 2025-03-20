import { useEffect, useState } from "react";
import { useCartStore, useGeneralStore } from "~/stores";
import ProductCard, { type Product } from "~/components/ProductCard";
import api from "~/api";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { roundToBankers } from "~/utils/general";

export interface Discount {
  code: string;
  type: "FLAT" | "PERCENTAGE" | "BOGO";
  amount?: number;
}

const Cart = () => {
  const {
    cart,
    products,
    setCart,
    totalAmount,
    selectedDiscount,
    setSelectedDiscount,
  } = useCartStore();
  const { setLoading, openToast, closeModal } = useGeneralStore();
  const [items, setItems] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const handleDiscountChange = (event: any) => {
    const value = event.target.value;
    const discount = discounts.find(({ code }) => code === value);
    setSelectedDiscount(discount);
  };

  const addItem = async (product: Product) => {
    try {
      setLoading(true);

      const items = cart!.items.map((item) => {
        if (item.product_id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      const response = await api.put(`carts/${cart!.id}`, items);
      setCart(response?.data ?? []);
    } catch (_) {
      openToast(
        "Ooops, something went wrong, please try again later",
        "cart-api-error",
        {
          variant: "outlined",
          color: "error",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (product: Product, removeAll: boolean) => {
    try {
      setLoading(true);
      const items = removeAll
        ? cart!.items.filter(({ product_id }) => product_id !== product.id)
        : cart!.items.map((item) => {
            if (item.product_id === product.id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          });
      const response = await api.put(`carts/${cart!.id}`, items);
      setCart(response?.data ?? []);
    } catch (_) {
      openToast(
        "Ooops, something went wrong, please try again later",
        "cart-api-error",
        {
          variant: "outlined",
          color: "error",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const data = {
        cart_id: cart?.id,
        discount_code: selectedDiscount?.code,
      };
      await api.post(`orders`, data);
      setCart();
      openToast("Order has been placed successfuly!", "order-api-success", {
        variant: "filled",
        color: "success",
      });
    } catch (_) {
      openToast(
        "Ooops, something went wrong, please try again later",
        "order-api-error",
        {
          variant: "outlined",
          color: "error",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        const response = await api.get("discounts");
        setDiscounts(response?.data ?? []);
      } catch (_) {
        openToast(
          "Ooops, something went wrong, please try again later",
          "discounts-api-error",
          {
            variant: "outlined",
            color: "error",
          },
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDiscounts();
  }, [setLoading, openToast]);

  useEffect(() => {
    setItems(
      products?.filter(({ id }) =>
        cart?.items?.find(({ product_id }) => product_id === id),
      ) ?? [],
    );
    if (!cart?.items?.length) {
      closeModal("cart-modal");
    }
  }, [cart, products, closeModal]);

  return (
    <>
      <Typography variant="h5" className="font-bold mb-4">
        Shopping Cart
      </Typography>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="min-w-64">
          {items?.length > 0 &&
            items.map((item: Product) => (
              <ProductCard
                horizontalLayout
                key={item.id}
                product={item}
                onAdd={addItem}
                onRemoveItem={removeItem}
              />
            ))}
        </div>
        <div className="min-w-64 flex flex-col justify-between items-center gap-6 p-4 rounded-lg shadow-md">
          <FormControl fullWidth>
            <InputLabel>Discount</InputLabel>
            <Select
              label="Discount"
              value={selectedDiscount?.code ?? ""}
              onChange={handleDiscountChange}
            >
              {discounts.map((discount) => (
                <MenuItem key={discount.code} value={discount.code}>
                  {discount.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" className="font-bold">
            Total: {roundToBankers(totalAmount)} €
          </Typography>

          <Button onClick={placeOrder} variant="contained" color="primary">
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
