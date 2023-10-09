<template>
    <div class="user-container">
        <h1>Thông tin tài khoản</h1>
        <form  @submit="onSubmitForm">
            <div>
                <label for="">Tên hiển thị</label>
                <input v-model="userData.name" placeholder="Tên hiển thị" type="text">
            </div>
            <div>
                <label for="">Số điện thoại</label>
                <input v-model="userData.phone" placeholder="Số điện thoại" type="text">
            </div>
            <div>
                <label for="">Địa chỉ</label>
                <input v-model="userData.address" placeholder="Địa chỉ" type="text">
            </div>

            <div>
                <label for="">Tuổi</label>
                <input v-model="userData.age" placeholder="Tuổi" type="number">
            </div>

            <div>
                <label for="">Ảnh đại diện</label>
                <input @change="onChangeAvatar" type="file">
            </div>

            <div>
                <img  class="user-img" :src="userData.avatar" alt="">
                <Button type="success" name="CẬP NHẬT" />
            </div>
        </form>
    </div>    
</template>

<script>
import { computed, reactive, watch } from 'vue'
import Button from '../button/Button.vue'
import { useStore } from 'vuex'
import {storage} from '@/firebase'; 
import { v4 as uuidv4 } from 'uuid';
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'

    export default {
        components:{
            Button
        },

        setup(){
            const userData = reactive({
                name:"", 
                phone:"",
                address:"",
                age:"",
                avatar:""
            })

            const store = useStore(); 
            const user = computed(()=> store.state.user)
            store.dispatch('getUserInfo',user.value.accountId); 

            const onSubmitForm = (event)=>{
                event.preventDefault();
                if(userData.age === ""){
                    userData.age = 0; 
                }else{
                    userData.age = parseInt(userData.age); 
                }
                store.dispatch('updateUserInfo',{userData,accountId:user.value.accountId}); 

                const localStorageUser = JSON.parse(localStorage.getItem('user')); 
                localStorageUser.userName = userData.name; 
                store.commit('setUserLogin',localStorageUser); 

                store.commit('showToastMessage',{
                        isShow:true,
                        message:"Cập nhật thông tin người dùng thành công !", 
                        type :"success"
                })
            }

            const onChangeAvatar =  (event)=>{
                const file = event.target.files[0];
                const fileName =`images/${uuidv4()}-${file?.name}`; 
                const storageRef = refStorage(storage,fileName); 
                uploadBytes(storageRef,file).then((snapshot)=>{
                    getDownloadURL(refStorage(storage,fileName)).then(downloadUrl => {
                       userData.avatar = downloadUrl; 
                    })
                })
            }

            const userInfo =  computed(()=> store.state.userInfo)
            watch(()=> userInfo.value, (newValue,oldValue)=>{
                userData.name = newValue.name; 
                userData.phone = newValue.phone; 
                userData.avatar = newValue.avatar; 
                userData.address = newValue.address; 
                userData.age = newValue.age === 0 && ""; 
            })
         
            return {
                userData,
                onSubmitForm,
                onChangeAvatar
            }
        }
    }
</script>


<style scoped>
    @import url('./userinfo.css');
</style>