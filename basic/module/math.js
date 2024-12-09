// 모듈화 : node 에서 사용
// 모듈 작성 : 1. CommonJS 2. ECMAScript(일반 자바스크립트)
let pi = 3.14;

function add(a, b) {
  return a + b;
}

export { pi, add }; // 복수 값 내보내기
