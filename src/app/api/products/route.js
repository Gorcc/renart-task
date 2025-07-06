import { NextResponse } from "next/server";
import products from "../../../../products.json";

function calculatePrice(popularityScore, weight, goldPricePerGram) {
  return (popularityScore + 1) * weight * goldPricePerGram;
}

async function getGoldPricePerGram() {
  try {
    const response = await fetch("https://api.gold-api.com/price/XAU");
    const data = await response.json();

    const goldPricePerGram = data.price / 31.1035;

    return goldPricePerGram;
  } catch (error) {
    console.error("Failed to fetch gold price:", error);

    return 107.05; // Fallback
  }
}

// Filter
function parseFilters(searchParams) {
  const filters = {};

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice) filters.minPrice = parseFloat(minPrice);
  if (maxPrice) filters.maxPrice = parseFloat(maxPrice);

  const minPopularity = searchParams.get("minPopularity");
  const maxPopularity = searchParams.get("maxPopularity");
  if (minPopularity) filters.minPopularity = parseFloat(minPopularity);
  if (maxPopularity) filters.maxPopularity = parseFloat(maxPopularity);

  return filters;
}

function applyFilters(products, filters) {
  return products.filter((product) => {
    // Price range
    if (filters.minPrice && parseFloat(product.price) < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && parseFloat(product.price) > filters.maxPrice) {
      return false;
    }

    // Popularity score
    if (
      filters.minPopularity &&
      product.popularityScore < filters.minPopularity
    ) {
      return false;
    }
    if (
      filters.maxPopularity &&
      product.popularityScore > filters.maxPopularity
    ) {
      return false;
    }

    return true;
  });
}

async function getProducts(filters = {}) {
  const goldPricePerGram = await getGoldPricePerGram();

  const productsWithPrices = products.map((product, index) => {
    const price = calculatePrice(
      product.popularityScore,
      product.weight,
      goldPricePerGram
    );

    return {
      id: index + 1,
      name: product.name,
      popularityScore: product.popularityScore,
      weight: product.weight,
      price: price.toFixed(2),
      images: product.images,
    };
  });

  const filteredProducts =
    Object.keys(filters).length > 0
      ? applyFilters(productsWithPrices, filters)
      : productsWithPrices;

  return {
    goldPriceFromApi: goldPricePerGram.toFixed(2),
    totalProducts: filteredProducts.length,
    filters: filters,
    products: filteredProducts,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filters = parseFilters(searchParams);

  const result = await getProducts(filters);

  return NextResponse.json(result.products);
}
