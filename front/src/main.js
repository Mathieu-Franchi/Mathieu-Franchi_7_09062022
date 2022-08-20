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
//Write like this : <FontAwesome :icon="{prefix:'fas',iconName: 'exempleIcon'}"/>  
//Axios
// import Axios from "axios"
// const instance = Axios.create({
//     baseURL: process.env.VUE_APP_BACK
//   });
// //Interceptor request response
// instance.interceptors.response.use(function (response){
//     return response;
// }, function (error) {
//     if (error.response.status == 401) {
        
//         // router.push('/auth')

//     }
//     return Promise.reject(error);
// })
// export default instance
createApp(App).use(store).use(router).component('FontAwesome', FontAwesomeIcon).mount('#app')
