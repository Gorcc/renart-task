"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import StarRating from './StarRating'
import "../styles/ProductCard.scss"
const ProductCard = ({ product }) => {
  const [activeColor, setActiveColor] = useState('yellow'); // Default

  const colorLabels = {
    yellow: 'Yellow Gold',
    white: 'White Gold',
    rose: 'Rose Gold'
  };

  return (  
    
    <div className="product-card">
        
        <div className="product-image">
            {product?.images && (
              <Image
                src={product.images[activeColor]}
                alt={product.name}
                width={240}
                height={180}
                style={{ objectFit: 'contain' }}
              />
            )}
        </div>
        <h1 className='product-title'>{product?.name || 'Product Title'}</h1>
        <h1 className='price-text'>${product?.price || '100'} USD</h1>
        <div className='product-colors'>
            <button 
              className={activeColor === 'yellow' ? 'active' : ''}
              onClick={() => setActiveColor('yellow')}
            >
              Yellow Gold
            </button>
            <button 
              className={activeColor === 'white' ? 'active' : ''}
              onClick={() => setActiveColor('white')}
            >
              White Gold
            </button>
            <button 
              className={activeColor === 'rose' ? 'active' : ''}
              onClick={() => setActiveColor('rose')}
            >
              Rose Gold
            </button>
        </div>
        <p className='product-color'>{colorLabels[activeColor]}</p>
        <div className='product-stars reviews'>
          <StarRating rating={product?.popularityScore || 0} />
        </div>
    </div>
  )
}

export default ProductCard