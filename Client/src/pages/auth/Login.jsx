import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/common/Form';
import { loginFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { toast } from "sonner"


const AuthLogin = ()=> {
  const initialState = {
    email:'',
    password:'',
  }

  const [ formData, setFormData ] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast.success(`${data?.payload?.message}`);
      } else {
        toast.error(`${data?.payload?.message}`);
      }
    }
  )
  }
   return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account ?
          <Link
            className="ml-2 hover:underline font-bold text-orange-400"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
)}

export default AuthLogin;