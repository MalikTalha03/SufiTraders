import React from 'react'
import Card from './Card'

const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap : '4%',
  paddingTop: '7%',
}

const Product = () => {
  return (
    <div style={cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  )
}

export default Product