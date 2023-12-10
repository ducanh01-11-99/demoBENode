const db = require('./db');
const helper = require('../helper');
const {genGuid} = require('../helper');
const bcrypt = require('bcrypt');

async function checkExistEmployeeCode(code) {
    const dataSelect = await db.query(
        'SELECT * FROM nhan_vien where ma_nhan_vien = ?',
        [code]
    );
    return dataSelect.length === 1;
}

async function getAll(idSchool) {
    const dataSelect = await db.query(
        'SELECT * FROM nhan_vien',
        [idSchool]
    );
    return dataSelect;
}

async function getNameByID(idEmployee) {
    const dataSelect = await db.query(
        'SELECT ten_nhan_vien FROM nhan_vien where ma_nhan_vien = ?;',
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
        'select * from nhan_vien_cong_viec where trang_thai_cong_viec = 0;'
    );
    return dataSelect;
}

// lấy danh sách loại hợp đồng
async function getListContractType() {
    const dataSelect = await db.query(
        'select * from loai_hop_dong where loai_hop_dong_status = 0;'
    );
    return dataSelect;
}

const addLikeChar = (name) => {
    return '%' + name + '%';
}

// lọc danh sách
const filterEmployee = async (body) => {
    let dataSelect = [];
    let listAll= [];
    const idDepartment = addLikeChar(body.idDepartment);
    const gender = addLikeChar(body.gender === -1 ? "" : body.gender);
    const work = addLikeChar(body.work);
    const status = addLikeChar(body.status === -1 ? "" : body.status);
    const employeeID = addLikeChar(body.employeeID);
    const name = addLikeChar(body.name);
    const contractType = addLikeChar(body.contractType);
    const entryLevel = addLikeChar(body.entryLevel);
    const pageSize = body.pageSize;
    const startIndex = (body.page - 1) * pageSize;
    dataSelect = await db.query(
        `select * from chi_tiet_can_bo join demo.to_bo_mon d on d.to_bo_mon_id = chi_tiet_can_bo.to_bo_mon
        join demo.loai_hop_dong lhd on lhd.loai_hop_dong_id = chi_tiet_can_bo.loai_hop_dong
        join demo.trinh_do_dao_tao ttdt on ttdt.trinh_do_uuid = chi_tiet_can_bo.trinh_do_dao_tao_id
        join demo.nhan_vien_cong_viec ew on ew.ma_nhan_vien_cong_viec = chi_tiet_can_bo.cong_viec_id
        join demo.nhan_vien e on e.ma_nhan_vien = chi_tiet_can_bo.can_bo_uuid
        where e.gioi_tinh like ? and to_bo_mon like ? and d.trang_thai_to_bo_mon like ? and e.ma_nhan_vien like ? and e.ten_nhan_vien like ? and trinh_do_uuid like ? and loai_hop_dong_id like ? and cong_viec_id like ? limit ${startIndex}, ${pageSize};`,
        [gender, idDepartment, status, employeeID, name, entryLevel, contractType, work]
    );

    listAll = await db.query(
        `select * from chi_tiet_can_bo join demo.to_bo_mon d on d.to_bo_mon_id = chi_tiet_can_bo.to_bo_mon
        join demo.loai_hop_dong lhd on lhd.loai_hop_dong_id = chi_tiet_can_bo.loai_hop_dong
        join demo.trinh_do_dao_tao ttdt on ttdt.trinh_do_uuid = chi_tiet_can_bo.trinh_do_dao_tao_id
        join demo.nhan_vien_cong_viec ew on ew.ma_nhan_vien_cong_viec = chi_tiet_can_bo.cong_viec_id
        join demo.nhan_vien e on e.ma_nhan_vien = chi_tiet_can_bo.can_bo_uuid
        where e.gioi_tinh like ? and to_bo_mon like ? and d.trang_thai_to_bo_mon like ? and e.ma_nhan_vien like ? and e.ten_nhan_vien like ? and trinh_do_uuid like ? and loai_hop_dong_id like ? and cong_viec_id like ?;`,
        [gender, idDepartment, status, employeeID, name, entryLevel, contractType, work]
    )

    return {list: dataSelect, total: listAll.length};
}

const checkExistMaCanBo = async (mcb) => {
    const sql =  `SELECT * from nhan_vien where ma_so_nhan_vien = ?`;
    const params = [mcb];
    const list = await db.query(sql, params);
    if(list.length > 0) {
        return true;
    } return false;
}

const checkToBoMon = async (maToBoMon) => {
    const sql =  `SELECT * from to_bo_mon where to_bo_mon_id = ?`;
    const params = [maToBoMon];
    const list = await db.query(sql, params);
    if(list.length > 0) {
        return true;
    } return false;
}

const checkUsername = async (userName) => {
    const sql =  `SELECT * from tai_khoan where ten_dang_nhap = ?`;
    const params = [userName];
    const list = await db.query(sql, params);
    if(list.length > 0) {
        return false;
    } return true;
}

const addAndEdit = async (body, type) => {
    try {
        const newGuid = genGuid();
        let queryList = [];
        let valueList = [];
        const hashedPassword = bcrypt.hashSync("Abcd@1234", 10);
        query1 = 'insert into nhan_vien (ma_nhan_vien, ten_nhan_vien, ma_so_nhan_vien, so_dien_thoai, gioi_tinh, trang_thai, que_quan, que_quan_tinh, que_quan_huyen, que_quan_xa, ngay_sinh, cccd, la_dang_vien, noi_vao_dang, dan_toc, ton_giao, ngay_vao_truong) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        value1 =  [newGuid, body.hoTen, body.maCanBo, body.soDienThoai, body.gioiTinh, 1, body.queQuan, body.queQuanTinh, body.queQuanHuyen, body.queQuanXa, "1990/01/01", body.cccd, 0, "", body.danToc, body.tonGiao, body.ngayVaoTruong];

        query2 = 'insert into tai_khoan values (?, ?, ?, ?, ?, ?);';
        value2 = [genGuid(), body.tenDangNhap, hashedPassword, 1, 0,newGuid];

        query3 = 'insert into chi_tiet_can_bo values (?,?,?,?,?)';
        value3 = [newGuid, body.toBoMon, body.maCongViec, body.trinhDoDaoTao, body.loaiHopDong];

        queryList.push(query1, query2, query3);
        valueList.push(value1, value2, value3);
        
        const dataResponse = await db.multiQueryWithTransaction(queryList, valueList);
        return "";
    } catch (error) {
        return error
    }
}

const editEmployeService = async (body) => {
    try {
        let queryList = [];
        let valueList = [];

        const query1 = `update nhan_vien
                            set ten_nhan_vien = ?,
                                so_dien_thoai = ?,
                                gioi_tinh = ?,
                                trang_thai = ?,
                                que_quan = ?,
                                que_quan_tinh = ?,
                                que_quan_huyen = ?,
                                que_quan_xa = ?,
                                ngay_sinh = ?,
                                cccd = ?,
                                la_dang_vien = ?,
                                noi_vao_dang = ?,
                                dan_toc = ?,
                                ton_giao = ?,
                                ngay_vao_truong = ?
                            where ma_nhan_vien = ?;`;
        const query2 =  `update chi_tiet_can_bo
                            set to_bo_mon = ?,
                            cong_viec_id = ?,
                            trinh_do_dao_tao_id = ?,
                            loai_hop_dong = ?
                            where can_bo_uuid = ?`;
        const value1 = [body.hoTen, body.soDienThoai, body.gioiTinh, 1, body.queQuan, body.queQuanTinh, body.queQuanHuyen, body.queQuanXa, body.ngaySinh, body.cccd, 0, "", body.danToc, body.tonGiao, body.ngayVaoTruong, body.uuid ];                  
        const value2 = [body.toBoMon, body.maCongViec, body.trinhDoDaoTao, body.loaiHopDong, body.uuid];
        queryList.push(query1, query2);
        valueList.push(value1, value2);
        
        const dataResponse = await db.multiQueryWithTransaction(queryList, valueList);
        return "";
    } catch (error) {
        console.log('edit', error);
    }
    return "OK"
}

module.exports = {
    checkExistEmployeeCode,
    getAll,
    getNameByID,
    gitListTDDT,
    getListContractType,
    filterEmployee,
    getListWorkType,
    checkExistMaCanBo,
    checkToBoMon,
    addAndEdit,
    checkUsername,
    editEmployeService
};