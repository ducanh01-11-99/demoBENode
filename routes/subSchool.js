const express = require('express');
const router = express.Router();
const {checkNewGuid, isValidUUID, genResponseBody, isValidName, validateName, validatePositiveNumber} = require('../helper');

const {getAll, getOne, addAndEditSubSchool, checkExistName, checkDuplicate, deleteSubSchool} = require('../services/subSchool.service');

const {verifyToken} = require('../middleware/authen');

// lấy danh sách trường phụ của 1 trường chính
router.get('/getAll', verifyToken, async function(req, res, next) {
    try {
        let uuid = req.query.id;
        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(uuid)) {
            const body = genResponseBody(0, "Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        const data = await getAll(uuid);

        if(data.length !== 0 ) {
            res.json(genResponseBody(0, data, true));
        } else {
            res.json(genResponseBody(0, "Not found", true));
        }        
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

// lấy thông tin 1 trường
router.get('/getOne', verifyToken, async function(req, res, next) {
    try {
        let uuid = req.query.id;
        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(uuid)) {
            const body = genResponseBody(0, "Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        const data = await getOne(uuid);

        if(data.length !== 0 ) {
            res.json(genResponseBody(0, data, true));
        } else {
            res.json(genResponseBody(0, "Not found", true));
        }        
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  // Kiểm tra tên điểm trường đã tồn tại hay chưa
router.get('/checkExistName', verifyToken, async function(req, res, next) {
  try {
      let name = req.query.name;
      let idMainSchool = req.query.idMainSchool;
      // check xem có phải uuid hợp lệ hay không?
      const data = await checkExistName(idMainSchool, name);
      console.log(data);
      const body = {
        check: data
      }

      if(data ) {
          res.json(genResponseBody(0, body, true));
      } else {
          res.json(genResponseBody(1, body, false));
      }        
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});


  // Kiểm tra tên điểm trường đã tồn tại hay chưa
  router.get('/delete', verifyToken, async function(req, res, next) {
    try {
        let id = req.query.id;
        // check xem có phải uuid hợp lệ hay không?
        const data = await checkDuplicate(id);
        if(data) {
          // thực hiện hàm xóa
          const del = await deleteSubSchool(id);
          console.log('del', del);
          if(del.affectedRows > 0) {
            const body = {
              message: "Xóa điểm trường thành công"
            }
            res.json(genResponseBody(0, body, false));
          }
        } else {
          const body = {
            check: "Điểm trường cần xóa không tồn tại trong hệ thống"
          }
          res.json(genResponseBody(1, body, false));
        }      
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.post('/addAndEditSchool', verifyToken, async function(req, res, next) {
    try {
        let body = req.body;
        const objectGuid = body.objectGuid;
        const idMainSchool = body.idMainSchool;
        const name = body.name;
        const address = body.address;
        const distance_to_main_school = body.distance_to_main_school;
        const phone_number = body.phone_number;
        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(objectGuid)) {
            const body = genResponseBody(0, "Trường objectGuid Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        // check xem idMainSchool có phải uuid hợp lệ hay không?
        if(!isValidUUID(idMainSchool)) {
          const body = genResponseBody(0, "Trường idMainSchool Không đúng định dạng uuid", false)
          res.json(body);
          return;
        }

        // check xem tên trường có đúng định dạng không?
        if(validateName(name) !== "") {
          const body = genResponseBody(0, validateName(name), false)
          res.json(body);
          return;
        }

        // check xem địa chỉ có đúng định dạng không?
        // check xem khoảng cách có đúng không ?
        if(validatePositiveNumber(distance_to_main_school) !== "") {
          const body = genResponseBody(0, validatePositiveNumber(distance_to_main_school), false)
          res.json(body);
          return;
        }

        // nếu là uuid hợp lệ, 0000 --> là api tạo mới, k thì là api sửa
        if(checkNewGuid(objectGuid)) {
          const data = await addAndEditSubSchool(req.body, 1);
          if(data.affectedRows > 0) {
            const body = genResponseBody(0, "Thêm mới thành công", false)
            res.json(body);
            return;
          }
          const body = genResponseBody(1, "Có lỗi xảy ra, vui lòng thử lại", true)
          res.json(body);
          return;
        } else {
          const data = await addAndEditSubSchool(req.body, 2);
          if(data.affectedRows > 0) {
            const body = genResponseBody(0, "Sửa thông tin thành công", false)
            res.json(body);
            return;
          }
          const body = genResponseBody(1, "Có lỗi xảy ra, vui lòng thử lại", true)
          res.json(body);
          return;
        }
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

module.exports = router;