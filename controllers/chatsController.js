const { Op } = require("sequelize");
const BaseController = require("./baseController");

class ChatsController extends BaseController {
  constructor(model, userChatsModel) {
    super(model);
    this.userChatsModel = userChatsModel;
  }

  async getAllUserChats(req, res) {
    const { userId, workspaceId } = req.query;
    try {
      const userChats = await this.userChatsModel.findAll({
        where: {
          user_id: userId,
        },
      });

      const chatId = [];
      for (let i = 0; i < userChats.length; i += 1) {
        chatId.push(userChats[i]["chat_id"]);
      }
      console.log(chatId);

      const chats = await this.model.findAll({
        where: {
          [Op.and]: { workspace_id: workspaceId, id: { [Op.in]: chatId } },
        },
      });
      return res.json(chats);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // see whether to change this to find or create chat
  async createChat(req, res) {
    const {
      userId,
      workspaceId,
      type,
      channelName,
      channelDescription,
      channelPrivate,
    } = req.body;
    try {
      const newChat = await this.model.create({
        user_id: userId,
        workspace_id: workspaceId,
        type: type,
        channel_name: channelName || null,
        channel_description: channelDescription || null,
        channel_private: channelPrivate || null,
      });
      return res.json(newChat);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // edit chat details
  async editChat(req, res) {
    const { chatId } = req.params;
    const { channelName, channelDescription, channelPrivate } = req.body;
    try {
      const editedChat = await this.model.update(
        {
          channel_name: channelName,
          channel_description: channelDescription,
          channel_private: channelPrivate,
        },
        { where: { id: chatId } }
      );
      return res.json(editedChat);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get chat details
  async getChat(req, res) {
    const { chatId } = req.params;
    try {
      const chat = await this.model.findOne({ where: { id: chatId } });
      return res.json(chat);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // delete chat
  async deleteChat(req, res) {
    const { chatId } = req.params;
    try {
      const deletedChat = await this.model.destroy({ where: { id: chatId } });
      return res.json(deletedChat);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ChatsController;
