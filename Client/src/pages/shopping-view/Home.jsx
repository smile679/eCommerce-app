import {
  BabyIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CloudLightning, 
  Shirt,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
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

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: ShirtIcon },
  { id: "adidas", label: "Adidas", icon: ShirtIcon },
  { id: "puma", label: "Puma", icon: ShirtIcon },
  { id: "levi", label: "Levi's", icon: ShirtIcon },
  { id: "zara", label: "Zara", icon: ShirtIcon },
  { id: "h&m", label: "H&M", icon: ShirtIcon },
];

function ShoppingHome() {
  const slides = [bannerOne, bannerTwo, bannerThree];
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
          alert(`Item successfully added`);
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
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
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
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
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
    </div>
  );
}

export default ShoppingHome;
