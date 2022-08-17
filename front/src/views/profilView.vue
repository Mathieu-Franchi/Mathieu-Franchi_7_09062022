<template>
  <HeaderComponent @refresh-profil="refreshProfil()"/>
  <CreatePostComponent 
  v-if="showCreatePost"
  @refresh-posts="this.$store.dispatch('getUserFeed', user.userId);" 
  @show-modal="showModal()"/>
  
  <div id="body_posts_profil">
    <div class="profil_container">
      <ProfilComponent />
    </div>
    <div class="posts_container">
      <ButtonCreatePost @show-modal="showModal()"/>
      <PostsComponent :posts="this.postsUser"
      @delete-post="deletePost($event)" 
      @refresh-post="this.$store.dispatch('getUserFeed');"/>
    </div>
  </div>
  <FooterComponent />
  

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ProfilComponent from '@/components/ProfilComponent.vue'
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import ButtonCreatePost from '@/components/ButtonCreatePost.vue'
import PostsComponent from '@/components/PostsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

import { mapState } from 'vuex'

export default {
  name: 'ProfilComponentView',
  components: {
    HeaderComponent, ProfilComponent, PostsComponent, FooterComponent,
    ButtonCreatePost,
    CreatePostComponent
    
  },
  data: function () {
    return {
      showCreatePost: false
    }
  },
  computed: {
    ...mapState(['postsUser', 'userInfos', 'user', 'date', 'status'])
  },
   beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
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
        .catch((error) => {
          console.log(error);
        });
    },
    showModal: function () {
      this.showCreatePost = !this.showCreatePost
    },



  }
}
</script>
<style lang="scss">
@import '../variables';
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