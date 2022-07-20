<template>
  <div class="modal-container">

    <div class="overlay modal-trigger"></div>

    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">

      <button aria-label="close modal" class="close-modal modal-trigger">X</button>
      <h3 id="modalTitle">Créer une publication</h3>
      
    </div>

  </div>



</template>

<script>
// import axios from 'axios';
export default {
  name: 'CreatePostComponent',
  mounted: function () {
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal() {
      modalContainer.classList.toggle("active")
    }
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
  transition: visibility 0.4s;
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
  transition: opacity 0.4s 0.2s ease-out;
}
.modal-container.active .overlay {
  opacity: 1;
  transition: opacity 0.4s ease-out;
}

.modal {
  opacity: 0;
  width: 95%;
  height: auto;
  max-width: 600px;
  padding: 30px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 50px));
  transition: opacity 0.4s ease-out,
  transform 0.4s ease-out;
}

.modal-container.active .modal {
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: opacity 0.4s 0.2s ease-out,
  transform 0.4s 0.2s ease-out;
}

.close-modal {
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: #ff365e;
  color: #fff;
}


</style>