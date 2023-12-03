const REGEX_SPECIAL_CHARACTER = /[!@#$%^&*()_+-{}|:;<=>?]/;
const validateText = (text, name, isRequired, min, max) => {
    console.log(text, name, isRequired, min, max);
    if(isRequired) {
        if(text.length > 0) {
            if (text.length < min || text.length > max) {
                return `${name} có độ dài từ ${min} đến ${max} ký tự`;
            }
            // if(!REGEX_SPECIAL_CHARACTER.test(text)) {
            //     return `${name} không hợp lệ`;
            // }
            return "";

        } else {
            return `${name.trim() || "không được để trống"}`;
        }
    } else {
        if (text.length < min || text.length > max) {
            return `${name} có độ dài từ ${min} đến ${max} ký tự`;
        }
        // if(REGEX_SPECIAL_CHARACTER.test(text)) {
        //     return `${name} không hợp lệ`;
        // }
        return "";
    }
}

const validatePhone = (phoneNumber, isRequired) => {
    if(isRequired) {
        if(phoneNumber !== "") {
            if(!/(0|84)([3|5|7|8|9])+([0-9]{8})/g.test(phoneNumber)) {
                console.log('phoneNumber', phoneNumber);
                return "Số điện thoại không hợp lệ"
            } else {
                return "";
            }
        }
        return "Số điện thoại không được để trống"
    } else {
        if(!/(0|84)([3|5|7|8|9])+([0-9]{8})/g.test(phoneNumber)) {
            return "Số điện thoại không hợp lệ"
        }
        return "";
    }
}

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validateEmail = (email, isRequired) => {
    console.log('email', email);
    if(isRequired) {
        if(email !== "") {
            if(!REGEX_EMAIL.test(email)) {
                return "Email không hợp lệ"
            } else {
                return "";
            }
        }
        return "Email không được để trống"
    } else {
        if(!REGEX_EMAIL.test(email)) {
            return "Email không hợp lệ"
        }
        return "";
    }
}

/*
    The username starts with a letter or digit.
    The username can contain only letters, digits, underscores, hyphens, and periods.
    The username ends with a letter or digit.
*/
const validateUsername = username => {
    const regex = /^[a-zA-Z0-9_.-]+$/;
    return regex.test(username);
  }

/*
    The password contains at least one lowercase letter.
    The password contains at least one uppercase letter.
    The password contains at least one digit.
    The password contains at least one special symbol.
    The password is at least 12 characters long.
*/
const validatePassword = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()<>{}_+])(?=.{12,})$/;
    return regex.test(password);
  }

  function validateCCCDOrCMND(cccdOrCMND) {
    // Kiểm tra số CCCD hoặc CMND
    const regexCCCD = /^[0-9]{9,12}$/;
    if (!regexCCCD.test(cccdOrCMND)) {
      return false;
    }
  
    // Kiểm tra ngày tháng năm sinh
    const date = new Date(cccdOrCMND.substring(0, 6));
    if (date.getFullYear() < 1900 || date.getFullYear() > 2100) {
      return false;
    }
  
    // Kiểm tra giới tính
    const gender = cccdOrCMND.substring(6, 7);
    if (gender != "1" && gender != "2") {
      return false;
    }
  
    // // Kiểm tra nguyên quán
    // const regex = /^[a-zA-Z0-9\-\s]+$/;
    // if (!regex.test(cccdOrCMND.substring(7, 16))) {
    //   return false;
    // }
  
    // // Kiểm tra quê quán
    // const regex = /^[a-zA-Z0-9\-\s]+$/;
    // if (!regex.test(cccdOrCMND.substring(16, 25))) {
    //   return false;
    // }
  
    // // Kiểm tra nơi đăng ký thường trú
    // const regex = /^[a-zA-Z0-9\-\s]+$/;
    // if (!regex.test(cccdOrCMND.substring(25))) {
    //   return false;
    // }
  
    return true;
  }


// Kiểm tra có phải ngày trong tương lai hay không
const isFutureDate = date => {
    const today = new Date();
    return date.getTime() > today.getTime();
}


module.exports = {
    validateText,
    validatePhone,
    validateEmail,
    validateUsername,
    validatePassword,
    isFutureDate,
    validateCCCDOrCMND
}