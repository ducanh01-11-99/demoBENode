const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authen');
const { genResponseBody } = require('../helper');
const { getList } = require('../services/subject.service')

// Lấy danh sách theo khối, theo năm học
  router.get('/getListSubject', verifyToken, async (req, res, next) => {
    try {
        const yearkey = req.query.yearkey;
        const block = req.query.block;
        const list = await getList(yearkey, block);
    //   const list = await getTypeSchool();
      res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  })

  // cập nhật lại danh sách
  router.post('/updateListSubject', verifyToken, async (req, res, next) => {
    try {
        const yearkey = req.query.yearkey;
        const block = req.query.block;
        const data = req.body.data;
        // const list = await getList(yearkey, block);
    //   const list = await getTypeSchool();
      res.json(genResponseBody(0, yearkey, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  })
module.exports = router;
