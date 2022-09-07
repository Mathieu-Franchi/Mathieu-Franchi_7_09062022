<template>
  <NotificationBar/>
  <router-view></router-view>
</template>

<script>
  import NotificationBar from '@/components/NotificationBar.vue'
  export default {
    components: {
      NotificationBar
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import 'variables';
* {
  font-family: 'Lato', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  
}
html {
  scroll-behavior: smooth;
}
#app {
  max-width: 100%;
}
img { font-size: 0.5rem; }
</style>