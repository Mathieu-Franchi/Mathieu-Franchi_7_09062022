<template>
  <!-- MODAL CONTAINER -->
  <div class="modal-container">
    <!-- OVERLAY -->
    <div class="overlay modal-trigger"></div>
    <!-- MODAL -->
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
      <!-- MODAL HEADER -->
      <div class="modal__header">
        <button aria-label="close modal" class="close-modal modal-trigger">
          <FontAwesome style="color: white;" icon="fa-solid fa-xmark" />
        </button>
        <h3 class="modal__title fontsize__titles">Créer une publication</h3>
      </div>
      <!-- MODAL PROFIL -->
      <div class="post__profil">
        <div v-if="userInfos.photo != null" class="post__profil__img__container">
          <img class="post__profil__img" v-if="userInfos.photo != null" crossorigin="http://localhost:3000/" :src="userInfos.photo"
            alt="Photo de profil" />
        </div>
        <div class="post__name__date">
          <h2 class="post__name fontsize__p">
            {{ userInfos.name + ' ' + userInfos.lastname }}
          </h2>
          <p class="post__date">{{ date }}</p>
        </div>
      </div>
      <!-- MODAL MAIN CONTENT -->
      <textarea v-model="description" class="description" type="text" placeholder="Quoi de neuf ?"></textarea>
      <input type="file" @change="onFileSelected">
      <button @click="onFileSelected()" class="button">
        <span v-if="status == 'loading'">Chargement du fichier en cours...</span>
        <span v-else>Choisir une image</span>
      </button>
      <button @click="createPost()" class="button" :class="{ 'button--disabled': !validatedFields }">
        <span v-if="status == 'loading'">Publication en cours...</span>
        <span v-else>Publier</span>
      </button>

    </div>
    <!-- MODAL -->
  </div>
  <!-- MODAL CONTAINER -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CreatePostComponent',
  data: function (){
    return {
      
      description: '',
      imageUrl: null,
    }
  },
  computed: {
    validatedFields: function () {


      if (this.description != "") {
        return true;
      } else {

        return false;
      }

    },
         
    ...mapState(['userInfos','date', 'status'])
  },
  mounted: function () {
    this.toggleModal();
    // this.$store.dispatch('getUserInfos', JSON.parse(localStorage.getItem('user')).userId)
  },
  methods: {
    toggleModal: function () {
      const modalContainer = document.querySelector(".modal-container");
      const modalTriggers = document.querySelectorAll(".modal-trigger");

      modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

      function toggleModal() {
        modalContainer.classList.toggle("active")
      }
    },
    createPost: function() {
      const self = this;
      this.$store.dispatch('createPost', {
        name: this.userInfos.name,
        lastname: this.userInfos.lastname,
        description: this.description,
        photo: this.userInfos.photo,


      }).then(function () {
        self.$store.dispatch('getAllPosts');
      })
      .catch(function (){
        console.log('nope');
      })
    },
    onFileSelected(event) {
      this.imageUrl = event.target.files[0];
      console.log(event);
    },
    // onUpload() {

    // },
  },



}
</script>

<style scoped lang="scss">

@import '../variables';


.modal-container {
  /* display: none; */
  visibility: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: visibility 0.3s;
  z-index: 100;
}
.modal-container.active {
  /* display: block; */
  visibility: visible;
}

.overlay {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #333333d3;
  transition: opacity 0.3s 0.3s ease-out;
}
.modal-container.active .overlay {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.modal {
  opacity: 0;
  width: 100%;
  height: auto;
  max-width: 600px;
  border: solid 1px $primary-color;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 50px));
  transition: opacity 0.3s ease-out,
  transform 0.3s ease-out;
  

}

.modal-container.active .modal {
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s 0.2s ease-out,
  transform 0.2s 0.2s ease-out;
}
//Header modal
.modal__header{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: $primary-color 0px 0px 1px;
   .modal__title{
    font-size: 25px;
    -webkit-font-smoothing: antialiased;
    
   }
     .close-modal {
       padding: 8px 10px;
       border: none;
       outline: none;
       border-radius: 5px;
       font-size: 18px;
       position: absolute;
       top: 15px;
       right: 20px;
       cursor: pointer;
       background: #ff365e;
       color: #fff;
       transition: transform 0.2s ease-in-out;
     }
     .close-modal:active{
      transform: scale(0.92);
     }
}
//profil img + name lastname
.post__profil {
  display: flex;
  width: 100%;
  padding: 10px;

  .post__profil__img__container {
    width: 50px;
    
    margin-right: 20px;

    .post__profil__img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border: solid 1px #FFD7D7;
      border-radius: 50%;
    }


  }

  .post__name__date {
    .post__name {
      font-size: 20px;

    }

    .post__date {
      font-size: 12px;
      color: #b0b3b8;
    }
  }
}
.description{
  width: 100%;
  border: none;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  height: auto;
  user-select: text;
  white-space: pre-wrap;
  word-break: break-word;
  resize: none;
  font-size: 20px;
  padding: 10px;
  
}

@media all and (max-width: 450px){
.fontsize__titles{
  font-size: 20px !important;
}
.fontsize__p{
  font-size: 15px !important;
}
.modal{
  max-width: 320px !important;
}
}
@media all and (max-width: 640px){
.modal{
  max-width: 450px;
}
}

</style>