const db = require('./db');
const helper = require('../helper');

async function checkExistEmployeeCode(code) {
    const dataSelect = await db.query(
        'SELECT * FROM employee where employee_id = ?',
        [code]
    );
    return dataSelect.length === 1;
}

async function getAll(idSchool) {
    const dataSelect = await db.query(
        'SELECT * FROM employee',
        [idSchool]
    );
    return dataSelect;
}

async function getNameByID(idEmployee) {
    const dataSelect = await db.query(
        'SELECT name FROM employee where employee_id = ?;',
        [idEmployee]
    );
    if(dataSelect.length !== 0) {
        return dataSelect[0].name;
    }
    
    return "";
    
}

// lấy danh sách trình độ đào tạo
async function gitListTDDT() {
    const dataSelect = await db.query(
        'select * from trinh_do_dao_tao where trinh_do_status = 0;'
    );
    return dataSelect;
}

// lấy danh sách công việc
async function getListWorkType() {
    const dataSelect = await db.query(
        'select * from trinh_do_dao_tao where trinh_do_status = 0;'
    );
    return dataSelect;
}

// lấy danh sách loại hợp đồng
async function getListContractType() {
    const dataSelect = await db.query(
        'select * from loai_hop_dong where trinh_do_status = 0;'
    );
    return dataSelect;
}

const addLikeChar = (name) => {
    return '%' + name + '%';
}

// lọc danh sách
const filterEmployee = async (body) => {
    let dataSelect = [];
    const idDepartment = addLikeChar(body.idDepartment);
    const gender = addLikeChar(body.gender === '-1' ? "" : body.gender);
    const work = addLikeChar(body.work);
    const status = addLikeChar(body.status === "-1" ? "" : body.status);
    const employeeID = addLikeChar(body.employeeID);
    const name = addLikeChar(body.name);
    const contractType = addLikeChar(body.contractType);
    const entryLevel = addLikeChar(body.entryLevel);
    dataSelect = await db.query(
        `select * from chi_tiet_can_bo join demo.department d on d.uuid = chi_tiet_can_bo.to_bo_mon
        join demo.loai_hop_dong lhd on lhd.hop_dong_uuid = chi_tiet_can_bo.loai_hop_dong_id
        join demo.trinh_do_dao_tao ttdt on ttdt.trinh_do_uuid = chi_tiet_can_bo.trinh_do_dao_tao_id
        join demo.employee_work ew on ew.employee_work_id = chi_tiet_can_bo.cong_viec_id
        join demo.employee e on e.uuid_employee = chi_tiet_can_bo.can_bo_uuid
        where e.gioi_tinh like ? and to_bo_mon like ? and d.status like ? and e.employee_id like ? and e.employee_name like ? and trinh_do_uuid like ? and loai_hop_dong_id like ? and cong_viec_id like ?;`,
        [gender, idDepartment, status, employeeID, name, entryLevel, contractType, work]
    );
    return dataSelect;
}




module.exports = {checkExistEmployeeCode, getAll, getNameByID, gitListTDDT, getListContractType, filterEmployee, getListWorkType}