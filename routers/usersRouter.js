const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // this is for authentication
    router.post("/", this.controller.getOrCreateUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
