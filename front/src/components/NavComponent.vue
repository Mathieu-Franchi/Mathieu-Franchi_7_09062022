<template>
    <ul class="nav__burger__list">
        <li class="nav__burger__li">
            <router-link class="nav__burger__a" to="/">Accueil</router-link>
        </li>
        <li class="nav__burger__li">
            <router-link class="nav__burger__a" to="/profil">Profil</router-link>
        </li>
        <li class="nav__li">
            <router-link class="nav__burger__a" to="/">Déconnexion</router-link>
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
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 30vh;
    padding: 20px;
    background-color: #f76464;
    transform: translateX(100%);

    .nav__burger__a{
        text-decoration: none;
        color: black;
    }

}
</style>