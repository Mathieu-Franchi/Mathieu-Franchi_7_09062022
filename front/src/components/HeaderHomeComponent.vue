<template>

    <header>
        <h1 class="logo__h1__header"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
        </h1>
        <nav id="nav__header">
            <p class="burger"><FontAwesome class="fa_burger" :icon="{prefix:'fas',iconName: 'bars'}"/></p>
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
    margin-right: 20px;
    

    .nav__li {
        display: inline-block;
        width: 120px;
        
        
    }
    .nav__a {
        transition: all 0.2s ease 0s;
        color: black;
        font-size: 20px;
        text-decoration: none;
        position: relative;
    }
    .nav__a:after {
        content: '';
        background-color: $secondary-color;
        height: 2px;
        width: 0;
        position: absolute;
        bottom: -5px;
        right: 0;
        transition: 0.2s all ease-in-out;

    }
    .nav__a:hover:after {
        width: 100%;
        left: 0;
    }

    
    .nav__a:hover {
        color: $primary-color;
        
    }
}
.burger {
    width: 0;
    height: 0;
    visibility: hidden;
    display: none;
}
@media all and (max-width: 768px) {
    #nav__header {
        width: 100%;
    }
    .nav__list {
    
            width: 0;
            height: 0;
            visibility: hidden;
            display: none;
    
        }
    .burger {
        width: 300px;
        height: auto;
        visibility: visible;
        display: block;
    }
    .fa_burger {
        width: 100%;
    }
}

</style>