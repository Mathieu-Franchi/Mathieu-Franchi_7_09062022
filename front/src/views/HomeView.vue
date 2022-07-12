<template>
  
    <HeaderHomeComponent  />
    <PostHomeComponent  />
    <LoginRegister />
</template>

<script>
import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import PostHomeComponent from '@/components/PostHomeComponent.vue'
import LoginRegister from '@/components/LoginRegister.vue'
export default {
  name: 'HomeView',
  
   
  components: {
    HeaderHomeComponent, PostHomeComponent, LoginRegister
  }
}
</script>