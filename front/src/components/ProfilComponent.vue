<template>
<div id="body">
 <section id="profil__section">
  <div class="profil__img__container">
    <img class="profil__img" src="../assets/placeholder_img_profil.jpg" alt="image de votre profil"/>
    <div class="input-group">
  <input type="file" class="profil__img__file" id="inputFile" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
  <button class="btn__file" type="button">Modifier Image</button>
</div>

  </div>


 </section>
</div>

  

</template>

<script>



export default {
  name: 'ProfilComponent',
  
}
</script>

<style scoped lang="scss">
@import '../variables';
#body {
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