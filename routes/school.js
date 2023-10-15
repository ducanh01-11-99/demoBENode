const express = require('express');
const router = express.Router();
const {checkNewGuid, isValidUUID, genResponseBody} = require('../helper');
const { getOne } = require('../services/school.service')


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

  router.get('/addAndEditSchool', async function(req, res, next) {
    try {
        let uuid = req.query.id;
        console.log(uuid);

        // check xem có phải uuid hợp lệ hay không?
        if(!isValidUUID(uuid)) {
            const body = genResponseBody(0, "Không đúng định dạng uuid", false)
            res.json(body);
            return;
        }

        // nếu là uuid hợp lệ, 0000 --> là api tạo mới, k thì là api sửa
        if(checkNewGuid(uuid)) {
            res.send({"body":"Create"})
        } else {
            res.send({"body":"Edit"});
        }
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  module.exports = router;