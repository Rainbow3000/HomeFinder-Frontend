
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
          room:{
            success:false,
            error:false,
            data:null
          },
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
       userInfo:null,
       pageSize:0,
       error:{
          account:{
            text:"",
            statusCode:""
          }
       },

      farvouriteRooms: localStorage.getItem('room-favourite') !== null ? JSON.parse(localStorage.getItem('room-favourite')) : {}
      
    }
  },
  mutations: {



    setFavouriteRoom(state,payload){
      const favouriteItem = state.farvouriteRooms[payload.roomId]; 
      if(favouriteItem !== undefined){
        delete state.farvouriteRooms[favouriteItem.roomId]; 
        localStorage.setItem('room-favourite',JSON.stringify(state.farvouriteRooms));
        return;
      }
      state.farvouriteRooms[payload.roomId] = payload;
      localStorage.setItem('room-favourite',JSON.stringify(state.farvouriteRooms)); 
    },

    setRoomResponseData(state,payload){
      state.serverResponseData.room = payload; 
    },

    resetRequestState(state){
      state.serverResponseData = {
        room:{
          success:false,
          error:false,
          data:null
        },
     }
    },

    resetError(state){
      state.error.account.text = "";
      state.error.account.statusCode = ""; 
    },
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
   setSingleRoom(state,payload){
      state.singleRoom = payload; 
   },

   setDeleteRoom(state,roomId){
      state.rooms = state.rooms.filter(item => item.roomId !== roomId); 
   },
   setUserInfo(state,payload){
    state.userInfo =  payload; 
   },

   setPageSize(state,pageSize){
    state.pageSize = pageSize; 
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
   },

   setAccountError(state,payload){
      state.error.account.text = payload.Message; 
      state.error.account.statusCode = payload.statusCode;
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

    async getRoomByUser({commit},accountId){
      try {
        const {data} = await publicRequest.get(`/Rooms/GetByUser/${accountId}`); 
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
        commit('setAccountError',error.response.data)
      }
    },
    async userRegister({commit},payload){
      try {
        const accountResponse = await publicRequest.post('/Accounts/Register',{
          email:payload.email,
          password:payload.password
        });     
        await publicRequest.post('/Users/Update',{
          accountId: accountResponse.data.data.accountId, 
          name: payload.userName,
          phone:payload.phone,
          avatar:'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-250nw-1913928688.jpg'
        }) 
        commit("setRegisterSuccess",accountResponse.data); 
        commit('resetError'); 
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
         if(data.statusCode === 201){
          commit('setRoomResponseData',{
            success:true,
            error:false,
            data:null
          })
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

    async getPageSizeRoom({commit}){
      try {
        const {data} = await publicRequest.get(`/Rooms/PageSize`);
        if(data !== undefined && data.statusCode === 200){
          commit('setPageSize',data.data); 
        }
      } catch (error) {
        
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
            commit('setRoomResponseData',{
              success:true,
              error:false,
              data:null
            })
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

    async getUserInfo ({commit},accountId){
      try {
        const {data} = await userRequest.get(`/Users/${accountId}`)
        if(data !== undefined && data.statusCode === 200){
          commit('setUserInfo',data.data); 
     }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    },

    async updateUserInfo({commit},{userData,accountId}){
      try {
        const {data} = await userRequest.put(`/Users/${accountId}`,userData)
        if(data !== undefined && data.statusCode === 200){
          console.log('data',data.data);
          commit('setUserInfo',data.data); 
     }
      } catch (error) {
        commit('setRequestError',error.response.data)
      }
    }

     
  }
})


export default store; 