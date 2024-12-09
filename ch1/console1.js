const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

// console.time("레이블지정") : 시작 시간
// console.timeEnd("레이블지정") : 종료 시간
// 레이블 지정 <= 시작과 종료가 같은 레이블이 작성되야함
console.time("전체 시간");
console.log("일반 로그");
console.timeEnd("전체 시간");
