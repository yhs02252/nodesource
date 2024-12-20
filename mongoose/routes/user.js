var express = require("express");
var User = require("../schemas/user");
const Comment = require("../schemas/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      // db.users.find()
      const users = await User.find({});

      // response를 json 방식으로 변환
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      // db.users.insertOne({name:'홍길동', age:15, married:true})
      // req.body : form 안의 내용 가져오기

      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log("user 삽입 결과 : ", user);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

// 특정 user가 작성한 전체 comment 가져오기
// /users/6759057f3450e417adfd5152/comment
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      "commenter"
    );

    console.log("comments", comments);

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
