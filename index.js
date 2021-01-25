const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");

const config = require("./config/key");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    //오류가 뜨는걸 예방하고자 쓰는코드 (?)
  })
  .then(() => console.log("MongoDB Connected...")) //몽고db가 연결되었을때
  .catch((err) => console.log(err)); // 실패했을 때

app.get("/", (req, res) => {
  res.send("5000포트 테스트입니다! No SQL");
});

app.post("/register", (req, res) => {
  //Client에서 회원가입 때 입력한 정보를 가져오면
  //정보들을 db에 넣어준다

  // req 안에 있는 자료 예시
  // {
  //   id: hello
  //   pw : world
  // }
  // 이는 bodyparser가 있기에 가능하다
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
