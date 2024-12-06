const fruits = ["사과", "망고", "바나나", "수박", "자두", "포도"];
// console.log(fruits);

// const some = document
//   .querySelector(".something")
//   .addEventListener("click", () => {
//     console.log("출력");
//   });

// 구조 분해(Destructuring)
let candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status;
  },
};

// var getCandy = candyMachine.getCandy;
// var count = candyMachine.status.count;

const {
  getCandy,
  status: { count },
} = candyMachine;

console.log(getCandy);
console.log(count);

// var arr1 = fruits[0];
// var arr3 = fruits[3];
// var arr4 = fruits[4];
// console.log(arr1, arr3, arr4);

const array = ["node.js", {}, 10, true];

const [node, obj, , bool] = array;
console.log(node, obj, bool);

console.log("======fruits test=======");

const fruitArr = [
  fruits[0],
  fruits[1],
  fruits[2],
  fruits[3],
  fruits[4],
  fruits[5],
];

const [f1, f2, f3, f4, f5, f6] = fruitArr;

console.log(f1, f2, f3, f1, f6, f4, f5);

console.log("===========Spread Operator===========");

console.log("======배열식=======");
// spread operator : ... (복제)
var array1 = ["num1", "num2"];
var array2 = ["num3", "num4"];

// 주소 복사(원본(array1)에 변화가 일어나면 복제본(sumArr 내부 array1)도 변화 ==> sumArr 이 array1와 array2 값을 보여줄 뿐)
// var sumArr = [array1, array2];
// console.log(sumArr); // <- 2차원 배열 출력 [ [ 'num1', 'num2' ], [ 'num3', 'num4' ] ]
// console.log("======push 추가=======");
// array1.push("new1");
// console.log("array1", array1);
// console.log(sumArr); // [ [ 'num1', 'num2', 'new1' ], [ 'num3', 'num4' ] ]

// 값만 복사(원본(array1)의 변화와 무관함 ==> sumArr2 자체 값이 정해짐)
var sumArr2 = [...array1, ...array2];
console.log(sumArr2); // [ 'num1', 'num2', 'num3', 'num4' ]
array1.push("new1");
console.log(sumArr2);

console.log("======객체식=======");

// sumObj 가 obj1과 obj2 를 그대로 보여줌
let obj1 = { key1: "value1", key2: "value2" };
let obj2 = { key2: "value3", key4: "value4" };
let sumObj = { obj1, obj2 };
console.log("{} ", sumObj); // {}  {
//                                 obj1: { key1: 'value1', key2: 'value2' },
//                                 obj2: { key2: 'value3', key4: 'value4' }
//                              }

// sumObj2 가 obj1과 obj2 의 절대값을 보여줌 (key1 key2 key3 의 최종 값을 출력)
let sumObj2 = { ...obj1, ...obj2 };
console.log("{} ", sumObj2); // {}  { key1: 'value1', key2: 'value3', key4: 'value4' }

let student = {
  name: "홍길동",
  kor: 92,
  math: 98,
  eng: 96,
  sci: 88,
};

let teacher = { tname: "설리번", age: 50 };
let sumObj3 = { ...student, ...teacher }; // 값 합치기
console.log("student 배열 : ", sumObj3);

let { eng, math, ...others } = sumObj3;
console.log("영어 : ", eng);
console.log("수학 : ", math);
console.log("다른것들 : ", others);
