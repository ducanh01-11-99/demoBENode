const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authen');
const {getAll, gitListTDDT, getListWorkType, getListContractType, filterEmployee} = require('../services/teacher.service');
const {checkExistInTable} = require('../services/common.service');
const {isValidUUID, genResponseBody} = require('../helper');
const jwt = require('jsonwebtoken');
const {addEmployee, editEmployee} = require('../controller/teacherController');

router.get('/getAll', verifyToken, async function(req, res, next) {
    try {
        let idSchool = req.query.idSchool;
        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(idSchool)) {
            const body = genResponseBody(0, "Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        const dataResponse = await getAll(idSchool);

        if(dataResponse.length !== 0 ) {
            res.json(genResponseBody(0, {"data": dataResponse}, true));
        } else {
            res.json(genResponseBody(0, "Not found", true));
        }        
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });


router.get('/getDegreeTraining', verifyToken, async function(req, res, next) {
    try {
        const dataResponse = await gitListTDDT();
        res.json(genResponseBody(0, {"data": dataResponse}, true));
        
    } catch (error) {
        console.error(`Error `, error.message);
        next(error);
    }

})

router.get('/contract-type', verifyToken, async function(req, res, next) {
    try {
        const dataResponse = await getListContractType();
        res.json(genResponseBody(0, {"data": dataResponse}, true));
        
    } catch (error) {
        console.error(`Error `, error.message);
        next(error);
    }

})

router.get('/work-type', verifyToken, async function(req, res, next) {
    try {
        const dataResponse = await getListWorkType();
        res.json(genResponseBody(0, {"data": dataResponse}, true));
        
    } catch (error) {
        console.error(`Error `, error.message);
        next(error);
    }

})

router.post('/filter', verifyToken, async function(req, res, next) {
    try {
        // const token = req.headers["authorization"]
        // var decoded = readToken(token);
        const idDepartment = req.body.idDepartment;
        const gender = req.body.gender;
        const idWork = req.body.work;
        const status = req.body.status;
        const contractType = req.body.contractType;
        const entryLevel = req.body.entryLevel;
        // validate các trường truyền vào
        // Bằng nháy là tìm tất cả
        if(idDepartment !== '') {
            // kiểm tra xem có là 1 uuid hợp lệ không?
            if(isValidUUID(idDepartment)) {
                const checkMessage = await checkExistInTable(idDepartment, "to_bo_mon", "to_bo_mon_id", "Tổ bộ môn");
                if(checkMessage.length > 0) {
                    res.json(genResponseBody(1, {"data": checkMessage}, true));
                    return;
                }
            }
            else {
                res.json(genResponseBody(1, {"data": "Mã tổ bộ môn không hợp lệ"}, true));
            }
        }
        
        // Check giới tính
        if(!(gender === 0 || gender === 1 || gender === -1)) {
            // giới tính truyền vào không hợp lệ
            res.json(genResponseBody(1, {"data": "Giới tính không hợp lệ"}, true));
            return;
        }

        // Check trạng thái
        if(!(status === 0 || status === 1 || status ===-1)) {
            // trạng thái truyền vào không hợp lệ
            res.json(genResponseBody(1, {"data": "Trangj thai không hợp lệ"}, true));
            return;
        }

        // Check loại công việc
        if(idWork !== '') {
            // kiểm tra xem có là 1 uuid hợp lệ không?
            if(isValidUUID(idDepartment)) {
                const checkMessage = await checkExistInTable(idWork, "employee_work", "employee_work_id", "Vị trí công tác");
                if(checkMessage.length > 0) {
                    res.json(genResponseBody(1, {"data": checkMessage}, true));
                    return;
                }
            }
            else {
                res.json(genResponseBody(1, {"data": "Vị trí công tác không hợp lệ"}, true));
            }
        }

        // check loại hợp đồng
        if(contractType !== '') {
            // kiểm tra xem có là 1 uuid hợp lệ không?
            if(isValidUUID(contractType)) {
                const checkMessage = await checkExistInTable(contractType, "loai_hop_dong", "hop_dong_uuid", "Loại hợp đồng");
                if(checkMessage.length > 0) {
                    res.json(genResponseBody(1, {"data": checkMessage}, true));
                    return;
                }
            }
            else {
                res.json(genResponseBody(1, {"data": "Loại hợp đồng không hợp lệ"}, true));
            }
        }

        // check trình độ đào tạo
        if(entryLevel !== '') {
            // kiểm tra xem có là 1 uuid hợp lệ không?
            if(isValidUUID(entryLevel)) {
                const checkMessage = await checkExistInTable(entryLevel, "trinh_do_dao_tao", "trinh_do_uuid", "Trình đồ đào tạo");
                if(checkMessage.length > 0) {
                    res.json(genResponseBody(1, {"data": checkMessage}, true));
                    return;
                }
            }
            else {
                res.json(genResponseBody(1, {"data": "Trình đồ đào tạo không hợp lệ"}, true));
            }
        }


        // check text

        // check mã

        // check ngày sinh (tạm bỏ)

        const dataResponse = await filterEmployee(req.body);
        res.json(genResponseBody(0, {"data": dataResponse}, true));
        
    } catch (error) {
        console.error(`Error `, error.message);
        next(error);
    }

});

router.post('/addAndEdit', verifyToken, async function(req, res, next) {
    const result =  await addEmployee(req);
    console.log("result", result);
    if(result === '') {
        res.json(genResponseBody(0, {"data": result}, true));
    } else {
        res.json(genResponseBody(1, {"data": result}, false));
    }
})

router.put('/edit-employee', verifyToken, async function(req, res, next) {
    const result =  await editEmployee(req.body);
    console.log("result", result);
    if(result === '') {
        res.json(genResponseBody(0, {"data": result}, true));
    } else {
        res.json(genResponseBody(1, {"data": result}, false));
    }
})


module.exports = router;