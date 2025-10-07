import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../store/shop/cart-slice";

function UserCartItemsContent({ cartItems }) {
  const dispatch = useDispatch()
  const  { user } = useSelector(state=>state.auth)

  function handleCartItemDelete(productId){
    dispatch(deleteCartItem({ userId : user?.id , productId}))
  }

  function handleUpdateQuantity( cartItems, typeOfAction){
    const quantity = typeOfAction === "plus" ? cartItems?.quantity = 1 :  cartItems?.quantity = -1

    dispatch(updateCartQuantity({ userId : user.id , productId : cartItems?.productId , quantity}))
   }


  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={()=>handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={()=>handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div>
          <p>
            $
            {(
              (cartItems?.salePrice > 0
                ? cartItems?.salePrice
                : cartItems?.price) * cartItems?.quantity
            ).toFixed(2)}
          </p>
         <Trash onClick={()=>handleCartItemDelete(cartItems?.productId)} className="cursor-pointer mt-1 size={20}"/>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
