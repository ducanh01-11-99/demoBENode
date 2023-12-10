const bcrypt = require("bcrypt");
const { request } = require("express");
const { response } = require("express");
const validatePasword = (password) => {
    return password.match(
        // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
  };

  const logInUser = async (request, response) => {
    let bodyRequest = request.body;
    const user = await userModel.findOne({ email: bodyRequest.email });
    // check xem có tài khoản nào trùng tên không
    if (user) {
      const validPassword = await bcrypt.compare(bodyRequest.password, user.password);
      if (validPassword) {
        response.status(200).json({ status: "ok" });
      } else {
        response.status(400).json({ error: "Password không đúng!!!" });
      }
    } else {
        response.status(400).json({ error: "Email không đúng!!!" });
    }
}  