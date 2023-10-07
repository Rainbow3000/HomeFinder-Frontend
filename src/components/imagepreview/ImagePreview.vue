<template>
    <div class="image-preview-container">
        <i @click="onRemoveImage" class="fa-solid fa-xmark"></i>
        <img :src="imageObject.url" alt="">
    </div>
</template>


<script>
import { useStore } from 'vuex'

    export default {

        props:{
            imageObject:Object
        },

        setup({imageObject},context){
            const store = useStore();
            const onRemoveImage = ()=>{
                store.commit('setPathUrlRemove',imageObject); 
            }

            return {
                imageObject,
                onRemoveImage
            }
        }
    }
</script>


<style scoped>
    .image-preview-container{
        width: 120px;
        height: 120px;
        border: 1px solid rgba(128, 128, 128, 0.247);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-content: center;
        margin: 0 5px;
        position: relative;
    }

    .image-preview-container i {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }

    .image-preview-container img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
</style>
