const db = require('./db');
const helper = require('../helper');

const genSchoolYear = (year) => {
    return `${year}-${(parseInt(year, 10) + 1).toString()}`;
}

async function checkExistYear(year){
    const resultSetHeader = await db.query(
        'SELECT * FROM yearkey WHERE yearkey = ?;',
        [year]
    );
    if(resultSetHeader.length === 0) {
        return true;
    }
    return false;
}

async function deleteSchoolYear(id){
    const resultSetHeader = await db.query(
        'DELETE FROM yearkey WHERE yearkey = ?;',
        [id]
    );
    return resultSetHeader;
};

async function addAndEditYearSchool(data) {
    let sql = "";
    let params = [];
    // thêm
    if(data.type === 1) {
        sql = "INSERT INTO yearkey (yearkey, nameYear, start_date_hk1, end_date_hk1, start_date_hk2, end_date_hk2) VALUES (?, ?, ?, ?, ?, ?)";
        params = [data.yearSchool, genSchoolYear(data.yearSchool), data.startDateSemester1, data.endDateSemester1, data.startDateSemester2, data.endDateSemester2];
    }
    if (data.type === 2) {
        sql = "UPDATE yearkey SET start_date_hk1 = ?, end_date_hk1 = ?, start_date_hk2 = ?, end_date_hk2 = ? WHERE yearkey = ?";
        params = [data.startDateSemester1, data.endDateSemester1, data.startDateSemester2, data.endDateSemester2, data.yearSchool];
    }
    let affectedRows = 0;
    if(sql != "") {
        affectedRows = await db.query(sql, params);
    }
    return affectedRows;
}

module.exports = {deleteSchoolYear,  addAndEditYearSchool, checkExistYear}