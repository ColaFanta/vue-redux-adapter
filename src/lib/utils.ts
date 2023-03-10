import { type Selector, createSelector } from '@reduxjs/toolkit'
import { type ComputedRef, type DeepReadonly, type Ref, computed } from 'vue'

export const select: CreateComputedSelector = (...sels: any) => {
  if (sels.length === 1) return (store: any) => computed(() => sels[0](store.value))
  if (sels.length > 1)
    return (store: any) =>
      computed(() => createSelector(...([(store: unknown) => store, ...sels] as any))(store.value)) as any
  throw new Error('Must pass in at least 1 select')
}

export type SelectorResultArray<Selectors extends SelectorArray> = ExtractReturnType<Selectors>

export type SelectorArray = ReadonlyArray<Selector>

type ExtractReturnType<T extends readonly UnknownFunction[]> = {
  [index in keyof T]: T[index] extends T[number] ? ReturnType<T[index]> : never
}

type UnknownFunction = (...args: any[]) => any

export interface CreateComputedSelector {
  <Result, State = unknown>(sel: (state: State) => Result): (
    store: Readonly<Ref<DeepReadonly<State>>>
  ) => ComputedRef<Result>

  /** For Multiple selectors */
  <Selectors extends SelectorArray, Result, State = unknown>(
    ...items: [...Selectors, (...args: [State, ...SelectorResultArray<Selectors>]) => Result]
  ): (store: Readonly<Ref<DeepReadonly<State>>>) => ComputedRef<Result>
}
