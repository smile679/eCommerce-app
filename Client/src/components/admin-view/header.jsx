import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import { resetTokenAndCredentials } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function handleLogout() {
    // dispatch(logoutUser()) use this in real projects when you buy domain names
    // to clear cookies but now we need to clear our token from sessionStorage
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate('/auth/login')
  } 

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-orange-400 hover:bg-orange-500"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;