<template>
  
    <HeaderHomeComponent  />
    <PostHomeComponent  />
</template>

<script>
import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import PostHomeComponent from '@/components/PostHomeComponent.vue'
export default {
  name: 'HomeView',
  
   
  components: {
    HeaderHomeComponent, PostHomeComponent
  }
}
</script>