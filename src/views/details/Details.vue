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
                            <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            <span>{{ singleRoom?.userName }}</span>
                          
                        </div>
                        <div class="details-main-info">
                            <ul>
                                <li><i class="fa-regular fa-user"></i> Giới tính: <strong>Nam</strong></li>
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
                <i class="fa-regular fa-heart"></i>
            </div>
            <p class="details-description-body">
                <ul>
                    <li v-for="desc in singleRoom?.description?.split('<br/>')" :key="desc" >{{ desc }}</li>
                </ul>
              </p>
            
        </div>

        <div class="details-user-post">
           <h1> Danh sách các phòng của Nguyễn Văn A:</h1>
            <div class="details-post-container">
                <div class="details-post-item">
                    <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                    <ul>
                        <li>CHUNG CƯ MINI LẠC LONG QUÂN 40M2</li>
                        <li>Diện tích: 45 m² - 1 PN</li>
                        <li>Giá: <span style="color: red;">6,5 triệu/tháng</span></li>
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
import { computed } from 'vue';
import {AreaEnum} from '@/enum/enum.js'
import {convertToVND} from '@/helper/helper'
    export default{
        components:{
            TButton:Button
        },

        setup(){
            const route = useRoute();
            const roomId = route.params.id; 
            const store = useStore(); 
            store.dispatch('getSingleRoom',roomId); 

            return {
                singleRoom : computed(()=> store.state.singleRoom),
                AreaEnum,
                convertToVND
            }
        }

    }

</script>


<style scoped>
    @import url('./details.css');
</style>