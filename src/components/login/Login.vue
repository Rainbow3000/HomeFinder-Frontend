<template>
    <div id="login-container">
        <div class="login-title">
            <h1>Đăng nhập</h1>
            <i @click="onCloseLoginForm" class="fa-solid fa-xmark"></i>
        </div>
        <form action="">
            <div class="input-container">
                <label for="">Email <span style="color: red;">(*)</span></label>
                <input type="email" placeholder="Email">
            </div>
            <div class="input-container">
                <label for="">Mật khẩu <span style="color: red;">(*)</span></label>
                <input type="password" placeholder="Mật khẩu">
            </div>
            <a href="">Bạn đã quên mật khẩu ?</a>
            <Button type="success" name="Đăng nhập"></Button>
        </form>

        <div class="social-container">
            <span>Đăng nhập với:</span>
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
    </div>
</template>


<script>
    import Button from '../button/Button.vue';
    import { useStore } from 'vuex';
    export default {
        components:{
            Button
        },
        setup(){
            const store = useStore(); 
            const onCloseLoginForm = ()=>{
                store.commit('login'); 
            }

            return {
                onCloseLoginForm
            }
        }
    }
</script>


<style scoped>


.social-container{
    display: flex;
    align-items: center;
}
.social-container span{
    font-size: 14px;
}

.social-container i {
    margin-left: 10px;
    cursor: pointer;
}


.social-container .fa-google{
    color: red;
}



.social-container .fa-facebook{
    color: blue;
}


 #login-container{
     width: 500px;
     height: 300px;
     background-color: #FFFFFF;
     position: fixed;
     top: 50%;
     left: 50%;
     z-index: 300;
     transform: translate(-50%,-50%);
     display: flex;
     flex-direction: column;
     border-radius: 5px;
     padding: 20px;
 }

 .login-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

 .login-title i{
    font-size: 20px;
    cursor: pointer;
 }


 #login-container h1{
    font-size: 20px;
 }

 #login-container form{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
 }

 #login-container form a{
    margin-top: 10px;
    color: red;
 }

 #login-container form button{
    margin-top: 20px;
 }

 .input-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
 }

 .input-container input{
    margin-top: 10px;
    height: 35px;
    outline: none;
    border: 1px solid rgba(128, 128, 128, 0.432);
    padding-left: 10px;
    border-radius: 5px;
 }



</style>