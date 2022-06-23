<template>
<div id="posts">
  <article class="post">
    <form>
      <label for="post__title"></label>
      <input type="text" class="post__title" name="post__title"  placeholder= "Quoi de neuf ?" >
    <p class="burger"><FontAwesome :icon="{prefix:'fas',iconName: 'bars'}"/></p>
    </form>
    
      <label for="image__post">Choisir une image</label>

      <input type="file" class="image__post" name="image__post" accept="image/png, image/jpeg, image/gif, image/jpg" placeholder="Choisis mtn">
  </article>
  
  
</div>



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
.burger{
  width: 30px;
  height: 30px;
  font-size: large;
}
#posts
{
  width: auto;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 50px 25px 50px 25px;
  
  margin: auto;
  
  background-color: $third-color;
  
}

// #restaurants h2
// {
//   width: 100%;
  
//   margin-bottom: 25px;
  
//   max-width: 768px;
  
//   font-size: 30px;
// }
.post
{
  width: 100%;
  height: 290px;
  
  max-width: 768px;
  
  
  
  margin-bottom: 30px;
  
  display: flex;
  flex-direction: column;
  
  border-radius: 15px 15px 15px 15px;
  background-color: white;
  
 }
// #restaurants img 
// {
//   width: 100%;
//   height: 200px;
  
//   object-fit: cover;
  
//   border-radius: 15px 15px 0px 0px;
    
// }
// #restaurants h3
// {
//   width: 155px;
  
//   margin: 20px 0px 5px 10px;
// }
// #restaurants p 
// {
//   width: 120px;
  
//   margin-left: 10px;
// }



</style>