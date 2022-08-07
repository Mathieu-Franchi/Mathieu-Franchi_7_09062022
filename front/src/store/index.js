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
      photo: null,
    },
    posts: [],
    date: '',
    
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
    setDate: function (state, date) {
      state.date = date;
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
          commit('setStatus', 'loading');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}, id) => {
      commit('setStatus', 'loading');
        instance.get("/auth/user/" + id)
        .then(function (response) {
          commit('setStatus', 'get_userInfos');
          commit('userInfos', response.data);
          // setTimeout (function(){
          //     commit('setStatus', '');
          // },2000)
          commit('setStatus', 'loading');
          console.log('requete getUserINfos');
        })
        .catch(function () {
          commit('setStatus', 'error_userInfos');
          
        });
      
    },
    getUserFeed: ({ commit }, id) => {
      commit('setStatus', 'loading');
      instance.get("/posts/user/" + id)
        .then(function (response) {
          commit('setStatus', 'get_posts');
          commit('posts', response.data);
          // setTimeout (function(){
          //   commit('setStatus', '');
          // },2000)
          commit('setStatus', 'loading');
          console.log('requete getUserFeed');
        })
        .catch(function () {
          commit('setStatus', 'error_get_posts');

        });
    },
    getAllPosts: ({ commit }) => {
      commit('setStatus', 'loading');
      instance.get('/posts')
        .then(function (response) {
          commit('setStatus', 'get_posts');
          commit('posts', response.data);
          // setTimeout (function(){
          //   commit('setStatus', '');
          // },2000)
          commit('setStatus', 'loading');
          console.log('requete getAllPosts');
        })
        .catch(function () {
          commit('setStatus', 'error_get_posts');

        });
    },
    createPost: ({commit}, postForm) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/posts', postForm)
        .then(function (response) {
          commit('setStatus', 'post_created');
          setTimeout(function () {
            commit('setStatus', '');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'post_error_create');
          console.log(error)
          reject(error);
        });
      });
    },
    modifyPost: ({commit}, postId, postForm) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.put("/posts/" + postId, {
          headers:  {
            postForm,
          }
        })
        .then(function (response) {
          commit('setStatus', 'post_modified');
          setTimeout(function () {
            commit('setStatus', '');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'post_error_modified');
          reject(error);
        });
      });
    },
    deletePost: ({commit}, postId) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.delete("/posts/" + postId)
        .then(function (response) {
          commit('setStatus', 'post_deleted');
          setTimeout (function(){
              commit('setStatus', '');
          },2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'post_error_deleted');
          reject(error);
        });
      });
    },
    postLike: ({commit}, params, like) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.delete('/posts/like', like, {
          params: {
            params,
          }
        })
        .then(function (response) {
          commit('setStatus', 'liked');
          commit('setStatus', 'liked');
          commit('setStatus', 'disliked');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_likeDislike');
          reject(error);
        });
      });
    },
  }
})

export default store;
