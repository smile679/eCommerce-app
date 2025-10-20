import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import ShoppingOrdersDetailsView from "./Order-details";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "../../store/shop/order-slice";

function ShoppingOrders() {
  const [ openDetailsDialog ,setOpenDetailsDialog ] = useState(false)
  const  { user } = useSelector(state=>state.auth)
  const  { orderList, orderDetails } = useSelector(state=>state.shopOrder)
  const dispatch =useDispatch()

  function handleFetchOrderDetail(getId){
    dispatch(getOrderDetails(getId)).then(data=>console.log(data)
    )
  }

  useEffect(()=>{
    if(orderDetails !== null) setOpenDetailsDialog(true)
  },[dispatch])

  useEffect(()=>{
    dispatch(getAllOrdersByUserId(user?.id))
  },[dispatch])
  
  return ( 
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList?.length > 0 &&
              orderList?.map(orderItem=>
                <TableRow>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.slice('T')[0]}</TableCell>
                  <TableCell>{orderItem?.orderStatus}</TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={()=>handleFetchOrderDetail(orderItem?._id)}>
                      View Details
                    </Button>
                    <Dialog 
                      open={openDetailsDialog}
                      onOpenChange={()=>{
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                      }}>
                      <ShoppingOrdersDetailsView />
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
   );
}

export default ShoppingOrders;