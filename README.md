# Vue Redux Adapter

A simple wrapper on `Redux` and makes it possible to use `Redux` store on Vue. 

[![npm version](https://badge.fury.io/js/vue-redux-adapter.svg)](https://badge.fury.io/js/vue-redux-adapter.svg)

[Demo Counter App](https://stackblitz.com/github/ColaFanta/vue-redux-adapter?file=src/App.vue)


## Install

Install vue-redux-adapter package

```bash
npm install vue-redux-store
```

Install redux package

```bash
npm install @reduxjs/toolkit
```

# API

- [createPlugin()](##`createPlugin()`)
- [useSelector](##`useSelector()`)
- [useStore, useDispatch](##`useStore()`,`useDispatch()`)


## `createPlugin()`
A Vue plugin that injects store instance to app.

### Example
  - Define store
    ```js
        // src/counter-store.ts
    import {configureStore, createSlice} from '@reduxjs/toolkit'
    const counter = createSlice({
      name: 'counter',
      initialState: {
        count: 0
      },
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
    const reduxStore = configureStore({
      reducer: {
        counter: counter.reducer,
      },
    }) 
    ```
  - provide store to context
    ```js
    app.use(createPlugin(reduxStore))

    ```

## `useSelector()`
Creates a computed store from part of your store using selector function.

## `useStore()`, `useDispatch()`
Hooks to grab `store`, `dispatch` from plugin

### Example
  ```jsx
    <script setup lang="ts">
    import { useSelector } from './lib'
    import { actions, useStore } from './store'
    import type { RootState } from './store'

    const store = useStore()
    const dispatch = store.dispatch

    const count = useSelector((s: RootState) => s.counter.count)
    const multiplier = ref(1)
    // select along with built-in ref
    const multiplied = useSelector(
      () => multiplier.value,
      (s: RootState, m) => s.counter.count * m
    )
    </script>

    <template>
      <div>
        <button @click="dispatch(actions.decrement())" data-testid="decrement_btn">decrement</button>
        &nbsp;
        <span data-testid="display_count">
          {{ count }}
        </span>
        &nbsp;
        <button @click="dispatch(actions.increment())" data-testid="increment_btn">increment</button>
      </div>
      <br />
      <div>
        <p>
          Multiplied <span data-testid="display_multiplied"> {{ multiplied }} </span>
        </p>
        <button data-testid="mult1_btn" @click="multiplier = 1">multiply 1</button>
        <button data-testid="mult2_btn" @click="multiplier = 2">multiply 2</button>
        <button data-testid="mult3_btn" @click="multiplier = 3">multiply 3</button>
      </div>
    </template>
  ```

## Contributing ✨

Interested in contributing to this repo? Check out our and submit a PR for a new feature/bug fix.

A big shoutout to all our contributors! You could be here too! ✨

<a href="https://github.com/ColaFanta/vue-redux-adapter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ColaFanta/vue-redux-adapter" />
</a>
