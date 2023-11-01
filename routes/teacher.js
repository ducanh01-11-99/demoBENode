const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authen');
const {getAll} = require('../services/teacher.service');
const {checkNewGuid, isValidUUID, genResponseBody, isValidName, validateName, validatePositiveNumber} = require('../helper');

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

module.exports = router;