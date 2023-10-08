<template>
    <div v-if="toastMessage.isShow" :class="`toast-message-container ${toastMessage.type}`">
        <span :class="toastMessage.type === 'success' ? `toast-success`: `toast-error` ">{{ toastMessage.message }}</span>
    </div>
</template>


<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

      export default {
        setup(){
            const store = useStore(); 
            return {
                toastMessage:computed(()=> store.state.toastMessage)
            }
        }
      }

</script>


<style>
 .toast-message-container{
    width: 420px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 10px;
    top: 200px;
    z-index: 1000;
    transform: translateX(110%);
    animation: showToastMessage 5s linear;
}


.toast-message-container.success{
    background-color: #9febad;
 }

 
.toast-message-container.error{
    background-color: #f3cbcb;
 }



 .toast-success{
    color: green;
 }

 .toast-error{
    color: red;
 }

 @keyframes showToastMessage {
    0%{
        transform: translateX(110%);
    }
    10%{
        transform: translateX(0);
    }

    20%{
        transform: translateX(0);
    }
    30%{
        transform: translateX(0);
    }
    40%{
        transform: translateX(0);
    }
    50%{
        transform: translateX(0);
    }
    60%{
        transform: translateX(0);
    }
    70%{
        transform: translateX(0);
    }
    80%{
        transform: translateX(0);
    }
    90%{
        transform: translateX(0);
    }

    100%{
        transform: translateX(110%);
    }
 }

</style>