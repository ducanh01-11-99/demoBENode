const db = require('./db');
const helper = require('../helper');

async function getList(year, block){
    const resultSetHeader = await db.query(
        `
        SELECT idSubject, subject_block.status, idBlock, typeObject, scoreObject, yearKey, numberLesson1, numberLesson2, name, signName
        FROM subject_block
        JOIN subject
        ON subject_block.idSubject = subject.id
        WHERE subject_block.idBlock = ?
        AND subject_block.yearKey = ?;`,
        [block, year]
    );
    return resultSetHeader;
}

async function updateListSubject(year, block, data){
    const resultSetHeader = await db.query(
        `
        SELECT idSubject, subject_block.status, idBlock, typeObject, scoreObject, yearKey, numberLesson1, numberLesson2, name, signName
        FROM subject_block
        JOIN subject
        ON subject_block.idSubject = subject.id
        WHERE subject_block.idBlock = ?
        AND subject_block.yearKey = ?;`,
        [block, year]
    );
    return resultSetHeader;
}

module.exports = {getList}