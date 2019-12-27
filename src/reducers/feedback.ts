/* Interface */
import { FeedbackState, Action } from 'interface';

import { SET_ERROR_MESSAGE } from 'actions/feedback';

const initialState: FeedbackState = {
  error: ''
}

export default function feedback(state: FeedbackState = initialState, action: Action): FeedbackState {
  switch (action.type) {
    case SET_ERROR_MESSAGE: {
      return { ...state, error: action.payload }
    }
    default:
      return state;
  }
}