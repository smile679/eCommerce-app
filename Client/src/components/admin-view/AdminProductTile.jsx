import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete
}) {
  return (
    <Card className="w-full flex justify-between max-w-sm mx-auto py-0 gap-0">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-t-2xl"
          />
        </div>
        <CardContent className="px-4">
          <h2 className="text-xl font-bold">{product?.title}</h2>
          <div className="flex justify-between item-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold">
                {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-between items-center pb-2">
          <Button
            onClick={() => {
              setFormData(product);
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
            }}
            className="bg-orange-400 hover:bg-orange-400 cursor-pointer"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(product?._id)
            }}
             className="bg-orange-400 hover:bg-orange-400 cursor-pointer"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
