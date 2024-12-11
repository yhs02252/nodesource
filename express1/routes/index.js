const express = require("express");

// 라우터
const router = express.Router();

// router.get("/", (req, res) => res.send("Hello User!")); // 텍스트 띄우기

router.get("/", (req, res) => res.render("index", { title: "Express" })); // 페이지 띄우기

module.exports = router;
