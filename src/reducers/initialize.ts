/* Interface */
import { ProductState, Action } from 'interface';

import {
  GET_TOP_SALE_PRODUCT_SUCCESS,
  GET_HOT_PRODUCTS_SUCCESS,
  GET_NEW_PRODUCTS_SUCCESS,
  GET_VIEWED_PRODUCTS_SUCCESS
} from 'actions/products';

export function top_sale_product(state: ProductState = {} as ProductState, action: Action): ProductState {
  switch (action.type) {
    case GET_TOP_SALE_PRODUCT_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}

export function hot_products(state: ProductState[] = [], action: Action): ProductState[] {
  switch (action.type) {
    case GET_HOT_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}

export function new_products(state: ProductState[] = [], action: Action): ProductState[] {
  switch (action.type) {
    case GET_NEW_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}

export function viewed_products(state: ProductState[] = [], action: Action): ProductState[] {
  switch (action.type) {
    case GET_VIEWED_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}