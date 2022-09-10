import store from '@/store';
import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK
});
instance.interceptors.response.use(response => {
    return response
}, error => {
    // const originalRequest = error.config;
    // if (error.response.status == 401 && error.config.url != '/refreshToken' && originalRequest._retry !== true){
    //     originalRequest._retry = true
    //     console.log(store.state.user.refreshToken + ' debutRefresh')
    //     if(store.state.user.refreshToken && store.state.user.refreshToken != '')
    //     {
    //         console.log(store.state.user.refreshToken + ' debutRefresh')
    //         instance.defaults.headers.common['authorization'] = `Bearer ${store.state.user.refreshToken}`
    //         instance.post('/refreshToken')
    //         .then((response) => {
    //             instance.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`
    //             console.log(response.data.token)
    //         })
    //         .catch((error) => {
    //             console.log(error)
                
    //             console.log('catch logout')
    //             store.commit('logout')
    //         });
    //         return instance(originalRequest);
    //     }
    //     else{
    //         console.log('else logout')
    //         store.commit('logout')
    //     }
    if (error.response.status == 401){
        store.commit('logout')
    }
    return Promise.reject(error)
})

export default instance