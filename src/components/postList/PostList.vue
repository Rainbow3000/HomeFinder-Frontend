<template>
  <div class="table-container"> 
     <table id="table">
       <tr>
         <th>Tên</th>
         <th>Mô tả</th>
         <th>Ảnh</th>
         <th>Giá</th>
         <th>Trạng Thái</th>
         <th>Diện tích</th>
         <th>Địa chỉ</th>
         <th>Loại phòng</th>
         <th>Chức năng</th>
       </tr>
       <tr v-for="room in rooms" :key="room.roomId">
         <td>{{ room.name }}</td>
         <td>{{ room.description }}</td>
         <td><img class="table-post-img" :src="room.image" alt=""></td>
         <td>{{ room.price }}</td>
         <td>{{ room.status }}</td>
         <td>{{ room.area }}</td>
         <td>{{ room.address }}</td>
         <td>{{ room.level }}</td>
         <td><button>Sửa</button> <button>Xóa</button></td>
       </tr>
      </table>
      <h1 class="news-empty">{{ rooms.length === 0 ? "Bạn chưa đăng tin" :"" }}</h1>
    </div>
</template>


<script>
import { useStore} from 'vuex'
import { computed } from 'vue';
   export default {
    setup(){
      const store = useStore(); 
      store.dispatch("getRoomList")
      return {
        rooms : computed(()=> store.state.rooms)
      }
    }
   }
</script>


<style>
    @import url('./postList.css');
</style>