const express = require("express");

// 라우터 = 경로지정
const router = express.Router();

// router.get("/", (req, res) => res.send("Hello User!"));
router.get("/", (req, res) => res.render("user"));

module.exports = router;
