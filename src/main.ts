import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import VueApexCharts from 'vue3-apexcharts'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()

const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use((context) => installPersistedStatePlugin(context))

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)

app.mount('#app')
