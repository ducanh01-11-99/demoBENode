const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authen');
const { genResponseBody, convertStringToArr } = require('../helper');
const { getList, checkExistDepartmentCode, checkExistDepartmentName, addDepartment, updateDepartment } = require('../services/department.service');

const { checkExistCode } = require('../services/school.service');
const { checkExistEmployeeCode } = require('../services/teacher.service');

const {checkNewGuid, genGuid} = require('./../helper')

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


  router.post('/addAndEditDepartment', verifyToken, async function(req, res, next) {
    try {
        const body = req.body;
        console.log(body);

        const dataUpdate = {
            name: body.name,
            description: body.description,
            manager: convertStringToArr(body.manager.toString()),
            idSchool: body.idSchool
        }


        const idSchool = req.body.idSchool;
        const check = await checkExistCode(idSchool);

        if(!check) {
            res.json(genResponseBody(1, {data:"Mã trường không hợp lệ"}, false));
            return;
        }

        // kiểm tra mã giáo viên
        const managerList = convertStringToArr(body.manager.toString());
        let checkEmployeeId = true;
        managerList.map(async item=>{
            const checkElement = await checkExistEmployeeCode(item);
            checkEmployeeId = checkEmployeeId && checkElement;
        });

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
                console.log(dataResponse);
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
            // let checkExistCode = await checkExistDepartmentCode(body.uuid);
            let checkExistCode = true;
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

module.exports = router;