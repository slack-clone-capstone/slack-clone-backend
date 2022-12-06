const { Op } = require("sequelize");
const BaseController = require("./baseController");

class UserWorkspacesController extends BaseController {
  constructor(model, workspaceModel) {
    super(model);
    this.workspaceModel = workspaceModel;
  }

  async getUserWorkspace(req, res) {
    const { userId } = req.body;
    try {
      const userWorkspace = await this.model.findAll({
        where: { user_id: userId },
      });

      const userWorkspaceId = [];
      for (let i = 0; i < userWorkspace.length; i += 1) {
        userWorkspaceId.push(userWorkspace[i]["workspace_id"]);
      }

      const workspace = await this.workspaceModel.findAll({
        where: { id: { [Op.or]: userWorkspaceId } },
      });

      return res.json(workspace);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getNumUsersInWorkspace(req, res) {
    const { workspaceId } = req.body;
    try {
      const count = await this.model.count({
        where: {
          workspace_id: workspaceId,
        },
        group: "workspace_id",
      });
      console.log(count);
      res.json(count);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UserWorkspacesController;
