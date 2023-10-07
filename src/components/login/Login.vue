<template>
    <div id="login-container">
        <div class="login-title">
            <h1>Đăng nhập</h1>
            <i @click="onCloseLoginForm" class="fa-solid fa-xmark"></i>
        </div>
        <form @submit="onSubmitForm">
            <div class="input-container">
                <label for="">Email <span style="color: red;">(*)</span></label>
                <span style="color: red;">{{ error.email }}</span>
                <input @input="handleEmailInputChange" :class="error.email.trim().length > 0 && `field-error`" v-model="userData.email" type="email" placeholder="Email">
            </div>
            <div class="input-container">
                <label for="">Mật khẩu <span style="color: red;">(*)</span></label>
                <span style="color: red;">{{ error.password }}</span>
                <input @input="handlePasswordInputChange" :class="error.password.trim().length > 0 && `field-error`" v-model="userData.password" type="password" placeholder="Mật khẩu">
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
    import {validateEmail,validatePasswordInvalid,validateIsEmpty} from '@/validate/validate'
    import { computed, reactive, ref, watch } from 'vue';
import { resetToastMessage } from '@/helper/helper';
    export default {
        components:{
            Button
        },
        setup(){
            const userData = reactive({
                email:"",
                password:""
            })
            const store = useStore(); 

            const isError = ref(false); 

            const error = reactive({
                email:"",
                password:""
            }) ;
            const onCloseLoginForm = ()=>{
                store.commit('loginLink'); 
                store.commit('hiddenOverlay')
            }

            const handleEmailInputChange = ()=>{
                error.email = ""; 
            }

            const handlePasswordInputChange = ()=>{
                error.password = ""; 
            }

            const validateForm = ()=>{
                if(validateIsEmpty(userData.email)){
                    error.email = "Email không được để trống !"
                    isError.value = true;
                }

                if(validateIsEmpty(userData.password)){
                    error.password= "Password không được để trống !"
                    isError.value = true;
                }

                if(!validateEmail(userData.email)){
                    error.email = "Email không hợp lệ ! Vui lòng kiểm tra lại."
                    isError.value = true; 
                } 
                if(validatePasswordInvalid(userData.password)){
                    error.password = "Mật khẩu phải lớn hơn hoặc bằng 6 kí tự."
                    isError.value = true;
                }
            }
            

            const onSubmitForm = (event)=>{
                event.preventDefault();
                isError.value = false; 
                validateForm();
                if(isError.value) return; 
                store.dispatch('userLogin',userData); 
                
            }

            const isLoginSuccess = computed(()=>store.state.account.loginSuccess); 

            watch(()=> isLoginSuccess.value, (newValue,oldValue)=>{
                if(newValue === true){
                    store.commit('loginLink'); 
                    store.commit('hiddenOverlay')
                    store.commit('showToastMessage',{
                        isShow:true,
                        message:"Đăng nhập thành công !", 
                        type :"success"
                    })

                    resetToastMessage(store); 
                }
            })
           
            return {
                onCloseLoginForm,
                error,
                userData,
                onSubmitForm,
                handleEmailInputChange,
                handlePasswordInputChange,
                isLoginSuccess,
              
            }
        }
    }
</script>


<style scoped>


.social-container{
    display: flex;
    align-items: center;
    margin-top: 10px;
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
     min-height: 300px;
     height: auto;
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

 .field-error{
    border: 1px solid red !important;
}


</style>