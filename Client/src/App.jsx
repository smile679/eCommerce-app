import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashbord";
import AdminOrders from "./pages/admin-view/Order";
import AdminProducts from "./pages/admin-view/Product";
import AdminFeatures from "./pages/admin-view/Features";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping-view/Layout";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShoppingAccount from "./pages/shopping-view/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/UnauthPage";
import AuthRegister from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2Icon, LoaderIcon } from "lucide-react";

function App() {
  // const isAuthenticated = true
  // const isLoading = false
  // const user = null
  const { user, isAuthenticated, isLoading } = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  // console.log(user);
  
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <div className="w-full min-h-screen flex justify-center items-center">
    <LoaderIcon role="status"
      aria-label="Loading" width={30} height={30} className="items-center animate-spin"/>
      Loading..
  </div>
  // <Skeleton className="w-[800px] bg-black rounded-full" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={ <UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
