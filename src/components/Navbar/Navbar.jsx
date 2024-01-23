import React, { useState } from "react";
import { Menu, Space, Typography, Input } from "antd";
const { Search } = Input;

const navBarStyle = {
  backgroundColor: "#fff",
  borderBottom: "1px solid #e8e8e8",
  position: "fixed",
  width: "100%",
  zIndex: "999",
  height: "10%",
};

const menuStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const itemStyle = {
  margin: "0 10px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer",
  transition: "color 0.3s ease",
  background: "none",
};

const searchBar = {
  width: "100%",
  height: "5%",
  marginTop: "3%",
};

const items = {
  display: "flex",
  alignItems: "center",
  width: "33.33%",
  alignSelf: "flex-start",
  margin: "0",
};

const logoStyle = {
  width: "5%",
  height: "5%",
  marginRight: "5%",
  border: "2px solid #1890ff",
  background: "none",
};

const defaultColor = "#000";
const hoverColor = "#1890ff";

const Navbar = () => {
  const [itemColors, setItemColors] = useState({
    app: defaultColor,
    alipay1: defaultColor,
    alipay2: defaultColor,
  });

  const onItemMouseOver = (key) => {
    setItemColors((prevColors) => ({ ...prevColors, [key]: hoverColor }));
  };

  const onItemMouseOut = (key) => {
    setItemColors((prevColors) => ({ ...prevColors, [key]: defaultColor }));
  };

  const onSearch = (value) => console.log(value);

  return (
    <div style={navBarStyle}>
      <Menu mode="horizontal" style={menuStyle}>
        <div style={{ width: "33.33%", marginLeft: "5%" }}>
          <Typography.Title level={3} style={{ margin: "0" }}>
            Sufi Traders
          </Typography.Title>
        </div>
        <div style={items}>
          <Menu.Item
            key="app"
            style={{ ...itemStyle, color: itemColors.app }}
            onMouseOver={() => onItemMouseOver("app")}
            onMouseOut={() => onItemMouseOut("app")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="alipay1"
            style={{ ...itemStyle, color: itemColors.alipay1 }}
            onMouseOver={() => onItemMouseOver("alipay1")}
            onMouseOut={() => onItemMouseOut("alipay1")}
          >
            About
          </Menu.Item>
          <Menu.Item
            key="alipay2"
            style={{ ...itemStyle, color: itemColors.alipay2 }}
            onMouseOver={() => onItemMouseOver("alipay2")}
            onMouseOut={() => onItemMouseOut("alipay2")}
          >
            Contact
          </Menu.Item>
        </div>

        <div style={{ width: "33.33%" }}>
          <Menu.Item key="mail" style={{ marginLeft: "25%" }}>
            <Space direction="vertical">
              <Search
                placeholder="Search Product"
                onSearch={onSearch}
                style={searchBar}
              />
            </Space>
          </Menu.Item>
        </div>
      </Menu>
    </div>
  );
};

export default Navbar;
