const express = require("express");
const router = express.Router();

class UserWorkspacesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // this is for the userWorkspace page i.e. the first page after authentication
    router.get(
      "/workspaces",
      this.controller.getUserWorkspace.bind(this.controller)
    );
    router.get(
      "/users",
      this.controller.getNumUsersInWorkspace.bind(this.controller)
    );

    return router;
  }
}

module.exports = UserWorkspacesRouter;
