export type Variant = {
  colors: Record<
    string,
    {
      images: string[];
      sizes: Record<string, { quantity: number }>;
    }
  >;
};