const express = require('express');
const router = express.Router();
const {getListProvinces, getListDistrict, getListWard, getListArea} = require('../services/location.service');
const { genResponseBody } = require('../helper');

router.get('/provinces', async function(req, res, next) {
    try {
        const list = await getListProvinces();
        const data = [];
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });

  router.get('/districts', async function(req, res, next) {
    try {
        let idProvince = req.query.id;
        console.log(idProvince);
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


  router.get('/wards', async function(req, res, next) {
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

  router.get('/area', async function(req, res, next) {
    try {
        const list = await getListArea();
        res.json(genResponseBody(0, list, true));
    } catch (err) {
      console.error(`Error while getting area `, err.message);
      next(err);
    }
  });

  module.exports = router;