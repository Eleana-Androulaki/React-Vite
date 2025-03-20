import { Badge, IconButton, Typography } from "@mui/material";
import { IconShoppingCart } from "@tabler/icons-react";
import Cart from "~/components/Cart";
import { useCartStore, useGeneralStore } from "~/stores";
import { roundToBankers } from "~/utils/general";

const Header = () => {
  const { itemsNo, totalAmount } = useCartStore();
  const { openModal } = useGeneralStore();
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">My Store</div>

      <div className="flex items-center space-x-4">
        <IconButton
          color="inherit"
          onClick={() => openModal(<Cart />, "cart-modal")}
        >
          {itemsNo ? (
            <Badge badgeContent={itemsNo} color="error">
              <IconShoppingCart size={24} />
            </Badge>
          ) : (
            <IconShoppingCart size={24} />
          )}
        </IconButton>

        <Typography variant="body1" className="text-md ml-2!">
          Total: {roundToBankers(totalAmount)} €
        </Typography>
      </div>
    </header>
  );
};

export default Header;
