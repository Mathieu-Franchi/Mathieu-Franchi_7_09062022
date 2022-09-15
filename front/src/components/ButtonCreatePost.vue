<template>
    <div class="create__post">
        <div v-if="userInfos.photo != null" class="create__profil__img__container">
            <img class="create__profil__img" crossorigin="http://localhost:3000/" :src="userInfos.photo"
                alt="Photo de profil" />
        </div>
        <button class="create__btn modal-trigger" @click="this.$emit('show-modal')" type="button">
            <span class="create__btn__text">Quoi de neuf, {{ userInfos.name }} ?</span>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ButtonCreatePost',
    emits: ["show-modal"],
    computed: {
        ...mapState(['userInfos'])
    },
}

</script>

<style scoped lang="scss">
@import '../variables';
.create__post{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 10px;
    max-width: 700px;
    background-color: white;
    border: 1px solid $primary-color;
    border-radius: 20px;
    margin-bottom: 20px;
        .create__profil__img__container{
                width: 50px;
                height: 50px;
                margin-right: 10px;
                
            .create__profil__img {
                    width: 50px;
                    height: 50px;
                    
                    -o-object-fit: cover;
                    object-fit: cover;
                    border: solid 1px #FFD7D7;
                    border-radius: 50%;
                }
        }
    .create__btn{
        display: flex;
        padding: 15px;
        align-items: center;
        width: 100%;
        overflow: hidden;
        height: auto;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #fcfcfc;
        border: 1px solid $secondary-color;
        border-radius: 30px;
        transition: transform 0.2s;
        
        .create__btn__text{
            display: inline-block;
            font-size: 20px ;
            transition: letter-spacing 0.2s ease;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-break: break-word;
           
        }
    }
    .create__btn:active{
        transform: scale(0.95);
    }
    .create__btn:hover .create__btn__text{
        letter-spacing: 1px;
        
    }
}
@media all and (max-width: 600px) {
    .create__btn__text {
       font-size: 16px !important;
    }
}

</style>