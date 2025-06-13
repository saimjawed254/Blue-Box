export const productData = {
  "best-sellers": [
    { id: 1, name: "Heritage Blazer", price: 199, tags: ["formal", "wool"] },
    { id: 2, name: "Urban Cargo Pants", price: 89, tags: ["cargo", "tapered"] },
    { id: 3, name: "Classic Trench Coat", price: 229, tags: ["coat", "waterproof"] },
  ],
  "new-arrivals": [
    { id: 4, name: "Minimal Linen Shirt", price: 59, tags: ["linen", "summer"] },
    { id: 5, name: "Wide Fit Denim", price: 99, tags: ["denim", "casual"] },
  ],
  "cargos": [
    { id: 6, name: "Tapered Fit Cargo - Olive", price: 89, tags: ["olive", "tapered"] },
    { id: 7, name: "Tapered Fit Cargo - Black", price: 89, tags: ["black", "tapered"] },
    { id: 8, name: "Utility Cargo Pants", price: 95, tags: ["multi-pocket"] },
  ],
  "suits": [
    { id: 9, name: "Wool Blend Suit - Navy", price: 299, tags: ["navy", "formal"] },
    { id: 10, name: "Wool Blend Suit - Grey", price: 299, tags: ["grey", "business"] },
  ],
};


export const filters = {
  "best-sellers": {
    priceRange: [50, 250],
    tags: ["formal", "wool", "cargo", "coat"],
  },
  "new-arrivals": {
    priceRange: [50, 120],
    tags: ["linen", "denim", "casual"],
  },
  "cargos": {
    priceRange: [80, 100],
    tags: ["olive", "black", "multi-pocket", "tapered"],
  },
  "suits": {
    priceRange: [250, 350],
    tags: ["navy", "grey", "formal", "business"],
  },
};
