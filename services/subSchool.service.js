const { genGuid } = require('../helper');
const db = require('./db');

async function getAll(uuid){
    const subSchools = await db.query(
        'SELECT * FROM truong_phu where truong_chinh_id = ?',
        [uuid]
    );

    if(subSchools.length === 0) {
        return [];
    }
    return subSchools;
};

async function getOne(uuid){
    const subSchool = await db.query(
        'SELECT * FROM truong_phu where truong_phu_id = ?',
        [uuid]
    );

    if(subSchool.length === 0) {
        return [];
    }
    return subSchool[0];
};

async function checkExistName(idMainSchool, name){
    console.log(idMainSchool, name);
    const subSchool = await db.query(
        'SELECT * FROM truong_phu where truong_chinh_id = ? and ten_truong_phu = ?',
        [idMainSchool, name]
    );
    if(subSchool.length === 0) {
        return true;
    }
    return false;
};

async function deleteSubSchool(id){
    const subSchool = await db.query(
        'DELETE FROM truong_phu WHERE truong_phu_id = ?;',
        [id]
    );
    return subSchool;
};

async function checkDuplicate(id){
    const subSchool = await db.query(
        'SELECT * FROM truong_phu where truong_phu_id = ?',
        [id]
    );
    if(subSchool.length === 1) {
        return true;
    }
    return false;
};



async function addAndEditSubSchool(data, type) {
    let sql = "";
    let params = [];
    // thêm
    if(type === 1) {
        sql = "INSERT INTO truong_phu (truong_phu_id, truong_chinh_id, ten_truong_phu, dia_chi, khoang_cach_den_diem_chinh, so_dien_thoai, phuong_tien) VALUES (?, ?, ?, ?, ?, ?, ?)";
        params = [genGuid(), data.idMainSchool, data.name, data.address, data. distance_to_main_school, data.phone_number, data.transportation];
    } else {
        sql = "UPDATE truong_phu SET ten_truong_phu = ?, dia_chi = ?, khoang_cach_den_diem_chinh = ?, so_dien_thoai = ?, phuong_tien = ? WHERE truong_phu_id = ?";
        params = [data.name, data.address, data.distance_to_main_school, data.phone_number,data.transportation, data.objectGuid];
    }
    const affectedRows = await db.query(sql, params);
    return affectedRows;
}

// hàm check xem 

module.exports = {
    getAll, getOne, addAndEditSubSchool, checkExistName, checkDuplicate, deleteSubSchool
}