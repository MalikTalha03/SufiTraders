import React from 'react'
import Card from './Card'
import { fetchProducts } from '../../app/features/products'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap : '3%',
  padding: '7% 3% 7% 3%',
  height: '100%'
}

const Product = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
        console.log('fetching products')
    }, [dispatch])
    const products = useSelector((state) =>
    state.products.products
      .filter((product) => product.inventory > 0)
      .map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.inventory,
      }))
  );

    console.log(products)
  return (
    <div style={cardContainer}>
        {products.map((product) => (
            <Card
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            />
        ))}
    </div>
  )
}

export default Product