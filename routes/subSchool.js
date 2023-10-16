const express = require('express');
const router = express.Router();
const {checkNewGuid, isValidUUID, genResponseBody} = require('../helper');

const {getAll, getOne} = require('../services/subSchool.service')

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
        const idMainSchool = body.objectGuid;
        const name = body.objectGuid;
        const address = body.objectGuid;
        const distance_to_main_school = body.objectGuid;
        const phone_number = body.objectGuid;

        //validate các trường,
        //1. objectGuid, idMainSchool
        //2. name
        //3. address
        //4. distance_to_main_school
        //5. phone_number

        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(objectGuid)) {
            const body = genResponseBody(0, "Trường objectGuid Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        // // nếu là uuid hợp lệ, 0000 --> là api tạo mới, k thì là api sửa
        // if(checkNewGuid(uuid)) {
        //     res.send({"body":"Create"})
        // } else {
        //     res.send({"body":"Edit"});
        // }
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

module.exports = router;