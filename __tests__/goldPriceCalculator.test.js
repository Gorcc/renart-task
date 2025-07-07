// Gold Price Calculator with API integration test
describe('Gold Price Calculator', () => {
  
  beforeEach(() => {
    global.fetch.mockClear();
  });

  // Function that fetches gold price from API and converts to gram
  const getGoldPricePerGram = async () => {
    try {
      const response = await fetch("https://api.gold-api.com/price/XAU");
      const data = await response.json();
      const goldPricePerGram = data.price / 31.1035;
      return goldPricePerGram;
    } catch (error) {
      return 107.05; // Fallback price per gram
    }
  };

  it('should fetch real gold price from API and convert to gram', async () => {
    // Mock successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ price: 3325.45 }) // $3325.45 per ounce
    });

    const result = await getGoldPricePerGram();
    
    // Should convert to approximately $106.92 per gram
    expect(result).toBeCloseTo(106.92, 1);
    expect(global.fetch).toHaveBeenCalledWith("https://api.gold-api.com/price/XAU");
  });

  it('should use fallback price when API fails', async () => {
    // Mock API failure
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getGoldPricePerGram();
    
    // Should return fallback price
    expect(result).toBe(107.05);
  });

  it('should calculate product price with real API gold price', async () => {
    // Mock API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ price: 2000 }) // $2000 per ounce
    });

    const goldPricePerGram = await getGoldPricePerGram();
    
    // Calculate a ring price using real gold price
    const popularityScore = 0.8;
    const weight = 2.5; // grams
    const ringPrice = (popularityScore + 1) * weight * goldPricePerGram;
    
    // 2000 / 31.1035 = ~64.30 per gram
    // (0.8 + 1) * 2.5 * 64.30 = 289.35
    expect(ringPrice).toBeCloseTo(289.35, 1);
  });

  it('should calculate product price with fallback when API fails', async () => {
    // Mock API failure
    global.fetch.mockRejectedValueOnce(new Error('API down'));

    const goldPricePerGram = await getGoldPricePerGram();
    
    // Calculate ring price with fallback gold price
    const popularityScore = 0.7;
    const weight = 2.0;
    const ringPrice = (popularityScore + 1) * weight * goldPricePerGram;
    
    // (0.7 + 1) * 2.0 * 107.05 = 363.97
    expect(ringPrice).toBeCloseTo(363.97, 1);
  });
}); 