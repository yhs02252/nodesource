const path = require("path");

// 설치 모듈 : npm i 필요
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

// 템플릿
const nunjucks = require("nunjucks");

// 라우터 파일 가져오기
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const aboutRouter = require("./routes/about");

// .env 파일 환경 가져오기
dotenv.config(); // env 에 저장한 값을 불러오려면 => process.env

const app = express();
const port = 3000;
app.set("port", process.env.PORT || port); // 기본 포트번호가 없다면 env에 지정한 포트번호 쓰기

// view engine 설정
app.set("view engine", "njk"); // or html
nunjucks.configure("views", {
  express: app,
  watch: true, // 소스가 변경되면 자동으로 템플릿 재 랜더링
});

// 미들웨어

// morgan 로깅
app.use(morgan("dev")); // GET / 500 11.048 ms - 54 ==> :method(GET) :url(/) :status(500) :response-time ms(11.048 ms) - :res[content-length](54)

// 정적파일 경로 지정
app.use("/", express.static(path.join(__dirname, "public"))); // static 파일 경로 지정

// 클라이언트가 보낸 데이터가 json 인 경우
app.use(express.json()); // json으로 변환

// 클라이언트가 보낸 테이터가 form 형태인 경우
app.use(express.urlencoded({ extended: false })); // url 인코딩 여부

// 쿠키 정보 다루기
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 관리
app.use(
  session({
    resave: false, // 세션 수정 시 세션 재저장 여부
    saveUninitialized: false, // 세션에 저장할 내용이 없을 때 처음부터 세션 생성할 지 여부
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: false, // 세션쿠키 설정, https or http 환경에서 사용 여부
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든요청에 응답함");
  next(); // 다음 미들웨어 실행을 위해서 반드시 필요
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);

// 없는 경로 요청 시 응답
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(500 || err.status);
  res.render("error");
});

// app.get(
//   "/",
//   (req, res, next) => {
//     // 화면에 텍스트 출력
//     // res.send("Hello World");

//     // res.sendFile(path.join(__dirname, "/index.html"));

//     console.log("/ 의 GET 요청에 응답");
//     next();
//   },
//   // 에러 발생시 이동할 에러 처리 경로로 이동
//   (req, res) => {
//     throw new Error("에러 발생 시 에러 처리 미들웨어로 이동");
//   }
// );

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
