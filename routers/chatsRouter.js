const express = require("express");
const router = express.Router();

class ChatsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // this is for the first page after selecting workspace i.e. the page which displays all the chats of the user
    router.get(
      "/",
      this.auth,
      this.controller.getAllUserChats.bind(this.controller)
    );
    router.post(
      "/",
      this.auth,
      this.controller.createChat.bind(this.controller)
    );
    router.get(
      "/:chatId",
      this.auth,
      this.controller.getChat.bind(this.controller)
    );
    router.post(
      "/:chatId",
      this.auth,
      this.controller.editChat.bind(this.controller)
    );
    router.delete(
      "/:chatId",
      this.auth,
      this.controller.deleteChat.bind(this.controller)
    );
    router.get(
      "/users/:chatId",
      this.auth,
      this.controller.getUsersInChat.bind(this.controller)
    );

    return router;
  }
}

module.exports = ChatsRouter;
