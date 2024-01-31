import React from "react";
import Card from "./Card";
import { fetchProducts } from "../../app/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { cardContainer, main, searchBar } from "./styles";
import { Skeleton } from "antd";

const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    setIsLoding(true);
    setTimeout(() => {
      setIsLoding(false);
    }, 2000);
  }, []);
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
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          filteredProducts.map((product) => {
            if (product.quantity > 0) {
              return (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Product;
