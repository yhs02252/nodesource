// Socket.IO 이용
// socket.io 모듈 불러오기
const SocketIo = require("socket.io");

module.exports = (server, app, sessionMiddleWare) => {
  // 익스프레스 서버와 소켓io 연동
  const io = SocketIo(server, { path: "/socket.io" });

  app.set("io", io);

  // 네임스페이스 부여: 같은 네임스페이스끼리만 가능하게 만듬
  const room = io.of("/room");
  const chat = io.of("/chat");

  // 이벤트 리스너 추가
  // 각 네임 스페이스 별로 추가해줌
  room.on("connection", (socket) => {
    console.log("room 네임 스페이스 접속");
    socket.on("disconnect", () => {
      console.log("room 네임 스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    // 소켓을 통해 클라이언트 요청 객체 접근
    // const req = socket.request; - 지금은 필요없음
    console.log("chat 네임 스페이스 접속");

    // 클라이언트 ip 알아내기
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log("새로운 클라이언트 접속", ip, socket.id, req.ip); - 지금은 필요 없음

    // 클라이언트로부터 메세지가 도착하면 동작
    socket.on("join", (message) => {
      socket.join(message);
      // console.log(message.toString());
    });

    // 에러 발생 시 동작
    // socket.on("error", (error) => {
    //   console.log(error);
    // });

    // 클라이언트와 연결이 종료된경우
    socket.on("disconnect", () => {
      console.log("chat 네임 스페이스접속 해제");
      // clearInterval(socket.interval);
    });

    // 3초마다 모든 클라이언트 애개 메세지 전송
    // socket.interval = setInterval(() => {
    //   // 모든 클라이언트에게 메세지 전송
    //   // "new" : 키값
    //   //  "Hello Socket.io": 원하는 메세지
    //   socket.emit("news", "Hello Socket.io");
    // }, 3000);
  });
};
