import type { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { type ComputedRef, type DeepReadonly, type Ref, inject } from 'vue'

import { type SelectorArray, type SelectorResultArray, select } from './utils'

export const contextKey_original = Symbol('redux-original-store')
export const contextKey_adapted = Symbol('redux-adapted-store')

export interface UseSelector {
  <Result, State = unknown>(sel: (state: State) => Result): ComputedRef<Result>

  /** For Multiple selectors */
  <Selectors extends SelectorArray, Result, State = unknown>(
    ...items: [...Selectors, (...args: [State, ...SelectorResultArray<Selectors>]) => Result]
  ): ComputedRef<Result>
}

/** select a state from store in nearest `Provider` */
export const useSelector: UseSelector = (...sels: any) => {
  return select(...sels)(useStore())
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
