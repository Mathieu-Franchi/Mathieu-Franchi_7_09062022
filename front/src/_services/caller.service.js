import store from '@/store';
import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK
});
instance.interceptors.response.use(response => {
    return response
}, error => {
    
    if (error.response.status == 401){
        store.commit('logout')
        return Promise.reject(error)
    }
})

export default instance