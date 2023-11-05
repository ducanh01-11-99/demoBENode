const db = require('./db');
const helper = require('../helper');

async function checkExistEmployeeCode(code) {
    const dataSelect = await db.query(
        'SELECT * FROM employee where employee_id = ?',
        [code]
    );
    console.log(dataSelect);
    return dataSelect.length === 1;
}

async function getAll(idSchool) {
    const dataSelect = await db.query(
        'SELECT * FROM employee',
        [idSchool]
    );
    return dataSelect;
}

async function getNameByID(idEmployee) {
    const dataSelect = await db.query(
        'SELECT name FROM employee where employee_id = ?;',
        [idEmployee]
    );

    // console.log(dataSelect.length);
    
    if(dataSelect.length !== 0) {
        return dataSelect[0].name;
    }
    
    return "";
    
}





module.exports = {checkExistEmployeeCode, getAll, getNameByID}