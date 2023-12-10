const db = require('./db');
const helper = require('../helper');

async function getMultiple(page = 1){
    const data = await db.query(
        `SELECT * FROM Accounts`
    );
    const meta = {page};
    return {
        data,
        meta
    }
}

const addAndEditUser = async (body) => {
    if(body.objectGuid === "00000000-0000-0000-0000-000000000000") {
        //validate
        if(1 === 1) {
            // gọi hàm sinh tại đây
            return "Create";
        }
        return "Err";

    } else {
        if(1 === 1) {
            // gọi hàm sửa tại đây
            return "Edit";
        }
        return "Err";
    }
    // return helper.genGuid();
}

const getInfoAccount = async (username) => {
    const sql =     `SELECT
    *
  FROM
  tai_khoan
  LEFT JOIN
    role
  ON
  phan_quyen = role.uuid JOIN nhan_vien ON nhan_vien = nhan_vien.ma_nhan_vien
  WHERE tai_khoan.ten_dang_nhap = ?`;
  const params = [username]
  const infoUser = await db.query(sql, params);
  return infoUser;
};

module.exports = {
    getMultiple, addAndEditUser, getInfoAccount
}