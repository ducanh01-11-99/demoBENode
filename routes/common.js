const express = require('express');
const router = express.Router();
const {getListProvinces, getListDistrict, getListWard, getListArea, getYearKey, getTypeSchool} = require('../services/location.service');
const { genResponseBody } = require('../helper');
const {verifyToken} = require('../middleware/authen');

const {getListNation} = require('../services/common.service');

router.get('/provinces', verifyToken, async function(req, res, next) {
    try {
        const list = await getListProvinces();
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.get('/districts',verifyToken, async function(req, res, next) {
    try {
        let idProvince = req.query.id;
        const list = await getListDistrict(idProvince);
        if(list.length == 0) {
            res.json(genResponseBody(1, "Id tỉnh/thành phố không hợp lệ", false));
            return
        }
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });


  router.get('/wards',verifyToken, async function(req, res, next) {
    try {
        let idDistrict = req.query.id;
        const list = await getListWard(idDistrict);
        if(list.length == 0) {
            res.json(genResponseBody(1, "Id quận/huyện không hợp lệ", false));
            return
        }
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.get('/area', verifyToken, async function(req, res, next) {
    try {
        const list = await getListArea();
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  });

  router.get('/yearkey', verifyToken, async (req, res, next) => {
    try {
      const list = await getYearKey();
      res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting yearkey `, err.message);
      next(err);
    }
  })

  // Láy danh sách Loại trường
  router.get('/typeschool', verifyToken, async (req, res, next) => {
    try {
      const list = await getTypeSchool();
      res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  });

   router.get('/typeschool', verifyToken, async (req, res, next) => {
    try {
      const list = await getTypeSchool();
      res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  })

     // Láy danh sách Loại trường
     router.get('/dan-toc', verifyToken, async (req, res, next) => {
      try {
        console.log(1);
        const list = await getListNation();
        res.json(genResponseBody(0, list, true));
      } catch (err) {
        console.error(`Error while getting list nation `, err.message);
        next(err);
      }
    })

  module.exports = router;