const db = require('./db');
const helper = require('../helper');

async function getList(idSchool){
    const dataResponse = await db.query(
        'SELECT * FROM to_bo_mon JOIN nhan_vien ON to_bo_mon.cb_quan_ly = nhan_vien.ma_nhan_vien where to_bo_mon.ma_truong = ?;',
        [idSchool]
    );

    return dataResponse;
}

async function getOne(idDepartment){
    const dataResponse = await db.query(
        'SELECT * FROM to_bo_mon JOIN nhan_vien ON to_bo_mon.cb_quan_ly = nhan_vien.ma_nhan_vien where to_bo_mon.to_bo_mon_id = ?;',
        [idDepartment]
    );
    return dataResponse;
}

async function easySearch(text, idSchool){
    const dataResponse = await db.query(
        'SELECT * FROM to_bo_mon JOIN nhan_vien ON to_bo_mon.cb_quan_ly = nhan_vien.ma_nhan_vien where (nhan_vien.ten_nhan_vien LIKE ?  or to_bo_mon.ten_to_bo_mon like ? ) and to_bo_mon.ma_truong = ?;',
        [text, text, idSchool]
    );
    return dataResponse;
}

async function checkExistDepartmentCode(uuid){
    const dataResponse = await db.query(
        'SELECT * FROM to_bo_mon where to_bo_mon_id = ?',
        [uuid]
    );
    return dataResponse.length > 0;
}

async function checkExistDepartmentName(name){
    const dataResponse = await db.query(
        'SELECT * FROM to_bo_mon where ten_to_bo_mon = ?',
        [name]
    );
    return dataResponse.length !== 0;
}

async function addDepartment(body, type){
    let query = '';
    let value = [];
    if(type === 1) {
        query = 'insert into to_bo_mon (to_bo_mon_id, ten_to_bo_mon, mo_ta, cb_quan_ly, trang_thai_to_bo_mon, ma_truong) value (?, ?, ?, ?, ?, ?);';
        value =  [body.uuid, body.name, body.description, body.manager, 1, body.idSchool]
    }
    if(type === 2) {
        query = 'update to_bo_mon set ten_to_bo_mon = ?, mo_ta = ?, cb_quan_ly = ? where to_bo_mon_id = ?;';
        value = [body.name, body.description, body.manager, body.uuid]
    }
    const dataResponse = await db.query(query, value);
    return dataResponse;
}

async function updateDepartment(body){
    let manager = body.manager;
    const dataResponse = await db.query(
        'update to_bo_mon set ten_to_bo_mon = ?, mo_ta = ?, cb_quan_ly = ?, trang_thai_to_bo_mon = 1 where to_bo_mon_id = ?;'
        [body.name, body.description, manager, body.uuid]
    );
    return dataResponse;
}

async function checkCanDel(id){
    const dataResponse = await db.query(
        'select trang_thai_to_bo_mon from to_bo_mon where to_bo_mon_id = ?;',
        [id]
    );
    // có thể xóa
    if(dataResponse[0].trang_thai_to_bo_mon !== 0) {
        return true;
    }
    return false;
}

async function deleteDepartment(id){
    const dataResponse = await db.query(
        'DELETE from to_bo_mon where to_bo_mon_id = ?;',
        [id]
    );
    // có thể xóa
    if(dataResponse.affectedRows > 0) {
        return true;
    }
    return false;
}

module.exports = {getList, checkExistDepartmentCode, checkExistDepartmentName, addDepartment, updateDepartment, checkCanDel, deleteDepartment, getOne, easySearch}