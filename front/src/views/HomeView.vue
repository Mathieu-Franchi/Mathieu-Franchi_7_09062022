<template>
  <!-- HEADER -->
  <HeaderComponent @refresh-home="refreshHome()" />
  <!-- OVERLAY -->
  <OverlayComponent :show="showCreatePost" style="background-color: #333333d3; z-index: 20;" />
  <!-- TRANSITION MODAL CREATEPOST -->
  <transition name="slider">
    <!-- MODAL CREATE POST -->
    <CreatePostComponent 
    v-show="showCreatePost"
    @refresh-posts="this.$store.dispatch('getAllPosts');" 
    @show-modal="showModalCreatePost()"/>
  </transition>
  <!-- WALL POSTS -->
  <main id="body_posts">
    <!-- BUTTON SHOW CREATE POST -->
    <ButtonCreatePost @show-modal="showModalCreatePost()"/>
    <!-- POST COMPONENT -->
    <PostsComponent 
    :posts="this.posts" 
    @delete-post="deletePost($event)"  
    @refresh-post="this.$store.dispatch('getAllPosts');"/>
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
      this.$router.push('/authentification');
    }
    return;
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
      showCreatePost: false
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
    deletePost: function (postId) {
      this.$store.dispatch('deletePost', postId)
    },
    showModalCreatePost: function () {
      this.showCreatePost = !this.showCreatePost
    },


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