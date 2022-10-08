import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import TabMenu from 'primevue/tabmenu';

import ConfirmationService from 'primevue/confirmationservice'



import 'primevue/resources/themes/saga-blue/theme.css'       //theme

import 'primevue/resources/primevue.min.css'       //core css
import 'primeicons/primeicons.css'       //icons

const apps = createApp(App)
apps.use(router)
apps.use(TabMenu)
apps.use(ConfirmationService)


apps.use(PrimeVue)
apps.mount('#app')