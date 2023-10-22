const { genGuid } = require('../helper');
const db = require('./db');

async function getAll(uuid){
    const subSchools = await db.query(
        'SELECT * FROM subSchool where idMainSchool = ?',
        [uuid]
    );

    if(subSchools.length === 0) {
        return [];
    }
    return subSchools;
};

async function getOne(uuid){
    const subSchool = await db.query(
        'SELECT * FROM subSchool where objectGuid = ?',
        [uuid]
    );

    if(subSchool.length === 0) {
        return [];
    }
    return subSchool[0];
};

async function addAndEditSubSchool(data, type) {
    let sql = "";
    let params = [];
    // thêm
    if(type === 1) {
        sql = "INSERT INTO subSchool (objectGuid, idMainSchool, name, address, distance_to_main_school, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
        params = [genGuid(), data.idMainSchool, data.name, data.address, data. distance_to_main_school, data.phone_number];
    } else {
        sql = "UPDATE subSchool SET name = ?, address = ?, distance_to_main_school = ?, phone_number = ? WHERE objectGuid = ?";
        params = [data.name, data.address, data.distance_to_main_school, data.phone_number, data.objectGuid];
    }
    const affectedRows = await db.query(sql, params);
    return affectedRows;
}

// hàm check xem 

module.exports = {
    getAll, getOne, addAndEditSubSchool
}