const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // this is for authentication
    router.post(
      "/",
      this.auth,
      this.controller.getOrCreateUser.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
