<template>
    <!-- bloc container -->
    <div id="body_posts">
        <div class="create__post">
            <button class="create__btn" type="button"></button>
        </div>
        <!-- card post -->
        <div class="post" :key="index" v-for="(post, index) in posts">
            <!-- header of the post -->
            <div class="post__header">
                <!-- profil img + name and date -->
                <div class="post__profil">
                    <div class="post__profil__img__container">
                        <img class="post__profil__img" src="../../../back/images/tabasco.png" alt="Photo de profil" />
                    </div>
                    <div class="post__name__date">
                        <h2 class="post__name">
                            {{ post.name + ' ' + post.lastname }}
                        </h2>
                        <p class="post__date">{{ post.date }}</p>
                    </div>
                </div>
                <!-- profil img + name and date -->

                <!-- btn modify  -->
                <div class="post__btn__modify">
                    <button class="btn__modify" type="button">
                        <FontAwesome class="fa__ellipsis" icon="fa-solid fa-ellipsis" />
                    </button>
                </div>

            </div>
            <!-- header of the post -->

            <!-- main content of the post -->
            <div class="post__main">
                <h3 class="post__description">{{ post.description }}</h3>
                <div class="post__main__img__container">
                    <img class="post__img" src="../../../back/images/tabasco.png" alt="Image du post" />
                </div>
            </div>
            
            <!-- Number of likes -->
            <div class="post__number__likes">
                <FontAwesome class="fa__like__counter"  icon="fa-solid fa-thumbs-up" />
                <p class="post__counter__likes">{{ post.likes }}</p>
            </div>
            <!-- footer of the post -->
            <div class="post__footer__border"></div>
            <div class="post__footer">
                <div class="post__container__btn__like">
                    <button class="post__btn__like" type="button">
                        <FontAwesome class="fa__like" icon="fa-solid fa-thumbs-up" />
                    </button>
                </div>
                <div class="post__container__btn__comment">
                    <button class="post__btn__comment" type="button">
                        <FontAwesome class="fa__comment" icon="fa-solid fa-comment-dots" />
                    </button>
                </div>
            </div>
            <div class="post__comment__section">

            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
    name: 'PostsHomeComponent',
    data: function () {
        return {
            posts: [],
            name: "Mathieu",
        }
    },
    mounted: function () {
        axios
        .get('http://localhost:3000/api/posts')
        
        .then((response) => {
            this.posts = response.data;
            console.log(this.posts);
        });
    },

    
}

</script>
<style scoped lang="scss">

@import '../variables';
//BODY
#body_posts {
  background-image: linear-gradient(90deg, $third-color 0%, $secondary-color 50%, $third-color 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  height: 100%;
  
  padding:30px;
}
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
                width: 40px;
                height: 40px;
                
                margin-right: 10px;
                
                
            }
        .post__profil__img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border: solid 1px #FFD7D7;
            border-radius: 50%;
        }
        .post__name__date{
                .post__name{
                    font-size: 20px;

                }
                .post__date{
                    font-size: 12px;
                    color: #b0b3b8;
                }
        }
    }
    
    .post__btn__modify{
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        
    
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
            transition: background 0.2s ease;
                .fa__ellipsis {
                    font-size: 27px;
                    
                    
                }
        }
        .btn__modify:hover{
            background: $secondary-color;
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
            object-fit: cover;
            border-top: 1px solid $secondary-color;
            border-bottom: 1px solid $secondary-color;
        }
    }
    .post__description{
        padding: 0px 10px 10px 10px;
        text-align: justify;
        
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
        transition: background-color 0.2s ease-in-out;

    }
    .fa__like,
    .fa__comment
    {
        font-size: 20px;
        color: $third-color;
        transition: color 0.1s ease-in-out;
    }
    .post__btn__like:hover {
        background-color: $secondary-color;
    }
    .post__btn__comment:hover{
        background-color: $secondary-color;
    }
    .post__btn__like:hover .fa__like {
        color: $primary-color;
        
    }
    .post__btn__comment:hover .fa__comment {
        color: $primary-color;
        
    }
    
}
    


</style>