"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./styles/home.scss";
import "./styles/Filter.scss";
import "./globals.css";
import ProductCard from "./components/ProductCard";
import Slider from "react-slick";
import CarouselArrow from "./components/CarouselArrow";
import "./styles/loader.css";
import Filter from "./components/Filter";
import { getSliderSettings } from "./constants/sliderSettings";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      
      if (Object.keys(filters).length > 0) {
        queryParams.append('minPrice', filters.minPrice || 0);
        queryParams.append('maxPrice', filters.maxPrice || 1000);
        queryParams.append('minPopularity', filters.minPopularity || 0);
        queryParams.append('maxPopularity', filters.maxPopularity || 1);
      }
      
      const queryString = queryParams.toString();
      const url = `/api/products${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      setSlideIndex(0); // Reset
      setLastSlideIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters) => {
    fetchProducts(filters);
  };

  // Calculate how many slides we have based on slidesToShow
  const getSlideCount = () => {
    const slidesToShow = Math.min(4, products.length);
    return Math.max(0, products.length - slidesToShow);
  };

  const handleScrollbarChange = (e) => {
    const slideIndex = parseInt(e.target.value);
    setSlideIndex(slideIndex);
    setLastSlideIndex(slideIndex);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideIndex);
    }
    

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  };

  const handleSlideChange = (current, next) => {
    const slideCount = getSlideCount();
    
    // Detect if we've looped back to the beginning due to infinite scroll
    if (slideCount > 0 && lastSlideIndex === slideCount && next === 0) {
      
      resetTimeoutRef.current = setTimeout(() => {
        setSlideIndex(0);
      }, 100);
    } else {
      setSlideIndex(next);
    }
    
    setLastSlideIndex(next);
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);



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

  const slideCount = getSlideCount();
  const showScrollbar = slideCount > 0;

  return (
    <div className="home-wrapper">
      <h1 className="header-text mb-6">Product List</h1>
      <div className="filter-wrapper">
        <Filter onFiltersChange={handleFiltersChange} />
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your filters.</p>
        </div>
      ) : (
        <div className="carousel-container">
          <Slider 
            ref={sliderRef}
            {...getSliderSettings(products, products.length > 1, handleSlideChange)}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
          
          {showScrollbar && (
            <div className="carousel-scrollbar">
              <input
                type="range"
                min={0}
                max={slideCount}
                value={slideIndex}
                onChange={handleScrollbarChange}
                className="scrollbar-slider"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
