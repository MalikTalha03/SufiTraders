import React, { useState } from "react";
import { Button, Drawer, Input, Space } from "antd";
import { mainCont, input, subTotal, chkBtn } from "./styles";

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
      <Space direction="vertical" style={mainCont}>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={input}
        />
        <Input
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={input}
        />
        <div style={subTotal}>Subtotal: ${Number(subtotal).toFixed(2)}</div>
        <Button
          type="primary"
          onClick={handleOrder}
          size="large"
          style={chkBtn}
          disabled={isOrderDisabled}
        >
          Order
        </Button>
      </Space>
    </Drawer>
  );
};

export default Checkout;
