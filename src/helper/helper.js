import moment from "moment/moment";
const resetToastMessage = (store)=>{
        setTimeout(() => {
            store.commit('showToastMessage',{
                isShow:false,
                message:"", 
                type :null
            })
        }, 3000);
}

const resetRequestState = (store)=>{
    setTimeout(() => {
        store.commit('resetRequestState')
    }, 3000);
}

const convertToVND = (number)=>{
     return number?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
}



const covertDate = (date)=>{
    moment.locale('vi'); 
    const timeSplit = date.split("T");
    const dateReverse = timeSplit[0].split('-').reverse().join('/'); 
    const time = timeSplit[1].split(':').slice(0,2).join(':');   
    const newDate = `${dateReverse} - ${time}`
    return newDate
}


export {resetToastMessage,resetRequestState,convertToVND,covertDate}