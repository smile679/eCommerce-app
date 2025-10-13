import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./UserCartItemContent";

function UserCartWrapper() {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount = cartItems && cartItems.length > 0 ?
  cartItems.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem?.salePrice > 0
        ? currentItem?.salePrice
        : currentItem?.price) * currentItem?.quantity,
    0
  ) : 0 ;

  return (
    <SheetContent className="sm:max-w-md px-4">
      <SheetHeader>
        <SheetTitle className="font-bold">Your Cart</SheetTitle>
      </SheetHeader>
      <div>
        {cartItems && cartItems.items && cartItems.items.length > 0 ? (
          cartItems.items.map((items) => (
            <UserCartItemsContent cartItems={items} />
          ))
        ) : (
          <p> Add items to Cart !</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button disabled={cartItems?.length < 1} className="w-full mt-5">
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
