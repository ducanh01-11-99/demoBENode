const { validatePhone, validateEmail, validateText } = require("../share/commonFunction");

const {checkExistMaCanBo} = require("../services/teacher.service");

const addAndEditEmployee = async (req) => {
    const dataPost = req.body;
    try {
        //  validate các trường

        // validate ma_can_bo
        const maCanBo = dataPost.maCanBo;
        if(!maCanBo) {
            return "Mã cán bộ không được để trống";
        }
        if(regexWithoutHyphen.test(maCanBo)) return "Mã cán bộ không hợp lệ";

        // check trung ma can bo
        const checkExistCode = await checkExistMaCanBo(maCanBo);
        if(checkExistCode) return "Mã cán bộ đã tồn tại trong hệ thống";


        //validate so dien thoai
        const soDienThoai = dataPost.soDienThoai;
        const validatePhoneRes = validatePhone(soDienThoai, true);
        if(validatePhoneRes !== "") return validatePhoneRes;

        // validate email
        const email = dataPost.email;
        const validateEmailRes = validateEmail(email, true);
        if(validateEmailRes !== "") return validateEmailRes;

        //validate họ và tên
        const fullName = dataPost.hoTen;
        const validatenameRes = validateText(fullName, "Họ tên", true, 3, 50);
        console.log(validatenameRes);
        if(validatenameRes !== "") return validatenameRes;

        //validate bí danh
        const alias = dataPost.biDanh;
        const validatAliasRes = validateText(alias, "Bí danh", false, 3, 50);
        console.log(validatAliasRes);
        if(validatAliasRes !== "") return validatenameRes;

    } catch (error) {
        
    }
    console.log('dataPost', dataPost);
    return '';
}

const regexWithoutHyphen = /[!@#$%^&*()_+]/;

const resetPassword = async (req) => {
    const dataPost = req.body;
    console.log('dataPost', dataPost);
    return '';
}

module.exports = {
    addAndEditEmployee,
    resetPassword
}