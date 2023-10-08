<template>
    <div v-if="user !== null" class="dashboard-container">
        <div class="dashboard-left">
            <h1>Quản trị</h1>
            <ul>
                <li @click="()=>handleChangeComponent(0)">Tổng quan</li>
                <li @click="()=>handleChangeComponent(1)">Quản lý bài đăng</li>
                <li @click="()=>handleChangeComponent(2)">Quản lý tài khoản</li>
            </ul>
        </div>
        <div class="dashboard-right">
            <Charts v-if="componentNumber === 0"/>
            <PostList v-if="componentNumber === 1"/>
        </div>
    </div>
</template>



<script>
    import Charts from "@/components/charts/Charts.vue";
    import PostList from '@/components/postList/PostList.vue';
    import { ref,computed } from 'vue';
    import {useStore } from "vuex";
    export default{
        components:{
            Charts,
            PostList
        },

        setup() {
          
            const componentNumber = ref(JSON.parse(localStorage.getItem('component')))   
            const store = useStore();    
            localStorage.setItem('component',0); 

            const handleChangeComponent = (number)=>{
                componentNumber.value = number
                localStorage.setItem('component',number); 
            }

            return {
                componentNumber,
                handleChangeComponent,
                user:computed(()=> store.state.user)   
            }
        },

    
    }

</script>


<style scoped>
    @import url('./dashboard.css');
</style>