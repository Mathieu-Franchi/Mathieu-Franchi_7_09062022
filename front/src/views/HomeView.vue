<template>
  
    <HeaderHomeComponent  />
    <LoginRegister  />
</template>

<script>

import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import LoginRegister from '@/components/LoginRegister.vue'

export default {
  name: 'HomeView',
  
   
  components: {
    HeaderHomeComponent, LoginRegister
  }
}
</script>
