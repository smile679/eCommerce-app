import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./UserCartItemContent";

function UserCartWrapper() {
  const { cartItems } = useSelector((state) => state.shopCart);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.items && cartItems.items.length > 0 ? (
          cartItems.items.map((items) => (
            <UserCartItemsContent cartItems={items} />
          ))
        ) : (
          <p> Add items to Cart !</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
      </div>
      <Button className="w-full mt-5">Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
