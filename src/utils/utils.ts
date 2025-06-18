export function generateCustomId(prefix: string) {
  const now = new Date();

  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = now.getFullYear().toString().slice(-2);

  const dateCode = `${month}${year}`;
  const random = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${dateCode}-${random}`;
}

export type Variant = {
  colors: Record<
    string,
    {
      images: string[];
      sizes: Record<string, { quantity: number }>;
    }
  >;
};


//type checking for Product Variants 

export function validateVariant(obj: unknown): obj is Variant {
  if (typeof obj !== "object" || obj === null) return false;

  const variant = obj as Variant;

  if (!variant.colors || typeof variant.colors !== "object") return false;

  for (const colorKey in variant.colors) {
    const colorValue = variant.colors[colorKey];

    if (
      !Array.isArray(colorValue.images) ||
      !colorValue.images.every((img) => typeof img === "string")
    ) {
      return false;
    }

    if (
      typeof colorValue.sizes !== "object" ||
      colorValue.sizes === null
    ) {
      return false;
    }

    for (const sizeKey in colorValue.sizes) {
      const sizeValue = colorValue.sizes[sizeKey];

      if (
        typeof sizeValue !== "object" ||
        sizeValue === null ||
        typeof sizeValue.quantity !== "number"
      ) {
        return false;
      }
    }
  }

  return true;
}

