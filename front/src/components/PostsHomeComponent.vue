<template>
    <!-- bloc container -->
    <div id="body_posts">
        <!-- card post -->
        <div class="post" :key="index" v-for="(post, index) in posts">
            <!-- header of the post -->
            <div class="post__header">
                <!-- profil img + name and date -->
                <div class="post__profil">
                    <img class="post__img__profil" src="../../../back/images/tabasco.png" alt="Photo de profil" />
                    <div class="post__name__date">
                        <h2 class="post__name">{{ name }}</h2>
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
                <img class="post__img" src="../../../back/images/tabasco.png" alt="Image du post" />
            </div>

            <!-- footer of the post -->
            <div class="post__footer">
                icones icones
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
#body_posts {
  background-image: linear-gradient(90deg, $third-color 0%, $secondary-color 50%, $third-color 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  height: 100%;
  
  padding:30px;
}
.post {
    max-width: 600px;
    width: 100%;
    height: auto;
    
    border: solid 1px $primary-color;
    border-radius: 15px;
    background-color: #ffffff;
    margin-bottom: 20px;
}
.post__header {
    padding: 15px;
    display: flex;
    justify-content: center;

    .post__profil {
        display: flex;
        width: 100%;

        .post__img__profil {
            width: 40px;
            height: 40px;
            object-fit: cover;
            margin-right: 10px;
            border-radius: 50%;
            border: solid 1px $secondary-color;
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


.post__main{

    .post__description{
        padding: 0px 0px 10px 10px;
    }
    .post__img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top: 1px solid $secondary-color;
        border-bottom: 1px solid $secondary-color;
    }
}
.post__footer{
    padding: 10px;
}


</style>