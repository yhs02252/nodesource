var express = require("express");
var User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // db.users.find()

    const users = await User.find({});

    // render: 템플릿, 데이터 전송
    res.render("user/user", { users: users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
