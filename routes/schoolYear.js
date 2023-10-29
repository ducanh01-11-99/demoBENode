const express = require('express');
const router = express.Router();
const {addAndEditYearSchool, deleteSchoolYear, checkExistYear} = require('../services/schoolYear.service');
const { genResponseBody } = require('../helper');
const {verifyToken} = require('../middleware/authen');
  //add and edit
  router.post('/addNew', verifyToken, async function(req, res, next) {
    try {
        let body = req.body;
        // kiểm tra xem đã tồn tại năm học này hay chưa
        const existName = await checkExistYear(body.yearSchool);
        // thực hiện thêm năm học
        if(body.type === 1) {
            if(existName) {
                const data = await addAndEditYearSchool(req.body);
                if(data.affectedRows > 0) {
                    res.json(genResponseBody(0, "Thêm năm học thành công", true));
                }
                else {
                    res.json(genResponseBody(1, "Có lỗi xảy ra", false));
                }
            } else {
                res.json(genResponseBody(1, "Đã tồn tại năm học trong hệ thống", false));
            }
        }

        if(body.type === 2) {
            if(!existName) {
                const data = await addAndEditYearSchool(req.body);
                if(data.affectedRows > 0) {
                    res.json(genResponseBody(0, "Sửa năm học thành công" , true));
                }
                else {
                    res.json(genResponseBody(1, "Có lỗi xảy ra", false));
                }
            } else {
                res.json(genResponseBody(1, "Không tồn tại năm học trong hệ thống", false));
            }
        }
        
    } catch (err) {
        console.error(`Error while getting school year `, err.message);
        next(err);
      }
  });


  router.get('/delete', verifyToken, async function(req, res, next) {
    try {
        let id = req.query.id;
        const canDel = await checkExistYear(id);
        if(!canDel) {
            const data = await deleteSchoolYear(id);
            if(data.affectedRows > 0) {
                res.json(genResponseBody(0, "Xóa năm học thành công", true));
            }
            else {
                res.json(genResponseBody(1, "Có lỗi xảy ra", false));
            }
        } else {
            res.json(genResponseBody(1, "Không tồn tại năm học cần xóa", false));
        }

    } catch (err) {
        console.error(`Error while getting school year `, err.message);
        next(err);
      }
  });

  module.exports = router;