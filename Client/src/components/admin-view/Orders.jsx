import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import AdminOrdersDetailsView from "./Order-details";
import { useEffect, useState } from "react";
import { Dialog, DialogHeader } from '../ui/dialog'
import { useDispatch ,useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetAdminOrderDetails } from "../../store/admin/order-slice";

 
function AdminOrdersView() {
  const [ openDetailsDialog ,setOpenDetailsDialog ] = useState(false)
  const { orderList, orderDetails } = useSelector(state=>state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(getId){
    if(openDetailsDialog !== null) setOpenDetailsDialog(true)
    dispatch(getOrderDetailsForAdmin(getId))
  }

  function handleViewDetails(){
    setOpenDetailsDialog(false)
    dispatch(resetAdminOrderDetails())
  }

  useEffect(()=>{
    dispatch(getAllOrdersForAdmin())
  },[dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
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
              orderList && orderList.length > 0 &&
              orderList.map(orderItems=>(
                <TableRow>
                  <TableCell>{orderItems?._id}</TableCell>
                  <TableCell>{orderItems?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>{orderItems?.orderStatus}</TableCell>
                  <TableCell>${orderItems?.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={()=>handleFetchOrderDetails(orderItems?._id)}>
                      View Details
                    </Button>
                    <Dialog open={openDetailsDialog} onOpenChange={handleViewDetails}>
                      <AdminOrdersDetailsView setOpenDetailsDialog={setOpenDetailsDialog}/>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
              )
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
   );
}

export default AdminOrdersView;