import { configureStore, createSlice } from '@reduxjs/toolkit'
import { afterEach, describe, expect, test } from 'vitest'
import { computed, reactive, watch } from 'vue'

import { fromRedux } from '../../src/lib/plugin'
import { select } from '../../src/lib/utils'

describe('redux store vs vue reactive system consistency test', () => {
  const reactiveCounter = reactive({
    count: 0,
  })

  const reactiveCounterStore = {
    counter: reactiveCounter,
    increment: () => reactiveCounter.count++,
    decrement: () => reactiveCounter.count--,
    reset: () => (reactiveCounter.count = 0),
  }

  const counterSlice = createSlice({
    name: 'reduxCounterSlice',
    initialState: { count: 0 },
    reducers: {
      increment: state => {
        state.count++
      },
      decrement: state => {
        state.count--
      },
      reset: _ => ({
        count: 0,
      }),
    },
  })

  const reduxCounterStore = configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  })

  const adaptedCounterStore = fromRedux(reduxCounterStore)

  afterEach(() => {
    adaptedCounterStore.dispatch(counterSlice.actions.reset())
    reactiveCounterStore.reset()
  })

  test('stores should have same results', () => {
    const arr = Array(10).fill(1)
    arr.forEach(() => adaptedCounterStore.dispatch(counterSlice.actions.increment()))
    arr.forEach(() => reactiveCounterStore.increment())

    const result1 = adaptedCounterStore.value.counter.count
    const result2 = reactiveCounterStore.counter.count

    expect(result1).toStrictEqual(10)
    expect(result2).toStrictEqual(10)
  })

  test('`computed` should has same result with selector', () => {
    const counterVal = computed(() => adaptedCounterStore.value.counter.count)
    const selectCount = select((state: { counter: { count: number } }) => state.counter.count)(adaptedCounterStore)
    Array(10)
      .fill(1)
      .forEach(() => adaptedCounterStore.dispatch(counterSlice.actions.increment()))

    expect(counterVal.value).toStrictEqual(10)
    expect(selectCount.value).toStrictEqual(10)
  })

  test('"selector" should memorize it\'s result', () => {
    const selectCount = select((state: { counter: { count: number } }) => state.counter.count)(adaptedCounterStore)
    expect(selectCount.value).toStrictEqual(0)
    let newValCount = 0
    watch(selectCount, _ => ++newValCount, { flush: 'sync' })

    adaptedCounterStore.dispatch(counterSlice.actions.increment())
    adaptedCounterStore.dispatch(counterSlice.actions.reset())
    adaptedCounterStore.dispatch(counterSlice.actions.reset())
    adaptedCounterStore.dispatch(counterSlice.actions.reset())

    expect(selectCount.value).toStrictEqual(0)
    expect(newValCount).toStrictEqual(2)
  })
})
