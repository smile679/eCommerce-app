import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


function ProductImmageUpload({ imageFile ,setImageFile, uploadedImageUrl, setUploadedImageUrl }) {

  const inputRef = useRef(null)

  const handleImageFileUpload =(e)=>{
    console.log(e.target.files?.[0]);
    const selectedFile = e.target.files[0]

    if(selectedFile) setImageFile(selectedFile);
  }
  return (
  <div className="w-full max-w-md mx-auto">
    <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
    <div>
      <Input id="image-upload" type="file"
       ref={inputRef}
       onChange={(e)=>handleImageFileUpload(e)}
       />
       {
        
       }
    </div>
    
  </div> );
}

export default ProductImmageUpload;