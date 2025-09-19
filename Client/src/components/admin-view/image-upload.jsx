import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axios from 'axios';


function ProductImageUpload({ imageFile ,setImageFile, uploadedImageUrl, setUploadedImageUrl }) {

  const inputRef = useRef(null)

  const handleImageFileUpload =(e)=>{
    e.preventDefault()
    const selectedFile = e.target.files[0];

    if(selectedFile) setImageFile(selectedFile);
  }

  const handleDrop = (e)=>{
    e.preventDefault()
    const selectedFile = e.dataTransfer.files?.[0];
    if(selectedFile) setImageFile(selectedFile)
  }

  const handleDragOver = (e)=>{
    e.preventDefault();
  }

  const handleRemoveImage = ()=>{
    setImageFile(null)
    if(inputRef.current){
      inputRef.current = ''
    }
  }

  const uploadImageToCloudinary =async (imageFile)=>{
    const data = new FormData();
    data.append('file_path',imageFile);
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
    console.log(response.data.result.url);
    if(response.data.success) setUploadedImageUrl(response.data.result.url);
  }

  useEffect(()=>{
    if(imageFile) uploadImageToCloudinary(imageFile)
  },[imageFile])

  return (
  <div className="w-full max-w-md mx-auto">
    <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="border-2 border-dashed rounded-lg p-4" >
      <Input id="image-upload" type="file"
        ref={inputRef}
        onChange={handleImageFileUpload}
        className='hidden'
      />
       { !imageFile ?
          <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cusrsor-pointer">
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
            <span>Drag & drop or click to upload image</span>
          </Label> :
          <div className="flex items-center justify-between">
            <div className="flex items-item">
              <FileIcon className="w-8 text-primary mr-2 h-8"/>
            </div>
            <p className="text-sm font-medium text-pretty">{imageFile?.name}</p>
            <Button variant='ghost' size="Icon" className='text-muted-foreground hover:text-foreground'
              onClick={handleRemoveImage}>
                <XIcon className="w-4 h-4"/>
                <span className="sr-only">Remove File</span>
            </Button>
          </div>
       }
    </div>
    
  </div> );
}

export default ProductImageUpload;