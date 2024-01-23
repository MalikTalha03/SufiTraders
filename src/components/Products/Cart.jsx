import React, { useState, useEffect } from "react";
import { Avatar, Badge, Button, Space } from "antd";
import { useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
const Cart = (props) => {
  const [count, setCount] = useState(0);
  const orderdata = useSelector((state) => {
    const data = state.orderdata.orderdata;
    return data.filter((item) => item.quantity > 0);
  });

  useEffect(() => {
    setCount(orderdata.length);
  }, [orderdata]);

  return (
    <Space direction="vertical" style={props.style}>
      <Badge count={count}>
        <FaIcons.FaShoppingCart size={30} color="black" />
      </Badge>
    </Space>
  );
};

export default Cart;
