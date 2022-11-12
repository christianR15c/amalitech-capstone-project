const model = require('../models')

const { Chat, user, userchat } = model

const createChat = async (req, res) => {
    const { userId } = req.body;

    const chatOwner = req.user.id

    if (chatOwner !== userId) {
        Chat.findOne({
            where: { chatName: JSON.stringify(userId), chatOwner },
        })
            .then((exist) => {
                if (exist)
                    res
                        .status(400)
                        .json({ error: `chat already exist` });
                else {
                    Chat.create({
                        chatName: userId,
                        chatOwner
                    }).then((chat) =>
                        res.status(201).json({
                            message: `chat has created succssfully`,
                            chat,
                        })
                    );
                }
            })
            .catch((error) => res.status(400).json({ error: error.message }));
    }
    else return res.status(400).json({ error: "you can't create chat with you" })
};

const createGroupChat = async (req, res) => {
    const { chatName } = req.body
    const chatExist = await Chat.findOne({
        where: { chatName }
    })

    if (chatExist) return res.status(400).json({ error: "Group already exist" })

    Chat.create({
        chatName,
        isGroupChat: true,
        groupAdmin: req.user.id
    }).then((chat) => {
        if (chat) {
            userchat.create({
                userId: req.user.id,
                chatId: chat.id
            }).then(chatCreated => {
                if (chatCreated) res.status(201).json(chat)
            }).catch(error => console.log(error));
        }
    }).catch(error => console.log(error));
}

const addUserToGroupChat = async (req, res) => {

    const { userId, chatId } = req.body

    const chat = await Chat.findByPk(chatId)

    console.log(chat.groupAdmin);

    if (chat.groupAdmin !== req.user.id) return res.status(400).json({ error: "only admin is allowed to add user to group chat" })

    else {
        const userExist = await userchat.findOne({
            where: {
                userId, chatId
            }
        })

        if (userExist) return res.status(400).json({ error: 'User already in group' });

        userchat.create({
            userId, chatId
        })
            .then((userAdded) => res.status(200).json(userAdded))
            .catch(error => console.log(error))
    }
}

const getOneOnOneChats = async (req, res) => {
    const loggedInUser = req.user.id

    const chats = await Chat.findAll({
        where: { chatOwner: loggedInUser }
    })

    if (chats.length > 0) return res.status(200).json(chats)
    res.status(200).json({ message: "no one-one-chats" })

}

const getAllGroupChats = async (req, res) => {
    const loggedInUser = req.user.id
    const chats = await Chat.findAll({
        where: { isGroupChat: true, groupAdmin: loggedInUser }
    })

    if (chats.length > 0) return res.status(200).json(chats)
    res.status(200).json({ message: "no group chats" })
}

module.exports = { createChat, createGroupChat, addUserToGroupChat, getOneOnOneChats, getAllGroupChats }