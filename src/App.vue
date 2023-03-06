<script setup lang="ts">
import { useSelector } from './lib'
import { actions, useStore } from './store'
import type { RootState } from './store'

const store = useStore()
const dispatch = store.dispatch

const count = useSelector((s: RootState) => s.counter.count)
</script>

<template>
  <button @click="dispatch(actions.decrement())" data-testid="decrement_btn">decrement</button>

  <p data-testid="display_count">
    {{ count }}
  </p>

  <button @click="dispatch(actions.increment())" data-testid="increment_btn">increment</button>
</template>
