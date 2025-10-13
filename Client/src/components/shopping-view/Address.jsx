import { Card, CardContent, CardHeader, CardTitle, } from '../ui/card'
import CommonForm from '../../components/common/Form'
import { useState } from 'react';
import {addressFormControls} from '../../config/index'
import { useDispatch, useSelector} from 'react-redux'
import { addNewAddress, fetchAllAddress } from '../../store/shop/address-slice';

const initialFormData = {
  userId : '',
  address : '',
  city : '',
  pincode : '',
  phone : '',
  notes : '',
}

function Address() {
  const [formData, setFormData ] = useState(initialFormData)
  const dispatch = useDispatch()
  const { user } = useSelector(state=>state.auth)

  function handleManageAddress(e){
    e.preventDefault()
     console.log(user.id);
    dispatch(addNewAddress({ ...formData, userId : user.id})).then((items)=>{
      dispatch(fetchAllAddress({userId : user.id})).then(item=>console.log(item)
      )

      if(items.payload?.success){
        alert('Address successfully added')
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Add'}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
   );
}

export default Address;