import React from "react";
import Card from "./Card";
import { fetchProducts } from "../../app/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { cardContainer, main, searchBar } from "./styles";

const Product = () => {
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    dispatch(fetchProducts());

    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  const allProducts = useSelector((state) =>
    state.products.products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.inventory,
    }))
  );

  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={{ ...main, paddingTop: isMobile ? "15%" : 0 }}>
      <Input
        placeholder="Search Product"
        style={{
          ...searchBar,
          width: isMobile ? "50%" : "15%",
          height: isMobile ? "15%" : "5%",
          marginBottom: isMobile ? "5%" : 0,
        }}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div style={cardContainer}>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
