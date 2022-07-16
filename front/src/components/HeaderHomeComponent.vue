<template>
    <header>


        <h1 class="logo__h1__header">
            <router-link class="logo__link" to="/" @click="ScrollTop"><img class="logo__img" alt="Groupomania logo" src="../assets/logos/icon-left-font.png">
            </router-link>
        </h1>

        <nav id="nav__header">
            <button type="button" aria-label="Toggle navigation" aria-expanded="false" class="burger__btn">
                
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav__list">
                <li class="nav__li">
                    <router-link class="nav__a" to="/" @click="ScrollTop">Accueil</router-link>
                </li>
                <li class="nav__li">
                    <router-link class="nav__a" to="/profil">Profil</router-link>
                </li>
                <li class="nav__li">
                    <router-link class="nav__a" to="/">Déconnexion</router-link>
                </li>
            </ul>
            <NavComponent class="NavComponent" />

        </nav>
    </header>
</template>

<script>
 import NavComponent from './NavComponent.vue';
    export default {
    name: "HeaderHomeComponent",
    data: function () {
        return {
            
        }
    },
    components: { NavComponent },
    
    methods: {
        ScrollTop: function(){
            window.scrollTo({
                top:0,
                left: 0,
            })
        }
        
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
.NavComponent {
    display: none;
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
    
    height: 78px;
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
    
        width: 120px;
        display: flex;
        height: 78px;
        justify-content: center;
        align-items: center;
        flex-shrink: 1;
    }

    
  .open.NavComponent {
    right: 15px;
  }      
  .open {
    // transform: translate(0%);
    display: flex;
    
    
  }
  .burger__btn {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
    display: flex;
        
    justify-content: center;
    background: #ffffff;
    align-items: center;
    position: relative;
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

</style>