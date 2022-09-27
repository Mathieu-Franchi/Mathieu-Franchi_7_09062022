import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //FontAwesome Component
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons' //all regular svg icons
import { faCircleXmark, faCircleCheck, faEyeSlash, faEye, faXmark, faCommentDots, faThumbsUp, faTrash, faEllipsis, faCamera } from '@fortawesome/free-solid-svg-icons' //all solid svg icons
// import { fab } from '@fortawesome/free-brands-svg-icons' //all brand svg icons
/* add icons to the library */
library.add(faCircleXmark, faCircleCheck, faEyeSlash, faEye, faXmark, faCommentDots, faThumbsUp, faTrash, faPenToSquare, faEllipsis, faCamera);

createApp(App).use(store).use(router).component('FontAwesome', FontAwesomeIcon).mount('#app')
