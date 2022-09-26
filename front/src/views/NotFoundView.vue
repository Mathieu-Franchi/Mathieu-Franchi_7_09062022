<template>
  <HeaderComponent />
  <div id="container">
    <div class="content">
      <p class="txt">404 PAGE NOT FOUND </p>
      <div class="button">

        <router-link to="/" class="back">Retourner à l'accueil</router-link>
      </div>

    </div>

  </div>
 <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'NotFoundView',
  beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      return this.$router.push('/authentification');
    }
    
  },
  components: {
    HeaderComponent, FooterComponent
  },
}
</script>

<style scoped lang="scss">





@import '../variables';
//BODY
#container {
  background-color: #3c3c3c;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  min-height: calc(100vh - 78px);;
  .content {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .txt {
      color: $secondary-color;
      font-size: clamp(30px, 6vw, 10em);
      padding: 30px 0px;
    }
    .back {
      display: inline-block;
      background: $secondary-color;
      color: $third-color;
      border-radius: 15px;
      font-weight: 900;
      font-size: clamp(18px, 3vw, 25px);
      border: 1px solid transparent;
      width: 100%;
      min-width: 100px;
      max-width: 350px;
      transition: transform 0.2s ease-in-out, border 0.3s ease-in-out;
      text-decoration: none;
      padding: 10px;
    }

    .back:hover {
      border: 1px solid $primary-color;
    }

    .back:active {
      transform: scale(0.96);
    }
  }
}
</style>