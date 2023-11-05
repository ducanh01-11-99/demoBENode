const db = require('./db');
const helper = require('../helper');

async function getList(idSchool){
    const dataResponse = await db.query(
        'SELECT * FROM department JOIN employee ON department.manager = employee.employee_id where department.id_school = ?;',
        [idSchool]
    );

    return dataResponse;
}

async function getOne(idDepartment){
    const dataResponse = await db.query(
        'SELECT * FROM department JOIN employee ON department.manager = employee.employee_id where department.uuid = ?;',
        [idDepartment]
    );
    return dataResponse;
}

async function easySearch(text, idSchool){
    const dataResponse = await db.query(
        'SELECT * FROM department JOIN employee ON department.manager = employee.employee_id where (employee.employee_name LIKE ?  or department.name like ? ) and department.id_school = ?;',
        [text, text, idSchool]
    );
    return dataResponse;
}

async function checkExistDepartmentCode(uuid){
    const dataResponse = await db.query(
        'SELECT * FROM department where uuid = ?',
        [uuid]
    );
        console.log("dataResponse", dataResponse);
    return dataResponse.length > 0;
}

async function checkExistDepartmentName(name){
    const dataResponse = await db.query(
        'SELECT * FROM department where name = ?',
        [name]
    );
    return dataResponse.length !== 0;
}

async function addDepartment(body, type){
    console.log('before add', body);
    let query = '';
    let value = [];
    if(type === 1) {
        query = 'insert into department (uuid, name, description, manager, status, id_school) value (?, ?, ?, ?, ?, ?);';
        value =  [body.uuid, body.name, body.description, body.manager, 1, body.idSchool]
    }
    if(type === 2) {
        query = 'update department set name = ?, description = ?, manager = ? where uuid = ?;';
        value = [body.name, body.description, body.manager, body.uuid]
    }
    const dataResponse = await db.query(query, value);
    console.log('dataResponse', dataResponse);
    return dataResponse;
}

async function updateDepartment(body){
    let manager = body.manager;
    console.log('before update', body, manager);
    const dataResponse = await db.query(
        'update department set name = ?, description = ?, manager = ?, status = 1 where uuid = ?;'
        [body.name, body.description, manager, body.uuid]
    );
    console.log("dataResponse", dataResponse);
    return dataResponse;
}

async function checkCanDel(id){
    console.log('id', id);
    const dataResponse = await db.query(
        'select status from department where uuid = ?;',
        [id]
    );
    // có thể xóa
    if(dataResponse[0].status === 0) {
        return true;
    }
    return false;
}

async function deleteDepartment(id){
    console.log('id', id);
    const dataResponse = await db.query(
        'DELETE from department where uuid = ?;',
        [id]
    );
    console.log(dataResponse);
    // có thể xóa
    if(dataResponse.affectedRows > 0) {
        return true;
    }
    return false;
}

module.exports = {getList, checkExistDepartmentCode, checkExistDepartmentName, addDepartment, updateDepartment, checkCanDel, deleteDepartment, getOne, easySearch}