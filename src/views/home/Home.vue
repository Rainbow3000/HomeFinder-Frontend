<template>
    <div class="home-container">
        <div class="home-header">
            <div class="home-header-wapper">
                <div class="home-search">
                    <input v-model="filter.TextSearch" type="text" placeholder="Nhập kiểu phòng cần tìm..." />
                    <div class="home-search-btn"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div @click="onOpenDropdownArea" class="home-filter">
                    <i style="margin-right: 5px;" class="fa-solid fa-location-dot"></i> 
                    <span>{{ filter.City !== "" ? `TP.${filter.City}` : 'Lọc theo thành phố'  }}</span>
                    <i  class="fa-solid fa-caret-down"></i>
                    <div v-if="isDropdownAreaOpen === true" class="filter-area">
                        <ul>
                            <li @click="onFilterCity('Hà Nội')">Hà Nội</li>
                            <li @click="onFilterCity('Hồ Chí Minh')">Hồ Chí Minh</li>
                            <li @click="onFilterCity('Nha Trang')">Nha Trang</li>
                        </ul>
                    </div>
                </div>
                <div @click="onOpenDropdownPrice" class="home-filter">
                    <i style="margin-right: 5px;" class="fa-solid fa-dollar-sign"></i>
                    <span>{{filter.Price !== "" ? `Từ ${filter.Price} triệu ${filter.Price === '6' ? 'trở lên':''} / tháng` : 'Lọc theo mức giá'}}</span>
                    <i class="fa-solid fa-caret-down"></i>
                    <div v-if="isDropdownPriceOpen" class="filter-price">
                        <ul>
                            <li @click="onFilterPrice('< 1')"> Từ 1 triệu trở xuống / tháng</li>
                            <li @click="onFilterPrice('1 - 2')">Từ 1 - 2 triệu / tháng</li>
                            <li @click="onFilterPrice('2 - 4')">Từ 2 - 4 triệu / tháng</li>
                            <li @click="onFilterPrice('4 - 6')">Từ 4 - 6 triệu / tháng</li>
                            <li @click="onFilterPrice('> 6')"> Từ 6 triệu trở lên  / tháng</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-category">
            <ul>
                <li class="active">Tất cả</li>
                <li v-for="category in categorys" :key="category.categoryId" @click="onFilterCategory(category.categoryId)" >{{ category.name}} ({{ category.quantity }})</li>
            </ul>
        </div>
        <div class="home-main">
            <div class="home-main-left">
                <h1>Danh sách các phòng</h1>
                <div class="home-product" v-for="room in rooms" :key="room.roomId">
                    <div class="home-product-left">
                        <div class="user-info">
                            <div class="user-avatar">
                                <img :src="room?.avatar" alt="avatar">
                                <span>{{ room?.userName }}</span>
                            </div>
                            <div class="product-time-post">
                                <span>Thời gian đăng: </span>
                                <span>{{ covertDate(room?.createdDate)}}</span>
                                <i title="Lưu tin" class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                        <span>{{ room.name }}</span>
                        <div class="home-product-img">
                            <div class="home-product-img-top">
                                <img :src="room?.image" alt="">
                            </div>
                            <div class="home-product-img-bottom">
                                <div class="home-product-bottom-left">
                                     <span style="font-weight: bold;" v-if="room.images.length === 0">Chưa cập nhật ảnh !</span>
                                    <img v-for="image in room.images.slice(0,3)" :key="image" :src="image.url" alt="">
                                </div>
                                <div class="home-product-bottom-right">
                                    <h1>Thông tin sơ lược</h1>
                                    <div class="home-product-info">
                                        <ul>
                                    
                                            <li><i class="fa-solid fa-money-check-dollar room-info-icon"></i> Giá: <strong><span style="color: red;">{{ convertToVND(room?.price) }}</span> / 1 tháng</strong></li>
                                            <li><i class="fa-solid fa-location-dot room-info-icon"></i> Địa chỉ: <strong> {{ room?.address }}</strong></li>
                                            <li><i class="fa-solid fa-chart-area room-info-icon"></i> Diện tích: <strong>{{ AreaEnum[room.area] }}</strong></li>
                                            <li><i class="fa-solid fa-phone room-info-icon"></i> Số điện thoại:  <strong>{{ room.phoneNumber }}</strong></li>
                                            <li><router-link :to="'/details/' + room.roomId" ><Button type="success" name="Xem chi tiết"></Button></router-link></li>      
                                        </ul>
                                        <div class="product-favourite">
                                            <i class="fa-regular fa-heart"></i>
                                        </div>
                                    </div>
                    </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
             

                <div class="home-pagination">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>

                    <ul>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                    </ul>

                    <ul>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                    </ul>
                </div>

        <div class="home-post-relation">
            <h1>Các bài viết liên quan:</h1>
            <div class="home-post-container">
                <div class="home-post-item">
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
            <div class="home-main-right">
                <h1>Bộ lọc chi tiết</h1>
                <ul class="home-filter-by-details">
                    <span>Lọc theo thời gian</span>
                    <li @click = "onFilterTime('newest')">Mới nhất</li>
                    <li @click = "onFilterTime('oldest')">Cũ nhất</li>
                    <li @click = "onFilterTime('week')">Trong tuần</li>
                </ul>


                <ul class="home-filter-by-details">
                    <span>Lọc theo diện tích</span>
                    <li @click="onFilterArea(1)">Dưới 30 m²</li>
                    <li @click="onFilterArea(2)">30 - 50 m²</li>
                    <li @click="onFilterArea(3)">50 - 80 m²</li>
                    <li @click="onFilterArea(4)">100 - 150 m²</li>
                    <li @click="onFilterArea(5)">150 - 200 m²</li>
                    <li @click="onFilterArea(6)">Trên 200 m²</li>
                </ul>

                <ul class="home-filter-by-details">
                    <span>Lọc theo tình trạng nội thất</span>
                    <li @click="onFilterLevel(1)">Cao cấp</li>
                    <li @click="onFilterLevel(2)">Đầy đủ</li>
                    <li @click="onFilterLevel(3)">Nhà trống</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
import { computed, reactive, ref,watch } from 'vue';
import { useStore } from 'vuex';
import {AreaEnum} from '@/enum/enum.js'
import {convertToVND,covertDate} from '@/helper/helper'
export default {
    components: { Button },
    setup(){
        const filter = reactive({
            Price:"",
            Area:0,
            City:"",
            Offset:0,
            Limit:10,
            TextSearch:"",
            Level:0,
            Time:"",
            CategoryId:""
        }) 

        const isDropdownAreaOpen = ref(false); 
        const isDropdownPriceOpen = ref(false); 
        const store = useStore();
        store.dispatch("getCategoryList"); 
        store.dispatch("getRoomList",filter); 
        const onOpenDropdownArea = ()=>{
            isDropdownAreaOpen.value = !isDropdownAreaOpen.value; 
            isDropdownPriceOpen.value = false; 
        }

        const onOpenDropdownPrice = ()=>{
            isDropdownPriceOpen.value = !isDropdownPriceOpen.value;
            isDropdownAreaOpen.value = false;
        }

        const onFilterCity = (value)=>{
            filter.City = value; 
        }

        const onFilterPrice = (value)=>{
            filter.Price = value; 
        }

        const onFilterTime = (value)=>{
            filter.Time = value; 
        }

        const onFilterArea = (value)=>{
            filter.Area = value;
        }

        const onFilterLevel = (value)=>{
            filter.Level = value; 
        }
      

        watch(()=> filter.Area, (newValue,oldValue)=>{
            store.dispatch("getRoomList",filter); 
        })



        watch(()=>filter.Time ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })

        watch(()=>filter.Offset ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })


        watch(()=>filter.Level ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })


        watch(()=>filter.Price ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })

        watch(()=>filter.City ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })
        

        watch(()=>filter.CategoryId ,(newValue,oldValue)=>{
             store.dispatch('getRoomList',filter)
        })

        watch(()=>filter.TextSearch,(newValue,oldValue)=>{
            setTimeout(() => {     
                store.dispatch("getRoomList",filter); 
            },1500);
        })

        const serverResponse = computed(()=> store.state.serverResponseData); 
        
        watch(()=> serverResponse.value.success,(newValue,oldValue)=>{
                if(newValue){
                    store.dispatch("getRoomList",filter); 
                }
            })

        const onFilterCategory = (categoryId)=>{
            filter.CategoryId = categoryId; 
        }
        return {
            categorys:computed(()=> store.state.categorys), 
            rooms:computed(()=> store.state.rooms),
            onOpenDropdownArea,
            onOpenDropdownPrice,
            isDropdownAreaOpen,
            isDropdownPriceOpen,
            AreaEnum,
            convertToVND,
            onFilterCity,
            onFilterPrice,
            onFilterTime,
            onFilterArea,
            onFilterLevel,
            filter,
            onFilterCategory,
            covertDate
        }
    }
}
</script>

<style scoped>
    @import url('./home.css');
</style>