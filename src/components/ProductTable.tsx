import React from "react";
import { Popconfirm, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Product } from "../features/products/productsSlice";

interface Props {
  onEdit: (product: Product) => void;
  onDelete: (ids: string[]) => void;
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (keys: React.Key[]) => void;
  };
}

const ProductTable: React.FC<Props> = ({ onEdit, onDelete, rowSelection }) => {
  const products = useSelector((state: RootState) => state.products.items);
  console.log(products)
  const { items, filter } = useSelector((state: RootState) => state.products);

  const filteredProducts = items.filter((p) => {
    const matchCategory =
      filter.categories.length === 0 || filter.categories.includes(p.category);
    const matchStock = !filter.inStockOnly || p.stock > 0;
    return matchCategory && matchStock;
  });
  const columns: ColumnsType<Product> = [
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        { text: "Electronics", value: "Electronics" },
        { text: "Apparel", value: "Apparel" },
        { text: "Food", value: "Food" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock: number) => (
        <span>
          {stock < 5 ? (
            <span className="font-semibold text-red-500">
              {stock} (Low)
            </span>
          ) : (
            <span>{stock}</span>
          )}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <a onClick={() => onEdit(record)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => onDelete([record.id])}
            okText="Yes"
            cancelText="No"
          >
            <a className="text-red-500">Delete</a>
          </Popconfirm>
        </div>
      )
    }
  ];
  return (
    <Table
      rowKey="id"
      dataSource={filteredProducts}
      columns={columns}
      rowSelection={rowSelection}
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ProductTable;
