import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/Form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllProducts, 
  addNewProduct,
  editProduct,
  deleteProduct
} from '../../store/admin/products-slice/index'
import AdminProductTile from "../../components/admin-view/AdminProductTile";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [ currentEditedId,setCurrentEditedId ] = useState(null)
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

   
  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null ?
      dispatch(editProduct({
        id : currentEditedId, formData : { ...formData, image: uploadedImageUrl }
      })).then(data=>{
        if(data.payload?.success){
          dispatch(fetchAllProducts())
          setFormData(initialState);
          setImageFile(null);
          setCurrentEditedId(null);
          setOpenCreateProductsDialog(false);
          alert("Product edited successfully.");
        }
      }) :
    dispatch(
      addNewProduct({ ...formData, image: uploadedImageUrl })
    ).then((data) => {
        if (data?.payload?.success){
          dispatch(fetchAllProducts());
          setFormData(initialState);
          setImageFile(null);
          setOpenCreateProductsDialog(false);
          alert("Product added successfully.");
        }
      })
  };

  function isFormValid(){
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item)=> item);
  } 

  function handleDelete(getProductId){
    dispatch(deleteProduct(getProductId)).then(data=>{
        if(data.payload?.success){
          dispatch(fetchAllProducts())
        }
      })
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map((productItem)=>(
            <AdminProductTile
              key={productItem?._id}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          )) : null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() =>{
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
         }
        }
      >
        <SheetContent side="right" className="overflow-auto px-5">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="py-2">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isbtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
