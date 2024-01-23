import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space, Table } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderdata } from '../../app/features/orderdata';

const CartDrawer = ({ visible, onClose }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const orderdata = useSelector((state) => state.orderdata.orderdata);

  useEffect(() => {
    // Compare the current state with the new state before updating
    if (!areArraysEqual(products, orderdata)) {
      setProducts(orderdata);
    }
  }, [orderdata, products]);

  const handleIncrement = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);
    dispatch(setOrderdata(updatedProducts));
  };

  const handleDecrement = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
    dispatch(setOrderdata(updatedProducts));
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <Space>
          <Button type="text" icon={<MinusOutlined />} onClick={() => handleDecrement(record.id)} />
          {text}
          <Button type="text" icon={<PlusOutlined />} onClick={() => handleIncrement(record.id)} />
        </Space>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const dataSource = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: `$${product.price.toFixed(2)}`,
    quantity: product.quantity,
    total: `$${(product.price * product.quantity).toFixed(2)}`,
  }));

  const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);

  return (
    <Drawer title="Product Details" onClose={onClose} visible={visible} width={600}>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Subtotal: ${subtotal}</span>
      </div>
    </Drawer>
  );
};

// Utility function to compare two arrays for equality
function areArraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default CartDrawer;
