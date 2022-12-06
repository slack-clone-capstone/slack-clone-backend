const express = require("express");
const router = express.Router();

class MessagesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // this is the page upon clicking a particular chat
    router.get(
      "/:chatId",
      this.controller.getAllMessages.bind(this.controller)
    );
    router.post("/", this.controller.postNewMessage.bind(this.controller));
    router.put(
      "/:messageId",
      this.controller.editMessage.bind(this.controller)
    );
    router.delete(
      "/:messageId",
      this.controller.deleteMessage.bind(this.controller)
    );
    return router;
  }
}

module.exports = MessagesRouter;
