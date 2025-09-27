import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "../../config";



function ShoppingProductTile({product}) {
  console.log(product);
  
  return (
    <Card className="w-full max-w-sm mx-auto py-0">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          {
            product?.salePrice > 0 ? 
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
                Sale
              </Badge> : null
          }
        </div>
        <CardContent className='p-4'>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
            <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
            {
              product?.salePrice > 0 ? <span className="text-lg font-semibold text-primary">${product?.salePrice}</span> : null
            }
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full mb-3'>
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;