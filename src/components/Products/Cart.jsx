import React, { useState, useEffect } from "react";
import { Badge, Space } from "antd";
import { useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import CartDrawer from "./CartDrawer";

const Cart = (props) => {
  const [count, setCount] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openCartDrawer = () => {
    setCartVisible(true);
  };

  const closeCartDrawer = () => {
    setCartVisible(false);
  };
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
        <FaIcons.FaShoppingCart
          size={isMobile ? "2em" : "2vw"}
          color="black"
          onClick={openCartDrawer}
        />
      </Badge>
      <CartDrawer visible={cartVisible} onClose={closeCartDrawer} />
    </Space>
  );
};

export default Cart;
