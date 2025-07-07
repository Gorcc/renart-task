"use client";
import React, { useState } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import "../styles/ProductCard.scss";
import ColorPicker from "./ColorPicker";

const ProductCard = ({ product }) => {
  const [activeColor, setActiveColor] = useState("yellow"); // Default

  const colorLabels = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product?.images && (
          <Image
            src={product.images[activeColor]}
            alt={product.name}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 600px) 280px, (max-width: 900px) 260px, (max-width: 1200px) 280px, 300px"
          />
        )}
      </div>
      <h1 className="product-title">{product?.name || "Product Title"}</h1>
      <h1 className="price-text">${product?.price || "100"} USD</h1>
      <ColorPicker
        activeColor={activeColor}
        onColorChange={setActiveColor}
        colorLabels={colorLabels}
      />
      <p className="product-color">{colorLabels[activeColor]}</p>
      <div className="product-stars reviews">
        <StarRating rating={product?.popularityScore || 0} />
      </div>
    </div>
  );
};

export default ProductCard;
