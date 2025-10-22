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
          <Check className="w-4 h-4 absolute top-4 right-4" /> :
          <Button className="w-15 h-5 text-sm absolute top-2 right-4">
            select
          </Button>
        }
        <Label>ADDRESS : {addressInfo?.address}</Label>
        <Label>CITY : {addressInfo?.city}</Label>
        <Label>PINCODE : {addressInfo?.pincode}</Label>
        <Label>PHONE : {addressInfo?.phone}</Label>
        <Label>NOTES : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex max-[390px]:flex-col  py-0 px-1.5 justify-between">
        <Button 
          onClick={() => handleEditAddress(addressInfo)}
          className="max-[390px]:w-full mb-1"
        >Edit</Button>
        <Button 
          onClick={() => handleDeleteAddress(addressInfo?._id)}
          className="max-[390px]:w-full"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
