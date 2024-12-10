// 외부 묘듈 import
// import {} from "module";
const path = require("path");

const string = __filename;
console.log("__filename ", string);
console.log("__dirname ", __dirname);

// 폴더 구분
// 윈도우즈 : \
// mac, 리눅스 : /

console.log("path.sep", path.sep); // 경로 구분기준
console.log("path.delimiter : ", path.delimiter); //
console.log("-----------------------------------------");
console.log("path.dirname : ", path.dirname(string)); // diretory 경로 이름
console.log("path.extname : ", path.extname(string)); // 확장자
console.log("path.basename : ", path.basename(string)); // 기본 파일 이름
console.log(
  "path.basename - path.extname : ",
  path.basename(string, path.extname(string)) // 파일이름 확장자 제거
);
console.log("-----------------------------------------");
console.log("path.parse() : ", path.parse(string));

// relative(경로1, 경로2) : 경로1 에서 경로 2로 가는 방법
console.log(
  "path.relative() : ",
  path.relative("C:\\source\\nodesource\\ch1", "c:\\")
);

// join() : 경로를 직접 입력한 순서대로 만들어줌
console.log(
  "path.join() : ",
  path.join(__dirname, "..", "..", "/users", ".", "/test")
);

// resolve() : C:\source\nodesource\ch1,경로.....=> c:\\test 상위경로 무시하고 최하위 dir 보여주기
console.log(
  "path.resolve() : ",
  path.resolve(__dirname, "..", "/users", ".", "/test")
);
