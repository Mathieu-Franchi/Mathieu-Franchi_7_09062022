<template>
  <div id="body_profil">
    <section id="profil__section" >
      <div class="profil__img__container">
        <img v-if="userInfos.photo != null" class="profil__img" crossorigin="http://localhost:3000/" :src="userInfos.photo" alt="Votre photo de profil" />
      </div>
        <div class="input-group">
          <input type="file" class="profil__img__file" id="inputFile" aria-describedby="inputGroupFileAddon04"
            aria-label="Upload">
          <button class="btn__file" type="button">
            <!-- <FontAwesome class="fa__img" :icon="{ prefix: 'fas', iconName: 'bars' }" /> -->
          </button>
          <div class="name">{{userInfos.email}}</div>
          <div class="lastname">{{userInfos.name}}</div>
          <div class="password">{{userInfos.lastname}}</div>
        </div>

      
    </section>
    
  </div>
  <PostsHomeComponent />
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex'
import PostsHomeComponent from './PostsHomeComponent.vue'

export default {
  name: 'ProfilComponent',
  data: function (){
    return {
      
    }
  },
  components :{
    PostsHomeComponent,
  },
  
  computed: {
    
    ...mapState(['userInfos','user','posts'])
  },
  mounted: function () {
    //PAS BESOIN DE RE FETCH VU QUE TU FETCH DEJA DANS L'ACCUEIL
    this.$store.dispatch('getUserInfos', this.user.userId)
    
  },
  methods: {
    
  },

}
</script>

<style scoped lang="scss">
@import '../variables';
#body_profil {
  background-image: linear-gradient(62deg, $primary-color 0%, $secondary-color 20%, $third-color 100%);
  min-height: 100vh;
  
}
#profil__section{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profil__img__container{
  width: 300px;
  height: 300px;
  padding-top: 10px;
  border-radius: 50%;
  
  display: flex;
  flex-direction: column;
  .profil__img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

</style>