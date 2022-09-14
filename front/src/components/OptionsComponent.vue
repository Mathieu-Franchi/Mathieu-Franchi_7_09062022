<template>
    <ul v-show="show" class="option__list">
        <slot name="li__1">
    
        </slot>
        <slot name="li__2">
    
        </slot>
        <slot name="li__3">
    
        </slot>
    
    </ul>
</template>

<script>
export default {
    name: "OptionsComponent",
    props: ['show'],
}
</script>

<style scoped lang="scss">
@import '../variables';
.option__list {

    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid $primary-color;
    background-color: white;
}
</style>