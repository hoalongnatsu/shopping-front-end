/* Interface */
import { ColorsState, Action } from 'interface';

import {
  GET_COLORS_SUCCESS,
  CREATE_COLOR_SUCCESS,
  UPDATE_COLOR_SUCCESS,
  DELETE_COLOR_SUCCESS
} from 'actions/colors';

const initialState: ColorsState[] = [];

export default function colors(state: ColorsState[] = initialState, action: Action): ColorsState[] {
  switch (action.type) {
    case GET_COLORS_SUCCESS: {
      return action.payload;
    }
    case CREATE_COLOR_SUCCESS: {
      return state.length ? [...state, action.payload] : state;
    }
    case UPDATE_COLOR_SUCCESS: {
      return state.map((color) => {
        if (color._id === action.payload._id) { return action.payload; }

        return color;
      })
    }
    case DELETE_COLOR_SUCCESS: {
      return state.filter((color) => color._id !== action.payload);
    }
    default:
      return state;
  }
}