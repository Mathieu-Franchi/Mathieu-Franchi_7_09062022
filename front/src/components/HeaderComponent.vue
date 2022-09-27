<template>
    <header>
        <h1 class="logo__h1__header">
            <router-link class="logo__link" to="/" @click="this.$emit('refresh-home');"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
            </router-link>
        </h1>

        <nav id="nav__header">
            <button class="burger__btn" @click="toggleNav" :class="{'open': showNav}" type="button" aria-label="Toggle navigation" v-bind:aria-expanded="showNav">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav__list">
                <li class="nav__li">
                    <router-link class="nav__a refresh" to="/" @click="this.$emit('refresh-home');">Accueil</router-link>
                </li>
                <li class="nav__li">
                    <router-link class="nav__a" to="/profil" @click="this.$emit('refresh-profil');">Profil</router-link>
                </li>
                <li class="nav__li">
                    <span class="nav__a" style="cursor: pointer;" @click="logout">Déconnexion</span>
                </li>
            </ul>
            <OverlayComponent :show="showNav" @toggle-modal="toggleNav()" class="overlayNav"/>
            <transition name="fade">
                <OptionsComponent :show="showNav" class="NavComponent">
                    <template v-slot:li__1>
                        <li class="options__li">
                            <router-link class="options" to="/" @click="this.$emit('refresh-home');">Accueil</router-link>
                        </li>
                    </template>
                    <template v-slot:li__2>
                        <li class="options__li">
                            <router-link class="options" to="/profil" @click="this.$emit('refresh-profil');">Profil</router-link>
                        </li>
                    </template>
                    <template v-slot:li__3>
                        <li class="options__li">
                            <span class="options" @click="logout">Déconnexion</span>
                        </li>
                    </template>
                </OptionsComponent>
            </transition>
        </nav>
    </header>
</template>

<script>
import OptionsComponent from './OptionsComponent.vue';
import OverlayComponent from './OverlayComponent.vue';
    export default {
    name: "HeaderComponent",
    components: { OptionsComponent, OverlayComponent },
    emits: ["refresh-home","refresh-profil"],
    data: function () {
        return {
            showNav: false,//For show NAV
        }
    },
    
    methods: {
        toggleNav: function () {
            this.showNav = !this.showNav
        },
        logout: function() {
            this.$store.commit('logout');
        },    
    },
    
}
</script>
<style scoped lang="scss">
@import '../variables';

.NavComponent {
    border-top: none;
    border-radius: 0px 0px 10px 10px;
    top: 70px;
    right: 0;
    min-width: 200px;
    z-index: 10;

}
.options__li {
    display: inline-block;

    .options {
        
        text-decoration: none;
        color: black;
        font-size: 20px;
        display: block;
        padding: 20px;
        border-radius: 10px;
        

    }

    .options:hover {
        background-color: $secondary-color;
        border-radius: 5px;
        transition: all 0.1s;
        color: $primary-color;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

header {

    display: flex;
    width: auto;
    
    height: 80px;
    flex-direction: row;
    
    align-items: center;
    box-shadow: inset 0px -1px 0px $primary-color;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
}
 #nav__header {
    flex-shrink: 0;
    width: 400px;
    
    
 }
.logo__h1__header{
    
    height: 77px;
    width: 100%;
    
    .logo__link{
        outline: none;
    }
    .logo__img {
        object-fit: cover;
        width: 100%;
        max-width: 350px;
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

//MEDIA QUERIES 900PX
@media all and (max-width: 900px) {
    
    
    #nav__header {
    
        width: 120px;
        display: flex;
        height: 78px;
        justify-content: center;
        align-items: center;
        flex-shrink: 1;
    }
    .nav__list {

        width: 0;
        height: 0;
        visibility: hidden;
        display: none;

    }
    
    .burger__btn {
    width: 100%;
    height: 100%;
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    visibility: visible;
    justify-content: center;
    background: #ffffff;
    align-items: center;
    position: relative;
    z-index: 10;
  }
  .burger__btn span {
    display: block;
    width: 30px;
    height: 2.4px;
    background: #333;
    position: absolute;
    pointer-events: none;
    transition: opacity 0.3s 0.15s ease-out;
  }
  .burger__btn span:nth-child(1),
  .burger__btn span:nth-child(3) {
    transition: transform 0.3s ease-out;
  }
  .burger__btn span:nth-child(1) {
    transform: translateY(7px);
  }
  .burger__btn span:nth-child(3) {
    transform: translateY(-7px);
  }
  .burger__btn.open span:nth-child(1) {
    transform: translate(0) rotate(135deg);
  }
  .burger__btn.open span:nth-child(2) {
    opacity: 0;
    transition: opacity 0s ease-out;
  }
  .burger__btn.open span:nth-child(3) {
    transform: translate(0) rotate(-135deg);
  }
}
@media all and (max-width: 1600px) {
    header {
        height: 70px;
    }

    .logo__h1__header {
        height: 68px;
    }
}

@media all and (max-width: 900px) {
    #nav__header {
        height: 68px;
    }
}

//cant have the menu burger when
@media all and (min-width: 901px) {
    .NavComponent, .overlayNav {
        display: none;
    }
}
</style>