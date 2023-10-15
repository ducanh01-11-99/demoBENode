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
    console.log('body', body);
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

module.exports = {
    getMultiple, addAndEditUser
}