const express = require("express");
const router = express.Router();

class ChatsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // this is for the first page after selecting workspace i.e. the page which displays all the chats of the user
    router.get("/", this.controller.getAllUserChats.bind(this.controller));
    router.post("/", this.controller.createChat.bind(this.controller));
    router.get("/:chatId", this.controller.getChat.bind(this.controller));
    router.post("/:chatId", this.controller.editChat.bind(this.controller));
    router.delete("/:chatId", this.controller.deleteChat.bind(this.controller));

    return router;
  }
}

module.exports = ChatsRouter;
