const { Op } = require("sequelize");
const BaseController = require("./baseController");

class messagesController extends BaseController {
  constructor(model, userChatsModel) {
    super(model);
    this.userChatsModel = userChatsModel;
  }

  async getAllMessages(req, res) {
    const { chatId } = req.params;
    const { userId } = req.query;

    console.log(userId);
    try {
      const messages = await this.model.findAll({
        where: {
          chat_id: chatId,
        },
        raw: true,
      });

      let messageStatus = {};
      for (let i = 0; i < messages.length; i += 1) {
        if (!(messages[i].id in messageStatus)) {
          messageStatus[messages[i].id] = { is_read: false };
        }

        for (let j = 0; j < messages[i].read.length; j += 1) {
          if (userId == messages[i].read[j]) {
            messageStatus[messages[i].id]["is_read"] = true;
          }
        }
      }

      for (let i = 0; i < messages.length; i += 1) {
        // console.log(messages[i]);
        if (messages[i].id in messageStatus) {
          messages[i]["is_read"] = messageStatus[messages[i].id]["is_read"]; // this should be true or false
        }
      }

      console.log("MESSAGES", userId, messages);
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
      // to get all users in that chat room
      const usersInChat = await this.userChatsModel.findAll({
        where: { chat_id: chatId },
      });

      // console.log(usersInChat);
      // console.log(userId);

      let usersInChatArr = [];

      for (let i = 0; i < usersInChat.length; i += 1) {
        // console.log(usersInChat[i].user_id);
        if (usersInChat[i].user_id != userId) {
          usersInChatArr.push(usersInChat[i].userId);
        }
      }

      const message = await this.model.create({
        chat_id: chatId,
        user_id: userId,
        text: text,
        date: date,
        read: [userId], // assume that no one has read the message yet apart from poster
        unread: usersInChatArr,
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
