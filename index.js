const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

mongoose
  .connect(
    "mongodb+srv://ad:1114@boilerdb.wyuia.mongodb.net/boilerdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      //오류가 뜨는걸 예방하고자 쓰는코드 (?)
    }
  )
  .then(() => console.log("MongoDB Connected...")) //몽고db가 연결되었을때
  .catch((err) => console.log(err)); // 실패했을 때

app.get("/", (req, res) => {
  res.send("5000포트 테스트입니다!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
