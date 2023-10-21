const express = require('express');
const router = express.Router();
const {checkNewGuid, isValidUUID, genResponseBody, isValidName, validateName, validatePositiveNumber} = require('../helper');

const {getAll, getOne, addAndEditSubSchool} = require('../services/subSchool.service')

// lấy danh sách trường phụ của 1 trường chính
router.get('/getAll', async function(req, res, next) {
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
router.get('/getOne', async function(req, res, next) {
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

  router.post('/addAndEditSchool', async function(req, res, next) {
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
          console.log(distance_to_main_school);
          const body = genResponseBody(0, validatePositiveNumber(distance_to_main_school), false)
          res.json(body);
          return;
        }

        // nếu là uuid hợp lệ, 0000 --> là api tạo mới, k thì là api sửa
        if(checkNewGuid(objectGuid)) {
          const data = addAndEditSubSchool(req.body, 1)
          if(data > 0) {
            const body = genResponseBody(0, "Thêm mới thành công", false)
            res.json(body);
            return;
          }
          const body = genResponseBody(1, "Có lỗi xảy ra, vui lòng thử lại", true)
          res.json(body);
          return;
        } else {
          const data = addAndEditSubSchool(req.body, 2)
          if(data > 0) {
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