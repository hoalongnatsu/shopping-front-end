/* Interface */
import { ProductFiltersState, Action } from 'interface';

import { CHANGE_PRODUCT_FILTERS } from 'actions/filters';

export function product_filters(state: ProductFiltersState = {} as ProductFiltersState, action: Action): ProductFiltersState {
  switch (action.type) {
    case CHANGE_PRODUCT_FILTERS: {
      return action.payload;
    }
    default:
      return state;
  }
}