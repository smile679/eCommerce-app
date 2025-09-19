import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/common/Form';
import { loginFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';


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
        console.log(data?.payload?.success);
        alert(data?.payload?.message)
      } else {
        alert(data?.payload?.message )
        // console.log(data?.payload?.success, data?.payload?.message);
      }
    }
  )
  }

  console.log(formData)
   return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
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