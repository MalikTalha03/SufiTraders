import React, { useState } from "react";
import { Menu, Typography, Drawer } from "antd";
import { Link } from "react-router-dom";
import Cart from "../Products/Cart";
import { MenuOutlined } from "@ant-design/icons";

const itemStyle = {
  margin: "0 10px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer",
  transition: "color 0.3s ease",
  background: "none",
};

const defaultColor = "#000";
const hoverColor = "#1890ff";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [itemColors, setItemColors] = useState({
    app: defaultColor,
    alipay1: defaultColor,
    alipay2: defaultColor,
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onItemMouseOver = (key) => {
    setItemColors((prevColors) => ({ ...prevColors, [key]: hoverColor }));
  };

  const onItemMouseOut = (key) => {
    setItemColors((prevColors) => ({ ...prevColors, [key]: defaultColor }));
  };

  return (
    <>
      <div style={{ ...navBarStyle, justifyContent: "space-between" }}>
        <div style={{ width: "30%", marginLeft: "5%" }}>
          <Typography.Title
            level={3}
            style={{ margin: "0", fontSize: '1rem' }}
          >
            Sufi Traders
          </Typography.Title>
        </div>
        <div style={{ display: "none", cursor: "pointer" }}>
          <MenuOutlined onClick={showDrawer} style={{ fontSize: "1.5rem" }} />
        </div>
        <div style={{ width: "50%", marginLeft: "25%" }}>
          <Menu
            mode="horizontal"
            style={{ display: "flex", alignItems: "center", background:"none" }}
          >
            <Menu.Item key="app">
              <Link
                to="/"
                style={{ ...itemStyle, color: itemColors.app }}
                onMouseOver={() => onItemMouseOver("app")}
                onMouseOut={() => onItemMouseOut("app")}
              >
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="alipay1">
              <Link
                to="/about"
                style={{ ...itemStyle, color: itemColors.alipay1 }}
                onMouseOver={() => onItemMouseOver("alipay1")}
                onMouseOut={() => onItemMouseOut("alipay1")}
              >
                About
              </Link>
            </Menu.Item>
            <Menu.Item key="alipay2">
              <Link
                to="/contact"
                style={{ ...itemStyle, color: itemColors.alipay2 }}
                onMouseOver={() => onItemMouseOver("alipay2")}
                onMouseOut={() => onItemMouseOut("alipay2")}
              >
                Contact
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <Cart
          style={{
            marginRight: "3%",
            paddingTop: "1%",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Menu mode="vertical">
          <Menu.Item key="app">
            <Link to="/" onClick={onClose}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="alipay1">
            <Link to="/about" onClick={onClose}>
              About
            </Link>
          </Menu.Item>
          <Menu.Item key="alipay2">
            <Link to="/contact" onClick={onClose}>
              Contact
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

const navBarStyle = {
  backgroundColor: "#fff",
  position: "fixed",
  width: "100%",
  zIndex: "999",
  height: "7%",
  display: "flex",
  alignItems: "center",
};

export default Navbar;
