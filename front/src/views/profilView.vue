<template>
  <!-- HEADER -->
  <HeaderComponent @refresh-profil="refreshProfil()"/>
  <!-- OVERLAY -->
  <OverlayComponent :show="showCreatePost" style="background-color: #333333d3; z-index: 20;" />
  <!-- TRANSITION MODAL CREATEPOST -->
  <transition name="slider">
    <!-- MODAL CREATE POST -->
    <CreatePostComponent v-show="showCreatePost" 
    @refresh-posts="this.$store.dispatch('getUserFeed', user.userId);"
    @show-modal="showModalCreatePost()" />
  </transition>
  <!-- PROFIL POSTS CONTAINER -->
  <div id="body_posts_profil">
    <!-- PROFIL CONTAINER -->
    <div class="profil_container">
      <ProfilComponent />
    </div>
    <!-- POSTS CONTAINER -->
    <div class="posts_container">
      <!-- BUTTON SHOW CREATE POST -->
      <ButtonCreatePost @show-modal="showModalCreatePost()"/>
      <!-- POST COMPONENT -->
      <PostsComponent :posts="this.postsUser"
      @delete-post="deletePost($event)" 
      @refresh-post="this.$store.dispatch('getUserFeed');"/>
    </div>
  </div>
  <!-- FOOTER -->
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ProfilComponent from '@/components/ProfilComponent.vue'
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import ButtonCreatePost from '@/components/ButtonCreatePost.vue'
import PostsComponent from '@/components/PostsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import OverlayComponent from '@/components/OverlayComponent.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ProfilComponentView',
  components: {
    HeaderComponent, 
    ProfilComponent, 
    PostsComponent, 
    FooterComponent,
    ButtonCreatePost,
    CreatePostComponent,
    OverlayComponent
    
  },
  data: function () {
    return {
      showCreatePost: false
    }
  },
  computed: {
    ...mapGetters(['postsUser']),
    ...mapState(['userInfos', 'user','status'])
  },
   beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      this.$router.push('/authentification');
    }
    return;
  },
  created: function () {
    this.$store.dispatch('getUserInfos', this.user.userId);
    this.$store.dispatch('getUserFeed', this.user.userId);
  },
  methods: {
    refreshProfil: function () {

      window.scrollTo({
        top: 0,
        left: 0,
      })
      this.$store.dispatch('getUserFeed', this.user.userId);
      this.$store.dispatch('getUserInfos', this.user.userId);
    },
    deletePost: function (postId) {
      this.$store.dispatch('deletePost', postId)
        .then(() => {
          this.$store.dispatch('getUserFeed', this.user.userId);
        })
    },
    showModalCreatePost: function () {
      this.showCreatePost = !this.showCreatePost
    },



  }
}
</script>
<style lang="scss">
@import '../variables';
/* TRANSITION */
.slider-enter-active,
.slider-leave-active {
  transform: translateY(0%);
    transition: transform 0.2s ease-in-out;
}

.slider-enter-from,
.slider-leave-to {
    transform: translateY(-100%);
}
/* TRANSITION */

//BODY
#body_posts_profil {
  background-image: linear-gradient(90deg, $third-color 0%, $secondary-color 50%, $third-color 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100vh;
  padding:30px;
    .profil_container{
      flex: 1;
    }
    .posts_container{
        flex: 1;
    }
}
</style>