<template>
  <div class="modal-container">

    <div class="overlay modal-trigger"></div>

    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
      <div class="modal__header">
        <button aria-label="close modal" class="close-modal modal-trigger">X</button>
        <h3 class="modal__title">Créer une publication</h3>
      </div>
      <input type="text" class="description">
    </div>

  </div>



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
    
    ...mapState(['userInfos'])
  },
  mounted: function () {
    this.toggleModal();
    this.$store.dispatch('getUserInfos', {
            params: JSON.parse(localStorage.getItem('user')).userId,

    })
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
      console.log(this.userInfos.name);
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
  transition: visibility 0.15s;
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
  transition: opacity 0.2s 0.2s ease-out;
}
.modal-container.active .overlay {
  opacity: 1;
  transition: opacity 0.15s ease-out;
}

.modal {
  opacity: 0;
  width: 95%;
  height: auto;
  max-width: 600px;
  border: solid 1px $primary-color;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 50px));
  transition: opacity 0.2s ease-out,
  transform 0.15s ease-out;

}

.modal-container.active .modal {
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: opacity 0.15s 0.15s ease-out,
  transform 0.15s 0.15s ease-out;
}

.modal__header{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: solid 1px $primary-color;
   .modal__title{
    font-size: 25px;
    
    
   }
     .close-modal {
       padding: 8px 10px;
       border: none;
       border-radius: 5px;
       font-size: 18px;
       position: absolute;
       top: 15px;
       right: 20px;
       cursor: pointer;
       background: #ff365e;
       color: #fff;
     }
}

</style>