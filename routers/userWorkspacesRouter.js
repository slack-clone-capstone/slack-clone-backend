const express = require("express");
const router = express.Router();

class UserWorkspacesRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // this is for the userWorkspace page i.e. the first page after authentication
    router.get(
      "/workspaces",
      this.auth,
      this.controller.getUserWorkspace.bind(this.controller)
    );
    router.get(
      "/users",
      this.auth,
      this.controller.getNumUsersInWorkspace.bind(this.controller)
    );
    router.get(
      "/usersinfo",
      this.auth,
      this.controller.getWorkspaceUsers.bind(this.controller)
    );

    return router;
  }
}

module.exports = UserWorkspacesRouter;
