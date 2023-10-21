const jwt = require('jsonwebtoken');

const genToken = (name, role, sub) => {
    const token = jwt.sign({
      name: name,
      role: role,
      sub: sub,
      exp: new Date().getTime() + 90000000, // 1500 phút
    },'secret');

    console.log(readToken(token));
    return token;
  }

const readToken = (token) => {
    var decoded = jwt.verify(token, 'secret');
    return decoded;
}  

module.exports = {
    genToken
}