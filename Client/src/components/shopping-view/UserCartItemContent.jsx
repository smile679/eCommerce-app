import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "../../store/shop/cart-slice";

function UserCartItemsContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleCartItemDelete(productId) {
    dispatch(deleteCartItem({ userId: user?.id, productId }));
  }

  function handleUpdateQuantity(cartItems, typeOfAction) {
    let newQuantity = cartItems?.quantity;

    if (typeOfAction === "plus") {
      newQuantity += 1;
    } else if (typeOfAction === "minus" && cartItems?.quantity > 1) {
      newQuantity -= 1;
    }
    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: cartItems?.productId,
        quantity : newQuantity,
      })
    );
  }

  return (
    <div className="flex justify-center items-center gap-5">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-15 h-15 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            disabled={ cartItems?.quantity === 1 }
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              ( cartItems?.salePrice > 0
                ? cartItems?.salePrice
                : cartItems?.price) * cartItems?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemDelete(cartItems?.productId)}
            className="cursor-pointer mt-1 size={20}" 
          />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
