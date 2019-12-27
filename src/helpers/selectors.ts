import { LoadingState, ErrorsState } from 'interface'

export const create_loading_selector = (actions: string[]) => (loading: LoadingState): boolean => {
  return actions.some((action) => loading[action]);
}

export const create_error_selector = (actions: string[]) => (errors: ErrorsState): boolean => {
  return actions.some((action) => errors[action]);
}