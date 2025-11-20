import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";;
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/ShoppingProductTile";
import { Skeleton } from "../../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import ProductDetailsDialog from "../../components/shopping-view/ProductDetails";
import { getFeatureImages } from "../../store/common-slice";
import { toast } from "sonner";
import Footer from "../../components/shopping-view/Footer"

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763638996/Pngtree_mens_dark_gray_suit_with_14745691_jebcvr.png" },
  { id: "women", label: "Women", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763638710/pngwing.com_12_mppbmr.png" },
  { id: "kids", label: "Kids", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763638692/pngwing.com_14_mgkqbt.png" },
  { id: "accessories", label: "Accessories", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763639412/Pngtree_essential_android_mobile_accessories_to_21154861_rmaucs.png" },
  { id: "footwear", label: "Footwear", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763644776/pngwing.com_16_-min_n0vrx6.png" },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636182/pngwing.com_5_lx2apy.png" },
  { id: "adidas", label: "Adidas", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636194/pngwing.com_7_ukqcvx.png" },
  { id: "puma", label: "Puma", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636201/pngwing.com_8_gvzrqw.png" },
  { id: "levi", label: "Levi's", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636207/pngwing.com_9_qrqqjn.png" },
  { id: "zara", label: "Zara", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636234/pngwing.com_10_z5vcn6.png" },
  { id: "h&m", label: "H&M", icon: "https://res.cloudinary.com/dineyc77u/image/upload/v1763636225/pngwing.com_11_iprpro.png" },
];

function ShoppingHome(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ openDetailsDialog ,setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { featureImagesList } = useSelector(state=>state.commonFeature);
  const navigate = useNavigate();

  function handleNavigateToListingPage(currentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [currentItem.id],
    };
    // setFilters(currentFilter)
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleAddToCart(productId) {
    dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems({ userId: user.id }));
          toast.success(`Item successfully added`)
        }
      }
    );
  }

  function handleProductDetails(getProductId) {
    dispatch(fetchProductDetails(getProductId));
    // console.log(getProductId);
  }

  useEffect(() => {
    if (!featureImagesList || featureImagesList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList?.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImagesList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

   useEffect(()=>{
    if (productDetails !== null) 
     setOpenDetailsDialog(true)
  }, [productDetails]);

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch])
  
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="relative w-full h-[550px] overflow-hidden">
        {featureImagesList && featureImagesList.length > 0 &&
        featureImagesList.map((imageItem, index) => (
          <img
            src={imageItem.image}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover object-right transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImagesList.length) % featureImagesList.length
            )
          }
        >
          <ChevronsLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList.length)
          }
        >
          <ChevronsRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="h-30 sm:h-50 flex justify-center items-center cursor-pointer hover:shadow-lg transition-shadow hover:scale-110"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <categoryItem.icon className="w-12 h-12 mb-4 text-green-400" /> */}
                  <img src={categoryItem.icon} alt="brand" className="w-full h-50 object-center object-contain"/>
                  <span className="font-bold text-orange-400 sr-only">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="h-30 sm:h-50 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow hover:scale-110"
              >
                <CardContent className="flex flex-col items-center justify-center">
                  <img src={brandItem.icon} alt="" />
                  <span className="font-bold sr-only">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">
            Shopping List
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <Skeleton className="w-10 h-10 bg-gray-200 rounded-full" />
            ) : productList && productList.length > 0 ? (
              productList.map((ProductItem) => (
                <ShoppingProductTile
                  handleProductDetails={handleProductDetails}
                  handleAddToCart={handleAddToCart}
                  product={ProductItem}
                />
              ))
            ) : (
              <p className="font-bold text-red-500">No Products Found !</p>
            )}
          </div>
        </div>
         <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog} 
          />
      </section>
      <Footer />
    </div>
  );
}

export default ShoppingHome;
