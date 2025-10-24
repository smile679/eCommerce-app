import { useState } from "react";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "../../store/common-slice";
import { useEffect } from "react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImagesList } = useSelector(state=>state.commonFeature);

  const dispatch = useDispatch()

 function handleUploadFeatureImage(){
    dispatch(addFeatureImage(uploadedImageUrl)).then(data=>{
      if(data?.payload?.success){
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl("")
        setImageLoadingState(false)
      }
    }
    )
  }

  useEffect(()=>{
    dispatch(getFeatureImages())
  }, [dispatch])
  
  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyle={'true'}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className='mt-3'>
        Upload
      </Button>
      <div>
        {
          featureImagesList && featureImagesList.length > 0 &&
          featureImagesList.map(imageItem=>(
            <img
            className="w-full h-[300px] object-cover rounded-2xl my-2"
            src={imageItem.image}/>
          ))
        }
      </div>
    </div>
   );
}

export default AdminDashboard;