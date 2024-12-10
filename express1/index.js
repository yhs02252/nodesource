const express = require("express");
const path = require("path");
const app = express();

// .use 미들웨어 : 따로 경로를 써주지 않는다면 모든요청에서 미들웨어 실행
app.use((req, res, next) => {
  console.log("모든요청에 응답함");
  next(); // 다음 미들웨어 실행을 위해서 반드시 필요
});

app.get(
  "/",
  (req, res, next) => {
    // 화면에 텍스트 출력
    // res.send("Hello World");

    // res.sendFile(path.join(__dirname, "/index.html"));

    console.log("/ 의 GET 요청에 응답");
    next();
  },
  // 에러 발생시 이동할 에러 처리 경로로 이동
  (req, res) => {
    throw new Error("에러 발생 시 에러 처리 미들웨어로 이동");
  }
);

app.get("/dog", function (req, res) {
  res.send("<h1>강아지</h1>");
});

app.get("/cat", function (req, res) {
  res.send("<h1>고양이</h1>");
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3000); // port 경로
