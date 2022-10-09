<template>
  <!-- HEADER -->
  <HeaderComponent @refresh-profil="refreshProfil()"/>
  <!-- OVERLAY -->
  <OverlayComponent :show="showCreatePost || showEditPost" style="background-color: #333333d3; z-index: 20;" />
  <!-- TRANSITION MODAL CREATEPOST -->
  <transition name="slider">
    <!-- MODAL CREATE POST -->
    <CreatePostComponent 
    v-show="showCreatePost" 
    @show-modal="showModalCreatePost()" />
  </transition>
    <!-- EDIT POST -->
  <transition name="appear">
    <CreatePostComponent 
    v-if="showEditPost" 
    @show-modal="showModalEditPost()"
    />
  </transition>
  <!-- PROFIL POSTS CONTAINER -->
  <div id="body_posts_profil">
    <div class="row_posts_profil">
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
        @modify-post="modifyPost($event)"
        @delete-post="deletePost($event)"
        @like-post="likePost"
        />
      </div>
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
      showCreatePost: false,
      showEditPost: false,
    }
  },
  computed: {
    ...mapGetters(['postsUser']),
    ...mapState(['userInfos', 'user','status'])
  },
   beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      return this.$router.push('/authentification');
    }
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
        .then(() => {
          this.$store.dispatch('getUserFeed', this.user.userId);
        })
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
  .row_posts_profil{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
    padding:30px;
  }
    .profil_container{
      margin-bottom: 10px;
      max-width: 680px;
      margin-right: 10px;
      width: 100%;
    }
    .posts_container{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 680px;
    }
}
@media all and (max-width: 900px){
  .profil_container{
      margin-right: 0px !important;
    }
    .row_posts_profil{
      align-items: center !important;
      flex-direction: column !important;
  }
}
</style>