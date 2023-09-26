<template>
    <button class="btn" :class="type">{{ name }}</button>
</template>

<script>
    export default {
        props:{
            name:String,
            type:String
        }
    }
</script>

<style>
    @import url('./button.css');
</style>