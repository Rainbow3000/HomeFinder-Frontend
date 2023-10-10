<template>
  <div v-if="rooms.length > 0" class="table-container"> 
     <table id="table">
       <tr>
         <th>Tên</th>
         <th>Mô tả</th>
         <th>Ảnh</th>
         <th>Giá</th>
         <th>Diện tích</th>
         <th>Địa chỉ</th>
         <th>Loại phòng</th>
         <th>Trạng Thái</th>
         <th>Chức năng</th>
       </tr>
       <tr v-for="room in rooms" :key="room.roomId">
         <td>{{ room.name }}</td>
         <td>{{ room.description }}</td>
         <td><img v-if="room.image !== ''" class="table-post-img" :src="room.image" alt=""></td>
         <td>{{ room.price }}</td>
         <td>{{ AreaEnum[room.area] }}</td>
         <td>{{ room.address }}</td>
         <td>{{ LevelEnum[room.level] }}</td>
         <td>{{ StatusEnum[room.status] }}</td>
         <td>
            <div class="btn-post-list-wrap">
              <Button @click="onUpdatePost(room.roomId)" type="normal" name="Sửa"/>
              <Button @click="onDeletePost(room.roomId)" type="normal" name="Xóa"/>
              <Button @click="onUpdateStatusPost(room.roomId)" type="normal" :name=" room.status === 1 ? 'Ẩn Tin' : 'Bỏ ẩn'"/>
            </div>
          </td>
       </tr>
      </table>
    </div>
    <h1 class="news-empty">{{ rooms.length === 0 ? "Bạn chưa đăng tin" :"" }}</h1>
</template>


<script>
import { useStore} from 'vuex'
import { computed,reactive, watch} from 'vue';
import Button from '../button/Button.vue';
import { resetRequestState, resetToastMessage } from '@/helper/helper';
import {AreaEnum,StatusEnum,LevelEnum} from '@/enum/enum.js'
   export default {
    components:{
      Button
    },
    setup(){
      const store = useStore(); 
      const filter = reactive({
            Price:"",
            Area:0,
            City:"",
            Offset:0,
            Limit:5,
            TextSearch:"",
            Level:0,
            Time:"",
            CategoryId:""
          }) 
        store.dispatch("getRoomByUser",JSON.parse(localStorage.getItem('user')).accountId); 
      
        const onUpdatePost = (roomId)=>{
          store.dispatch('getSingleRoom',roomId); 
          store.commit("showCreatePost",{
                type:2
          })
          store.commit('showOverlay')
        }
        const onDeletePost = (roomId)=>{
          store.dispatch('deleteRoom',roomId);
      
          const roomResponseData = computed(()=> store.state.serverResponseData.room)

          watch(()=> roomResponseData.value.success,(newValue,oldValue)=>{
            if(newValue){
              store.commit('showToastMessage',{
                isShow:true,
                message:"Xóa tin thành công !", 
                type :"success"
            })
            }else{
              store.commit('showToastMessage',{
                isShow:true,
                message:roomResponseData.value.data, 
                type :"error"
            })

            resetToastMessage(store); 
            resetRequestState(store); 
            }
          })
          
    
        }

  
        const onUpdateStatusPost = (roomId)=>{
          store.dispatch('updateStatusRoom',roomId); 
          store.commit('showToastMessage',{
              isShow:true,
              message:"Cập nhật trạng thái tin thành công !", 
              type :"success"
          })
          resetToastMessage(store); 
        }

      return {
        rooms : computed(()=> store.state.rooms),
        roomResponseData: computed(()=> store.serverResponseData.room),
        onUpdatePost,
        onDeletePost,
        onUpdateStatusPost,
        AreaEnum,
        StatusEnum,
        LevelEnum
      }
    }
   }
</script>


<style>
    @import url('./postList.css');
</style>