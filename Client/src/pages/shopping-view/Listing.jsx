import { ArrowUpDownIcon } from "lucide-react";
import ProductFilter from "../../components/shopping-view/ProductFilter";
import { sortOptions } from "../../config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/ShoppingProductTile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/ProductDetails";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";

function ShoppingListing() {
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state=>state.auth)
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleProductDetails(getProductId) {
    dispatch(fetchProductDetails(getProductId));
    // console.log(getProductId);
  }

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      const indexOfCurrentOptions =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOptions === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOptions, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  const handleAddToCart = (productId) => {
      dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then(
        (data) => {
          console.log(data);
          if(data?.payload?.success){
            dispatch(fetchCartItems({userId: user.id}))
          }
        }
      );
    };

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuieryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuieryString));
    }
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, filters, sort]);

  useEffect(()=>{
    if (productDetails !== null) 
     setOpenDetailsDialog(true)
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4">
      <ProductFilter handleFilter={handleFilter} filters={filters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(e) => setSort(e)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <ShoppingProductTile
                  key={product.id}
                  product={product}
                  handleProductDetails={handleProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
      />
    </div>
  );
}

export default ShoppingListing;
