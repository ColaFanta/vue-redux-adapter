import { type DeepReadonly, type Ref, computed } from 'vue'

/** select a state from readable store  */
export function select<T, State = unknown>(sel: (state: State) => T) {
  return (store: Readonly<Ref<DeepReadonly<State>>>) => computed(() => sel(store.value as State))
}
