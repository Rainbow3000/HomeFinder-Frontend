<template>
    <div id="register-container">
        <div class="register-title">
            <h1>Đăng ký</h1>
            <i @click="onCloseRegisterForm" class="fa-solid fa-xmark"></i>
        </div>
        <form @submit="onSubmitForm">
            <span style="color: red;margin-top: 5px;" >{{ accountError.text }}</span>
            <div class="input-container">
                <label for="">Tên người dùng <span style="color: red;">(*)</span></label>
                <span style="color:red">{{ error.userName }}</span>
                <input @input="handleNameInputChange" :class="error.userName.trim().length > 0 && `field-error`" v-model="userData.userName" type="text" placeholder="Tên ">
            </div>

            <div class="input-container">
                <label for="">Số điện thoại <span style="color: red;">(*)</span></label>
                <span style="color:red">{{ error.phone }}</span>
                <input @input="handlePhoneInputChange" :class="error.phone.trim().length > 0 && `field-error`" v-model="userData.phone" type="text" placeholder="Số điện thoại ">
            </div>
            <div class="input-container">
                <label for="">Email <span style="color: red;">(*)</span></label>
                <span style="color:red">{{ error.email }}</span>
                <input @input="handleEmailInputChange" :class="error.email.trim().length > 0 && `field-error`" v-model="userData.email" type="email" placeholder="Email">
            </div>
            <div class="input-container">
                <label for="">Mật khẩu <span style="color: red;">(*)</span></label>
                <span style="color:red">{{ error.password }}</span>
                <input @input="handlePasswordInputChange" :class="error.password.trim().length > 0 && `field-error`" v-model="userData.password" type="password" placeholder="Mật khẩu">
            </div>

            <div class="input-container">
                <label for="">Nhập lại mật khẩu <span style="color: red;">(*)</span></label>
                <span style="color:red">{{ error.rePassword }}</span>
                <input @input="handleRePasswordInputChange" :class="error.rePassword.trim().length > 0 && `field-error`" v-model="userData.rePassword" type="password" placeholder="Nhập lại mật khẩu">
            </div>


            <a href="">Bạn đã có tài khoản ?</a>
            <Button type="primary" name="Đăng ký"></Button>
        </form>

        <div class="social-container">
            <span>Đăng ký với:</span>
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
    
    </div>
</template>


<script>
import { reactive, computed , watch, ref } from 'vue';
    import { useStore } from 'vuex';
    import Button from '../button/Button.vue';
    import { validateEmail,validateIsEmpty,validateNotMatchPassword, validatePasswordInvalid,validateUserNameInvalid,validatePhoneNumber} from '@/validate/validate';
    import {resetToastMessage} from '@/helper/helper.js'
    export default {
        components:{
            Button
        }
        ,
        setup(){
            const store = useStore(); 

            const isError = ref(false); 

            const error = reactive({
                userName:"",
                email:"",
                password:"",
                rePassword:"",
                phone:""
            })

            const userData =  reactive({
                userName:"", 
                email:"",
                password:"",
                rePassword:"",
                phone:""
            })
            const onCloseRegisterForm = ()=>{
                store.commit('registerLink'); 
                store.commit('hiddenOverlay');
                store.commit('resetError');
            }

            const validateForm = ()=>{
                if(validateIsEmpty(userData.userName)){
                    error.userName = "Tên người dùng không được để trống"
                    isError.value = true; 
                }

                if(!validatePhoneNumber(userData.phone)){
                    error.phone = "Số điện thoại không hợp lệ"
                    isError.value = true;
                }

                if(validateIsEmpty(userData.phone)){
                    error.phone = "Số điện thoại không được để trống"
                    isError.value = true;
                }


                if(!validateEmail(userData.email)){
                    error.email = "Email không hợp lệ"
                    isError.value = true;
                }


                if(validateIsEmpty(userData.email)){
                    error.email = "Email không được để trống"
                    isError.value = true;
                }


                if(validateIsEmpty(userData.password)){
                    error.password = "Mật khẩu không được để trống"
                    isError.value = true;
                }

                if(validateIsEmpty(userData.rePassword)){
                    error.rePassword = "Mật khẩu nhập lại không được để trống"
                    isError.value = true;
                }   


                if(validateUserNameInvalid(userData.userName)){
                    error.userName = "Tên người dùng phải lớn hơn 5 kí tự"
                    isError.value = true;
                }

              

                if(validatePasswordInvalid(userData.password)){
                    error.password = "Mật khẩu phải lớn hơn hoặc bằng 6 kí tự"
                    isError.value = true;
                }

                if(validateNotMatchPassword(userData.password,userData.rePassword)){
                    error.rePassword = "Mật khẩu nhập lại không khớp."
                    isError.value = true;
                } 
            }

            const accountError = computed(()=> store.state.error.account);

            const handleNameInputChange = ()=>{
                error.userName = "";
                

            }
            const handlePhoneInputChange = ()=>{
                error.phone = "";
                

            }


            const handleEmailInputChange = ()=>{
                error.email = ""
                

            }

            const handlePasswordInputChange = ()=>{
                error.password = ""; 
                

            }

            const handleRePasswordInputChange = ()=>{
                error.rePassword =""
                

            }


          
            const onSubmitForm = (event)=>{
                event.preventDefault();
                isError.value = false; 
                validateForm();
                if(isError.value) return;  
                store.dispatch("userRegister",userData);
            }

            const isRegsiterSuccess = computed(()=>store.state.account.registerSuccess); 

            watch(()=> isRegsiterSuccess.value, (newValue,oldValue)=>{
                if(newValue === true){
                    store.commit('registerLink'); 
                    store.commit('showToastMessage',{
                        isShow:true,
                        message:"Đăng ký tài khoản thành công !", 
                        type :"success"
                    })
                    store.commit('loginLink')
                    resetToastMessage(store); 
                }
            })

            return {
                onCloseRegisterForm,
                onSubmitForm,
                error,
                userData,
                accountError,
                handleNameInputChange,
                handlePhoneInputChange,
                handleEmailInputChange,
                handlePasswordInputChange,
                handleRePasswordInputChange
            }

        }
    }
</script>


<style scoped>

.input-container input:focus{
    border: 1px solid rgba(0, 128, 0, 0.562);
}

.field-error{
    border: 1px solid red !important;
}

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


 #register-container{
     width: 500px;
     min-height: 500px;
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

 .register-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

 .register-title i{
    font-size: 20px;
    cursor: pointer;
 }


 #register-container h1{
    font-size: 20px;
 }

 #register-container form{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
 }

 #register-container form a{
    margin-top: 10px;
    color: red;
 }

 #register-container form button{
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