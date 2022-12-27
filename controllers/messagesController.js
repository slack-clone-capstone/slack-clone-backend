const { Op } = require("sequelize");
const BaseController = require("./baseController");

class messagesController extends BaseController {
  constructor(model, userChatsModel) {
    super(model);
    this.userChatsModel = userChatsModel;
  }

  async getAllMessages(req, res) {
    const { chatId } = req.params;
    try {
      const messages = await this.model.findAll({
        where: {
          chat_id: chatId,
        },
      });
      return res.json(messages);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create new chat at the same time???
  async postNewMessage(req, res) {
    const { chatId, userId, text, date } = req.body;
    try {
      const message = await this.model.create({
        chat_id: chatId,
        user_id: userId,
        text: text,
        date: date,
        is_edited: "FALSE", // need default value to be false
      });
      return res.json(message);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editMessage(req, res) {
    const { messageId } = req.params;
    const { text, date } = req.body;
    try {
      const message = await this.model.update(
        {
          text: text,
          is_edited: "TRUE",
        }, // need default to be true
        { where: { id: messageId } }
      );
      return res.json(message);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteMessage(req, res) {
    const { messageId } = req.params;
    try {
      const message = await this.model.destroy({
        where: {
          id: messageId,
        },
      });
      return res.json(message);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = messagesController;
