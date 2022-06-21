<template>
    <div id="body">
        <div class="card">
            <h1 class="logo__h1"><img class="logo__img" alt="Groupomania logo"
                    src="../assets/logos/icon-left-font-modif.png"></h1>
            <h2 class="card__title" v-if="mode == 'login'">Connexion</h2>
            <h2 class="card__title" v-else>Inscription</h2>
            <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action"
                    @click="switchToCreateAccount()">Créer un compte</span></p>
            <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action"
                    @click="switchToLogin()">Se
                    connecter</span></p>
            <div class="form-row">
                <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" />
            </div>
            <div class="form-row" v-if="mode == 'create'">

                <input v-model="nom" class="form-row__input" type="text" placeholder="Nom" />
            </div>
            <div class="form-row">
                <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
            </div>
            <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail et/ou mot de passe invalide
            </div>
            <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
                Adresse mail déjà utilisée
            </div>
            <div class="form-row">
                <button @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }"
                    v-if="mode == 'login'">
                    <span v-if="status == 'loading'">Connexion en cours...</span>
                    <span v-else>Connexion</span>
                </button>
                <button @click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields }"
                    v-else>
                    <span v-if="status == 'loading'">Création en cours...</span>
                    <span v-else>Créer mon compte</span>
                </button>
            </div>
        </div>
    </div>
</template>
      
      <script>

import { mapState } from 'vuex'
export default {
    name: 'LoginRegister',
    data: function () {
        return {
            mode: 'login',
            email: '',
            nom: '',
            password: '',
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/');
            return;
        }
    },
    computed: {
        validatedFields: function () {
            
            if (this.mode == 'create') {
                if (this.email != "" && this.nom != "" && this.password != "") {
                    return true;
                } else {
                    
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    
                    return false;
                }
            }
        },
        
        ...mapState(['status'])
    },
    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login';
            
        },
        login: function () {
            
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then(function () {
                self.$router.push('/login');
            }, function (error) {
                console.log(error);
            })
        },
        createAccount: function () {
            const self = this;
            this.$store.dispatch('createAccount', {
                email: this.email,
                nom: this.nom,
                password: this.password,
            }).then(function () {
                self.login();
            }, function (error) {
                console.log(error);
            })
        },
        test: function () {
        if (localStorage === undefined || localStorage.length === 0) {
            
            return true;
        }
        else {
          return false;
        }
    },
    }
}
</script>
      
<style lang="scss">
@import '../variables';
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#body {
  background-image: linear-gradient(62deg, $primary-color 0%, $secondary-color 20%, $third-color 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

.form-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
}
.logo__h1 {
    
    
    width: 100%;
    height: 100px;
    display: flex;
    
    justify-content: flex-start;
    
    align-items: center;
    
}
.logo__img {
    width: 100%;
    max-width: 405px;
    min-width: 255px;
    height: 100%;
    
    
    object-fit:contain;
    
}
.form-row__input {
        
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
    color: black;
}
    
.form-row__input::placeholder {
    color: #aaaaaa;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card__title {
  text-align:center;
  font-weight: 800;
  margin-bottom: 10px;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: $primary-color;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: $secondary-color;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  @media all and (max-width: 540px){
    .logo__h1 {
    
    
    width: 100%;
    height: 100px;
    display: flex;
    
    justify-content: center;
    
    align-items: center;
    
}
  }

</style>