<template>
    <div v-if="user !== null" class="form-container">
        <form @submit="onSubmitForm" >
            <div class="form-title">
                <h1 v-if="isShowCreatePost.type === 1">ĐĂNG TIN MỚI</h1>
                <h1 v-if="isShowCreatePost.type === 2">CẬP NHẬT TIN</h1>
                <i @click="onCloseForm" class="fa-solid fa-xmark"></i>
            </div>
            <div class="form-body">
                <div class="form-input">
                    <label for="">Tên bản tin</label>
                    <span class="text-error">{{ error.name }}</span>
                    <input v-model="postData.name" type="text">
                </div>
                <div class="form-input">
                    <label for="">Mô tả</label>
                    <span class="text-error">{{ error.description }}</span>
                    <input v-model="postData.description" type="text">
                </div>
                <div class="form-input">
                    <label for="">Ảnh</label>
                    <span class="text-error">{{ error.image }}</span>
                    <input @change="onImageFileChange" type="file">
                </div>
                <div class="form-input">
                    <label for="">Giá</label>
                    <span class="text-error">{{ error.price }}</span>
                    <input v-model="postData.price" type="number">
                </div>
                <div class="form-input">
                    <label for="">Diện tích</label>
                     <span class="text-error">{{ error.area }}</span>
                    <select v-model="postData.area" name="" id="">
                        <option value="" disabled>Chọn diện tích</option>
                        <option value="1"> Dưới 30 m²</option>
                        <option value="2">30 m2 - 50 m²</option>
                        <option value="3">50 m2 - 80 m²</option>
                        <option value="4">100 m2 - 150 m²</option>
                        <option value="5">150 m2 - 200 m²</option>
                        <option value="6">Trên 200 m²</option>
                    </select>
                </div>
    
                <div class="form-input">
                    <label for="">Địa chỉ</label>
                    <span class="text-error">{{ error.address }}</span>
                    <input v-model="postData.address" type="text">
                </div>

                <div class="form-input">
                    <label for="">Thành phố</label>
                    <span class="text-error">{{ error.city }}</span>
                    <select v-model="postData.city" name="" id="">
                        <option value="" disabled>Chọn thành phố</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                    </select>
                </div>
    
                <div class="form-input">
                    <label for="">Tình trạng</label>
                    <span class="text-error"> {{ error.level }}</span>
                    <select v-model="postData.level" name="" id="">
                        <option value="" disabled>Chọn tình trạng</option>
                        <option value="1">Cao cấp</option>
                        <option value="2">Đầy đủ</option>
                        <option value="3">Nhà trống</option>
                    </select>
                </div>
    
                <div class="form-input">
                    <label for="">Danh mục</label>
                    <span class="text-error"> {{ error.categoryId }}</span>
                    <select v-model="postData.categoryId" name="" id="">
                        <option disabled value="">Chọn danh mục</option>
                        <option v-for="category in categorys" :key="category.categoryId" :value="category.categoryId">{{ category.name }}</option>
                    </select>
                </div>

                <div class="form-input">
                    <label for="">Danh sách ảnh phụ (Chọn nhiều ảnh)</label>
                    <input @change="handleSubListImageChange" multiple type="file">
                </div>
                <div class="list-img-preview">
                    <image-preview v-for="imageObject in imageUrlUploads" :key="imageObject" :imageObject="imageObject"/>
                </div>               
            </div>
            <Button v-if="isShowCreatePost.type === 1" type="success" name="TẠO TIN" />
            <Button v-if="isShowCreatePost.type === 2" type="success" name="SỬA TIN" />
        </form>
    </div>
</template>


<script>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex'
import {storage} from '@/firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/Button.vue'
import ImagePreview from '../imagepreview/ImagePreview.vue';
import {validateIsEmpty} from '@/validate/validate.js'
import { resetRequestState, resetToastMessage } from '@/helper/helper';
import { useRouter } from 'vue-router';

    export default{
        components:{
            Button,
            ImagePreview
        },
        methods:{

        },
        setup(){             
            const store = useStore(); 
            const router = useRouter(); 
            let imageUrlUploads = ref([]);  
            const roomId = ref(null); 
            const isError = ref(false); 
            const postData = reactive({
                name: "",
                image: "",
                description: "",
                price: "",
                image:"",
                fileName:"",
                area: "",
                address: "",
                city:"",
                level: "",
                categoryId: "",
                accountId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accountId :"",
                subImages:[]
            })

            const error = reactive({
                name: "",
                image: "",
                description: "",
                price: "",
                image:"",
                area: "",
                address: "",
                city:"",
                level: "",
                categoryId: "",
            }); 


            const serverResponse = computed(()=> store.state.serverResponseData); 

          


            const onCloseForm = ()=>{
                store.commit("showCreatePost",{
                    type:null
                }); 
                store.commit('hiddenOverlay')
            }

            const isShowCreatePost = computed(()=> store.state.link.isShowCreatePost)
            const imageObjectRemove = computed(()=>store.state.imageObjectRemove); 


            const validateForm = ()=>{
                    if(validateIsEmpty(postData.name)){
                        error.name = "Tên phòng không được để trống"
                        isError.value = true;
                    }

                    if(validateIsEmpty(postData.image)){
                        error.image = "Ảnh không được để trống"
                        isError.value = true;
                    }
    
                    if(validateIsEmpty(postData.description)){
                        error.description = "Mô tả không được để trống"
                        isError.value = true;
                    }
                 
                    if(validateIsEmpty(postData.price.toString())){
                        error.price = "Giá không được để trống"
                        isError.value = true;
                    }
    
                    if(validateIsEmpty(postData.address)){
                        error.address = "Địa chỉ không được để trống"
                        isError.value = true;
                    }
    
                    if(validateIsEmpty(postData.city)){
                        error.city = "Thành phố không được để trống"
                        isError.value = true;
                    }

                    if(validateIsEmpty(postData.categoryId)){
                        error.categoryId = "Danh mục không không được để trống"
                        isError.value = true;
                    }

                    if(validateIsEmpty(postData.area.toString())){
                        error.area = "Diện tích không được để trống"
                        isError.value = true;
                    }

                    if(validateIsEmpty(postData.level.toString())){
                        error.level = "Tình trạng phòng không được để trống"
                        isError.value = true;
                    }
            }

            const onSubmitForm = (event)=>{
                try {
                    
                    event.preventDefault();   
                    isError.value = false; 
                    validateForm(); 
                    if(isError.value){
                        return; 
                    }               
                    postData.price = parseFloat(postData.price); 
                    postData.level = parseInt(postData.level);
                    postData.area = parseInt(postData.area); 

                    if(isShowCreatePost?.value?.type === 2){
                        store.dispatch('updateRoom',{postData,roomId:roomId.value});

                        store.commit('showToastMessage',{
                        isShow:true,
                        message:"Cập nhật tin thành công !", 
                        type :"success"

                        })
                        onCloseForm(); 
                        return;
                    }

                    store.dispatch('createPost',postData)
                } catch (error) {
                    console.log(error);
                }
                
            }
            
            watch(()=> serverResponse.value.success,(newValue,oldValue)=>{
                if(newValue){
                   onCloseForm(); 
                   store.commit('showToastMessage',{
                        isShow:true,
                        message:"Tạo tin thành công !", 
                        type :"success"
                   })

                   store.dispatch('getCategoryList'); 
                   resetToastMessage(store); 
                   resetRequestState(store); 
                   router.push({ path: '/' });
                }
            })

            const onImageFileChange = (event)=>{
                postData.image = "";
                const file = event.target.files[0];
                const fileName =`images/${uuidv4()}-${file?.name}`; 
                const storageRef = refStorage(storage,fileName); 
                uploadBytes(storageRef,file).then((snapshot)=>{
                    getDownloadURL(refStorage(storage,fileName)).then(downloadUrl => {
                        postData.image = downloadUrl
                        postData.fileName = fileName; 
                        imageUrlUploads.value.push({
                            url:downloadUrl,
                            path:fileName,
                        });
                       
                    })
                })
                
            }

            const handleSubListImageChange = (event)=>{
                const files = event.target.files; 
                for(let file of files){
                    const fileName =  `images/${uuidv4()}-${file.name}`; 
                    const storageRef = refStorage(storage,fileName); 
                    uploadBytes(storageRef,file).then((snapshot)=>{
                        getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                            postData.subImages.push(`${downloadUrl}@-@${fileName}`)
                            imageUrlUploads.value.push({
                            url:downloadUrl,
                            path:fileName
                        });
                        })
                    })
                }
            }
        
            
            
            store.dispatch("getCategoryList"); 

            if(isShowCreatePost?.value?.type === 2){
                const singleRoom = computed(()=> store.state.singleRoom)
                watch(()=> singleRoom.value,(newValue,oldValue)=>{
                    roomId.value = newValue.roomId; 
                    postData.name = newValue.name;
                    postData.description = newValue.description; 
                    postData.address = newValue.address; 
                    postData.image = newValue.image;
                    postData.city = newValue.city; 
                    postData.categoryId = newValue.categoryId; 
                    postData.level = newValue.level; 
                    postData.price = newValue.price; 
                    postData.area = newValue.area;
                    imageUrlUploads.value.push({
                        url:newValue.image,
                        path:newValue.fileName
                    })            
                    newValue.images.forEach(item=>{
                        imageUrlUploads.value.push({
                            url:item.url,
                            path:item.fileName,
                            imageId: item.imageId
                        })
                        postData.subImages.push(`${item.url}@-@${item.fileName}`) 
                    })
                    
                })
            }

            watch(()=>imageObjectRemove.value,async(newValue,oldValue)=>{
                const imageRef = refStorage(storage,newValue.path);  
                deleteObject(imageRef).then(()=>{                  
                    console.log('delete successfully !');
                    imageUrlUploads.value = imageUrlUploads.value.filter(item=> item.path !== newValue.path); 
                    if(newValue.url === postData.image){
                        postData.image = ""
                    }
                    postData.subImages = postData.subImages?.filter(item => item.split('@-@')[0] !== newValue.url); 
                    if(isShowCreatePost?.value?.type === 2){
                        if(newValue.imageId === undefined){    
                            store.dispatch('updateImage',roomId.value);  
                            return; 
                        }
                        store.dispatch('deleteImage',newValue.imageId);
                    }
                })   
              
            })
            return {
                onCloseForm,
                categorys:computed(()=> store.state.categorys),
                postData,
                onSubmitForm,
                onImageFileChange,
                handleSubListImageChange,
                imageUrlUploads,
                error,
                isShowCreatePost,     
                user:computed(()=> store.state.user)   
            }
        }


    }
</script>




<style>

@import url('./createPost.css');

</style>