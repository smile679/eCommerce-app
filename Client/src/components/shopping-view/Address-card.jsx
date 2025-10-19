import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  currentSelectedAddress,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      onClick={() => setCurrentSelectedAddress(addressInfo)}
      className="relative py-4 gap-4"
    >
      <CardContent className="grid p-4 gap-4">
        {
         currentSelectedAddress && currentSelectedAddress?._id === addressInfo?._id ?
          <Check className="w-4 h-4 absolute top-4 right-4" />
         : null
        }
        <Label>ADDRESS : {addressInfo?.address}</Label>
        <Label>CITY : {addressInfo?.city}</Label>
        <Label>PINCODE : {addressInfo?.pincode}</Label>
        <Label>PHONE : {addressInfo?.phone}</Label>
        <Label>NOTES : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex pt-0 justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
