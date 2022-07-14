<template>
  <HeaderHomeComponent />
  <ProfilComponent />


  

</template>

<script>

import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import ProfilComponent from '@/components/ProfilComponent.vue'

export default {
  name: 'ProfilComponentView',
  components: {
    ProfilComponent, HeaderHomeComponent,
  }
}
</script>