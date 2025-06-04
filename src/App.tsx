import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Product, deleteProducts } from "./features/products/productsSlice";
import FilterControls from "./components/FilterControls";
import ProductFormModal from "./components/ProductFormModal";
import ProductTable from "./components/ProductTable";
import CategoryPieChart from "./components/CategoryChart";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    dispatch(deleteProducts(ids));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  

  return (
    // Added a light background color and minimum height, centered content
    <div className="py-8 min-h-screen bg-gray-100">
      {/* Max width container to center content on large screens */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Enhanced Title */}
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
          Inventory Dashboard
        </h1>

        {/* Chart Section - Wrapped in a modern card */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Product Categories Overview</h2>
          <CategoryPieChart />
        </div>

        {/* Main Content Section (Controls & Table) - Wrapped in another modern card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col gap-4 justify-between items-start mb-6 md:flex-row md:items-center">
            {/* Filter controls will go here */}
            <div className="flex-grow w-full md:w-auto"> {/* Allow filters to take space */}
               <FilterControls />
            </div>

            {/* Add Product Button - Added full width on small screens */}
            <Button type="primary" onClick={() => setModalOpen(true)} className="w-full md:w-auto">
              Add Product
            </Button>
          </div>

          {/* Product Table Component */}
          <ProductTable
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
          />

          {/* Delete Selected Button - Styled and positioned */}
          {selectedRowKeys.length > 0 && (
            <div className="flex justify-end mt-6"> {/* Added margin-top and aligned right */}
              <Popconfirm
                title={`Delete ${selectedRowKeys.length} selected products?`}
                onConfirm={() => {
                  // Assuming selectedRowKeys are indeed strings (product IDs)
                  handleDelete(selectedRowKeys as string[]);
                  setSelectedRowKeys([]); // Clear selection after deletion
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete Selected ({selectedRowKeys.length})</Button>
              </Popconfirm>
            </div>
          )}
        </div>

        {/* Product Form Modal (remains invisible when not open) */}
        <ProductFormModal
          visible={modalOpen}
          onClose={handleModalClose}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
};

export default App;