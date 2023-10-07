
import { publicRequest, userRequest } from '@/instanceAxios'
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
       user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
       account:{
        loginSuccess:false, 
        registerSuccess:false
       },
       link:{
         isLogin:false,
         isRegister:false,
         isShowCreatePost:false
       }, 
       serverResponseData:{
          success:false, 
          error:false,
          data:null
       },
       toastMessage:{
          isShow:false, 
          message:"",
          type:null         
       },
       showOverlay:false,
       rooms:[],
       singleRoom:null,
       categorys:[],
       imageObjectRemove:null,
    }
  },
  mutations: {

    setPathUrlRemove(state,payload){
      state.imageObjectRemove = payload; 
    },
    showToastMessage(state,payload){
      state.toastMessage = payload ; 
    },
    showOverlay(state){
      state.showOverlay = true;
    },
    hiddenOverlay(state){
      state.showOverlay = false;
    },
    loginLink(state){
        state.link.isLogin = !state.link.isLogin;
    },
    registerLink(state){
        state.link.isRegister = !state.link.isRegister;
    },
    logout(state){
        state.user = null; 
        state.link.isLogin = false; 
        state.link.isRegister = false; 
        state.link.isShowCreatePost = false;  
        state.showOverlay = false; 
        state.account.loginSuccess = false; 
        state.account.registerSuccess = false; 
        localStorage.removeItem('user'); 
    },
    setRoomList(state,payload){
      state.rooms = payload; 
    },
    setCategoryList(state,payload){
      state.categorys = payload
    },
    showCreatePost(state){
      state.link.isShowCreatePost = !state.link.isShowCreatePost; 
    },
    setUserLogin(state,payload){
      state.user = payload; 
      state.account.loginSuccess = payload.success
      localStorage.setItem('user', JSON.stringify(payload));   
    },
    setRegisterSuccess(state,payload){
      state.account.registerSuccess = payload.statusCode === 201 && true; 
    },
    setUserName (state,payload){
      state.user.userName = payload.name; 
    },

    setRequestError(state,payload){
       state.serverResponseData.error = true; 
       state.serverResponseData.data = payload
    },

    setRequestSuccess(state,payload){
      state.serverResponseData.success = true; 
      state.serverResponseData.data = payload
   },

   resetRequestState(state){
      state.serverResponseData.error = false; 
      state.serverResponseData.success = false;
      state.serverResponseData.data = null; 
   },
   setSingleRoom(state,payload){
      state.singleRoom = payload; 
   }
  },
  actions:{
    async getRoomList({commit},{Offset,Limit,TextSearch,Price,Area,City,Level,Time,CategoryId}){
      try {
        const {data} = await publicRequest.get(`/Rooms/Filter?Offset=${Offset}&Limit=${Limit}&CategoryId=${CategoryId}&TextSearch=${TextSearch}&Price=${Price}&Area=${Area}&City=${City}&Level=${Level}&Time=${Time}`); 
        if(data.statusCode === 200){
          commit("setRoomList",data.data); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },
    async getCategoryList({commit}){
      try {
        const {data} = await publicRequest.get('/Categorys'); 
        if(data.statusCode === 200){
          commit("setCategoryList",data.data); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },
    async userLogin({commit},payload){
      try {
        const {data} = await publicRequest.post('/Accounts/Login',payload);
        commit("setUserLogin",data.data); 
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },
    async userRegister({commit},payload){
      try {
        const accountResponse = await publicRequest.post('/Accounts/Register',{
          email:payload.email,
          password:payload.password
      });     
       await publicRequest.post('/Users',{
        accountId: accountResponse.data.data.accountId, 
        name: payload.userName,
        phone:payload.phone
      }) 
        commit("setRegisterSuccess",accountResponse.data); 
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },
    async createInfoUser({commit},payload){
      try {
        await userRequest.post('/Users',payload); 
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async createPost({commit},payload){
      try {
         const {data} =  await userRequest.post('/Rooms',payload);     
         console.log('aaa',data);  
         if(data.statusCode === 201){
           commit('setRequestSuccess',data)
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async getSingleRoom({commit},roomId){
      try {
        const {data} = await publicRequest.get(`/Rooms/${roomId}`)
        commit('setSingleRoom',data.data); 
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

     
  }
})


export default store; 