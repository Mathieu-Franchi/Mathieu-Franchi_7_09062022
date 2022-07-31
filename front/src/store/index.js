import { createStore } from 'vuex'
const axios = require('axios').default;
const instance = axios.create({
  baseURL:'http://localhost:3000/api/'
});
let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'bearer ' + user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}
// Create a new store instance.
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      name:'',
      lastname: '',
      email: '',
      photo: '',
    },
    posts: [],
    
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = 'bearer ' + user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },
    posts: function (state, posts){
      state.posts = posts;
    },
  },
  actions: {
    login: ({commit}, userForm) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userForm)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userForm) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userForm)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}, params) => {
      commit('setStatus', 'loading');
      
        instance.get('/auth/user',{
          params: {
            userId: params,
          }
        })
        .then(function (response) {
          commit('setStatus', 'get_userInfos');
          commit('userInfos', response.data);
          console.log('reussihttp')
        })
        .catch(function () {
          commit('setStatus', 'error_userInfos');
          
        });
      
    },
    getAllPosts: ({ commit }) => {
      commit('setStatus', 'loading');

      instance.get('/posts')
        .then(function (response) {
          commit('setStatus', 'get_posts')
          commit('posts', response.data);
          console.log('reussihttp')
        })
        .catch(function () {
          commit('setStatus', 'error_get_posts');

        });
    },
    createPost: ({commit}) => {
      commit;
    },
    modifyPost: ({commit}) => {
      commit;
    },
    deletePost: ({commit}) => {
      commit;
    },
    postLike: ({commit}) => {
      commit;
    },
  }
})

export default store;
