<template>
  <!-- HEADER -->
  <HeaderComponent @refresh-home="refreshHome()" />
  <!-- OVERLAY -->
  <OverlayComponent :show="showCreatePost || showEditPost" style="background-color: #333333d3; z-index: 20;" />
  <!-- TRANSITION MODAL CREATEPOST -->
  <transition name="slider">
    <!-- MODAL CREATE POST -->
    <CreatePostComponent 
    v-show="showCreatePost" 
    @show-modal="showModalCreatePost()"/>
  </transition>
    <!-- EDIT POST -->
  <transition name="appear">
    <CreatePostComponent 
    v-if="showEditPost" 
    @show-modal="showModalEditPost()"
    />
  </transition>
  <!-- WALL POSTS -->
  <main id="body_posts">
    <!-- BUTTON SHOW CREATE POST -->
    <ButtonCreatePost @show-modal="showModalCreatePost()"/>
    <!-- POST COMPONENT -->
    <PostsComponent 
    :posts="this.posts"
    @modify-post="modifyPost($event)"
    @delete-post="deletePost($event)"
    @like-post="likePost"
    />
  </main>
  <!-- FOOTER -->
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ButtonCreatePost from '@/components/ButtonCreatePost.vue'
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import PostsComponent from '@/components/PostsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import OverlayComponent from '@/components/OverlayComponent.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'HomeView',
  beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      return this.$router.push('/authentification');
    }
  },
  created: function () {
    this.$store.dispatch('getAllPosts');
    this.$store.dispatch('getUserInfos', this.user.userId)
  },
  components: {
    HeaderComponent,
    PostsComponent,
    FooterComponent,
    CreatePostComponent,
    ButtonCreatePost,
    OverlayComponent
},
  data: function () {
    return {
      showCreatePost: false,
      showEditPost: false,
      postId: null,
    }
  },
  computed: {
    ...mapGetters(['posts']),
    ...mapState(['userInfos', 'user','status'])
  },
  methods: {
    refreshHome: function () {
      this.$store.dispatch('getAllPosts')
      window.scrollTo({
        top: 0,
        left: 0,
      })
    },
    showModalCreatePost: function () {
      this.showCreatePost = !this.showCreatePost
    },
    showModalEditPost: function () {
      this.showEditPost = !this.showEditPost;
      this.$store.commit('resetPost');
    },
    modifyPost: function (postId) {
      const self = this;
      this.$store.dispatch('getOnePost', postId)
      .then(function (){
        self.showEditPost = !self.showEditPost;
      });
    },
    deletePost: function (postId) {
      this.$store.dispatch('deletePost', postId)
    },
    likePost: function(data){
      let like;
      if (data.likers.includes(this.user.userId)) {
        like = {
          like: 0,
          userId: this.user.userId
        };
      }
      else {
        like = {
          like: 1,
          userId: this.user.userId
        };
      }
      this.$store.dispatch("likePost", { id: data.postId, like: like });
    }


  }
}
</script>

<style lang="scss">
@import '../variables';
//animation createPost
.slider-enter-active,
.slider-leave-active {
  transform: translateY(0%);
  transition: transform 0.2s ease-in-out;
}

.slider-enter-from,
.slider-leave-to {
  transform: translateY(-100%);
}
//BODY
#body_posts {
  background-image: linear-gradient(90deg, $third-color 0%, $secondary-color 50%, $third-color 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding:30px;
}
</style>