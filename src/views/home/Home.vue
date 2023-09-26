<template>
    <div class="home-container">
        <div class="home-header">
            <div class="home-header-wapper">
                <div class="home-search">
                    <input type="text" placeholder="Nhập kiểu phòng cần tìm..." />
                    <div class="home-search-btn"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div class="home-filter">
                    <span>Lọc theo khu vực</span>
                    <i class="fa-solid fa-caret-down"></i>
                </div>
                <div class="home-filter">
                    <span>Lọc theo mức giá</span>
                    <i class="fa-solid fa-caret-down"></i>
                </div>
            </div>
        </div>

        <div class="home-category">
            <ul>
                <li class="active">Tất cả</li>
                <li>Căn hộ</li>
                <li>Trung cư</li>
                <li>Bất động sản</li>
                <li>Trọ sinh viên</li>
                <li>Gia đình</li>
            </ul>
        </div>
        <div class="home-main">
            <div class="home-main-left">
                <h1>Danh sách các phòng</h1>
                <div class="home-product">
                    <div class="home-product-left">
                        <div class="user-info">
                            <div class="user-avatar">
                                <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="avatar">
                                <span>Hương Ly</span>
                            </div>
                            <div class="product-time-post">
                                <span>Thời gian: </span>
                                <span>20-12-2023</span>
                            </div>
                        </div>
                        <span>Chung cư mini 35m2 có xép+ phòng khách Đầy đủ nội thất khúc Thừa dụ</span>
                        <div class="home-product-img">
                            <div class="home-product-img-top">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                            <div class="home-product-img-bottom">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="home-product-right">
                        <h1>Thông tin sơ lược</h1>
                        <div class="home-product-info">
                            <ul>
                                <li>- Giá: <span style="color: red;">500.000 vnd</span> / 1 tháng</li>
                                <li>- Địa chỉ: Hà Nội</li>
                                <li>- Diện tích: 50 m2</li>
                                <li>- Điện thoại liên lạc: 0363578628</li>
                                <li><router-link to="/details"><Button type="success" name="Xem chi tiết"></Button></router-link></li>      
                            </ul>
                            <div class="product-favourite">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-product">
                    <div class="home-product-left">
                        <div class="user-info">
                            <div class="user-avatar">
                                <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="avatar">
                                <span>Ngọc Lan</span>
                            </div>
                            <div class="product-time-post">
                                <span>Thời gian: </span>
                                <span>20-12-2023</span>
                            </div>
                        </div>
                        <span>Chung cư mini 35m2 có xép+ phòng khách Đầy đủ nội thất khúc Thừa dụ</span>
                        <div class="home-product-img">
                            <div class="home-product-img-top">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                            <div class="home-product-img-bottom">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="home-product-right">
                        <h1>Thông tin sơ lược</h1>
                        <div class="home-product-info">
                            <ul>
                                <li>- Giá: <span style="color: red;">500.000 vnd</span> / 1 tháng</li>
                                <li>- Địa chỉ: Hà Nội</li>
                                <li>- Diện tích: 50 m2</li>
                                <li>- Điện thoại liên lạc: 0363578628</li>
                                <li><Button type="success" name="Xem chi tiết"></Button></li>      
                            </ul>
                            <div class="product-favourite">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="home-product">
                    <div class="home-product-left">
                        <div class="user-info">
                            <div class="user-avatar">
                                <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="avatar">
                                <span>Minh Trí</span>
                            </div>
                            <div class="product-time-post">
                                <span>Thời gian: </span>
                                <span>20-12-2023</span>
                            </div>
                        </div>
                        <span>Chung cư mini 35m2 có xép+ phòng khách Đầy đủ nội thất khúc Thừa dụ</span>
                        <div class="home-product-img">
                            <div class="home-product-img-top">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                            <div class="home-product-img-bottom">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                                <img src="https://cdn.chotot.com/oqMyXcjHFMRUtEuAoTrwvbl_xZ8itnv2VjU-13ScV0M/preset:view/plain/6625fdc2847ac49149e2d3ec1b675441-2827249207307476704.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="home-product-right">
                        <h1>Thông tin sơ lược</h1>
                        <div class="home-product-info">
                            <ul>
                                <li>- Giá: <span style="color: red;">500.000 vnd</span> / 1 tháng</li>
                                <li>- Địa chỉ: Hà Nội</li>
                                <li>- Diện tích: 50 m2</li>
                                <li>- Điện thoại liên lạc: 0363578628</li>
                                <li><Button type="success" name="Xem chi tiết"></Button></li>                           
                            </ul>
                            <div class="product-favourite">
                                <i class="fa-regular fa-heart"></i>
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
                    <li>Mới nhất</li>
                    <li>Trong tuần</li>
                    <li>Cần cho thuê gấp</li>
                </ul>


                <ul class="home-filter-by-details">
                    <span>Lọc theo diện tích</span>
                    <li>Dưới 30 m²</li>
                    <li>30 - 50 m²</li>
                    <li>50 - 80 m²</li>
                    <li>100 - 150 m²</li>
                    <li>150 - 200 m²</li>
                    <li>Trên 200 m²</li>
                </ul>

                <ul class="home-filter-by-details">
                    <span>Lọc theo tình trạng nội thất</span>
                    <li>Cao cấp</li>
                    <li>Đầy đủ</li>
                    <li>Nhà trống</li>
                </ul>

                <ul class="home-filter-by-details">
                    <span>Lọc theo mức độ an ninh</span>
                    <li>Tốt</li>
                    <li>Khá</li>
                    <li>Trung bình</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
export default {
    components: { Button },
}
</script>

<style scoped>
    @import url('./home.css');
</style>