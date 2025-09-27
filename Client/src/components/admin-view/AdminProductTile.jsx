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
    <Card>
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>
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
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setFormData(product);
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(product?._id)
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
