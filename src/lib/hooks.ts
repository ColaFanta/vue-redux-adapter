import type { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { type DeepReadonly, type Ref, inject } from 'vue'

import { select } from './utils'

export const contextKey_original = Symbol('redux-original-store')
export const contextKey_adapted = Symbol('redux-adapted-store')

/** select a state from store in nearest `Provider` */
export function useSelector<T, RootState = unknown>(sel: (state: RootState) => T) {
  return select(sel)(useStore<RootState>())
}

/** get the store from nearest `Provider` */
export function useStore<RootState = unknown, A extends Action<any> = AnyAction>() {
  return inject(contextKey_adapted)! as Readonly<Ref<DeepReadonly<RootState>>> & {
    dispatch: ThunkDispatch<RootState, any, A>
  }
}

/** get the dispatch method from nearest `Provider` */
export function useDispatch<RootState = unknown, A extends Action<any> = AnyAction>() {
  return useStore<RootState, A>().dispatch
}
