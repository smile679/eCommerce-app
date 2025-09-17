import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({isAuthenticated, user, children}) {
  const location = useLocation();

  //if the user is not authenticated and if the user is trying to access pages without the login and logout pages
  //we will redirect them to the login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //if the user is authenticated and trying to access login or register pages
  // we will redirect him to admin/dashbord or shop/home  based on user.role
  if (
    isAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  //filtering normal user and admin user
  // normal authenticated user can't access admin page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // admin user can't access shopping pages
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <> {children} </>;
}

export default CheckAuth;
