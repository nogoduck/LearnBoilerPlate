const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다
  //findOne : mongdb에서 제공하는 검색 매소드
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인한다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호도 맞다면 토큰을 생성한다
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //받아온 토큰을 저장할 장소를 지정한다
        //ex ) 쿠키, 로컬저장소, 세션
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
