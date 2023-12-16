const { validatePhone, validateEmail, validateText, validateUsername, valdiateCCCD } = require("../share/commonFunction");

const {checkExistMaCanBo, checkToBoMon, addAndEdit, checkUsername, editEmployeService, layMaTuTangService, checkExistEmployeeCode} = require("../services/teacher.service");

const {checkExistProvinces, checkTonGiao, checkDanToc, checkExistInTable, resetPasswordService} = require("../services/common.service");

const {sendMail} = require("../services/emailService");

const addEmployee = async (req) => {
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
        if(checkExistCode) {
            return "Mã cán bộ đã tồn tại trong hệ thống";
        };
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
        if(validatenameRes !== "") return validatenameRes;

        //validate bí danh
        const alias = dataPost.biDanh;
        const validatAliasRes = validateText(alias, "Bí danh", false, 3, 50);
        if(validatAliasRes !== "") return validatenameRes;

        // validate tenDangNhap
        const username = dataPost.tenDangNhap;
        const validateUserNameRes = validateUsername(username);
        if(validateUserNameRes !== "") return validateUserNameRes;

        // validate CCCD
        const cccd = dataPost.cccd;
        const validateCCCD = valdiateCCCD(cccd);
        if(validateCCCD !== "") return validateCCCD;

        // Kiểm tra mã tỉnh/huyện/xã có phù hợp hay không?
        const provinceID = dataPost.queQuanTinh;
        const districtID = dataPost.queQuanHuyen;
        const wardID = dataPost.queQuanXa;
        const checkAddressID = await checkExistProvinces(provinceID, districtID, wardID);
        if(checkAddressID !== "") return checkAddressID;

        // Kiểm tra giới tính
        const gender = dataPost.gioiTinh;
        if(!(gender === 0 || gender === 1)) {
            return "Giới tính không hợp lệ";
        }

        // Kiểm tra dân tộc
        const danToc = dataPost.danToc;
        const checkDanTocRes = await checkDanToc(danToc);
        if(!checkDanTocRes) return "Mã dân tộc không hợp lệ";

        // Kiểm tra tôn giáo
        const tonGiao = dataPost.tonGiao;
        const checkTonGiaoRes = await checkTonGiao(tonGiao);
        if(!checkTonGiaoRes) return "Mã tôn giáo không hợp lệ";

        // Kiểm tra tổ bộ môn
        const toBoMon = dataPost.toBoMon;
        const checkToBoMonRes = await checkToBoMon(toBoMon);
        if(!checkToBoMonRes) return "Mã tổ bộ môn không hợp lệ";

        // Validate tat ca

        // validate ten tai khoan
        const userName = dataPost.tenDangNhap;
        const checkUserNameRes = checkUsername(userName);
        if(!checkUserNameRes) return "Tên đăng nhập đã tồn tại";


        const addAndEditTeaccher = await addAndEdit(dataPost, 1);
        if(addAndEditTeaccher) {
            return "";
        } else {
            return "Thêm thành công";
        }

    } catch (error) {
        return 
    }
    console.log('dataPost', dataPost);
    return '';
}

const editEmployee = async (dataPut) => {
    console.log('dataPut', dataPut);
    // Kiểm tra uuid đã tồn tại trên hệ thống hay chưa
    const checkExistUuidRes = await checkExistInTable(dataPut.uuid, 'nhan_vien', 'ma_nhan_vien', 'Mã nhân viên');
    console.log(checkExistUuidRes);
    if(checkExistUuidRes !== "") {
        return "Không tìm thấy nhân viên có mã trên";
    }

    //validate so dien thoai
    const soDienThoai = dataPut.soDienThoai;
    const validatePhoneRes = validatePhone(soDienThoai, true);
    if(validatePhoneRes !== "") return validatePhoneRes;

    // validate email
    const email = dataPut.email;
    const validateEmailRes = validateEmail(email, true);
    if(validateEmailRes !== "") return validateEmailRes;

    //validate họ và tên
    const fullName = dataPut.hoTen;
    const validatenameRes = validateText(fullName, "Họ tên", true, 3, 50);
    if(validatenameRes !== "") return validatenameRes;

    //validate bí danh
    const alias = dataPut.biDanh;
    const validatAliasRes = validateText(alias, "Bí danh", false, 3, 50);
    if(validatAliasRes !== "") return validatenameRes;

    // validate CCCD
    const cccd = dataPut.cccd;
    const validateCCCD = valdiateCCCD(cccd);
    if(validateCCCD !== "") return validateCCCD;

    // Kiểm tra mã tỉnh/huyện/xã có phù hợp hay không?
    const provinceID = dataPut.queQuanTinh;
    const districtID = dataPut.queQuanHuyen;
    const wardID = dataPut.queQuanXa;
    const checkAddressID = await checkExistProvinces(provinceID, districtID, wardID);
    if(checkAddressID !== "") return checkAddressID;

    // Kiểm tra giới tính
    const gender = dataPut.gioiTinh;
    if(!(gender === 0 || gender === 1)) {
        return "Giới tính không hợp lệ";
    }

    // Kiểm tra dân tộc
    const danToc = dataPut.danToc;
    const checkDanTocRes = await checkDanToc(danToc);
    if(!checkDanTocRes) return "Mã dân tộc không hợp lệ";

    // Kiểm tra tôn giáo
    const tonGiao = dataPut.tonGiao;
    const checkTonGiaoRes = await checkTonGiao(tonGiao);
    if(!checkTonGiaoRes) return "Mã tôn giáo không hợp lệ";

    // Kiểm tra tổ bộ môn
    const toBoMon = dataPut.toBoMon;
    const checkToBoMonRes = await checkToBoMon(toBoMon);
    if(!checkToBoMonRes) return "Mã tổ bộ môn không hợp lệ";

    const editEmployeeRes = await editEmployeService(dataPut);
    console.log(editEmployeeRes);
    if(editEmployeeRes) {
        return "";
    } else {
        return "Sửa thông tin cán bộ thành công";
    }  
}

const regexWithoutHyphen = /[!@#$%^&*()_+]/;

const resetPassword = async (id) => {
    if(!id) return "Mã cán bộ không được để trống";
    // check id có trong bảng hay không?
    const checkExist = await checkExistInTable(id, "tai_khoan", "nhan_vien", "Tài khoản");
    if(checkExist !== "" ) return checkExist;
    const resetResult = await resetPasswordService(id);
    console.log(resetResult);
    // Gui mail dae lai sau
    try {
        sendMail('ducanh20176919@gmail.com', 'CAP LAI MAT KHAU', 'Mat khau moi: Abcd@1234');
    } catch (error) {
        console.log(error);
    }

    return resetResult;
}

const layMaTuTang = async (id) => {
    return await layMaTuTangService(id);
}

const checkExist = async (id) => {
    return await checkExistEmployeeCode(id);
}

module.exports = {
    addEmployee,
    resetPassword,
    editEmployee,
    layMaTuTang,
    checkExist
}