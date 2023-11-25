const db = require('./db');
const helper = require('../helper');

async function getList(year, block){
    const resultSetHeader = await db.query(
        `
        SELECT *
        FROM mon_hoc_theo_khoi_theo_nam
        JOIN mon_hoc
        ON mon_hoc_theo_khoi_theo_nam.ma_mon_hoc = mon_hoc.ma_mon_hoc_id
        WHERE mon_hoc_theo_khoi_theo_nam.ma_khoi = ?
        AND mon_hoc_theo_khoi_theo_nam.ma_nam_hoc = ?;`,
        [block, year]
    );
    return resultSetHeader;
}


// chua xu ly
async function updateListSubject(year, block, data){
    const resultSetHeader = await db.query(
        `
        SELECT idSubject, subject_block.status, idBlock, typeObject, scoreObject, yearKey, numberLesson1, numberLesson2, name, signName
        FROM mon_hoc_theo_khoi_theo_nam
        JOIN subject
        ON subject_block.idSubject = subject.id
        WHERE subject_block.idBlock = ?
        AND subject_block.yearKey = ?;`,
        [block, year]
    );
    return resultSetHeader;
}

module.exports = {getList}