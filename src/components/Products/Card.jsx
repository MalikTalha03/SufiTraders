import React, { useState } from "react";
import { Card, Button } from "antd";
import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";
import logo from "../../Sufi_ccexpress.png";
import { setOrderdata } from "../../app/features/orderdata";
import { useDispatch } from "react-redux";
import {
  cardMain,
  cardItems,
  nameSpan,
  priceSpan,
  addCartBtn,
  btnGrp,
  cartBtn,
  qtySpan,
} from "./styles";

const ProdCard = (props) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

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
      dispatch(
        setOrderdata({
          id: props.id,
          name: props.name,
          quantity: quantity - 1,
          price: props.price,
        })
      );
    }
  };

  return (
    <Card hoverable style={cardMain} cover={<img alt="example" src={logo} />}>
      <div style={cardItems}>
        <span style={nameSpan}>{props.name}</span>
        <span style={priceSpan}>Price: {props.price}</span>
        {quantity === 0 ? (
          <Button type="primary" style={addCartBtn} onClick={handleAddToCart}>
            Add to Cart
          </Button>
        ) : (
          <div style={btnGrp}>
            <Button
              type="primary"
              style={cartBtn}
              onClick={handleRemoveFromCart}
              icon={<FaIcons.FaMinus color="black" />}
            />
            <span style={qtySpan}>{quantity}</span>
            <Button
              type="primary"
              style={cartBtn}
              onClick={handleAddToCart}
              icon={<FaIcons.FaPlus color="black" />}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

ProdCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProdCard;
