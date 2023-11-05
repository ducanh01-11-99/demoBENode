const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authen');
const { genResponseBody, convertStringToArr } = require('../helper');
const { getList, checkExistDepartmentCode, checkExistDepartmentName, addDepartment, updateDepartment, checkCanDel, deleteDepartment, getOne, easySearch } = require('../services/department.service');

const { checkExistCode } = require('../services/school.service');
const { checkExistEmployeeCode, getAll } = require('../services/teacher.service');

const {checkNewGuid, genGuid} = require('./../helper');

router.get('/getAll', verifyToken, async function(req, res, next) {
    try {
        let idSchool = req.query.idSchool;
        let data = await getList(idSchool);
        res.json(genResponseBody(0, data, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.get('/getOne', verifyToken, async function(req, res, next) {
    try {
        let idDepartment = req.query.idDepartment
        const check = await checkExistDepartmentCode(idDepartment);

        if(!check) {
            res.json(genResponseBody(1, {data:"Mã Tổ bộ môn không hợp lệ"}, false));
            return;
        }
        let data = [];
        // kiểm tra mã bộ môn
        data = await getOne(idDepartment);
        res.json(genResponseBody(0, data, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.get('/easySearch', verifyToken, async function(req, res, next) {
    try {
        let idSchool = req.query.idSchool;
        let text = '%' + req.query.textSearch + '%';
        let data = [];

        // kiểm tra mã trường xem có hợp lệ không
        const check = await checkExistCode(idSchool);        
        if(!check) {
            res.json(genResponseBody(1, {data:"Không có tổ bộ này trong trường"}, false));
            return;
        }
        if(text === "") {
            data = await getAll(text, idSchool);
        } else {
            data = await easySearch(text, idSchool);
        }
        res.json(genResponseBody(0, data, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });


  router.post('/addAndEditDepartment', verifyToken, async function(req, res, next) {
    try {
        const body = req.body;
        console.log(body);

        const dataUpdate = {
            name: body.name,
            description: body.description,
            manager: body.manager,
            idSchool: body.idSchool
        }


        const idSchool = req.body.idSchool;
        const check = await checkExistCode(idSchool);

        if(!check) {
            res.json(genResponseBody(1, {data:"Mã trường không hợp lệ"}, false));
            return;
        }

        // kiểm tra mã giáo viên
        let checkEmployeeId = await checkExistEmployeeCode(body.manager);


        if(!checkEmployeeId) {
            res.json(genResponseBody(1, {data:"Mã cán bộ quản lý không hợp lệ"}, false));
            return;
        }


        // kiểm tra uuid xem có phải là tạo mới không?
        if(checkNewGuid(body.uuid)) {
            let checkExistName = await checkExistDepartmentName(body.name);
            console.log('check', checkExistName);
            if(checkExistName) {
                res.json(genResponseBody(1, {data:"Tên bộ môn đã tồn tại trong hệ thống"}, false));
                return;
            } else {
                dataUpdate.uuid = genGuid();
                const dataResponse = await addDepartment(dataUpdate, 1);
                if(dataResponse.affectedRows > 0) {
                    res.json(genResponseBody(0, {data:"Thêm tổ bộ môn thành công"}, true));
                    return;
                } else {
                    res.json(genResponseBody(1, {data:"Có lỗi xảy ra"}, false));
                    return;
                }
            }
        } else {
            //false -> lệnh cập nhật
            // kiểm tra đã có uuid trong hệ thống
            let checkExistCode = await checkExistDepartmentCode(body.uuid);
            if(!checkExistCode) {
                res.json(genResponseBody(1, {data: "Không tồn tại bộ môn có mã này"}, false));
                return;
            } else {
                dataUpdate.uuid = body.uuid;
                const dataResponse = await addDepartment(dataUpdate, 2);
                if(dataResponse.affectedRows > 0) {
                    res.json(genResponseBody(0, {data:"Sửa tổ bộ môn thành công"}, true));
                    return;
                } else {
                    res.json(genResponseBody(1, {data:"Có lỗi xảy ra"}, false));
                    return;
                }
            }
        }
    } catch (err) {
      console.error(`Error while getting department `, err.message);
      next(err);
    }
  });

  router.get('/delete', verifyToken, async function(req, res, next) {
    try {
        let idDepartment = req.query.id;
        // check xem có id này k
        let checkExistID = await checkExistDepartmentCode(idDepartment);
        if(!checkExistID) {
            res.json(genResponseBody(1, {data: "Không tồn tại bộ môn có mã này"}, false));
            return;
        }
        let check = await checkCanDel(idDepartment);
        if(check) {
            // có thể xóa
            let checkDel = await deleteDepartment(idDepartment);
            if(checkDel) {
                res.json(genResponseBody(0, {data: "Đã xóa thành công tổ bộ môn"}, true));
                return;
            }
            res.json(genResponseBody(0, {data: "Có lỗi xảy ra"}, true));

        } else {
            res.json(genResponseBody(1, {data: "Bạn không thể xóa tổ bộ môn này"}, true));
            return;
        }

        // Kiểm tra xem có được xóa k? 
        let data = await getList(idSchool);
       
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

module.exports = router;