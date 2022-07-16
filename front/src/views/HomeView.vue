<template>
  <HeaderHomeComponent />
  <PostsHomeComponent />
  <LoginRegister />
  <FooterComponent />
</template>

<script>

import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import PostsHomeComponent from '@/components/PostsHomeComponent.vue'
import LoginRegister from '@/components/LoginRegister.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'HomeView',
  
   
  components: {
    HeaderHomeComponent, PostsHomeComponent, LoginRegister, FooterComponent
  }
}
</script>

<style lang="scss">
@import '../variables';

</style>