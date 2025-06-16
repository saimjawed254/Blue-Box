export function generateCustomId(prefix: string) {
  const now = new Date();

  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = now.getFullYear().toString().slice(-2);

  const dateCode = `${month}${year}`;
  const random = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${dateCode}-${random}`;
}
