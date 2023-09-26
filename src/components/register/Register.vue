<template>
    <div id="register-container">
        <div class="register-title">
            <h1>Đăng ký</h1>
            <i class="fa-solid fa-xmark"></i>
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

            <div class="input-container">
                <label for="">Nhập lại mật khẩu <span style="color: red;">(*)</span></label>
                <input type="password" placeholder="Nhập lại mật khẩu">
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
    import Button from '../button/Button.vue';

    export default {
        components:{
            Button
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


 #register-container{
     width: 500px;
     height: 400px;
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