<template>
    <!-- BODY BACKGROUND -->
    <div id="body">
        <!-- CARD -->
        <div class="card">
            <!-- LOGO -->
            <h1 class="logo__h1">
                <img class="logo__img" alt="Groupomania logo"
                src="../assets/logos/icon-left-font-modif.png">
            </h1>
            <!-- CARD TITLE -->
            <h2 class="card__title" v-if="mode == 'login'">Connexion</h2>
            <h2 class="card__title" v-else>Inscription</h2>
            <!-- SWITCH MODE -->
            <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? 
                <span class="card__action" @click="switchToCreateAccount();">
                    Créer un compte
                </span>
            </p>
            <p class="card__subtitle" v-else>Tu as déjà un compte ? 
                <span class="card__action" @click="switchToLogin()">
                    Se connecter
                </span>
            </p>
            <!-- FORM -->
            <form  v-on:submit.prevent="whatForm()"> 
                <!-- EMAIL -->
                <div class="form-row">
                    <div class="input__error">

                        <input v-model="email" @focusout="mailTest()"
                        required
                        :style="{outline: 'solid 2px' + mailOutline}"
                        class="form-row__input" 
                        type="text" 
                        aria-label="Email" placeholder="Adresse mail" />
                        <p class="errorMsg">{{mailError}}</p>
                    </div>
                </div>
                <!-- NAME LASTNAME -->
                <div class="form-row" v-if="mode == 'create'">
                    <div class="input__error">

                        <input v-model="name" @focusout="nameTest()" 
                        required minlength="1" maxlength="16" 
                        class="form-row__input" type="text" 
                        aria-label="Name" placeholder="Prénom" />
                        <p class="errorMsg">Veuillez saisir votre vrai nom</p>
                    </div>
                    <div class="input__error">
                        <input v-model="lastname" @focusout="lastnameTest()" 
                        required minlength="2" maxlength="16" 
                        class="form-row__input"
                        type="text" 
                        aria-label="Lastname" placeholder="Nom" />
                        <p class="errorMsg">Veuillez saisir votre vrai nom</p>
                    </div>
                </div>
                <!-- PASSWORD -->
                <div class="form-row">
                    <div class="input__error">
                        <div class="relative" style="position: relative; width: 100%;">
                            <input v-model="password" @focusout="passwordTest()" required maxlength="32"
                                style="padding-right: 66px; width: 100%;" class="form-row__input password__type" type="password"
                                aria-label="Password" placeholder="Mot de passe" />
                            <!-- BUTTON UNMASK PASSWORD -->
                            <button @click="toggleMaskPassword" class="eye__button" type="button">
                                <FontAwesome v-if="toggleMask" class="fa__eye__mask" aria-hidden="true" icon="fa-solid fa-eye-slash" />
                                <FontAwesome v-else class="fa__eye" aria-hidden="true" icon="fa-solid fa-eye" />
                            </button>
                        </div>
                        <div class="errorMsg">Veuillez saisir votre vrai nom</div>
                    </div>
                </div>
                <!-- MESSAGE ERROR -->
                <div class="form-row" style="color: red;" v-if="mode == 'login' && status.includes('error_login')">
                    Adresse mail et/ou mot de passe invalide
                </div>
                <div class="form-row" style="color: red;" v-if="mode == 'create' && status.includes('error_unique')">
                    Adresse mail déjà utilisée
                </div>
                <div class="form-row" style="color: red;" v-if="mode == 'create' && status.includes('error_create')">
                    Champs invalide
                </div>
                <!-- REGEX PASSWORD VALIDATION -->
                <div class="form-row" style="flex-direction: column; align-items: flex-start;" v-if="mode == 'create' && this.password != ''">
                    <div class="regex" :style="{color: regexMinimum.test(password) ? 'green' : 'red'}">
                        Minimum 6 caractères &nbsp;
                        <FontAwesome v-if="regexMinimum.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark" />
                    </div>
                    <div class="regex" :style="{color: regexMaximum.test(password) ? 'green' : 'red'}">
                        Maximum 32 caractères &nbsp;
                        <FontAwesome v-if="regexMaximum.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark" />
                    </div>
                    <div class="regex" :style="{color: regexNumber.test(password) ? 'green' : 'red'}">
                        Minimum 1 chiffre &nbsp;
                        <FontAwesome v-if="regexNumber.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark" />
                    </div>
                    <div class="regex" :style="{color: regexLowercase.test(password) ? 'green' : 'red'}">
                        Minimum 1 lettre minuscule &nbsp;
                        <FontAwesome v-if="regexLowercase.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark" />
                    </div>
                    <div class="regex" :style="{color: regexUppercase.test(password) ? 'green' : 'red'}">
                        Minimum 1 lettre majuscule &nbsp;
                        <FontAwesome v-if="regexUppercase.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark" />
                    </div>
                    <div class="regex" :style="{color: regexSpecial.test(password) ? 'green' : 'red'}">
                        Minimum 1 caractère spécial : [@$!%*?&] &nbsp;
                        <FontAwesome v-if="regexSpecial.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark"/>
                        </div>
                    <div class="regex" :style="{color: regexSpace.test(password) ? 'green' : 'red'}">
                        Ne doit pas contenir d'espace &nbsp;
                        <FontAwesome v-if="regexSpace.test(password)" icon="fa-solid fa-circle-check"/>
                        <FontAwesome v-else icon="fa-solid fa-circle-xmark"/>
                    </div>
                </div>
                <!-- BUTTON SUBMIT -->
                <div class="form-row">
                    <button @click="login($event)" class="button" :class="{ 'button--disabled': !regexFields }"
                        v-if="mode == 'login'">
                        <span v-if="status.includes('loading-login')">Connexion en cours...</span>
                        <span v-else>Connexion</span>
                    </button>
                    <button @click="createAccount($event)" class="button" :class="{ 'button--disabled': !regexFields }"
                        v-else>
                        <span v-if="status.includes('loading-account')">Création en cours...</span>
                        <span v-else>Créer mon compte</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'LoginRegister',
    data: function () {
        return {
            //to switch login or create account
            mode: 'login',
            //fields required
            email: '',
            name: '',
            lastname: '',
            password: '',
            //For toggle mask password text
            toggleMask: false,
            //For unshow error when typing
            showError: false,
            /*------- REGEX --------*/
            //regex mail
            regexMail: new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
            //regex name
            regexName: new RegExp (/^(?=.{1,26}$)[a-zA-Zçäãâàáéêèëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/),
            //regex lastname
            regexLastname: new RegExp (/^(?=.{2,16}$)[a-zA-Zçäãâàáéèêëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/),
            //regex password
            regexPassword: new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/),
            /*------- REGEX ISOLATE PASSWORD --------*/
            regexMinimum: new RegExp (/^.{6,}$/),
            regexMaximum: new RegExp (/^.{0,32}$/),
            regexNumber: new RegExp (/.*[0-9].*/),
            regexLowercase: new RegExp (/.*[a-z].*/),
            regexUppercase: new RegExp (/.*[A-Z].*/),
            regexSpecial: new RegExp (/.*[@$!%*?&].*/),
            regexSpace: new RegExp(/^\S*$/),
            //field style error
            errorColor: '#FF0000',
            succeedColor: '#4CBB17',
            mailOutline: undefined,
            mailTyping: false,
        }
    },
  
    computed: {
        regexFields: function() {
            if (this.mode == 'create') {
                if (this.regexMail.test(this.email) === true && this.regexPassword.test(this.password) === true
                && this.regexName.test(this.name) === true && this.regexLastname.test(this.lastname) === true) {
                    return true;
                } else {
                    
                    return false;
                }
            } else {
                if (this.regexMail.test(this.email) === true && this.regexPassword.test(this.password) === true) {
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
        whatForm: function () {
            if (this.mode == 'login'){
                this.login;
            }
            else{
                this.createAccount;
            }
        },
        
        login: function (event) {
            event.preventDefault();
            if(this.regexFields == true){

                const self = this;
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                }).then(function () {
                    self.$router.push('/');
                })
            }
        },
        createAccount: function (event) {
            event.preventDefault();
            if (this.regexFields == true) {
                const self = this;
                this.$store.dispatch('createAccount', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    lastname: this.lastname,
                }).then(function () {
                    self.login();
                })
            }
        },
        toggleMaskPassword: function () {
            //Boolean Unmask and mask text password
            const passwordField = document.querySelector(".password__type")
            if (this.toggleMask === false) {
                passwordField.type = "text"
                this.toggleMask = true;
            }
            else {
                passwordField.type = "password"
                this.toggleMask = false;
            }
        },
        /******REGEX TEST ******/
        mailTest: function (){
            // if(this.mailTyping == false){
                
            //     this.mailTyping = true;
                let test = this.regexMail.test(this.email);
                if(test)
                {
                    this.mailOutline = this.succeedColor;
                    
                }
                else{
                    this.mailOutline = this.errorColor
                    if (this.email.length == 0) {
                        this.mailError = 'Veuillez remplir le champ'
                    }
                    else{
                        this.mailError = 'Veuillez saisir une vrai adresse email'
                    }
                }
            // }else{
            //     return;
            // }
            
        },
        // mailTestTyping: function (){
        //     if(this.mailTyping){
        //         let test = this.regexMail.test(this.email);
        //         if(test)
        //         {
        //             this.mailOutline = this.succeedColor;
                    
        //         }
        //         else{
                    
                    

        //                 this.mailOutline = this.errorColor
        //                 this.mailError = 'Veuillez saisir une vrai adresse email'
                    
        //         }
        //     }else{
        //         return;
        //     }
            
        // },
        passwordTest: function (){
            let test = this.regexPassword.test(this.password);
            console.log(test + 'password')
            if(test)
            {
                return true;
            }
            else{
                return false;
            }
        },
        
        nameTest: function (){
            let test = this.regexName.test(this.name);
            console.log(test + 'name')
            if(test)
            {
                return true;
            }
            else{
                return false;
            }
        },
        lastnameTest: function (){
            let test = this.regexLastname.test(this.lastname);
            console.log(test + 'lastname')
            if(test)
            {
                return true;
            }
            else{
                return false;
            }
        },

        /******REGEX TEST ******/
    }
}
</script>
      
<style scoped lang="scss">
@import '../variables';

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
    .input__error{
        flex: 1;
        display: flex;
        flex-direction: column;
        .errorMsg{
            color: #E34234;
            font-size: 13px;
        }
    }
}
.logo__h1 {
    
    
    width: 100%;
    height: 100px;
    display: flex;
    padding-right: 50px;
    justify-content: flex-start;
    
    align-items: center;
    
}
.logo__img {
    width: 100%;
    max-width: 405px;
    min-width: 220px;
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
.eye__button{
    position: absolute;
    display: inline-block;
    outline: none;
    border: none;
    border-radius: 0px 8px 8px 0px;
    height: 32px;
    width: 65px;
    background-color: rgb(242, 242, 242);
    right: 1px;
    top: 2px;
    cursor: pointer;
}
.fa__eye {
    color: $third-color;
    font-size: 20px;
}
.fa__eye__mask {
    display: inline-block;
    color: $third-color;
    font-size: 20px;
}
.form-row__input:focus{
    outline-color: $secondary-color;
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
  border: solid 1px $primary-color;
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
  .button:active {
    transform: scale(0.96);
  }
  .button--disabled {
    background:#cecece;
    color:#ececec;
  }
  .button--disabled:active{
    transform: none;
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
    padding-right: 30px;
    align-items: center;
    
}
.card__title{
    font-size: 20px;
}
.card{
        padding: 20px;
    }
}
</style>