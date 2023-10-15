const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const indexSchool = require("./routes/school");
const indexCommon = require("./routes/common");
const authentic = require("./middleware/authen");

app.use(authentic.myLogger);
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
);

app.use("/user", userRouter);
app.use("/index", indexRouter);
app.use("/school", indexSchool);
app.use("/common", indexCommon);
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
