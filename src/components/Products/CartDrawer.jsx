import React, { useState, useEffect } from "react";
import { Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setOrderdata } from "../../app/features/orderdata";
import Checkout from "./Checkout";
import { table, span, ordBtn } from "./styles";

const CartDrawer = ({ visible, onClose }) => {
  const [products, setProducts] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  const orderdata = useSelector((state) => state.orderdata.orderdata);

  useEffect(() => {
    setProducts(orderdata);
    setIsCartEmpty(orderdata.every((product) => product.quantity === 0));
  }, [orderdata]);

  const handleIncrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.price !== undefined) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    const updatedProduct = updatedProducts.find(
      (product) => product.id === productId
    );
    dispatch(setOrderdata(updatedProduct));
  };

  const handleDecrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.price !== undefined &&
        product.quantity > 0
      ) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    const updatedProduct = updatedProducts.find(
      (product) => product.id === productId
    );
    dispatch(setOrderdata(updatedProduct));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            icon={<MinusOutlined />}
            onClick={() => handleDecrement(record.id)}
          />
          {text}
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => handleIncrement(record.id)}
          />
        </Space>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
    },
  ];

  const onOrder = async (data) => {
    const api = process.env.REACT_APP_API_URL;
    try {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const contact = data.contact;
      const orderDate = new Date();
      const paymentStatus = "Pending";
      const orderType = "Online";

      const orderPayload = {
        firstname: firstName,
        lastname: lastName,
        contact: contact,
      };

      const customerResponse = await fetch(api + "customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!customerResponse.ok) {
        throw new Error(
          `Failed to create a customer: ${customerResponse.statusText}`
        );
      }

      const customerData = await customerResponse.json();
      const customerId = customerData.id;

      const orderPatchPayload = {
        orderDate: orderDate,
        paymentStatus: paymentStatus,
        orderType: orderType,
      };

      const orderResponse = await fetch(`${api}customer/${customerId}/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPatchPayload),
      });

      if (!orderResponse.ok) {
        throw new Error(`Failed to add an order: ${orderResponse.statusText}`);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.id;

      for (const item of orderdata) {
        const orderDetailsPayload = {
          productid: item.id,
          qty: item.quantity,
          unitPrice: item.price,
        };

        const orderDetailsResponse = await fetch(
          `${api}customer/${customerId}/orders/${orderId}/details`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetailsPayload),
          }
        );

        if (!orderDetailsResponse.ok) {
          throw new Error(
            `Failed to add order details: ${orderDetailsResponse.statusText}`
          );
        }

        const orderDetailsData = await orderDetailsResponse.json();
      }

      alert("Order placed successfully! Your order ID is " + orderId + ".");
      setCartOpen(false);
      onClose();
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const dataSource = products
    .filter((product) => product.quantity > 0)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price:
        product.price !== undefined ? `${product.price.toFixed(2)}` : "N/A",
      quantity: product.quantity,
      total:
        product.price !== undefined
          ? `${(product.price * product.quantity).toFixed(2)}`
          : "N/A",
    }));

  const subtotal = products
    .filter((product) => product.price !== undefined)
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <Drawer
      title="Product Details"
      onClose={onClose}
      open={visible}
      width={600}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={table}>
        <span style={span}>Subtotal:  PKR {subtotal}</span>
      </div>
      <Button
        type="primary"
        style={ordBtn}
        disabled={
          isCartEmpty || orderdata.every((product) => product.quantity === 0)
        }
        onClick={() => setCartOpen(true)}
      >
        Checkout
      </Button>
      <Checkout
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        subtotal={subtotal}
        onOrder={onOrder}
      />
    </Drawer>
  );
};

export default CartDrawer;
