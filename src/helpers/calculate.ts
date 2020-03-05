export function calculatePriceSale(sale: number, price: number) {
  if (sale) {
    const minus_price = (sale/100) * price;
    return price - minus_price;
  }

  return price;
}