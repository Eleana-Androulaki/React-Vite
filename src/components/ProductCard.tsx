import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { roundToBankers } from "~/utils/general";
import { useCartStore, type CartItem } from "~/stores";
import { useEffect, useState } from "react";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product, isInCart?: boolean) => void;
  onRemoveItem: (product: Product, removeAll: boolean) => void;
  horizontalLayout?: boolean;
}

const ProductCard = ({
  product,
  onAdd,
  onRemoveItem,
  horizontalLayout = false,
}: ProductCardProps) => {
  const { cart } = useCartStore();
  const [itemInCart, setItemInCart] = useState<CartItem | null>(null);

  useEffect(() => {
    const itemInCart = cart?.items?.find(
      ({ product_id }) => product_id === product.id,
    );
    if (itemInCart) {
      setItemInCart(itemInCart);
      return;
    }
    setItemInCart(null);
  }, [cart, product]);

  return (
    <Card
      className="shadow-lg p-4 my-2"
      sx={{
        display: horizontalLayout ? "flex" : "inherit",
        width: horizontalLayout ? "100%" : "256px",
        justifyContent: horizontalLayout ? "space-between" : "inherit",
      }}
    >
      <CardContent>
        <Typography variant="h6" className="font-bold">
          {product.name}
        </Typography>
        <Typography color="textSecondary">
          Price: {roundToBankers(product.price)} €
        </Typography>
        <Typography color={product.stock > 0 ? "success" : "error"}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </Typography>
      </CardContent>
      <CardActions>
        {itemInCart ? (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-green-500 rounded-md">
              <IconButton
                onClick={() => onRemoveItem(product, itemInCart.quantity <= 1)}
              >
                <IconMinus />
              </IconButton>
              <Typography>{itemInCart.quantity}</Typography>
              <IconButton
                onClick={() => onAdd(product, true)}
                disabled={itemInCart.quantity >= product.stock}
              >
                <IconPlus />
              </IconButton>
            </div>
            <IconButton
              onClick={() => onRemoveItem(product, true)}
              color="error"
            >
              <IconTrash />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={product.stock === 0}
            onClick={() => onAdd(product)}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
