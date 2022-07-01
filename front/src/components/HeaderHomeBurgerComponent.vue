<template>

    <header>
        <h1 class="logo__h1__header"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
        </h1>
        <nav id="nav__header">
            <FontAwesome :icon="{prefix:'fas',iconName: 'bars'}"/> 
            
        </nav>
    </header>
    


</template>
<script>

    export default {
    name: 'HeaderHomeBurgerComponent',
    
    
}

</script>
<style scoped lang="scss">

@import '../variables';



header {

    

    display: flex;
    width: 100%;
   
    height: 80px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px 2px 5px rgb(201, 201, 201);
     position: sticky;
     top:0;
   
   
    
    background-color: white;
}
 #nav__header {
   
    width: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: flex-end;
    
 }
.logo__h1__header{
    height: 70px;
    width: 100%;
    
    .logo__img {
        object-fit: cover;
        min-width: 320px;

    }
}


</style>