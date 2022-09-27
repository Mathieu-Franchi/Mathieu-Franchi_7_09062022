<template>
  <section id="profil__section">
    <div class="profil__img__btn" v-if="userInfos.photo != null">
      <div class="profil__img__container" >
        <img class="profil__img" crossorigin="anonymous" :src="userInfos.photo" alt="Votre photo de profil" />
      </div>
      <input style="display: none;" type="file" class="profil__img__file" ref="inputFileProfil" aria-label="Upload">
      <button  @click="$refs.inputFileProfil.click()" class="btn__file" type="button">
        <FontAwesome class="icon-camera" icon="fa-solid fa-camera" />
      </button>
    </div>
    <div class="field-group">
      <div class="field">Email:</div>
      <div class="fields">{{userInfos.email}}</div>
      <div class="field">Prénom:</div>
      <div class="fields">{{userInfos.name}}</div>
      <div class="field">Nom:</div>
      <div class="fields">{{userInfos.lastname}}</div>
    </div>
  </section>
</template>

<script>
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
  align-items: center;
  flex-direction: column;
}
.profil__img__btn{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 650px;
  background-color: $third-color;
  border: solid 1px $primary-color;
  border-radius: 5px;
  margin-bottom: 5px;
}
.profil__img__container{
  width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    
  .profil__img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 1px $secondary-color;
  }
}
.btn__file{
  max-width: 100px;
  padding: 10px;
  cursor: pointer;
  border: solid 1px $primary-color;
  border-radius: 50%;
  background-color: white;
  margin-bottom: 10px;
  .icon-camera{
    font-size: 20px;
  }
}
.field-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #F5F6F7;
  max-width: 680px;
  padding: 10px;
  border: solid 1px $third-color;
  .fields{
    background-color: white;
    border: 1px solid $secondary-color;
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    word-break: break-word;
    font-size: 22px;
  }
  .field{
    font-size: 16px;
    margin-bottom: 5px;
  }
}

</style>