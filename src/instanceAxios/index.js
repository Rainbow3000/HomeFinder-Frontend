
import axios from "axios";
const baseURL = process.env.VUE_APP_BASE_URL; 





export const publicRequest = axios.create({
    baseURL,
    headers:{
        Authorization:""
    }
})

export const userRequest = axios.create({
    baseURL
})

userRequest.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).accessToken }`;
    return config;
  }, function (error) {
    console.log('axios error',error);
    return Promise.reject(error);
  });


