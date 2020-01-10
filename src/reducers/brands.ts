/* Interface */
import { BrandsState, Action } from 'interface';

import {
  GET_BRANDS_SUCCESS,
  CREATE_BRAND_SUCCESS,
  UPDATE_BRAND_SUCCESS,
  DELETE_BRAND_SUCCESS,
  RESTORE_BRAND_SUCCESS
} from 'actions/brands';

const initialState: BrandsState[] = [];

export default function brands(state: BrandsState[] = initialState, action: Action): BrandsState[] {
  switch (action.type) {
    case GET_BRANDS_SUCCESS: {
      return action.payload;
    }
    case CREATE_BRAND_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    case UPDATE_BRAND_SUCCESS: {
      return state.map((brand) => {
        if (brand._id === action.payload._id) { return action.payload; }

        return brand;
      })
    }
    case DELETE_BRAND_SUCCESS: {
      return state.filter((brand) => brand._id !== action.payload);
    }
    case RESTORE_BRAND_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    default:
      return state;
  }
}