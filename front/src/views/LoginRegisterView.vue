<template>

  <LoginRegister />


  

</template>

<script>
import LoginRegister from '@/components/LoginRegister.vue'
export default {
  name: 'LoginRegisterView',
  beforeCreate: function(){
    if(localStorage.getItem("user") && this.$store.state.user.userId != -1){
      this.$router.push('/');
    }
    return;
  },
  components: {
    LoginRegister
  }
}
</script>