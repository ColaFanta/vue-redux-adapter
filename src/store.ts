import { useDispatch as useDispatchGeneric, useStore as useStoreGeneric } from '@/lib/index'
import * as toolkit from '@reduxjs/toolkit'

const { createSlice, configureStore } = ((toolkit as any).default ?? toolkit) as typeof toolkit

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

export const reduxStore = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

export const actions = counterSlice.actions

export const useStore = useStoreGeneric<RootState>

export const useDispatch = useDispatchGeneric<RootState>

export type RootState = ReturnType<(typeof reduxStore)['getState']>
