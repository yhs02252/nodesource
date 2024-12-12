// 등록을 누르면(submit)

const { default: axios } = require("axios");

// Form 안에 작성한 내용 가져오기
document.querySelector("#userForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // form 안쪽 값 가져오기
  const form = e.target;
  const name = form.name.value;
  const age = form.age.value;
  const married = form.married.value;

  // http://localhost:3000/users + GET : 전체 사용자 조회
  // http://localhost:3000/users + POST : 사용자 입력

  axios.get().then().catch();
});
