<template>
  
    <!-- <HeaderHomeComponent  /> -->
    <HeaderHomeBurgerComponent />
    <PostHomeComponent />
    <LoginRegister />
    <FooterComponent />
</template>

<script>
// import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import HeaderHomeBurgerComponent from '@/components/HeaderHomeBurgerComponent.vue'
import PostHomeComponent from '@/components/PostHomeComponent.vue'
import LoginRegister from '@/components/LoginRegister.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'HomeView',
  
   
  components: {
    HeaderHomeBurgerComponent, PostHomeComponent, LoginRegister, FooterComponent
  }
}
</script>

<style lang="scss">
@import '../variables';

</style>