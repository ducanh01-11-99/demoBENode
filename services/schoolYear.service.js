const db = require('./db');
const helper = require('../helper');

const genSchoolYear = (year) => {
    return `${year}-${(parseInt(year, 10) + 1).toString()}`;
}

async function checkExistYear(year){
    const resultSetHeader = await db.query(
        'SELECT * FROM nam_hoc WHERE ma_nam_hoc = ?;',
        [year]
    );
    if(resultSetHeader.length === 0) {
        return true;
    }
    return false;
}

async function deleteSchoolYear(id){
    const resultSetHeader = await db.query(
        'DELETE FROM nam_hoc WHERE ma_nam_hoc = ?;',
        [id]
    );
    return resultSetHeader;
};

async function addAndEditYearSchool(data) {
    let sql = "";
    let params = [];
    // thêm
    if(data.type === 1) {
        sql = "INSERT INTO nam_hoc (ma_nam_hoc, ten_nam_hoc, ngay_bat_dau_hk1, ngay_ket_thuc_hk1, ngay_bat_dau_hk2, ngay_ket_thuc_hk2) VALUES (?, ?, ?, ?, ?, ?)";
        params = [data.yearSchool, genSchoolYear(data.yearSchool), data.startDateSemester1, data.endDateSemester1, data.startDateSemester2, data.endDateSemester2];
    }
    if (data.type === 2) {
        sql = "UPDATE nam_hoc SET ngay_bat_dau_hk1 = ?, ngay_ket_thuc_hk1 = ?, ngay_bat_dau_hk2 = ?, ngay_ket_thuc_hk2 = ? WHERE ma_nam_hoc = ?";
        params = [data.startDateSemester1, data.endDateSemester1, data.startDateSemester2, data.endDateSemester2, data.yearSchool];
    }
    let affectedRows = 0;
    if(sql != "") {
        affectedRows = await db.query(sql, params);
    }
    return affectedRows;
}

module.exports = {deleteSchoolYear,  addAndEditYearSchool, checkExistYear}