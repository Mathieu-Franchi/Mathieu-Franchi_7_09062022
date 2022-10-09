<template>
  <!-- MODAL CONTAINER -->
  <div class="modal-container">
    <!-- OVERLAY -->
    <div class="overlay modal-trigger" @click="this.$emit('show-modal')"></div>
    <!-- MODAL EDIT -->
    <div v-if="postToModif != null" class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
      <!-- MODAL HEADER -->
      <div class="modal__header">
        <button aria-label="close modal" class="close-modal modal-trigger" @click="this.$emit('show-modal')">
          <FontAwesome style="color: white;" icon="fa-solid fa-xmark" />
        </button>
        <h3 class="modal__title fontsize__titles">Modifier la publication</h3>
      </div>
      <!-- MODAL PROFIL -->
      <div class="post__profil">
        <div v-if="postToModif.photo != null" class="post__profil__img__container">
          <img class="post__profil__img" v-if="postToModif.photo != null" :src="postToModif.photo"
            alt="Photo de profil" />
        </div>
        <div class="post__name__date">
          <h2 class="post__name fontsize__p">
            {{ postToModif.name + ' ' + postToModif.lastname }}
          </h2>
          <p class="post__date">{{ dayjs(postToModif.date).fromNow() }}</p>
        </div>
      </div>
      <!-- MODAL MAIN CONTENT -->
      <main class="post__content" :style="{'min-height': postToModif.imageUrl || imagePreview != null ? '150px' : '70px'}">
        <textarea v-model="descriptionEdit" class="description" type="text" placeholder="Quoi de neuf ?">
        </textarea>
        <div class="post__container__img" v-if="postToModif.imageUrl != null || imagePreview != null">
          <img class="post__img" v-if="postToModif.imageUrl != null || imagePreview != null"
           :src="postToModif.imageUrl || imagePreview" alt="Prévisualisation de l'image du post" />
          <div class="post__img__cross" @click="$refs.inputFile.value = null, imagePreview = null, imageUrl = null, this.$store.commit('setImagePost', null)">
            <FontAwesome class="cross__img" icon="fa-solid fa-xmark" />
          </div>
        </div>

      </main>
      <!-- button choose file + publish container -->
      <div class="buttons__container" v-if="imageUrl == null || imagePreview == null || postToModif.imageUrl == null">
        <div class="drop_img">
          <input type="file" style="display: none;" @change="onFileSelected($event)" ref="inputFile" class="button__file">
        </div>
        <button v-if="postToModif.imageUrl == null" @click="$refs.inputFile.click()" class="button__file">
          <span style="overflow: hidden; text-overflow: ellipsis;" v-if="imagePreview != null && imageUrl != null">{{imageUrl.name}}</span>
          <span v-if="postToModif.imageUrl == null && imagePreview == null && imageUrl == null">Choisir une image</span>
        </button>
        <button @click="modifyPost()" class="button__publish" :class="{ 'button--disabled': !changedFields }">
          <span v-if="status.includes('loading-modifyPost')">Modification en cours...</span>
          <span v-else>Enregistrer</span>
        </button>
      </div>
      <!-- button choose file + publish container -->
    </div>
    <!-- MODAL EDIT -->
    <!-- MODAL CREATE -->
    <div v-else class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
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
          <img class="post__profil__img" v-if="userInfos.photo != null" :src="userInfos.photo"
            alt="Photo de profil" />
        </div>
        <div class="post__name__date">
          <h2 class="post__name fontsize__p">
            {{ userInfos.name + ' ' + userInfos.lastname }}
          </h2>
          <p class="post__date">{{ dayjs(Date.now()).format('DD/MM/YYYY') }}</p>
        </div>
      </div>
      <!-- MODAL MAIN CONTENT -->
      <main class="post__content" :style="{'min-height': imageUrl != null ? '150px' : '70px'}">
        <textarea v-model="description" class="description" type="text" placeholder="Quoi de neuf ?"></textarea>
        <div class="post__container__img" v-if="imagePreview != null && imageUrl != null">
          <img class="post__img" v-if="imagePreview != null && imageUrl != null"
           :src="imagePreview" alt="Prévisualisation de l'image du post" />
          <div class="post__img__cross" @click="$refs.inputFile.value = null; imagePreview = null, imageUrl = null">
            <FontAwesome class="cross__img" icon="fa-solid fa-xmark" />
          </div>
        </div>

      </main>
      <!-- button choose file + publish container -->
      <div class="buttons__container">
        <div class="drop_img">
          <input type="file" style="display: none;" @change="onFileSelected($event)" ref="inputFile" class="button__file">
        </div>
        <button @click="$refs.inputFile.click()" class="button__file">
          <span style="overflow: hidden; text-overflow: ellipsis;" v-if="imageUrl != null">{{this.imageUrl.name}}</span>
          <span v-else>Choisir une image</span>
        </button>
        <button @click="publishPost()" class="button__publish" :class="{ 'button--disabled': !validatedFields }">
          <span v-if="status.includes('loading-createPost')">Publication en cours...</span>
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
import { mapState } from 'vuex';
import dayjs from '@/_services/dayjs';

export default {
  name: 'CreatePostComponent',
  emits: ["show-modal"],
  data: function (){
    return {
      description: '',
      onlySpace: new RegExp (/^\s*$/),
      imageUrl: null,
      imagePreview: null,
      dayjs,
    }
  },
  computed: {
    validatedFields: function () {
      if (this.description != '' && this.onlySpace.test(this.description) != true || this.imageUrl != null) {
        return true;
      }
      else {
        return false;
      }
    },
    postToModif: function(){
      return this.post;
    },
    descriptionEdit: {
      get() {
        return this.post.description
      },
      set(value) {
        this.$store.commit('editDescription', value)
      }
    },
    changedFields: function(){
      if(this.postToModif){
        if(
        //if no change at all
        this.originalPost.description === this.postToModif.description && this.originalPost.imageUrl === this.postToModif.imageUrl 
        && this.imageUrl === null 
        //if modified description to onlyspace and no img at all
        || this.onlySpace.test(this.postToModif.description) == true && this.postToModif.description != this.originalPost.description 
        && this.imageUrl === null && this.postToModif.imageUrl == null
        //if description '' && no image at all
        || this.postToModif.description == '' && this.imageUrl == null && this.postToModif.imageUrl == null
        //if only space && no image
        || this.onlySpace.test(this.postToModif.description) == true && this.imageUrl == null && this.postToModif.imageUrl == null
        //if description == '' && image not changed
        || this.postToModif.description == '' && this.imageUrl == null && this.postToModif.imageUrl == null
        ){
          return false;
        }
        else{
          return true;
        }
      }
      else{
        return false;
      }
    },
    ...mapState(['userInfos','user', 'status','post','originalPost'])
  },
  methods: {
    onFileSelected(event) {
      if(event.target.files[0]['type']!= 'image/jpeg' && event.target.files[0]['type']!= 'image/jpg' &&
        event.target.files[0]['type']!= 'image/png' && event.target.files[0]['type']!= 'image/gif')
      {
        this.$refs.inputFile.value = null;
        this.$emit('show-modal');
        return this.$store.commit('addNotification', {type: 'failure', message: 'Fichier image uniquemement'})
      }
      else{
        this.imageUrl = event.target.files[0];
        this.imagePreview = URL.createObjectURL(this.imageUrl);
        URL.revokeObjectURL(this.imageUrl); 
      }
    },
    //CREATE MODE : PUBLISH
    publishPost: function () {
      if (this.validatedFields) {
        //access "this" deeper in the code
        const self = this;
        //headers default
        let headers = {'Content-Type': 'multipart/form-data'};
        //objet key values default
        let field = {
            userId: this.user.userId,
            name: this.userInfos.name,
            lastname: this.userInfos.lastname,
            photo: this.userInfos.photo,
            description: this.description
        }

        if (this.imageUrl != null && this.description != '') {
          
          field = JSON.stringify(field)
          const fd = new FormData();
          fd.append('image', this.imageUrl);
          fd.append('post', field)
          
          this.$store.dispatch('createPost', {data: fd, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })

        }
        if (this.imageUrl != null && this.description === '') {
          
          delete field.description
          
          field = JSON.stringify(field)
          const fd = new FormData();
          fd.append('image', this.imageUrl);
          fd.append('post', field);
          this.$store.dispatch('createPost', {data: fd, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        if (this.imageUrl === null && this.description != ''){
          
          headers = {'Content-Type': 'application/json'};
          
          this.$store.dispatch('createPost', {data: field, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        //reset fields after publish
        this.description = '';
        this.imageUrl = null;
        this.$refs.inputFile.value = null;
        this.imagePreview = null;
      }
    },
    //EDIT MODE : modifyPost
    modifyPost(){
      if(this.changedFields){
        //access "this" deeper in the code
        const self = this;
        //headers default
        let headers = {'Content-Type': 'multipart/form-data'};
        //objet key values default
        let field = {
            userId: this.user.userId,
            description: this.postToModif.description,
        }

        if (this.imageUrl != null && this.postToModif.description != this.originalPost.description) {
          console.log('image + description')
          field = JSON.stringify(field)
          const fd = new FormData();
          fd.append('image', this.imageUrl);
          fd.append('post', field)
          
          this.$store.dispatch('modifyPost', {data: fd, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })

        }
        if (this.imageUrl != null && this.postToModif.description === this.originalPost.description) {
          
          console.log('image')
          delete field.description
          
          field = JSON.stringify(field)
          const fd = new FormData();
          fd.append('image', this.imageUrl);
          fd.append('post', field);
          this.$store.dispatch('modifyPost', {data: fd, headers: headers,})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        if (this.postToModif.imageUrl === null && this.imageUrl == null && this.postToModif.description === this.originalPost.description){
          console.log('image null')
          field = {...field, imageUrl: null,}
          headers = {'Content-Type': 'application/json'};
          
          this.$store.dispatch('modifyPost', {data: field, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        if(this.postToModif.description != this.originalPost.description 
        && this.onlySpace.test(this.postToModif.description) == false && this.imageUrl == null){
          console.log('description')
          headers = {'Content-Type': 'application/json'};
          
          this.$store.dispatch('modifyPost', {data: field, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        if(this.onlySpace.test(this.postToModif.description) == true 
        && this.postToModif.description != this.originalPost.description 
        && this.postToModif.imageUrl != null && this.originalPost.imageUrl != null){
          console.log('no description')
          headers = {'Content-Type': 'application/json'};
          
          this.$store.dispatch('modifyPost', {data: field, headers: headers})
            .then(function () {
              return self.$emit('show-modal');
            })
        }
        //reset fields after saving
        this.imageUrl = null;
        this.$refs.inputFile.value = null;
        this.imagePreview = null;
      }
      
    }
   
  },



}
</script>
<style scoped lang="scss">
@import '../variables';

.modal-container {
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow: hidden auto;
}

.overlay {
  position: fixed;
  inset: 0px;
}

.modal {
  width: 100%;
  height: auto;
  max-width: 600px;
  overflow: hidden auto;
  max-height: 90%;
  border: solid 1px $primary-color;
  background: #fff;
  border-radius: 5px;
  // position: fixed;
  position: relative;//scrollmodal
  display: flex;
  flex-direction: column;

}

//Header modal
.modal__header{
  width: 100%;
  height: 70px;
  min-height: 65px;
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
.post__content{
    overflow: hidden auto;
    overscroll-behavior-y: contain;
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
  .post__container__img{
    padding: 10px;
    position: relative;
    .post__img{
      width: 100%;
      object-fit: cover;
      border: solid 1px #FFD7D7;
      border-radius: 10px;
      padding: 5px;
    }
    .post__img__cross{
      position: absolute;
      top: 30px;
      right: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      width: 36px;
      height: 36px;
      background-color: $third-color;
      cursor: pointer;
      border-radius: 50%;
      .cross__img{
        color: #b9bdc4;
        width: 100%;
        height: 100%;
      }
    }
    .post__img__cross:hover{
      filter: brightness(118%)
    }
    .post__img__cross:active{
      transform: scale(0.96);
    }
  }
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
    transition: .4s background-color, transform 0.01s ease-in-out;;
    cursor: pointer;
  }
  .button__publish:hover {
  
    background: $secondary-color;
  }
  .button__publish:active {
    transform: scale(0.96);
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  .button--disabled:active {
    transform: none;
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

@media all and (max-width: 450px) {
  .fontsize__titles {
    font-size: 20px !important;
  }

  .fontsize__p {
    font-size: 15px !important;
  }

  .modal {
    max-width: 320px !important;
  }
}
@media all and (max-width: 640px) {
  .modal {
    max-width: 450px;
  }
}
</style>