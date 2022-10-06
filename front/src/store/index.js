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
    notifications: [],
    user: user,
    userInfos: {
      name:'',
      lastname: '',
      email: '',
      photo: null,
    },
    posts: [],
    postsUser: [],
    post: null,
    originalPost: null,
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
    //Notif
    addNotification: function (state, notification) {
      state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substring(2)
      })
    },
    removeNotification: function (state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
        return notification.id != notificationToRemove.id;
      })
    },
    //Status
    addStatus: function (state, status) {
      state.status.push(status);
    },
    removeStatus: function (state, statusToRemove) {
      state.status = state.status.filter(status => {
        return status != statusToRemove;
      });
    },
    //User
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
      router.push('/authentification');
      delete instance.defaults.headers.common['Authorization'];
    },
    //Posts
    posts: function (state, posts){
      state.posts = posts;
    },
    postsUser: function (state, posts){
      state.postsUser = posts;
    },
    postToModif: function (state, post){
      state.post = post;
      state.originalPost = post;
    },
    resetPost: function (state){
      state.post = null;
      state.originalPost = null;
    },
    pushPost: function (state, post){
      state.posts.push(post);
      state.postsUser.push(post);
    },
    deletePost: function (state, postId){
      state.posts = state.posts.filter(post => {
        return post._id != postId;
      });
      state.postsUser = state.postsUser.filter(post => {
        return post._id != postId;
      });
    },
    postLike: function (state, postId) {

      let post = state.posts.find(post => post._id === postId);
      if (post) {
        post.usersLiked.push(state.user.userId);
        post.likes += 1;
      }
      let postUser = state.postsUser.find(postUser => postUser._id === postId);
      if (postUser) {
        postUser.usersLiked.push(state.user.userId);
        postUser.likes = post.likes;
      }

    },
    postUnlike: function (state, postId) {

      let post = state.posts.find(post => post._id === postId);
      if (post) {
        post.usersLiked = post.usersLiked.filter(usersId => usersId != state.user.userId);
        post.likes -= 1;
      }
      let postUser = state.postsUser.find(postUser => postUser._id === postId);
      if (postUser) {
        postUser.usersLiked = postUser.usersLiked.filter(usersId => usersId != state.user.userId);
        postUser.likes = post.likes;
      }
    },
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
          if(error.response.data.error.errors.email.kind == 'unique'){
            commit('addStatus', 'error_unique')
            setTimeout(function () {
              commit('removeStatus', 'error_unique');
            }, 3500)
          }
          else{
            commit('addStatus', 'error_create');
          }
          reject(error);
        });
      });
    },
    //GET USER INFOS
    getUserInfos: ({commit}, id) => {
      commit('addStatus', 'loading-userInfos');
        instance.get("/auth/user/" + id)
        .then(function (response) {
          commit('removeStatus', 'loading-userInfos');
          commit('userInfos', response.data);
        })
        .catch(function () {
          commit('removeStatus', 'loading-userInfos');
        });
    },
     /****** POSTS METHODS *****/
    
    //GET USER POSTS
    getUserFeed: ({ commit }, id) => {
      commit('addStatus', 'loading-posts-user');
      instance.get("/posts/user/" + id)
        .then(function (response) {
          commit('removeStatus', 'loading-posts-user');
          commit('postsUser', response.data);
          
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
        });
    },
    //GET ALL POSTS
    getAllPosts: ({ commit }) => {
      commit('addStatus', 'loading-posts');
      instance.get('/posts')
        .then(function (response) {
          commit('removeStatus', 'loading-posts');
          commit('posts', response.data);
        })
        .catch(function () {
          commit('removeStatus', 'loading-posts');
        });
    },
    //GET ONE POST
    getOnePost: ({commit}, postId) => {
      commit('addStatus', 'loading-onePost');
      return new Promise((resolve, reject) => {
        instance.get("/posts/" + postId)
        .then(function (response) {
          commit('removeStatus', 'loading-onePost');
          commit('postToModif', response.data);
          console.log(response.data)
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-onePost');
          reject(error);
        });
      });
    },
    //CREATE POST
    createPost: ({commit}, {data, headers}) => {
      commit('addStatus', 'loading-createPost');
      return new Promise((resolve, reject) => {
        instance.post('/posts', data, {
          headers: headers,
        })
        .then(function (response) {
          commit('removeStatus', 'loading-createPost');
          commit('pushPost', response.data.post);
          commit('addNotification', {type: 'success', message: 'Post créé !'})
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-createPost');
          commit('addNotification', {type: 'failure', message: 'Erreur lors de la création du post'})
          reject(error);
        })
      });
    },
    //MODIFY POST
    modifyPost: ({commit},{data, headers}) => {
      commit('addStatus', 'loading-modifyPost');
      return new Promise((resolve, reject) => {
        instance.put("/posts/" + data.postId, data.data, {
          headers: headers,
        })
        .then(function (response) {
          commit('removeStatus', 'loading-modifyPost');
          commit('addNotification', {type: 'success', message: 'Post modifié !'})
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-modifyPost');
          commit('addNotification', {type: 'failure', message: 'Erreur lors de la modification du post'})
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
          commit('addNotification', {type: 'success', message: 'Post supprimé !'})
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-delete-post');
          commit('addNotification', {type: 'failure', message: 'Erreur lors de la suppression du post'})
          reject(error);
        });
      });
    },
    //LIKE POST
    likePost: ({commit}, {id, like}) => {
      commit('addStatus', 'loading-like');
      return new Promise((resolve, reject) => {
        instance.post(`/posts/${id}/like`, like)
        .then(function (response) {
          commit('removeStatus', 'loading-like');
          if(like.like == 0){
            commit('postUnlike', id)
          }
          else {
            commit('postLike', id)
          }
          resolve(response);
        })
        .catch(function (error) {
          commit('removeStatus', 'loading-like');
          reject(error);
        });
      });
    },
  }
})

export default store;
