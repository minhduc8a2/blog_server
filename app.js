require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
//connect to db
const connectDB = require("./db/connect");
//port
const sharp = require("sharp");
const PORT = process.env.PORT || 5000;
//router
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const reportRouter = require("./routes/report");
const commentRouter = require("./routes/comment");

//middleware
const errorsHandlerMiddleware = require("./middlewares/errorsHandler");
const notFoundMiddleware = require("./middlewares/notFound");

//default route

app.use(cors());

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.status(200).send("Welcome to blog server");
});

//multer

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/user/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const avatarUpload = multer({ storage: storage }).single("avatar");

app.post("/api/avatar/upload", function (req, res) {
  avatarUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).send( req.file);
  });
});
//routers
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/report", reportRouter);
app.use("/api/comment", commentRouter);

//using middleware
app.use(errorsHandlerMiddleware);
app.use(notFoundMiddleware);

//start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  } catch (error) {}
};
start();
