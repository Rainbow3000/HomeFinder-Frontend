

const validateNotMatchPassword = (password,rePassword)=>{
    if(password.trim().length !== rePassword.trim().length){
        return true; 
    }
    return false; 
}


const validateUserNameInvalid = (text)=>{
    if(text.trim().length < 3){
        return true; 
    }
    return false; 
}


const validateIsEmpty = (text)=>{
    if(text.trim().length === 0){
        return true; 
    }
    return false;
}

const validatePasswordInvalid = (password)=>{
    if(password.trim().length === 0 || password?.trim().length < 6){
        return true; 
    }
    return false; 
}

const vietnamesePhoneNumberRegex = /^\+84[3-9]\d{7,8}$/;

function validatePhoneNumber(phoneNumber) {
    const phoneValidate = `+84${phoneNumber.slice(1)}`
    return vietnamesePhoneNumberRegex.test(phoneValidate);
}
  



const validateEmail = (email)=> 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}


export {validateEmail,validatePasswordInvalid,validateIsEmpty,validateNotMatchPassword,validateUserNameInvalid,validatePhoneNumber}