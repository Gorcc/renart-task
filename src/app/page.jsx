"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./styles/home.scss";
import "./globals.css";
import ProductCard from "./components/ProductCard";
import Slider from "react-slick";
import CarouselArrow from "./components/CarouselArrow";
import "./styles/loader.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CarouselArrow direction="right" />,
    prevArrow: <CarouselArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (loading) {
    return (
      <div className="home-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper">
        <h1 className="header-text">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <h1 className="header-text mb-6">Product List</h1>
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
