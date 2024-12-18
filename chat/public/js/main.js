// 입장버튼 클릭시
// data-id, data-password
// password 가 있다면 prompt(비밀번호를 입력하세요)

// `/room/${newRoom._id}?password=${req.body.password}`
document.querySelector(".table tbody").addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const password = e.target.dataset.password;

  if (password == "true") {
    const pwd = prompt("비밀번호를 입력하세요");
    location.href = `/room/${id}?password=${pwd}`;
  } else {
    // password가 없다면 `/room/${id}`
    location.href = `/room/${id}`;
  }
});

// 소켓을 통해서 넘어오는 새 방 정보를 출력
// - 브로드캐스팅
socket.on("newRoom", (data) => {
  console.log("data 확인 : ", data);

  let room = `<tr data-id="${data._id}">`;
  room += `<th scope="row">${data._id}</th>`;
  room += `<td>${data.title}</td>`;
  room += `<td>${data.password ? "비밀방" : "공개방"}</td>`;
  room += `<td>${data.max}</td>`;
  room += `<td style="color:${data.owner}">${data.owner}</td>`;
  room += `<td><button class="btn btn-sm btn-outline-success">입장</button></td>`;
  room += `</tr>`;

  document.querySelector("table tbody").insertAdjacentHTML("beforeend", room);
});

socket.on("removeRoom", (roomId) => {
  document.querySelectorAll("tbody tr").forEach((tr) => {
    if (tr.dataset.id == roomId) {
      tr.remove();
    }
  });
});
