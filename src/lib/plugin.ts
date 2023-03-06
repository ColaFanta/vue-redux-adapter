import type { Action, AnyAction, EnhancedStore, Middleware, StoreEnhancer, ThunkDispatch } from '@reduxjs/toolkit'
import type { App, DeepReadonly, Plugin, Ref } from 'vue'
import { readonly, shallowRef } from 'vue'

import { contextKey_adapted, contextKey_original } from './hooks'

/** Creates readonly ref from a Redux store
 * @link https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract
 */
export function createPlugin<
  S = any,
  A extends Action<any> = AnyAction,
  M extends ReadonlyArray<Middleware<{}, S>> = ReadonlyArray<Middleware<{}, S>>,
  E extends ReadonlyArray<StoreEnhancer> = ReadonlyArray<StoreEnhancer>
>(reduxStore: EnhancedStore<S, A, M, E>): Plugin {
  const plugin: Plugin = {
    install: (app: App) => {
      const vueReduxStore = fromRedux(reduxStore)
      app.provide(contextKey_adapted, vueReduxStore)
      app.provide(contextKey_original, reduxStore)
    },
  }
  return plugin
}

export function fromRedux<
  S = any,
  A extends Action<any> = AnyAction,
  M extends ReadonlyArray<Middleware<{}, S>> = ReadonlyArray<Middleware<{}, S>>,
  E extends ReadonlyArray<StoreEnhancer> = ReadonlyArray<StoreEnhancer>
>(reduxStore: EnhancedStore<S, A, M, E>): Readonly<Ref<DeepReadonly<S>>> & { dispatch: ThunkDispatch<S, any, A> } {
  const vueReduxStore = shallowRef<S>(reduxStore.getState())
  ;(vueReduxStore as any).dispatch = reduxStore.dispatch
  reduxStore.subscribe(() => {
    vueReduxStore.value = reduxStore.getState()
  })

  return readonly(vueReduxStore) as any
}
