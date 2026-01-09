const express = require("express");
const app = express();
const port = 3600;

const guestbookRouter = require("./routes/guestbook");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/guestbook", guestbookRouter);

// app.get("/", (req, res) => {
//   console.log(req.url);
//   res.send("Hello World! 6");
// });

// public 폴더를 정적 파일 디렉토리로 지정
app.use(express.static("public"));

const path = require("path");

//'/' endpoint에 vue의 index.html을 라우팅함.
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// 새로고침해도 동작하도록 404 error 처리 미들웨어 추가
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
