import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, maxStars = 5, size = 16 }) => {
  const starRating = rating * maxStars;
  
  const stars = [];
  
  for (let i = 1; i <= maxStars; i++) {
    let starType;
    
    if (i <= Math.floor(starRating)) {
      // Full star
      starType = 'full';
    } else if (i <= Math.ceil(starRating) && starRating % 1 !== 0) {
      // Half star
      starType = 'half';
    } else {
      // Empty star
      starType = 'empty';
    }
    
    stars.push(
      <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
        {starType === 'full' && (
          <Star 
            size={size} 
            fill="#E6CA97" 
            color="#E6CA97" 
          />
        )}
        {starType === 'half' && (
          <>
            <Star 
              size={size} 
              fill="none" 
              color="#E5E5E5" 
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <div style={{ 
              overflow: 'hidden', 
              width: '50%', 
              position: 'relative',
              zIndex: 1
            }}>
              <Star 
                size={size} 
                fill="#E6CA97" 
                color="#E6CA97" 
              />
            </div>
          </>
        )}
        {starType === 'empty' && (
          <Star 
            size={size} 
            fill="none" 
            color="#E5E5E5" 
          />
        )}
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {stars}
      <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>
        {starRating.toFixed(1)}/5
      </span>
    </div>
  );
};

export default StarRating; 