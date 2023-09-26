<template>
    <div class="dashboard-container">
        <div class="dashboard-left">
            <h1>Quản trị</h1>
            <ul>
                <li @click="()=>handleChangeComponent(0)">Tổng quan</li>
                <li @click="()=>handleChangeComponent(1)">Quản lý bài đăng</li>
                <h1>{{ count }}</h1>
                <button @click="handleClick">click me</button>
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

            function handleClick(){
                store.dispatch('incrementMutation')
            }
            return {
                componentNumber,
                handleChangeComponent,
                handleClick,
                count: computed(() => store.state.count),
            }
        },

    
    }

</script>


<style scoped>
    @import url('./dashboard.css');
</style>