const i18n = require('i18n-node');

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next();
}

const checkLanguageMiddleware = (req, res, next) => {
    // Lấy ngôn ngữ từ header
    const language = req.headers['Accept-Language'];
    i18n.setLocale(language);

    console.log(language)

    // Tiếp tục middleware
    next();
};

module.exports = {
    myLogger,
    checkLanguageMiddleware
}