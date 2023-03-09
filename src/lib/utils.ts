import { createSelector } from '@reduxjs/toolkit'
import { type DeepReadonly, type Ref, computed } from 'vue'

/** select a state from readable store  */
export function select<Result, State = unknown>(sel: (state: State) => Result) {
  return (store: Readonly<Ref<DeepReadonly<State>>>) => computed(() => sel(store.value as State))
}

/** select using create selector */
export function selects<Selectors extends SelectorArray, Result, State = unknown>(
  ...items: [...Selectors, (...args: [State, ...SelectorResultArray<Selectors>]) => Result]
) {
  return (store: Readonly<Ref<DeepReadonly<State>>>) =>
    computed(() => createSelector(...([(store: State) => store, ...items] as any))(store.value as any))
}

export type SelectorResultArray<Selectors extends SelectorArray> = ExtractReturnType<Selectors>

export type SelectorArray = ReadonlyArray<Selector>

type ExtractReturnType<T extends readonly UnknownFunction[]> = {
  [index in keyof T]: T[index] extends T[number] ? ReturnType<T[index]> : never
}

type Selector<State = any, Result = unknown, Params extends never | readonly any[] = any[]> = [Params] extends [never]
  ? (state: State) => Result
  : (state: State, ...params: Params) => Result

type UnknownFunction = (...args: any[]) => any
