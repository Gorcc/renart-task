import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselArrow({ direction, onClick, className, style }) {
  return (
    <button
      onClick={onClick}
      className={`carousel-arrow ${className || ''}`}
      aria-label={direction === "left" ? "Previous" : "Next"}
      style={{
        ...style,
        background: "none",
        border: "none",
        boxShadow: "none",
        width: "auto",
        height: "auto",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {direction === "left" ? (
        <ChevronLeft className="arrow-icon" color="#222" strokeWidth={1} />
      ) : (
        <ChevronRight className="arrow-icon" color="#222" strokeWidth={1} />
      )}
    </button>
  );
} 