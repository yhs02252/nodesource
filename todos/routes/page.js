// 경로만 지정
const express = require("express");
const {
  list,
  read,
  update,
  remove,
  create,
  modify,
  createGet,
  completedList,
} = require("../controllers/page");

const router = express.Router();

router.get("/", list);
router.get("/todos", list);
router.get("/todos/completed/list", completedList);

router.route("/todos/create").get(createGet).post(create);

router.get("/todos/:id", read);

// 원래 방식
// router.get("/todos/modify/:id", update);
// router.post("/todos/modify/:id", update);

// => 새 방식
router.route("/todos/modify/:id").get(read).post(update);

router.get("/todos/remove/:id", remove);

module.exports = router;
