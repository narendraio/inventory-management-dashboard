import React from "react";
import { Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryFilter,
  setInStockOnly,
} from "../features/products/productsSlice";
import { RootState } from "../store/store";

const categoryOptions = ["Electronics", "Apparel", "Food"];

const FilterControls: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, inStockOnly } = useSelector(
    (state: RootState) => state.products.filter
  );

  const handleCategoryChange = (values: string[]) => {
    dispatch(setCategoryFilter(values));
  };

  const handleStockToggle = (e: any) => {
    dispatch(setInStockOnly(e.target.checked));
  };

  return (
    <div className="flex flex-col gap-4 items-start mb-4 md:flex-row md:items-center">
      <div>
        <span className="mr-2 font-medium">Category:</span>
        <Select
          mode="multiple"
          allowClear
          style={{ minWidth: 200 }}
          placeholder="Select categories"
          value={categories}
          onChange={handleCategoryChange}
          options={categoryOptions.map((cat) => ({
            label: cat,
            value: cat,
          }))}
        />
      </div>
      <div>
        <Checkbox checked={inStockOnly} onChange={handleStockToggle}>
          Show in-stock only
        </Checkbox>
      </div>
    </div>
  );
};

export default FilterControls;
