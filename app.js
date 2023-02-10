require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();
//connect to db
const connectDB = require("./db/connect");
//port
const PORT = process.env.PORT || 5000;
//router
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

//middleware
const errorsHandlerMiddleware = require("./middlewares/errorsHandler");
const notFoundMiddleware = require("./middlewares/notFound");

//default route
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Welcome to blog server");
});
//routers
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

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
