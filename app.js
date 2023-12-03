const express = require("express");
const app = express();
const cors = require('cors');
const port = 3066;
const indexSubject = require("./routes/subject");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const indexSchool = require("./routes/school");
const indexTeacher = require("./routes/teacher");
const indexCommon = require("./routes/common");
const indexAuth = require("./routes/auth");
const indexSubSchool = require("./routes/subSchool");
const authentic = require("./middleware/authen");
const indexSchoolYear = require("./routes/schoolYear");
const indexDepartment = require("./routes/department");
var i18n = require("i18n");
i18n.configure({
    locales:['en', 'vi'],
    directory: __dirname + '/locales',
   cookie: 'lang',
   });
app.use(i18n.init);

app.use(cors())
 app.listen(80, function () {
  
})

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
app.use("/subSchool", indexSubSchool);
app.use("/auth", indexAuth);
app.use("/schoolYear", indexSchoolYear);
app.use("/teacher", indexTeacher);
app.use("/department", indexDepartment);
app.use("/subject", indexSubject);
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
