<template>
    <div class="details-container">
        <h1 class="details-title">Xem chi tiết phòng</h1>
        <span class="details-home-name">{{ singleRoom?.name }}</span>
        <div class="details-main">
            <div class="details-main-left"> 
                    <div class="details-img">
                        <div class="details-img-main">
                            <img :src="singleRoom?.image" alt="">
                        </div>
                        <div class="details-img-sub">
                            <img v-for="image in singleRoom?.images" :key="image" :src="image?.url" alt="">

                        </div>
                    </div>
            </div>
            <div class="details-main-right">
                    <div class="details-main-right-top">
                        <div class="details-main-avatar">
                            <img :src="singleRoom?.avatar" alt="">
                            <span>{{ singleRoom?.userName }}</span>
                          
                        </div>
                        <div class="details-main-info">
                            <ul>
                                <li><i class="fa-solid fa-mobile-screen"></i> Di động: <strong>{{ singleRoom?.phoneNumber }}</strong></li>
                              
                                <li>
                                    <a target="_blank" :href="'https://zalo.me/'+ singleRoom?.phoneNumber"><t-button type="primary" name="Liên hệ Zalo"></t-button></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="details-main-bottom">
                        <ul>
                            <li><i class="fa-solid fa-chart-area"></i> Diện tích: <strong>{{ AreaEnum[singleRoom?.area] }}</strong></li>
                            <li><i class="fa-solid fa-location-dot"></i> Địa điểm: <strong>{{ singleRoom?.address}} - {{ singleRoom?.city }}</strong></li>
                            <li><i class="fa-solid fa-money-bill"></i> Giá: <strong><span style="color: red;">{{convertToVND(singleRoom?.price)}}</span>/ 1 tháng</strong></li>
                            <li></li>
                        </ul>
                    </div>
            </div>
        </div>
       
        <div class="details-description">
            <div class="details-description-top">
                <h1>Mô tả chi tiết:</h1>
                <i @click="onAddFavourite(singleRoom)" title="Lưu tin" class="fa-solid fa-heart heart-details" :class="farvourite?.[singleRoom?.roomId] !== undefined ? 'favourite':''"></i>
            </div>
            <p class="details-description-body">
                <ul>
                    <li v-for="desc in singleRoom?.description?.split('/n')" :key="desc" >{{ desc }}</li>
                </ul>
              </p>
            
        </div>

        <div class="details-user-post">
           <h1> Một số tin có liên quan của <span style="color:green">{{singleRoom?.userName}}</span>:</h1>
            <div class="details-post-container">
                <div v-for="room in rooms" :key="room" class="details-post-item">
                    <img :src="room.image" alt="">
                    <ul>
                        <li>{{ room.name }}</li>
                        <li>Diện tích: {{ AreaEnum[room.area] }}</li>
                        <li>Giá: <span style="color: red;">{{ convertToVND(room.price) }} </span><span> / tháng</span></li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>


<script >
    import Button from '@/components/button/Button.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import {AreaEnum} from '@/enum/enum.js'
import {convertToVND, resetToastMessage} from '@/helper/helper'
    export default{
        components:{
            TButton:Button
        },

        setup(){
            const route = useRoute();
            const roomId = route.params.id; 
            const store = useStore(); 
            store.dispatch('getSingleRoom',roomId);  
            const singleRoom = computed(()=> store.state.singleRoom)
            watch(()=> singleRoom.value,(newValue,oldValue)=>{
                store.dispatch("getRoomByUser",newValue.accountId); 
            })

            const onAddFavourite = (room)=>{
            store.commit('setFavouriteRoom',room); 
            store.commit('showToastMessage',{
                isShow:true,
                message:"Cập nhật lưu tin thành công !", 
                type :"success"
            })
            resetToastMessage(store); 
        }
            return {
                singleRoom : computed(()=> store.state.singleRoom),
                AreaEnum,
                convertToVND,
                rooms : computed(()=> store.state.rooms),
                onAddFavourite,
                farvourite:computed(()=> store.state.farvouriteRooms)
            }
        }

    }

</script>


<style scoped>
    @import url('./details.css');
</style>