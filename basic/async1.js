// 비동기 : 특정 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행

// function getData() {
//   let result;

//   $.get("https://jsonplaceholder.typicode.com/todos/1", (response) => {
//     result = response;
//     // response 를 가져오기전에
//   });
//   return result;
//   // result가 먼저 반환 되어버림 (response 받아오기가 느려서)
// }

// console.log(getData()); // undefined

// 콜백 함수 : 비동기 해결 방식
// function getData(callback) {
//   $.get("https://jsonplaceholder.typicode.com/todos/1", (response) => {
//     callback(response);
//   });
// }

// getData((data) => {
//   console.log(data);
// });

// 콜백함수 문제점 : 콜백지옥
function getData(callback) {
  $.get("https://jsonplaceholder.typicode.com/todos/1", (response) => {
    callback(response);
  });
}

function getData2(callback) {
  $.get("https://jsonplaceholder.typicode.com/todos/", (response) => {
    callback(response);
  });
}

getData((data) => {
  console.log(data);

  getData2((data) => {
    console.log(data);
  });
});

// 콜백지옥 해결
// 1. Promise
// 2. async, await

// console.log("hello");
// setTimeout(() => {
//   console.log("bye");
// }, 3000);
// console.log("hello again");

// 1. Promise
function getPromistData() {
  return new Promise((resolve, reject) => {
    $.get("https://jsonplaceholder.typicode.com/todos/1", (response) => {
      if (response) resolve(response);
      else reject(new Error("에러발생"));
    });
  });
}

getPromistData()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
