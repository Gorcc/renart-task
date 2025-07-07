// Simple price calculator test
describe('Product Price Calculator', () => {
  
  // Main price calculation formula: (popularityScore + 1) * weight * goldPricePerGram
  const calculateProductPrice = (popularityScore, weight, goldPricePerGram) => {
    return (popularityScore + 1) * weight * goldPricePerGram;
  };

  it('should calculate product price correctly', () => {
    // Example: Ring with 0.8 popularity, 2g weight, $100/gram gold
    const price = calculateProductPrice(0.8, 2, 100);
    
    // (0.8 + 1) * 2 * 100 = 1.8 * 2 * 100 = 360
    expect(price).toBe(360);
  });

  it('should work with real world values', () => {
    // Realistic example: popularity 0.65, weight 2.5g, gold $107/gram
    const price = calculateProductPrice(0.65, 2.5, 107);
    
    // (0.65 + 1) * 2.5 * 107 = 1.65 * 2.5 * 107 = 441.375
    expect(price).toBeCloseTo(441.38, 2);
  });

  it('should handle minimum popularity (0)', () => {
    // Minimum popularity case
    const price = calculateProductPrice(0, 1, 100);
    
    // (0 + 1) * 1 * 100 = 100
    expect(price).toBe(100);
  });

  it('should handle maximum popularity (1)', () => {
    // Maximum popularity case  
    const price = calculateProductPrice(1, 1, 100);
    
    // (1 + 1) * 1 * 100 = 200
    expect(price).toBe(200);
  });

  it('should work with different ring weights', () => {
    const goldPrice = 107; // Fixed gold price
    const popularity = 0.7; // Fixed popularity
    
    // Test different weights
    expect(calculateProductPrice(popularity, 1.5, goldPrice)).toBeCloseTo(272.85, 2);
    expect(calculateProductPrice(popularity, 2.0, goldPrice)).toBeCloseTo(363.8, 2);
    expect(calculateProductPrice(popularity, 3.0, goldPrice)).toBeCloseTo(545.7, 2);
  });
}); 