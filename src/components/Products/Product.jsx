import React from 'react'
import Card from './Card'
import { fetchProducts } from '../../app/features/products'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Input } from 'antd'

const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap : '3%',
  padding: '1% 3% 7% 3%',
  height: '100%'
}

const searchBar = {
    width: "15%",
    height: "5%",
    marginTop: "6%",
    alignSelf: "flex-end",
    marginRight: "5%",
  };

  const Product = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchProducts());
      console.log('fetching products');
    }, [dispatch]);
  
    const allProducts = useSelector((state) =>
      state.products.products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.inventory,
      }))
    );
  
    const [searchValue, setSearchValue] = useState('');
    
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Input
          placeholder="Search Product"
          style={searchBar}
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