const db = require('./db');
const helper = require('../helper');

// kiểm tra 1 id có tồn tại trong bảng hay không
const checkExistInTable = async (uuid, nameTable, nameColumn, mesage) => {
    const dataResponse = await db.query(
        `SELECT * FROM ${nameTable} where ${nameColumn} = ?`,
        [uuid]
    );

    if(dataResponse.length === 0) {
        return mesage + " không tồn tại trong hệ thống !";
    }

    return "";
}





module.exports = {checkExistInTable};