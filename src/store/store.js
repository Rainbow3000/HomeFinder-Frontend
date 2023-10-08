
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
         isShowCreatePost:{
          isShow:false, 
          type:null
         }
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

    updateRoomList(state,payload){
      const findedIndex = state.rooms.findIndex(item => item.roomId === payload.roomId); 
      state.rooms = [...state.rooms.slice(0,findedIndex),payload,...state.rooms.slice(findedIndex + 1)];
    },

    setRoomList(state,payload){
      state.rooms = payload; 
    },
    setCategoryList(state,payload){
      state.categorys = payload
    },
    showCreatePost(state,payload){
      state.link.isShowCreatePost.isShow = !state.link.isShowCreatePost.isShow;
      state.link.isShowCreatePost.type = payload.type;  
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
   },

   setDeleteRoom(state,roomId){
      state.rooms = state.rooms.filter(item => item.roomId !== roomId); 
   },

   setUpdateStatusRoom(state,roomId){
     state.rooms = state.rooms.map(item=>{
      if(item.roomId === roomId){
         if(item.status === 1){
          item.status = 0; 
         }else {
          item.status = 1; 
         }
      }
      return item; 
     })
   }
  },
  actions:{
    async getRoomList({commit},{Offset,Limit,TextSearch,Price,Area,City,Level,Time,CategoryId}){
      try {
        const {data} = await publicRequest.get(`/Rooms/Filter?Offset=${Offset}&Limit=${Limit}&CategoryId=${CategoryId}&TextSearch=${TextSearch}&Price=${Price}&Area=${Area}&City=${City}&Level=${Level}&Time=${Time}`); 
        if(data !== undefined && data.statusCode === 200){
          commit("setRoomList",data.data); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },
    async getCategoryList({commit}){
      try {
        const {data} = await publicRequest.get('/Categorys'); 
        if(data !== undefined && data.statusCode === 200){
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
        phone:payload.phone,
        avatar:'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-250nw-1913928688.jpg'
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
        if(data !== undefined && data.statusCode === 200){
          commit('setSingleRoom',data.data); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async deleteImage({commit},imageId){
      try {
        await userRequest.delete(`/Images/${imageId}`)
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async updateImage({commit},imageId){
      try {
        await userRequest.put(`/Rooms/UpdateImage/${imageId}`)
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async updateRoom({commit},{postData,roomId}){
      try {
        const {data} = await userRequest.put(`/Rooms/${roomId}`,postData)
        if(data !== undefined && data.statusCode === 200){
            commit('updateRoomList',data.data); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async deleteRoom({commit},roomId){
      try {
        const {data} = await userRequest.delete(`/Rooms/${roomId}`)
        if(data !== undefined && data.statusCode === 200){
            commit('setDeleteRoom',roomId); 
        }
      } catch (error) {
        console.log(error);
        // commit('setRequestError',error.response.data)
      }
    },

    async updateStatusRoom({commit},roomId){
      try {
        const {data} = await userRequest.put(`/Rooms/UpdateStatus/${roomId}`)
        if(data !== undefined && data.statusCode === 200){
             commit('setUpdateStatusRoom',roomId); 
        }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },


     
  }
})


export default store; 