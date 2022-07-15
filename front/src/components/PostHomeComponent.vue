<template>
  <section id="post">
    <article class="post">
      <form>
        <label for="post__title"></label>
        <input type="text" class="post__title" name="post__title" placeholder="Quoi de neuf ?">


      <label for="image__post">Choisir une image</label>

      <input type="file" class="image__post" name="image__post" accept="image/png, image/jpeg, image/gif, image/jpg"
        placeholder="Choisis mtn">
      </form>
    </article>
  </section>
</template>
<script>

export default {
  name: 'PostHomeComponent',
  data: function () {
    return {
      
    };
  },
    
    
}

</script>
<style scoped lang="scss">
@import '../variables';

#post
{
  width: 100%;
  height: 70px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding for the header position fixed
  padding: 50px 25px 50px 25px;
  
  margin: auto;
  
  background-color: $third-color;
  
}


.post
{
  width: 100%;
  height: 290px;
  
  max-width: 768px;
  
  
  
  margin-bottom: 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  border-radius: 15px 15px 15px 15px;
  background-color: white;
  
 }
 .post__title{
  width: 100%;
 }
//MEDIA QUERIES 

</style>