/* Interface */
import { UserState, Action } from 'interface';

import {
  REQUEST_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER
} from 'actions/user';

const initialState: UserState = {} as UserState;

export default function user(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case REQUEST_USER: {
      return action.payload;
    }
    case LOGIN_SUCCESS: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return {} as UserState;
    }
    default:
      return state;
  }
}