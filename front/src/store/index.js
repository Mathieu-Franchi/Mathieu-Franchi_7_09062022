import { createStore } from 'vuex'
import instance from '@/_services/caller.service'
import router from '@/router';
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
    postsUser: [],
  },
  getters: {
    posts (state) {
      return state.posts.sort((a,b) =>  new Date(b.date) - new Date(a.date));
    },
    postsUser (state) {
      return state.postsUser.sort((a,b) =>  new Date(b.date) - new Date(a.date));
    },
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
      router.push('/auth');
      delete instance.defaults.headers.common['Authorization'];
    },
    posts: function (state, posts){
      state.posts = posts;
    },
    postsUser: function (state, posts){
      state.postsUser = posts;
    },
    deletePost: function (state, postId){
      state.posts = state.posts.filter(post => {
        return post._id != postId;
      });
      state.postsUser = state.postsUser.filter(post => {
        return post._id != postId;
      });
    }
  },
  actions: {
    /***** USER METHODS *****/

    //LOGIN
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
          }, 3500)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-login');
          commit('addStatus', 'error_login');
          setTimeout(function () {
            commit('removeStatus', 'error_login');
          }, 3500)
          reject(error);
        });
      });
    },
    //CREATE ACCOUNT
    createAccount: ({commit}, userForm) => {
      commit('addStatus', 'loading-account');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userForm)
        .then(function (response) {
          commit('removeStatus', 'loading-account');
          commit('addStatus', 'account-created');
          setTimeout(function () {
            commit('removeStatus', 'account-created');
          }, 3500)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-account');
          commit('addStatus', 'error_create');
          setTimeout(function () {
            commit('removeStatus', 'error_create');
          }, 3500)
          reject(error);
          if(error.response.data.error.errors.email.kind == 'unique'){
            commit('addStatus', 'error_unique')
            setTimeout(function () {
              commit('removeStatus', 'error_unique');
            }, 3500)
          }
        });
      });
    },
    //GET USER INFOS
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
     /****** POSTS METHODS *****/
    
    //GET USER POSTS
    getUserFeed: ({ commit }, id) => {
      commit('addStatus', 'loading-posts-user');
      instance.get("/posts/user/" + id)
        .then(function (response) {
          commit('removeStatus', 'loading-posts-user');
          commit('addStatus', 'get_posts_user');
          commit('postsUser', response.data);
          setTimeout (function(){
            commit('removeStatus', 'get_posts_user');
          },2000)
          
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
          commit('addStatus', 'error_get_posts_user');
          setTimeout (function(){
            commit('removeStatus', 'error_get_posts_user');
          },2000)

        });
    },
    //GET ALL POSTS
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
          console.log(response.data)
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
          commit('addStatus', 'error_get_posts');
          setTimeout (function(){
            commit('removeStatus', 'error_get_posts');
          },2000)
        });
    },
    //GET ONE POST
    getOnePost: ({commit}, postId) => {
      commit('addStatus', 'loading-onePost');
      return new Promise((resolve, reject) => {
        instance.get('/posts' + postId)
        .then(function (response) {
          commit('removeStatus', 'loading-onePost');
          commit('addStatus', 'post-get');
          setTimeout(function () {
            commit('removeStatus', 'post-get');
          }, 2000)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-onePost');
          commit('addStatus', 'post_error_get');
          setTimeout(function () {
            commit('removeStatus', 'post_error_get');
          }, 2000)
          reject(error);
        });
      });
    },
    //CREATE POST
    createPost: ({commit}, {data, type}) => {
      let headers
      if(type === 1){
        headers = {'Content-Type': 'application/json'};
      }
      else {
        headers = {'Content-Type': 'multipart/form-data'};
      }
      commit('addStatus', 'loading-createPost');
      return new Promise((resolve, reject) => {
        instance.post('/posts', data, {
          headers: headers,
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
    //MODIFY POST
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
    //DELETE POST
    deletePost: ({commit}, postId) => {
      commit('addStatus', 'loading-delete-post');
      return new Promise((resolve, reject) => {
        instance.delete("/posts/" + postId)
        .then(function (response) {
          commit('deletePost', postId);
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
    //LIKE POST
    likePost: ({commit}, {id, like}) => {
      commit('addStatus', 'loading-like');
      console.log(id)
      console.log(like)
      let sendLike = {
        like: like
      }
      console.log(like)
      return new Promise((resolve, reject) => {
        instance.post(`/posts/${id}/like`, sendLike)
        .then(function (response) {
          commit('removeStatus', 'loading-like');
          console.log(response)
          // commit('addStatus', 'liked');
          // commit('addStatus', 'unliked');
          // commit('addStatus', 'disliked');
          resolve(response);
        })
        .catch(function (error) {
          console.log(error)
          commit('removeStatus', 'loading-like');
          commit('addStatus', 'error_like');
          setTimeout(function () {
            commit('removeStatus', 'error_like');
          }, 2000)
          reject(error);
        });
      });
    },
  }
})

export default store;
