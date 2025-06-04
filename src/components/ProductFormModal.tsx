import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useDispatch } from "react-redux";
import { Product, addProduct, editProduct } from "../features/products/productsSlice";
import { v4 as uuidv4 } from "uuid";

interface Props {
  visible: boolean;
  onClose: () => void;
  editingProduct?: Product | null;
}

const ProductFormModal: React.FC<Props> = ({ visible, onClose, editingProduct }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
    } else {
      form.resetFields();
    }
  }, [editingProduct, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const product: Product = {
          ...values,
          id: editingProduct?.id || uuidv4(),
        };
        if (editingProduct) {
          dispatch(editProduct(product));
        } else {
          dispatch(addProduct(product));
        }
        onClose();
        form.resetFields();
      })
      .catch((err) => console.log("Validation Failed:", err));
  };

  return (
    <Modal
      open={visible}
      title={editingProduct ? "Edit Product" : "Add Product"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={editingProduct ? "Update" : "Add"}
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select options={["Electronics", "Apparel", "Food"].map((c) => ({ label: c, value: c }))} />
        </Form.Item>
        <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.01} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
