<template>
  <HeaderHomeComponent @refresh-home="refreshHome()" />
  <CreatePostComponent @show-modal="showModal()"/>
  <div id="body_posts">
    <PostsHomeComponent @delete-post="deletePost($event)" @show-modal="showModal()" @refresh-post="this.$store.dispatch('getAllPosts');"/>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import PostsHomeComponent from '@/components/PostsHomeComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { mapState } from 'vuex'
export default {
  name: 'HomeView',

  beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
    }
    return;
  },
  created: function () {
    this.$store.dispatch('getAllPosts');
    this.$store.dispatch('getUserInfos', this.user.userId)
  },
  components: {
    HeaderHomeComponent, PostsHomeComponent, FooterComponent, CreatePostComponent
  },
  computed: {
    ...mapState(['posts','userInfos', 'user','date','status'])
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
        .then(() => {
          this.$store.dispatch('getAllPosts');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showModal: function (){
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.toggle("active")
    },
    
    
  }
}
</script>

<style lang="scss">
@import '../variables';
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