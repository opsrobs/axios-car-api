import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme

import 'primevue/resources/primevue.min.css'       //core css
import 'primeicons/primeicons.css'       //icons

const apps = createApp(App)
apps.use(router)
apps.use(TabView)
apps.use(TabPanel)

apps.use(PrimeVue)
apps.mount('#app')