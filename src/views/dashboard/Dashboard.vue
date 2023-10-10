<template>
    <div v-if="user !== null" class="dashboard-container">
        <div class="dashboard-left">
            <h1>Quản trị</h1>
            <ul>
                <li @click="handleChangeComponent(1)">Quản lý bài đăng</li>
                <li @click="handleChangeComponent(2)">Quản lý tài khoản</li>
            </ul>
        </div>
        <div class="dashboard-right">
          
            <PostList v-if="componentNumber === 1"/>
            <UserInfo v-if="componentNumber === 2" />
        </div>
    </div>
</template>



<script>
    import PostList from '@/components/postList/PostList.vue';
    import UserInfo from '@/components/userinfo/UserInfo.vue';
    import { ref,computed,reactive } from 'vue';
    import {useStore } from "vuex";
    import { useRouter } from 'vue-router';
    export default{
        components:{
            PostList,
            UserInfo
        },

        setup() {
    
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
            const componentNumber = ref(JSON.parse(localStorage.getItem('component')))   
            const store = useStore();
            const router = useRouter();
            localStorage.setItem('component',1); 

            const handleChangeComponent = (number)=>{
                componentNumber.value = number
                localStorage.setItem('component',number); 
            }

            const user = computed(()=> store.state.user)

            if(user.value === null){
                router.push({path:'/'})
            }

            store.dispatch('getProvincesVN'); 
            return {
                componentNumber,
                handleChangeComponent,
                user
            }
        },

    
    }

</script>


<style scoped>
    @import url('./dashboard.css');
</style>