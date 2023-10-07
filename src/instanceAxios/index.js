
import axios from "axios";
const baseURL = process.env.VUE_APP_BASE_URL; 

console.log('baseURL',baseURL);

export const publicRequest = axios.create({
    baseURL,
    headers:{
        Authorization:""
    }
})

export const userRequest = axios.create({
    baseURL,
    headers:{
        Authorization:`Bearer ${localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).accessToken }`
    }
})

