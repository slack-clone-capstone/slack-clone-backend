const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import middleware
const auth = require("./middleware/auth");

// import Routers
const UsersRouter = require("./routers/usersRouter");
const UserWorkspacesRouter = require("./routers/userWorkspacesRouter");
const ChatsRouter = require("./routers/chatsRouter");
const MessagesRouter = require("./routers/messagesRouter");

// import Controllers
const UsersController = require("./controllers/usersController");
const UserWorkspacesController = require("./controllers/userWorkspacesController");
const ChatsController = require("./controllers/chatsController");
const MessagesController = require("./controllers/messagesController");

// import DB
const db = require("./db/models/index");
const {
  user,
  workspace,
  user_workspace,
  chat,
  user_chat,
  message,
  attachment,
} = db;

// initialise controllers
const usersController = new UsersController(user);
const userWorkspacesController = new UserWorkspacesController(
  user_workspace,
  workspace
);
const chatsController = new ChatsController(chat, user_chat);
const messagesController = new MessagesController(message, user_chat);

// initialise routers
const usersRouter = new UsersRouter(usersController, auth).routes();
const userWorkspacesRouter = new UserWorkspacesRouter(
  userWorkspacesController,
  auth
).routes();
const chatsRouter = new ChatsRouter(chatsController, auth).routes();
const messagesRouter = new MessagesRouter(messagesController, auth).routes();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/userWorkspaces", userWorkspacesRouter);
app.use("/chats", chatsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// setting up socket.io

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: PORT,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running");
});
