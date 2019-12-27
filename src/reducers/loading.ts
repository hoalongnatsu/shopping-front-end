/* Interface */
import { LoadingState, Action } from 'interface';

const initialState: LoadingState = {
  GET_COLORS: false,
  CREATE_COLOR: false,
  UPDATE_COLOR: false,
  DELETE_COLOR: false
}

export default function loading(state: LoadingState = initialState, action: Action): LoadingState {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;
  
  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}