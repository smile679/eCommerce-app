import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../../components/common/Form";
import { useEffect, useState } from "react";
import { addressFormControls } from "../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "../../store/shop/address-slice";
import AddressCard from "./Address-card";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

function Address({ currentSelectedAddress ,setCurrentSelectedAddress}) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [ currentEditedId, setCurrentEditedId] = useState(null)

  function handleManageAddress(e) {
    e.preventDefault();
    currentEditedId !== null ?
       dispatch(editAddress({  userId: user?.id, addressId : currentEditedId, formData, })).then(
          (items) => {
            if (items.payload?.success) {
              dispatch(fetchAllAddress({ userId: user?.id }));
              setFormData(initialFormData);
              setCurrentEditedId(null)
            }
          }
        ) :

     addressList  && addressList.length < 3
      ? dispatch(addNewAddress({ ...formData, userId: user.id })).then(
          (items) => {
            if (items.payload?.success) {
              dispatch(fetchAllAddress({ userId: user?.id }));
              setFormData(initialFormData);
            }
          }
        )
      : alert(`You can't add more than 3 addresses`)
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDeleteAddress(getAddressId){
    dispatch(deleteAddress({userId : user.id, addressId : getAddressId })).then(items=>{
      if(items.payload?.success){
        dispatch(fetchAllAddress({ userId: user.id }))
      }
    })
  }

  function handleEditAddress(getAddressInfo){
    setCurrentEditedId(getAddressInfo?._id)
    setFormData({ ...formData,
      userId : getAddressInfo?.userId,
      address: getAddressInfo?.address,
      city: getAddressInfo?.city,
      pincode: getAddressInfo?.pincode,
      phone: getAddressInfo?.phone,
      notes: getAddressInfo.notes,
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddress({ userId: user.id }));
  }, [dispatch])

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((items) => 
          <AddressCard
            addressInfo={items}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
            currentSelectedAddress={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />)
          : null
          }
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId === null ? 'Add New Address' : 'Edit Address'} </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={ currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isbtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;