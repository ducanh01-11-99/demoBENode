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



module.exports = {checkExistEmployeeCode, getAll}