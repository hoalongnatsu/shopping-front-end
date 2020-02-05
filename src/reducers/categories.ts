/* Interface */
import { CategorySate, Action } from 'interface';

import {
  GET_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from 'actions/categories';

const initialState: CategorySate[] = [];

export default function categories(state: CategorySate[] = initialState, action: Action): CategorySate[] {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      return action.payload;
    }
    case CREATE_CATEGORY_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    case UPDATE_CATEGORY_SUCCESS: {
      return state.map((category) => {
        if (category._id === action.payload._id) { return action.payload; }

        return category;
      })
    }
    case DELETE_CATEGORY_SUCCESS: {
      return state.filter((category) => category._id !== action.payload);
    }
    default:
      return state;
  }
}