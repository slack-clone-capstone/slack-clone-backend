const express = require("express");
const router = express.Router();

class MessagesRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // this is the page upon clicking a particular chat
    router.get(
      "/:chatId",
      this.auth,
      this.controller.getAllMessages.bind(this.controller)
    );
    router.post(
      "/",
      this.auth,
      this.controller.postNewMessage.bind(this.controller)
    );
    router.put(
      "/:messageId",
      this.auth,
      this.controller.editMessage.bind(this.controller)
    );
    router.delete(
      "/:messageId",
      this.auth,
      this.controller.deleteMessage.bind(this.controller)
    );
    return router;
  }
}

module.exports = MessagesRouter;
