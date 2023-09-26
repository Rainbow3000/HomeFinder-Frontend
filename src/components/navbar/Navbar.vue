''<template>
    <div class="navbar-container">
        <div class="navbar-left">
            <div class="navbar-logo">
                <h1><router-link class="link" to="/">HOME FINDER</router-link></h1>
            </div>
            <ul class="navbar-link">
                <li>
                    <router-link class="link" to="/dashboard">
                        Quản trị
                    </router-link>
                </li>
                <li>Tin Tức</li>
                <li>Hướng Dẫn</li>
            </ul>
        </div>

        <div class="navbar-right">
            <div class="navbar-icon">
                <i class="fa-regular fa-heart"></i>
                <span>Tin Đã Lưu</span>
            </div>
            <div class="navbar-icon">
                <i class="fa-regular fa-bell"></i>
                <span>Thông Báo</span>
            </div>
            <div class="navbar-icon">
                <i class="fa-regular fa-user"></i>
                <span>Đăng Nhập</span>
                <span> / </span>
                <span>Đăng Ký</span>
            </div>
            <div class="navbar-icon">
                <i class="fa-solid fa-gear"></i>
                <span>Cài Đặt</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'NavbarComponent'
}

</script>



<style scoped>


.navbar-logo{
    display: flex;
    align-content: center;
}

.navbar-logo i{
    margin-right: 5px;
}

.navbar-logo h1{
    font-size: 18px;
}


.navbar-container{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: #FFFFFF;
    z-index: 100;
    border-bottom: 0.5px solid rgba(128, 128, 128, 0.164);
}

.navbar-left{
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 50px;
}
.navbar-link{
    height: 100%;
    display: flex;
    margin-left: 50px;
    font-weight: 500;
    width: auto;
}

.navbar-link li{
    margin-left: 30px;
    cursor: pointer;
}

.navbar-link li:hover{
    color: gray;
}

.navbar-right{
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: flex-end;
    padding-right: 50px;
}

.navbar-right div{
    margin-right: 30px;
    cursor: pointer;
}


.navbar-icon i{
    margin-right: 5px;
}

.navbar-icon span:hover{
    color: gray;
}

</style>