<template>
    <ul class="nav__burger__list">
        <li class="nav__burger__li">
            <router-link class="nav__burger__a" to="/"><span class="surlign">Accueil</span></router-link>
        </li>
        <li class="nav__burger__li">
            <router-link class="nav__burger__a" to="/profil"><span class="surlign">Profil</span></router-link>
        </li>
        <li class="nav__burger__li">
            <router-link class="nav__burger__a" to="/"><span class="surlign">Déconnexion</span></router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "NavComponent",
}
</script>

<style scoped lang="scss">


@import '../variables';
.nav__burger__list {
    
        position: fixed;
        top: 80px;
        right: 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 200px;
        height: 200px;
        padding: 5px;
        border: 1px solid $primary-color;
        border-top: none;
        border-radius: 0px 0px 10px 10px;
        background-color: white;
        transform: translateX(100%);

    .nav__burger__a{
        text-decoration: none;
        color: black;
        font-size: 20px;
        display: block;
        padding: 20px;
        border-radius: 10px;
        
    }
    .nav__burger__li{
        display: inline-block;
        }
    .nav__burger__a:hover{
        
        letter-spacing: 3px;
        transition: all 0.1s;
        color: $primary-color;
    }
    .surlign {
        position: relative;
    }
    .surlign:after {
        content: '';
        background-color: $secondary-color;
        height: 2px;
        width: 0;
        position: absolute;
        bottom: -5px;
        right: 0;
        transition: 0.2s all ease-in-out;
    }
    .nav__burger__a:hover .surlign:after {
        width: 100%;
        left: 0;
    }
}
</style>