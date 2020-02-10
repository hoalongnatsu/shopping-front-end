/* Interface */
import { ProductState, Action } from 'interface';

import {
  GET_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  RESTORE_PRODUCT_SUCCESS
} from 'actions/products';

const initialState: ProductState[] = [];

export default function products(state: ProductState[] = initialState, action: Action): ProductState[] {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    case CREATE_PRODUCT_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return state.map((product) => {
        if (product._id === action.payload._id) { return action.payload; }

        return product;
      })
    }
    case DELETE_PRODUCT_SUCCESS: {
      return state.filter((product) => product._id !== action.payload);
    }
    case RESTORE_PRODUCT_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    default:
      return state;
  }
}