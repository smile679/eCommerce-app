import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "../../components/shopping-view/Address";
import UserCartItemsContent from "../../components/shopping-view/UserCartItemContent";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";

function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress , setCurrentSelectedAddress] =  useState(null)
  const dispatch = useDispatch()

  const totalCartAmount =
    cartItems &&
    cartItems.items &&
    cartItems.items.length > 0 ? 
    cartItems.items.reduce(
      (sum, currentItem) =>
        sum +
        (currentItem?.salePrice > 0
          ? currentItem?.salePrice
          : currentItem?.price) *
          currentItem?.quantity,
      0
    ) : 0

    // console.log(currentSelectedAddress, 'currentSelectedAddress');
    
    function handleInitiatePaypalPayment(){
      const orderData = {
        userId : user?.id,
        cartId : cartItems?.id,
        cartItems : cartItems?.items?.map(singleItems=>({
          productId : singleItems?.productId,
          title : singleItems?.title,
          image : singleItems?.image,
          price : singleItems?.salePrice > 0 ? singleItems?.salePrice : singleItems?.price,
          quantity : singleItems?.quantity,
        })),
        addressInfo : {
          addressId : currentSelectedAddress?._id,
          address : currentSelectedAddress?.address,
          city : currentSelectedAddress?.city,
          pincode : currentSelectedAddress?.pincode,
          phone : currentSelectedAddress?.phone,
          notes  : currentSelectedAddress?.notes,
        },
        orderStatus : 'pending',
        paymentMethod : 'paypal',
        paymentStatus : 'pending',
        totalAmount : totalCartAmount,
        orderDate : new Date(),
        orderUpdateDate : new Date(),
        paymentId : '',
        payerId : '',
      }

      currentSelectedAddress ? 
      dispatch(createNewOrder(orderData)).then(data=>console.log(data)
      ) : alert('Please Add At Least address')
      
    }

  return (
    <div className="flex flex-col">
      <div className="relattive h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address 
          currentSelectedAddress={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className=" flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItems={item} />
              ))
            : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button
              onClick={()=>handleInitiatePaypalPayment()}
              className='w-full'>Checkout with paypal</Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
