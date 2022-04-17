const dotenv = require("dotenv");

switch (process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: ".env.development" });
    break;
  case "production":
    dotenv.config({ path: ".env" });
  default:
    dotenv.config({ path: ".env.development" });
    break;
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./server/database/connection");
const routes = require("./server/routes");
const errHandler = require("./server/middlewares/errorHandler");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

connectDB();

let currentUserOnline = 0;

io.on("connection", (socket) => {
  // socket.on("join", () => {
  //   currentUserOnline = currentUserOnline + 1;
  //   console.log(currentUserOnline, "trigger baru");
  currentUserOnline++;
  io.emit("countUserOnline", currentUserOnline);
  // });
  console.log("masuk");
  socket.on("disconnect", (reason) => {
    console.log("user out");
    if (currentUserOnline > 0) {
      currentUserOnline = currentUserOnline - 1;
      io.emit("countUserOnline", currentUserOnline);
    }
  });
});

app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api", routes);
app.use(errHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
