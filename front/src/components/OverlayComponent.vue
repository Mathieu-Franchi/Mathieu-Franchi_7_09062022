<template>
    <div v-show="show" @click="this.$emit('toggle-modal');" class="overlay"></div>
</template>

<script>
export default {
    name: "NavComponent",
    props: ['show'],
    emits: ['toggle-modal']
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0px;
}

</style>