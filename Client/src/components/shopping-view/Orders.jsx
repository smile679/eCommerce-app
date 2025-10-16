import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import ShoppingOrdersDetailsView from "./Order-details";
import { useState } from "react";



function ShoppingOrders() {
  const [ openDetailsDialog ,setOpenDetailsDialog ] = useState(false)

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
            <TableRow>
              <TableCell>1245132</TableCell>
              <TableCell>21/23/2024</TableCell>
              <TableCell>pending</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Button onClick={()=>setOpenDetailsDialog(true)}> 
                  View Details
                </Button>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <ShoppingOrdersDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
   );
}

export default ShoppingOrders;