var express = require("express");
var User = require("../schemas/user");

const router = express.Router();

router
  .get("/", async (req, res, next) => {
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

module.exports = router;
