<template>
        <!-- card post -->
        <div class="post" :key="post._id" v-for="post in posts">
            <!-- header of the post -->
            <div class="post__header">
                <!-- profil img + name and date -->
                <div class="post__profil">
                    <div class="post__profil__img__container" v-if="post.photo != null">
                        <img class="post__profil__img" crossorigin="anonymous" :src="post.photo" alt="Photo de profil du post" />
                    </div>
                    <div class="post__name__date">
                        <h2 class="post__name">
                            {{ post.name + ' ' + post.lastname }}
                        </h2>
                        <p class="post__date">{{dayjs(post.date).fromNow()}}</p>
                    </div>
                </div>
                <!-- profil img + name and date -->

                <!-- btn modify  -->
                <div class="post__btn__modify"  v-if="post.userId === user.userId || userInfos.isAdmin === true">
                    <button class="btn__modify" type="button" aria-label="Show options" @click="openPopup(post._id)">
                        <FontAwesome class="fa__ellipsis" icon="fa-solid fa-ellipsis" />
                    </button>
                    <!-- EDIT OPTIONS -->
                    <OptionsComponent :show="this.popup.includes(post._id)" class="option_modal">
                        <template v-slot:li__1>
                            <li class="option__li">
                                <button class="option__button" @click="modifyPost(post._id);">
                                    <FontAwesome class="option__icon" icon="fa-regular fa-pen-to-square" />
                                    <div class="option__text">Modifier</div>
                                </button>
                            </li>
                            <div class="line"></div>
                        </template>
                        <template v-slot:li__2>
                            <li class="option__li">
                                <button class="option__button" @click="deletePost(post._id);">
                                    <FontAwesome class="option__icon" icon="fa-solid fa-trash" />
                                    <div class="option__text">Supprimer</div>
                                </button>
                            </li>
                        </template>
                    </OptionsComponent>
                    <!-- OVERLAY EDIT OPTIONS -->
                    <OverlayComponent class="overlay__edit" :show="this.popup.includes(post._id)" @toggle-modal="openPopup(post._id)"/>
            
                </div>
            </div>

            <!-- main content of the post -->
            <div class="post__main">
                <h3 class="post__description">{{ post.description }}</h3>
                <div class="post__main__img__container" v-if="post.imageUrl != null">
                    <img class="post__img" v-if="post.imageUrl != null" crossorigin="anonymous" :src="post.imageUrl" alt="Image du post" />
                </div>
            </div>

            <!-- Number of likes -->
            <div class="post__number__likes">
                <FontAwesome class="fa__like__counter" icon="fa-solid fa-thumbs-up" :style="{color: post.usersLiked.includes(this.user.userId) ? '#FD2D01' : ''}" />
                <p class="post__counter__likes">{{ post.likes }}</p>
            </div>
            <!-- footer of the post -->
            <div class="post__footer__border"></div>
            <div class="post__footer">
                <div class="post__container__btn__like">
                    <button class="post__btn__like" type="button" aria-label="like" @click="like(post.usersLiked, post._id)">
                        <FontAwesome class="fa__like" :style="{color: post.usersLiked.includes(this.user.userId) ? '#FD2D01' : ''}" icon="fa-solid fa-thumbs-up" />
                    </button>
                </div>
                <!-- <div class="post__container__btn__comment">
                    <button class="post__btn__comment" type="button">
                        <FontAwesome class="fa__comment" icon="fa-solid fa-comment-dots" />
                    </button>
                </div> -->
            </div>
        </div>
</template>

<script>
import dayjs from '@/_services/dayjs';
import { mapState } from 'vuex';
import OptionsComponent from './OptionsComponent.vue';
import OverlayComponent from './OverlayComponent.vue';

export default {
    name: "PostsComponent",
    components: { OptionsComponent, OverlayComponent },
    props: ["posts"],
    emits: ["delete-post", "refresh-post", "modify-post"],
    data: function () {
        return {
            dayjs,
            popup: []
        };
    },
    computed: {
        post: function () {
            return this.posts;
        },
        ...mapState(["user", "userInfos"])
    },
    methods: {
        openPopup(postId) {
            if (this.popup.includes(postId)) {
                this.popup.length = 0;
            }
            else {
                this.popup.push(postId);
            }
        },
        deletePost: function (postId) {
            this.$emit("delete-post", postId);
        },
        modifyPost: function (postId) {
            this.$emit("modify-post", postId);
        },
        like: function (liker, postId) {
            let like;
            if (liker.includes(this.user.userId)) {
                like = {
                    like: 0,
                    userId: this.user.userId
                };
            }
            else {
                like = {
                    like: 1,
                    userId: this.user.userId
                };
            }
            this.$store.dispatch("likePost", { id: postId, like: like });
        }
    },
}

</script>
<style scoped lang="scss">
@import '../variables';
//POST CONTAINER 
.post {
    max-width: 700px;
    width: 100%;
    height: auto;
    border: solid 1px $primary-color;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 20px;
}
//HEADER SECTION (NAME DATE IMG PROFIL + BUTTON MODIFY)
.post__header {
    padding: 15px;
    display: flex;
    justify-content: center;

    .post__profil {
        display: flex;
        width: 100%;

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
                word-break: break-word;

            }

            .post__date {
                font-size: 12px;
                color: #b0b3b8;
            }
        }
    }

    .post__btn__modify {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        position: relative;

        .btn__modify {
            width: 100%;
            height: 100%;
            cursor: pointer;
            border: none;
            background: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            transition: background 0.2s ease-in-out, transform 0.01s ease-in-out;

            .fa__ellipsis {
                font-size: 2.1em;
            }
        }

        .btn__modify:hover {
            background: $secondary-color;
        }

        .btn__modify:active {
            transform: scale(0.95);
        }

        .overlay__edit {
            z-index: 8;
        }

        .line {
            height: 1px;
            background-color: $primary-color;
            width: 98%;
            margin: 0 auto;

        }

        .option_modal {
            position: absolute;
            padding: 5px;
            top: 10px;
            right: 40px;
            z-index: 9;
            border-radius: 4px;
            min-width: 160px;
            box-shadow: 0px 2px 4px gray;
            user-select: none;
            

            .option__li:hover {
                background-color: $secondary-color;
                border-radius: 5px;
            }

            .option__li:active {
                transform: scale(0.98);
            }

            .option__li {
                
                display: inline-block;
                
                .option__button {
                    cursor: pointer;
                    width: 100%;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    background: none;
                    border: none;
                    outline: none;
                    

                    .option__icon {
                        display: inline-block;
                        font-size: 1.6em;
                        padding: 0px 10px 0px 0px;
                    }

                    .option__text {
                        font-size: 16px;
                        
                    }

                }
            }
        }
    }
}

//MAIN SECTION (DESCRIPTION + IMG)
.post__main{
        .post__main__img__container{
        height: 100%;
        width: 100%;
        .post__img{
            
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-top: 1px solid $secondary-color;
            border-bottom: 1px solid $secondary-color;
        }
    }
    .post__description{
        padding: 0px 10px 10px 10px;
        text-align: justify;
        font-weight: normal;
        word-break: break-word;
        
    }
}
//NUMBER OF LIKES SECTION (CONTAINER + FA + COUNTER API)
.post__number__likes{
    display: flex;
    width: 100%;
    align-items: center;
    height: 40px;
    
    .fa__like__counter
    {
        margin-left: 10px;
        color: $third-color;
    }
    .likes{
        color: $primary-color;
    }
    .post__counter__likes{
        margin-left: 5px;
    }
   
}
/* BORDER BEFORE FOOTER */
.post__footer__border{
    height: 1px;
    background-color: $primary-color;
    width: 98%;
    margin: 0 auto;
}

//FOOTER SECTION (2 CONTAINER WITH BUTTON + FA )
.post__footer{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    max-width: 690px;
    margin: 0 auto;
    
    
    .post__container__btn__like,
    .post__container__btn__comment
    {
        border-radius: 15px;
        padding: 3px;
        width: 100%;
        height: 100%;
    }
    .post__btn__like,
    .post__btn__comment{
        width: 100%;
        height: 100%;
        cursor: pointer;
        border: none;
        background: none;
        display: block;
        border-radius: 5px;
        transition: background-color 0.2s ease-in-out, transform 0.01s ease-in-out;

    }
    .fa__like, .fa__comment
    {
        font-size: 1.6em;
        color: $third-color;
        transition: color 0.1s ease-in-out;
    }
    .post__btn__comment:hover, .post__btn__like:hover{
        background-color: $secondary-color;
        
    }
    // .post__btn__like:hover .fa__like, .post__btn__comment:hover .fa__comment {
    //     color: $primary-color;
        
    // }
    .post__btn__comment:active, .post__btn__like:active{

        transform: scale(0.95);
    }
}
@media all and (max-width: 600px) {
    .post__header{
        padding: 15px 10px 10px 15px !important;
    }
    .post__name {
        font-size: 16px !important;
    }
    .post__date {
        font-size: 11px !important;
    }
    .post__profil__img__container{
        width: 40px;
        height: 40px;
        margin-right: 10px !important;
        .post__profil__img{
            width: 40px !important;
            height: 40px !important;
            
        }
    }
}
</style>