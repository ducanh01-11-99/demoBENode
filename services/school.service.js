const db = require('./db');
const helper = require('../helper');

async function checkExistCode(code) {
    const dataSelect = await db.query(
        'SELECT * FROM school where truong_hoc_uuid = ?',
        [code]
    );
    return dataSelect.length === 1;
}

async function getOne(uuid){
    const schoolInfo = await db.query(
        'SELECT * FROM school where truong_hoc_uuid = ?',
        [uuid]
    );

    if(schoolInfo.length === 0) {
        return [];
    }
    return schoolInfo[0];
};

async function editSchool(data){
    const schoolInfo = await db.query(
        sql = "UPDATE school SET email = ?, dia_chi = ?, website = ?, so_dien_thoai = ?, ngay_thanh_lap = ? WHERE truong_hoc_uuid = ?",
        params = [data.email, data.address, data.website, data.phone, data.createDate, data.id],
    );
    return schoolInfo;
};



async function getTypeSchool(){
    const listTypeSchool = await db.query(
        'SELECT * FROM TypeSchool'
    );

    if(listTypeSchool.length === 0) {
        return [];
    }
    return listTypeSchool;
};

module.exports = {
    getOne, getTypeSchool, editSchool, checkExistCode
}