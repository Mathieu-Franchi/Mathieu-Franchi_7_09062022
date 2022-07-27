<template>
  <HeaderHomeComponent />
  <ProfilComponent />
  <FooterComponent />

  

</template>

<script>

import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import ProfilComponent from '@/components/ProfilComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'ProfilComponentView',
  components: {
    ProfilComponent, HeaderHomeComponent,FooterComponent,
  },
  
}
</script>