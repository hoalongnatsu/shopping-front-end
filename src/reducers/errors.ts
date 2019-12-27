/* Interface */
import { ErrorsState, Action } from 'interface';

const initialState: ErrorsState = {
  GET_COLORS: false,
  CREATE_COLOR: false,
  UPDATE_COLOR: false,
  DELETE_COLOR: false
}

export default function erros(state: ErrorsState = initialState, action: Action): ErrorsState {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;
  
  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'FAILURE',
  }
}