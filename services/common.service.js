const db = require('./db');
const helper = require('../helper');

// kiểm tra 1 id có tồn tại trong bảng hay không
const checkExistInTable = async (uuid, nameTable, nameColumn, mesage) => {
    console.log(uuid, nameTable, nameColumn, mesage);
    try {
        const dataResponse = await db.query(
            `SELECT * FROM ${nameTable} where ${nameColumn} = ?`,
            [uuid]
        );
    
        if(dataResponse.length === 0) {
            return mesage + " không tồn tại trong hệ thống !";
        }
    
        return "";
    }
    catch (err) {
        console.log(err);
    }
}


// Kiểm tra mã tỉnh/huyện/xã có khớp nhau hay không?
const checkExistProvinces = async (idProvince, idDistrict, idWard) => {
    const dataResponse = await db.query(
        `SELECT * FROM provinces where code = ?`,
        [idProvince]
    );
    if(dataResponse.length === 0) {
        return "Tỉnh/thành phố không hợp lệ";
    }

    const dataResponse2 = await db.query(
        `SELECT * FROM districts where code = ? and province_code = ?`,
        [idDistrict, idProvince]
    );
    if(dataResponse2.length === 0) {
        return "Quận/huyện không hợp lệ";
    }

    const dataResponse3 = await db.query(
        `SELECT * FROM wards where code = ? and district_code = ?`,
        [idWard, idDistrict]
    );
    if(dataResponse3.length === 0) {
        return "Xã/phường không hợp lệ";
    }
    return "";
}

// Kiểm tra tôn giáo
const checkTonGiao = async (tonGiaoID) => {
    const dataResponse = await db.query(
        `SELECT * FROM danh_muc_ton_giao where TonGiaoID = ?`,
        [tonGiaoID]
    );
    if(dataResponse.length === 0) {
        // Không tồn tại tôn giáo này
        return false;
    }
    return true;
}

// Kiểm tra dân tộc
const checkDanToc = async (dantocID) => {
    const dataResponse = await db.query(
        `SELECT * FROM danh_muc_dan_toc where id = ?`,
        [dantocID]
    );
    if(dataResponse.length === 0) {
        // Không tồn tại tôn giáo này
        return false;
    }
    return true;
}

// Đặt lại mật khẩu
const resetPasswordService = async(id) => {
    const dataResponse = await db.query(
        `UPDATE tai_khoan set mat_khau = '$2b$10$wzmBMPshJs0ZYL0BiLT8O.TeiTAL6sLCqgeLBjRBPdSlVMEQj5.Xq' where nhan_vien = ?`,
        [id]
    );
    if(dataResponse.affectedRows > 0) {
        console.log("12312");
        return 0;
    }
    return 1;
}

module.exports = {checkExistInTable, checkExistProvinces, checkTonGiao, checkDanToc, resetPasswordService};