<template>

    <header>
        <h1 class="logo__h1"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
        </h1>
        <nav>
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
    data: function () {
        return {
            msg: 'hello'
        }
    },
    
}

</script>
<style scoped lang="scss">
@import '../variables';


header {

    

    display: flex;
    height: 120px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px 2px 5px rgb(201, 201, 201);
    position: relative;
    padding: 30px 10%;
}
// nav {
   
//     width: 50%;
    
// }
.logo__h1{
    
    .logo__img {
        object-fit: cover;

    }
}
.nav__list {
    width: 100%;
    
    display: flex;
    justify-content: space-between;

    .nav__li {
        display: inline-block;
        width: 100px;
        
        
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

</style>