var express = require("express");
var Comment = require("../schemas/comment");

const router = express.Router();

// 댓글 등록
router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.userid,
      comment: req.body.comment,
    });

    // populate : 입력된 comment 객체에 다른 컬렉션 document 불러오기
    //  path : 어떤 필드를 합칠 지 결정
    // RDBMS 의 외래키 제약조건 같은 역할
    const result = Comment.populate(comment, { path: "commenter" }); // router에 있는 schema commneter와 html에서 가져온 comment json객체를 비교

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error); // 다음 미들웨어 호출
  }
});

// 댓글 수정, 삭제
router
  .route("/:id")
  .put(async (req, res, next) => {
    try {
      const result = await Comment.updateOne(
        { _id: req.params.id },
        { comment: req.body.comment }
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.deleteOne({ _id: req.params.id });
      res.json(result);
    } catch (error) {
      console.log(error);
      next();
    }
  });

module.exports = router;
