import { createSelector } from 'reselect';
import { LoadingState, ErrorsState, RootState } from 'interface';

export const create_loading_selector = (actions: string[]) => (loading: LoadingState): boolean => {
  return actions.some((action) => loading[action]);
}

export const create_error_selector = (actions: string[]) => (errors: ErrorsState): boolean => {
  return actions.some((action) => errors[action]);
}

export const descending_order_selector = () => {
  return createSelector(
    (state: RootState, pick: string) => state[pick],
    (data: any[]) => data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  )
}
