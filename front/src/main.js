import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//fontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons' //all regular svg icons
import { fas } from '@fortawesome/free-solid-svg-icons' //all solid svg icons
import { fab } from '@fortawesome/free-brands-svg-icons' //all brand svg icons

/* add icons to the library */
library.add(fas, far, fab);
//<FontAwesome :icon="{prefix:'fas',iconName: 'exempleIcon'}"/>  
createApp(App).use(store).use(router).component('FontAwesome', FontAwesomeIcon).mount('#app')
