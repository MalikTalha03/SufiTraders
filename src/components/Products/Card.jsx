import React, { useState } from "react";
import { Card, Button } from "antd";
import PropTypes from "prop-types"; // Import PropTypes for type-checking
import * as FaIcons from "react-icons/fa";
import logo from "../../Sufi_ccexpress.png";
import { setOrderdata, updateOrderdata } from "../../app/features/orderdata";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProdCard = (props) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const orderdata = useSelector((state) => state.orderdata.orderdata);

  const handleAddToCart = () => {
    console.log(props);
    if (quantity < props.quantity) {
      setQuantity(quantity + 1);
      dispatch(
        setOrderdata({
          id: props.id,
          name: props.name,
          quantity: quantity + 1,
          price: props.price,
        })
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      // Dispatch an action to update the quantity in the orderdata in the store
      dispatch(
        updateOrderdata({
          id: props.id,
          quantity: quantity - 1,
          price: props.price,
        })
      );
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: "3%",
        backgroundColor: "#f5f5f5",
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
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          {props.name}
        </span>
        <span style={{ fontSize: "14px", color: "#666" }}>
          Price: {props.price}
        </span>
        {quantity === 0 ? (
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              style={{ background: "none", border: "none" }}
              onClick={handleRemoveFromCart}
              icon={<FaIcons.FaMinus color="black" />}
            />
            <span style={{ margin: "0 10px", fontSize: "16px" }}>
              {quantity}
            </span>
            <Button
              type="primary"
              style={{ background: "none", border: "none" }}
              onClick={handleAddToCart}
              icon={<FaIcons.FaPlus color="black" />}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

// Define propTypes for type-checking
ProdCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProdCard;
