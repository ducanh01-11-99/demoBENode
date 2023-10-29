const i18n = require('i18n-node');
const jwt = require('jsonwebtoken');

const myLogger = function (req, res, next) {
    next();
}

//authen, phân quyền, 

const checkLanguageMiddleware = (req, res, next) => {
    // Lấy ngôn ngữ từ header
    const language = req.headers['Accept-Language'];
    i18n.setLocale(language);
    // Tiếp tục middleware
    next();
};

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        var decoded = jwt.verify(token, 'secret');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
      }
    return next();
}



module.exports = {
    myLogger,
    checkLanguageMiddleware,
    verifyToken
}