import CarouselArrow from "../components/CarouselArrow";

export const getSliderSettings = (products, hasMultipleProducts, handleSlideChange) => {
  const slidesToShow = Math.min(4, products.length);
  
  return {
    dots: false,
    infinite: hasMultipleProducts && products.length >= slidesToShow, 
    speed: 500,
    arrows: hasMultipleProducts,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <CarouselArrow direction="right" />,
    prevArrow: <CarouselArrow direction="left" />,
    variableWidth: false,
    centerMode: false,
    beforeChange: handleSlideChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: Math.min(2, products.length),
          infinite: hasMultipleProducts && products.length >= Math.min(2, products.length),
          arrows: hasMultipleProducts,
          beforeChange: handleSlideChange
        },
      },
      {
        breakpoint: 600,
        settings: { 
          slidesToShow: 1,
          infinite: hasMultipleProducts,
          arrows: false,
          beforeChange: handleSlideChange
        },
      },
    ],
  };
};

// Slider config
export const SLIDER_SPEEDS = {
  NORMAL: 500,
  FAST: 300,
  SLOW: 800
};

export const BREAKPOINTS = {
  TABLET: 1024,
  MOBILE: 600
};

export const DEFAULT_SLIDES_TO_SHOW = {
  DESKTOP: 4,
  TABLET: 2,
  MOBILE: 1
}; 