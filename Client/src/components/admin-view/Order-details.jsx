import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { useState } from "react";
import CommonForm from "../common/Form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";

function AdminOrdersDetailsView() {
  const [ formData, setFormData ] = useState({status : ''})
  const { orderDetails } = useSelector(state=>state.adminOrder)

  function handleUpdateStatus(e){
    e.preventDefault()
  }

  console.log(orderDetails);
  
  return (
    <DialogContent className="sm:max-w[600px]">
      <DialogTitle className="sr-only">Status</DialogTitle>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {
                orderDetails?.cartItems && orderDetails?.cartItems > 0 &&
                orderDetails?.cartItems.map(items=>(
                  <li className="flex items-center justify-between">
                    <span>Title : {items?.title}</span>
                    <span>Quantity : {items?.quantity}</span>
                    <span>Price : ${items?.price}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Jhon esu</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
        <div>
          {
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProccess", label: "In Proccess" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ]
                }
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={'Update Order Status'}
              onSubmit={handleUpdateStatus}
            />
          }
        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrdersDetailsView;