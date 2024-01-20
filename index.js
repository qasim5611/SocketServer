const express = require("express");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const connectDb = require("./config/connection");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");

const { uploadall } = require("./helpers/filehelper"); //for multiple File uploads

app.use(cors({ origin: "*" }));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const _dirname = path.resolve();
app.use("uploads", express.static(path.join(_dirname, "uploads")));

const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      // file.mimetype == "image/png" ||
      // file.mimetype == "image/jpg" ||
      // file.mimetype == "image/jpeg" ||
      // file.mimetype == "video/webm" ||
      // file.mimetype == "video/mp4" ||
      // file.mimetype == "video/mav"
      file
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      return cb(new Error("File is required"));
    }
  },
});

app.use("/uploads", express.static(path.join(_dirname, "uploads")));

app.get("/test", (req, res) => {
  res.send("Server Running");
});

// Frontend Site Login System
let Authenticate = require("./routes/Autherize/autherize");

app.post("/register", Authenticate.register);
app.post("/verifyEmailTokenSignup", Authenticate.verifyEmailTokenSignup);
app.post("/authenticate", Authenticate.authenticate);
app.post("/forgot-password", Authenticate.forgotPassword);
app.post("/VerifyTokenforpass", Authenticate.verifyCode);
app.post("/resetpassword", Authenticate.resetPassword);

// app.post("/getcurrentUser", Authenticate.currentUser);

// app.use(express.static("./build"));
// app.use("*", (req, res) => {
//   res.sendfile("./build/index.html");
// });

connectDb();
const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
  console.log("server is listning on port " + PORT);
});

// const io = socket(server);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

// io.on("connection", (socket) => {
//   console.log(socket);

//   socket.on("join_room", (data) => {
//     console.log("join_room...", data);
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     console.log("send_message...", data); // after join chat room show all chat messages first
//     socket.to(data.room).emit("receive_message", data);
//   });

//   // socket.io("typing1", (msj) => {
//   //   io.emit("typing", ms);
//   // });

//   socket.on("sendTyping", (data) => {
//     console.log(data.name + " is typing in " + data.room);
//     io.to(data.room).emit("typing", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnect");
//   });
// });

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
  socket.on("sendTyping", (data) => {
    console.log("SomeOne is Typing...");

    io.emit("typing", data);
  });
});

// io.on("disconnect", () => {
//   console.log("user disconnect");
// });

//   socket.on("sendTyping", (data) => {
//     console.log(data.name + " is typing in " + data.room);
//     io.to(data.room).emit("typing", data);
//   });
