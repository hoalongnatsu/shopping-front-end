/* Interface */
import { UserState, Action } from 'interface';

import {
  REQUEST_USER,
  LOGIN_SUCCESS
} from 'actions/user';

const initialState: UserState = {
  username: '',
  email: '',
  jwt: '',
  admin: ''
};

export default function user(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case REQUEST_USER: {
      return action.payload;
    }
    case LOGIN_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}