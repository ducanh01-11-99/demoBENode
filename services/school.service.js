const db = require('./db');
const helper = require('../helper');

async function getOne(uuid){
    console.log(uuid);
    const schoolInfo = await db.query(
        'SELECT * FROM School where objectGuid = ?',
        [uuid]
    );

    if(schoolInfo.length === 0) {
        return [];
    }
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
    getOne, getTypeSchool
}