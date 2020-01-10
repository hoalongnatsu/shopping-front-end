/* Interface */
import { TrashState, Action } from 'interface';

import { RESTORE_COLOR_SUCCESS, REMOVE_COLOR_SUCCESS } from 'actions/colors';
import { RESTORE_BRAND_SUCCESS, REMOVE_BRAND_SUCCESS } from 'actions/brands';
import {
  GET_TRASH_COLORS_SUCCESS,
  GET_TRASH_BRANDS_SUCCESS
} from 'actions/trash';

const initialState: TrashState = {
  colors: [],
  brands: []
};

export default function trash(state: TrashState = initialState, action: Action): TrashState {
  switch (action.type) {
    case GET_TRASH_COLORS_SUCCESS: {
      return { ...state, colors: action.payload};
    }
    case RESTORE_COLOR_SUCCESS: {
      return { ...state, colors: state.colors.filter((color) => color._id !== action.payload._id) };
    }
    case REMOVE_COLOR_SUCCESS: {
      return { ...state, colors: state.colors.filter((color) => color._id !== action.payload) };
    }
    case GET_TRASH_BRANDS_SUCCESS: {
      return { ...state, brands: action.payload};
    }
    case RESTORE_BRAND_SUCCESS: {
      return { ...state, brands: state.brands.filter((brand) => brand._id !== action.payload._id) };
    }
    case REMOVE_BRAND_SUCCESS: {
      return { ...state, brands: state.brands.filter((brand) => brand._id !== action.payload) };
    }
    default:
      return state;
  }
}