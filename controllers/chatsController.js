const { Op } = require("sequelize");
const workspace = require("../db/models/workspace");
const BaseController = require("./baseController");

class ChatsController extends BaseController {
  constructor(
    model,
    userChatsModel,
    usersModel,
    userWorkspacesModel,
    messagesModel
  ) {
    super(model);
    this.userChatsModel = userChatsModel;
    this.usersModel = usersModel;
    this.userWorkspacesModel = userWorkspacesModel;
    this.messagesModel = messagesModel;
  }

  // this function returns all chat data, including unread message status, and
  // number of unread messages
  async getAllUserChats(req, res) {
    const { userId, workspaceId } = req.query;
    try {
      const userChats = await this.userChatsModel.findAll({
        where: {
          user_id: userId,
        },
      });

      const chatId = [];
      userChats.forEach((userChat) => {
        chatId.push(userChat.chat_id);
      });

      const chats = await this.model.findAll({
        where: {
          [Op.and]: { workspace_id: workspaceId, id: { [Op.in]: chatId } },
        },
        raw: true,
      });

      const finalChatId = [];
      chats.forEach((chat) => {
        finalChatId.push(chat.id);
      });

      const messages = await this.messagesModel.findAll();
      let chatStatus = {};
      messages.forEach((message) => {
        // initialise for each chat id
        if (!(message.chat_id in chatStatus)) {
          chatStatus[message.chat_id] = {
            has_unread_messages: false,
            num_unread_messages: 0,
          };

          if (message.unread != null) {
            message.unread.forEach((unreadUserId) => {
              if (userId == unreadUserId) {
                chatStatus[message.chat_id]["has_unread_messages"] = true;
                chatStatus[message.chat_id]["num_unread_messages"] += 1;
              }
            });
          }
        }
      });

      const usersInChat = await this.userChatsModel.findAll({
        where: { chat_id: { [Op.in]: finalChatId } },
      });

      let chatUsers = {};
      usersInChat.forEach((user) => {
        if (!(user.chat_id in chatUsers)) {
          chatUsers[user.chat_id] = [];
        }
        chatUsers[user.chat_id].push(user.user_id);
      });

      console.log(chatUsers);

      chats.forEach((chat) => {
        if (chat.id in chatStatus) {
          chat["has_unread_messages"] =
            chatStatus[chat.id]["has_unread_messages"];
          chat["num_unread_messages"] =
            chatStatus[chat.id]["num_unread_messages"];
        }

        if (chat.id in chatUsers) {
          chat["chat_users"] = chatUsers[chat.id];
        }
      });

      console.log(chats);
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
      othersUserId,
    } = req.body;
    try {
      const newChat = await this.model.create({
        workspace_id: workspaceId,
        type: type,
        channel_name: channelName || null,
        channel_description: channelDescription || null,
        channel_private: channelPrivate,
      });
      if (type === "channel") {
        if (channelPrivate === false) {
          const usersInWorkspace = await this.userWorkspacesModel.findAll({
            where: {
              workspace_id: workspaceId,
            },
          });
          for (let i = 0; i < usersInWorkspace.length; i += 1) {
            const workspaceUser = usersInWorkspace[i].userId;
            newChat.addUser(workspaceUser);
          }
        } else {
          newChat.addUser(userId);
        }
        const result = await this.model.findOne({
          where: { channel_name: channelName },
          include: this.usersModel,
        });
        return res.json(result);
      } else {
        for (let i = 0; i < othersUserId.length; i += 1) {
          newChat.addUser(othersUserId[i]);
        }
        newChat.addUser(userId);
        const result = await this.model.findOne({
          where: { channel_name: channelName },
          include: this.usersModel,
        });
        return res.json(result);
      }
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

  // refactored into getAllUserChats -- can remove if no longer needed
  async getUsersInChat(req, res) {
    const { chatId } = req.params;
    try {
      const users = await this.userChatsModel.findAll({
        where: { chat_id: chatId },
      });
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ChatsController;
