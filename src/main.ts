import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import { createPlugin } from './lib'
import { reduxStore } from './store'

const app = createApp(App)
app.use(createPlugin(reduxStore))

app.mount('#app')
