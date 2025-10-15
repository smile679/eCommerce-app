import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import AdminOrdersDetailsView from "./Order-details";
import { useState } from "react";
import { Dialog, DialogHeader } from '../ui/dialog'


function AdminOrdersView() {
  const [ openDetailsDialog ,setOpenDetailsDialog ] = useState(false)


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
                  <AdminOrdersDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
   );
}

export default AdminOrdersView;