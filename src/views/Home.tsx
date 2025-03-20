import { useEffect } from "react";
import api from "~/api";
import ProductCard, { type Product } from "~/components/ProductCard";
import { useCartStore, useGeneralStore } from "~/stores";

const Home = () => {
  const { setLoading, openToast } = useGeneralStore();
  const { cart, setCart, products, setProducts } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("products");
        setProducts(response?.data ?? []);
      } catch (_) {
        openToast(
          "Ooops, something went wrong, please try again later",
          "products-api-error",
          {
            variant: "outlined",
            color: "error",
          },
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [openToast, setLoading, cart, setProducts]);

  const addItem = async (product: Product, isInCart: boolean = false) => {
    try {
      setLoading(true);
      if (!cart) {
        const createdCart = await api.post("carts", { product });
        const location = createdCart.headers.location;
        const response = await api.put(location, [
          {
            product_id: product.id,
            quantity: 1,
          },
        ]);
        setCart(response?.data ?? []);
        return;
      }
      let items = [];

      if (isInCart) {
        items = cart.items.map((item) => {
          if (item.product_id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        items = [...cart.items, { product_id: product.id, quantity: 1 }];
      }
      const response = await api.put(`carts/${cart.id}`, items);
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
  return (
    <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products?.length > 0 &&
        products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addItem}
            onRemoveItem={removeItem}
          />
        ))}
    </div>
  );
};

export default Home;
