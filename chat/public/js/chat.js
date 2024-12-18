// 입,퇴장 정보 받기
socket.on("join", (data) => {
  console.log("입장 데이터 확인", data);

  const joinMember = document.querySelector(".chat-list");
  let result = `<span class="text-primary d-inline-block">${data.chat}</span>`;
  joinMember.insertAdjacentHTML("beforeend", result);
});

socket.on("exit", (data) => {
  console.log("퇴장 데이터 확인", data);

  const exitMember = document.querySelector(".chat-list");
  let result = `<span class="text-danger d-inline-block">${data.chat}</span>`;
  exitMember.insertAdjacentHTML("beforeend", result);
});
