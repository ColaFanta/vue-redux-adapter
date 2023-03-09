<script setup lang="ts">
import { ref } from 'vue'

import { useSelector, useSelectors } from './lib'
import { actions, useStore } from './store'
import type { RootState } from './store'

const store = useStore()
const dispatch = store.dispatch

const count = useSelector((s: RootState) => s.counter.count)

const multiplier = ref(1)

const multiplied = useSelectors(
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
