<template>
<div class="alert">
    <div class="row">

    </div>
    <p style="color: white">{{notification.message}}</p>
    <button type="button" class="close" @click="this.$store.commit('removeNotification', this.notification)">
        <span aria-hidden="true">x</span>
    </button>
</div>
</template>
<script>
export default {
    name: 'NotificationMessage',
    props: ["notification"],
    data() {
        return {
            timeout: null
        }
    },
    
    computed: {
        
    },
    created() {
    this.timeout = setTimeout(() => {
            this.$store.commit('removeNotification', this.notification)
        }, 6000000);
    },
    beforeUnmount(){
        clearTimeout(this.timeout);
    }
}

</script>

<style scoped lang="scss">
@import '../variables';
.alert {
    min-width: 320px;
    max-width: 360px;
    padding: 20px 35px 20px 25px;
    background-color: #36454F;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0);
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
   
}
.close {
    background: none;
    border: none;
    cursor: pointer;
}
@media all and (max-width: 1400px) {
    .alert {
        min-width: 300px;

    }
}
@media all and (max-width: 450px) {
    .alert {
        min-width: 200px;

    }
}

</style>