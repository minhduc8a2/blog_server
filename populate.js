require("dotenv").config();
const connectDB = require("./db/connect");
const User = require("./models/User");

async function start() {
  await connectDB(process.env.MONGO_URI);
  await User.create({
    name: "Le Minh Duc",
    email: "minhduc8a2.1@gmail.com",
    password: "heroandroidluc@12ky",
  });
  process.exit(0);
}

start();
