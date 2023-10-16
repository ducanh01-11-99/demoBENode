const db = require('./db');

async function getAll(uuid){
    console.log(uuid);
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
    console.log(uuid);
    const subSchool = await db.query(
        'SELECT * FROM subSchool where objectGuid = ?',
        [uuid]
    );

    if(subSchool.length === 0) {
        return [];
    }
    return subSchool;
};

module.exports = {
    getAll, getOne
}