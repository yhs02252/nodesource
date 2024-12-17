const express = require("express");
const {
  renderMain,
  enterRoom,
  renderIndex,
  createRoom,
} = require("../controllers/page");

const router = express.Router();

router.get("/", renderMain);
router.get("/index", renderIndex);
router.get("/room/:id", enterRoom);

router.get("/room", renderMain);
router.post("/room", createRoom);

module.exports = router;
