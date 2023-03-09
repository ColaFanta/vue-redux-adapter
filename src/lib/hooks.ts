import type { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { type DeepReadonly, type Ref, inject } from 'vue'

import { type SelectorArray, type SelectorResultArray, select, selects } from './utils'

export const contextKey_original = Symbol('redux-original-store')
export const contextKey_adapted = Symbol('redux-adapted-store')

/** select a state from store in nearest `Provider` */
export function useSelector<Result, State = unknown>(sel: (state: State) => Result) {
  return select(sel)(useStore<State>())
}

/** select using multiple selectors */
/** select using create selector */
export function useSelectors<Selectors extends SelectorArray, Result, State = unknown>(
  ...items: [...Selectors, (...args: [State, ...SelectorResultArray<Selectors>]) => Result]
) {
  return selects(...items)(useStore<State>())
}

/** get the store from nearest `Provider` */
export function useStore<State = unknown, A extends Action<any> = AnyAction>() {
  return inject(contextKey_adapted)! as Readonly<Ref<DeepReadonly<State>>> & {
    dispatch: ThunkDispatch<State, any, A>
  }
}

/** get the dispatch method from nearest `Provider` */
export function useDispatch<State = unknown, A extends Action<any> = AnyAction>() {
  return useStore<State, A>().dispatch
}
