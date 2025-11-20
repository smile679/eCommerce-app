import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "../../store/authSlice";
import { useDispatch } from 'react-redux'
import { shoppingViewHeaderMenuItems } from "../../config";
import { useSelector } from "react-redux";
import UserCartWrapper from "./Cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams,setSearchParams ] = useSearchParams()

  function handleNavigate(getCurrentItem){
    sessionStorage.removeItem('filters')
    const currentItem = getCurrentItem.id !== 'home' &&  getCurrentItem.id !== 'products' ?
    {
      category : [getCurrentItem.id]
    } : null;

    location.pathname.includes("listing") && currentItem !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)) :
    navigate(getCurrentItem.path)

    sessionStorage.setItem('filters', JSON.stringify(currentItem))
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          className="text-sm font-semibold cursor-pointer hover:-translate-y-0.5"
          onClick={()=>handleNavigate(menuItem)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  function handleLogout(){
    // dispatch(logoutUser()) use this in real projects when you buy domain names
    // to clear cookies but now we need to clear our token from sessionStorage
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate('/auth/login')
  }

  useEffect(()=>{
    if(user) return;
    dispatch(fetchCartItems({userId : user.id}))
  },[dispatch])

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-5">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <Button onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon' className='relative'>
          <ShoppingCart strokeWidth="2.5" className="w-6 h-6 text-green-400" />
          <span className="sr-only">User Cart</span>
          <span className="absolute -top-2 -right-1 font-bold text-sm text-white bg-orange-400 px-1 rounded-full">{cartItems?.items?.length || '0'}</span>
        </Button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet}/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-green-400 cursor-pointer">
            <AvatarFallback className="bg-green-400 text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
            <UserCog className="mr-2 h-4 w-4" />
             Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {

  return (
    <header className="fixed top-0 left-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img 
          src={"https://res.cloudinary.com/dineyc77u/image/upload/v1763633845/Gemini_Generated_Image_6b093b6b093b6b09-removebg-preview_sjsgje.png"}
           alt=""
           className="w-50"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div> 
    </header>
  );
}

export default ShoppingHeader;
