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
console.log(string, number, boolean);
console.error("에러 메세지는 console.error 사용");

// table : 배열을 테이블로 만들어줌
console.table([
  { name: "제로", birth: 1994 },
  { name: "하나", birth: 1996 },
]);

// dir(객체, 옵션) : colors - 콘솔에 색 추가, depth - 객체를 몇 단계까지 출력할 것인가
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");
for (let index = 0; index < 1000000; index++) {}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}

function a() {
  b();
}

a();

console.timeEnd("전체 시간");
