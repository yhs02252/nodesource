// 함수
// function name(params) {}

// 일급 함수 : 함수(function)를 변수처럼 다루어지는 방법

const foo = () => {
  console.log("foobar");
};

foo();

function logText(message) {
  //   console.log(message);
  message();
}

// logText("Hello");

logText(() => {
  console.log("hello");
});
