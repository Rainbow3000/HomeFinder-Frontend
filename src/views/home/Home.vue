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
                    <span>{{ filter.City !== "" ? `${filter.City}` : 'Lọc theo khu vực'  }}</span>
                    <i  class="fa-solid fa-caret-down"></i>
                    <div v-if="isDropdownAreaOpen === true" class="filter-area">
                        <ul>
                            <li v-for="province in provinces" :key="province" @click="onFilterCity(province.name)">{{ province.name }}</li>           
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
                <li @click="onFilterAllCategory" :class=" indexActive === 0 ? 'active' : ''">Tất cả</li>
                <li :class="indexActive === category.categoryId ? 'active':''" v-for="category in categorys" :key="category.categoryId" @click="onFilterCategory(category.categoryId)" >{{ category.name}} ({{ category.quantity }})</li>
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
                                <i @click="onAddFavourite(room)" title="Lưu tin" class="fa-solid fa-heart" :class="farvourite?.[room.roomId] !== undefined ? 'favourite':''"></i>
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
                                            <li><i class="fa-solid fa-location-dot room-info-icon"></i> Địa chỉ: <strong> {{ room?.city }}</strong></li>
                                            <li><i class="fa-solid fa-chart-area room-info-icon"></i> Diện tích: <strong>{{ AreaEnum[room.area] }}</strong></li>
                                            <li><i class="fa-solid fa-phone room-info-icon"></i> Số điện thoại:  <strong>{{ room.phoneNumber }}</strong></li>
                                            <li><router-link :to="'/details/' + room.roomId" ><Button type="success" name="Xem chi tiết"></Button></router-link></li>      
                                        </ul>
                                       
                                    </div>
                    </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
             
                <div class="home-pagination">
                    <paginate
                    :page-count=" Math.ceil(pageSize / 5)"
                    :page-range="5"
                    :click-handler="onPagingChange"
                    :prev-text="'Trước'"
                    :next-text="'Sau'"
                    :container-class="'pagination'"
                    >
                    </paginate>
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
import {convertToVND,covertDate, resetToastMessage} from '@/helper/helper'
import Paginate from "vuejs-paginate-next";
export default {
    components: { Button,Paginate },
    setup(){


        const indexActive = ref(0)
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

        const onFilterCity = (provinceName)=>{
            filter.City = provinceName; 
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
            console.log(newValue);
             store.dispatch('getRoomList',{
                Price:"",
                Area:0,
                City:"",
                Offset:newValue,
                Limit:5,
                TextSearch:"",
                Level:0,
                Time:"",
                CategoryId:""
            })
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
            indexActive.value = categoryId; 
        }

        const onPagingChange = (pageNumber)=>{
            filter.Offset = filter.Limit * (pageNumber - 1); 
        }


        const onFilterAllCategory = ()=>{
            indexActive.value = 0;
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
            store.dispatch("getRoomList",filter); 
        }

        const onAddFavourite = (room)=>{
            store.commit('setFavouriteRoom',room); 
            store.commit('showToastMessage',{
                isShow:true,
                message:"Cập nhật lưu tin thành công !", 
                type :"success"
            })

            resetToastMessage(store); 
        }


        store.dispatch('getPageSizeRoom');

        store.dispatch('getProvincesVN'); 
        


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
            covertDate,
            onPagingChange,
            pageSize:computed(()=> store.state.pageSize),
            onFilterAllCategory,
            onAddFavourite,
            farvourite:computed(()=> store.state.farvouriteRooms),
            indexActive,
            provinces:computed(()=> store.state.provinces),
        }
    }
}
</script>

<style scoped>
    @import url('./home.css');
</style>