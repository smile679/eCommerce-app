import { Fragment } from "react";
import { filterOptions } from "../../config";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div>
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment key={keyItem}>
              <div className="my-5">
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((item) => (
                    <Label
                      key={item.id}
                      className="flex items-center gap-2 font-medium"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(item.id) > -1
                        }
                        onCheckedChange={() => handleFilter(keyItem, item.id)}
                      />
                      {item.label}
                    </Label>
                  ))}
                </div>
              </div>
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
