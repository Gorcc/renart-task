import React, { useState } from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import '../styles/Filter.scss';

const Filter = ({ onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minPopularity: 0,
    maxPopularity: 5
  });

  const handleRangeChange = (filterType, rangeType, value) => {
    const newValue = parseFloat(value);
    let newFilters = { ...filters };
    
    if (filterType === 'price') {
      const minKey = 'minPrice';
      const maxKey = 'maxPrice';
      
      if (rangeType === 'min') {
        newFilters[minKey] = Math.min(newValue, filters[maxKey]);
      } else {
        newFilters[maxKey] = Math.max(newValue, filters[minKey]);
      }
    } else if (filterType === 'popularity') {
      const minKey = 'minPopularity';
      const maxKey = 'maxPopularity';
      
      if (rangeType === 'min') {
        newFilters[minKey] = Math.min(newValue, filters[maxKey]);
      } else {
        newFilters[maxKey] = Math.max(newValue, filters[minKey]);
      }
    }
    
    setFilters(newFilters);
  };

  const applyFilters = () => {
    if (onFiltersChange) {
      // Convert 5-star rating back to 0-1 scale for API
      const apiFilters = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minPopularity: filters.minPopularity / 5,
        maxPopularity: filters.maxPopularity / 5
      };
      
      onFiltersChange(apiFilters);
    }
    setIsOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      minPrice: 0,
      maxPrice: 1000,
      minPopularity: 0,
      maxPopularity: 5
    };
    setFilters(defaultFilters);
  };

  return (
    <div className="filter-minimal">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon size={18} />
        Filter
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-row">
            <span className="filter-label">Price: ${filters.minPrice} - ${filters.maxPrice}</span>
            <div className="dual-range-container">
              <div className="range-track"></div>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.minPrice}
                onChange={(e) => handleRangeChange('price', 'min', e.target.value)}
                className="range-slider range-min"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.maxPrice}
                onChange={(e) => handleRangeChange('price', 'max', e.target.value)}
                className="range-slider range-max"
              />
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Rating: {filters.minPopularity.toFixed(1)} - {filters.maxPopularity.toFixed(1)} Stars</span>
            <div className="dual-range-container">
              <div className="range-track"></div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minPopularity}
                onChange={(e) => handleRangeChange('popularity', 'min', e.target.value)}
                className="range-slider range-min"
              />
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.maxPopularity}
                onChange={(e) => handleRangeChange('popularity', 'max', e.target.value)}
                className="range-slider range-max"
              />
            </div>
          </div>

          <div className="filter-buttons">
            <button onClick={resetFilters} className="reset-button">
              Reset
            </button>
            <button onClick={applyFilters} className="apply-button">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
