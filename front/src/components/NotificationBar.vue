<template>
    <div class="notif_list">
        <TransitionGroup name="fade">
        <template v-if="this.notifications != []">
            <NotificationMessage v-for="notification in notifications" 
            :key="notification.id" :notification="notification" />
        </template>
        </TransitionGroup>
    </div>

</template>

<script>
import NotificationMessage from '@/components/NotificationMessage.vue';
import { mapState } from 'vuex';
export default {
    name: 'NotificationBar',  
    components: {
        NotificationMessage
    },
    computed: {
        ...mapState(['notifications'])
    },
}

</script>

<style scoped lang="scss">
@import '../variables';
.notif_list {
    z-index: 20;
    position: fixed;
    left: 0px;
    bottom: 15px;
    margin-left: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}

@media all and (max-width: 1400px) {
    .notif_list {
        right: 0;
        max-width: 320px;
        margin: auto;

    }
}
</style>