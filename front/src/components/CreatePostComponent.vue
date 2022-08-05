<template>
  <!-- MODAL CONTAINER -->
  <div class="modal-container">
    <!-- OVERLAY -->
    <div class="overlay modal-trigger"></div>
    <!-- MODAL -->
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
      <div class="modal__header">
        <button aria-label="close modal" class="close-modal modal-trigger">
          <FontAwesome style="color: white;" icon="fa-solid fa-xmark" />
        </button>
        <h3 class="modal__title fontsize__titles">Créer une publication</h3>
      </div>
      <div class="post__profil">
        <div v-if="userInfos.photo != null" class="post__profil__img__container">
          <img class="post__profil__img" :src="userInfos.photo" alt="Photo de profil" />
        </div>
        <div class="post__name__date">
          <h2 class="post__name fontsize__p">
            {{ userInfos.name + ' ' + userInfos.lastname }}
          </h2>
          <p class="post__date">{{ date }}</p>
        </div>
      </div>
      <textarea class="description" type="text" placeholder="Quoi de neuf ?"></textarea>
      <!-- tailwindtest -->
      <!-- <div class="flex justify-center items-center w-full">
        <label for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span>
              or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden">
        </label>
      </div> -->
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
      imageUrl: '',
      
    }
  },
  computed: {
    
    ...mapState(['userInfos','date'])
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
        imageUrl: this.imageUrl,

      }).then(function () {
        self.$store.dispatch('getAllPosts');
      })
      .catch(function (){
        console.log('nope');
      })
    },
    test: function() {
     
    },
    
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
    height: 50px;
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