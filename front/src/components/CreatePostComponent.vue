<template>
  <!-- MODAL CONTAINER -->
  <div class="modal-container">
    <!-- OVERLAY -->
    <div class="overlay modal-trigger" @click="this.$emit('show-modal')"></div>
    <!-- MODAL -->
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
      <!-- MODAL HEADER -->
      <div class="modal__header">
        <button aria-label="close modal" class="close-modal modal-trigger" @click="this.$emit('show-modal')">
          <FontAwesome style="color: white;" icon="fa-solid fa-xmark" />
        </button>
        <h3 class="modal__title fontsize__titles">Créer une publication</h3>
      </div>
      <!-- MODAL PROFIL -->
      <div class="post__profil">
        <div v-if="userInfos.photo != null" class="post__profil__img__container">
          <img class="post__profil__img" v-if="userInfos.photo != null" crossorigin="anonymous" :src="userInfos.photo"
            alt="Photo de profil" />
        </div>
        <div class="post__name__date">
          <h2 class="post__name fontsize__p">
            {{ userInfos.name + ' ' + userInfos.lastname }}
          </h2>
          <p class="post__date">{{ new Date() }}</p>
        </div>
      </div>
      <!-- MODAL MAIN CONTENT -->
      <textarea v-model="description" class="description" type="text" placeholder="Quoi de neuf ?"></textarea>
      <!-- button choose file + publish container -->
      <div class="buttons__container">
        <div class="drop_img">
          <input type="file" style="display: none;" @change="onFileSelected" ref="inputFile" class="button__file">
        </div>
        <button @click="$refs.inputFile.click()" class="button__file">
          <span v-if="status.includes('loading-createPost')">Chargement du fichier en cours...</span>
          <span v-else>Choisir une image</span>
        </button>
        <button @click="publishPost()" class="button__publish" :class="{ 'button--disabled': !validatedFields }">
          <span v-if="status.includes('loading-createPost')">Publication en cours...</span>
          <span v-else-if="status.includes('post-created')">Post créé !</span>
          <span v-else>Publier</span>
        </button>
      </div>
      <!-- button choose file + publish container -->
    </div>
    <!-- MODAL -->
  </div>
  <!-- MODAL CONTAINER -->
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'CreatePostComponent',
  emits: ["refresh-posts","show-modal"],
  data: function (){
    return {
      description: '',
      imageUrl: null,
    }
  },
  computed: {
    validatedFields: function () {
      if (this.description != '' || this.imageUrl != null) {
        return true;
      }
      else {
        return false;
      }

    },
         
    ...mapState(['userInfos','date', 'status'])
  },
  methods: {
    publishPost: function () {
       const self = this;
      // let myHeaders = new Headers();
      // myHeaders.append("Authorization", 'Bearer ' + self.$store.state.user.token);
      // let formdata = new FormData();
      // // formdata.append("post", {
      // //   name: this.userInfos.name,
      // //   lastname: this.userInfos.lastname,
      // //   description: this.description,
      // //   photo: this.userInfos.photo,
      // //   imageUrl: "",
      // // });

      // formdata.append("image", self.imageUrl, self.imageUrl.name);
      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: formdata,
      //   redirect: 'follow'
      // };
      // fetch("http://localhost:3000/api/posts", requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      // const field = {
      //     name: this.userInfos.name,
      //     lastname: this.userInfos.lastname,
          
      //     photo: this.userInfos.photo,
      //     imageUrl: "",
      //   }
      // const dataForm = new FormData();
      // dataForm.append('image', self.imageUrl, self.imageUrl.name);
      // dataForm.append('post', field)
      // console.log(dataForm.values)
      // axios.post('http://localhost:3000/api/posts', {
      //   headers: {
          
      //     'Authorization' : 'bearer ' + self.$store.state.user.token,
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: dataForm
        

      // }).then(res => console.log(res))
      // .catch(err => console.log(err))

      // if (this.imageUrl != null && this.description == '') {
      //   const fd = new FormData();
      //   fd.append('image', this.imageUrl, this.imageUrl.name);
      //   this.$store.dispatch('createPostFormData', fd)
      //     .then(function () {
      //       if (self.$route.path === '/profil') {
      //         self.$store.dispatch('getUserFeed', self.$store.state.user.userId);

      //       }
      //       else {
      //         self.$store.dispatch('getAllPosts');
      //       }
      //       if (self.$store.state.status.includes('post-created') === true) {
      //         document.querySelector(".modal-container").classList.toggle("active");
      //       }

      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     })

      // }
      // if (this.imageUrl != null && this.description != '')
      // {
      //   const field = {
      //     name: this.userInfos.name,
      //     lastname: this.userInfos.lastname,
      //     description: this.description,
      //     photo: this.userInfos.photo,
      //     imageUrl: "",
      //   }
      //   const fd = new FormData();
      //   fd.append('image', this.imageUrl);
      //   fd.append('post', field)
      //   this.$store.dispatch('createPostFormData', fd)
      //     .then(function () {
      //       if (self.$route.path === '/profil') {
      //         self.$store.dispatch('getUserFeed', self.$store.state.user.userId);

      //       }
      //       else {
      //         self.$store.dispatch('getAllPosts');
      //       }
      //       if (self.$store.state.status.includes('post-created') === true) {
      //         document.querySelector(".modal-container").classList.toggle("active");
      //       }

      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     })
      // }
      // if(this.imageUrl === null && this.description != '')
      // {
         let field = {
          name: this.userInfos.name,
          lastname: this.userInfos.lastname,
          description: this.description,
          photo: this.userInfos.photo,
          imageUrl: "",
        }
        field = JSON.stringify(field)
        // URL.createObjectURL(this.imageUrl)
        const fd = new FormData();
        fd.append('image', this.imageUrl);
        fd.append('post', field)
        console.log(...fd)
        this.$store.dispatch('createPost', fd ,).then(function () {
          if (self.$store.state.status.includes('post-created')) {
            self.$emit('refresh-posts');
            return self.$emit('show-modal');
          }
  
        })
          .catch(function (error) {
            console.log(error);
          })
      
    },
    onFileSelected(event) {
      this.imageUrl = event.target.files[0];
      console.log(this.imageUrl);
    },
    
  },



}
</script>
<style scoped lang="scss">
@import '../variables';

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #333333d3;
}

.modal {
  width: 100%;
  height: auto;
  max-width: 600px;
  border: solid 1px $primary-color;
  background: #fff;
  border-radius: 5px;
  position: fixed;
  top: 20%;
  display: flex;
  flex-direction: column;

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
//MAIN CONTENT DESCRIPTION + IMAGE
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
.buttons__container {
  display: flex;
  flex-direction: column;
  
  padding: 10px;

  .button__file {
    display: inline-block;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 30px;
    border: solid 1px $secondary-color;
    background-color: $third-color;
    color: white;
    font-size: 15px;
    display:flex;
    align-items: center;
    justify-content: center;
  }

  .button__publish {
    display: inline-block;
    background: $primary-color;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    outline: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    cursor: pointer;
  }
  .button__publish:hover {
  
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
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-to{
  transform: translateY(-50%) translateX(100vw);
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