<template>
    <footer id="footer">
        <p class="footer__text">Groupomania - Copyright © 2022</p>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
}
</script>

<style scoped lang="scss">
@import '../variables';
#footer{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-top: 1px solid $primary-color;
    background-color: $third-color;
    .footer__text{
        color: white;
        word-wrap: break-word;
        font-weight: 500;
        font-size: 17px;
    }
}
</style>