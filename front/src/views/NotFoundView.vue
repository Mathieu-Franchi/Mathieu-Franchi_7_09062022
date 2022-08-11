<template>
  <HeaderHomeComponent />
  <div id="home">
    <p class="txt">404 PAGE NOT FOUND </p>
    <router-link to="/" class="back"><span class="txt_link">Retourner à l'accueil</span> </router-link>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'NotFoundView',
  beforeCreate: function () {
    if (!localStorage.getItem("user") || this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
    }
    return;
  },
  components: {
    HeaderHomeComponent, FooterComponent, 
  },
}
</script>

<style scoped lang="scss">



@import '../variables';
//BODY
#home {
    background-color: #3c3c3c;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    min-height: 100vh;
    padding: 30px;

    .txt {
        color: $secondary-color;
        font-size: 5em;
        padding: 30px;
        position: absolute;
        top: 20%;
        bottom: 50%;
    }

        .back {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 40%;
            bottom: 50%;
            background: $secondary-color;
            color: $third-color;
            border-radius: 15px;
            font-weight: 900;
            font-size: 30px;
            border: none;
            width: 350px;
            height: 40px;
            transition: transform 0.2s ease-in-out, border 0.3s ease-in-out;
            text-decoration: none;
            .txt_link{
                display: inline-block;
            }
        }
                .back:hover{
                    border: 1px solid $primary-color;
                }
                .back:active {
                    transform: scale(0.92);
                }
}
</style>