const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

exports.renderIndex = async (req, res, next) => {
  try {
    console.log(res);
    res.render("index");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.renderMain = async (req, res, next) => {
  try {
    res.render("main");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.enterRoom = async (req, res, next) => {
  try {
    res.render("chat");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      password: req.body.password,
      owner: req.session.color,
    });

    // 새로 생성된 방 정보를 접속된 모든 클라이언트에게 알리기
    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removeRoom = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.sendChat = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.sendImg = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
