import { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import CommonForm from "../../components/common/Form";
import { addProductFormElements } from "../../config";


const initialState = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand : '',
  price : '',
  salePrice : '',
  totalStock : '',
}

 const onSubmit =(e)=>{
  e.preventDefault();
 }

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialState)

  return ( 
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductsDialog(true)} >Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={()=>setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="py-2">
            <CommonForm 
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={"Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
   );
}

export default AdminProducts;