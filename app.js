const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const authentic = require("./middleware/authen")

// let i18n= require("i18n-express");


app.use(authentic.myLogger);
// app.use(i18n({
//     "locales": ["en", "fr", "es"],
// }));
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
);
// app.get("/", (req, res) => {
//   // res.json({ message: "translation.Hi" });
//     const greeting = req.t('Xin chào');
//
//     // Trả về bản dịch
//     res.send(greeting);
// });
app.use("/user", userRouter);
app.use("/index", indexRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
