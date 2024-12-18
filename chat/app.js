// import 구문들
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const ColorHash = require("color-hash").default;

// env 파일 읽기
dotenv.config();

// 내부모듈 불러오기
const pageRouter = require("./routes/page");
const connect = require("./schemas/connect");

const app = express();

// 소켓 연동
// const webSocket = require("./socket1");
const webSocket = require("./socket");

// 웹 서버 세팅
const port = 8005;
app.set("port", process.env.PORT || port);

// 템플릿 설정
app.set("view engine", "njk");

// nunjucks 세팅
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 데이터베이스 연결
connect();

// 미들웨어 연결
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); // static 파일 경로
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionMiddleWare = session({
  resave: false, // 세션 수정 시 세션 재저장 여부
  saveUninitialized: false, // 세션에 저장할 내용이 없을 때 처음부터 세션 생성할 지 여부
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: false, // 세션쿠키 설정, https or http 환경에서 사용 여부
    secure: false,
  },
  name: "session-cookie",
});

app.use(sessionMiddleWare);

app.use((req, res, next) => {
  if (!req.session.color) {
    // 추출된 색상을 화면단에서 사용해보기 위해
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
    console.log("색상 : ", req.session.color, req.sessionID);
  }
  next();
});

app.use("/", pageRouter);

// 없는 경로 요청 시 404 응답
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
  res.render("common/error");
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
webSocket(server, app, sessionMiddleWare);
