import React from "react";
import { Card, Button } from "antd";
import logo from "../../Sufi_ccexpress.png";

const ProdCard = () => (
  <Card
    hoverable
    style={{
      width: 240,
      marginBottom: "3%",
    }}
    cover={<img alt="example" src={logo} />}
  >
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "bold" }}>Product Name</span>
      <span>Price: $19.99</span>
      <Button type="primary">Add to Cart</Button>
    </div>
  </Card>
);

export default ProdCard;
