import { AnyAction } from 'redux';

export const CHANGE_PRODUCT_FILTERS = 'CHANGE_PRODUCT_FILTERS';
export const RESET_PRODUCT_FILTERS = 'RESET_PRODUCT_FILTERS';

export function change_product_filters(
  color_id: string,
  size: string,
  price_range: number[],
  category_id: string,
  brand_id: string,
  page: number
): AnyAction {
  return {
    type: CHANGE_PRODUCT_FILTERS,
    payload: { color_id, size, price_range, category_id, brand_id, page }
  }
}

export function reset_product_filters(category_id: string): AnyAction {
  return {
    type: RESET_PRODUCT_FILTERS,
    payload: category_id
  }
}