<template>
    <section id="profil__section" >
      <div class="profil__img__container" v-if="userInfos.photo != null">
        <img v-if="userInfos.photo != null" class="profil__img" crossorigin="anonymous" :src="userInfos.photo" alt="Votre photo de profil" />
      </div>
        <div class="input-group">
          <input type="file" class="profil__img__file" aria-label="Upload">
          <button class="btn__file" type="button">
            <!-- <FontAwesome class="fa__img" :icon="{ prefix: 'fas', iconName: 'bars' }" /> -->
          </button>
          <div class="fields">{{userInfos.email}}</div>
          <div class="fields">{{userInfos.name}}</div>
          <div class="fields">{{userInfos.lastname}}</div>
        </div>
    </section>
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex'
export default {
  name: 'ProfilComponent',
  data: function (){
    return {
      
    }
  },
  components :{
    
  },
  
  computed: {
    
    ...mapState(['userInfos'])
  },
  methods: {
    
  },

}
</script>

<style scoped lang="scss">
@import '../variables';
#profil__section{
  display: flex;
  flex-direction: column;
  
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
.profil__img__file{
  padding: 20px;
}
.btn__file{
  padding: 30px;
}

</style>