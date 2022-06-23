<template>

    <header>
        <h1 class="logo__h1__header"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
        </h1>
        <nav id="nav__header">
            
            <ul class="nav__list">
                <li class="nav__li"><router-link class="nav__a" to="/">Accueil</router-link></li>
                <li class="nav__li"><router-link class="nav__a" to="/profil">Profil</router-link></li>
                <li class="nav__li"><router-link class="nav__a" to="/">Déconnexion</router-link></li>
            </ul>
        </nav>
    </header>
    


</template>
<script>

    export default {
    name: 'HeaderHomeComponent',
    
    
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
.nav__list {
    width: 100%;
    display: flex;
     justify-content: flex-end;
    

    .nav__li {
        display: inline-block;
        width: 120px;
        
        
    }
    .nav__a {
        transition: all 0.2s ease 0s;
        color: black;
        font-size: 20px;
        text-decoration: none;
    }

    
    .nav__a:hover {
        color: $primary-color;
        
    }
}
@media all and (max-width: 640px) {
    #nav__header {

        display: none;


    }
    
}

</style>