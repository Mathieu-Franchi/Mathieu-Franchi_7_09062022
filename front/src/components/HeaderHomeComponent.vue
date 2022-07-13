<template>
    <header>


        <h1 class="logo__h1__header">
            <router-link to="/"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
            </router-link>
        </h1>

        <nav id="nav__header">
            <button type="button" aria-label="Toggle navigation" aria-expanded="false" class="burger__btn" @click="NavToggle()">
                <FontAwesome class="fa__burger" :icon="{ prefix: 'fas', iconName: 'bars' }" />
            </button>
            <ul class="nav__list" :class="{ 'list--disabled': NavToggle }">
                <li class="nav__li">
                    <router-link class="nav__a" to="/">Accueil</router-link>
                </li>
                <li class="nav__li">
                    <router-link class="nav__a" to="/profil">Profil</router-link>
                </li>
                <li class="nav__li">
                    <router-link class="nav__a" to="/">Déconnexion</router-link>
                </li>
            </ul>
            <NavComponent class="NavComponent" v-show="NavToggle" /> 

        </nav>
    </header>
</template>

<script>
 import NavComponent from './NavComponent.vue';
    export default {
    name: "HeaderHomeComponent",
    data: function () {
        return {
            revele: false
        }
    },
    components: { NavComponent },
    
    methods: {
        NavToggle: function () {
            this.revele = !this.revele
        },
    },
    mounted: function () {
        const hamburgerToggler = document.querySelector(".burger__btn")
        const navLinksContainer = document.querySelector(".NavComponent");

        const toggleNav = () => {
            hamburgerToggler.classList.toggle("open")

            const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
            hamburgerToggler.setAttribute("aria-expanded", ariaToggle)

            navLinksContainer.classList.toggle("open")
        }
        hamburgerToggler.addEventListener("click", toggleNav)

        new ResizeObserver(entries => {
            
            if (entries[0].contentRect.width <= 900) {
                navLinksContainer.style.transition = "transform 0.3s ease-out"
            } else {
                navLinksContainer.style.transition = "none"
            }
        }).observe(document.body)

    },
}
</script>
<style scoped lang="scss">
@import '../variables';
.NavComponent{
    width: 20%;
    position: fixed;
    top: 80px;
    right: 0px;
    
}
header {

    display: flex;
    width: 100%;

    height: 80px;
    flex-direction: row;
    
    align-items: center;
    box-shadow: 0px 2px 3px $secondary-color;
    position: sticky;
    top: 0;
    background-color: white;
    
}
 #nav__header {
    flex-shrink: 0;
    width: 400px;
    
 }
.logo__h1__header{
    
    height: 70px;
    width: 100%;
    
    .logo__img {
        object-fit: cover;
        width: 100%;
        max-width: 405px;
        min-width: 255px;
        height: 100%;
    }
}
.nav__list {
    
    display: flex;
    justify-content: space-around;
    
    .nav__li {
        display: inline-block;
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
.burger__btn {
    width: 0;
    height: 0;
    visibility: hidden;
    display: none;
}

//MEDIA QUERIES 
@media all and (max-width: 900px) {
    #nav__header {
        width: 100%;
    }

    .nav__list {

        width: 0;
        height: 0;
        visibility: hidden;
        display: none;

    }

    .burger__btn {
        width: 40px;
        height: auto;
        visibility: visible;
        display: inline-block;
        outline: none;
        border: none;
        background: none;
        cursor: pointer;
    }

    .fa__burger {
        font-size: 32px;


    }

    #nav__header {
        width: auto;
        margin-right: 15px;
    }

    .logo__h1__header {
        margin-right: 30px;
    }
    .NavComponent {
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // position: absolute;
    // background: #ffffff;
    // top: 100%;
    // left: 0;
    // height: 100vh;
    // padding: 15px 50px 15px 20px;
    border-left: 1px solid $third-color;
    transform: translate(100%);
  }
  .open {
    transform: translate(0%);
  }
    // .list--disabled {
    //     display: block;
    //     width: 100%;
    //     height: 100vh;
    //     visibility: visible;
    // }

}
</style>