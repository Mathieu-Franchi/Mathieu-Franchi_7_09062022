<template>
    <header>
        <nav>
            <h1 class="logo__h1">

                <a href="#" class="nav-icon" aria-label="visit homepage" aria-current="page">
                    <img class="logo__img" src="../assets/logos/icon-left-font.png" alt="groupomania logo">
                </a>
            </h1>

            <div class="main-navlinks">
                <button class="hamburger" type="button" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="navlinks-container">
                    <router-link to="/" aria-current="page">Accueil</router-link>
                    <router-link to="/profil">Profil</router-link>
                    <router-link to="/login">Déconnexion</router-link>

                </ul>
            </div>


        </nav>
    </header>


</template>
<script>

export default {
    name: 'HeaderHomeBurgerComponent',
    mounted: function () {
        const hamburgerToggler = document.querySelector(".hamburger")
        const navLinksContainer = document.querySelector(".navlinks-container");

        const toggleNav = () => {
            hamburgerToggler.classList.toggle("open")

            const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
            hamburgerToggler.setAttribute("aria-expanded", ariaToggle)

            navLinksContainer.classList.toggle("open")
        }
        hamburgerToggler.addEventListener("click", toggleNav)

        new ResizeObserver(entries => {
            console.log(entries)
            if (entries[0].contentRect.width <= 900) {
                navLinksContainer.style.transition = "transform 0.3s ease-out"
            } else {
                navLinksContainer.style.transition = "none"
            }
        }).observe(document.body)

    }
}

</script>
<style scoped lang="scss">
@import '../variables';
nav {
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;

    /* padding: 15px 25px; */
    padding-top: 15px;
    padding-right: 25px;
    padding-bottom: 15px;
    
    background: #ffffff;
    box-shadow: inset 0px -1px 0px #c5c5c6;
    
}
.main-navlinks{
    flex-shrink: 0;
}
.nav-icon {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 20px;
}
.logo__h1{
    
    height: 49px;
    width: 100%;
    
    .logo__img {
            object-fit: cover;
            /* width: 20%; */
            /* max-width: 405px; */
            min-width: 255px;
            height: 51px;
        }
}

.hamburger {
  display: none;
}
.navlinks-container a {
  margin: 0 10px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: #414141;
  display: inline-block;
  position: relative;
}
.navlinks-container a::after {
//   content: "";
//   display: block;
//   position: absolute;
//   bottom: -3px;
//   width: 100%;
//   height: 1px;
//   transform: scaleX(0);
//   transform-origin: left;
//   background: #333;
//   transition: transform 0.3s ease-out;
content: '';

        background-color: $secondary-color;
        height: 2px;
        width: 0;
        position: absolute;
        bottom: -5px;
        right: 0;
        transition: 0.2s all ease-in-out;
}

.navlinks-container a:hover::after {
//   transform: scaleX(1)
width: 100%;
        left: 0;
}

@media (max-width: 900px) {
  nav {
    padding: 15px 20px;
    position: relative;
  }

  .nav-icon {
    order: 2;
    margin: 0 auto;
  }

  .nav-icon span {
    font-size: 22px;
  }

  .main-navlinks {
    order: 1;
  }
  /* Hamburger */
  .hamburger {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: none;
    display: flex;
    background: #ffffff;
    align-items: center;
    position: relative;
  }
  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: #333;
    position: absolute;
    pointer-events: none;
    transition: opacity 0.3s 0.15s ease-out;
  }
  .hamburger span:nth-child(1),
  .hamburger span:nth-child(3) {
    transition: transform 0.3s ease-out;
  }
  .hamburger span:nth-child(1) {
    transform: translateY(7px);
  }
  .hamburger span:nth-child(3) {
    transform: translateY(-7px);
  }
  .hamburger.open span:nth-child(1) {
    transform: translate(0) rotate(135deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
    transition: opacity 0s ease-out;
  }
  .hamburger.open span:nth-child(3) {
    transform: translate(0) rotate(-135deg);
  }

  .navlinks-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    background: #ffffff;
    top: 100%;
    left: 0;
    height: 100vh;
    padding: 15px 50px 15px 20px;
    border-right: 1px solid #c5c5c6;
    transform: translate(-100%);
  }
  .open {
    transform: translate(0%);
  }
  .navlinks-container a {
    font-size: 18px;
    margin: 10px 0;
    position: relative;
  }

}

@media (max-width: 500px) {
  .nav-icon img {
    width: 30px;
  }
  .nav-icon span {
    font-size: 20px;
  }
}


</style>