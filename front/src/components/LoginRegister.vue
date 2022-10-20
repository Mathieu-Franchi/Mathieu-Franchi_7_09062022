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
                        <input v-model="email" @focusout.once="mailTest()" @keyup="mailTyping ? mailTest() : ''"
                        required
                        :style="{outline: mailOutline != null ? 'solid 2px' + mailOutline : ''}"
                        class="form-row__input" 
                        type="text" 
                        aria-label="Email" placeholder="Adresse mail" />
                        <p class="errorMsg">{{mailError}}</p>
                    </div>
                </div>
                <!-- NAME LASTNAME -->
                <div class="form-row" v-if="mode == 'create'">
                    <div class="input__error" style="align-self: self-start;">

                        <input v-model="name" @focusout.once="nameTest()" @keyup="nameTyping ? nameTest() : ''"
                        required 
                        minlength="1" maxlength="16"
                        :style="{outline: nameOutline != null ? 'solid 2px' + nameOutline : ''}"
                        class="form-row__input" type="text" 
                        aria-label="Name" placeholder="Prénom" />
                        <p class="errorMsg">{{nameError}}</p>
                    </div>
                    <div class="input__error" style="align-self: self-start;">
                        <input v-model="lastname" @focusout.once="lastnameTest()" @keyup="lastnameTyping ? lastnameTest() : ''"
                        required 
                        minlength="2" maxlength="16"
                        :style="{outline: lastnameOutline != null ? 'solid 2px' + lastnameOutline : ''}"
                        class="form-row__input"
                        type="text" 
                        aria-label="Lastname" placeholder="Nom" />
                        <p class="errorMsg">{{lastnameError}}</p>
                    </div>
                </div>
                <!-- PASSWORD -->
                <div class="form-row">
                    <div class="input__error">
                        <div class="relative" style="position: relative; width: 100%;">
                            <input v-model="password" @focusout.once="passwordTest()" @keyup="passwordTyping ? passwordTest() : ''"
                            :style="{outline: passwordOutline != null ? 'solid 2px' + passwordOutline : ''}"
                            required 
                            maxlength="32"
                            style="padding-right: 66px;" class="form-row__input password__type" type="password"
                            aria-label="Password" placeholder="Mot de passe" />
                            <!-- BUTTON UNMASK PASSWORD -->
                            <button @click="toggleMaskPassword" class="eye__button" type="button" aria-label="Montrer/cacher le mot de passe">
                                <FontAwesome v-if="toggleMask" class="fa__eye__mask" aria-hidden="true" icon="fa-solid fa-eye-slash" />
                                <FontAwesome v-else class="fa__eye" aria-hidden="true" icon="fa-solid fa-eye" />
                            </button>
                        </div>
                        <p class="errorMsg">{{passwordError}}</p> 
                    </div>
                </div>
                <!-- MESSAGE ERROR -->
                <div class="form-row" style="color: red;" v-if="mode == 'login' && status.includes('error_login')">
                    Adresse mail et/ou mot de passe invalide
                </div>
                <div class="form-row" style="color: red;" v-if="mode == 'create' && status.includes('error_unique')">
                    Adresse mail déjà utilisée
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
                    <button @click="login()" class="button" :class="{ 'button--disabled': !regexFields }"
                        v-if="mode == 'login'">
                        <span v-if="status.includes('loading-login')">Connexion en cours...</span>
                        <span v-else>Connexion</span>
                    </button>
                    <button @click="createAccount()" class="button" :class="{ 'button--disabled': !regexFields }"
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
            /*------- REGEX --------*/
            //regex mail
            regexMail: new RegExp (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
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
            //error handle
            errorColor: '#FF0000',
            succeedColor: '#4CBB17',
            //mail
            mailOutline: null,
            mailTyping: false,
            mailError: '',
            //password
            passwordOutline: null,
            passwordTyping: false,
            passwordError: '',
            //name
            nameOutline: null,
            nameTyping: false,
            nameError: '',
            //lastname
            lastnameOutline: null,
            lastnameTyping: false,
            lastnameError: '',
        }
    },
  
    computed: {
        regexFields: function() {
            if (this.mode == 'create') {
                if (this.regexTest(this.regexMail, this.email) && this.regexTest(this.regexPassword, this.password)
                && this.regexTest(this.regexName, this.name) && this.regexTest(this.regexLastname, this.lastname)) {
                    return true;
                } else {
                    
                    return false;
                }
            } else {
                if (this.regexTest(this.regexMail, this.email) && this.regexTest(this.regexPassword, this.password)) {
                    return true;
                } else {
                    
                    return false;
                }
            }
        },
         ...mapState(['status'])
    },
    methods: {
        /* SWITCH MODE */
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
        /* Toggle unmask password */
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
        /* LOGIN & REGISTER */
        login: function () {
        
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
        createAccount: function () {
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
        /******REGEX TEST ******/
        regexTest: function(regex, field){  
            return regex.test(field);
        },
        //MAIL
        mailTest: function (){
            if(this.mailTyping == false){
                
                this.mailTyping = true;
                
            }
            
            if(this.regexTest(this.regexMail, this.email))
            {
                this.mailOutline = this.succeedColor;
                this.mailError = ''
            }
            else{
                this.mailOutline = this.errorColor
                if (this.email == '') {
                    this.mailError = 'Veuillez remplir ce champ'
                }
                else{
                    this.mailError = 'Veuillez saisir une vraie adresse email'
                }
            }
        },
        //PASSWORD
        passwordTest: function (){
            if(this.passwordTyping == false){
                
                this.passwordTyping = true;
            }
                if(this.regexTest(this.regexPassword, this.password))
                {
                    this.passwordOutline = this.succeedColor;
                    this.passwordError = ''
                }
                else{
                    this.passwordOutline = this.errorColor
                    if (this.password == '') {
                        this.passwordError = 'Veuillez remplir ce champ'
                    }
                    else{
                        this.passwordError = 'Veuillez saisir un mot de passe valide'
                    }
                }
            
            
        },
        //NAME
        nameTest: function (){
            if(this.nameTyping == false){
                
                this.nameTyping = true;
            }
                if(this.regexTest(this.regexName, this.name))
                {
                    this.nameOutline = this.succeedColor;
                    this.nameError = ''
                }
                else{
                    this.nameOutline = this.errorColor
                    if (this.name == '') {
                        this.nameError = 'Veuillez remplir ce champ'
                    }
                    else{
                        this.nameError = 'Veuillez saisir un vrai prénom'
                    }
                }
        },
        //LASTNAME
        lastnameTest: function (){
            if(this.lastnameTyping == false){
                
                this.lastnameTyping = true;
            }
                if(this.regexTest(this.regexLastname, this.lastname))
                {
                    this.lastnameOutline = this.succeedColor;
                    this.lastnameError = ''
                }
                else{
                    this.lastnameOutline = this.errorColor
                    if (this.lastname == '') {
                        this.lastnameError = 'Veuillez remplir ce champ'
                    }
                    else{
                        this.lastnameError = 'Veuillez saisir un vrai nom'
                    }
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
            padding-top: 4px;
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
    width: 100%;
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