import React, { useState } from "react";
import { Button, Drawer, Input, Space } from "antd";

const Checkout = ({ open, onClose, subtotal, onOrder }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");

  const isOrderDisabled =
    firstName.trim() === "" || lastName.trim() === "" || contact.trim() === "";

  const handleOrder = () => {
    if (isOrderDisabled) {
      return;
    }
    const orderData = {
      firstName,
      lastName,
      contact,
    };
    onOrder(orderData);
  };

  return (
    <Drawer title="Checkout" onClose={onClose} visible={open} width={400}>
      <Space
        direction="vertical"
        style={{ width: "100%", paddingRight: "16px" }}
      >
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginTop: "8px" }}
        />
        <Input
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{ marginTop: "8px" }}
        />
        <div
          style={{ fontWeight: "bold", fontSize: "20px", marginTop: "16px" }}
        >
          Subtotal: ${Number(subtotal).toFixed(2)}
        </div>
        <Button
          type="primary"
          onClick={handleOrder}
          size="large"
          style={{
            marginTop: "16px",
            position: "absolute",
            right: 16,
            width: "35%",
            height: "7%",
          }}
          disabled={isOrderDisabled}
        >
          Order
        </Button>
      </Space>
    </Drawer>
  );
};

export default Checkout;
