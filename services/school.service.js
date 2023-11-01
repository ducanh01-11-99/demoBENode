const db = require('./db');
const helper = require('../helper');

async function checkExistCode(code) {
    const dataSelect = await db.query(
        'SELECT * FROM School where objectGuid = ?',
        [code]
    );
    return dataSelect.length === 1;
}

async function getOne(uuid){
    const schoolInfo = await db.query(
        'SELECT * FROM School where objectGuid = ?',
        [uuid]
    );

    if(schoolInfo.length === 0) {
        return [];
    }
    return schoolInfo[0];
};

async function editSchool(data){
    const schoolInfo = await db.query(
        sql = "UPDATE School SET Email = ?, DiaChi = ?, website = ?, DienThoaiLienHe = ?, create_date = ? WHERE objectGuid = ?",
        params = [data.email, data.address, data.website, data.phone, data.createDate, data.id],
    );

    console.log(schoolInfo);

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