const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { genToken } = require('../services/auth.service');
const { genResponseBody } = require('../helper');
const { getInfoAccount } = require('../services/user.services');

const validatePasword = (password) => {
    return password.match(
        // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
  };

router.post('/login', async (req, res, next ) => {
    const reqBody = req.body;
    const password = reqBody.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const list = await getInfoAccount(reqBody.username)
        if(list.length !== 1) {
            const body = genResponseBody(1, {data: "Thông tin tài khoản hoặc mật khẩu không chính xác"}, false);
            res.json(body);
            return;
        }

        const infoUser = list[0];

        const isMatch = await bcrypt.compare(password, infoUser.mat_khau);
        if(!isMatch) {
            const body = genResponseBody(1, {data: "Thông tin tài khoản hoặc mật khẩu không chính xác"}, false);
            res.json(body);
            return;
        }

        const token = genToken(reqBody.username, infoUser.role_name, 1);
        const  bodyData = {
            account: infoUser.ten_dang_nhap,
            fullName: infoUser.ten_nhan_vien,
            id: infoUser.id,
            token: token
        }
        const body = genResponseBody(0, bodyData, true);
        res.json(body);
    }
    catch (err) {
        const body = genResponseBody(1, {data: "Đã có lỗi xảy ra, vui lòng thử lại sau"}, false);
        res.json(body);
        return;
    }
})

module.exports = router;