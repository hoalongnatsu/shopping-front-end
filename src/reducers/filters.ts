/* Interface */
import { ProductFiltersState, Action } from 'interface';

import { CHANGE_PRODUCT_FILTERS, RESET_PRODUCT_FILTERS } from 'actions/filters';

const initialState: ProductFiltersState = {
  color_id: '',
  size: '',
  price_range: [],
  category_id: '',
  brand_id: '',
  page: 1
}

export function filters(state = initialState, action: Action): ProductFiltersState {
  switch (action.type) {
    case CHANGE_PRODUCT_FILTERS: {
      return action.payload;
    }
    case RESET_PRODUCT_FILTERS: {
      return { ...initialState, category_id: action.payload };
    }
    default:
      return state;
  }
}