// 등록을 누르면(submit)

// const { default: axios } = require("axios"); // js 에 포함된 axios만

// 전체 유저 조회 함수
const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    console.log(response.data);

    const users = response.data;

    let result = "";
    users.forEach((user) => {
      result += `<tr>`;
      result += `<th scope="row">${user._id}</th>`;
      result += `<td>${user.name}</td>`;
      result += `<td>${user.age}</td>`;
      result += `<td>${user.married ? "기혼" : "미혼"}</td>`;
      result += `</tr>`;
    });
    document.querySelector("#userList").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// Form 안에 작성한 내용 가져오기
document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // form 안쪽 값 가져오기
  const form = e.target;
  const name = form.name.value;
  const age = form.age.value;
  const married = form.married.checked;

  // http://localhost:3000/users + GET : 전체 사용자 조회
  // http://localhost:3000/users + POST : 사용자 입력

  if (!name) {
    alert("이름을 확인해 주세요");
    return;
  }
  if (!age) {
    // alert("나이를 확인해 주세요");
    // return;
    return alert("나이를 확인해 주세요");
  }

  try {
    // 라우터 경로
    // async await이 없을 시 => axios.get().then().catch();
    await axios.post("/users", { name, age, married });

    // 다시한번 전체 유저 조회
    getUsers();
  } catch (error) {
    console.log(error);
  }

  // 폼 화면 clear
  form.name.value = "";
  form.age.value = "";
  form.married.checked = false;
});

// 특정 작성자의 전체 comments 가져오는 함수
const getComments = async (id) => {
  try {
    const response = await axios.get(`/users/${id}/comments`);
    console.log(response.data);

    const comments = response.data;

    let result = "";
    comments.forEach((comment) => {
      result += `<tr data-commid=${comment._id} data-pid=${id}>`;
      result += `<th scope="row">${comment._id}</th>`;
      result += `<td>${comment.commenter.name}</td>`;
      result += `<td>${comment.comment}</td>`;
      result += `<td>${comment.createdAt}</td>`;
      result += `<td><button type="button" class="btn btn-success">수정</button></td>`;
      result += `<td><button type="button" class="btn btn-danger">삭제</button></td>`;
      result += `</tr>`;
    });
    document.querySelector("#commentList tbody").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// 댓글등록을 누르면(submit)
// submit 기능 중지,아이디,내용 들어왔는지 확인

document.querySelector("#replyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // form 안쪽 값 가져오기
  const form = e.target;
  const userid = form.userid.value;
  const comment = form.comment.value;

  if (!userid) {
    alert("아이디를 확인해 주세요");
    return;
  }
  if (!comment) {
    // alert("나이를 확인해 주세요");
    // return;
    return alert("코멘트를 확인해 주세요");
  }

  try {
    // 라우터 경로
    await axios.post("/comments", { userid, comment });

    // 현재 댓글 작성자의 전체 comments 가져오는 함수 호출
    getComments(userid);
  } catch (error) {
    console.log(error);
  }

  // 폼 화면 clear
  form.userid.value = "";
  form.comment.value = "";
});

// 이름 클릭 시 해당 이름이 작성한 전체 댓글 가져오기
document.querySelector("#userList").addEventListener("click", (e) => {
  e.preventDefault();

  // id 가져오기
  const id = e.target.getAttribute("href");
  getComments(id);
});

// 댓글 수정 삭제
document.querySelector("#commentList").addEventListener("click", async (e) => {
  // 이벤트 대상 가져오기
  const eTarget = e.target;

  // comment id 가져오기
  const commId = eTarget.closest("tr").dataset.commid;

  // user_id 가져오기
  const userId = eTarget.closest("tr").dataset.pid;

  // 수정, 삭제에서 왔는지 구분하기
  if (eTarget.textContent === "수정") {
    // 수정할 comment를 입력받을 수 있는 prompt 보여주기
    const newComment = prompt("변경할 comment를 입력해 주세요");
    if (!newComment) {
      return alert("변경할 comment를 반드시 입력해야 합니다.");
    }
    try {
      await axios.put(`/comments/${commId}`, { comment: newComment });
      getComments(userId);
    } catch (error) {}
  } else {
    // 삭제 시 comment id 필요
    try {
      await axios.delete(`/comments/${commId}`);
      getComments(userId);
    } catch (error) {
      console.log(error);
    }
  }
});
