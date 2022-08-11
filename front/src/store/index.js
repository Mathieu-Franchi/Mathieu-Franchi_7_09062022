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
    status: [],
    user: user,
    userInfos: {
      name:'',
      lastname: '',
      email: '',
      photo: null,
    },
    posts: [],
    date: new Date(),
    
  },
  mutations: {
    addStatus: function (state, status) {
      state.status.push(status);
    },
    removeStatus: function (state, statusToRemove) {
      state.status = state.status.filter(status => {
        return status != statusToRemove;
      });
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
    /***** USER METHODS *****/
    login: ({commit}, userForm) => {
      commit('addStatus', 'loading-login');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userForm)
        .then(function (response) {
          commit('removeStatus', 'loading-login');
          commit('addStatus', 'login');
          commit('logUser', response.data);
          setTimeout(function () {
            commit('removeStatus', 'login');
          }, 3000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-login');
          commit('addStatus', 'error_login');
          setTimeout(function () {
            commit('removeStatus', 'error_login');
          }, 3000)
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userForm) => {
      commit('addStatus', 'loading-account');
      // console.log(this.$store.state.status.)
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userForm)
        .then(function (response) {
          commit('removeStatus', 'loading-account');
          commit('addStatus', 'account-created');
          setTimeout(function () {
            commit('removeStatus', 'account-created');
          }, 3000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-account');
          commit('addStatus', 'error_create');
          setTimeout(function () {
            commit('removeStatus', 'error_create');
          }, 3000)
          reject(error);
          if(error.response.data.error.errors.email.kind == 'unique'){
            commit('addStatus', 'error_unique')
            setTimeout(function () {
              commit('removeStatus', 'error_unique');
            }, 3000)
          }
        });
      });
    },
    getUserInfos: ({commit}, id) => {
      commit('addStatus', 'loading-userInfos');
        instance.get("/auth/user/" + id)
        .then(function (response) {
          commit('removeStatus', 'loading-userInfos');
          commit('addStatus', 'get_userInfos');
          commit('userInfos', response.data);
          setTimeout (function(){
               commit('removeStatus', 'get_userInfos');
          },2000)
        })
        .catch(function () {
          commit('removeStatus', 'loading-userInfos');
          commit('addStatus', 'error_userInfos');
          setTimeout(function () {
            commit('removeStatus', 'error_userInfos');
          }, 2000)
        });
      
    },
    getUserFeed: ({ commit }, id) => {
      commit('addStatus', 'loading-posts-user');
      instance.get("/posts/user/" + id)
        .then(function (response) {
          commit('removeStatus', 'loading-posts-user');
          commit('addStatus', 'get_posts_user');
          commit('posts', response.data);
          setTimeout (function(){
            commit('removeStatus', 'get_posts_user');
          },2000)
          console.log('oui ça marche user')
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
          commit('addStatus', 'error_get_posts_user');
          setTimeout (function(){
            commit('removeStatus', 'error_get_posts_user');
          },2000)

        });
    },
    /****** POSTS METHODS *****/
    getAllPosts: ({ commit }) => {
      commit('addStatus', 'loading-posts');
      instance.get('/posts')
        .then(function (response) {
          commit('removeStatus', 'loading-posts');
          commit('addStatus', 'get_posts');
          commit('posts', response.data);
          setTimeout (function(){
            commit('removeStatus', 'get_posts');
          },2000)
          console.log('oui ça marche')
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
          commit('addStatus', 'error_get_posts');
          setTimeout (function(){
            commit('removeStatus', 'error_get_posts');
          },2000)
        });
    },
    createPost: ({commit}, postForm) => {
      commit('addStatus', 'loading-createPost');
      return new Promise((resolve, reject) => {
        instance.post('/posts', postForm)
        .then(function (response) {
          commit('removeStatus', 'loading-createPost');
          commit('addStatus', 'post-created');
          setTimeout(function () {
            commit('removeStatus', 'post-created');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-createPost');
          commit('addStatus', 'post_error_create');
          setTimeout(function () {
            commit('removeStatus', 'post_error_create');
          }, 2000)
          reject(error);
        });
      });
    },
    createPostFormData: ({commit}, postFormData) => {
      commit('addStatus', 'loading-createPost');
      console.log(postFormData)
      return new Promise((resolve, reject) => {
        instance.post('/posts', postFormData, {
          headers: {"Content-Type": "multipart/form-data"}
        })
        .then(function (response) {
          commit('removeStatus', 'loading-createPost');
          commit('addStatus', 'post-created');
          setTimeout(function () {
            commit('removeStatus', 'post-created');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-createPost');
          commit('addStatus', 'post_error_create');
          setTimeout(function () {
            commit('removeStatus', 'post_error_create');
          }, 2000)
          reject(error);
        });
      });
    },
    modifyPost: ({commit}, postId, postForm) => {
      commit('addStatus', 'loading-modifyPost');
      return new Promise((resolve, reject) => {
        instance.put("/posts/" + postId, {
          headers:  {
            postForm,
          }
        })
        .then(function (response) {
          commit('removeStatus', 'loading-modifyPost');
          commit('addStatus', 'post-modified');
          setTimeout(function () {
            commit('removeStatus', 'post-modified');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-createPost');
          commit('addStatus', 'post_error_create');
          setTimeout(function () {
            commit('removeStatus', 'post_error_create');
          }, 2000)
          reject(error);
        });
      });
    },
    deletePost: ({commit}, postId) => {
      commit('addStatus', 'loading-delete-post');
      return new Promise((resolve, reject) => {
        instance.delete("/posts/" + postId)
        .then(function (response) {
          commit('removeStatus', 'loading-delete-post');
          commit('addStatus', 'post_deleted');
          setTimeout (function(){
              commit('removeStatus', 'post_deleted');
          },2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-delete-post');
          commit('addStatus', 'post_error_deleted');
          setTimeout(function () {
            commit('removeStatus', 'post_error_deleted');
          }, 2000)
          reject(error);
        });
      });
    },
    postLike: ({commit}, params, like) => {
      commit('addStatus', 'loading-like');
      return new Promise((resolve, reject) => {
        instance.delete('/posts/like', like, {
          params: {
            params,
          }
        })
        .then(function (response) {
          commit('removeStatus', 'loading-like');
          commit('addStatus', 'liked');
          commit('addStatus', 'unliked');
          commit('addStatus', 'disliked');
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-like');
          commit('addStatus', 'error_likeDislike');
          setTimeout(function () {
            commit('removeStatus', 'error_likeDislike');
          }, 2000)
          reject(error);
        });
      });
    },
  }
})

export default store;
