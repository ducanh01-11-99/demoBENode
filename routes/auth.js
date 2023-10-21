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
    console.log(1);
    const reqBody = req.body;
    console.log(reqBody);
    const password = reqBody.password;
    try {
        const list = await getInfoAccount(reqBody.username)
        if(list.length !== 1) {
            console.log(1);
            const body = genResponseBody(1, {data: "Thông tin tài khoản hoặc mật khẩu không chính xác"}, false);
            res.json(body);
            return;
        }

        const infoUser = list[0];

        const isMatch = await bcrypt.compare(password, infoUser.Password);
        if(!isMatch) {
            console.log(2);
            const body = genResponseBody(1, {data: "Thông tin tài khoản hoặc mật khẩu không chính xác"}, false);
            res.json(body);
            return;
        }

        console.log(infoUser);

        const token = genToken(reqBody.username, infoUser.roleName, 1);
        const body = genResponseBody(0, {"token": token}, true);
        res.json(body);
    }
    catch (err) {
        const body = genResponseBody(1, {data: "Đã có lỗi xảy ra, vui lòng thử lại sau"}, false);
        res.json(body);
        return;
    }
})

module.exports = router;