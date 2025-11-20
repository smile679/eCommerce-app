import { Outlet } from "react-router-dom";

function AuthLayout () {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden sm:flex items-center justify-center bg-orange-400 w-1/2 pt-5 lg:pt-15 px-5 lg:px-15">
        <div className="w-full flex flex-col text-center text-primary-foreground">
          <h1 className="w-full text-xl md:text-2xl lg:text-3xl font-extrabold ">
            <span>Welcome</span> <br/> to Merkato ECommerce Shopping
          </h1>
          <img src={"https://res.cloudinary.com/dineyc77u/image/upload/v1763649623/login_rreohv.png"} className="w-full"/>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout ;