import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons' //all regular svg icons
import { fas } from '@fortawesome/free-solid-svg-icons' //all solid svg icons
import { fab } from '@fortawesome/free-brands-svg-icons' //all brand svg icons

library.add(fas, far, fab);

createApp(App)
.use(store)                                                                                          //['far', 'exempleIcon']
.component('FontAwesome', FontAwesomeIcon) // <FontAwesome icon="exempleIcon"/> or <FontAwesome :icon="['fas', 'exempleIcon']"/>
.use(router)                                                                                         //['fab', 'exempleIcon']
.mount('#app')                                                                   //<FontAwesome :icon="{prefix:'fas',iconName: 'exempleIcon'}"/>             
