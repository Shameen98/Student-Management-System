const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", //which frontend do you want to access
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

//connect to MongoDB
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

//Routers
const studentRouter = require("./routes/Student.js");
app.use("/student", studentRouter);

const UserRouter = require("./routes/User.js");
app.use("/auth", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
