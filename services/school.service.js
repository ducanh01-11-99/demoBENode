const db = require('./db');
const helper = require('../helper');

async function getOne(uuid){
    console.log(uuid);
    const schoolInfo = await db.query(
        'SELECT * FROM School where objectGuid = ?',
        [uuid]
    );

    console.log(schoolInfo);


    if(schoolInfo.length === 0) {
        return [];
    }
    return schoolInfo;
};

module.exports = {
    getOne
}