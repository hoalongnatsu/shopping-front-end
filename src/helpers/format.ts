export function formatToCurrencyVND(number: number): string {
  if (number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
  }

  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)
}