<template>
  <HeaderHomeComponent />
  <PostsHomeComponent />
  <FooterComponent />
</template>

<script>

import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import PostsHomeComponent from '@/components/PostsHomeComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'HomeView',

  beforeCreate: function () {
    if (localStorage.getItem("user") == null || this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
    }
    return;
  },
  components: {
    HeaderHomeComponent, PostsHomeComponent, FooterComponent
  }
}
</script>

<style lang="scss">
@import '../variables';
</style>