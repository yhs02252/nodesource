const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

exports.removeRoom = async (roomId) => {
  try {
    // 방제거
    await Room.deleteOne({ _id: roomId });
    // 채팅제거
    await Chat.deleteOne({ room: roomId });
  } catch (error) {
    throw error;
  }
};
