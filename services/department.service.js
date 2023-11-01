const db = require('./db');
const helper = require('../helper');

async function getList(idSchool){
    console.log(idSchool);
    const dataResponse = await db.query(
        'SELECT * FROM department where id_school = ?',
        [idSchool]
    );
    console.log(dataResponse);
    return dataResponse;
}

async function checkExistDepartmentCode(uuid){
    const dataResponse = await db.query(
        'SELECT * FROM department where uuid = ?',
        [uuid]
    );
        console.log("dataResponse", dataResponse);
    return dataResponse;
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
    let manager = body.manager.toString();
    let query = '';
    let value = [];
    if(type === 1) {
        query = 'insert into department (uuid, name, description, manager, status, id_school) value (?, ?, ?, ?, ?, ?);';
        value =  [body.uuid, body.name, body.description, manager, 1, body.idSchool]
    }
    if(type === 2) {
        query = 'update department set name = ?, description = ?, manager = ?, status = 1 where uuid = ?;';
        value =   [body.name, body.description, manager, body.uuid]
    }
    const dataResponse = await db.query(query, value);
    return dataResponse;
}

async function updateDepartment(body){
    let manager = body.manager.toString();
    console.log('before update', body, manager);
    const dataResponse = await db.query(
        'update department set name = ?, description = ?, manager = ?, status = 1 where uuid = ?;'
        [body.name, body.description, manager, body.uuid]
    );
    console.log("dataResponse", dataResponse);
    return dataResponse;
}

module.exports = {getList, checkExistDepartmentCode, checkExistDepartmentName, addDepartment, updateDepartment}