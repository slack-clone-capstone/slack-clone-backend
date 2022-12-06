const express = require("express");
const cors = require("cors");
require("dotenv").config();

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
const usersRouter = new UsersRouter(usersController).routes();
const userWorkspacesRouter = new UserWorkspacesRouter(
  userWorkspacesController
).routes();
const chatsRouter = new ChatsRouter(chatsController).routes();
const messagesRouter = new MessagesRouter(messagesController).routes();

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
