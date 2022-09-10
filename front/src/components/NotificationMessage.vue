<template>
<div class="alert" :class="{'boxShadow': this.notification.type === 'failure'}">
    <p style="color: white">{{notification.message}}</p>
    <button type="button" class="close" @click="this.$store.commit('removeNotification', this.notification)">
        <FontAwesome class="close_fa" style="color: white;" icon="fa-solid fa-xmark" />
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
        }, 3000);
    },
    beforeUnmount(){
        clearTimeout(this.timeout);
    }
}

</script>

<style scoped lang="scss">
@import '../variables';
.alert {
    min-width: 200px;
    max-width: 360px;
    padding: 15px 35px 15px 25px;
    background-color: #36454F;
    border-radius: 8px;
    box-shadow: 0 3px 7px rgba(81, 255, 65, 0.575);
    margin-top: 10px;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
   
}
.close {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    opacity: 0.7;
}
.boxShadow {
    box-shadow: 0 3px 7px rgba(255, 65, 65, 0.575);
}
@media all and (max-width: 1400px) {
    .alert {
        min-width: 200px;

    }
}

</style>