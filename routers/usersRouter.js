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
    // to get user's info
    router.get(
      "/:userId",
      this.auth,
      this.controller.getUserInfo.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
