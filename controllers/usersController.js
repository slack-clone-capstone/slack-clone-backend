const { Op } = require("sequelize");
const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOrCreateUser(req, res) {
    const { email, firstName, lastName, username } = req.body;
    try {
      // Upon authentication, from users table, obtain user_id
      const [user, created] = await this.model.findOrCreate({
        where: {
          email: email,
          first_name: firstName,
          last_name: lastName,
          username: username,
        },
      });
      return res.json(user || created);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getUserInfo(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findOne({ where: { id: userId } });
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // async getAllUserInfoForChat(req, res) {
  //   const { userId } = req.query;
  //   console.log(userId);
  //   try {
  //     const user = await this.model.findAll({
  //       where: { user_id: { [Op.in]: userId } },
  //     });
  //     return res.json(user);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = UsersController;
