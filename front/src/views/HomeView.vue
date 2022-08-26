<template>
  <HeaderComponent @refresh-home="refreshHome()" />
  <CreatePostComponent 
  v-if="showCreatePost"
  @refresh-posts="this.$store.dispatch('getAllPosts');" 
  @show-modal="showModal()"/>
  <main id="body_posts">
    <ButtonCreatePost @show-modal="showModal()"/>
    <PostsComponent 
    :posts="this.posts" 
    @delete-post="deletePost($event)"  
    @refresh-post="this.$store.dispatch('getAllPosts');"/>
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ButtonCreatePost from '@/components/ButtonCreatePost.vue'
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import PostsComponent from '@/components/PostsComponent.vue'
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
    HeaderComponent,
    PostsComponent,
    FooterComponent,
    CreatePostComponent,
    ButtonCreatePost
  },
  data: function () {
    return {
      showCreatePost: false
    }
  },
  computed: {
    ...mapState(['posts', 'userInfos', 'user', 'date', 'status'])
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
    showModal: function () {
      this.showCreatePost = !this.showCreatePost
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